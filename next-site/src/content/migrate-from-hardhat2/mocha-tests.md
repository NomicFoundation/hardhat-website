# Migrating Mocha tests

This page covers the changes needed to migrate your Mocha tests from Hardhat 2 to Hardhat 3.

## ESM

Hardhat 3 is ESM-first, so files with a `.js` extension are treated as ES modules. If your tests are written in JavaScript, this means that you have to update them to use ESM syntax or change their extension to `.cjs`.

### Updating the syntax to ESM

Check [this guide](https://deno.com/blog/convert-cjs-to-esm) to learn how to convert CommonJS code to ESM, but here's a summary:

- Convert statements like `const x = require("x")` to `import x from "x"`.
- When importing a relative path, you always have to include the file extension. For example, `const x = require("./x")` becomes `import x from "./x.js"`, not `import x from "./x"`.
- Convert `module.exports = x` to `export default x` and `module.exports.x = 1` to `export const x = 1`.
- `__dirname` and `__filename` are now available as `import.meta.dirname` and `import.meta.filename`.

### Changing the extension to .cjs

Alternatively, you can rename your test files so that they have a `.cjs` extension. This way, they will be treated as CommonJS modules and you won't have to change any syntax. **That said, we still recommend writing new tests in ESM** to take advantage of modern JavaScript features and match Hardhat 3's defaults.

If you go with the `.cjs` approach, note that you can't require Hardhat as a top-level module. This code:

```js
const hre = require("hardhat");

describe("suite", function () {
  it("some test", async function () {
    // use the hre
  });
});
```

has to be changed to:

```js
describe("suite", function () {
  let hre;
  before(async function () {
    hre = await import("hardhat");
  });

  it("some test", async function () {
    // use the hre
  });
});
```

Notice that this can only be done inside async functions.

If you migrated to ESM instead, that would be:

```js
import hre from "hardhat";

describe("suite", function () {
  it("some test", async function () {
    // use the hre
  });
});
```

## Network connections

In Hardhat 3, you don't have a single, global network connection. Instead, you create and manage network connections explicitly. For example, if you have a test that uses the JSON-RPC provider:

```ts
describe("suite", function () {
  it("some test", async function () {
    const blockNumber = await hre.network.provider.send("eth_blockNumber");
  });
});
```

You now have to create a network connection first:

```ts
describe("suite", function () {
  it("some test", async function () {
    const { provider } = await hre.network.connect();
    const blockNumber = await provider.send("eth_blockNumber");
  });
});
```

Most of the time you probably want to use the same provider for multiple tests. If you are using ESM syntax, you can use top-level await and define it as a shared variable:

```ts
const { provider } = await hre.network.connect();

describe("suite", function () {
  it("some test", async function () {
    const blockNumber = await provider.send("eth_blockNumber");
  });
});
```

If you are using CommonJS modules instead, you can define the provider in a `before` block:

```ts
let provider;

describe("suite", function () {
  before(async function () {
    ({ provider } = await hre.network.connect());
  });

  it("some test", async function () {
    const blockNumber = await provider.send("eth_blockNumber");
  });
});
```

## The ethers.js object

In Hardhat 2, the `hardhat-ethers` plugin adds an `ethers` object to the Hardhat Runtime Environment, meaning you can do things like this in a test:

```ts
const hre = require("hardhat");

describe("suite", function () {
  it("some test", async function () {
    const contract = await hre.ethers.deployContract("MyContract");
  });
});
```

In Hardhat 3, this same `ethers` object is included as part of each created network connection:

```ts
import hre from "hardhat";

describe("suite", function () {
  let ethers;
  before(async function () {
    ({ ethers } = await hre.network.connect());
  });

  it("some test", async function () {
    const contract = await ethers.deployContract("MyContract");
  });
});
```

## Chai matchers changes

Some of the Chai matchers have changed in Hardhat 3, to make them work with multiple network connections.

These changes are:

- Some matchers take an instance of `HardhatEthers` (i.e. the `ethers` object from the network connection), as shown in this list.
- `.reverted` is now `.revert(ethers)`
- `.revertedWithoutReason()` is now `.revertedWithoutReason(ethers)`
- `changeEtherBalance`, `changeEtherBalances`, `changeTokenBalance`, and `changeTokenBalances` now take an instance of `HardhatEthers` as the first argument.

## Hardhat network helper changes

The `@nomicfoundation/hardhat-network-helpers` package is now a plugin. Instead of importing its functions directly, now you get the helpers as part of the network connection:

```ts
import { network } from "hardhat";
const { networkHelpers } = await network.connect();

await networkHelpers.mine(5);
```
