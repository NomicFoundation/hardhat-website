# Deploying smart contracts

Hardhat comes with an official deployment solution: [**Hardhat Ignition**](https://hardhat.org/ignition), a declarative system for deploying smart contracts. It's already available in Hardhat 2 and has been adopted by many projects. The API hasn't changed in Hardhat 3: if you're familiar with it, you won't encounter any surprises.

With Hardhat Ignition, you define the smart contract instances you want to deploy, along with any operations you want to perform on them. These definitions are grouped into Ignition Modules, which are then analyzed and executed in the most efficient way. This includes sending independent transactions in parallel, recovering from errors, and resuming interrupted deployments.

The sample project includes an Ignition Module as an example. To learn more about how to write an Ignition module, please read [this document](https://hardhat.org/ignition/docs/guides/creating-modules).

To deploy the example module in a simulated network, run the following command:

::::tabsgroup{options=npm,pnpm,yarn}

:::tab{value=npm}

```
npx hardhat ignition deploy ignition/modules/Counter.ts
```

:::

:::tab{value=pnpm}

```
pnpm hardhat ignition deploy ignition/modules/Counter.ts
```

:::

:::tab{value=yarn}

```
yarn hardhat ignition deploy ignition/modules/Counter.ts
```

:::

::::

This deployment is executed on the default network, which lasts only for the duration of the task. To simulate a deployment on a persistent network, follow these steps:

1. Start a Hardhat node with `npx hardhat node`, `pnpm hardhat node`, or `yarn hardhat node`.
2. Open another terminal and deploy the module to the Hardhat node:

   ::::tabsgroup{options=npm,pnpm,yarn}

   :::tab{value=npm}

   ```
   npx hardhat ignition deploy --network localhost ignition/modules/Counter.ts
   ```

   :::

   :::tab{value=pnpm}

   ```
   pnpm hardhat ignition deploy --network localhost ignition/modules/Counter.ts
   ```

   :::

   :::tab{value=yarn}

   ```
   yarn hardhat ignition deploy --network localhost ignition/modules/Counter.ts
   ```

   :::

   ::::

3. Run the same command again once the deployment finishes. Since the module has already been deployed, Ignition won't send any transactions.
4. Without stopping the node, add the following line to the Ignition module in `ignition/modules/Counter.ts`:

   ```ts{3}
   m.call(counter, "incBy", [5n]);

   m.call(counter, "inc");

   return { counter };
   ```

5. Run the command from step 2 once more. This time, only the new action runs.

While Hardhat Ignition is our recommended approach for deploying contracts, you're free to use other tools. For example, you can use custom scripts for simple deployments or a deployment plugin from the community.

## Managing secrets

Hardhat 3 includes an encrypted secrets manager that makes it easier to handle sensitive information like private keys. This ensures you don't have to hardcode secrets in your source code or store them in plain text.

The sepolia network configuration uses an encrypted secret for its RPC URL and private key:

```js
networks: {
  sepolia: {
    type: "http",
    chainType: "l1",
    url: configVariable("SEPOLIA_RPC_URL"),
    accounts: [configVariable("SEPOLIA_PRIVATE_KEY")],
  },
},
```

Run the following tasks to add these secrets:

::::tabsgroup{options=npm,pnpm,yarn}

:::tab{value=npm}

```
npx hardhat keystore set SEPOLIA_RPC_URL
npx hardhat keystore set SEPOLIA_PRIVATE_KEY
```

:::

:::tab{value=pnpm}

```
pnpm hardhat keystore set SEPOLIA_RPC_URL
pnpm hardhat keystore set SEPOLIA_PRIVATE_KEY
```

:::

:::tab{value=yarn}

```
yarn hardhat keystore set SEPOLIA_RPC_URL
yarn hardhat keystore set SEPOLIA_PRIVATE_KEY
```

:::

::::

::::tip

If you don't have an RPC URL for Sepolia, you can use a public one like `https://sepolia.gateway.tenderly.co`. Keep in mind that public endpoints like this can be slower and less reliable.

::::

Once the secrets are set, you can deploy the Ignition module to Sepolia:

::::tabsgroup{options=npm,pnpm,yarn}

:::tab{value=npm}

```
npx hardhat ignition deploy --network sepolia ignition/modules/Counter.ts
```

:::

:::tab{value=pnpm}

```
pnpm hardhat ignition deploy --network sepolia ignition/modules/Counter.ts
```

:::

:::tab{value=yarn}

```
yarn hardhat ignition deploy --network sepolia ignition/modules/Counter.ts
```

:::

::::

Enter your password to decrypt the private key, confirm that you want to deploy to Sepolia, and wait until Hardhat Ignition finishes the deployment. After this, if you repeat the command, Ignition will detect that the module has already been deployed and won't send any new transactions.

Secrets are only decrypted when needed, which means you only need to enter the password if a Hardhat task actually uses a secret.
