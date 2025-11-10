import type { Redirects } from "./types";

// These are shortlinks that we create to share either in the website, events,
// or other communication channels.

// If you are creating a shortlink to include it in hardhat itself or a plugin,
// use the in-app-shortlinks.ts file instead, as those need to be preserved
// because older versions of HH should still work.

export default [
  ["config", "/docs/reference/configuration"],
  ["configuration", "/docs/reference/configuration"],
  ["errors", "/docs/reference/errors"],
  ["/hardhat3-beta-telegram-group", "https://t.me/+nx5My-pzR0piMjU5"],
  ["/plugin-authors-group", "https://t.me/+cFxwO53KTrY5MjYx"],
  ["/discord", "https://discord.gg/TETZs2KK4k"],
  ["/ignition-discord", "https://discord.gg/7jBkZQXB25"],
  ["/plugins", "/docs/plugins"],
  ["/docs", "/docs/getting-started"],
  ["/ignition", "/ignition/docs"],
  ["/ignition/docs", "/ignition/docs/getting-started"],
] satisfies Redirects;
