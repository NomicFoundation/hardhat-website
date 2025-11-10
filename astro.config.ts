import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightSidebarTopics from "starlight-sidebar-topics";
import starlightLinksValidator from "starlight-links-validator";
import partytown from "@astrojs/partytown";
import vercel from "@astrojs/vercel";
import { setGlobalDispatcher, Agent } from "undici";
import { unwatchFile, watchFile } from "node:fs";
import { glob, utimes } from "node:fs/promises";

import { globalConfig } from "./src/config";
import redirects from "./src/redirects";
import { officialPluginsList } from "./src/content/officialPluginList";
import path from "node:path";

// We set this up to prefer IPv4 connections to IPv6 connections
// as otherwise the Vercel deployments were failing when trying to access
// the Ghost API
setGlobalDispatcher(new Agent({ connect: { family: 4 } }));

export default defineConfig({
  site: globalConfig.url + "/",
  adapter: vercel({}),
  integrations: [
    starlight({
      title: "Hardhat 3",
      favicon: "/favicon.ico",
      disable404Route: true,
      logo: {
        light: "./src/assets/hardhat-logo-light.svg",
        dark: "./src/assets/hardhat-logo-dark.svg",
        replacesTitle: true,
      },
      editLink: {
        baseUrl:
          "https://github.com/NomicFoundation/hardhat-website/edit/main/",
      },
      head: [
        {
          tag: "meta",
          attrs: {
            property: "og:image",
            content: globalConfig.url + "/thumbnail.png",
          },
        },
      ],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/NomicFoundation/hardhat",
        },
        {
          icon: "x.com",
          label: "X",
          href: "https://x.com/HardhatHQ",
        },
        {
          icon: "discord",
          label: "Discord",
          href: "https://hardhat.org/discord",
        },
      ],
      plugins: [
        // While we use this multi-sidebar plugin, each item of the array of
        // sidebars is configured like a normal Starlight sidebar.
        // See: https://starlight.astro.build/guides/sidebar/
        starlightSidebarTopics(
          [
            {
              label: "Hardhat 3",
              id: "hardhat",
              link: "/docs/getting-started/",
              items: [
                {
                  slug: "docs/getting-started",
                },
                {
                  label: "Hardhat 3",
                  autogenerate: {
                    directory: "docs/hardhat3",
                  },
                },
                {
                  label: "Tutorial",
                  collapsed: true,
                  autogenerate: {
                    directory: "docs/tutorial",
                  },
                },
                {
                  label: "Guides",
                  items: [
                    {
                      label: "Writing Smart contracts",
                      collapsed: true,
                      autogenerate: {
                        directory: "docs/guides/writing-contracts",
                      },
                    },
                    {
                      label: "Testing Smart contracts",
                      collapsed: true,
                      autogenerate: {
                        directory: "docs/guides/testing",
                      },
                    },
                    {
                      label: "Deploying Smart contracts",
                      collapsed: true,
                      autogenerate: {
                        directory: "docs/guides/deployment",
                      },
                    },
                    { slug: "docs/guides/smart-contract-verification" },
                    { slug: "docs/guides/configuration-variables" },
                    { slug: "docs/guides/writing-tasks" },
                    { slug: "docs/guides/writing-scripts" },
                    { slug: "docs/guides/forking" },
                    // { slug: "docs/guides/hardhat-node" },
                    // { slug: "docs/guides/hardhat-console" },
                    // { slug: "docs/guides/command-line-completion" },
                    { slug: "docs/guides/getting-help" },
                  ],
                },
                {
                  label: "Cookbook",
                  collapsed: true,
                  autogenerate: {
                    directory: "docs/cookbook",
                  },
                },
                {
                  label: "Reference",
                  collapsed: true,
                  autogenerate: {
                    directory: "docs/reference",
                  },
                },
                {
                  label: "Explanations",
                  collapsed: true,
                  autogenerate: {
                    directory: "docs/explanations",
                  },
                },
                {
                  // /docs/plugins is a custom page, not generated by Starlight
                  // don't use slug here
                  label: "Plugins",
                  items: [
                    {
                      label: "Official plugins",
                      // This is a hack because:
                      //  1. If we use #official-plugins we take the user to
                      //     below the pagefold, missing some content.
                      //  2. If we don't add any #hash this item will be
                      //     highlighted, even when community plugins is clicked
                      link: "/docs/plugins#_top",
                    },
                    {
                      label: "Community plugins",
                      link: "/docs/plugins#community-plugins",
                    },
                    {
                      label: "Plugin development docs",
                      // We have to use the full URL here because this is
                      // treated as a link to a different sidebar topic
                      link: "https://hardhat.org/docs/plugin-development",
                    },
                  ],
                },
                { slug: "hardhat2" },
              ],
            },
            {
              label: "Hardhat Ignition",
              id: "ignition",
              link: "/ignition/docs",
              items: [
                { slug: "ignition/docs/getting-started" },
                {
                  label: "Guides",
                  autogenerate: {
                    directory: "ignition/docs/guides",
                  },
                },
                {
                  label: "Reference",
                  autogenerate: {
                    directory: "ignition/docs/reference",
                  },
                },
                {
                  label: "Explanations",
                  autogenerate: {
                    directory: "ignition/docs/explanations",
                  },
                },
              ],
            },
            {
              label: "Migrate from Hardhat 2",
              id: "migrate-from-hardhat2",
              link: "/docs/migrate-from-hardhat2/",
              items: [
                {
                  slug: "docs/migrate-from-hardhat2",
                },
                {
                  label: "Guides",
                  autogenerate: {
                    directory: "/docs/migrate-from-hardhat2/guides",
                  },
                },
              ],
            },
            {
              label: "Plugin development",
              id: "plugin-development",
              link: "/docs/plugin-development/",
              items: [
                { slug: "docs/plugin-development" },
                {
                  label: "Tutorial",
                  autogenerate: {
                    directory: "docs/plugin-development/tutorial",
                  },
                },
                {
                  label: "Guides",
                  autogenerate: {
                    directory: "docs/plugin-development/guides",
                  },
                },
                {
                  label: "Reference",
                  autogenerate: {
                    directory: "docs/plugin-development/reference",
                  },
                },
                {
                  label: "Explanations",
                  autogenerate: {
                    directory: "docs/plugin-development/explanations",
                  },
                },
              ],
            },
          ],
          {
            topics: {
              hardhat: ["/docs/plugins", "/docs/plugins/*"],
            },
          },
        ),
        starlightLinksValidator({
          exclude: Object.keys(redirects).concat(
            officialPluginsList.map((p) => `/docs/plugins/${p.slug}`),
          ),
        }),
      ],
      customCss: ["./src/styles/custom-starlight-theme.css"],
      components: {
        Sidebar: "./src/components/starlight-overrides/Sidebar.astro",
        Header: "./src/components/starlight-overrides/Header.astro",
      },
    }),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  trailingSlash: "never",
  redirects,
  vite: {
    server: {
      watch: {
        ignored: [
          "./.vercel/**",
          "./.vscode/**",
          "./dist/**",
          "./.git/**",
          "**/node_modules/**",
        ],
      },
    },
    plugins: [
      {
        name: "custom-watcher",
        async configureServer(_server) {
          const files = await Array.fromAsync(
            glob(path.join(import.meta.dirname, "src", "**", "*.{json,ts,js}")),
          );

          for (const file of files) {
            watchFile(file, { interval: 1000 }, async (curr, prev) => {
              if (curr.mtimeMs === prev.mtimeMs) {
                return;
              }

              for (const fileToRemove of files) {
                unwatchFile(fileToRemove);
              }

              console.log("File modified", file);
              const now = new Date();
              // We `touch` the config so that astro does its thing
              await utimes(import.meta.filename, now, now);
            });
          }
        },
      },
    ],
  },
});
