---
title: Testing your plugin
description: Hardhat 3 plugin tutorial - Testing your plugin
---

# Testing your plugin

We'll create a few simple integration tests for the `myAccount` property of the `NetworkConnection` object.

We'll do it by using the Hardhat project in `packages/plugin/test/fixture-projects/base-project` as a test fixture.

The template repository comes with utilities to work with fixture projects. To learn more about them and other integration test strategies, read the [Writing integration tests for plugins guide](../guides/integration-tests.md).

Now create a new file in `packages/plugin/test/myAccount.ts` and add the following code:

```ts
import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { createFixtureProjectHRE } from "./helpers/fixture-projects.js";

describe("myAccount initialization on network connection", () => {
  it("should initialize the myAccount field on the network connection", async () => {
    const hre = await createFixtureProjectHRE("base-project");

    const connection = await hre.network.connect();
    const accounts: string[] = await connection.provider.request({
      method: "eth_accounts",
    });

    assert.equal(connection.myAccount, accounts[0]);
  });
});
```

This test uses the `createFixtureProjectHRE` function from the template project. It creates a new Hardhat Runtime Environment based on `packages/plugin/test/fixture-projects/base-project/hardhat.config.ts`.

Let's run `pnpm test` to make sure it works.

## Customizing the config of your fixture project

To test an error case where the `myAccountIndex` is too high, add this network config to `packages/plugin/test/fixture-projects/base-project/hardhat.config.ts`:

```ts
networks: {
  withMyAccountIndexTooHigh: {
    type: "edr-simulated",
    myAccountIndex: 100000,
  },
}
```

Now add this test to verify the error handling:

```ts
it("should throw a plugin error if the myAccountIndex is too high with respect to the accounts", async () => {
  const hre = await createFixtureProjectHRE("base-project");

  await assert.rejects(
    async () => {
      await hre.network.connect("withMyAccountIndexTooHigh");
    },
    HardhatPluginError, // Import it from "hardhat/plugins"
    "hardhat-plugin-template: Invalid index 100000 for myAccount when connecting to network withMyAccountIndexTooHigh"
  );
});
```

Run `pnpm test` to verify both tests pass.

## Complete test suite

You can find more tests of the plugin in the [`myAccount.ts` test file](https://github.com/NomicFoundation/hardhat3-plugin-template/blob/tutorial/packages/plugin/test/myAccount.ts) in the `tutorial` branch of the template project.
