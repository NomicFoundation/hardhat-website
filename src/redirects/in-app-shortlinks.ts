import type { Redirects } from "./types";

export default [
  // TODO: These should be replaced by shortlinks in the app
  // [
  //   "/hardhat-runner/docs/config#hd-wallet-config",
  //   "/docs/reference/configuration#hd-wallet-config",
  // ],
  // [
  //   "/hardhat-runner/plugins/nomicfoundation-hardhat-ethers#library-linking",
  //   "/docs/plugins/hardhat-ethers#library-linking",
  // ],
  // TODO: They don't have a matching page yet
  // ["/hardhat-network-helpers/docs/reference#fixtures", ""],
  // ["/chaining-async-matchers", ""],
  ["/console-log", "/docs/reference/console-log"],
  [
    "/verify-custom-networks",
    "/docs/guides/smart-contract-verification#verifying-on-a-block-explorer-of-a-different-network",
  ],
  ["/ignition-errors", "/ignition/docs/explanations/error-handling"],
  [
    "/report-bug",
    "https://github.com/NomicFoundation/hardhat/issues/new/choose",
  ],
] satisfies Redirects;
