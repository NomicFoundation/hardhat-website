import { defineCollection } from "astro:content";
import { z } from "astro:schema";

const githubRelaseApiSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  tag_name: z.string(),
  body: z.string().optional(),
  draft: z.boolean(),
  prerelease: z.boolean(),
  published_at: z.string(),
  html_url: z.string(),
});

const githubReleaseCollectionSchema = z.object({
  id: z.string(),
  name: z.string(),
  body: z.string(),
  html_url: z.string(),
  published_at: z.string(),
});

export const githubReleases = defineCollection({
  loader: async () => {
    if (
      import.meta.env.VERCEL === undefined &&
      import.meta.env.FORCE_GITHUB_RELEASES === undefined &&
      import.meta.env.CI === undefined
    ) {
      console.warn(`
GitHub releases collection not fetched, as this isn't running on vercel nor the fetch being forced.
Rerun with the env variable FORCE_GITHUB_RELEASES=1
`);
      return [];
    }

    const endpoint =
      "https://api.github.com/repos/NomicFoundation/hardhat/releases";

    console.log("Fetching from GitHub releases endpoint:", endpoint);

    const response = await fetch(endpoint);

    if (!response.ok) {
      console.error(
        `GitHub API error: ${response.status} ${response.statusText}`,
      );
      const text = await response.text();
      console.error("Response body:", text);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    const releases = z.array(githubRelaseApiSchema).parse(data);

    return releases
      .filter((release) => !release.draft && !release.prerelease)
      .slice(0, 3)
      .map((release) => {
        const name =
          release.name != null && release.name !== ""
            ? release.name
            : release.tag_name.replace(/^.*\//, "").replace(/@([^@]*)$/, " $1");

        const body =
          release.body != null && release.body !== ""
            ? release.body.split("###")[0]?.trim()
            : "";

        return {
          ...release,
          id: `${release.id}`,
          name,
          body,
        };
      });
  },
  schema: githubReleaseCollectionSchema,
});
