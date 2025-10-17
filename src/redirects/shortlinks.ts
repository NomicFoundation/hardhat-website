import type { AstroConfig } from "astro";

const redirects: Record<string, { status: 302; destination: string }> = {
  "/plugin-authors-group": {
    status: 302,
    destination: "https://t.me/+cFxwO53KTrY5MjYx",
  },
  "/docs": { status: 302, destination: "/docs/getting-started" },
  "/ignition": { status: 302, destination: "/ignition/docs" },
  "/hardhat-network-helpers": {
    status: 302,
    destination: "/hardhat-network-helpers/docs",
  },
  "/hardhat-vscode": { status: 302, destination: "/hardhat-vscode/docs" },
};

export default redirects satisfies AstroConfig["redirects"];
