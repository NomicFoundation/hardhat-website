import type { AstroConfig } from "astro";

const redirects: Record<string, { status: 302; destination: string }> = {
  "/plugin-authors-group": {
    status: 302,
    destination: "https://t.me/+cFxwO53KTrY5MjYx",
  },
  "/discord": { status: 302, destination: "https://discord.gg/TETZs2KK4k" },
  "/ignition-discord": {
    status: 302,
    destination: "https://discord.gg/7jBkZQXB25",
  },
  "/plugins": { status: 302, destination: "/docs/plugins" },
  "/docs": { status: 302, destination: "/docs/getting-started" },
  "/ignition": { status: 302, destination: "/ignition/docs" },
  "/ignition/docs": {
    status: 302,
    destination: "/ignition/docs/getting-started",
  },
  "/reportbug": {
    status: 302,
    destination: "https://github.com/NomicFoundation/hardhat/issues/new",
  },
  "/report-bug": {
    status: 302,
    destination: "https://github.com/NomicFoundation/hardhat/issues/new",
  },
};

export default redirects satisfies AstroConfig["redirects"];
