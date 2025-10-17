# This folder is for redirects

They are organized in different files, by category. In this order of priority:

1. Manually created short links
2. Error code redirects
3. Redirects from the old Hardhat 3 Next.js site to the new Starlight one (for URLs that changed during the migration)
4. Redirects to the Hardhat 2 site for things that are no longer present in the Hardhat 3 site

## Astro vs Vercel redirects

Astro redirects are more limited, redirecting fixed URLs, and case insensitive. For more complex/general redirects, we need to use `vercel.json`'s redirects. We should keep those to the minimum, and only use them for redirects that are not covered by the `redirects` field in the Astro config.
