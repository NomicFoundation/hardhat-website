---
title: Hardhat plugin development
description: How to build Hardhat 3 plugins to extend and customize its behavior
---

# Hardhat plugin development

Welcome to the Hardhat plugin development documentation. In this section, you'll learn how to extend and customize Hardhat's behavior using plugins.

## What is a Hardhat plugin?

A Hardhat plugin is a reusable extension of the functionality of Hardhat and its plugins.

Plugins are defined as TypeScript objects with a `HardhatPlugin` type. Users add them to the `plugins` array in their `hardhat.config.ts` file.

Let's look at the structure of a basic plugin:

```ts
import type { HardhatPlugin } from "hardhat/types/plugins";

import "./type-extensions.js";

const plugin: HardhatPlugin = {
  id: "hardhat-my-plugin",
  hookHandlers: {
    // The hook handlers that this plugin defines
  },
  tasks: [
    // The tasks that this plugin defines
  ],
  globalOptions: [
    // The global options that this plugin defines
  ],
  dependencies: [
    // Other plugins that this plugin depends on
  ],
  conditionalDependencies: [
    // Plugins that are loaded only if the user is already using certain other plugins
  ],
};

export default plugin;
```

A plugin can define:

- **Type Extensions** allow you to extend Hardhat's built-in types. For example, you can add custom fields to the `HardhatUserConfig` type. Read more about them [here](/plugin-development/explanations/type-extensions.md).

- **Hook Handlers** are functions that customize different parts of Hardhat's behavior. Each extensibility point is called a Hook. Learn more about them [here](/plugin-development/explanations/hooks.md).

- **Hardhat Tasks** are exposed in the CLI and can be run with `npx hardhat <task>`.

- **Global Options** are exposed in the CLI and can be used with `--<option>`. When you define a Global Option, its value is available everywhere (Hook Handlers, Hardhat Tasks, tests, etc.).

- **Dependencies** specify other plugins that this plugin depends on. Hardhat guarantees that dependencies are loaded before the plugin itself. Read [this guide](/plugin-development/guides/dependencies.md) to learn how to use them.

- **Conditional Dependencies** declare plugins that are loaded only if the user is already using certain other plugins, without forcing those to be loaded.

## Get started

Ready to build your first plugin? The [tutorial](/plugin-development/tutorial/index.md) walks you through creating a complete plugin from scratch, covering project setup, defining hooks, adding tasks, and testing your plugin.
