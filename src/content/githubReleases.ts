import { defineCollection } from "astro:content";
import { z } from "astro:schema";

const githubRelaseApiSchema = z.object({
  id: z.number(),
  name: z.string().nullable(),
  tag_name: z.string(),
  body: z.string().nullable(),
  draft: z.boolean(),
  prerelease: z.boolean(),
  published_at: z.string().nullable(),
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
      import.meta.env.FORCE_GITHUB_RELEASES === undefined
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

    return (
      releases
        .filter((release) => !release.draft && !release.prerelease)
        // We only show Hardhat 3 (core) releases in the landing, so we filter
        // by tag_name, assuming that our release process is consistent with
        // the `hardhat@3.x.y` format.
        .filter((release) => release.tag_name.startsWith("hardhat@3."))
        .slice(0, 3)
        .map((release) => {
          // We use the name if any, otherwise "hardhat x.y.z", based on the
          // tag_name.
          const name =
            release.name != null && release.name !== ""
              ? release.name
              : release.tag_name.replace("@", " ");

          // We only keep the body until the first ### subtitle.
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
        })
    );
  },
  schema: githubReleaseCollectionSchema,
});
