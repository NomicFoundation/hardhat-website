// This list of plugins is automatically sorted by the numbers of downloads
// that the plugin got on npm in the last 30 days. Please add yourself to the
// bottom of the list.
//
// If your plugin's `name` is not it's package name, you can add an optional
// `npmPackage` field.
import fs from "fs";
import path from "path";

export const COMMUNITY_PLUGIN_DOWNLOADS_FILE = path.join(
  __dirname,
  "../../../temp/community-plugins-downloads.json"
);

export interface IPlugin {
  name: string;
  npmPackage?: string;
  author: string;
  authorUrl: string;
  description: string;
  tags: string[];
  slug?: string;
}

const communityPlugins: IPlugin[] = [];

const officialPlugins: IPlugin[] = [
  {
    name: "@nomicfoundation/hardhat-toolbox-viem",
    author: "Nomic Foundation",
    authorUrl: "https://twitter.com/NomicFoundation",
    description:
      "Nomic Foundation's recommended bundle of Hardhat plugins (viem based)",
    tags: ["Hardhat", "Setup", "viem"],
  },
  {
    name: "@nomicfoundation/hardhat-toolbox-mocha-ethers",
    author: "Nomic Foundation",
    authorUrl: "https://twitter.com/NomicFoundation",
    description:
      "Nomic Foundation's recommended bundle of Hardhat plugins (ethers based)",
    tags: ["Hardhat", "Setup", "Ethers.js"],
  },

  // Add the rest of the plugins:
  // hardhat-viem
  // hardhat-viem-assertions

  // hardhat-ethers
  // hardhat-ethers-chai-matchers
  // hardhat-typechain

  // hardhat-ignition
  // hardhat-ignition-ethers
  // hardhat-ignition-viem

  // hardhat-keystore
  // hardhat-network-helpers
  // hardhat-verify

  // hardhat-mocha
  // hardhat-node-test-runner

  // Ledger plugin?

  // Don't add community plugins here. They should be placed in the other array.
];

const generateSlug = (pluginName: string): string =>
  pluginName.replace(/^@/, "").replace(/\//g, "-");

function normalize(plugin: IPlugin): Required<IPlugin> {
  return {
    ...plugin,
    slug: generateSlug(plugin.name),
    npmPackage: plugin.npmPackage ?? plugin.name,
  };
}

const sortCommunityPluginsByDownloads = (plugins: Required<IPlugin>[]) => {
  let downloads: Record<string, number> = {};

  try {
    const downloadsJson = fs.readFileSync(
      COMMUNITY_PLUGIN_DOWNLOADS_FILE,
      "utf-8"
    );

    downloads = JSON.parse(downloadsJson);
  } catch {
    return plugins;
  }

  return plugins.sort((p1, p2) => {
    const p1Downloads = downloads[p1.npmPackage] ?? 0;
    const p2Downloads = downloads[p2.npmPackage] ?? 0;

    return p2Downloads - p1Downloads;
  });
};

export const plugins = {
  communityPlugins: sortCommunityPluginsByDownloads(
    communityPlugins.map(normalize)
  ),
  officialPlugins: officialPlugins.map(normalize),
};
