---
prev: false
---

# What's new in Hardhat 3

Hardhat 3 comes with many new features and improvements. Most of these changes are backwards-compatible or easy to adapt to existing projects.

### Support for Solidity Tests

Hardhat 3 comes with Foundry-compatible Solidity tests, which are fast and ideal for unit testing, and also work great for fuzz and invariant tests. Writing integration tests in TypeScript is still supported and can be used alongside Solidity tests.

Learn more in [our Solidity tests guide](./writing-solidity-tests).

### Multichain support

Hardhat 2's development network always behaves like Ethereum Mainnet. Hardhat 3 removes this limitation, letting you choose which kind of chain you want to simulate. And, unlike Hardhat 2, you can configure multiple simulated networks, each with its own chain type.

The initial release includes first-class support for Ethereum Mainnet and OP Mainnet, and we'll gradually add new chain types over time. In the meantime, a generic chain type can be used as a fallback for networks that are not yet supported. This generic chain type behaves the same as Hardhat Network in Hardhat 2 and works with all of Hardhat 3's new features.

### ESM-first

Hardhat 3 embraces modern JavaScript by using [ECMAScript Modules (ESM)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) by default. Configuration files must now use ESM, although CommonJS (CJS) modules are still supported in scripts and tests.

### Network manager

A Hardhat 2 task has access to a single, fixed connection for its entire duration. In Hardhat 3, connections are managed explicitly, and tasks can create and use multiple connections simultaneously.

### Test Runner Plugins

In Hardhat 2, JavaScript tests are always run with a bundled version of Mocha. In Hardhat 3, the test runner is just another plugin and you can choose which one to use. We have official plugins for Mocha and for [Node.js's built-in test runner](https://nodejs.org/api/test.html). The recommended option is the Node.js test runner, because it's fast and has no external dependencies.

### Built-in Solidity code coverage

Hardhat 3 comes with built-in Solidity code coverage, which works out of the box both in Solidity and TypeScript tests. All you need to do is run your tests with `--coverage`.

### Declarative Configuration

Hardhat 3 configuration is now fully declarative. This contrasts with Hardhat 2, where part of the configuration came from the side effects of importing plugins or calling configuration functions like `task`.

### Configuration Variables

Hardhat 3 has support for Configuration Variables: values of the config that will only be loaded when needed. A similar feature already exists in Hardhat 2, but Hardhat 3's configuration variables are lazy and extensible.

By default, their values are loaded from environment variables, but this behavior can be customized by plugins. Hardhat 3 comes with an official plugin that lets you store them encrypted on disk.

### Build profiles

Hardhat 3 introduces support for build profiles, which let you define different compilation settings for different workflows.

### Full npm support

Anything that can be done with npm is now supported by the build system of Hardhat 3. In most cases, this won't affect you, but advanced scenarios that were difficult or impossible now work out of the box.

### New plugin system

Hardhat 3 comes with a new hook system that enables easy extension of core functionality and allows plugin authors to add their own extensibility points.

### Typed artifacts

Hardhat 3 generates TypeScript declarations to have typed artifacts by default. These artifacts can be used by plugins to derive contract type information without a code generation step.

### Programmatic initialization of the Hardhat Runtime Environment

Apart from accessing a global instance of the Hardhat Runtime Environment by importing it from the `hardhat` module, you can now initialize multiple independent instances of the HRE programmatically.
