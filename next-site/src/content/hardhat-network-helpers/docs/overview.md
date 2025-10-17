---
title: Hardhat Network Helpers
description: Hardhat Network Helpers is a library that provides a set of utility functions to interact with locally simulated networks.
---

# Overview

[@nomicfoundation/hardhat-network-helpers](https://www.npmjs.com/package/@nomicfoundation/hardhat-network-helpers) provides a convenient JavaScript interface to the JSON-RPC functionality of Hardhat Network.

Hardhat Network exposes its custom functionality primarily through its JSON-RPC API. However, for easy-to-read tests and short scripts, interfacing with the JSON-RPC API is too noisy, requiring a verbose syntax and extensive conversions of both input and output data.

This package provides convenience functions for quick and easy interaction with Hardhat Network. Facilities include the ability to mine blocks up to a certain timestamp or block number, the ability to manipulate attributes of accounts (balance, code, nonce, storage), the ability to impersonate specific accounts, and the ability to take and restore snapshots.

## Installation

:::tip

This plugin is part of [Viem Hardhat Toolbox](/v-next/hardhat-toolbox-viem/) and [Ethers+Mocha Hardhat Toolbox](/v-next/hardhat-toolbox-mocha-ethers/). If you are using any of those toolboxes, there's nothing else you need to do.

:::

To install this plugin, run the following command:

::::tabsgroup{options=npm,pnpm,yarn}

:::tab{value=npm}

```bash
npm install --save-dev @nomicfoundation/hardhat-network-helpers
```

:::

:::tab{value=pnpm}

```bash
pnpm install --save-dev @nomicfoundation/hardhat-network-helpers
```

:::

:::tab{value=yarn}

```bash
yarn add --dev @nomicfoundation/hardhat-network-helpers
```

:::

::::

In your `hardhat.config.ts` file, import the plugin and add it to the `plugins` array:

```ts
import hardhatNetworkHelpers from "@nomicfoundation/hardhat-network-helpers";

export default {
  plugins: [hardhatNetworkHelpers],
};
```

### Usage

This plugin adds a `networkHelpers` property to each network connection:

```ts
import { network } from "hardhat";

const { networkHelpers } = await network.connect();

// immediately mine a new block
await networkHelpers.mine();

// mines a new block whose timestamp is 60 seconds after the latest block's timestamp.
await networkHelpers.time.increase(60);
```

For a full listing of all the helpers provided by this package, see [the reference documentation](./reference).
