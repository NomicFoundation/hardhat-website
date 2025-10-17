export interface LandingConfig {
  head: {
    title: string;
    description: string;
    canonicalUrl: string;
  };
  banner: {
    text: string;
    href: string;
  };
  header: {
    logo: {
      url: string;
      lightSrc: string;
      darkSrc: string;
      alt: string;
    };
    menu: Array<{
      label: string;
      url: string;
      dropdown?: Array<{
        label: string;
        url: string;
      }>;
    }>;
    socials: Array<{
      name: string;
      url: string;
    }>;
  };
  hero: {
    title: string;
    tagline: string;
    cta: {
      url: string;
      title: string;
    };
    block: {
      title: string;
      text: string;
    };
  };
  whyHardhat: {
    title: string;
    footer: {
      title: string;
      text: string;
    };
    featureCards: Array<{
      imagePaths: {
        lg: string;
        m: string;
        md: string;
        sm: string;
      };
      imageDarkPaths: {
        lg: string;
        m: string;
        md: string;
        sm: string;
      };
      articleOne: {
        title: string;
        text: string;
        icon: string;
        cta: {
          url: string;
          title: string;
        };
      };
      articleTwo: {
        title: string;
        text: string;
        icon: string;
        cta: {
          url: string;
          title: string;
        };
      };
    }>;
  };
  whatIsNew: {
    title: string;
  };
  hardhatNews: {
    title: string;
  };
  emailForm: {
    title: string;
  };
  footer: {
    builtByText: string;
    copyrightText: string;
    privacyPolicyText: string;
    privacyPolicyUrl: string;
  };
}

export interface CookiePopupConfig {
  title: string;
  text: string;
  readMoreHref: string;
  readMoreText: string;
  measurementId: string;
}

export interface PluginsConfig {
  officialPluginsNpmTag: string;
  officialPluginsAuthor: string;
  officialPluginsAuthorUrl: string;
  maliciousPluginReportingEmail: string;
}
