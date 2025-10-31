import type {
  CookiePopupConfig,
  LandingConfig,
  PluginsConfig,
} from "./configTypes";

export const landing: LandingConfig = {
  head: {
    title:
      "Hardhat | Ethereum development environment for professionals by Nomic Foundation",
    description:
      "Hardhat is an Ethereum development environment. Compile your contracts and run them on a development network. Get Solidity stack traces, console.log and more.",
    canonicalUrl: "https://hardhat.org",
  },
  banner: {
    text: "Hardhat 3 is now production ready. Migrate now",
    href: "/docs",
  },
  header: {
    logo: {
      url: "/",
      lightSrc: "/images/hardhat-logo.svg",
      darkSrc: "/images/hardhat-logo-dark.svg",
      alt: "Hardhat",
    },
    menu: [
      { label: "home", url: "/" },
      {
        label: "documentation",
        url: "/docs/getting-started",
        dropdown: [
          { label: "Hardhat 3", url: "/docs/getting-started" },
          { label: "Hardhat Ignition", url: "/ignition/docs/getting-started" },
          { label: "Hardhat VSCode", url: "/hardhat-vscode" },
        ],
      },
      { label: "plugins", url: "/plugins" },
      { label: "hardhat 2", url: "/hardhat2" },
    ],
    socials: [
      { name: "github", url: "https://github.com/NomicFoundation/hardhat" },
      { name: "x", url: "https://twitter.com/HardhatHQ" },
      { name: "discord", url: "https://hardhat.org/discord" },
    ],
  },
  hero: {
    title: "Ethereum development environment for professionals",
    tagline: "<strong>Hardhat 3:</strong> Rust-powered Solidity tests",
    cta: {
      title: "Get started",
      url: "/docs/getting-started",
    },
    block: {
      title: "Ready to use out of the box",
      text: "Hardhat includes everything you need for Solidity smart contract development. Testing, deployment, code coverage, code verification, and more.",
    },
  },
  whyHardhat: {
    title: "Why hardhat?",
    footer: {
      title: "Flexible. Extensible. Fast.",
      text: "Build your software your way—without limitations.",
    },
    featureCards: [
      {
        imagePaths: {
          lg: "/images/feature-cards/SolidityDebuggerImage.svg",
          m: "/images/feature-cards/SolidityDebuggerImageLg.svg",
          md: "/images/feature-cards/SolidityDebuggerImageMd.svg",
          sm: "/images/feature-cards/SolidityDebuggerImageSm.svg",
        },
        imageDarkPaths: {
          lg: "/images/feature-cards/SolidityDebuggerImageDark.svg",
          m: "/images/feature-cards/SolidityDebuggerImageDarkLg.svg",
          md: "/images/feature-cards/SolidityDebuggerImageDarkMd.svg",
          sm: "/images/feature-cards/SolidityDebuggerImageDarkSm.svg",
        },
        articleOne: {
          title: "Run Solidity tests on a Rust-powered runtime",
          text: "Deploy your contracts, run Solidity tests, and debug your code on Hardhat's new runtime written in Rust for outstanding performance.",
          icon: "CCIcon",
          cta: {
            url: "#",
            title: "Learn more about writing Solidity tests",
          },
        },
        articleTwo: {
          title: "Clear errors and Solidity stack traces",
          text: 'When transactions revert, Hardhat shows actionable errors like "Non-payable function was called with value 1," alongside detailed Solidity stack traces to pinpoint exactly where and why your code fails.',
          icon: "CAIcon",
          cta: {
            url: "#",
            title: "Learn more about debugging",
          },
        },
      },
      {
        imagePaths: {
          lg: "/images/feature-cards/ComprehensiveTestingImage.svg",
          m: "/images/feature-cards/ComprehensiveTestingImageLg.svg",
          md: "/images/feature-cards/ComprehensiveTestingImageMd.svg",
          sm: "/images/feature-cards/ComprehensiveTestingImageSm.svg",
        },
        imageDarkPaths: {
          lg: "/images/feature-cards/ComprehensiveTestingImageDark.svg",
          m: "/images/feature-cards/ComprehensiveTestingImageDarkLg.svg",
          md: "/images/feature-cards/ComprehensiveTestingImageDarkMd.svg",
          sm: "/images/feature-cards/ComprehensiveTestingImageDarkSm.svg",
        },
        articleOne: {
          title: "Comprehensive testing approach",
          text: "Write unit tests in Solidity for speed and conciseness, integration tests in TypeScript for expressiveness and complexity, or fuzzing tests to push the edges. Decide on a case by case basis.",
          icon: "CubIcon",
          cta: {
            url: "/hardhat-network/#console.log",
            title: "Learn more about testing",
          },
        },
        articleTwo: {
          title:
            "Multi-chain ready: Optimism's OP Stack and Base simulation support",
          text: "Manage multiple networks at the same time and confidently deploy on OP Stack knowing your code was tested on an accurate simulation.",
          icon: "DCDIcon",
          cta: {
            url: "/hardhat-network/#console.log",
            title: "Learn more about simulating Base",
          },
        },
      },
      {
        imagePaths: {
          lg: "/images/feature-cards/SimpleDeploymentsImage.svg",
          m: "/images/feature-cards/SimpleDeploymentsImageLg.svg",
          md: "/images/feature-cards/SimpleDeploymentsImageMd.svg",
          sm: "/images/feature-cards/SimpleDeploymentsImageSm.svg",
        },
        imageDarkPaths: {
          lg: "/images/feature-cards/SimpleDeploymentsImageDark.svg",
          m: "/images/feature-cards/SimpleDeploymentsImageDarkLg.svg",
          md: "/images/feature-cards/SimpleDeploymentsImageDarkMd.svg",
          sm: "/images/feature-cards/SimpleDeploymentsImageDarkSm.svg",
        },
        articleOne: {
          title: "Simple and reliable deployments",
          text: "Define your contract instances, their operations, and Hardhat Ignition will drive the complex details and parallelize execution.",
          icon: "CDIcon",
          cta: {
            url: "/hardhat-network/#console.log",
            title: "Get started with Hardhat Ignition",
          },
        },
        articleTwo: {
          title: "Plugin ecosystem",
          text: "Extend Hardhat with a composable ecosystem of plugins that add functionality and integrate your existing tools into a smooth workflow.",
          icon: "CCReverseIcon",
          cta: {
            url: "/hardhat-network/#console.log",
            title: "Learn started about simulating Base",
          },
        },
      },
      {
        imagePaths: {
          lg: "/images/feature-cards/PluginEcosystemImage.png",
          m: "/images/feature-cards/PluginEcosystemImageLg.png",
          md: "/images/feature-cards/PluginEcosystemImageMd.png",
          sm: "/images/feature-cards/PluginEcosystemImageSm.png",
        },
        imageDarkPaths: {
          lg: "/images/feature-cards/PluginEcosystemImageDark.png",
          m: "/images/feature-cards/PluginEcosystemImageDarkLg.png",
          md: "/images/feature-cards/PluginEcosystemImageDarkMd.png",
          sm: "/images/feature-cards/PluginEcosystemImageDarkSm.png",
        },
        articleOne: {
          title: "TypeScript extensibility",
          text: "A tooling platform designed to be extended, Hardhat has all the utilities you need to address your project-specific needs. Change anything you like. Even entire built-in tasks, or just parts of them.",
          icon: "LayoutIcon",
          cta: {
            url: "/hardhat-network/#console.log",
            title: "Learn more about extending Hardhat",
          },
        },
        articleTwo: {
          title: "For teams and projects of any scale",
          text: "From single hacker quickly iterating on a proof of concept to full blown engineering organization dealing with ad-hoc needs at scale, Hardhat adapts as your needs change",
          icon: "CCIcon",
          cta: {
            url: "/hardhat-network/#console.log",
            title: "Get started with plugins",
          },
        },
      },
    ],
  },
  whatIsNew: {
    title: "What's new in Hardhat",
  },
  hardhatNews: {
    title: "From the Hardhat blog",
  },
  emailForm: {
    title: "Tell me about new product features as they come out",
  },
  footer: {
    builtByText: "Built by",
    copyrightText: "Nomic Foundation",
    privacyPolicyText: "Privacy Policy",
    privacyPolicyUrl: "/privacy-policy.html",
  },
};

export const cookiePopup: CookiePopupConfig = {
  title: "Cookie Policy",
  text: "We use cookies to improve your experience on our website.",
  readMoreHref: "/privacy-policy.html",
  readMoreText: "Read More",
  measurementId: import.meta.env.GA_MEASUREMENT_ID,
};

export const pluginsConfig: PluginsConfig = {
  officialPluginsNpmTag: "latest",
  officialPluginsAuthor: "Nomic Foundation",
  officialPluginsAuthorUrl: "https://x.com/NomicFoundation",
  maliciousPluginReportingEmail: "security@nomic.foundation",
};
