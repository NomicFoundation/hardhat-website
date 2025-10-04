---
title: Hardhat plugin development
description: How to build Hardhat 3 plugins to extend and customize its
---

# Hardhat plugin development

Welcome to the Hardhat plugin development documentaton. In this section, you'll learn how to extend and customize Hardhat's behavior using plugins.

## What is a Hardhat plugin?

A Hardhat plugin is a way to extend the functionality of Hardhat and its plugins.

They are defined as TypeScript objects with a `HardhatPlugin` type. They are the objects that the user adds to their `plugins` array in their `hardhat.config.ts` file.

This is how a plugin looks like:

```ts
import type { HardhatPlugin } from "hardhat/types/plugins";

import "./type-extensions.js";

const plugin: HardhatPlugin = {
  id: "hardhat-my-plugin",
  hookHandlers: {
    // The hook handlers that this plugin defines
  },
  tasks: [
    // The plugins that this tasks defines
  ],
  globalOptions: [
    // The global options that this plugin defines
  ]
  dependencies: [
    // Other plugins that this plugin depends on
  ],
};

export default plugin;
```

A plugin can define:

- Type extensions: which allow you to add extend the types of Hardhat's built-in types. For example, adding your custom fields to the `HardhatUserConfig` type.

- Hook Handlers: which are functions to customize different parts of the the behavior of Hardhat. We call each of the parts extensibility points a Hook.

- Tasks: which are exposed in the CLI and can be run with `npx hardhat <task>`.

- Global options: which are exposed in the CLI and can be used with `--<option>`. When you you define a global option, their value is available everywhere (hook handlers, tasks, tests, etc.).

- Dependencies: which are other plugins that this plugin depends on. Hardhat guarantees that the dependencies are loaded before the plugin itself.

## Get started

To build your first plugin, follow [this tutorial](./tutorial/setup.md).
