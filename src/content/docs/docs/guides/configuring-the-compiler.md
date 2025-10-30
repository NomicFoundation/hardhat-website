---
prev: false
---

# How to configure the compiler

Solidity compilation in Hardhat is fully customizable. This guide explains the main ways in which compilation can be configured.

## Configuring the compiler version and settings

The simplest way to configure compilation is to specify the solc compiler version and, optionally, its settings:

```typescript
solidity: {
  version: "0.8.29",
  settings: {
    /* solc settings */
  }
},
```

One common use of settings is enabling optimizations. You can also define the number of runs, which affects how the optimizer balances code size and execution cost:

```typescript
solidity: {
  version: "0.8.29",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
},
```

Another use case is enabling the [IR-based code generator](https://docs.soliditylang.org/en/latest/ir-breaking-changes.html). This compilation mode can be slower, but it enables more powerful optimizations:

```typescript
solidity: {
  version: "0.8.29",
  settings: {
    viaIR: true
  }
},
```

The `settings` property accepts the same options supported by the chosen compiler version. For the full details, check [solc's documentation](https://docs.soliditylang.org/en/latest/).

## Using multiple solidity versions

Some projects need to compile different files with different solc versions. To enable this, Hardhat lets you define multiple compiler configurations using an extended format of the `solidity` property:

```typescript
solidity: {
  compilers: [
    {
      version: "0.7.6"
    },
    {
      version: "0.8.11"
    },
    {
      version: "0.8.29",
      settings: {
        optimizer: { enabled: true }
      }
    }
  ]
},
```

Hardhat compiles each Solidity file in the project using the **highest configured solc version** that is compatible with the version pragma of the file and its dependencies.

For example, given the configuration above:

- A file with `pragma solidity ^0.8.0` will be compiled with solc `0.8.29`, even though `0.8.11` is also compatible with it.
- A file with `pragma solidity ^0.7.0` will use solc `0.7.6`, which is the only valid matching version.

## Overriding configured compilers

Some projects need to compile specific files using a different compiler version than Hardhat's default choice. You can handle this with the `overrides` property:

```typescript
solidity: {
  compilers: [
    /* configured compilers */
  ],
  overrides: {
    "contracts/Foo.sol": {
      version: "0.8.11"
    }
  }
},
```

In this case, `Foo.sol` will always be compiled with solc 0.8.11, regardless of the versions defined in `solidity.compilers`.

Each entry in the `overrides` object maps a file to a custom compiler configuration. Just like the main configuration, only the `version` field is mandatory.

You can use overrides even if you are using a single solc version, but you still need to use the extended format of the `solidity` property. For example, you can enable the optimizer only for a single file:

```typescript
solidity: {
  compilers: [
    {
      version: "0.8.29",
    }
  ],
  overrides: {
    "contracts/Foo.sol": {
      version: "0.8.29",
      settings: {
        optimizer: {
          enabled: true
        }
      }
    }
  }
},
```

<!--
## Using remappings

TODO—blocked until dependency resolution is finalized.
-->

## Using a custom compiler

Hardhat supports custom compilers like [solx](https://solx.zksync.io). You need to manually download the compiler binary (e.g. [solx releases page](https://github.com/matter-labs/solx/releases)) and reference it in the Solidity settings of the `hardhat.config.ts` file.

You can configure the path to the custom compiler binary using the `path` property. This property can be used in both the simple and extended formats of the `solidity` property. For example, using the simple format:

```typescript
solidity: {
  version: "0.8.29",
  path: "/path/to/solx" // Replace with the actual path to the solx binary
},
```

Or using the extended format:

```typescript
solidity: {
  compilers: [
    {
      version: "0.8.29",
      path: "/path/to/solx"
    }
  ]
},
```

## Generating artifacts from npm dependencies

By default, Hardhat generates compilation artifacts for all the contracts in your project, but not for those in the project's npm dependencies. If you want to generate artifacts for a specific file in a dependency, you can use the `npmFilesToBuild` property:

```typescript
solidity: {
  version: "0.8.29",
  npmFilesToBuild: [
    "some-dependency/contracts/SomeContract.sol"
  ]
},
```

Artifacts can be used to deploy contracts or to obtain their ABIs, among other things. For example, once you've configured Hardhat to generate artifacts for `some-dependency/contracts/SomeContract.sol`, you can use that contract in a TypeScript test:

```typescript
const someContract = await viem.deployContract("SomeContract");
```
