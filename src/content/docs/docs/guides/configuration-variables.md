# Managing config values and secrets safely

Hardhat projects often need values that shouldn’t be committed to shared repositories, like private keys or API keys.

Hardhat 3 offers _Config Variables_ to handle this in a secure way, either encrypted (using `hardhat-keystore`) or not, depending on what you need.

By default, config variables are read from environment variables, but plugins can define alternative ways to obtain their values.

This guide covers how to use _Config Variables_ and the `hardhat-keystore` plugin to securely store sensitive values.

## Using config variables

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

Instead of this, you can call the `configVariable` function to get the value at runtime:

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

In the snippet above, Hardhat will look for an environment variable named `SEPOLIA_RPC_URL` when it needs the value. You can define it inline when running a task:

::::tabsgroup{options=npm,pnpm,yarn}

:::tab{value=npm}

```bash
SEPOLIA_RPC_URL='<https://eth-sepolia.g.alchemy.com/v2/ABC123>...' npx hardhat run ./my-script.ts --network sepolia
```

:::

:::tab{value=pnpm}

```bash
SEPOLIA_RPC_URL='<https://eth-sepolia.g.alchemy.com/v2/ABC123>...' pnpm hardhat run ./my-script.ts --network sepolia
```

:::

:::tab{value=yarn}

```bash
SEPOLIA_RPC_URL='<https://eth-sepolia.g.alchemy.com/v2/ABC123>...' yarn hardhat run ./my-script.ts --network sepolia
```

:::

::::

_Config Variables_ are lazy, meaning that they’re only resolved when actually needed. This allows you to use Hardhat without having to define all of them upfront if they’re not going to be used for what you are doing.

## Managing secrets with the `hardhat-keystore` plugin

Resolving _Config Variables_ from environment variables isn't safe (due to command history storage, among other things) nor convenient. The `hardhat-keystore` plugin lets you store sensitive values in an encrypted file and use them as config variables, without having to type them every time or commit them to disk in plain text, where they can be stolen.

### Setup

If you are using a Hardhat Toolbox or created a sample project using Hardhat 3, you already have the plugin installed.

Otherwise, check out [the `hardhat-keystore` documentation](../../plugins/nomicfoundation-hardhat-keystore.md) to install it.

### Using the keystore

Use the `keystore set` task to store an encrypted secret:

::::tabsgroup{options=npm,pnpm,yarn}

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

:::tab{value=yarn}

```bash
yarn hardhat keystore set SEPOLIA_RPC_URL
```

:::

::::

When you run this task for the first time, you’ll be prompted to create a password for your keystore. After that you’ll need to enter that password to confirm the operation every time you add a new value. The secret is then stored encrypted in a file in your home directory.

Once a value is stored in the keystore, you can use it in your configuration:

```tsx{6}
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

Hardhat will prompt you to enter the password when the configuration variable is needed.

### Managing encrypted variables

To manage your keystore, the plugin provides the following self-explanatory tasks:

```bash
npx hardhat keystore list
npx hardhat keystore get <key>
npx hardhat keystore delete <key>
npx hardhat keystore change-password
npx hardhat keystore path
```

### Improving UX when using keystore values during the dev process

To avoid repeatedly writing the keystore password when working locally with values that aren't sensitive, you can use the _Development Keystore_, a separate keystore which doesn't ask for the password when the values are accessed. This allows you to keep the keystore setup when security isn't relevant during the development process.
To use it just store the values adding the `--dev` flag:

```bash
npx hardhat keystore set --dev <key>
```

<!-- ## Combining environment and encrypted variables

The `hardhat-keystore` plugin extends how configuration variables are resolved, but it doesn’t replace their default behavior. Hardhat still looks for environment variables first, and only falls back to the keystore if the variable isn’t set in the environment. This makes it easy to mix and override values depending on your workflow.

One common use case is **overriding a keystore value with an environment variable**. For example, you might store a default value in the keystore but temporarily override it by setting an environment variable in your shell:

::::tabsgroup{options=npm,pnpm,yarn}

:::tab{value=npm}

```bash
SEPOLIA_RPC_URL='<https://eth-sepolia.g.alchemy.com/v2/ABC123>...' npx hardhat run ./my-script.ts --network sepolia
```

:::

:::tab{value=pnpm}

```bash
SEPOLIA_RPC_URL='<https://eth-sepolia.g.alchemy.com/v2/ABC123>...' pnpm hardhat run ./my-script.ts --network sepolia
```

:::

:::tab{value=yarn}

```bash
SEPOLIA_RPC_URL='<https://eth-sepolia.g.alchemy.com/v2/ABC123>...' yarn hardhat run ./my-script.ts --network sepolia
```

:::

::::

This lets you test with a different provider without changing or deleting the encrypted value.

Another use case is **defining a variable exclusively through environment variables**, without using the keystore at all. This is useful in environments like CI runners. Since environment variables are always checked first, you don’t need to change anything in your config for this to work. -->
