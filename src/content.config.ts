import { defineCollection, z } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { githubReleases } from "./content/githubReleases";
import { blogposts } from "./content/blogposts";
import { communityPlugins } from "./content/community-plugins";
import { officialPlugins } from "./content/officialPlugins";

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        description: z.string(),
        topic: z.string().optional(),
      }),
    }),
  }),
  githubReleases: githubReleases,
  blogpostsCollection: blogposts,
  communityPlugins: communityPlugins,
  officialPlugins: officialPlugins,
};
