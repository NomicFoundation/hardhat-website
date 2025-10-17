---
title: Peer dependencies in Hardhat 3 plugins
description: An explanation about Hardhat 3 plugins and peer dependencies
---

# Peer dependencies in Hardhat 3 plugins

Hardhat plugins make extensive use of `peerDependencies`, so it's important to understand what they are and how to use them.

## Understanding `peerDependencies`

A `peerDependency` declares that your package expects the consumer (the project using your package) to have a specific dependency. Your package will use the same instance of that dependency as the consumer. This allows multiple packages in the dependency graph to share a single version and instance of a package, rather than each having their own separate copy.

By sharing the same instance, all consumers of that package see the exact same code and share any state held by that package, which is crucial for packages that rely on global state.

For example, if a Hardhat project has multiple plugins with `hardhat` as a `peerDependency`, all the plugins can trust that `import hre from "hardhat"` will return the same instance of Hardhat Runtime Environment.

## When to use `peerDependencies`

You should use a `peerDependency` when you expose part of a dependency in your public API. This can happen in multiple scenarios:

- Reexporting a type or value from a dependency
- Accepting a type from a dependency in a public API
- Returning a type from a dependency in a public API

For example, if you use `viem` and expose its `WalletClient` type, you should declare `viem` as a `peerDependency`.

In the context of Hardhat plugins, this means that:

- Hardhat must be a `peerDependency` of your plugin
- If your plugin depends on a package that the user may import directly (e.g. `viem`), it should be a `peerDependency`
- If your plugin depends on a package that the user may run directly (e.g. `mocha`), it should be a `peerDependency`
- If your plugin exposes a part of a dependency in any other way, it should be a `peerDependency`
- If your plugin depends on a package that has peer dependencies, you should also declare those as `peerDependencies` (peer dependencies are not transitive and must be declared explicitly)

## Misconceptions about `peerDependencies`

Common misconceptions about `peerDependencies`:

- **They're optional dependencies.** This is incorrect. Most package managers will automatically install them.
- **They let users choose dependency versions.** While this is possible, the essence of `peerDependencies` is to ensure multiple packages share the same installation of a dependency.

## Development experience of `peerDependencies`

When using `peerDependencies`, also declare them as `devDependencies` in your `package.json` file with the same version range. This is a good practice that improves the development experience, though requirements may vary by package manager.
