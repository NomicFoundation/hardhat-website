// This list of plugins is automatically sorted by the numbers of downloads
// that the plugin got on npm in the last 30 days. Please add yourself to the
// bottom of the list.
//
// If your plugin's `name` is not it's package name, you can add an optional
// `npmPackage` field.
import { IPlugin } from "../../../model/types";

const communityPlugins: IPlugin[] = [];

const officialPlugins: IPlugin[] = [
  {
    name: "@nomicfoundation/hardhat-toolbox",
    author: "Nomic Foundation",
    authorUrl: "https://twitter.com/NomicFoundation",
    description:
      "Nomic Foundation's recommended bundle of Hardhat plugins (ethers based)",
    tags: ["Hardhat", "Setup", "Ethers.js"],
  },
  {
    name: "@nomicfoundation/hardhat-toolbox-viem",
    author: "Nomic Foundation",
    authorUrl: "https://twitter.com/NomicFoundation",
    description:
      "Nomic Foundation's recommended bundle of Hardhat plugins (viem based)",
    tags: ["Hardhat", "Setup", "viem"],
  },
  {
    name: "@nomicfoundation/hardhat-chai-matchers",
    author: "Nomic Foundation",
    authorUrl: "https://twitter.com/NomicFoundation",
    description: "Adds Ethereum-related matchers to Chai",
    tags: ["Chai", "Testing"],
  },
  {
    name: "@nomicfoundation/hardhat-ethers",
    author: "Nomic Foundation",
    authorUrl: "https://twitter.com/NomicFoundation",
    description: "Injects ethers.js into the Hardhat Runtime Environment",
    tags: ["Ethers.js", "Testing", "Tasks", "Scripts"],
  },
  {
    name: "@nomicfoundation/hardhat-viem",
    author: "Nomic Foundation",
    authorUrl: "https://twitter.com/NomicFoundation",
    description: "Makes it easier to use viem in a Hardhat project",
    tags: ["viem", "Testing", "Tasks", "Scripts"],
  },
  {
    name: "@nomicfoundation/hardhat-verify",
    author: "Nomic Foundation",
    authorUrl: "https://twitter.com/NomicFoundation",
    description: "Automatically verify contracts",
    tags: ["Etherscan", "Verification"],
  },
  {
    name: "@nomicfoundation/hardhat-foundry",
    author: "Nomic Foundation",
    authorUrl: "https://twitter.com/NomicFoundation",
    description:
      "Makes it easier to use Hardhat and Foundry in the same project",
    tags: ["Foundry"],
  },
  {
    name: "@nomicfoundation/hardhat-ledger",
    author: "Nomic Foundation",
    authorUrl: "https://twitter.com/NomicFoundation",
    description: "Hardhat plugin for the Ledger hardware wallet",
    tags: ["Ledger", "Wallet"],
  },
  {
    name: "@nomiclabs/hardhat-vyper",
    author: "Nomic Foundation",
    authorUrl: "https://twitter.com/NomicFoundation",
    description: "Adds support to compile Vyper smart contracts",
    tags: ["Vyper", "Compiler"],
  },
  {
    name: "@nomiclabs/hardhat-solhint",
    author: "Nomic Foundation",
    authorUrl: "https://twitter.com/NomicFoundation",
    description: "Easily run solhint to lint your Solidity code",
    tags: ["Solhint", "Linter"],
  },
  {
    name: "@nomiclabs/hardhat-solpp",
    author: "Nomic Foundation",
    authorUrl: "https://twitter.com/NomicFoundation",
    description:
      "Automatically run the solpp preprocessor before each compilation",
    tags: ["Solpp", "Preprocessor"],
  },
  {
    name: "@nomiclabs/hardhat-waffle",
    author: "Nomic Foundation",
    authorUrl: "https://twitter.com/NomicFoundation",
    description:
      "Adds a Waffle-compatible provider to the Hardhat Runtime Environment and automatically initializes the Waffle Chai matchers",
    tags: ["Waffle", "Testing"],
  },
  {
    name: "@nomiclabs/hardhat-web3",
    author: "Nomic Foundation",
    authorUrl: "https://twitter.com/NomicFoundation",
    description: "Injects Web3 1.x into the Hardhat Runtime Environment",
    tags: ["Web3.js", "Testing", "Tasks", "Scripts"],
  },
  {
    name: "@nomicfoundation/hardhat-web3-v4",
    author: "ChainSafe and Nomic Foundation",
    npmPackage: "@nomicfoundation/hardhat-web3-v4",
    authorUrl: "https://twitter.com/ChainSafeth",
    description: "Injects Web3 4.x into the Hardhat Runtime Environment",
    tags: ["Web3.js", "Testing", "Tasks", "Scripts"],
  },
  {
    name: "@nomiclabs/hardhat-truffle5",
    author: "Nomic Foundation",
    authorUrl: "https://twitter.com/NomicFoundation",
    description: "Integration with TruffleContract from Truffle 5",
    tags: ["Truffle", "Testing"],
  },
  {
    name: "@nomiclabs/hardhat-web3-legacy",
    author: "Nomic Foundation",
    authorUrl: "https://twitter.com/NomicFoundation",
    description: "Injects Web3 0.20.x into the Hardhat Runtime Environment",
    tags: ["Web3.js", "Legacy", "Testing", "Tasks", "Scripts"],
  },
  {
    name: "@nomiclabs/hardhat-truffle4",
    author: "Nomic Foundation",
    authorUrl: "https://twitter.com/NomicFoundation",
    description: "Integration with TruffleContract from Truffle 4",
    tags: ["Truffle", "Testing"],
  },
  // Don't add community plugins here. They should be placed in the other array.
];

const plugins = {
  communityPlugins,
  officialPlugins,
};

export default plugins;
