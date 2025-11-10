import type { Redirects } from "./types";

export default [
  ["/privacy-policy.html", "/static/privacy-policy.html"],
  [
    "/docs/guides/configuring-the-compiler",
    "/docs/guides/writing-contracts/configuring-the-compiler",
  ],
  ["/docs/guides/deploying-contracts", "/docs/guides/deployment"],
  ["/docs/guides/using-viem", "/docs/guides/testing/using-viem"],
  [
    "/docs/guides/writing-solidity-tests",
    "/docs/guides/testing/using-solidity",
  ],
  ["/docs/guides/gas-statistics", "/docs/guides/testing/gas-statistics"],
  ["/docs/guides/cookbook", "/docs/cookbook"],
  ["/plugins", "/plugins/official-plugins"],
] satisfies Redirects;
