---
title: Your first Hardhat 3 plugin
description: Hardhat 3 plugin tutorial - Your first Hardhat 3 plugin
---

# Hardhat 3 plugin tutorial

This tutorial will guide you through the process of building a simple Hardhat 3 plugin based on the [Hardhat 3 plugin template](../guides/hardhat3-plugin-template.md).

## Your first Hardhat 3 plugin

We'll create a plugin that lets users pick an account per network in their config and store it as `myAccount` in each `NetworkConnection` object (i.e. the return value of `network.connect()`). We'll also define a task to print that account's address.

With your plugin, users will be able to write:

```ts
import { network } from "hardhat";

const { myAccount } = await network.connect();
console.log("My account is:", myAccount);
```

and run:

```sh
npx hardhat my-account --network <network-name>
```

By implementing this plugin, you'll learn to:

1. Extend the `NetworkConnection` objects returned by `network.connect()`.
2. Extend the Hardhat config system, adding custom validation and resolution logic.
3. Add a task that builds on top of the above two features.

You can find the complete code of this tutorial in the `tutorial` branch of the [Hardhat 3 plugin template](https://github.com/NomicFoundation/hardhat3-plugin-template/tree/tutorial).

## Setting up your dev environment

To follow this tutorial, you need to have Node.js 22+ and `pnpm` installed on your machine.

You also need to create a new repository based on the [Hardhat 3 plugin template](https://github.com/NomicFoundation/hardhat3-plugin-template). To learn how to do it, please follow [this guide](../guides/hardhat3-plugin-template.md).
