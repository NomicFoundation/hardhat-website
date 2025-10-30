import type { Loader } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro:schema";

import { pluginsConfig } from "../config";
import { officialPluginsList } from "./officialPluginList";

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

async function fetchReadme(npmPackage: string): Promise<string> {
  const readmeUrl = `https://unpkg.com/${npmPackage}@${pluginsConfig.officialPluginsNpmTag}/README.md`;

  const res = await fetch(readmeUrl, { redirect: "follow" });

  if (!res.ok) {
    throw new Error(
      `Error fetching readme for ${npmPackage} — ${res.statusText}`,
    );
  }

  const readme = await res.text();

  // Remove the H1 because Starlight already renders it
  const readmeWithoutH1 = readme.replace(/^\s*#\s*.*$/m, "");

  return readmeWithoutH1;
}

export function officialPluginsLoader(): Loader {
  return {
    name: "official-plugins-loader",
    async load({ renderMarkdown, store }) {
      const resolvedPlugins = await Promise.all(
        officialPluginsList.map(async (plugin) => {
          const name = plugin.npmPackage;
          const shortName = name.replace(/^@nomicfoundation\//, "");
          const slug = plugin.slug;
          const readme = await fetchReadme(plugin.npmPackage);

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
