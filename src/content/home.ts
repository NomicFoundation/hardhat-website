import SolidityDebuggerImage from "../assets/feature-cards/Desktop/SolidityDebuggerImage.svg";
import SolidityDebuggerImageLg from "../assets/feature-cards/Desktop/SolidityDebuggerImageLg.svg";
import SolidityDebuggerImageMd from "../assets/feature-cards/Desktop/SolidityDebuggerImageMd.svg";
import SolidityDebuggerImageSm from "../assets/feature-cards/Desktop/SolidityDebuggerImageSm.svg";
import SolidityDebuggerImageDark from "../assets/feature-cards/Desktop/SolidityDebuggerImageDark.svg";
import SolidityDebuggerImageDarkLg from "../assets/feature-cards/Desktop/SolidityDebuggerImageDarkLg.svg";
import SolidityDebuggerImageDarkMd from "../assets/feature-cards/Desktop/SolidityDebuggerImageDarkMd.svg";
import SolidityDebuggerImageDarkSm from "../assets/feature-cards/Desktop/SolidityDebuggerImageDarkSm.svg";

import ComprehensiveTestingImage from "../assets/feature-cards/Desktop/ComprehensiveTestingImage.svg";
import ComprehensiveTestingImageLg from "../assets/feature-cards/Desktop/ComprehensiveTestingImageLg.svg";
import ComprehensiveTestingImageMd from "../assets/feature-cards/Desktop/ComprehensiveTestingImageMd.svg";
import ComprehensiveTestingImageSm from "../assets/feature-cards/Desktop/ComprehensiveTestingImageSm.svg";
import ComprehensiveTestingImageDark from "../assets/feature-cards/Desktop/ComprehensiveTestingImageDark.svg";
import ComprehensiveTestingImageDarkLg from "../assets/feature-cards/Desktop/ComprehensiveTestingImageDarkLg.svg";
import ComprehensiveTestingImageDarkMd from "../assets/feature-cards/Desktop/ComprehensiveTestingImageDarkMd.svg";
import ComprehensiveTestingImageDarkSm from "../assets/feature-cards/Desktop/ComprehensiveTestingImageDarkSm.svg";

import SimpleDeploymentsImage from "../assets/feature-cards/Desktop/SimpleDeploymentsImage.svg";
import SimpleDeploymentsImageLg from "../assets/feature-cards/Desktop/SimpleDeploymentsImageLg.svg";
import SimpleDeploymentsImageMd from "../assets/feature-cards/Desktop/SimpleDeploymentsImageMd.svg";
import SimpleDeploymentsImageSm from "../assets/feature-cards/Desktop/SimpleDeploymentsImageSm.svg";
import SimpleDeploymentsImageDark from "../assets/feature-cards/Desktop/SimpleDeploymentsImageDark.svg";
import SimpleDeploymentsImageDarkLg from "../assets/feature-cards/Desktop/SimpleDeploymentsImageDarkLg.svg";
import SimpleDeploymentsImageDarkMd from "../assets/feature-cards/Desktop/SimpleDeploymentsImageDarkMd.svg";
import SimpleDeploymentsImageDarkSm from "../assets/feature-cards/Desktop/SimpleDeploymentsImageDarkSm.svg";

import PluginEcosystemImage from "../assets/feature-cards/Desktop/PluginEcosystemImage.png";
import PluginEcosystemImageLg from "../assets/feature-cards/Desktop/PluginEcosystemImageLg.png";
import PluginEcosystemImageMd from "../assets/feature-cards/Desktop/PluginEcosystemImageMd.png";
import PluginEcosystemImageSm from "../assets/feature-cards/Desktop/PluginEcosystemImageSm.png";
import PluginEcosystemImageDark from "../assets/feature-cards/Desktop/PluginEcosystemImageDark.png";
import PluginEcosystemImageDarkLg from "../assets/feature-cards/Desktop/PluginEcosystemImageDarkLg.png";
import PluginEcosystemImageDarkMd from "../assets/feature-cards/Desktop/PluginEcosystemImageDarkMd.png";
import PluginEcosystemImageDarkSm from "../assets/feature-cards/Desktop/PluginEcosystemImageDarkSm.png";

import FeatureCardIcons from "../assets/feature-cards/icons";

const heroBlockContent = {
  title: "Ethereum development environment for professionals",
  tagline: "<strong>Hardhat 3:</strong> Rust-powered Solidity tests",
  cta: {
    title: "Get started",
    url: "/docs/getting-started",
  },
};

const whyHardhatContent = {
  title: "Why hardhat?",
  footer: {
    title: "Flexible. Extensible. Fast.",
    text: "Build your software your way—without limitations.",
  },
  featureCards: [
    {
      image: {
        lg: SolidityDebuggerImage,
        m: SolidityDebuggerImageLg,
        md: SolidityDebuggerImageMd,
        sm: SolidityDebuggerImageSm,
      },
      imageDark: {
        lg: SolidityDebuggerImageDark,
        m: SolidityDebuggerImageDarkLg,
        md: SolidityDebuggerImageDarkMd,
        sm: SolidityDebuggerImageDarkSm,
      },

      articleOne: {
        title: "Run Solidity tests on a Rust-powered runtime",
        text: "Deploy your contracts, run Solidity tests, and debug your code on Hardhat’s new runtime written in Rust for outstanding performance.",
        icon: FeatureCardIcons.CCIcon,
        cta: {
          url: "#",
          title: "Learn more about writing Solidity tests",
        },
      },
      articleTwo: {
        title: "Clear errors and Solidity stack traces",
        text: "When transactions revert, Hardhat shows actionable errors like “Non-payable function was called with value 1,” alongside detailed Solidity stack traces to pinpoint exactly where and why your code fails.",
        icon: FeatureCardIcons.CAIcon,
        cta: {
          url: "#",
          title: "Learn more about debugging",
        },
      },
    },
    {
      image: {
        lg: ComprehensiveTestingImage,
        m: ComprehensiveTestingImageLg,
        md: ComprehensiveTestingImageMd,
        sm: ComprehensiveTestingImageSm,
      },
      imageDark: {
        lg: ComprehensiveTestingImageDark,
        m: ComprehensiveTestingImageDarkLg,
        md: ComprehensiveTestingImageDarkMd,
        sm: ComprehensiveTestingImageDarkSm,
      },

      articleOne: {
        title: "Comprehensive testing approach",
        text: "Write unit tests in Solidity for speed and conciseness, integration tests in TypeScript for expressiveness and complexity, or fuzzing tests to push the edges. Decide on a case by case basis.",
        icon: FeatureCardIcons.CubIcon,
        cta: {
          url: "/hardhat-network/#console.log",
          title: "Learn more about testing",
        },
      },
      articleTwo: {
        title:
          "Multi-chain ready: Optimism’s OP Stack and Base simulation support",
        text: "Manage multiple networks at the same time and confidently deploy on OP Stack knowing your code was tested on an accurate simulation.",
        icon: FeatureCardIcons.DCDIcon,
        cta: {
          url: "/hardhat-network/#console.log",
          title: "Learn more about simulating Base",
        },
      },
    },
    {
      image: {
        lg: SimpleDeploymentsImage,
        m: SimpleDeploymentsImageLg,
        md: SimpleDeploymentsImageMd,
        sm: SimpleDeploymentsImageSm,
      },
      imageDark: {
        lg: SimpleDeploymentsImageDark,
        m: SimpleDeploymentsImageDarkLg,
        md: SimpleDeploymentsImageDarkMd,
        sm: SimpleDeploymentsImageDarkSm,
      },

      articleOne: {
        title: "Simple and reliable deployments",
        text: "Define your contract instances, their operations, and Hardhat Ignition will drive the complex details and parallelize execution.",
        icon: FeatureCardIcons.CDIcon,
        cta: {
          url: "/hardhat-network/#console.log",
          title: "Get started with Hardhat Ignition",
        },
      },
      articleTwo: {
        title: "Plugin ecosystem",
        text: "Extend Hardhat with a composable ecosystem of plugins that add functionality and integrate your existing tools into a smooth workflow.",
        icon: FeatureCardIcons.CCReverseIcon,
        cta: {
          url: "/hardhat-network/#console.log",
          title: "Learn started about simulating Base",
        },
      },
    },
    {
      image: {
        lg: PluginEcosystemImage,
        m: PluginEcosystemImageLg,
        md: PluginEcosystemImageMd,
        sm: PluginEcosystemImageSm,
      },
      imageDark: {
        lg: PluginEcosystemImageDark,
        m: PluginEcosystemImageDarkLg,
        md: PluginEcosystemImageDarkMd,
        sm: PluginEcosystemImageDarkSm,
      },
      articleOne: {
        title: "TypeScript extensibility",
        text: "A tooling platform designed to be extended, Hardhat has all the utilities you need to address your project-specific needs. Change anything you like. Even entire built-in tasks, or just parts of them.",
        icon: FeatureCardIcons.LayoutIcon,
        cta: {
          url: "/hardhat-network/#console.log",
          title: "Learn more about extending Hardhat",
        },
      },
      articleTwo: {
        title: "For teams and projects of any scale",
        text: "From single hacker quickly iterating on a proof of concept to full blown engineering organization dealing with ad-hoc needs at scale, Hardhat adapts as your needs change",
        icon: FeatureCardIcons.CCIcon,
        cta: {
          url: "/hardhat-network/#console.log",
          title: "Get started with plugins",
        },
      },
    },
  ],
};

const whatIsNewBlockContent = {
  title: "What's new in Hardhat",
};

const hardhatNewsContent = {
  title: "From the Hardhat blog",
};

const homepageContent = {
  whyHardhatContent,
  heroBlockContent,
  whatIsNewBlockContent,
  hardhatNewsContent,
};

export default homepageContent;
