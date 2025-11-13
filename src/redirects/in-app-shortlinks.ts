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
  [
    "/libraries-with-undetectable-addresses",
    "/docs/plugins/hardhat-verify" //#libraries-with-undetectable-addresses TODO: missing section
  ],
  [
    "/verifying-on-sourcify",
    "/docs/plugins/hardhat-verify" //#verifying-on-sourcify TODO: missing section
  ],
  [
    "/vyper-test-directives",
    "/docs/plugins" ///hardhat-vyper#test-directives TODO missing plugin
  ],
  [
    "/chaining-async-matchers",
    "/docs/plugins/hardhat-ethers-chai-matchers" //#chaining-async-matchers TODO: missing section
  ],
  [
    "/hardhat-network-helpers-fixtures",
    "/docs/plugins/hardhat-network-helpers" //#fixtures TODO: missing section
  ],
  [
    "/ethers-library-linking",
    "/docs/plugins/hardhat-ethers#library-linking"
  ],
  [
    "/hd-wallet-config",
    "/docs/reference/configuration#hd-wallet-config"
  ],
  [
    "/getting-started",
    "/docs/getting-started"
  ]
] satisfies Redirects;
