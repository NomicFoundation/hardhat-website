import type { Loader } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro:schema";

import fs from "node:fs/promises";
import path from "node:path";
import { styleText } from "node:util";
import pLimit from "p-limit";

import { pluginsConfig } from "../config";
import { officialPluginsList } from "./officialPluginList";
import { getNpmPackageReadme } from "../utils/getNpmPackageReadme";

const officialPluginsCollectionSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  shortName: z.string(), // The name without @nomicfoundation/
  website: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  readmeMd: z.string(),
});

// We cache it for 3 hours. This may lead to some readmes being out synch with
// `latest` from the npm registry, but only during development and the CI, and
// not in vercel (neither production nor previews)
const MAX_MS_OFFICIAL_PLUGIN_README = 3 * 60 * 60 * 1000;

async function getCachedDownloadsIfValid(
  cachedResultPath: string,
): Promise<string | undefined> {
  try {
    const content = await fs.readFile(cachedResultPath, "utf-8");
    const json = JSON.parse(content);

    const dateStoredValueOf = json.dateStoredValueOf;
    const readmeContent = json.readmeContent;

    if (
      typeof dateStoredValueOf !== "number" ||
      typeof readmeContent !== "string"
    ) {
      return undefined;
    }

    const now = new Date().valueOf();
    const diff = now - dateStoredValueOf;

    if (diff > MAX_MS_OFFICIAL_PLUGIN_README) {
      return undefined;
    }

    return readmeContent;
  } catch {
    return undefined;
  }
}

async function saveCachedReadme(
  cachedResultPath: string,
  readmeContent: string,
) {
  const now = new Date().valueOf();

  const json = {
    dateStoredValueOf: now,
    readmeContent,
  };

  await fs.writeFile(cachedResultPath, JSON.stringify(json, null, 2), "utf-8");
}

function getOfficialPluginCachedReadmePath(officialPluginName: string) {
  const cachedResultPath = path.join(
    import.meta.dirname,
    "../../cache/",
    `${officialPluginName.replace(/[@\/\\]/g, "")}-README.json`,
  );

  return cachedResultPath;
}

async function fetchReadme(npmPackage: string): Promise<string> {
  const cachedReadmePath = getOfficialPluginCachedReadmePath(npmPackage);
  const cached = await getCachedDownloadsIfValid(cachedReadmePath);

  if (cached !== undefined) {
    console.log(
      styleText(
        ["blue", "bold"],
        `Using cached readme of official plugin ${npmPackage}`,
      ),
    );

    return cached;
  }

  console.log(
    styleText(
      ["green", "bold"],
      `Fetching readme of official plugin ${npmPackage}`,
    ),
  );

  const readme = await getNpmPackageReadme(
    npmPackage,
    pluginsConfig.officialPluginsNpmTag,
  );

  // Remove the H1 because Starlight already renders it
  const readmeWithoutH1 = readme.replace(/^\s*#\s*.*$/m, "");

  await saveCachedReadme(cachedReadmePath, readmeWithoutH1);

  return readmeWithoutH1;
}

export function officialPluginsLoader(): Loader {
  return {
    name: "official-plugins-loader",
    async load({ renderMarkdown, store }) {
      const limit = pLimit(3);

      const resolvedPlugins = await Promise.all(
        officialPluginsList.map(async (plugin) => {
          const name = plugin.npmPackage;
          const shortName = name.replace(/^@nomicfoundation\//, "");
          const slug = plugin.slug;
          const readme = await limit(() => fetchReadme(plugin.npmPackage));

          return {
            id: slug,
            slug,
            name,
            shortName,
            website:
              plugin.linkToItsOwnWebsiteSection ?? `/docs/plugins/${slug}`,
            description: plugin.description,
            tags: plugin.tags,
            markdown: readme,
          };
        }),
      );

      for (const entry of resolvedPlugins) {
        store.set({
          id: entry.id,
          data: entry,
          rendered: await renderMarkdown(entry.markdown),
        });
      }
    },
  };
}

export const officialPlugins = defineCollection({
  loader: officialPluginsLoader(),
  schema: officialPluginsCollectionSchema,
});
