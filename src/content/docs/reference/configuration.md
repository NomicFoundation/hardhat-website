# Configuration

When Hardhat is run, it searches for the closest `hardhat.config.ts` file starting from the Current Working Directory. This file normally lives in the root of your project. An empty `hardhat.config.ts` is enough for Hardhat to work.

The entirety of your Hardhat setup (i.e. your config, plugins and custom tasks) is contained in this file.

## Available config options

To set up your config, you have to export an object from `hardhat.config.ts`.

The config options available will depend on the Hardhat plugins you have installed. However, there are some [standard options](#standard-options) that come from builtin Hardhat plugins and are always available. Additionally, regardless of which of our `hardhat-toolbox` plugins you have installed, there are some [toolbox options](#toolbox-options) that are common to both of them, while other options are specifically available in either the [Viem](#viem-toolbox-options) or [Ethers](#ethers-toolbox-options) toolbox plugins.

## Standard options

The following options are available even if you don't include any plugins:

```ts
export default {
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  solidity: {
    version: "{RECOMMENDED_SOLC_VERSION}",
    settings: {
      /* solc settings */
    },
  },
  networks: {
    hardhatMainnet: {
      type: "edr-simulated",
      chainType: "l1",
    },
    hardhatOp: {
      type: "edr-simulated",
      chainType: "op",
    },
    sepolia: {
      type: "http",
      chainType: "l1",
      url: configVariable("SEPOLIA_RPC_URL"),
      accounts: [configVariable("SEPOLIA_PRIVATE_KEY")],
    },
  },
  test: {
    solidity: {
      timeout: 40000,
      // other solidity tests options
    },
  },
};
```

:::tip

You can find more info about using Hardhat configuration variables in the [configuration variable guide](../learn-more/configuration-variables.md).

:::

### Path configuration

You can customize the different paths that Hardhat uses by providing an object to the `paths` field with the following keys:

- `sources`: The directory where your contracts are stored. This path is resolved relative to your Hardhat config file. Default value: `'./contracts'`.
- `tests`: The directory where your tests are located, or an object containing fields for each installed test runner that points to their respective test locations. This path is resolved relative to your Hardhat config file. Default value: `'./test'`.
- `cache`: The directory used by Hardhat to cache its internal stuff. This path is resolved relative to your Hardhat config file. Default value: `'./cache'`.
- `artifacts`: The directory where the compilation artifacts are stored. This path is resolved relative to your Hardhat config file. Default value: `'./artifacts'`.

### Solidity configuration

The `solidity` config is an optional field that can be one of the following:

- A solc version to use, e.g. `"{RECOMMENDED_SOLC_VERSION}"`.
- An array of solc versions to use, e.g. `["0.7.6", "{RECOMMENDED_SOLC_VERSION}"]`.
- An object which describes the configuration for a single compiler. It contains the following keys:
  - `version`: The solc version to use.
  - `settings`: An object with the same schema as the `settings` entry in the [Input JSON](https://docs.soliditylang.org/en/latest/using-the-compiler.html#input-description).
  - `preferWasm`: If true, forces Hardhat to use the WebAssembly (wasm) build of solc instead of a native binary. This can improve build reproducibility across platforms, at the cost of slower compilation times.
  - `npmFilesToBuild`: A list of source names for which Hardhat should generate artifacts in addition to your project's own sources.
- An object which describes multiple compilers and their respective configurations. It contains the following:
  - `compilers`: A list of compiler configuration objects like the one above.
  - `overrides`: An optional map of compiler configuration override objects. This maps file names to compiler configuration objects.
  - `preferWasm`: See above.
  - `npmFilesToBuild`: See above.
- An object which describes multiple build profiles and their respective configurations. It contains the following:
  - `profiles`: A map of build profile names to compiler configuration objects like the one above.
  - `npmFilesToBuild`: See above.

#### Default EVM Version

The default EVM version changes based on the compiler version. To specify a different EVM version, modify your `hardhat.config.js`:

```js
module.exports = {
  solidity: {
    version: "0.8.21",
    settings: {
      evmVersion: "shanghai",
    },
  },
};
```

### Network configuration

The `networks` config field is an optional object where network names map to their configuration.

There are two kinds of networks in Hardhat: in-memory simulated networks and [JSON-RPC](https://eth.wiki/json-rpc/API) based networks. You can use either of these by setting the `type` field in the network configuration to either `edr-simulated` or `http`, respectively.

Additionally, simulated networks can be used to test your contracts in different environments, such as Optimism or layer 1 Ethereum, by setting the `chainType` field to either `op` or `l1`, respectively.

There are a number of options that both network types share, as well as some that are specific to each type.

#### Shared network options

The following options are available for both simulated and JSON-RPC networks:

- `type`: The type of the network. This can be either `edr-simulated` for simulated networks or `http` for JSON-RPC networks.
- `chainId`: An optional number, used to validate the network Hardhat connects to. If not present, this validation is omitted.
- `chainType`: Determines the type of chain for this network. This can be either `l1` for layer 1 networks like Ethereum, `op` for layer 2 networks like Optimism, or `generic` for other types of networks. Default value: `generic`.
- `from`: The address to use as default sender. If not present the first account of the node is used.
- `gas`: Its value should be `"auto"` or a number or bigint. If a number or bigint is used, it will be the gas limit used by default in every transaction. If `"auto"` is used, the gas limit will be automatically estimated. Default value: `"auto"`.
- `gasMultiplier`: A number used to multiply the results of gas estimation to give it some slack due to the uncertainty of the estimation process. Default value: `1`.
- `gasPrice`: Its value should be `"auto"` or a number or bigint. This parameter behaves like `gas`. Default value: `"auto"`.

#### Simulated network options

The following options are specific to simulated networks:

- `accounts`: This field controls which accounts Hardhat uses. It can use a list of local accounts (by setting it to an array of `{privateKey, balance}` objects) or an [HD Wallet](#hd-wallet-config). Default value: an HD Wallet with 20 unlocked accounts and a balance of 10,000 ETH each.
- `allowBlocksWithSameTimestamp`: A boolean to allow mining blocks that have the same timestamp. This is not allowed by default because Ethereum's consensus rules specify that each block should have a different timestamp. Default value: `false`.
- `allowUnlimitedContractSize`: An optional boolean that disables the contract size limit imposed by [EIP-170](https://eips.ethereum.org/EIPS/eip-170). Default value: `false`.
- `blockGasLimit`: The block gas limit to use in Hardhat Network's blockchain. Default value: `30_000_000`.
- `coinbase`: The address used as coinbase in new blocks. Default value: `"0xc014ba5ec014ba5ec014ba5ec014ba5ec014ba5e"`.
- `forking`: An object that describes the forking configuration and can have the following fields:
  - `url`: a URL that points to a JSON-RPC node with state that you want to fork off. There's no default value for this field. It must be provided for the fork to work.
  - `blockNumber`: an optional number to pin which block to fork from. If no value is provided, the latest block is used.
  - `enabled`: an optional boolean to switch on or off the fork functionality. Default value: `true` if `url` is set, `false` otherwise.
- `hardfork`: This setting changes how Hardhat Network works, to mimic Ethereum's mainnet at a given hardfork. It must be one of `"byzantium"`, `"constantinople"`, `"petersburg"`, `"istanbul"`, `"muirGlacier"`, `"berlin"`, `"london"`, `"arrowGlacier"`, `"grayGlacier"`, `"merge"`, `"shanghai"`, `"cancun"` and `"prague"`. Default value: `"prague"`.
- `initialBaseFeePerGas`: The `baseFeePerGas` of the first block. Note that when forking a remote network, the "first block" is the one immediately after the block you forked from. This field must not be present if `hardfork` is not `"london"` or a later one. Default value: `"1000000000"` if not forking. When forking a remote network, if the remote network uses EIP-1559, the first local block will use the right baseFeePerGas according to the EIP, otherwise `"10000000000"` is used.
- `initialDate`: An optional string setting the date of the blockchain. Valid values are [Javascript's date time strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse#Date_Time_String_Format). Default value: the current date and time if not forking another network. When forking another network, the timestamp of the block you forked from, plus one second, is used.
- `loggingEnabled`: A boolean that controls if a simulated network logs every request or not. Default value: `false` for in-process simulated networks, `true` for the simulated network used by the `node` task.
- `minGasPrice`: The minimum `gasPrice` that a transaction must have. This field must not be present if the `hardfork` is `"london"` or a later one. Default value: `"0"`.
- `mining`: An object that configures the mining behavior and can have the following fields:
  - `auto`: a boolean used to enable automine. Default value: `true`.
  - `interval`: a number or an array with two numbers to enable interval mining. If the value is a number, blocks will be automatically mined every `interval` milliseconds. If the value is an array, blocks will be mined at random intervals between the two numbers.
  - `mempool`: an object with an `order` field that can be set to `"fifo"` or `"priority"`. When set to `"fifo"`, transactions in the mempool are mined in FIFO order. When set to `"priority"`, they will be mined based on the fees paid to the miner. Default value: `"priority"`.
- `throwOnCallFailures`: A boolean that controls if simulated networks throw on call failures. If this value is `true`, Hardhat will throw combined JavaScript and Solidity stack traces when a call fails. If it is `false`, it will return the call's return data, which can contain a revert reason. Default value: `true`.
- `throwOnTransactionFailures`: A boolean that controls if simulated networks throw on transaction failures. If this value is `true`, Hardhat will throw combined JavaScript and Solidity stack traces on transaction failures. If it is `false`, it will return the failing transaction hash. In both cases the transactions are added into the blockchain. Default value: `true`.

#### JSON-RPC network options

The following options are specific to JSON-RPC networks:

- `accounts`: This field controls which accounts Hardhat uses. It can use the node's accounts (by setting it to `"remote"`), a list of local accounts (by setting it to an array of [configuration variables](../learn-more/configuration-variables.md)), or use an [HD Wallet](#hd-wallet-config). Default value: `"remote"`.
- `url`: The url of the node, passed in via [configuration variable](../learn-more/configuration-variables.md). This argument is required for HTTP networks.
- `httpHeaders`: An optional object with headers to be sent in every request to the node. This can be useful for authentication or other purposes.
- `timeout`: An optional number that specifies the timeout for requests to the node, in milliseconds.

#### HD Wallet config

To use an [HD Wallet](https://github.com/ethereumbook/ethereumbook/blob/develop/05wallets.asciidoc#hd_wallets) with Hardhat you should set your network's `accounts` field to an object with the following fields:

- `mnemonic`: A required string with the mnemonic phrase of the wallet. Passed in via [configuration variable](../learn-more/configuration-variables.md).
- `path`: The HD parent of all the derived keys. Default value: `"m/44'/60'/0'/0"`.
- `initialIndex`: The initial index to derive. Default value: `0`.
- `count`: The number of accounts to derive. Default value: `20`.
- `passphrase`: The passphrase for the wallet, passed in via [configuration variable](../learn-more/configuration-variables.md). Default value: empty string.
- `accountsBalance`: **Only available in simulated networks.** The balance of the accounts derived from the HD wallet.

For example:

```ts
export default {
  networks: {
    sepolia: {
      type: "http",
      chainType: "l1",
      url: configVariable("SEPOLIA_RPC_URL"),
      accounts: {
        mnemonic: configVariable("ACCOUNTS_MNEMONIC"),
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 20,
        passphrase: configVariable("ACCOUNTS_PASSPHRASE"),
        // only available when network type === "edr-simulated"
        accountsBalance: 10n ** 18n, // 1 ETH in wei
      },
    },
  },
};
```

### Solidity tests configuration

By default, Hardhat includes support for tests written in Solidity to test your contracts. You can use the `test.solidity` entry to configure how they behave. For example, the following config enables the `ffi` cheatcode:

```js
const config = {
  test: {
    solidity: {
      ffi: true,
    },
  },
};
```

The following options are available for configuring Solidity tests:

- `ffi`: A boolean that enables the `ffi` cheatcode. Enabling this cheatcodes allows tests to call external programs and it's disabled by default for security reasons. Default value: `false`.
- `fsPermissions`: An object used to configure the file system permissions for cheatcodes. It can have the following fields:
  - `readFile`: An array of file paths that can be read.
  - `writeFile`: An array of file paths that can be written.
  - `readWriteFile`: An array of file paths that can be both read and written.
  - `readDirectory`: An array of directory paths. All files and directories inside these directories can be read.
  - `dangerouslyWriteDirectory`: An array of directory paths. All files and directories inside these directories can be written. This is a dangerous option, as it allows writing to any file in the specified directories, so it should be used with caution.
  - `dangerouslyReadWriteDirectory`: An array of directory paths. All files and directories inside these directories can be both read and written. This is a dangerous option, as it allows writing to any file in the specified directories, so it should be used with caution.
- `isolate`: A boolean that enables running tests in isolated mode. Default value: `false`.

## Toolbox options

Hardhat provides two official toolboxes, each with a set of plugins meant to simplify setup: [`hardhat-toolbox-viem`](/plugins/nomicfoundation-hardhat-toolbox-viem) and [`hardhat-toolbox-mocha-ethers`](/plugins/nomicfoundation-hardhat-toolbox-mocha-ethers).

Both toolboxes include the `hardhat-ignition` and `hardhat-verify` plugins, and their configuration is documented elsewhere:

- `hardhat-ignition`: see the [Hardhat Ignition documentation](/ignition/docs/config/index.md).
- `hardhat-verify`: see the [verification guide](/docs/learn-more/smart-contract-verification.md).

## Viem Toolbox options

The Viem toolbox makes the [Node.js test runner](https://nodejs.org/api/test.html) available for use in your Hardhat project. You can tell Hardhat where your tests are located by setting the `paths.tests.nodejs` field in your config, like this:

```ts
export default {
  paths: {
    tests: {
      nodejs: "./paths/to/your/tests",
    },
  },
};
```

## Ethers Toolbox options

The Ethers toolbox makes the [Mocha test runner](https://mochajs.org/) available for use in your Hardhat project. You can tell Hardhat where your tests are located by setting the `paths.tests.mocha` field in your config, like this:

```ts
export default {
  paths: {
    tests: {
      mocha: "./paths/to/your/tests",
    },
  },
};
```

Additionally, you can configure Mocha itself by providing an object to the `test.mocha` field, like this:

```ts
export default {
  test: {
    mocha: {
      timeout: 20000, // Set the timeout for tests to 20 seconds
    },
  },
};
```

:::tip

All options available in Mocha can be used here. You can find more information in the [Mocha documentation](https://mochajs.org/#configuring-mocha-nodejs).

:::

### Typechain configuration

The Ethers toolbox comes with Typechain support out of the box. You can configure it by providing an object to the `typechain` field in your config, like this:

```ts
export default {
  typechain: {
    /**
     * The absolute path to the folder where the generated types will be stored.
     * By default, this is set to the "types" folder in the root of your Hardhat project.
     */
    outDir: "./types",

    /**
     * Determines whether overloads with full signatures (e.g., deposit(uint256))
     * should always be generated, even if there are no overloads.
     * Defaults to false.
     */
    alwaysGenerateOverloads: false,

    /**
     * Indicates whether TypeChain should be skipped during compilation.
     * If true, TypeChain will not be executed during the compilation process.
     * Defaults to false.
     */
    dontOverrideCompile: false,

    /**
     * Generates basic union types for overloaded functions without adding extra
     * properties to help TypeScript identify specific cases.
     * Defaults to false.
     */
    discriminateTypes: false,

    /**
     * Skips type-checking in the generated files.
     * Defaults to false.
     */
    tsNocheck: false,
  },
};
```
