import type { Redirects } from "./types";

export default [
  [
    "/hardhat-runner/docs/config#hd-wallet-config",
    "/docs/reference/configuration#hd-wallet-config",
  ],
  [
    "/hardhat-runner/plugins/nomicfoundation-hardhat-ethers#library-linking",
    "/docs/plugins/hardhat-ethers#library-linking",
  ],
  // TODO
  // ["/hardhat-network-helpers/docs/reference#fixtures", ""],
  // ["/chaining-async-matchers", ""],
  // ["/console-log", ""],
  [
    "/verify-custom-networks",
    "/plugin-development/guides/integration-tests#testing-with-fixture-projects",
  ],
  ["/ignition-errors", "/ignition/docs/explanations/error-handling"],
  [
    "/report-bug",
    "https://github.com/NomicFoundation/hardhat/issues/new/choose",
  ],
] satisfies Redirects;
