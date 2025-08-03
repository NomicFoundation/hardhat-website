# Verifying smart contracts

Smart contract verification is used to prove that a deployed contract's bytecode comes from a specific source code. This allows users and tools to inspect the original source on block explorers, like Etherscan and Blockscout.

In this guide, you'll learn how to verify your contracts using the `hardhat-verify` plugin.

## Setup

If you initialized your project using `hardhat --init`, you don’t need to do anything: `hardhat-verify` is already included as part of the template project.

If you want to add the plugin manually:

1. Install the plugin:

::::tabsgroup{options=npm,pnpm}

:::tab{value=npm}

```bash
npm install --save-dev @nomicfoundation/hardhat-verify@next
```

:::

:::tab{value=pnpm}

```bash
pnpm install --save-dev @nomicfoundation/hardhat-verify@next
```

:::

::::

2. Add it to the list of plugins in your Hardhat configuration:

   ```tsx
   import hardhatVerify from "@nomicfoundation/hardhat-verify";

   const config: HardhatUserConfig = {
     plugins: [
       hardhatVerify,
       // ...other plugins...
     ],
     // ...other config...
   };

   export default config;
   ```

## Configuration

The `hardhat-verify` plugin adds a `verify` object to the Hardhat configuration. With it, you can configure the different block explorers to verify your contracts on.

To verify contracts on Etherscan, you need to set an API key in your Hardhat configuration:

```tsx
const config: HardhatUserConfig = {
  // ...
  verify: {
    etherscan: {
      apiKey: "YOUR_ETHERSCAN_API_KEY",
    },
  },
};
```

You can get an Etherscan API key by following [this guide](https://docs.etherscan.io/etherscan-v2/getting-an-api-key).

:::tip

In the previous version of the Etherscan API, you needed a different API key for each chain. With Etherscan V2, a single API key works across all networks.

:::

To verify contracts on Blockscout, you don't need to set an API key, nor any config.

You can also disable a block explorer by setting its `enabled` property to `false`. For example, you can disable Blockscout verification like this:

```tsx
const config: HardhatUserConfig = {
  // ...
  verify: {
    blockscout: {
      enabled: false,
    },
  },
};
```

## Verifying a contract

To verify a contract, run the `verify` task with the contract's address and the network you deployed it to:

```bash
npx hardhat verify --network sepolia 0x1234567890...
```

If your contract has constructor arguments, you have to also pass the values that were used during deployment. For example, if the contract received a `string` and a `uint` as constructor parameters:

```bash
npx hardhat verify --network sepolia 0x1234567890... "Hello" 1000
```

If the arguments are too complex to pass directly in the shell—for example, an array of numbers—you can define them in a TypeScript or JavaScript file:

```tsx
// constructor-args.ts
const constructorArgs = ["Hello", [1000, 2000]];

export default constructorArgs;
```

and then pass it with the `--constructor-args-path` flag:

```bash
npx hardhat verify --network sepolia --constructor-args-path constructor-args.ts 0x1234567890...
```

## Using different build profiles

By default, the `verify` task uses the `production` build profile, as this the recommended build profile to build your contracts before deploying them. If you deploy your contracts with Hardhat Ignition, you automatically use the `production` build profile.

If you want to use a different build profile, you can pass the `--build-profile` flag:

```bash
npx hardhat verify --network sepolia --build-profile default 0x1234567890...
```

## Verifying contracts on different block explorers

The plugin currently supports Etherscan and Blockscout. You can use subtasks to verify on each of the block explorers:

```bash
npx hardhat verify etherscan ...
```

They have the same interface, but verify on a different block explorer.

Running `verify` without any subtask, will verify on Etherscan.

## Verifying on a block explorer of a different network

If you want to verify a contract on a block explorer of a network that isn't natively supported by the plugin, you can set a chain descriptor in your Hardhat configuration to add support for that network.

Adding a chain descriptor for a network called "ExampleChain", with chain id `123456`, would look like this:

```tsx
const config: HardhatUserConfig = {
  // ...
  chainDescriptors: {
    // Example chain
    123456: {
      name: "ExampleChain",
      blockExplorers: {
        etherscan: {
          name: "ExampleScan",
          url: "https://example.scan",
          apiUrl: "https://example.scan/api",
        },
        // other explorers...
      },
    },
  },
};
```

## Troubleshooting

Your verification might fail for a variety of reasons. Here are some common issues and how to fix them:

- Verifying immediately after deploying: your contracts may not have beein indexed by the block explorer yet, causing the verification to fail. Normally, waiting a minute is enough for it to work.

- Wrong constructor arguments: double check that your constructor arguments are correct.

- Using code that is different from the one used for deployment: if you are trying to deploy a contract that you have deployed weeks, or even just days, ago, then chances are that the code has changed in the meantime. Double check that you are using the correct code.

- Using a different build profile: if you are using a different build profile than the one used for deployment, then the bytecode will be different, causing the verification to fail. Try using `--build-profile` with other build profiles to verify your contract, starting with `default`. You may also need to run `hardhat compile` with the same build profile to generate the correct artifacts.
