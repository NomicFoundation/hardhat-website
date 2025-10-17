# Writing unit tests in Solidity

Hardhat supports writing tests in both TypeScript and Solidity. TypeScript is typically used for higher-level integration tests, whereas Solidity is better suited for unit tests. This guide explains how to add Solidity tests to a Hardhat project, run them, and configure their execution. This isn't meant to serve as an introduction to Solidity tests and assumes familiarity with them.

## Writing Solidity tests

A Solidity file is considered a **test file** if:

- It's inside the `test/` directory
- It's inside the `contracts/` directory and ends with `.t.sol`.

Both of these directories can be changed in your Hardhat configuration, but these are the default ones.

If a contract in a test file has at least one function that starts with `test`, it's considered a **test contract**. When the tests are run, Hardhat deploys every test contract and calls each of its test functions.

For example, if you have a file named `contracts/CounterTest.t.sol` or `test/CounterTest.sol` with the following contract:

```solidity
contract CounterTest {
    function testInc() public {
        Counter counter = new Counter();
        counter.inc();
        require(counter.count() == 1, "count should be 1");
    }
}
```

the test runner will deploy the `CounterTest` contract and call its `testInc` function. If the function execution reverts, the test is considered failed.

Hardhat also supports **fuzz tests**, which are similar to regular tests but accept parameters. When the tests are executed, fuzz test functions are called multiple times with random values as arguments:

```solidity
contract CounterTest {
    function testIncBy(uint by) public {
        Counter counter = new Counter();
        counter.incBy(by);
        require(counter.count() == by, "count should match the 'by' value");
    }
}
```

### Assertion libraries

In the previous example, the error message doesn't show the actual value of `by` that made the test fail. That's because interpolating the value into the string isn't straightforward in Solidity. To get better error messages, plus other useful functionality, you can use an assertion library like [forge-std](https://github.com/foundry-rs/forge-std).

To use `forge-std` in a Hardhat project, first install it:

::::tabsgroup{options=npm,pnpm,yarn}

:::tab{value=npm}

```bash
npm install --save-dev github:foundry-rs/forge-std#v1.9.7
```

:::

:::tab{value=pnpm}

```bash
pnpm install --save-dev github:foundry-rs/forge-std#v1.9.7
```

:::

:::tab{value=yarn}

```bash
yarn add --dev github:foundry-rs/forge-std#v1.9.7
```

:::

::::

You can then import the `Test` base contract and extend your test contracts from it. This lets you use helper functions like `assertEq`, which shows the mismatched values when the assertion fails:

```solidity
import { Test } from "forge-std/Test.sol";

contract CounterTest is Test {
    function testIncBy(uint by) public {
        Counter counter = new Counter();
        counter.incBy(by);
        assertEq(counter.count(), by, "count should match the 'by' value");
    }
}
```

### Setup functions

Both the unit and fuzz test examples shown above create an instance of the `Counter` contract. You can share setup logic like that across tests using the `setUp` function, which is called before each test execution:

```solidity
contract CounterTest {
    Counter counter;

    function setUp() public {
      counter = new Counter();
    }

    function testInc() public {
        counter.inc();
        require(counter.count() == 1, "count should be 1");
    }

    function testIncBy(uint by) public {
        counter.incBy(by);
        require(counter.count() == by, "count should match the 'by' value");
    }
}
```

## Running Solidity tests

You can run all the tests in your Hardhat project using the `test` task:

::::tabsgroup{options=npm,pnpm,yarn}

:::tab{value=npm}

```bash
npx hardhat test
```

:::

:::tab{value=pnpm}

```bash
pnpm hardhat test
```

:::

:::tab{value=yarn}

```bash
yarn hardhat test
```

:::

::::

If you only want to run your Solidity tests, use the `test solidity` task instead:

::::tabsgroup{options=npm,pnpm,yarn}

:::tab{value=npm}

```bash
npx hardhat test solidity
```

:::

:::tab{value=pnpm}

```bash
pnpm hardhat test solidity
```

:::

:::tab{value=yarn}

```bash
yarn hardhat test solidity
```

:::

::::

You can also pass one or more paths as arguments to these tasks, in which case only those files are executed:

::::tabsgroup{options=npm,pnpm,yarn}

:::tab{value=npm}

```bash
npx hardhat test <test-file-1> <test-file-2> ...
```

:::

:::tab{value=pnpm}

```bash
pnpm hardhat test <test-file-1> <test-file-2> ...
```

:::

:::tab{value=yarn}

```bash
yarn hardhat test <test-file-1> <test-file-2> ...
```

:::

::::

## Configuring Solidity tests

You can configure how Solidity tests are executed in your Hardhat configuration.

### Configuring the tests location

By default, Hardhat treats every Solidity file in the `test/` directory as a test file. To use a different location, set the `paths.tests.solidity` field:

```typescript
paths: {
  tests: {
    solidity: "./solidity-tests"
  }
},
```

### Configuring the tests execution

To configure how Solidity tests are executed, use the `test.solidity` object in the Hardhat configuration.

For example, the `ffi` cheatcode is disabled by default for security reasons, but you can enable it:

```typescript
test: {
  solidity: {
    ffi: true,
  },
},
```

It's also possible to modify the execution environment of the tests. For example, you can modify the address that is returned by `msg.sender`:

```typescript
test: {
  solidity: {
    sender: "0x1234567890123456789012345678901234567890",
  },
},
```
