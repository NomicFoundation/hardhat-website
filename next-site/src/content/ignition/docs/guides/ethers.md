# Using Ethers

Hardhat Ignition provides a variant based on using [Ethers](https://docs.ethers.org) as your connection library. Ethers is an alternative to [Viem](https://viem.sh) for interacting with the Ethereum Blockchain and its ecosystem.

The Ethers support in Hardhat Ignition includes a helper function, for use in Hardhat tests and scripts, that allows you to deploy Ignition modules and get back the deployed contracts as Ethers.js contract instances.

## Installation

To install Hardhat Ignition with Ethers support in an existing Hardhat project, you will need:

- Hardhat version 3.0.0 or higher
- Ethers version 6.14.0 or higher

You can also follow [Hardhat's Quick Start guide](../../../docs/getting-started/index.md) and pick the option for Ethers and Mocha during initialization to create a new Hardhat Ethers project from scratch.

From the root directory of your Hardhat project run:

::::tabsgroup{options="npm,pnpm,yarn"}

:::tab{value="npm"}

```shell
npm install --save-dev @nomicfoundation/hardhat-ignition-ethers
```

:::

:::tab{value="pnpm"}

```shell
pnpm add -D @nomicfoundation/hardhat-ignition-ethers ethers
```

:::

:::tab{value="yarn"}

```shell
yarn add -D @nomicfoundation/hardhat-ignition-ethers ethers
```

:::

::::

Then enable the plugin in your config file:

```typescript
import HardhatIgnitionEthersPlugin from "@nomicfoundation/hardhat-ignition-ethers";

export default {
  plugins: [HardhatIgnitionEthersPlugin],
  // ... rest of your config
};
```

:::tip

Only **one** Hardhat Ignition package should be imported within your Hardhat config file. Viem and Ethers support cannot both be enabled at the same time.

:::

## The Ignition object

The `@nomicfoundation/hardhat-plugin-ethers` plugin adds an `ignition` object to each `NetworkConnection` created by Hardhat.

The `ignition` object exposes a `deploy` method, which takes an Ignition module, deploys it against the current network, like Hardhat Network, and returns the results of the module as [Ethers.js contract instances](https://docs.ethers.org/v6/api/contract/).

The `deploy` method takes the Module as its first argument:

```typescript
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import hre from "hardhat";

const ApolloModule = buildModule("Apollo", (m) => {
  const apollo = m.contract("Rocket", ["Saturn V"]);

  return { apollo };
});

it("should have named the rocket Saturn V", async function () {
  const connection = await hre.network.connect();
  const { apollo } = await connection.ignition.deploy(ApolloModule);

  assert.equal(await apollo.getFunction("name")(), "Saturn V");
});
```

The `ignition.deploy` method returns an object with an Ethers contract instance per `Future` returned as a result in the module.

## Sending transactions with a different account

The `ignition.deploy` method will default to using the first account in the `accounts` array of the Hardhat `NetworkConnection` as the sender for all transactions.

You can change this by passing a `defaultSender` within the options object as a second argument to the `deploy` method:

```typescript
const connection = await hre.network.connect();
const [first, second] = await connection.ethers.getSigners();

const result = await connection.ignition.deploy(ApolloModule, {
  defaultSender: second.address,
});
```
