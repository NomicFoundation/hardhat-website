import type { AstroConfig } from "astro";

const HHVSCODE_MARKETPLACE_URL =
  "https://marketplace.visualstudio.com/items?itemName=NomicFoundation.hardhat-solidity";

export default {
  "/hardhat-vscode": {
    status: 302,
    destination: HHVSCODE_MARKETPLACE_URL,
  },
  "/hardhat-vscode/docs": {
    status: 302,
    destination: HHVSCODE_MARKETPLACE_URL,
  },
  "/hardhat-vscode/docs/overview": {
    status: 302,
    destination: HHVSCODE_MARKETPLACE_URL,
  },
  "/hardhat-vscode/docs/hardhat-projects": {
    status: 302,
    destination: HHVSCODE_MARKETPLACE_URL,
  },
  "/hardhat-vscode/docs/formatting": {
    status: 302,
    destination: HHVSCODE_MARKETPLACE_URL,
  },
  "/hardhat-network-helpers": {
    status: 302,
    destination: "/docs/plugins/hardhat-network-helpers",
  },
  "/hardhat-network-helpers/docs": {
    status: 302,
    destination: "/docs/plugins/hardhat-network-helpers",
  },
  "/hardhat-network-helpers/docs/overview": {
    status: 302,
    destination: "/docs/plugins/hardhat-network-helpers",
  },
  "/hardhat-network-helpers/docs/reference": {
    status: 302,
    destination: "/docs/plugins/hardhat-network-helpers#reference",
  },
} satisfies AstroConfig["redirects"];
