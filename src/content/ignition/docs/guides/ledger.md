# Deploying with a Ledger hardware wallet

Hardhat Ignition supports deploying contracts using a Ledger hardware wallet via the `Hardhat Ledger plugin`. This guide will show you how to deploy your contracts using a Ledger device.

## Prerequisites

Before starting, make sure you understand how to:

- configure the [Hardhat Ledger plugin](../../../plugins/nomicfoundation-hardhat-ledger.md).
- use [configuration variables](../../../docs/learn-more/configuration-variables.md) with the [Hardhat keystore](../../../plugins/nomicfoundation-hardhat-keystore.md).

## Hardhat configuration

We are going to use the [Sepolia testnet](https://ethereum.org/en/developers/docs/networks/#sepolia) to deploy our Ignition module, so you need to add this network in your Hardhat config. Here we are using [Alchemy](https://alchemy.com/) to connect to the network.

Example `hardhat.config.ts`:

```ts
// ...rest of your imports...
import hardhatLedgerPlugin from "@nomicfoundation/hardhat-ledger";
import { configVariable } from "hardhat/config";

export default {
  // ...rest of your config...
  plugins: [
    // ...rest of your plugins...
    hardhatLedgerPlugin,
  ],
  networks: {
    sepolia: {
      type: "http",
      // Go to https://alchemy.com, sign up, create a new App in its dashboard,
      // and set the ALCHEMY_URL secret in the Hardhat keystore.
      // Example: https://eth-sepolia.g.alchemy.com/v2/<yourApiKey>
      url: configVariable("ALCHEMY_URL"),
      ledgerAccounts: [
        // Set your ledger address here
        "0x070Da0697e6B82F0ab3f5D0FD9210EAdF2Ba1516",
      ],
    },
  },
};
```

To deploy on Sepolia you need to send some Sepolia ether to the address that's going to be making the deployment. You can get testnet ether from a faucet, a service that distributes testing-ETH for free. Here are a few options for Sepolia:

- [Alchemy Sepolia Faucet](https://sepoliafaucet.com/)
- [QuickNode Sepolia Faucet](https://faucet.quicknode.com/ethereum/sepolia)
- [Google Cloud Web3](https://cloud.google.com/application/web3/faucet)

## Deploying with Ledger

After configuring the plugin, you can now deploy your Hardhat Ignition module as you normally would, and Ignition will use your Ledger device to sign the transactions. For this example, we'll be deploying the `Apollo` module from the Hardhat Ignition [quick start guide](/ignition/docs/getting-started#quick-start). Ensure that your Ledger device is plugged in, unlocked, and connected to the Ethereum app, then run the deploy command:

```sh
npx hardhat ignition deploy ignition/modules/Apollo.ts --network sepolia
```

This will deploy as usual, however, you will first be prompted to enter your Hardhat keystore password to retrieve the `ALCHEMY_URL`:

```
[hardhat-keystore] Enter the password: ********
```

and then you will be prompted on your Ledger device to confirm each transaction before it's sent to the network. You should see a message like the following in your terminal:

```
Hardhat Ignition 🚀

Deploying [ Apollo ]

Batch #1
  Executing Apollo#Rocket...

[hardhat-ledger] Connecting to Ledger...
[hardhat-ledger] Connection successful
[hardhat-ledger] Confirmation start
```

At this point, you should see a prompt on your Ledger device to confirm the transaction. Once you confirm, the message will update to show that the transaction was sent to the network, and you'll see the deployment progress in your terminal.
