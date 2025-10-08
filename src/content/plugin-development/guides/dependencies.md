---
title: Using dependencies in your plugin
description: How to use dependencies in your plugin
---

# Using dependencies in your plugin

This guide shows you how to use dependencies in your plugin, including how to use other plugins as dependencies.

Hardhat plugins make extensive use of `peerDependencies`, so it's important to understand what they are, and how to use them.

## Understanding `peerDependencies`

A `peerDependency` is a way to declare that your package expects the consumer (the project using your package) to have a specific dependency, and that your package will use the same instance of that dependency as the consumer. This allows multiple packages in the dependency graph to share a single version and instance of a package, rather than each having their own separate copy.

By sharing the same instance, all consumers of that package see the exact same code and share any state held by that package, which is crucial for packages that rely on global state.

For example, if a Hardhat project has multiple plugins with `hardhat` as a `peerDependency`, they can all be sure that `import hre from "hardhat"` will always return the same instance of Hardhat Runtime Environment.

### When to use `peerDependencies`

You should use a `peerDependency` when you expose part of a dependency in your public API. This can happen in multiple scenarios, like:

- Reexporting a type or value from a dependency
- Accepting a type from a dependency in a public API
- Returning a type from a dependency in a public API

For example, if you use `viem` and expose its `WalletClient` type, you should declare `viem` as a `peerDependency`.

In the context of Hardhat plugins, this means that:

- Hardhat must be a `peerDependency` of your plugin
- If your plugin depends on a package that the user may import directly (e.g. `viem`), it should be a `peerDependency`
- If your plugin depends on a package that the user may run directly (e.g. `mocha`), it should be a `peerDependency`
- If your plugin exposes a part of a dependency in any other way, it should be a `peerDependency`
- If your plugin depends on a package that has peer dependencies, they should also be declared as `peerDependencies`, because peer dependencies are not transitive and must be declared explicitly

### Misconceptions about `peerDependencies`

Some common misconceptions about `peerDependencies` are:

- They are optional dependencies that the user may install or not. This is incorrect, and most package managers will automatically install them.
- They are a way to let the user choose which version of a dependency to use. While they can be used for this, the essence of `peerDependencies` is to ensure that multiple packages share the same installation of a dependency.

### Development experience of `peerDependencies`

When using `peerDependencies`, it's helpful to also declare them as `devDependencies` in your `package.json` file, using the same version range. This depends on the package manager you are using, but it's a good practice to do so.

## Using another plugin as a dependency

You can use another Hardhat plugin as a dependency in your plugin.

To do this, you need to:

1. Declare it as a `peerDependency` and `devDependency` in your `package.json` file.
2. Declare any peer dependencies of that plugin as peer and dev dependencies in your own `package.json` file.
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

When you declare a plugin as a dependency, you can be sure that its Hook Handlers, Tasks, and Global Options will be loaded when your plugin is loaded.

To learn more about how the plugin dependencies are loaded, read the [Lifecycle of the components of a Hardhat 3 plugin](../explanations/lifecycle.md) explanation.
