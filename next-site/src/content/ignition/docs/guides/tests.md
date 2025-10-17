# Using Hardhat Ignition in your tests

If you want to test that your deployment was correctly defined, or if you want to use your Ignition Modules to simplify your test setup, continue reading this guide.

:::tip

If you prefer to use **Ethers** instead of **Viem**, check out the [Ethers.js guide](../../../ignition/docs/guides/ethers.md) for more details.

:::

## The Ignition object

Requiring Hardhat Ignition within your Hardhat config will automatically add an `ignition` object to the Hardhat Runtime Environment.

The `ignition` object exposes a `deploy` method, that takes an Ignition Module as the first argument.

```js
// We define a module in the test file here, but you can also `import` it.
import { network } from "hardhat";

import assert from "node:assert/strict";
import { it } from "node:test";

const CounterModule = buildModule("Counter", (m) => {
  const startCount = m.getParameter("startCount", 0);

  const counter = m.contract("Counter", [startCount]);

  return { counter };
});

it("should set the start count to 0 by default", async function () {
  const { ignition } = await network.connect();
  const { counter } = await ignition.deploy(CounterModule);

  assert.equal(await counter.read.count(), 0);
});
```

The `ignition.deploy` method returns an object with a `viem` contract per contract `Future` returned in your module.

## Using module parameters

The `ignition.deploy` receives an options object as second argument which can be used to provide [Module parameters](./creating-modules.md#module-parameters) under the `parameters` field of the object. You should provide an object mapping module ID to parameters, like this:

```js
import { network } from "hardhat";

import assert from "node:assert/strict";
import { it } from "node:test";

it("should allow setting the start count for new counters", async function () {
  const { ignition } = await network.connect();
  const { counter } = await ignition.deploy(CounterModule, {
    parameters: {
      Counter: {
        startCount: 42,
      },
    },
  });

  assert.equal(await counter.read.count(), 42);
});
```

## Using Ignition Modules as fixtures

You can combine Hardhat Ignition with [Hardhat Network Helper's `loadFixture`](../../../hardhat-network-helpers/docs/reference.md#loadfixture) to use them to easily define your fixtures by calling `ignition.deploy` within them.

```js
import { network } from "hardhat";

import assert from "node:assert/strict";
import { it } from "node:test";

async function deployCounterModuleFixture() {
  const { ignition } = await network.connect();
  return ignition.deploy(CounterModule);
}

it("should set the start count to 0 by default", async function () {
  const { networkHelpers } = await network.connect();
  const { counter } = await networkHelpers.loadFixture(
    deployCounterModuleFixture
  );

  assert.equal(await counter.read.count(), 0);
});
```

## Sending transactions with a different account

The `ignition.deploy` method will default to using the first account in Hardhat network's `accounts` array as the sender for all transactions.

You can change this by passing a `defaultSender` within the options object as a second argument to the `deploy` method:

```typescript
const connection = await network.connect();

const [first, second] = await connection.viem.getWalletClients();
const result = await connection.ignition.deploy(CounterModule, {
  defaultSender: second.account.address,
});
```
