---
title: Lifecycle of the components of a Hardhat 3 plugin
description: An explanation about the lifecycles of a Hardhat 3 plugin
sidebar:
  label: Lifecycle of a plugin
  order: 1
---

This section explains the lifecycle of a Hardhat 3 plugin and its different components.

## Plugin lifecycle

The lifecycle of a Hardhat plugin can be divided into two parts: importing the plugin and the initialization of the Hardhat Runtime Environment.

### Plugin import

A Hardhat 3 plugin is a TypeScript object with the `HardhatPlugin` type. It can be defined in any `.ts` file, but it's usually defined in the `index.ts` file of the plugin's package and exported as `default`.

Importing it shouldn't generate any side effects at runtime or import anything other than Hardhat and the plugin's [Type Extensions](/docs/plugin-development/explanations/type-extensions). All the actual behavior must be in separate files that are loaded dynamically.

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

Importing this file only loads Hardhat's modules and the type extensions.

The `./hooks/config.js`, `./hooks/network.js`, and `./tasks/my-task.js` modules are loaded when needed, as explained later in this document.

Structuring the plugin like this has two main advantages while maintaining type safety.

First, the initialization of Hardhat is faster, as it doesn't load all the files at once.

Second, it's more tolerant to installation and plugin errors, as an error in one of the dynamically loaded files won't affect the rest of the system.

### Hardhat Runtime Environment initialization

This section explains the different parts of the lifecycle of a plugin that happen during the initialization of the Hardhat Runtime Environment, in order.

Note that in Hardhat 3 you can initialize multiple instances of the Hardhat Runtime Environment, so they can run multiple times within the same process.

#### Plugin list resolution

When initializing the Hardhat Runtime Environment, Hardhat creates an ordered list of plugins based on the `plugins` field in the user config and the built-in plugins bundled with Hardhat.

To do this, Hardhat executes the [`dependencies`](/docs/plugin-development/reference/hardhat-plugin-object#dependencies) function of each plugin, adding any new plugin to the list.

At the same time, it loads the [`conditionalDependencies`](/docs/plugin-development/reference/hardhat-plugin-object#conditionaldependencies) of each plugin by calling the `condition` function of each of them and checking if they're already loaded. If they are, the `plugin` function is called and the plugin is added to the list.

This is a recursive process where the dependencies of dependencies are also added, along with conditional dependencies. Hardhat runs it until all plugins are loaded.

Once that's completed, the array of plugins is sorted following these rules:

- Every dependency of a plugin comes before the plugin itself
- The built-in plugins come before external plugins
- The relative order of the plugins in the config is preserved in the cases where it doesn't violate the above rules

The order of the plugins is important because it determines how Task Actions of overridden tasks are run, and the order in which Hook Handlers of Chained Hooks are executed.

#### Config Hooks are run

Later in the initialization process, Hardhat runs the different Hook Handlers in the `config` category. These follow the process explained in [Hook Handlers' lifecycle](#hook-handlers-lifecycle).

The only difference from config Hook Handlers is that they don't have access to the Hook Context, as they're executed before it's created.

To learn more about this process, read the [Config System explanation](/docs/plugin-development/explanations/config).

#### Global Options resolution

Each plugin can define an array of Global Option definitions. Hardhat resolves them so their names don't clash with one another.

Then, their values are read from the command line arguments or the environment variables.

#### Tasks definitions resolution

Finally, Hardhat resolves the Tasks definitions by combining all the `tasks` arrays from each plugin into a single list. It then iterates through this list to create the `hre.tasks` object.

This process runs multiple validations, including checking that:

- The task names don't clash with one another
- Any subtask is defined after its parent task

It also defines the order in which task overrides run. When multiple plugins override a task, Hardhat runs their actions in reverse order, starting with the last plugin in the list.

## Hook Handlers' lifecycle

A plugin defines its Hook Handlers in the `hookHandlers` field of the plugin object. Each field is a function that imports a JavaScript module.

For example, the `network` field could look like this:

```ts
{
  network: () => import("./hooks/network.js");
}
```

When a Hook of a specific category runs for the first time in a Hardhat Runtime Environment instance, Hardhat needs to load the Hook Handlers for that category. It does this by calling the import function defined in the `hookHandlers` field of every plugin.

The imported module must export a Hook Handler Category Factory as its `default` export. The factory is an async function that returns a `Partial<HookCategory>` object.

For example, the `./hooks/network.js` could look like this:

```ts
export default async (): Promise<Partial<NetworkHooks>> => {
  const handlers: Partial<NetworkHooks> = {
    // ...
  };

  return handlers;
};
```

Hardhat calls each Hook Handler Category Factory only when needed, immediately after loading the module.

Hardhat caches the result of the Hook Handler Category Factory, so it's only called once per instance of the Hardhat Runtime Environment, if needed.

### Managing state associated with Hook Handlers

If you need state for your Hook Handlers, you can initialize it in the Hook Handler Category Factory and use it in the Hook Handlers.

Note that the factory doesn't have access to the Hardhat Runtime Environment or Hook Context, so the preferred way to do it is to define any necessary variables in the factory, but initialize the state in the Hook Handlers.

For example, you can store state associated with each `NetworkConnection` like this:

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
      next: (
        nextContext: HookContext,
      ) => Promise<NetworkConnection<ChainTypeT>>,
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
        nextNetworkConnection: NetworkConnection<ChainTypeT>,
      ) => Promise<void>,
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

### Dynamic Hook Handlers' lifecycle

The lifecycle of a Dynamic Hook Handler is simpler, as it's manually registered and unregistered using `hre.hooks.registerHandlers` and `hre.hooks.unregisterHandlers`. They aren't lazy loaded and run just like any other Hook Handler.

## Task Actions' lifecycle

You define Task Actions using the `setAction` method of the `TaskDefinitionBuilder`s APIs.

It looks like this:

```ts {8}
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

The `setAction` method expects a function that loads a module. When the task runs for the first time in a Hardhat Runtime Environment instance, Hardhat loads the actions associated with the task when needed, calling this function to load the module and caching the result for future runs in that instance. If the task isn't overridden, Hardhat loads a single action.

The module must export the Task Action function as its `default` export.

For example, the `./tasks/my-task.js` could look like this:

```ts
export default async function (
  taskArguments: MyTaskTaskArguments,
  hre: HardhatRuntimeEnvironment,
) {
  console.log(`${hre.config.myConfig.greeting}, ${taskArguments.who}!`);
}
```

## Configuration Variables' lifecycle

There are two things that plugins can do with Configuration Variables:

- Extend the config of Hardhat by adding fields that accept Configuration Variables
- Customize how Configuration Variables work

To do either of them, you need to understand their lifecycle.

Users create a Configuration Variable by calling the `configVariable` function exported by `hardhat/config`. This returns a `ConfigurationVariable` object, which is mostly the name of a value that may be loaded later.

A `ConfigurationVariable` object is part of the `HardhatUserConfig`, so it goes through the config validation and resolution process. During config resolution, plugins resolve it by calling the `resolveConfigurationVariable` function that `ConfigHooks#resolveUserConfig` Hook Handlers receive.

Resolving it turns the `ConfigurationVariable` into a `ResolvedConfigurationVariable`, but doesn't read its associated value yet. Instead, it's just used as part of the resolved config.

When a task, script, or plugin wants to read the value of a Configuration Variable, it must use one of the `ResolvedConfigurationVariable`'s getters. This runs the `ConfigurationVariableHooks#fetchValue` Hook to read and cache the value.
