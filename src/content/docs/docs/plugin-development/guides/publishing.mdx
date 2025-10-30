---
title: Publishing a plugin
description: How to publish your plugin to npm
sidebar:
  order: 5
---

This guide shows you how to publish your plugin to npm, so that other users can install it.

## Documenting your plugin

Before publishing your plugin, document it in its `README.md` file.

Make sure your plugin documentation includes at least:

- What the plugin does
- How to install it
- How to configure it
- What tasks and global options it defines
- How it modifies Hardhat's behavior (if it uses Hooks or overrides tasks)

### Documenting the installation process

Hardhat plugins use `peerDependencies` in five cases:

1. When they depend on other Hardhat plugins
2. When they depend on a package that the user may import directly (e.g. `viem`)
3. When they depend on a package that the user may run directly (e.g. `mocha`)
4. When they expose parts of a package in their public API
5. When using a package that has peer dependencies

To learn more about why and how to use `peerDependencies` in Hardhat plugins, read the [Peer dependencies in Hardhat 3 plugins](/docs/plugin-development/explanations/peer-dependencies) explanation.

When documenting how to install your plugin, tell the user to install your package and any `peerDependencies` from cases (2) and (3) above, except for `hardhat` itself.

If you don't document this, the user installation may fail, as some package managers will autoinstall the `peerDependencies` of your plugin, but they may not make them available to the user's project. This can lead to import errors.

As an exception, `yarn` doesn't autoinstall `peerDependencies` by default, so consider adding a note about this in your documentation.

## Publishing process

You don't need to follow any specific process to publish your plugin, but here are some common patterns.

### Single-plugin package

When you publish your plugin as a separate package, follow these two steps:

1. Make sure your [plugin's `id`](/docs/plugin-development/reference/hardhat-plugin-object#id) matches the package name
2. Define the [main entry point in your `package.json` file](https://nodejs.org/api/packages.html#main-entry-point-export) to point to the module that exports your `HardhatPlugin` object as `default`.

This lets users import your plugin like this:

```ts {2,5}
import { HardhatUserConfig } from "hardhat/types";
import myPlugin from "my-plugin";

const config: HardhatUserConfig = {
  plugins: [myPlugin],
};
```

### Multiple plugins in a single package

You can also publish a single package with multiple plugins. Each plugin will be exported as `default` in a different module of your package.

Your users will import each plugin with a different import path, like this:

```ts {2,3,6}
import { HardhatUserConfig } from "hardhat/types";
import myPlugin1 from "my-package/my-plugin1";
import myPlugin2 from "my-package/my-plugin2";

const config: HardhatUserConfig = {
  plugins: [myPlugin1, myPlugin2],
};
```

In this case, ensure that:

1. Each [plugin's `id`](/docs/plugin-development/reference/hardhat-plugin-object#id) is unique
2. Each [plugin's `npmPackage`](/docs/plugin-development/reference/hardhat-plugin-object#npmpackage) is set to the name of the package. All the plugins in the same package must have the same `npmPackage` value.
3. You add the [`exports` field to your `package.json`](https://nodejs.org/api/packages.html#subpath-exports) with an entry for each plugin's module
