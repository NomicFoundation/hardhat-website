---
title: Adding config to your plugin
description: Hardhat 3 plugin tutorial - Adding config to your plugin
---

# Adding config to your plugin

The main functionality of your plugin is now in place, but it always uses the first account as `myAccount`, which is not what we want.

Instead, we'd like to let the users configure which account they want to use by adding a `myAccountIndex` property to each network config.

To do it, we'll use hook handlers and type extensions again.

### The Hardhat config system

As you are probably aware, Hardhat's config is normally defined in `hardhat.config.ts`, and has the `HardhatUserConfig` type.

This type represents the config that the user writes, but it's not the one that Hardhat uses. Instead, the `HardhatUserConfig` is first validated, and then resolved into a `HardhatConfig` object, which is the one that Hardhat uses.

The resolution process creates the `HardhatConfig` from an already-validated `HardhatUserConfig`. This involves copying values, assigning defaults, normalizing different config formats, or applying custom logic that plugins need.

In general, `HardhatUserConfig` and its property types are more permissive and optional, allowing different ways to express the same thing. For example, `solidity` can be a `string`, `string[]`, or different types of objects.

The `HardhatConfig` is stricter, with fewer optional properties and only one way to express each concept.

### Extending the Hardhat config types

To extend the config types, you'll need to extend its user and resolved versions, both of which are declared in `hardhat/types/config`.

As we want to extend the values of the `networks` property, we won't be extending the whole `HardhatUserConfig` type, but the types of `networks` instead.

The same pattern of having a `SomethingUserConfig` and `SomethingConfig` is used for all the types of the properties of the config, so you can extend precisely what you need.

In this case, we'll extend the following types:

- `EdrNetworkUserConfig` and `EdrNetworkConfig`, for `edr-simulated` networks.
- `HttpNetworkUserConfig` and `HttpNetworkConfig`, for `http` networks.

Open `packages/plugin/src/type-extensions.ts` and replace the code above the section we added previously. The entire file should look like this:

```ts{4,8,12,16}
import "hardhat/types/config";
declare module "hardhat/types/config" {
  export interface EdrNetworkUserConfig {
    myAccountIndex?: number;
  }

  export interface EdrNetworkConfig {
    myAccountIndex: number;
  }

  export interface HttpNetworkUserConfig {
    myAccountIndex?: number;
  }

  export interface HttpNetworkConfig {
    myAccountIndex: number;
  }
}

import "hardhat/types/network";
declare module "hardhat/types/network" {
  export interface NetworkConnection {
    myAccount: string;
  }
}
```

As you can see, the user config types are more permissive, with an optional `myAccountIndex` property, and the resolved config types are stricter, with a required `myAccountIndex` property.

You can now delete the `packages/plugin/src/types.ts` file if it exists, as it's no longer needed.

### Hooking into the config system

The validation and resolution of the config are done with hook handlers, which you can find in `packages/plugin/src/hooks/config.ts`. They should look like this:

```ts{2,6,9}
import type { ConfigHooks } from "hardhat/types/hooks";
import { resolvePluginConfig, validatePluginConfig } from "../config.js";

export default async (): Promise<Partial<ConfigHooks>> => {
  const handlers: Partial<ConfigHooks> = {
    async validateUserConfig(userConfig) {
      return validatePluginConfig(userConfig);
    },
    async resolveUserConfig(userConfig, resolveConfigurationVariable, next) {
      const partiallyResolvedConfig = await next(
        userConfig,
        resolveConfigurationVariable,
      );

      return resolvePluginConfig(userConfig, partiallyResolvedConfig);
    },
  };

  return handlers;
};
```

While this file is very similar to the network hook handlers, there are a few key differences:

- We aren't really defining the behavior of the hook handlers here, but rather delegating it to a `../config.js` file. This way, we can test the config validation and resolution in isolation.

- The config hooks don't receive the `context` parameter. This is because Hardhat hasn't been initialized by the time these hook handlers are run.

- The `validateUserConfig` has a different signature, with no `next` parameter. This is because each config validation handler is independent from each other, and all of them are always run.

### Validating your plugin's config

The `validatePluginConfig` function in `packages/plugin/src/config.ts` takes the entire `HardhatUserConfig` object and returns `Promise<HardhatUserConfigValidationError[]>`. It's responsible for validating the plugin-related parts of the config and shouldn't validate other parts of the config.

If the validation is successful, this function should return an empty array. Otherwise, it should return an array of objects with the following properties:

- `path`: The path to the property that caused the error, relative to the `HardhatUserConfig` object.
- `message`: The error message.

You can use libraries like [Zod](https://zod.dev/) or [ArkType](https://arktype.io/) to implement your validation logic, but for now, let's replace the existing function with:

```ts
export async function validatePluginConfig(
  userConfig: HardhatUserConfig
): Promise<HardhatUserConfigValidationError[]> {
  if (
    userConfig.networks === undefined ||
    typeof userConfig.networks !== "object"
  ) {
    // If there's no networks field or it's invalid, we don't validate anything
    // in this plugin
    return [];
  }

  const errors = [];
  for (const [networkName, networkConfig] of Object.entries(
    userConfig.networks
  )) {
    if (networkConfig.myAccountIndex === undefined) {
      continue;
    }

    if (
      typeof networkConfig.myAccountIndex !== "number" ||
      networkConfig.myAccountIndex < 0
    ) {
      errors.push({
        path: ["networks", networkName, "myAccountIndex"],
        message: "Expected a non-negative number.",
      });
    }
  }

  return errors;
}
```

It checks if the `networks` field has the correct type. If so, it validates the types and values of the `myAccountIndex` property for each network.

You should keep in mind that while your plugin is written in TypeScript, Hardhat users may be using JavaScript, so you shouldn't rely on TypeScript types during the config validation.

### Resolving your plugin's config

To understand config resolution, let's first look at its hook handler, instead of jumping directly to the `resolvePluginConfig` function.

The `resolveUserConfig` hook handler receives three parameters:

- The `userConfig` object, which can be assumed to be valid.
- A `resolveConfigurationVariable` function, which we won't cover in this tutorial.
- And the `next` function, just like in the network hook handlers.

In this case, the `next` function will return a `HardhatConfig` that has been partially resolved.

"Partially resolved" means that Hardhat's built-in resolution has been completed, and any plugins you depend on have applied their resolution logic. What's missing is your plugin's config resolution.

However, the `partiallyResolvedConfig` type won't reflect this. The fields you added to the config may appear to be present, but they will actually be `undefined`. The job of `resolvePluginConfig` is to return a new `HardhatConfig` where all your non-optional properties have been resolved.

Once again, let's replace the existing implementation with this one:

```ts{8-10,12-13}
export async function resolvePluginConfig(
  userConfig: HardhatUserConfig,
  partiallyResolvedConfig: HardhatConfig,
): Promise<HardhatConfig> {
  const DEFAULT_MY_ACCOUNT_INDEX = 0;
  const networks: HardhatConfig["networks"] = {};

  for (const [networkName, networkConfig] of Object.entries(
    partiallyResolvedConfig.networks,
  )) {
    const myAccountIndex =
      userConfig.networks?.[networkName]?.myAccountIndex ??
      DEFAULT_MY_ACCOUNT_INDEX;

    networks[networkName] = {
      ...networkConfig,
      myAccountIndex,
    };
  }

  return {
    ...partiallyResolvedConfig,
    networks,
  };
}
```

This function iterates over all the networks and adds the `myAccountIndex` property to each one.

Note that it iterates the networks of the `partiallyResolvedConfig`, and not the `userConfig`. This is because the built-in resolution of the networks has already been done, and we can rely on it. If instead we iterated over `userConfig.networks`, we would get unresolved values, and potentially missing networks.

However, when reading our plugin's config (the `myAccountIndex` value for each network), we must use the `userConfig`. This is because the `partiallyResolvedConfig` doesn't contain information about the `myAccountIndex` property, as we're defining it in this function.

If no `myAccountIndex` is found in the user config for a given network, we will use the default value of `0`.

**Important**: The `resolvePluginConfig` function doesn't modify values in-place but creates new ones. This is important because Hardhat 3 allows multiple instances of the Hardhat Runtime Environment, and modifying config values could interfere with other instances, especially during testing.

### Testing your plugin's config extension

As mentioned above, the reason we didn't define the hook handlers logic in `packages/plugin/src/hooks/config.ts` is to be able to test them in isolation.

You can test both functions in `packages/plugin/test/config.ts` by replacing that file with [this complete test suite](https://github.com/NomicFoundation/hardhat3-plugin-template/blob/tutorial/packages/plugin/test/config.ts) that you can find in the `tutorial` branch of the template project.

We recommend taking a look at the tests, as they are a good example of the cases that you should test, and how to test them.

## Updating the network hooks to use the plugin's config

Now that your plugin has its own config, we should update the logic in the network hooks to use it.

Modify the `packages/plugin/src/hooks/network.ts` file by replacing:

```ts
connection.myAccount = accounts[0];
```

with this new code:

```ts
const myAccountIndex = connection.networkConfig.myAccountIndex;

if (myAccountIndex >= accounts.length) {
  throw new HardhatPluginError(
    `hardhat-plugin-template`,
    `Invalid index ${myAccountIndex} for myAccount when connecting to network ${connection.networkName}`
  );
}

connection.myAccount = accounts[myAccountIndex];
```

We first get `myAccountIndex` from the network config (which is part of the `NetworkConnection` object) and then validate that the index is valid.

If it isn't, we throw a `HardhatPluginError`, which you can import from `hardhat/plugins`. This custom error type takes the plugin ID (as defined in your plugin object), a message, and an optional `cause` error.

Make sure to throw this type of error from your plugin so that Hardhat's user interface can display them properly. You can also subclass `HardhatPluginError`, and it will still work with Hardhat's error handling.

Finally, if `myAccountIndex` is valid, we use it to set the `myAccount` property of the `NetworkConnection` object.

You can try it out by updating the example project's config, and running the `my-account-example.ts` script again.

Update your configuration in `packages/example-project/hardhat.config.ts` by removing any `myPlugin` field and adding this network config:

```ts
networks: {
  default: {
    type: "edr-simulated",
    myAccountIndex: 1,
  },
},
```

Now if you build your plugin and run the script again, you should see a different address:

```sh
pnpm hardhat run scripts/my-account-example.ts
Compiling your Solidity contracts...
Compiled 1 Solidity file with solc 0.8.29 (evm target: cancun)

connection.myAccount 0x70997970c51812dc3a010c7d01b50e0d17dc79c8
```
