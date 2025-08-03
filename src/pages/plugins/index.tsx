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

const SectionTitleDescription = styled.span`
  font-size: 16px;
  color: ${tm(({ colors }) => colors.neutral700)};
  margin-top: 8px;
  ${media.md} {
    padding-left: 10px;
  }

  ${tmSelectors.dark} {
    color: ${tmDark(({ colors }) => colors.neutral700)};
  }

  ${media.mqDark} {
    ${tmSelectors.auto} {
      color: ${tmDark(({ colors }) => colors.neutral700)};
    }
  }
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
          <SectionTitleDescription>
            Sorted by npm downloads
          </SectionTitleDescription>
        </SectionTitleWrapper>
        {pluginsProp.communityPlugins.length === 0 ? (
          <Description>
            <i>No community plugins yet.</i>
          </Description>
        ) : (
          pluginsProp.communityPlugins.map((plugin: IPlugin) => {
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
          })
        )}
        <Description className="last">
          <MDLink href="https://github.com/NomicFoundation/hardhat-website/blob/main/src/content/plugins/plugins.ts#L27">
            Send a Pull Request
          </MDLink>
          to get yours listed here.
        </Description>
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
