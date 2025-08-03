import React, { useEffect, useRef, useState } from "react";
import { styled } from "linaria/react";
import { useRouter } from "next/router";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

import SEO from "./SEO";
import DocsNavigation from "./DocsNavigation";
import {
  tm,
  tmSelectors,
  tmDark,
  media,
  ThemeProvider,
  headerTotalHeight,
} from "../themes";
import {
  FooterNavigation,
  IDocumentationSidebarStructure,
  ISeo,
} from "./types";
import Sidebar from "./Sidebar";
import { bannerContent, menuItemsList, socialsItems } from "../config";
import MobileSidebarMenu from "./MobileSidebarMenu";
import DocumentationFooter from "./DocumentationFooter";
import Title from "./mdxComponents/Title";
import Paragraph from "./mdxComponents/Paragraph";
import CodeBlocks from "./mdxComponents/CodeBlocks";
import Admonition from "./mdxComponents/Admonition";
import UnorderedList from "./mdxComponents/UnorderedList";
import HorizontalRule from "./mdxComponents/HorizontalRule";
import MDLink from "./mdxComponents/MDLink";
import Table from "./mdxComponents/Table";
import MDImage from "./mdxComponents/MDImage";
import OrderedList from "./mdxComponents/OrderedList";
import TabsGroup from "./mdxComponents/TabsGroup";
import Tab from "./mdxComponents/Tab";
import GDPRNotice from "./GDPRNotice";

import Banner, { DefaultBanner } from "./ui/Banner";
import { DefaultBannerProps } from "./ui/types";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-family: "Roboto", Oxygen, Ubuntu, Cantarell, "Open Sans",
    "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  min-width: 320px;

  width: 100%;
`;

const Main = styled.main`
  flex: 1 1 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: ${tm(({ colors }) => colors.neutral0)};
  width: 100%;
  position: relative;

  ${tmSelectors.dark} {
    background-color: ${tmDark(({ colors }) => colors.neutral0)};
  }
  ${media.mqDark} {
    ${tmSelectors.auto} {
      background-color: ${tmDark(({ colors }) => colors.neutral0)};
    }
  }
`;

const SidebarMask = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
export const MobileSidebarMenuMask = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: absolute;
  width: 100%;
  left: -100%;
  top: 0;
  transition: left 0.25s ease-in-out;
  &[data-open="true"] {
    left: 0;
  }
`;

export const SidebarContainer = styled.aside<{ isSidebarOpen: boolean }>`
  flex-direction: column;
  width: min(366px, 100%);
  position: fixed;

  top: ${headerTotalHeight};
  left: 0;
  transform: translateX(
    ${({ isSidebarOpen }) => (isSidebarOpen ? "0px" : "-100%")}
  );
  height: calc(100svh - ${headerTotalHeight});

  display: flex;
  overflow-y: auto;
  transition: transform ease-out 0.25s;
  z-index: 50;
  background-color: ${tm(({ colors }) => colors.neutral0)};

  ${media.laptop} {
    transform: none;
  }

  .landing & {
    ${media.laptop} {
      display: none;
    }
    pointer-events: ${({ isSidebarOpen }) => (isSidebarOpen ? "auto" : "none")};
  }

  ${tmSelectors.dark} {
    background-color: ${tmDark(({ colors }) => colors.neutral0)};
  }
  ${media.mqDark} {
    ${tmSelectors.auto} {
      background-color: ${tmDark(({ colors }) => colors.neutral0)};
    }
  }

  :not(&[data-no-border="true"]) {
    border-right: 1px solid ${tm(({ colors }) => colors.gray2)};
    ${tmSelectors.dark} {
      border-right: 1px solid ${tmDark(({ colors }) => colors.gray3)};
      background-color: ${tmDark(({ colors }) => colors.neutral0)};
    }
    ${media.mqDark} {
      ${tmSelectors.auto} {
        border-right: 1px solid ${tmDark(({ colors }) => colors.gray3)};
        background-color: ${tmDark(({ colors }) => colors.neutral0)};
      }
    }
  }

  ${SidebarMask} {
    display: none;
    ${media.laptop} {
      display: flex;
    }
  }
  ${MobileSidebarMenuMask} {
    display: flex;
    ${media.laptop} {
      display: none;
    }
  }

  &[data-no-border="true"] {
    border-right: none;
  }
`;

export const Header = styled.header`
  position: sticky;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  z-index: 199;
  &:before {
    content: "";
    position: absolute;
    bottom: 1px;
    left: 0;
    right: 0;
    height: 1px;
    background-color: ${tm(({ colors }) => colors.gray2)};
    display: none;
    z-index: 11;
    pointer-events: none;
  }

  &.is-sidebar-open {
    &:before {
      display: block;
    }
  }

  ${tmSelectors.dark} {
    &.is-sidebar-open:before,
    &.with-line:before {
      background-color: ${tmDark(({ colors }) => colors.gray3)};
    }
  }
  ${media.mqDark} {
    ${tmSelectors.auto} {
      &.is-sidebar-open:before,
      &.with-line:before {
        background-color: ${tmDark(({ colors }) => colors.gray3)};
      }
    }
  }

  ${media.laptop} {
    &.with-line {
      &:before {
        display: block;
      }
    }
  }
`;

const View = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-top: 24px;
  width: 100%;
  height: 100%;

  ${media.laptop} {
    padding-left: 366px;
  }
`;
const Content = styled.section`
  width: 100%;
  max-width: 774px;
  padding: 0 16px;
  color: ${tm(({ colors }) => colors.neutral900)};

  & h2 + p {
    margin-top: 32px;
  }

  color: ${tm(({ colors }) => colors.neutral900)};

  ${tmSelectors.dark} {
    color: ${tmDark(({ colors }) => colors.neutral900)};
  }

  ${media.mqDark} {
    ${tmSelectors.auto} {
      color: ${tmDark(({ colors }) => colors.neutral900)};
    }
  }
  ${media.tablet} {
    padding: 0 44px;
  }
`;

export const components = {
  h1: Title.H1,
  h2: Title.H2,
  h3: Title.H3,
  h4: Title.H4,
  h5: Title.H5,
  p: Paragraph,
  code: CodeBlocks.Code,
  pre: CodeBlocks.Pre,
  tip: Admonition.Tip,
  warning: Admonition.Warning,
  ul: UnorderedList,
  ol: OrderedList,
  hr: HorizontalRule,
  a: MDLink,
  table: Table,
  img: MDImage,
  tabsgroup: TabsGroup,
  tab: Tab,
};

interface Props {
  seo: ISeo;
  sidebarLayout: IDocumentationSidebarStructure;
  footerNavigation?: FooterNavigation;
  mdxSource: MDXRemoteSerializeResult;
}

const DocumentationLayout = ({
  mdxSource,
  seo,
  sidebarLayout,
  footerNavigation,
}: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const docViewRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    docViewRef.current.scrollTo(0, 0);
  }, [router.asPath]);

  useEffect(() => {
    const body = document.querySelector("body");
    if (!body) return;

    if (isSidebarOpen) {
      // Disable scroll
      body.style.overflow = "hidden";
    } else {
      // Enable scroll
      body.style.overflow = "auto";
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    const listener = () => {
      if (isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("click", listener);

    return () => document.removeEventListener("click", listener);
  }, [isSidebarOpen]);

  return (
    <ThemeProvider>
      <Container>
        <Header className={isSidebarOpen ? "is-sidebar-open" : ""}>
          <Banner
            content={bannerContent}
            renderContent={({ content }: DefaultBannerProps) => (
              <DefaultBanner content={content} />
            )}
          />
          <DocsNavigation
            isSidebarOpen={isSidebarOpen}
            onSidebarOpen={setIsSidebarOpen}
          />
        </Header>

        <SEO seo={seo} />

        <Main>
          <SidebarContainer
            onClick={(e) => {
              e.stopPropagation();
            }}
            isSidebarOpen={isSidebarOpen}
          >
            <SidebarMask>
              <Sidebar
                elementsList={sidebarLayout}
                closeSidebar={() => setIsSidebarOpen(false)}
              />
            </SidebarMask>
            <MobileSidebarMenuMask data-open={isSidebarOpen}>
              <MobileSidebarMenu
                menuItems={menuItemsList}
                socialsItems={socialsItems}
                sidebarElementsList={sidebarLayout}
                closeSidebar={() => setIsSidebarOpen(false)}
                isDocumentation
              />
            </MobileSidebarMenuMask>
          </SidebarContainer>
          <View ref={docViewRef}>
            <Content>
              {/* @ts-ignore */}
              <MDXRemote {...mdxSource} components={components} />
            </Content>
            {footerNavigation ? (
              <DocumentationFooter
                next={footerNavigation.next}
                prev={footerNavigation.prev}
                lastEditDate={footerNavigation.lastEditDate}
                editLink={footerNavigation.editLink}
              />
            ) : null}
          </View>
        </Main>
      </Container>
      <GDPRNotice />
    </ThemeProvider>
  );
};

export default DocumentationLayout;
