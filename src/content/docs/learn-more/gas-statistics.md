## Overview

Hardhat can optionally show statistics on the gas consumed by your contracts' public functions during a test run. Use the `--gas-stats` flag when running your tests to display this information.

## Getting gas statistics from your tests

You can pass the `--gas-stats` flag to either the `test` task or to one of its subtasks (e.g., `test solidity`):

::::tabsgroup{options=npm,pnpm,yarn}

:::tab{value=npm}

```bash
npx hardhat test --gas-stats
npx hardhat test solidity --gas-stats
npx hardhat test nodejs --gas-stats
```

:::

:::tab{value=pnpm}

```bash
pnpm hardhat test --gas-stats
pnpm hardhat test solidity --gas-stats
pnpm hardhat test nodejs --gas-stats
```

:::

:::tab{value=yarn}

```bash
yarn hardhat test --gas-stats
yarn hardhat test solidity --gas-stats
yarn hardhat test nodejs --gas-stats
```

:::

::::

This prints a table like the following:

```
╔═════════════════════════════════════════════════════════════════════════════════════════╗
║                                  Gas Usage Statistics                                   ║
╚═════════════════════════════════════════════════════════════════════════════════════════╝
╔═════════════════════════════════════════════════════════════════════════════════════════╗
║ contracts/Calculator.sol:Calculator                                                     ║
╟───────────────────────────────────┬─────────────────┬─────────┬────────┬───────┬────────╢
║ Function name                     │ Min             │ Average │ Median │ Max   │ #calls ║
╟───────────────────────────────────┼─────────────────┼─────────┼────────┼───────┼────────╢
║ divide                            │ 44316           │ 44316   │ 44316  │ 44316 │ 1      ║
║ multiply(uint256,uint256)         │ 44254           │ 44254   │ 44254  │ 44254 │ 2      ║
║ multiply(uint256,uint256,uint256) │ 44875           │ 44875   │ 44875  │ 44875 │ 1      ║
║ reset                             │ 21485           │ 21485   │ 21485  │ 21485 │ 1      ║
║ result                            │ 23510           │ 23510   │ 23510  │ 23510 │ 6      ║
║ subtract                          │ 44213           │ 44213   │ 44213  │ 44213 │ 1      ║
╟───────────────────────────────────┼─────────────────┼─────────┴────────┴───────┴────────╢
║ Deployment Cost                   │ Deployment Size │                                   ║
╟───────────────────────────────────┼─────────────────┤                                   ║
║ 288115                            │ 1120            │                                   ║
╚═══════════════════════════════════╧═════════════════╧═══════════════════════════════════╝
╔═════════════════════════════════════════════════════════════════════════════════════════╗
║ contracts/Counter.sol:Counter                                                           ║
╟───────────────────────────────────┬─────────────────┬─────────┬────────┬───────┬────────╢
║ Function name                     │ Min             │ Average │ Median │ Max   │ #calls ║
╟───────────────────────────────────┼─────────────────┼─────────┼────────┼───────┼────────╢
║ add(uint256)                      │ 43915           │ 43915   │ 43915  │ 43915 │ 1      ║
║ add(uint256,bool)                 │ 44284           │ 44419   │ 44419  │ 44554 │ 2      ║
║ inc                               │ 43482           │ 43482   │ 43482  │ 43482 │ 1      ║
║ x                                 │ 23466           │ 23466   │ 23466  │ 23466 │ 5      ║
╟───────────────────────────────────┼─────────────────┼─────────┴────────┴───────┴────────╢
║ Deployment Cost                   │ Deployment Size │                                   ║
╟───────────────────────────────────┼─────────────────┤                                   ║
║ 234940                            │ 870             │                                   ║
╚═══════════════════════════════════╧═════════════════╧═══════════════════════════════════╝
```

The statistics are collected from the functions called by the tests you executed. This means that running `test solidity --gas-stats` will produce a different result than running `test nodejs --gas-stats`, because different tests will have been run.

## Understanding the Gas Statistics Table

The gas statistics table shows the following information for each function:

- **count**: Number of times the function was called
- **min**: Minimum gas consumed in a single call
- **max**: Maximum gas consumed in a single call
- **avg**: Average gas consumed across all calls
- **median**: Median gas consumed across all calls

For deployments, the table shows:

- **gas**: Gas cost of executing the deployment
- **size**: Size of the deployed bytecode in bytes

### Functions included in gas statistics

Gas statistics only include public functions that are called directly by your tests. If a public function is called by another function but not directly by a test, it won't be included in the statistics.

For example, consider this contract:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
  uint256 public count;

  function inc() public {
    _incInternal();
  }

  function _incInternal() private {
    count++;
  }

  function incBy(uint256 value) public {
    count += value;
  }

  function reset() public {
    count = 0;
  }
}

```

And this test:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Counter.sol";

contract CounterTest {
  Counter counter;

  function setUp() public {
    counter = new Counter();
  }

  function testInc() public {
    counter.inc();
  }

  function testIncBy() public {
    counter.incBy(5);
  }
}
```

The output will be:

```
╔═══════════════════════════════════════════════════════════════════════╗
║                         Gas Usage Statistics                          ║
╚═══════════════════════════════════════════════════════════════════════╝
╔═══════════════════════════════════════════════════════════════════════╗
║ contracts/Counter.sol:Counter                                         ║
╟─────────────────┬─────────────────┬─────────┬────────┬───────┬────────╢
║ Function name   │ Min             │ Average │ Median │ Max   │ #calls ║
╟─────────────────┼─────────────────┼─────────┼────────┼───────┼────────╢
║ inc             │ 43484           │ 43484   │ 43484  │ 43484 │ 1      ║
║ incBy           │ 43937           │ 43937   │ 43937  │ 43937 │ 1      ║
╟─────────────────┼─────────────────┼─────────┴────────┴───────┴────────╢
║ Deployment Cost │ Deployment Size │                                   ║
╟─────────────────┼─────────────────┤                                   ║
║ 179915          │ 616             │                                   ║
╚═════════════════╧═════════════════╧═══════════════════════════════════╝
```

The statistics include `inc` and `incBy` because they're called directly by the tests. The `reset()` function doesn't appear because it's never called by the tests. The `_incInternal()` function doesn't appear because it's private and only called by `inc()`, not directly by the tests.
