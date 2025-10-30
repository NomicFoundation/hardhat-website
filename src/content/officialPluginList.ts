import { slug as generateSlug } from "github-slugger";

export interface OfficialPlugin {
  slug: string;
  npmPackage: string;
  description: string;
  tags: string[];

  /**
   * This field should only be used for plugins that have their dedicated
   * section in the website.
   *
   * An example of this is `@nomicfoundation/hardhat-network-helpers`
   *
   * If this field is present, the link in the plugin list will point to the
   * plugin's own website section. Othwerwise, it's README will be used to
   * render the section `/docs/plugins/[sluged-npm-package-name]`.
   */
  linkToItsOwnWebsiteSection?: string;
}

export const officialPluginsList: OfficialPlugin[] = [
  {
    npmPackage: "@nomicfoundation/hardhat-toolbox-viem",
    description:
      "Nomic Foundation's recommended bundle of Hardhat plugins (viem based)",
    tags: ["Hardhat setup", "template", "viem"],
  },
  {
    npmPackage: "@nomicfoundation/hardhat-toolbox-mocha-ethers",
    description:
      "Nomic Foundation's recommended bundle of Hardhat plugins (ethers based)",
    tags: ["Hardhat setup", "template", "Ethers.js"],
  },
  {
    npmPackage: "@nomicfoundation/hardhat-keystore",
    description:
      "This plugin adds an encrypted keystore to Hardhat, to handle secret values (e.g. API keys and private keys) in your config securely.",
    tags: ["Secrets", "Keystore", "Key management"],
  },
  {
    npmPackage: "@nomicfoundation/hardhat-verify",
    description: "Automatically verify contracts",
    tags: ["Verification", "Etherscan", "Blockscout"],
  },
  {
    npmPackage: "@nomicfoundation/hardhat-network-helpers",
    description:
      "A plugin that provides a set of utility functions to interact with locally simulated networks.",
    tags: ["Network", "Simulation", "Helpers", "Testing"],
  },
  {
    npmPackage: "@nomicfoundation/hardhat-viem",
    description: "Integrates viem into a Hardhat project",
    tags: ["viem", "Testing", "Tasks", "Scripts"],
  },
  {
    npmPackage: "@nomicfoundation/hardhat-viem-assertions",
    description: "Adds a set of viem-based testing assertions to Hardhat",
    tags: ["viem", "Testing", "Assertions"],
  },
  {
    npmPackage: "@nomicfoundation/hardhat-ethers",
    description: "Integrates Ethers.js into a Hardhat project",
    tags: ["Ethers.js", "Testing", "Tasks", "Scripts"],
  },
  {
    npmPackage: "@nomicfoundation/hardhat-ethers-chai-matchers",
    description: "Adds a set of ethers-based matchers to chai",
    tags: ["Ethers.js", "chai", "Testing", "Assertions"],
  },
  {
    npmPackage: "@nomicfoundation/hardhat-typechain",
    description: "Generates TypeChain bindings for smart contracts",
    tags: ["TypeChain", "TypeScript", "Bindings", "Contracts"],
  },
  {
    npmPackage: "@nomicfoundation/hardhat-ignition",
    description: "Hardhat's official deployment solution",
    tags: ["Ignition", "Deployment"],
  },
  {
    npmPackage: "@nomicfoundation/hardhat-ignition-viem",
    description: "Adds support for viem to Hardhat Ignition",
    tags: ["Ignition", "viem", "Deployment", "Testing"],
  },
  {
    npmPackage: "@nomicfoundation/hardhat-ignition-ethers",
    description: "Adds support for Ethers.js to Hardhat Ignition",
    tags: ["Ignition", "Ethers.js", "Deployment", "Testing"],
  },
  {
    npmPackage: "@nomicfoundation/hardhat-mocha",
    description: "Integrates Mocha into a Hardhat project",
    tags: ["Mocha", "Testing", "Test runner"],
  },
  {
    npmPackage: "@nomicfoundation/hardhat-node-test-runner",
    description:
      "Integrates Node.js' builtin test runner into a Hardhat project",
    tags: ["Node.js test runner", "node:test", "Test runner"],
  },
].map((p) => ({
  ...p,
  slug: generateSlug(p.npmPackage.replace(/^@nomicfoundation\//, "")),
}));
