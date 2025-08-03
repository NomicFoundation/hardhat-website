import type { GetStaticProps, NextPage } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { styled } from "linaria/react";
import PluginsLayout from "../components/PluginsLayout";

import { getLayout } from "../model/markdown";
import { media, tmDark, tmSelectors } from "../themes";
import { createLayouts } from "../model/layout";
import { IDocumentationSidebarStructure } from "../components/types";

interface IDocsPage {
  mdxSource: MDXRemoteSerializeResult;
  layout: IDocumentationSidebarStructure;
}

const CenterdContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-bottom: 200px;
`;

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

const Docs: NextPage<IDocsPage> = ({ layout }) => {
  const title = "404: Not found";

  return (
    <PluginsLayout
      seo={{
        title,
        description:
          "Documentation about Hardhat 2, the previous version of Hardhat",
      }}
      sidebarLayout={layout}
    >
      <CenterdContainer>
        <PageTitle>{title}</PageTitle>
        <p>The page you are looking for does not exist.</p>
      </CenterdContainer>
    </PluginsLayout>
  );
};

export default Docs;

export const getStaticProps: GetStaticProps = async () => {
  createLayouts();

  const { layout } = getLayout("docs/getting-started/index.md");

  return {
    props: {
      layout,
    },
  };
};
