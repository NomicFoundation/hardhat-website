---
title: Migrate from Hardhat 2
description: How to migrate from Hardhat 2 to Hardhat 3
---

# Migrate from Hardhat 2

:::tip

Hardhat 3 is production-ready and you can migrate today! We'll keep it in beta status as we work on missing features and stabilize it in the near future.

:::

## Overview

Hardhat 3 is a complete rewrite of Hardhat 2. While many features are familiar, several fundamental changes mean the new version is not compatible with Hardhat 2 projects out of the box:

- **ESM-first**: Your Hardhat config must be an ES module. Scripts and JavaScript/TypeScript tests can still be CommonJS, but ESM is the default.
- **Declarative config**: Plugins, tasks, and other extensions are configured explicitly in your config instead of being registered by side effects.
- **Explicit network connections**: You create and manage network connections yourself, allowing multiple concurrent connections in one process, but meaning that `hre.network` no longer represents a single network connection that is immediately available.
- **Extensibility through hooks**: Features like `extendConfig` and subtask overriding were replaced by the new hooks system. Adding new fields to the Hardhat Runtime Environment with `extendEnvironment` is no longer possible, but the typical use cases for extending it can be covered by other mechanisms.

Because these changes are significant, this guide recommends starting with a clean config and migrating features step by step, rather than trying to adapt an Hardhat 2 project in place.

## Before starting the migration

Before making any changes, prepare your project so that installing and running Hardhat 3 won’t conflict with leftover dependencies, configs, or build artifacts from Hardhat 2.

1. **Check node.js version**

   Make sure you are using Node.js v22.10.0 or later:

   ```bash
   node --version
   ```

2. **Clear caches and artifacts**

   Run the `clean` task to avoid issues with stale artifacts or caches:

   ::::tabsgroup{options=npm,pnpm,yarn}

   :::tab{value=npm}

   ```bash
   npx hardhat clean
   ```

   :::

   :::tab{value=pnpm}

   ```bash
   pnpm hardhat clean
   ```

   :::

   :::tab{value=yarn}

   ```bash
   yarn hardhat clean
   ```

   :::

   ::::

3. **Remove Hardhat 2 dependencies**

   Start by removing these packages from your `package.json`:

   - `hardhat`
   - Any packages starting with `hardhat-`, `@nomicfoundation/`, or `@nomiclabs/`
   - `solidity-coverage`

   Then reinstall and check for remaining packages that depend on Hardhat:

   ::::tabsgroup{options=npm,pnpm,yarn}

   :::tab{value=npm}

   ```bash
   npm install && npm ls hardhat
   ```

   :::

   :::tab{value=pnpm}

   ```bash
   pnpm install && pnpm why hardhat
   ```

   :::

   :::tab{value=yarn}

   ```bash
   yarn install && yarn why hardhat
   ```

   :::

   ::::

   Repeat until no Hardhat-related dependencies remain.

4. **Rename your old config**

   Keep your old config for reference, but rename it so you can create a new one alongside it:

   ```bash
   mv hardhat.config.js hardhat.config.old.js
   ```

5. **Make your project ESM**

   Run the following command to set the correct `type` field in your `package.json`:

   ::::tabsgroup{options=npm,pnpm,yarn}

   :::tab{value=npm}

   ```bash
   npm pkg set type=module
   ```

   :::

   :::tab{value=pnpm}

   ```bash
   pnpm pkg set type=module
   ```

   :::

   :::tab{value=yarn}

   ```bash
   # yarn doesn't have a direct command to set the type,
   # so you'll have to manually add it to your package.json
   ```

   :::

   ::::

6. **(Optional) Adapt your `tsconfig.json`**

   If you have a `tsconfig.json` file, make sure that `compilerOptions.module` is set to an ESM-compatible value like `"esnext"`.

## Setting up Hardhat 3

With your npm project ready, you can start setting up Hardhat 3.

1. **Install Hardhat 3**

   Run the following command to install Hardhat 3:

   ::::tabsgroup{options=npm,pnpm,yarn}

   :::tab{value=npm}

   ```bash
   npm install --save-dev hardhat
   ```

   :::

   :::tab{value=pnpm}

   ```bash
   pnpm install --save-dev hardhat
   ```

   :::

   :::tab{value=yarn}

   ```bash
   yarn add --dev hardhat
   ```

   :::

   ::::

2. **Create an empty config file**

   Create a `hardhat.config.ts` file with the following content:

   ```ts
   import type { HardhatUserConfig } from "hardhat/config";

   const config: HardhatUserConfig = {};

   export default config;
   ```

3. **Run the help command**

   Verify that Hardhat 3 is working by running the help command:

   ::::tabsgroup{options=npm,pnpm,yarn}

   :::tab{value=npm}

   ```bash
   npx hardhat --help
   ```

   :::

   :::tab{value=pnpm}

   ```bash
   pnpm hardhat --help
   ```

   :::

   :::tab{value=yarn}

   ```bash
   yarn hardhat --help
   ```

   :::

   ::::

## Progresively migrating your config

With a minimal version of Hardhat 3 working, you can migrate your config bit by bit.

Let's start with the minimal settings required to compile your contracts.

1. **Add a `solidity` entry**

   Copy the `solidity` entry from your old config as-is. The format is backwards-compatible in Hardhat 3, so it should just work:

   ```ts
   const config: HardhatUserConfig = {
     solidity: {
       /* your solidity config */
     },
   };
   ```

2. **Compile your contracts**

   Run the `build` task to verify that your config is working:

   ::::tabsgroup{options=npm,pnpm,yarn}

   :::tab{value=npm}

   ```bash
   npx hardhat build
   ```

   :::

   :::tab{value=pnpm}

   ```bash
   pnpm hardhat build
   ```

   :::

   :::tab{value=yarn}

   ```bash
   yarn hardhat build
   ```

   :::

   ::::

To learn more about the updated config format, and continue with your migration, please take a look at [this section](../docs/reference/configuration.md#solidity-configuration).

## Migrating tests

This section assumes that your Hardhat 2 project uses Mocha as its tests runner, which is the default experience.

1. **Install the recommended toolbox for Mocha and Ethers.js**

   Install the plugin:

   ::::tabsgroup{options=npm,pnpm,yarn}

   :::tab{value=npm}

   ```bash
   npm install --save-dev @nomicfoundation/hardhat-toolbox-mocha-ethers
   ```

   :::

   :::tab{value=pnpm}

   ```bash
   pnpm install --save-dev @nomicfoundation/hardhat-toolbox-mocha-ethers
   ```

   :::

   :::tab{value=yarn}

   ```bash
   yarn add --dev @nomicfoundation/hardhat-toolbox-mocha-ethers
   ```

   :::

   ::::

   Then in your Hardhat config, import the plugin and add it to the list of plugins:

   ```ts
   import type { HardhatUserConfig } from "hardhat/config";
   import hardhatToolboxMochaEthers from "@nomicfoundation/hardhat-toolbox-mocha-ethers";

   const config: HardhatUserConfig = {
     plugins: [hardhatToolboxMochaEthers],
     solidity: {
       /* your solidity config */
     },
   };
   ```

   Notice that, unlike Hardhat 2, it's not enough to just import the plugin in the config. You also have to add it to the list of plugins.

2. **Update your test files**

   This is usually the most involved part of the migration, and so it has [its own page](/migrate-from-hardhat2/mocha-tests) with the details.

   You can start by migrating a single test and run it individually to verify that it works as expected:

   ::::tabsgroup{options=npm,pnpm,yarn}

   :::tab{value=npm}

   ```bash
   npx hardhat test test/some-test.ts
   ```

   :::

   :::tab{value=pnpm}

   ```bash
   pnpm hardhat test test/some-test.ts
   ```

   :::

   :::tab{value=yarn}

   ```bash
   yarn hardhat test test/some-test.ts
   ```

   :::

   ::::

<!-- Commented out until we have setInlineAction(...)

## Migrating tasks

In Hardhat 2, tasks are created just by calling the `task` function and defining the task. As a side-effect, this task gets registered in the Hardhat Runtime Environment. In Hardhat 3 the config is fully declarative, meaning that tasks must be included in the `tasks` array:

```ts
import { HardhatUserConfig, task } from "hardhat/config";

const myTask = task("my-task", "Description of the task")
  .setAction(async (args, hre) => {
    // Task implementation
  })
  .build();

const config: HardhatUserConfig = {
  tasks: [myTask],
};

export default config;
```

Notice that we are also calling a `.build` function on the task. This is necessary in Hardhat 3 to finalize the task definition and make it available for use.

-->

## Migrating `extendConfig` and `extendEnvironment`

These extensibility points were replaced by the hook system. We'll add details on how to migrate them soon.

## Migration blockers

If your migration is blocked by a missing feature or plugin, please let us know [in this issue](https://github.com/NomicFoundation/hardhat/issues/7207).
