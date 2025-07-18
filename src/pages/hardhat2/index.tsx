import type { GetStaticProps, NextPage } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { styled } from "linaria/react";
import PluginsLayout from "../../components/PluginsLayout";
import { components } from "../../components/DocumentationLayout";
import {
  getLayout,
  prepareMdContent,
  readMDFileFromPathOrIndex,
} from "../../model/markdown";
import { HARDHAT2_REDIRECT_PATH } from "../../config";
import { media, tmDark, tmSelectors } from "../../themes";
import { createLayouts } from "../../model/layout";
import { IDocumentationSidebarStructure } from "../../components/types";

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
  const title = "Hardhat 2's documentation";

  return (
    <PluginsLayout
      seo={{
        title,
        description:
          "Documentation about Hardhat 2, the previous version of Hardhat",
      }}
      sidebarLayout={layout}
    >
      <div>
        <PageTitle>{title}</PageTitle>
        {/* @ts-ignore */}
        <MDXRemote {...mdxSource} components={components} />
      </div>
    </PluginsLayout>
  );
};

export default Docs;

export const getStaticProps: GetStaticProps = async () => {
  createLayouts();
  const { source } = readMDFileFromPathOrIndex(
    `${HARDHAT2_REDIRECT_PATH}/index.md`
  );
  const { mdxSource } = await prepareMdContent(source);
  const { layout } = getLayout("hardhat-runner/docs/getting-started/index.md");

  return {
    props: {
      mdxSource,
      layout,
    },
  };
};
