import type { GetStaticProps, NextPage } from "next";
import { styled } from "linaria/react";
import PluginsLayout from "../../components/PluginsLayout";
import { media, tm, tmDark, tmSelectors } from "../../themes";

import { plugins } from "../../content/plugins/plugins";
import { IPlugin } from "../../model/types";
import PluginSnippet from "../../components/PluginSnippet";
import MDLink from "../../components/mdxComponents/MDLink";

interface IPluginsPage {
  plugins: typeof plugins;
}

const PageTitle = styled.h3`
  margin-top: 28px;
  font-size: 42px;
  font-weight: 700;
  line-height: 45px;
  letter-spacing: 0.5px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${tm(({ colors }) => colors.border)};
  ${tmSelectors.dark} {
    border-bottom-color: ${tmDark(({ colors }) => colors.border)};
    color: ${tmDark(({ colors }) => colors.neutral800)};
  }

  ${media.mqDark} {
    ${tmSelectors.auto} {
      border-bottom-color: ${tmDark(({ colors }) => colors.border)};
      color: ${tmDark(({ colors }) => colors.neutral800)};
    }
  }
`;

const SectionTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 74px;
  margin-bottom: 32px;
  ${media.md} {
    align-items: center;
    flex-direction: row;
  }

  &.first {
    margin-top: 40px;
  }
`;

const SectionTitle = styled.h3`
  font-weight: 700;
  font-size: 24px;
  line-height: 1.25;
  letter-spacing: 0.5px;
  color: ${tm(({ colors }) => colors.neutral800)};
  & > a > span {
    margin-left: -24px;
    margin-right: 8px;
    opacity: 0;
    cursor: pointer;
    color: ${tm(({ colors }) => colors.accent700)};
  }
  &:hover > a > span {
    opacity: 1;
    &:hover {
      text-decoration: underline;
    }
  }
  ${tmSelectors.dark} {
    color: ${tmDark(({ colors }) => colors.neutral800)};
  }

  ${media.mqDark} {
    ${tmSelectors.auto} {
      color: ${tmDark(({ colors }) => colors.neutral800)};
    }
  }
`;

const CommunityPluginSubtitle = styled.h4`
  margin-top: 8px;
  margin-bottom: 24px;
`;

const Description = styled.div`
  font-size: 18px;
  color: ${tm(({ colors }) => colors.codeColor)};
  margin-top: 30px;

  ${tmSelectors.dark} {
    color: ${tmDark(({ colors }) => colors.codeColor)};
  }

  ${media.mqDark} {
    ${tmSelectors.auto} {
      color: ${tmDark(({ colors }) => colors.codeColor)};
    }
  }

  i {
    color: ${tm(({ colors }) => colors.neutral700)};

    ${tmSelectors.dark} {
      color: ${tmDark(({ colors }) => colors.neutral700)};
    }

    ${media.mqDark} {
      ${tmSelectors.auto} {
        color: ${tmDark(({ colors }) => colors.neutral700)};
      }
    }
  }

  &.community-plugins {
    ${tmSelectors.dark} {
      color: ${tmDark(({ colors }) => colors.neutral700)};
    }

    ${media.mqDark} {
      ${tmSelectors.auto} {
        color: ${tmDark(({ colors }) => colors.neutral700)};
      }
    }

    margin-bottom: 40px;

    div {
      margin-bottom: 16px;
    }

    a {
      color: ${tm(({ colors }) => colors.accent700)};
    }
  }

  &.last {
    margin-bottom: 40px;
  }
`;

const Plugins: NextPage<IPluginsPage> = ({ plugins: pluginsProp }) => {
  return (
    <PluginsLayout
      seo={{
        title: "Hardhat 3 plugins",
        description: "Hardhat 3 plugins",
      }}
      sidebarLayout={[]}
    >
      <div>
        <PageTitle>Plugins</PageTitle>

        <Description>
          Extend Hardhat&lsquo;s functionality with the plugins below.
        </Description>

        <Description>
          To learn how to create your own, check out our{" "}
          <MDLink href="/plugin-development">
            plugin development documentation
          </MDLink>
          .
        </Description>

        <SectionTitleWrapper className="first">
          <SectionTitle id="official-plugins">Official plugins</SectionTitle>
        </SectionTitleWrapper>
        {pluginsProp.officialPlugins.map((plugin) => {
          return (
            <PluginSnippet
              key={plugin.name}
              {...plugin}
              href={`/plugins/${plugin.slug}`}
            />
          );
        })}
        <SectionTitleWrapper>
          <SectionTitle id="community-plugins">Community plugins</SectionTitle>
        </SectionTitleWrapper>

        {pluginsProp.communityPlugins.length === 0 ? (
          <Description>
            <i>No community plugins yet.</i>
          </Description>
        ) : (
          <>
            <Description className="community-plugins">
              <div>
                Community Plugins are developed and maintained by the Hardhat
                community. They have not been written, reviewed, or endorsed by
                Nomic Foundation, so please use them at your own risk.
              </div>

              <div>
                If you believe a plugin in this list is malicious, please report
                it to{" "}
                <a href="mailto:security@nomic.foundation">
                  security@nomic.foundation
                </a>
                .
              </div>
            </Description>
            <CommunityPluginSubtitle>
              Community plugins sorted by npm downloads
            </CommunityPluginSubtitle>

            {pluginsProp.communityPlugins.map((plugin: IPlugin) => {
              return (
                <PluginSnippet
                  key={plugin.name}
                  {...plugin}
                  href={`https://www.npmjs.com/package/${
                    // eslint-disable-next-line
                    plugin.npmPackage || plugin.name
                  }`}
                />
              );
            })}
          </>
        )}
      </div>
    </PluginsLayout>
  );
};

export default Plugins;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      plugins,
    },
  };
};
