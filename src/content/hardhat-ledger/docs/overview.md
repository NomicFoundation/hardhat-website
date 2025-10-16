---
title: Hardhat Ledger
description: Hardhat plugin for connecting Ledger hardware wallets
---

# Overview

This plugin allows Hardhat to integrate seamlessly with a connected [Ledger wallet](https://www.ledger.com/).

> Note: Currently, `EIP-7702` is not supported, as the stable Ledger library doesn't implement it. A [newer library](https://www.npmjs.com/package/@ledgerhq/device-management-kit?activeTab=readme) does support EIP-7702, but it's not yet stable enough for use in Hardhat. We'll migrate to it once it's more mature.

## Installation

To install this plugin, run the following command:

::::tabsgroup{options=npm,pnpm,yarn}

:::tab{value=npm}

```bash
npm install --save-dev @nomicfoundation/hardhat-ledger
```

:::

:::tab{value=pnpm}

```bash
pnpm install --save-dev --allow-build=node-hid @nomicfoundation/hardhat-ledger
```

:::

:::tab{value=yarn}

```bash
yarn add --dev @nomicfoundation/hardhat-ledger
```

:::

::::

and add the following statements to your `hardhat.config.ts` file:

```typescript
import hardhatLedgerPlugin from "@nomicfoundation/hardhat-ledger";

export default {
  plugins: [hardhatLedgerPlugin],
};
```

## Configuring your Ledger accounts

In your `hardhat.config.ts` file, also add the following property to list the accounts you control via your Ledger device:

```typescript
export default {
  networks: {
    yourNetworkName: {
      type: "edr-simulated",
      ledgerAccounts: [
        // Set your ledger address here
        "0xa809931e3b38059adae9bc5455bc567d0509ab92",
        "0xda6a52afdae5ff66aa786da68754a227331f56e3",
        "0xbc307688a80ec5ed0edc1279c44c1b34f7746bda",
      ],
    },
  },
};
```

This will make those three accounts available to the Hardhat. If you try to send a transaction or sign something using any of those accounts, the plugin will try to connect to the Ledger wallet and find a derivation path for that address. By default, the derivation paths that are tried start from `m/44'/60'/0'/0'/0` and go up to `m/44'/60'/20'/0'/0`.

An optional `derivationFunction` configuration allows setting the derivation path, supporting 'legacy' or otherwise non-standard addresses:

```typescript
export default {
  networks: {
    yourNetworkName: {
      type: "edr",
      ledgerAccounts: [...],
      ledgerOptions: {
        derivationFunction: (x) => `m/44'/60'/0'/${x}` // legacy derivation path
      }
    },
  },
};
```

## Usage

To sign transactions with your Ledger, first ensure the appropriate app is open on the device. Then, simply call the desired methods (e.g., `eth_sign`, `eth_sendTransaction`). If the sender account matches one of your Ledger accounts, the device will automatically connect, allowing you to review and either approve or decline the transaction.

Usage Example:

::::tabsgroup{options=provider,viem}

:::tab{value=provider}

```typescript
import hre from "hardhat";

const { provider, ethers } = await hre.network.connect("yourNetworkName");

const ledgerAddress = "0x..."; // Your ledger address

const msg = ethers.toUtf8Bytes("Hello world");
const hexMsg = ethers.hexlify(msg);

const signature = await provider.request({
  method: "eth_sign",
  params: [ledgerAddress, hexMsg],
});
```

:::

:::tab{value=viem}

```typescript
import hre from "hardhat";
import { stringToHex } from "viem";

const { viem } = await hre.network.connect("yourNetworkName");

const ledgerAddress = "0x..."; // Your ledger address

const [senderClient] = await viem.getWalletClients();

const hexMsg = stringToHex("Hello world");

const signature = await senderClient.request({
  method: "eth_sign",
  params: [ledgerAddress, hexMsg],
});
```

:::

::::
