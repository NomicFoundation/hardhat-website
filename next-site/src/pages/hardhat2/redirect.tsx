import type { GetStaticProps, NextPage } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { styled } from "linaria/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PluginsLayout from "../../components/PluginsLayout";
import { components } from "../../components/DocumentationLayout";
import { getLayout, prepareMdContent } from "../../model/markdown";
import { media, tmDark, tmSelectors } from "../../themes";
import { createLayouts } from "../../model/layout";
import { IDocumentationSidebarStructure } from "../../components/types";
import MDLink from "../../components/mdxComponents/MDLink";

interface IDocsPage {
  mdxSource: MDXRemoteSerializeResult;
  layout: IDocumentationSidebarStructure;
}

const PageTitle = styled.h3`
  margin-top: 28px;
  font-size: 42px;
  font-weight: 700;
  line-height: 45px;
  letter-spacing: 0.5px;
  padding-bottom: 24px;
  ${tmSelectors.dark} {
    color: ${tmDark(({ colors }) => colors.neutral800)};
  }

  ${media.mqDark} {
    ${tmSelectors.auto} {
      color: ${tmDark(({ colors }) => colors.neutral800)};
    }
  }
`;

const Docs: NextPage<IDocsPage> = ({ mdxSource, layout }) => {
  const title = "Redirecting to Hardhat 2's docs";

  const { query, isReady } = useRouter();

  const [destination, setDestination] = useState("https://v2.hardhat.org");

  useEffect(() => {
    // hydration hasn’t finished yet
    if (!isReady) return;

    const value = query.r; // string | string[] | undefined
    const url =
      typeof value === "string"
        ? `https://v2.hardhat.org${value}`
        : `https://v2.hardhat.org`;

    setDestination(url);

    // eslint-disable-next-line no-console
    console.log({ r: value, destination: url });
    // eslint-disable-next-line no-console
    console.log(`Redirecting to ${url}`);

    setTimeout(() => {
      window.location.href = url;
    }, 7000);
  }, [query, isReady]);

  return (
    <PluginsLayout
      seo={{
        title,
        description:
          "Redirecting to Hardhat 2's documentation, the previous version of Hardhat",
      }}
      sidebarLayout={layout}
    >
      <div>
        <PageTitle>{title}</PageTitle>

        <MDXRemote
          {...mdxSource}
          components={{ ...components, MDLink } as any}
          scope={{ destination }}
        />
      </div>
    </PluginsLayout>
  );
};

export default Docs;

export const getStaticProps: GetStaticProps = async () => {
  createLayouts();

  const source = `This website contains the documentation of Hardhat 3, the new major version of Hardhat.

We recommend migrating to Hardhat 3, but you can still use Hardhat 2.

We are redirecting you to the documentation you are looking for.

If it doesn't take you there after a few seconds, please <MDLink href={destination}>click here</MDLink>.`;

  const { mdxSource } = await prepareMdContent(source);
  const { layout } = getLayout("docs/getting-started/index.md");

  return {
    props: {
      mdxSource,
      layout,
    },
  };
};
