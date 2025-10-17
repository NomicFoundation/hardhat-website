import path from "path";
import fs from "fs";
import {
  plugins,
  COMMUNITY_PLUGIN_DOWNLOADS_FILE,
} from "../src/content/plugins/plugins";
import type { IPlugin } from "../src/model/types";

const NPM_TAG = `latest`;

const PLUGINS_FOLDER = path.join(__dirname, "../src/content/plugins");

async function fetchReadme(
  plugin: Required<IPlugin>
): Promise<string | undefined> {
  console.log(`Downloading readme for ${plugin.npmPackage}`);
  const readmeUrl = `https://unpkg.com/${plugin.npmPackage}@${NPM_TAG}/README.md`;
  console.log(`  ${readmeUrl}`);

  const res = await fetch(readmeUrl, { redirect: "follow" });

  if (!res.ok) {
    console.log(`  Failed to download readme: status code (${res.status})`);
    return undefined;
  }

  const readme = await res.text();

  return readme;
}

async function saveReadme(slug: string, readme: string) {
  const readmeFileName = path.join(PLUGINS_FOLDER, `${slug}.md`);

  fs.writeFileSync(readmeFileName, readme, "utf-8");
}

async function downloadAllReadmes(officialPlugins: Required<IPlugin>[]) {
  console.log("Downloading official plugins readmes...");

  for (const plugin of officialPlugins) {
    const readme = await fetchReadme(plugin);
    if (readme) {
      await saveReadme(plugin.slug, readme);
    }
  }
}

async function fetchDownloadsCount(plugin: Required<IPlugin>) {
  const res = await fetch(
    `https://api.npmjs.org/downloads/point/last-month/${plugin.npmPackage}`
  );

  if (res.status === 404) {
    return 0;
  }

  const json = (await res.json()) as { downloads: number };

  return json.downloads;
}

async function getDownloadsCount(communityPlugins: Required<IPlugin>[]) {
  console.log("Fetching community plugin downloads...");
  const downloads: Record<string, number> = {};
  for (const plugin of communityPlugins) {
    console.log(`Fetching downloads for ${plugin.npmPackage}`);
    const count = await fetchDownloadsCount(plugin);
    downloads[plugin.npmPackage] = count;
  }

  return downloads;
}

async function saveDownloadsCount(downloads: Record<string, number>) {
  const downloadsJson = JSON.stringify(downloads, undefined, 2);
  fs.writeFileSync(COMMUNITY_PLUGIN_DOWNLOADS_FILE, downloadsJson, "utf-8");
}

async function main() {
  try {
    const downloads = await getDownloadsCount(plugins.communityPlugins);
    await saveDownloadsCount(downloads);
  } catch (e) {
    console.error("Error downloading community plugins downloads count");
    console.error(e);
  }

  try {
    await downloadAllReadmes(plugins.officialPlugins);
  } catch (e) {
    console.error("Error downloading official plugins readmes");
    console.error(e);
  }

  console.log();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
