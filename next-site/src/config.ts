import path from "path";
import {
  DefaultBannerContent,
  MenuItemType,
  NavigationPagesPaths,
  SocialsEnum,
} from "./components/ui/types";
import GitHubLogo from "./assets/socials/gh-logo";
import TwitterLogo from "./assets/socials/tw-logo";
import DiscordLogo from "./assets/socials/dc-logo";
import SolidityIcon from "./assets/tools/solidity";
import RunnerIcon from "./assets/tools/runner";
import RunnerIconDark from "./assets/tools/runner-dark";
import SolidityIconDark from "./assets/tools/solidity-dark";
import IgnitionIcon from "./assets/tools/ignition";
import IgnitionIconDark from "./assets/tools/ignition-dark";

const SOCIALS_LINKS = {
  [SocialsEnum.GITHUB]: "https://github.com/NomicFoundation/hardhat",
  [SocialsEnum.TWITTER]: "https://twitter.com/HardhatHQ",
  [SocialsEnum.DISCORD]: "/discord",
};

export const PRIVACY_POLICY_PATH = "/privacy-policy.html";

export const bannerContent: DefaultBannerContent = {
  text: "Hardhat 3 is now production ready. Migrate now",
  shortText: "Hardhat 3 is now production ready. Migrate now",
  href: "/docs",
};

export const DOCS_PATH = path.join(process.cwd(), "src/content/");

export const TEMP_PATH = path.join(process.cwd(), "temp/");
export const REPO_URL =
  "https://github.com/NomicFoundation/hardhat-website/edit/main/src/content/";
export const MARKDOWN_REAPLACEMENT_VALUES_JSON = path.join(
  TEMP_PATH,
  "markdown-replacement-values.json"
);

export const menuItemsList: MenuItemType[] = [
  {
    label: "Home",
    href: NavigationPagesPaths.HOME,
  },
  {
    label: "Documentation",
    href: "/docs/getting-started",
    subItems: [
      {
        prefix: "",
        label: "Hardhat 3",
        href: "/docs/getting-started",
        icon: RunnerIcon,
        iconDark: RunnerIconDark,
      },
      {
        prefix: "Hardhat",
        label: "Ignition",
        href: "/ignition",
        icon: IgnitionIcon,
        iconDark: IgnitionIconDark,
      },
      {
        prefix: "Hardhat",
        label: "VSCode",
        href: "/hardhat-vscode",
        icon: SolidityIcon,
        iconDark: SolidityIconDark,
      },
    ],
  },
  {
    label: "Plugins",
    href: "/plugins",
  },
  // {
  //   label: "Tutorial",
  //   href: NavigationPagesPaths.TUTORIAL,
  // },
  {
    label: "Hardhat 2",
    href: "/hardhat2",
  },
];

export const socialsItems = [
  {
    name: SocialsEnum.GITHUB,
    href: SOCIALS_LINKS[SocialsEnum.GITHUB],
    Icon: GitHubLogo,
  },
  {
    name: SocialsEnum.TWITTER,
    href: SOCIALS_LINKS[SocialsEnum.TWITTER],
    Icon: TwitterLogo,
  },
  {
    name: SocialsEnum.DISCORD,
    href: SOCIALS_LINKS[SocialsEnum.DISCORD],
    Icon: DiscordLogo,
  },
];

export enum DirInfoConfigKeys {
  SECTION_TYPE = "section-type",
  SECTION_TITLE = "section-title",
  SECTION_URL = "section-url",
  ORDER = "order",
}

export enum LayoutsConfigKeys {
  TITLE = "title",
  FOLDERS = "folders",
}

export const GDPR = {
  title: "We value your privacy",
  text: "We use cookies to enhace your browsing experience, serve personalized adds or content, and analyze our traffic. By clicking “Accept All”, you consent to our use of cookies.",
  readMoreHref: "/privacy-policy.html",
};
