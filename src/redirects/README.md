# This folder is for redirects

They are organized in different files, by category. In this order of priority (higher is better):

1. Redirects to the HH2 site
2. Redirects needed to keep URLs of the Next.js version of the site alive
3. Error code redirects
4. Manually created short links
5. In app shortlinks (i.e. printed by Hardhat)
6. Moved pages

## Astro vs Vercel redirects

Astro redirects are more limited, redirecting fixed URLs, and case insensitive. For more complex/general redirects, we need to use `vercel.json`'s redirects. We should keep those to the minimum, and only use them for redirects that are not covered by the `redirects` field in the Astro config.
