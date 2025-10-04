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

### Plugins list resolution

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

The first time an instance of the Hardhat Runtime Environment runs a Hook of a specific category, all the

**TODO**

### Dynamic Hook Handler's lifecycle

The lifecycle of a Dynamic Hook Handler simpler, as it's manually registered and unregistered, using `hre.hooks.registerHandlers` and `hre.hooks.unregisterHandlers`. They aren't lazy loaded, and are run just like any other Hook Handler.

## Task actions' lifecycle

**TODO**

## Configuration Variables' lifecycle

**TODO**
