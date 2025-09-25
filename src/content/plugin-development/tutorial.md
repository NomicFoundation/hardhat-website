---
title: Building a Hardhat 3 plugin
description: A step-by-step guide to building a Hardhat 3 plugin
# Target audience:
#  - New plugin author with context about what Hardhat is, but no context about how to build plugins
#  - A Hardhat 3 plugin author wanting to learn how they work in Hardhat 3
#  - An advanced Hardhat 3 user wanting to learn more about it
---

# Building a Hardhat 3 plugin

This tutorial will guide you through the process of building a simple Hardhat 3 plugin, based on the [Hardhat 3 plugin template](https://github.com/nomicfoundation/hardhat3-plugin-template/).

## Getting started

### Prerequisites

To follow this tutorial, you'll need to have Node.js 22+ and `pnpm` installed on your machine.

### Using the template repository

The easiest way to start developing a Hardhat 3 plugin is by creating a new repository based on the [Hardhat 3 plugin template](https://github.com/nomicfoundation/hardhat3-plugin-template/).

To use it, click [here](https://github.com/new?template_name=hardhat3-plugin-template&template_owner=NomicFoundation) and follow the instructions on the GitHub. Once the creation process is ready, you'll have a new repository with all the boilerplate to create a plugin and to follow this tutorial.

You should clone it on your development machine, as that's where you'll be working. The rest of this tutorial will assume that you are working on the `main` branch of your new repository.

### Understanding your new repository

The repository you just created is structured as a [`pnpm`](https://pnpm.io/) monorepo with the following packages:

- `packages/plugin`: The plugin itself, which contains just enough boilerplate to follow this tutorial.
- `packages/example-project`: An example Hardhat 3 project that uses the plugin.

All the development will happen in the `packages/plugin` directory, while `packages/example-project` is a playground to experiment with your plugin, and manually test it.

### Trying out your plugin

Before changing anything, let's try out the boilerplate plugin you just created.

```sh
pnpm install
pnpm build
```

And try the plugin out in `packages/example-project` with:

```sh
cd packages/example-project
pnpm hardhat my-task
```

which should print `Hola, Hardhat!`.

## Your first Hardhat 3 plugin

With your boilerplate in place, we'll now create a plugin that lets you pick an account per network config and set it as `myAccount` in each `NetworkConnection` object (i.e. the return value of `network.connect()`). We'll also define a task to print that account's address.

Using your plugin, you will be able to run:

```ts
import { network } from "hardhat";

const { myAccount } = await network.connect();
console.log("My account is:", myAccount);
```

By implementing this plugin, you'll learn to:

1. Extend the `NetworkConnection` objects returned by `network.connect()`.
2. Extend the Hardhat config system, adding custom validation and resolution logic.
3. Add a task that builds on top of the above two features.

You can find the complete code of this tutorial in the `tutorial` branch of the [Hardhat 3 plugin template](https://github.com/NomicFoundation/hardhat3-plugin-template/tree/tutorial).

## The `HardhatPlugin` object

In Hardhat 3, plugins are defined as objects of the `HardhatPlugin` type.

Normally, they are defined in the `index.ts` file of your project, and exported as `default`.

You can find your plugin object in `packages/plugin/src/index.ts`, but we won't be looking at it just yet.

## Extending the `NetworkConnection` object

The first thing we'll do is add the `myAccount` property to the `NetworkConnection` object.

### Hardhat 3's network manager

Hardhat 3 comes built-in with a network manager that handles your connections to the Ethereum network, and their local simulations.

The `NetworkManager` is exported as part of the Hardhat Runtime Environment, and exposes a single method, `connect`.

When you call it, Hardhat will initialize either an HTTP connection to an Ethereum node, or start a new simulation of a network, depending on the config and the params you pass to `connect`. As a result, it will return a `NetworkConnection` object.

```ts
import { network } from "hardhat";

const networkConnection = await network.connect();
```

A user can have multiple network connections at the same time, so if your plugin wants to interact with the network, it should do it by extending the `NetworkConnection` object.

### Hooking into the Hardhat behavior

Hardhat and its plugins can define different hooks, which are extensibility points that allow you to customize their behavior by adding bits of custom logic, which we call hook handlers.

Hooks are split into different categories, and each plugin can define which categories they want to use in their main file, like this:

```ts
const plugin: HardhatPlugin = {
  id: "hardhat-my-plugin",
  hookHandlers: {
    config: () => import("./hooks/config.js"),
    network: () => import("./hooks/network.js"),
  },
  /// ...
};
```

Each of the categories defines a function that imports a module with your hook handlers. Hardhat will call that function the first time each instance of the Hardhat Runtime Environment needs to run one of the hooks in that category, avoiding the cost of loading the module until it's actually needed.

Having the hook handlers in separate files also makes Hardhat more robust, as an error in one part of a plugin won't afffect unrelated parts of the system. For example, if `./hooks/config.js` were to throw because of a missing dependency, Hardhat would still be able to compile your project, or do anything else that doesn't use the network.

A typical file with hook handlers looks like this:

```ts
import type { HookContext, NetworkHooks } from "hardhat/types/hooks";
import { ChainType, NetworkConnection } from "hardhat/types/network";

export default async (): Promise<Partial<NetworkHooks>> => {
  const handlers: Partial<NetworkHooks> = {
    /// your hook handlers
  };

  return handlers;
};
```

They export an async function that returns an object with hook handlers for its category. Once again, Hardhat will call this function the first time each instance of the Hardhat Runtime Environment needs to run one of the hooks in that category.

### Writing your first hook handler

Let's now write a hook handler that adds the `myAccount` property to the `NetworkConnection` object.

If you open `packages/plugin/src/hooks/network.ts`, you'll find a file similar to the snippet above, with two example hook handlers:

- `newConnection`, which is called every time a new network connection is being created.
- `onRequest`, which is called every time this network connection receives a request.

We'll only work with the `newConnection` handler, so feel free to delete the other one. If you do it, you'll end up with something like this:

```ts
const handlers: Partial<NetworkHooks> = {
  // You can ignore the `ChainTypeT` parameter for now.
  // It's only used in advanced multi-chain plugins.
  async newConnection<ChainTypeT extends ChainType | string>(
    context: HookContext,
    next: (nextContext: HookContext) => Promise<NetworkConnection<ChainTypeT>>
  ): Promise<NetworkConnection<ChainTypeT>> {
    const connection = await next(context);

    console.log("Connection created with ID", connection.id);

    return connection;
  },
};
```

Most hook handlers receive two common parameters:

- `context`: An object that contains most of the Hardhat Runtime Environment's functionality, except for the `tasks` properties.
- `next`: A function that calls the next hook handler, or the default behavior that Hardhat provides if there isn't any other hook handler.

You are responsible for calling `next` whenever you want, passing it the same or modified parameters, and handling its result. You can also decide not to call it at all, but you should't call it more than once.

In the above snippet, we are using `next(context)` to immediately get the `NetworkConnection` object, and logging its `id`. We'll change that, and add the `myAccount` property to the connection instead.

Please change the body of the method to the following:

```ts{8}
const connection = await next(context);

// Get the accounts from the connection
const accounts: string[] = await connection.provider.request({
  method: "eth_accounts",
});

connection.myAccount = accounts[0];

return connection;
```

While the logic is simple enough to understand, you'll notice that you get a type error in the highlighted line, as you may have expected. This is because the `NetworkConnection` type doesn't have a `myAccount` property, so our plugin will have to define it.

### Extending the `NetworkConnection` type

Fortunately, the TypeScript type system is designed to accommodate this kind of type extension that plugin systems often need.

We won't get into the details of how precisely they work, but the general idea is that you redeclare a typescript module, and redeclare the type that you want to extend. TypeScript will merge the different declarations, and users of your plugin will see the extended type.

Please open `packages/plugin/src/type-extensions.ts`, where you'll find something like this:

```ts
// More code above that you can ignore...

import "hardhat/types/network";
declare module "hardhat/types/network" {
  // eslint comments...
  interface NetworkConnection<
    // eslint comments...
    ChainTypeT extends ChainType | string = DefaultChainType
  > {
    // Add your network connection properties here
  }
}
```

Just as explained, we are redeclaring the module where `NetworkConnection` is originally defined, and declaring it again. Note that we are also importing the original module, which is critical for the type extension to work.

Now, let's add the `myAccount` property to the `NetworkConnection` type, leaving the code above it as is. Please change the above code to the following:

```ts{4}
import "hardhat/types/network";
declare module "hardhat/types/network" {
  interface NetworkConnection {
    myAccount: string;
  }
}
```

Now the type error in `packages/plugin/src/hooks/network.ts` should have gone away.

### Trying out your `NetworkConnection` extension

Congratulations! You already extended the functionality of Hardhat 3. Let's try it out!

First, we need to build the plugin, so run this in `packages/plugin`:

```sh
pnpm build
```

:::tip

Running `pnpm watch` can be helpful when using the example project.

If you keep a terminal running it, things will normally be rebuilt by the time you try them out in the `example-project`.

:::

Then, let's create a script in the `example-project` which uses your plugin.

Let's create the file `packages/example-project/scripts/my-account-example.ts`, and add the following code:

```ts
import { network } from "hardhat";

const connection = await network.connect();

console.log("connection.myAccount:", connection.myAccount);
```

No type errors should appear, as your plugin is extending the `NetworkConnection` type.

Now run it with:

```sh
$ pnpm hardhat run scripts/my-account-example.ts
Compiling your Solidity contracts...
Compiled 1 Solidity file with solc 0.8.29 (evm target: cancun)

connection.myAccount 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
```

We'll learn more about how to properly test your plugin later in this tutorial.

## Adding config to your plugin

The main functionality of your plugin is now in place, but it always uses the first account as `myAccount`, which is not what we want.

Instead, we'd like to let the users configure which account they want to use by adding a `myAccountIndex` property to each network config.

To do it, we'll use hook handlers and type extensions again.

### The Hardhat config system

As you are probably aware, Hardhat's config is normally defined in `hardhat.config.ts`, and has the `HardhatUserConfig` type.

This type represents the config that the user writes, but it's not the one that Hardhat uses. Instead, the `HardhatUserConfig` is first validated, and then resolved into a `HardhatConfig` object, which is the one that Hardhat uses.

The resolution process is responsible for creating the `HardhatConfig` based on an alredy-validated `HardhatUserConfig`. This can be done by copying values over, assigning defaults, normalizing different config formats, or any custom logic that plugins need.

In general, `HardhatUserConfig` and the types of its properties are more permissive, optional, and may have different ways to express the same thing. For examample, `solidity` can be a `string`, `string[]`, or different types of objects. The `HardhatConfig` is stricter, with fewer optional properties, and with only one way to express things.

### Extending the Hardhat config types

To extend the config types, you'll need to extend its user and resolved versions, both of which are declared in `hardhat/types/config`.

As we want to extend the values of the `networks` property, we won't be extending the whole `HardhatUserConfig` type, but the types of `networks` instead.

The same pattern of having a `SomethingUserConfig` and `SomethingConfig` is used for all the types of the properties of the config, so you can extend precisely what you need.

In this case, we'll extend the following types:

- `EdrNetworkUserConfig` and `EdrNetworkConfig`, for `edr-simulated` networks.
- `HttpNetworkUserConfig` and `HttpNetworkConfig`, for `http` networks.

To do it, open `packages/plugin/src/type-extensions.ts`, and let's replace the code above the one we added in the previous section, so that the entire file looks like this:

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

You can now delete the previous `packages/plugin/src/types.ts` file, as it's no longer needed.

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

- The config hooks don't receive the `context` parameter. This is because Hardhat hasn't been initialized by the time this hooks handlers are run.

- The `validateUserConfig` has a different signature, with no `next` parameter. This is because each config validation handler is independent from each other, and all of them are always run.

### Validating your plugin's config

The `validatePluginConfig` function found in `packages/plugin/src/config.ts` takes the entire `HardhatUserConfig` object, and returns `Promise<HardhatUserConfigValidationError[]>`. It's responsible for validating the parts of the config relative to the plugin, and shouldn't try to validate other parts of the config.

If the validation is successful, this function should return an empty array. Otherwise, it should return an array of objects with the following properties:

- `path`: The path to the property that caused the error, relative to the `HardhatUserConfig` object.
- `message`: The error message.

You can use libraries like [`Zod`](https://zod.dev/) or [ArkType](https://arktype.io/) to implement your validation logic, but for now, let's replace the existing function with:

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

It checks if the `networks` field looks ok. If it does, it validates the types and values of the `myAccountIndex` property of each network.

You should keep in mind that while your plugin is written in TypeScript, Hardhat users may be using JavaScript, so you shouldn't rely on TypeScript types during the config validation.

### Resolving your plugin's config

To understand config resolution, let's first look at its hook handler, instead of jumping directly to the `resolvePluginConfig` function.

The `resolveUserConfig` hook handler receives three parameters:

- The `userConfig` object, which can be assumed to be valid.
- A `resolveConfigurationVariable` function, which we won't cover in this tutorial.
- And the `next` function, just like in the network hook handlers.

In this case, the `next` function will return a `HardhatConfig` that has been partially resolved.

Partially resolved means that all the built-in resolution that Hardhat does will have been done, and that any of the plugins you depend on will have also applied their own resolution logic. What's missing, however, is the resolution of your plugin's config.

The `partiallyResolvedConfig`'s type won't reflect this though. The fields you added to the config may seem to be present, but in practice they will be `undefined`. The job of the `resolvePluginConfig` is to return a new `HardhatConfig` where all of your non-optional properties have been resolved.

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

This function iterates all the networks and adds the `myAccountIndex` property to each one.

Note that it iterates the networks of the `partiallyResolvedConfig`, and not the `userConfig`. This is because the built-in resolution of the networks has already been done, and we can rely on it. If instead we iterated over `userConfig.networks`, we would get unresolved values, and potentially missing networks.

On the other hand, when trying to read our own plugin's config, the `myAccountIndex` value for each network, we must use the `userConfig`. This is because the `partiallyResolvedConfig` doesn't have any information about the `myAccountIndex` property. We are actually defining it here.

If no `myAccountIndex` is found in the user config for a given network, we will use the default value of `0`.

Finally, note that the `resolvePluginConfig` function doesn't modify values in-place, but instead creates new ones. This is important, as in Hardhat 3 you can define multiple instances of the Hardhat Runtime Environment, and modifying the config values could interfere with other instances. This is especially important when testing your plugin.

### Testing your plugin's config extension

As mentioned above, the reason we didn't define the hook handlers logic in `packages/plugin/src/hooks/config.ts` is to be able to test them in isolation.

You can test both functions in `packages/plugin/test/config.ts` by replacing that file with [this complete test suite](https://github.com/NomicFoundation/hardhat3-plugin-template/blob/tutorial/packages/plugin/test/config.ts) that you can find in the `tutorial` branch of the template project.

We recommend taking a look at the tests, as they are a good example of the cases that you should test, and how to test them.

## Updating the network hooks to use the plugin's config

Now that your plugin has its own config, we should update the logic in the network hooks to use it.

All we need to do it is to modify the `packages/plugin/src/hooks/network.ts` file, and replace

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

Note that we first get `myAccountIndex` from the network config, which is part of the `NetworkConnection` object, and then validate that the index is valid.

If it isn't, we throw a `HardhatPluginError`, which you can import from `hardhat/plugins`. This custom error type takes the plugin id, as defined in your plugin object, a message, and an optional `cause` error. Make sure to throw this type of errors from your plugin, so that Hardhat's user interface can display them in a nice way. You can also subclass `HardhatPluginError`, and it will still work.

Finally, if `myAccountIndex` is valid, we use it to set the `myAccount` property of the `NetworkConnection` object.

You can try it out by updating the example project's config, and running the `my-account-example.ts` script again.

If you haven't done it yet, delete the `myPlugin` field of your config in `packages/example-project/hardhat.config.ts`, and add this network config:

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

## Defining the `my-account` task

We'll now define a task that prints the `myAccount` address of the network that we are connected to, with a customizable title.

### Defining the task in your `HardhatPlugin`

Tasks are defined in the `tasks` property of the `HardhatPlugin` object.

If you open `packages/plugin/src/index.ts`, you'll find the `tasks` property, which is an array of task definitions, and you already have one:

```ts
task("my-task", "Prints a greeting.")
  .addOption({
    name: "who",
    description: "Who is receiving the greeting.",
    type: ArgumentType.STRING,
    defaultValue: "Hardhat",
  })
  .setAction(() => import("./tasks/my-task.js"))
  .build();
```

It uses the `task` function from `hardhat/config` to create a task builder, which lets you add options and parameters, and an action factory function. After setting everything up, you need to call the `build()` method to finalize the task definition.

Note that just like with `hookHandlers`, the action function imports another file, so that it isn't loaded unless it's needed.

We'll update this definition to use it for the `my-account` task, by first changing the name, description, and the values we pass to `addOption`:

```ts{8}
task("my-account", "Prints your account.")
  .addOption({
    name: "title",
    description: "The title to use before printing the account.",
    type: ArgumentType.STRING,
    defaultValue: "My account:",
  })
  .setAction(() => import("./tasks/my-task.js"))
  .build(),
```

You should get an error type in the highlighted line. The reason is that the task builder is type safe, and expects the action file to export a function whose parameters match the ones that you defined.

### Creating a task action file

Let's fix the type error in the task definition, and implement the logic of the `my-account` task.

First, let's rename the `packages/plugin/src/tasks/my-task.ts` file to `packages/plugin/src/tasks/my-account.ts`, and update the call to `import("./tasks/my-task.js")` to `import("./tasks/my-account.js")` in the task definition.

Now, let's replace the content of `packages/plugin/src/tasks/my-account.ts` with this:

```ts
import { HardhatRuntimeEnvironment } from "hardhat/types/hre";

interface MyAccountTaskArguments {
  title: string;
}

export default async function (
  taskArguments: MyAccountTaskArguments,
  hre: HardhatRuntimeEnvironment
) {
  const conn = await hre.network.connect();
  console.log(taskArguments.title);
  console.log(conn.myAccount);
}
```

This file exports as default an async function that will be executed when the task is run.

Its first parameter is an object with the task arguments, whose type should match the one of the task definition. We do this by defining an interface, and ensuring that it has the same properties. If they don't, the type system will complain.

The second parameter is the `HardhatRuntimeEnvironment`, which has all the functionality that Hardhat provides.

Finally, the logic of this function is really straightforward:

1. It creates a network connection.
2. It prints the title.
3. It prints the `myAccount` address of the network connection.

To try it out, build your plugin and run this in the example project:

```sh
pnpm hardhat my-account --title "Mi cuenta"
Mi cuenta
0x70997970c51812dc3a010c7d01b50e0d17dc79c8
```

## Integration tests

While some parts of your plugins may be tested in isolation, most are tested with integration tests, through their interaction with Hardhat and potentially other plugins.

There are two ways to write integration tests of plugins in Hardhat 3. We'll briefly cover both of them, and then we'll add some tests to the extension of the `NetworkConnection` object we added a few sections ago.

### Testing with fixture projects

The simplest way to create an integration test for your plugin is by defining a Hardhat project and using it as a fixture.

To do it, you need to create a directory in `packages/plugin/test/fixture-projects`, and add a `hardhat.config.ts` and a `package.json` to it.

The `package.json` can be fairly simple, and should look something like this:

```json
{
  "name": "base-project",
  "version": "1.0.0",
  "type": "module",
  "private": true
}
```

The `hardhat.config.ts` can define whichever config you want, and must import your plugin. If you open `packages/plugin/test/fixture-projects/base-project/hardhat.config.ts`, you'll find this example:

```ts
import { HardhatUserConfig } from "hardhat/config";
import MyPlugin from "../../../src/index.js";

const config: HardhatUserConfig = {
  plugins: [MyPlugin],
};

export default config;
```

Finally, your tests would look something like this:

```ts
import { createFixtureProjectHRE } from "./helpers/fixture-projects.js";

describe("Fixture test example", () => {
  it("do something", async () => {
    const hre = await createFixtureProjectHRE("base-project");
    // Do wheatever you need with the hre
  });
});
```

Where `createFixtureProjectHRE` creates a new Hardhat Runtime Environment, based on a directory in `packages/plugin/test/fixture-projects`, using its `hardhat.config.ts`, and the directory as the root of the Hardhat project.

### Testing with inline `HardhatUserConfig`s

While fixture tests are simple, they can be cumbersome to maintain, as your test and its data are spread across multiple files.

An alternative way to test your plugin is to create an instance of the Hardhat Runtime Environment with an inline `HardhatUserConfig`.

This type of test looks something like this:

```ts
import { createHardhatRuntimeEnvironment } from "hardhat/hre";
import MyPlugin from "../src/index.js";

describe("Inline config test example", () => {
  it("do something", async () => {
    const hre = await createHardhatRuntimeEnvironment({
      plugins: [MyPlugin],
    });

    // Do whatever you need with the hre
  });
});
```

Note that the `hre` created like this won't have a `hre.config.paths.config` value, as it doesn't have any config file, and its root would be the directory closest to your current working directory that has a `package.json` file (just like npm would do). Both of these things are customizable, and you can learn about how by looking at the `createFixtureProjectHRE` function included in your template project.

### Testing your network config extension

We'll create a simple integration test for the `myAccount` property of the `NetworkConnection` object. We'll use the fixture project approach explained above, given its simplicity.

Let's start by deleting the `packages/plugin/test/example-tests.ts`, as they were testing the template plugin, so those tests no longer work.

Now, let's create a new file in `packages/plugin/test/myAccount.ts`, and add the following code:

```ts
import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { createFixtureProjectHRE } from "./helpers/fixture-projects.js";

describe("myAccount initialization on network connection", () => {
  it("should initialize the myAccount field on the network connection", async () => {
    const hre = await createFixtureProjectHRE("base-project");

    const connection = await hre.network.connect();
    const accounts: string[] = await connection.provider.request({
      method: "eth_accounts",
    });

    assert.equal(connection.myAccount, accounts[0]);
  });
});
```

Let's run `pnpm test` to make sure it works.

Now let's modify the `packages/plugin/test/fixture-projects/base-project/hardhat.config.ts` file and add the following network defintion:

```ts
networks: {
  withMyAccountIndexTooHigh: {
    type: "edr-simulated",
    myAccountIndex: 100000,
  },
}
```

so that we can test a failure case, by adding this to the describe block:

```ts
it("should throw a plugin error if the myAccountIndex is too high with respect to the accounts", async () => {
  const hre = await createFixtureProjectHRE("base-project");

  await assert.rejects(
    async () => {
      await hre.network.connect("withMyAccountIndexTooHigh");
    },
    HardhatPluginError, // Import it from "hardhat/plugins"
    "hardhat-plugin-template: Invalid index 100000 for myAccount when connecting to network withMyAccountIndexTooHigh"
  );
});
```

Run `pnpm test` again to make sure it works.

You can find more tests of the plugin in the [`myAccount.ts` test file](https://github.com/NomicFoundation/hardhat3-plugin-template/blob/tutorial/packages/plugin/test/myAccount.ts) in the `tutorial` branch of the template project.
