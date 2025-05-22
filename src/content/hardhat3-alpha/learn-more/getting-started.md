---
prev: true
---

# Getting started with Hardhat

Hardhat is a flexible and extensible development environment for Ethereum software. It helps you write, test, debug and deploy your smart contracts with ease, whether you're building a simple prototype or a complex production system.

This guide will walk you through the installation of our recommended setup, but as most of Hardhat's functionality comes from plugins, you are free to customize it or choose a completely different path.

## Installation

:::tip

[Hardhat for Visual Studio Code](/hardhat-vscode) is the official Hardhat extension that adds advanced support for Solidity to VSCode. If you use Visual Studio Code, give it a try!

:::

To get started with Hardhat 3, you’ll need [Node.js](https://nodejs.org/) v22 or later installed on your system, along with a package manager such as [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/).

First, create a new directory for your project and initialize it as a Node.js project:

::::tabsgroup{options=npm,pnpm}

:::tab{value=npm}

```bash
mkdir hardhat-example && cd hardhat-example
npm init -y
```

:::

:::tab{value=pnpm}

```bash
mkdir hardhat-example && cd hardhat-example
pnpm init
```

:::

::::

Once that's done, initialize your Hardhat project by running:

::::tabsgroup{options=npm,pnpm}

:::tab{value=npm}

```bash
npx hardhat@next --init
```

:::

:::tab{value=pnpm}

```bash
pnpm dlx hardhat@next --init
```

:::

::::

This command will prompt you with a few configuration options. You can accept the default answers to quickly scaffold a working setup. Using the defaults will:

1. Use the current directory as the project root.
2. Enable ESM for your Node.js project.
3. Use the example project that includes the [Node.js test runner](https://nodejs.org/api/test.html) and [viem](https://viem.sh/).
4. Automatically install all required dependencies.

After the setup is complete, you’ll have a fully working Hardhat 3 project with everything you need to get started. Run the Hardhat help to verify the project was set up correctly:

::::tabsgroup{options=npm,pnpm}

:::tab{value=npm}

```bash
npx hardhat --help
```

:::

:::tab{value=pnpm}

```bash
pnpm hardhat --help
```

:::

::::

## Project structure

The Hardhat project initialization from the previous section creates the following file structure:

```
hardhat.config.ts

contracts
├── Counter.sol
└── Counter.t.sol

test
└── Counter.ts

ignition
└── modules
    └── Counter.ts

scripts
├── check-predeploy.ts
└── send-op-tx.ts
```

Here’s a quick overview of these files and directories:

- `hardhat.config.ts`: The main configuration file for your project. It defines settings like the Solidity compiler version, network configurations, and the plugins and tasks your project uses.
- `contracts`: Contains your project's Solidity contracts. You can also include Solidity test files here—any `.t.sol` file will be picked up by the test runner.
- `test`: Used for TypeScript integration tests. You can also include Solidity test files here.
- `ignition`: Holds your [Ignition](https://hardhat.org/ignition) deployment modules, which describe how your contracts should be deployed and can be reused across multiple environments.
- `scripts`: A place for any custom scripts that interact with your contracts or automate parts of your workflow. Scripts have full access to Hardhat’s runtime and can use plugins, connect to networks, deploy contracts, and more.

## Running tasks

Hardhat is built around the concept of tasks—commands that automate common parts of your development workflow. Some tasks are built-in while others are added by plugins. It's also possible to define custom tasks tailored to your project's needs.

A simple example of a built-in task is `compile`. This task compiles your Solidity source files and generates the corresponding artifacts:

::::tabsgroup{options=npm,pnpm}

:::tab{value=npm}

```bash
npx hardhat compile
```

:::

:::tab{value=pnpm}

```bash
pnpm hardhat compile
```

:::

::::

Another essential task is `test`, which runs your project’s tests. Hardhat 3 supports both Solidity and TypeScript tests out of the box. You can run them separately using the `test solidity` and `test node` sub-tasks:

::::tabsgroup{options=npm,pnpm}

:::tab{value=npm}

```bash
npx hardhat test solidity
npx hardhat test node
```

:::

:::tab{value=pnpm}

```bash
pnpm hardhat test solidity
pnpm hardhat test node
```

:::

::::

To run all tests in your project—both Solidity and TypeScript—you can use the main `test` task:

::::tabsgroup{options=npm,pnpm}

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

::::

Hardhat also includes support for deploying contracts using [Ignition](https://hardhat.org/ignition), our official deployment system. You can deploy to a live network or test everything in a local, temporary network:

::::tabsgroup{options=npm,pnpm}

:::tab{value=npm}

```bash
npx hardhat ignition deploy ignition/modules/Counter.ts
```

:::

:::tab{value=pnpm}

```bash
pnpm hardhat ignition deploy ignition/modules/Counter.ts
```

:::

::::

For more custom workflows, you can create scripts that use Hardhat’s runtime and run them with the `run` task:

::::tabsgroup{options=npm,pnpm}

:::tab{value=npm}

```bash
npx hardhat run scripts/send-op-tx.ts
```

:::

:::tab{value=pnpm}

```bash
pnpm hardhat run scripts/send-op-tx.ts
```

:::

::::

Whether you're compiling contracts, running tests, deploying to testnets, or executing custom logic, tasks are the core of how you interact with Hardhat.

## Writing tests

Tests are a critical part of any Ethereum project. Hardhat lets you write tests in both **Solidity** and **TypeScript**, giving you flexibility to choose the right tool for each situation.

Solidity tests run directly on the EVM and are great for unit tests. They execute in a controlled environment with access to cheatcodes, making them fast and deterministic.

TypeScript tests, on the other hand, use a fully-simulated local blockchain and interact with it through JSON-RPC. This allows you to write more complex or end-to-end tests using the full power of a general-purpose programming language and a realistic blockchain simulation.

Use Solidity when you want low-level, efficient, EVM-native tests. Use TypeScript when you want richer tooling, more flexible assertions, or to test real-world interactions.

### Solidity tests

Hardhat 3 has full support for writing Solidity tests. The example project includes a Solidity test file at `contracts/Counter.t.sol`:

```solidity
import { Counter } from "./Counter.sol";
import { Test } from "forge-std/Test.sol";

contract CounterTest is Test {
  Counter counter;

  function setUp() public {
    counter = new Counter();
  }

  function test_InitialValue() public view {
    require(counter.x() == 0, "Initial value should be 0");
  }

  function testFuzz_Inc(uint8 x) public {
    for (uint8 i = 0; i < x; i++) {
      counter.inc();
    }
    require(counter.x() == x, "Value after calling inc x times should be x");
  }

  function test_IncByZero() public {
      vm.expectRevert();
      counter.incBy(0);
  }
}
```

You can run all the project’s Solidity tests using the `test solidity` sub-task:

::::tabsgroup{options=npm,pnpm}

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

::::

When you run this command, Hardhat will:

- Treat all `.t.sol` files in the `contracts/` directory and all `.sol` files in the `test/` directory as test files.
- Deploy each test contract defined in those files.
- Call every function that starts with `test`. If any of these calls revert, the corresponding test is marked as failed.

In the example above:

- `test_InitialValue` and `test_IncByZero` are **unit tests**: they take no parameters and run once per test execution.
- `testFuzz_Inc` is a **fuzz test**: since it takes a parameter, Hardhat will run it multiple times using random inputs. If any of those runs revert, the fuzz test fails and the failing input is printed.

Hardhat also provides detailed **Solidity stack traces** to help you understand why a test failed. To see them in action, first comment out the `vm.expectRevert();` line in `test_IncByZero`:

```solidity
function test_IncByZero() public {
    // vm.expectRevert();
  counter.incBy(0);
}
```

Then run the `test solidity` sub-task again and you’ll get a stack-trace along with the test failure:

```
Failure (1): test_IncByZero()
Reason: revert: incBy: increment should be positive
  at Counter.incBy (contracts/Counter.sol:15)
  at CounterTest.test_IncByZero (contracts/Counter.t.sol:30)
```

This lets you quickly pinpoint the issue, even across deeply nested calls.

Learn more at `<link to solidity tests guide>`.

### TypeScript tests

Solidity tests are ideal for fast, focused unit testing, but they fall short in certain situations:

- **Complex test logic**, where a general-purpose language like TypeScript is more expressive and ergonomic than Solidity.
- **Tests that require realistic blockchain behavior**, such as advancing blocks or working with multiple transactions. While cheatcodes can simulate this to some extent, excessive mocking is hard to maintain and can lead to inaccurate assumptions.
- **End-to-end scenarios**, where you want to test your contracts as they would behave in production—across multiple transactions, clients, and user interactions.

To support these cases, Hardhat lets you write tests in TypeScript (or JavaScript), using the Node.js test runner or other frameworks like Mocha. These tests run in a real Node.js environment and interact with your contracts through RPC, making them more representative of actual usage.

The example project includes a TypeScript test file at `test/Counter.ts`:

```tsx
describe("Counter", async function () {
  const { viem } = await network.connect();
  const publicClient = await viem.getPublicClient();

  it("The sum of the Increment events should match the current value", async function () {
    const counter = await viem.deployContract("Counter");

    // run a series of increments
    for (let i = 1n; i <= 10n; i++) {
      await counter.write.incBy([i]);
    }

    const events = await publicClient.getContractEvents({
      address: counter.address,
      abi: counter.abi,
      eventName: "Increment",
      fromBlock: 0n,
      strict: true,
    });

    // check that the aggregated events match the current value
    let total = 0n;
    for (const event of events) {
      total += event.args.by;
    }

    assert.equal(total, await counter.read.x());
  });
});
```

To run all TypeScript tests, use the `test node` sub-task:

::::tabsgroup{options=npm,pnpm}

:::tab{value=npm}

```bash
npx hardhat test node
```

:::

:::tab{value=pnpm}

```bash
pnpm hardhat test node
```

:::

::::

This test deploys the `Counter` contract, calls `incBy` multiple times (each in a separate transaction), collects all the emitted `Increment` events, and verifies that their sum matches the contract's final value.

Writing this same test in Solidity is possible, but less convenient, and the test would be executed in a different context—closer to a contract calling another contract than a user interacting with it over time. This makes TypeScript a better fit for scenarios that depend on realistic transaction flows or blockchain behavior.

## Using scripts

- What scripts are
- Example script
- Scripts vs tasks

## Deploying contracts

- Short explanation about Ignition
- Example module explanation
- Running a deployment in a Hardhat node
- Connecting a wallet to a Hardhat node

## Next steps

- Things to do next
- Links to other guides
