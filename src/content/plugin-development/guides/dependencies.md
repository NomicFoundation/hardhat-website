---
title: Plugin dependencies
description: How to use other plugins as dependencies
---

# Plugin dependencies

This guide shows you how to build on top of other Hardhat plugins by using them as dependencies in your plugin.

## Using another plugin as a dependency

To use another plugin as a dependency, you need to:

1. Declare it as a `peerDependency` and `devDependency` in your `package.json` file
2. Declare any peer dependencies of that plugin as peer and dev dependencies in your own `package.json` file
3. Add it to the `dependencies` field of your `HardhatPlugin` object

Here's how a plugin that depends on `another-plugin` would look:

```ts
import type { HardhatPlugin } from "hardhat/types/plugins";

import "./type-extensions.js";

const plugin: HardhatPlugin = {
  id: "hardhat-my-plugin",
  dependencies: () => [import("another-plugin")],
  // ...
};

export default plugin;
```

When you declare a plugin as a dependency, its Hook Handlers, Tasks, and Global Options will be loaded before your plugin's.

## Learn more

To learn more about why and how to use `peerDependencies` in Hardhat plugins, read the [Peer dependencies in Hardhat 3 plugins](../explanations/peer-dependencies.md) explanation.

To learn more about how the plugin dependencies are loaded, read the [Lifecycle of the components of a Hardhat 3 plugin](../explanations/lifecycle.md) explanation.
