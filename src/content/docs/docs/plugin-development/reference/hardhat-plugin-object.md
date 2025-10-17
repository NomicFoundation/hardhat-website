---
title: The HardhatPlugin object
description: Reference documentation for the HardhatPlugin object
---

# The `HardhatPlugin` object

This document explains the `HardhatPlugin` type, which is used to define a Hardhat 3 plugin.

This is how its TypeScript interface looks:

```ts
export interface HardhatPlugin {
  id: string;

  npmPackage?: string | null;

  dependencies?: () => Array<Promise<{ default: HardhatPlugin }>>;

  conditionalDependencies?: Array<{
    condition: () => Array<Promise<{ default: HardhatPlugin }>>;
    plugin: () => Promise<{ default: HardhatPlugin }>;
  }>;

  hookHandlers?: HookHandlerCategoryFactories;

  globalOptions?: OptionDefinition[];

  tasks?: TaskDefinition[];
}
```

## Properties

### `id`

The plugin's id, which must be unique across all Hardhat plugins.

If you're publishing your plugin as an npm package, consider using the package name as the plugin's id.

### `npmPackage`

If you don't use the npm package name as the plugin's id, you must specify it here.

The `null` value is reserved for plugins that are bundled with Hardhat.

### `dependencies`

A function that returns an array of promises that resolve to `HardhatPlugin` objects.

It typically looks like this:

```ts
dependencies: () => [import("dependency1"), import("dependency2"), ...],
```

To learn when this function is called, read the [Lifecycle of the components of a Hardhat 3 plugin](../explanations/lifecycle.md) explanation.

### `conditionalDependencies`

Conditional dependencies are plugins that are only loaded when certain other plugins are present, without forcing those plugins to be loaded.

For example, if your plugin has different behavior when the user is using `@nomicfoundation/hardhat-viem`, you can define a conditional dependency like this:

```ts
conditionalDependencies: [
  {
    condition: () => [import("hardhat-viem")],
    plugin: () => import("./viem-functionality.js"),
  },
],
```

Learn more about how they are loaded in the [Lifecycle of the components of a Hardhat 3 plugin](../explanations/lifecycle.md) explanation.

### `hookHandlers`

An object that defines the Hook Handlers of the plugin.

Its keys are the different categories of Hooks, and their values are functions that return a `HookHandlerCategoryFactory`.

You can learn more about Hook Handlers in the [Hooks and Hook Handlers](../explanations/hooks.md) explanation.

### `globalOptions`

An array of Global Option definitions. You can create them using the `globalOption` function exported by `hardhat/config`.

### `tasks`

An array of Task definitions. Define them using the `task` and `overrideTask` functions exported by `hardhat/config`.
