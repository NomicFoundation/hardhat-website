---
title: Writing integration tests for plugins
description: How to write integration tests for your plugin
---

# Writing integration tests for plugins

While you can test some parts of your plugin in isolation, most testing happens through integration tests that verify how your plugin works with Hardhat and other plugins.

In Hardhat 3 there are two main approaches for writing integration tests.

## Testing with fixture projects

The simplest way to create an integration test for your plugin is by defining a Hardhat project and using it as a test fixture.

Here's how to do this using the [Hardhat 3 plugin template](https://github.com/nomicfoundation/hardhat3-plugin-template/). Follow [this guide](../guides/hardhat3-plugin-template.md) to learn how to use the template before continuing.

To define a fixture project in your template-based repository, create a directory in `packages/plugin/test/fixture-projects` with a `hardhat.config.ts` and a `package.json`.

The `package.json` can be fairly simple and should look something like this:

```json
{
  "name": "base-project",
  "version": "1.0.0",
  "type": "module",
  "private": true
}
```

The `hardhat.config.ts` can define whichever config you want, but it must import your plugin. Here's an example from `packages/plugin/test/fixture-projects/base-project/hardhat.config.ts`:

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
    // Assert the behavior of your plugin
  });
});
```

The `createFixtureProjectHRE` function initializes a new Hardhat Runtime Environment based on a directory in `packages/plugin/test/fixture-projects`. It uses that directory's `hardhat.config.ts` and treats the directory as the project root.

## Testing with inline `HardhatUserConfig`s

While fixture tests are simple, they can become cumbersome to maintain since your test and its data are spread across multiple files.

Alternatively, you can create a Hardhat Runtime Environment with an inline `HardhatUserConfig`.

This type of test looks something like this:

```ts
import { createHardhatRuntimeEnvironment } from "hardhat/hre";
import MyPlugin from "../src/index.js";

describe("Inline config test example", () => {
  it("do something", async () => {
    const hre = await createHardhatRuntimeEnvironment({
      plugins: [MyPlugin],
    });

    // Assert the behavior of your plugin
  });
});
```

The `hre` created with an inline config has two small differences:

1. It won't have an `hre.config.paths.config` value. This field normally has the absolute path of the config file, but you are using an inline config.
2. Its `hre.config.paths.root` will be the closest directory to your current working directory that has a `package.json` file (just like npm does)

Both of these are customizable. Learn how by looking at the `createFixtureProjectHRE` function in the [Hardhat 3 plugin template](https://github.com/nomicfoundation/hardhat3-plugin-template/).

## Using plugins as mocks

Another pattern that can be helpful for integration tests is defining another plugin exclusively for testing purposes.

This lets you customize Hardhat's behavior by mocking specific parts.

To do this, define a plugin and add it to your test `HardhatUserConfig`'s `plugins` array before your actual plugin.

For example:

```ts
import { createHardhatRuntimeEnvironment } from "hardhat/hre";
import MyPlugin from "../src/index.js";
import MockNetworkPlugin from "./mocks/network-mocks.js";

describe("Mock plugin test example", () => {
  it("do something", async () => {
    const hre = await createHardhatRuntimeEnvironment({
      plugins: [MockNetworkPlugin, MyPlugin],
    });

    // Setup the mock behavior
    // Assert the behavior of your plugin
  });
});
```

Your mock plugin can maintain state and export functions that control its behavior. For example, you could create functions to simulate network responses, configure fake data, or trigger specific conditions.

This works both with inline config and fixture projects.
