import { defineCollection } from "astro:content";
import { z } from "astro:schema";

import { styleText } from "node:util";
import path from "node:path";
import fs from "node:fs/promises";
import { slug as generateSlug } from "github-slugger";

import communityPluginsJson from "./community-plugins.json";

const communityPluginsJsonSchema = z.object({
  plugins: z.array(
    z.object({
      name: z.string(),
      website: z.string().optional(),
      npmPackage: z.string().optional(),
      author: z.string(),
      authorUrl: z.string(),
      description: z.string(),
      tags: z.array(z.string()),
    }),
  ),
});

const communityPluginsCollectionSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  website: z.string(),
  author: z.string(),
  authorUrl: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  downloads: z.number(),
});

const MAX_MS_NPM_DOWNLOADS_CACHE = 24 * 60 * 60 * 1000;

async function getCachedDownloadsIfValid(
  cachedResultPath: string,
): Promise<number | undefined> {
  try {
    const content = await fs.readFile(cachedResultPath, "utf-8");
    const json = JSON.parse(content);

    const dateStoredValueOf = json.dateStoredValueOf;
    const downloads = json.downloads;

    if (
      typeof dateStoredValueOf !== "number" ||
      typeof downloads !== "number"
    ) {
      return undefined;
    }

    const now = new Date().valueOf();
    const diff = now - dateStoredValueOf;

    if (diff > MAX_MS_NPM_DOWNLOADS_CACHE) {
      return undefined;
    }

    return downloads;
  } catch {
    return undefined;
  }
}

async function saveCachedDownalods(
  cachedResultPath: string,
  downloads: number,
) {
  const now = new Date().valueOf();

  const json = {
    dateStoredValueOf: now,
    downloads,
  };

  fs.writeFile(cachedResultPath, JSON.stringify(json, null, 2), "utf-8");
}

function getPluginDownloadsCachedPath(pluginName: string) {
  const cachedResultPath = path.join(
    import.meta.dirname,
    "../../cache/",
    `${pluginName.replace(/[@\/\\]/g, "")}.json`,
  );

  return cachedResultPath;
}

async function getLastMonthDownloads(pluginName: string) {
  const cachedResultPath = getPluginDownloadsCachedPath(pluginName);
  const cached = await getCachedDownloadsIfValid(cachedResultPath);

  if (cached !== undefined) {
    console.log(
      styleText(
        ["cyan", "bold"],
        `Using cached downloads of community plugin ${pluginName}`,
      ),
    );
    return cached;
  }

  console.log(
    styleText(
      ["magenta", "bold"],
      `Fetching downloads of community plugin ${pluginName}`,
    ),
  );

  const endpoint = `https://api.npmjs.org/downloads/point/last-month/${pluginName}`;
  const res = await fetch(endpoint);

  if (res.status === 404) {
    return 0;
  }

  if (res.status === 429) {
    const retryAfter = res.headers.get("retry-after");

    console.error(
      `Too many requests when hitting ${endpoint}. retry-after: ${retryAfter}`,
    );
  }

  if (!res.ok) {
    throw new Error(
      `Error fetching npm downloads of plugin ${pluginName} — ${res.statusText}`,
    );
  }

  const json = (await res.json()) as { downloads: number };

  const downloads = json.downloads;

  await saveCachedDownalods(cachedResultPath, downloads);

  return downloads;
}

export const communityPlugins = defineCollection({
  loader: async () => {
    const pluginsFile = communityPluginsJsonSchema.parse(communityPluginsJson);

    const resolvedPlugins = [];
    for (const plugin of pluginsFile.plugins) {
      const npmPackage = plugin.npmPackage ?? plugin.name;

      resolvedPlugins.push({
        id: plugin.name,
        slug: generateSlug(plugin.name.replace(/@\//, "")),
        name: plugin.name,
        npmPackage,
        website:
          plugin.website ??
          `https://www.npmjs.com/package/${plugin.npmPackage ?? plugin.name}`,
        author: plugin.author,
        authorUrl: plugin.authorUrl,
        description: plugin.description,
        tags: plugin.tags,
        downloads: await getLastMonthDownloads(
          plugin.npmPackage ?? plugin.name,
        ),
      });
    }

    const sortedPlugins = resolvedPlugins.sort(
      (a, b) => b.downloads - a.downloads,
    );

    return sortedPlugins;
  },
  schema: communityPluginsCollectionSchema,
});
