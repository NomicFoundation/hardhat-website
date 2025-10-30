import type { AstroConfig } from "astro";

export default {
  "/hardhat-chai-matchers": {
    status: 302,
    destination: "/docs/plugins/nomicfoundationhardhat-ethers-chai-matchers",
  },
  "/hardhat-chai-matchers/docs": {
    status: 302,
    destination: "/docs/plugins/nomicfoundationhardhat-ethers-chai-matchers",
  },
  "/hardhat-chai-matchers/docs/overview": {
    status: 302,
    destination: "/docs/plugins/nomicfoundationhardhat-ethers-chai-matchers",
  },
  "/hardhat-chai-matchers/docs/reference": {
    status: 302,
    destination:
      "/docs/plugins/nomicfoundationhardhat-ethers-chai-matchers#reference",
  },
  "/hardhat-chai-matchers/docs/migrate-from-waffle": {
    status: 302,
    destination:
      "https://v2.hardhat.org/hardhat-chai-matchers/docs/migrate-from-waffle",
  },
} satisfies AstroConfig["redirects"];
