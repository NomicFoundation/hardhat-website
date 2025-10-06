---
title: Hardhat 3 plugin's lifecycle
description: An explanation about the lifecycle of a Hardhat 3 plugin
---

# Hardhat 3 plugin's lifecycle

This section explains the lifecycle of a Hardhat 3 plugin and its different components.

## Plugin import

A Hardhat 3 plugin is a TypeScript object with the `HardhatPlugin` type. It can be defined in any `.ts` file, but it's usually defined in the `index.ts` file of the plugin's package, and exported as `default`.

Importing it shouldn't generate any side effect at runtime, nor import anything other than Hardhat and the plugin's [Type Extensions](./type-extensions.md). All the actual behavior is in separate files that are loaded dynamically.

For example, the `index.ts` file of the [Hardhat 3 plugin template](https://github.com/NomicFoundation/hardhat3-plugin-template/blob/tutorial/packages/plugin/src/index.ts) looks like this:

```ts
import { task } from "hardhat/config";
import { ArgumentType } from "hardhat/types/arguments";
import type { HardhatPlugin } from "hardhat/types/plugins";

import "./type-extensions.js";

const plugin: HardhatPlugin = {
  id: "hardhat-my-plugin",
  hookHandlers: {
    config: () => import("./hooks/config.js"),
    network: () => import("./hooks/network.js"),
  },
  tasks: [
    task("my-task", "Prints a greeting.")
      .addOption({
        name: "who",
        description: "Who is receiving the greeting.",
        type: ArgumentType.STRING,
        defaultValue: "Hardhat",
      })
      .setAction(() => import("./tasks/my-task.js"))
      .build(),
  ],
};
```

Importing this file won't load any module apart from Hardhat's and the type extensions. The `./hooks/config.js`, `./hooks/network.js`, and `./tasks/my-task.js` are loaded when needed, as explained later in this document.

Structuring the plugin like this has two main advantages, without sacrificing type safety.

First, the initialization of Hardhat is faster, as it doesn't load all the files at once.

Second, it is more tolerant to installation and plugin errors, as an error in one of the dynamicly loaded files won't affect the rest of the system.

## Hardhat Runtime Environment initialization

This section explains the difference process of the lifecycle of a plugin that happen during the initialization of the Hardhat Runtime Environment, in order.

Note that in Hardhat 3 you can initialize multiple instances of the Hardhat Runtime Environment, so they can be run multiple times within the same process.

### Plugin list resolution

One of the first things that Hardhat does when initializing the Hardhat Runtime Environment is to resolve the list of plugins based on the `plugins` field in the user config, and the built-in plugins that are bundled with Hardhat.

To do this, Hardhat executes the `dependencies` function of each plugin, adding any new plugin to the list. This is a recursive process, in which the dependencies of dependencies are also added.

Once all the dependencies are loaded, the array of plugins is sorted so that:

- The built-in plugins are first
- Every dependency of a plugin comes before the plugin itself
- The relative order of the plugins in the config is preserved in the cases where it doesn't violate the above rules

The order of the plugins two things things:

- How Tasks are resolved
- How Chained Hooks are run

### Config Hooks are run

Later in the initialization process, Hardhat runs the different Hook Handlers in the `config` category:

- The function in `hookHandlers.config` is evaluated, if it exists.
- The returned function is called.
- The different hooks are run, including extending the user config, validating, and resolving it.

To learn more about this proces, read the [Config system](./config.md) explanation.

### Global Options resolution

Each plugin can define an array of Global Options definitions. They are resolved so that their names don't clash with one another.

Then, their values are read either from the command line arguments, or from the environment variables.

### Tasks defintions resolution

Finally, the Tasks definitions are resolved. This is done by flattening the `tasks` arrays in each plugin, and iterate the result in order to create the `hre.tasks` object.

This process runs multiple validations, which include checking that:

- The task names don't clash with one another
- Any subtask is defined after its parent task

It also defines the order in which tasks overrides are run, which is the reverse order in the flattened array.

## Hook Handlers' lifecycle

A plugin defines its Hook Handlers in the `hookHandlers` field of the plugin object. Each field is a function that imports a JavaScript module. For example, the `network` field could look like this:

```ts
{
  network: () => import("./hooks/network.js");
}
```

The first time an instance of the Hardhat Runtime Environment runs a Hook of a category, it Hardhat will invoke the functions in the `hookHandlers`'s field for that category, of every plugin.

The module that the function imports, must export as `default` a Hook Handler Category Factory, which is an async function that returns a `Partial<HookCategory>` object.

For example, the `./hooks/network.js` could look like this:

```ts
export default async (): Promise<Partial<NetworkHooks>> => {
  const handlers: Partial<NetworkHooks> = {
    // ...
  };

  return handlers;
};
```

Hardhat will call each Hoook Handler Category Factory at most once per instance of the Hardhat Runtime Environment and cache the result. It calls it the right after loading the module.

### Managing state associated to Hook Handlers

If you need to have state for your Hook Handlers, you can initialize it in the Hook Handler Category Factory, and use it in the Hook Handlers.

Note that te factory doesn't have access to the Hardhat Runtime Environment nor Hook Context, so the prefered way to do it is to define any necessary variables in the factory, but initialize the state in the Hook Handlers.

For example, you can store state associated to each `NetworkConnection` like this:

```ts
interface MyPluginState {}

export default async (): Promise<Partial<NetworkHooks>> => {
  const statePerConnection: WeakMap<
    NetworkConnection<ChainType | string>,
    MyPluginState
  > = new WeakMap();

  const handlers: Partial<NetworkHooks> = {
    async newConnection<ChainTypeT extends ChainType | string>(
      context: HookContext,
      next: (nextContext: HookContext) => Promise<NetworkConnection<ChainTypeT>>
    ): Promise<NetworkConnection<ChainTypeT>> {
      const connection = await next(context);

      statePerConnection.set(connection, {});

      return connection;
    },

    async closeConnection<ChainTypeT extends ChainType | string>(
      context: HookContext,
      networkConnection: NetworkConnection<ChainTypeT>,
      next: (
        nextContext: HookContext,
        nextNetworkConnection: NetworkConnection<ChainTypeT>
      ) => Promise<void>
    ): Promise<void> {
      if (statePerConnection.has(networkConnection) === true) {
        statePerConnection.delete(networkConnection);
      }

      return next(context, networkConnection);
    },
  };

  return handlers;
};
```

### Dynamic Hook Handler's lifecycle

The lifecycle of a Dynamic Hook Handler simpler, as it's manually registered and unregistered using `hre.hooks.registerHandlers` and `hre.hooks.unregisterHandlers`. They aren't lazy loaded, and are run just like any other Hook Handler.

## Task Actions' lifecycle

Task Actions are defined using the `setAction` method of the `TaskBuilder`s APIs. This looks like this:

```ts{8}
task("my-task", "Prints a greeting.")
  .addOption({
    name: "who",
    description: "Who is receiving the greeting.",
    type: ArgumentType.STRING,
    defaultValue: "Hardhat",
  })
  .setAction(() => import("./tasks/my-task.js"))
  .build(),
```

You should provide a function that loads a module. This function is called the first time the task action needs to be run, and the result is cached.

The module must export as default the function that implements the Task Action.

For example, the `./tasks/my-task.js` could look like this:

```ts
export default async function (
  taskArguments: MyTaskTaskArguments,
  hre: HardhatRuntimeEnvironment
) {
  console.log(`${hre.config.myConfig.greeting}, ${taskArguments.who}!`);
}
```

## Configuration Variables' lifecycle

A plugin can extend the config of Hardhat adding new Configuration Variables, and also customizing how Configuration Variables work.

To do that, you need to understand their lifecycle.

A Configuration Variable is created by calling the `configVariable` function exported by `hardhat/config`. It returns a `ConfigurationVariable` object, which is mostly the name of a value that may later be loaded.

A `ConfigurationVariable` object is part of the `HardhatUserConfig`, so will go through the config validation and resolution process. During the config resolution, it's resolved by calling the `resolveConfigurationVariable` that's received by the `resolveUserConfig` Hook Handlers.

Resolving it turns the `ConfigurationVariable` to a `ResolvedConfigurationVariable`, but doesn't read its associated value yet. Instead, it's just used as part of the resolved config.

When a task, script, or plugin wants to read the value of a Configuration Variable, it must use one of the `ResolvedConfigurationVariable`'s getters. This will call the `ConfigurationVariables#fetchValue` Hook to read the value and cache it.
