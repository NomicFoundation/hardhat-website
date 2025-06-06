# How to use configuration variables and the keystore plugin

Hardhat projects often need values that vary from one developer to another or that shouldn’t be committed to source control, like private keys or RPC URLs with API keys. To manage this securely and flexibly, Hardhat supports configuration variables. This guide covers how to use them and how to securely store sensitive values with the `hardhat-keystore` plugin.

## Using configuration variables

A common example of a value that you don’t want to hardcode is an RPC URL that includes an API key, such as one from [Alchemy](https://www.alchemy.com/) or [Infura](https://www.infura.io/):

```tsx
const config = {
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/ABC123...",
      // ...
    },
  },
};
```

To solve this, Hardhat lets you use **configuration variables**. These are placeholders that get replaced with actual values at runtime:

```tsx
import { configVariable } from "hardhat/config";

const config = {
  networks: {
    sepolia: {
      url: configVariable("SEPOLIA_RPC_URL"),
      // ...
    },
  },
};
```

This way, the actual value is never committed to your repository.

By default, configuration variables get their values from environment variables. For example, in the snippet above, Hardhat will look for an environment variable named `SEPOLIA_RPC_URL` when it needs the value. You can define it inline when running a task:

::::tabsgroup{options=npm,pnpm}

:::tab{value=npm}

```bash
SEPOLIA_RPC_URL='https://eth-sepolia.g.alchemy.com/v2/ABC123...' npx hardhat test
```

:::

:::tab{value=pnpm}

```bash
SEPOLIA_RPC_URL='https://eth-sepolia.g.alchemy.com/v2/ABC123...' pnpm hardhat test
```

:::

::::

But configuration variables are **extensible**: plugins can define alternative ways to obtain their values. This means you’re not limited to environment variables—you can plug in other sources, such as encrypted storage, cloud secrets managers, or any custom logic.

Another important detail is that configuration variables are **lazy**, meaning that they’re only resolved when actually needed. For example, if you define a network that uses a configuration variable for its RPC URL, and that variable isn’t set, it won’t cause any issues unless you actually try to connect to that network. Running tasks like `compile`, or executing tests that don’t use the network, will work just fine.

## The `hardhat-keystore` plugin

In the previous section we said that configuration variables are resolved from environment variables by default. This works, but it comes with some downsides. For example, if you type secrets directly into your shell, they’ll end up in your shell history. You also have to re-set them every time, or rely on tools like `.env` files, which have their own limitations.

To address these issues, Hardhat provides an official plugin called `hardhat-keystore`. It lets you store sensitive values in an encrypted file and use them as configuration variables, without having to type them every time or commit them to disk in plain text.

### Setup

The `hardhat-keystore` plugin is part of the example project, but it can also be installed manually:

1. Install the plugin:

   ::::tabsgroup{options=npm,pnpm}

   :::tab{value=npm}

   ```bash
   npm install --save-dev @nomicfoundation/hardhat-keystore@next
   ```

   :::

   :::tab{value=pnpm}

   ```bash
   pnpm install --save-dev @nomicfoundation/hardhat-keystore@next
   ```

   :::

   ::::

2. Add it to the list of plugins in your Hardhat configuration:

   ```tsx
   import hardhatKeystore from "@nomicfoundation/hardhat-keystore";

   const config: HardhatUserConfig = {
     plugins: [
       hardhatKeystore,
       // ...other plugins...
     ],
     // ...other config...
   };

   export default config;
   ```

### Using the keystore

To store an encrypted secret, use the `keystore set` task. For example, to store an Alchemy API key under the name `SEPOLIA_RPC_URL`, run:

::::tabsgroup{options=npm,pnpm}

:::tab{value=npm}

```bash
npx hardhat keystore set SEPOLIA_RPC_URL
```

:::

:::tab{value=pnpm}

```bash
pnpm hardhat keystore set SEPOLIA_RPC_URL
```

:::

::::

When you run this task for the first time, you’ll be prompted to create a password for your keystore. After that, every time you add a new value, you’ll need to enter that password to confirm the operation. The secret is then encrypted in a file in your home directory.

Once a value is stored in the keystore, you can use it in your configuration just like any other configuration variable. For example, if you stored an RPC URL under the name `SEPOLIA_RPC_URL`, you can reference it in exactly the same way we did above:

```tsx
import { configVariable } from "hardhat/config";

const config = {
  networks: {
    sepolia: {
      url: configVariable("SEPOLIA_RPC_URL"),
      // ...
    },
  },
};
```

When the configuration variable is needed, Hardhat will prompt you to enter the password and decrypt the value from the keystore.

If the value isn’t needed—because the task doesn’t use it—you won’t be prompted at all. This means you can define encrypted variables freely without affecting tasks like compile or tests that don’t touch the network.

## Managing encrypted variables

Besides `keystore set`, Hardhat provides several other tasks to help you manage your encrypted configuration variables.

- To view the value of a stored variable, use the `keystore get` task:

  ::::tabsgroup{options=npm,pnpm}

  :::tab{value=npm}

  ```bash
  npx hardhat keystore get SEPOLIA_RPC_URL
  ```

  :::

  :::tab{value=pnpm}

  ```bash
  pnpm hardhat keystore get SEPOLIA_RPC_URL
  ```

  :::

  ::::

- To delete a configuration variable from the keystore, use `keystore delete`:

  ::::tabsgroup{options=npm,pnpm}

  :::tab{value=npm}

  ```bash
  npx hardhat keystore delete SEPOLIA_RPC_URL
  ```

  :::

  :::tab{value=pnpm}

  ```bash
  pnpm hardhat keystore delete SEPOLIA_RPC_URL
  ```

  :::

  ::::

- To list all stored variable names, use `keystore list`:

  ::::tabsgroup{options=npm,pnpm}

  :::tab{value=npm}

  ```bash
  npx hardhat keystore list
  ```

  :::

  :::tab{value=pnpm}

  ```bash
  pnpm hardhat keystore list
  ```

  :::

  ::::

<!-- ## Combining environment and encrypted variables

The `hardhat-keystore` plugin extends how configuration variables are resolved, but it doesn’t replace their default behavior. Hardhat still looks for environment variables first, and only falls back to the keystore if the variable isn’t set in the environment. This makes it easy to mix and override values depending on your workflow.

One common use case is **overriding a keystore value with an environment variable**. For example, you might store a default value in the keystore but temporarily override it by setting an environment variable in your shell:

::::tabsgroup{options=npm,pnpm}

:::tab{value=npm}

```bash
SEPOLIA_RPC_URL=https://temporary-url.example npx hardhat test
```

:::

:::tab{value=pnpm}

```bash
SEPOLIA_RPC_URL=https://temporary-url.example pnpm hardhat test
```

:::

::::

This lets you test with a different provider without changing or deleting the encrypted value.

Another use case is **defining a variable exclusively through environment variables**, without using the keystore at all. This is useful in environments like CI runners. Since environment variables are always checked first, you don’t need to change anything in your config for this to work. -->

## Under the hood

The location of the encrypted keystore file depends on your operating system. You can see where it’s stored by running any keystore task with the `--verbose` flag. For example:

::::tabsgroup{options=npm,pnpm}

:::tab{value=npm}

```bash
npx hardhat keystore list --verbose
```

:::

:::tab{value=pnpm}

```bash
pnpm hardhat keystore list --verbose
```

:::

::::

On Linux, this might print something like:

```
path to keystore file: /home/username/.config/hardhat-nodejs/keystore.json
```
