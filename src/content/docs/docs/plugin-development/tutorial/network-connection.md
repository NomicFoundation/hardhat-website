---
title: Extending the NetworkConnection
description: Hardhat 3 plugin tutorial - Extending the NetworkConnection
sidebar:
  order: 2
---

Let's start by adding the `myAccount` property to the `NetworkConnection` object returned by `network.connect()`.

## Defining a network Hook Handler

To add a network property to the `NetworkConnection` object, we'll use a network [Hook Handler](/docs/plugin-development/explanations/hooks).

The template already comes with the `packages/plugin/src/hooks/network.ts` file, so we'll replace its contents with this:

```ts {18}
import type { HookContext, NetworkHooks } from "hardhat/types/hooks";
import { ChainType, NetworkConnection } from "hardhat/types/network";

export default async (): Promise<Partial<NetworkHooks>> => {
  const handlers: Partial<NetworkHooks> = {
    async newConnection<ChainTypeT extends ChainType | string>(
      context: HookContext,
      next: (
        nextContext: HookContext,
      ) => Promise<NetworkConnection<ChainTypeT>>,
    ): Promise<NetworkConnection<ChainTypeT>> {
      const connection = await next(context);

      // Get the accounts from the connection
      const accounts: string[] = await connection.provider.request({
        method: "eth_accounts",
      });

      // Add the first account as myAccount for now
      connection.myAccount = accounts[0];

      return connection;
    },
  };

  return handlers;
};
```

The `newConnection` function above is a Hook Handler. Hardhat calls it every time a new network connection is created with `network.connect()`.

Within this function, we first call `next` to call any other Hook Handler, or the default behavior of Hardhat. It returns the `NetworkConnection` object.

Then, we get the accounts of the connection and assign the first one as `myAccount`.

You'll get a type error in the highlighted line though. This is because the `NetworkConnection` type doesn't have a `myAccount` property.

We'll fix it by extending the `NetworkConnection` type.

## Extending the `NetworkConnection` type

The TypeScript type system lets you add properties to an existing type, what we call [Type Extensions](/docs/plugin-development/explanations/type-extensions).

Open `packages/plugin/src/type-extensions.ts`, where you'll find something like this:

```ts
// More code above that you can ignore for now...

import "hardhat/types/network";
declare module "hardhat/types/network" {
  // eslint comments...
  interface NetworkConnection<
    // eslint comments...
    ChainTypeT extends ChainType | string = DefaultChainType,
  > {
    // Add your network connection properties here
  }
}
```

We'll replace it with this:

```ts
// More code above that you can ignore for now...

import "hardhat/types/network";
declare module "hardhat/types/network" {
  interface NetworkConnection {
    myAccount: string;
  }
}
```

Extending the `NetworkConnection` type fixes the error from the previous section.

## Trying out your `NetworkConnection` extension

Let's try your extension out!

First, you need to build the plugin, by running this in `packages/plugin`:

```sh
pnpm build
```

Then, let's create a script in the `example-project` that uses your plugin.

Create the file `packages/example-project/scripts/my-account-example.ts` with this code:

```ts
import { network } from "hardhat";

const connection = await network.connect();

console.log("connection.myAccount:", connection.myAccount);
```

Run it from the `example-project` with this command:

```sh
pnpm hardhat run scripts/my-account-example.ts
Compiling your Solidity contracts...
Compiled 1 Solidity file with solc 0.8.29 (evm target: cancun)

connection.myAccount: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
```
