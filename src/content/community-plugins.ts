import { defineCollection } from "astro:content";
import { z } from "astro:schema";

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
  name: z.string(),
  website: z.string(),
  author: z.string(),
  authorUrl: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  downloads: z.number(),
});

async function getLastMonthDownloads(pluginName: string) {
  const endpoint = `https://api.npmjs.org/downloads/point/last-month/${pluginName}`;
  const res = await fetch(endpoint);

  if (res.status === 404) {
    return 0;
  }

  if (!res.ok) {
    throw new Error(
      `Error fetching npm downloads of plugin ${pluginName} — ${res.statusText}`,
    );
  }

  const json = (await res.json()) as { downloads: number };

  return json.downloads;
}

export const communityPlugins = defineCollection({
  loader: async () => {
    const pluginsFile = communityPluginsJsonSchema.parse(communityPluginsJson);

    const resolvedPlugins = await Promise.all(
      pluginsFile.plugins.map(async (plugin) => ({
        id: plugin.name,
        name: plugin.name,
        npmPackage: plugin.npmPackage ?? plugin.name,
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
      })),
    );

    const sortedPlugins = resolvedPlugins.sort(
      (a, b) => b.downloads - a.downloads,
    );

    return sortedPlugins;
  },
  schema: communityPluginsCollectionSchema,
});
