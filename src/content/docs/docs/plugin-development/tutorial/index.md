---
title: Your first Hardhat 3 plugin
description: Hardhat 3 plugin tutorial - Your first Hardhat 3 plugin
---

# Hardhat 3 plugin tutorial

In this tutorial, you'll build a simple Hardhat 3 plugin based on the [Hardhat 3 plugin template](https://github.com/NomicFoundation/hardhat3-plugin-template).

## Setting up your dev environment

To follow this tutorial, you need to have Node.js 22+ and `pnpm` installed on your machine.

You also need to create a new repository based on the [Hardhat 3 plugin template](https://github.com/NomicFoundation/hardhat3-plugin-template). Follow [this guide](/plugin-development/guides/hardhat3-plugin-template.md) to get started.

## Your first Hardhat 3 plugin

Let's create a plugin that lets users pick an account for each network in their config and store it as `myAccount` in the `NetworkConnection` object returned by `network.connect()`. We'll also define a task to print that account's address.

Your plugin will let users write:

```ts
import { network } from "hardhat";

const { myAccount } = await network.connect();
console.log("My account is:", myAccount);
```

and run:

```sh
npx hardhat my-account --network networkName
```

By implementing this plugin, you'll learn to:

1. Extend the `NetworkConnection` objects returned by `network.connect()`.
2. Extend the Hardhat Config System, adding custom validation and resolution logic.
3. Add a task that builds on these features.

The complete code for this tutorial is in the `tutorial` branch of the [Hardhat 3 plugin template](https://github.com/NomicFoundation/hardhat3-plugin-template/tree/tutorial).
