# Hardhat 3: beta status

Hardhat 3 is production-ready and you can migrate today!

We'll keep it in beta status as we work on missing features and stabilize it in the near future.

## Migration readiness

We don't expect any major user-facing breaking change in the API, so we encourage projects to migrate to Hardhat 3.

Take a look at the [migration guide](../../migrate-from-hardhat2/) to see how to do it.

## Work in progress features

There are some features that are still in development, and should be released soon:

- Ledger support: We are working on porting over the `@nomicfoundation/hardhat-ledger` plugin, and should be available soon.

- Gas reporting: Hardhat 3 will have a built-in alternative for the [`hardhat-gas-reporter`](https://www.npmjs.com/package/hardhat-gas-reporter) plugin, which will work with Solidity and Typescript tests.

- Gas snapshots: The ability to take gas snapshots and compare them is still under development.

## Migration blockers

If your migration is blocked by a missing feature or plugin, please let us know [in this issue](https://github.com/NomicFoundation/hardhat/issues/7207).

## Plugin APIs

The plugin APIs are still in beta status, and we may release small breaking changes in the future. If you are developing a plugin, please keep this in mind, and get in touch with us if you have any questions.
