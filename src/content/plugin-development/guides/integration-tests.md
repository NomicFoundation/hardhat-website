---
title: Writing integration tests for plugins
description: How to write integration tests for your plugin
---

# Writing integration tests for plugins

While some parts of your plugin may be tested in isolation, most are tested with integration tests, through their interaction with Hardhat and potentially other plugins.

There are two ways to write integration tests of plugins in Hardhat 3.

### Testing with fixture projects

The simplest way to create an integration test for your plugin is by defining a Hardhat project and using it as a test fixture.

We'll explain how to do this based on the [Hardhat 3 plugin template](https://github.com/nomicfoundation/hardhat3-plugin-template/). Follow [this guide](../guides/hardhat3-plugin-template.md) before continuing.

In your project based on the template, you can define a fixture project by creating a directory in `packages/plugin/test/fixture-projects` and adding a `hardhat.config.ts` and a `package.json` to it.

The `package.json` can be fairly simple and should look something like this:

```json
{
  "name": "base-project",
  "version": "1.0.0",
  "type": "module",
  "private": true
}
```

The `hardhat.config.ts` can define whichever config you want and must import your plugin. If you open `packages/plugin/test/fixture-projects/base-project/hardhat.config.ts`, you'll find this example:

```ts
import { HardhatUserConfig } from "hardhat/config";
import MyPlugin from "../../../src/index.js";

const config: HardhatUserConfig = {
  plugins: [MyPlugin],
};

export default config;
```

Finally, your tests would look something like this:

```ts
import { createFixtureProjectHRE } from "./helpers/fixture-projects.js";

describe("Fixture test example", () => {
  it("do something", async () => {
    const hre = await createFixtureProjectHRE("base-project");
    // Do whatever you need with the hre
  });
});
```

The `createFixtureProjectHRE` function initializes a new Hardhat Runtime Environment, based on a directory in `packages/plugin/test/fixture-projects`, using its `hardhat.config.ts`, and the directory as the root of the Hardhat project.

### Testing with inline `HardhatUserConfig`s

While fixture tests are simple, they can be cumbersome to maintain, as your test and its data are spread across multiple files.

An alternative way to test your plugin is to create an instance of the Hardhat Runtime Environment with an inline `HardhatUserConfig`.

This type of test looks something like this:

```ts
import { createHardhatRuntimeEnvironment } from "hardhat/hre";
import MyPlugin from "../src/index.js";

describe("Inline config test example", () => {
  it("do something", async () => {
    const hre = await createHardhatRuntimeEnvironment({
      plugins: [MyPlugin],
    });

    // Do whatever you need with the hre
  });
});
```

Note that the `hre` created with an inline config will have two small differences:

1. It won't have an `hre.config.paths.config` value, as it doesn't have a config file
2. Its `hre.config.paths.root` will be the closest directory to your current working directory that has a `package.json` file (just like npm does).

Both of these are customizable. Learn how by looking at the `createFixtureProjectHRE` function in the [Hardhat 3 plugin template](https://github.com/nomicfoundation/hardhat3-plugin-template/).
