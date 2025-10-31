import { defineCollection } from "astro:content";
import { z } from "astro:schema";

const blogpostsCollectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  excerpt: z.string(),
  url: z.string(),
  feature_image: z.string().optional(),
});

export const blogposts = defineCollection({
  loader: async () => {
    const API_KEY = import.meta.env.GHOST_CMS_API_KEY;
    const CONTENT_URL = import.meta.env.GHOST_CMS_CONTENT_URL;

    if (!API_KEY || !CONTENT_URL) {
      console.log(`
Blogposts not fetched, returning empty posts
Make sure to define the GHOST_CMS_API_KEY and GHOST_CMS_CONTENT_URL env vars
`);
      return [];
    }

    const baseUrl = CONTENT_URL.endsWith("/")
      ? CONTENT_URL.slice(0, -1)
      : CONTENT_URL;
    const endpoint = `${baseUrl}/ghost/api/content/posts?key=${API_KEY}&filter=tag:[hardhat,hardhat-ignition]`;

    console.log("Fetching from Ghost CMS post from endpoint:", baseUrl);

    const response = await fetch(endpoint);

    if (!response.ok) {
      console.error(
        `Ghost CMS API error: ${response.status} ${response.statusText}`,
      );
      const text = await response.text();
      console.error("Response body:", text);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const json = await response.json();

    return z.array(blogpostsCollectionSchema).parse(json.posts).slice(0, 3);
  },
  schema: blogpostsCollectionSchema,
});
