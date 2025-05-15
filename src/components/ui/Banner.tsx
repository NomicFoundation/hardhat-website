import React from 'react';
import { styled } from 'linaria/react';
import { breakpoints, media, tm, tmDark, tmSelectors } from '../../themes';
import useWindowSize, { WindowSizeState } from '../../hooks/useWindowSize';
import { BannerProps, DefaultBannerProps } from './types';

const BannerContainer = styled.section`
  font-family: SourceCodePro, sans-serif;
  user-select: none;
  z-index: 100;
  width: 100%;
  height: 40px;
  padding: 6px 8px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${tm(({ colors }) => colors.gray8b)};
  color: ${tm(({ colors }) => colors.neutral0)};

  font-weight: 600;
  line-height: 1.2;
  letter-spacing: 0.02em;

  cursor: pointer;
  & span {
    margin-right: 2px;
  }

  ${tmSelectors.dark} {
    background-color: ${tmDark(({ colors }) => colors.neutral900)};
    color: ${tmDark(({ colors }) => colors.neutral0)};
  }
  ${media.mqDark} {
    ${tmSelectors.auto} {
      background-color: ${tmDark(({ colors }) => colors.neutral900)};
      color: ${tmDark(({ colors }) => colors.neutral0)};
    }
  }
  ${media.xs} {
    letter-spacing: 0.03em;
  }
  ${media.tablet} {
    letter-spacing: 0.04em;
  }
  ${media.laptop} {
    letter-spacing: 0.05em;
  }
`;

const BracesContainer = styled.div`
  font-size: 10px;
  line-height: 14px;
  & > .braces {
    color: ${tm(({ colors }) => colors.accent900)};
    display: inline-flex;
    align-items: center;
    transition: color ease-out 0.5s;
    vertical-align: middle;
    &:first-child {
      margin-right: 8px;
    }
    &:last-child {
      margin-left: 8px;
    }
  }

  & .text {
    font-size: 10px;
    display: inline;
    vertical-align: middle;
    ${media.tablet} {
      font-size: 12px;
      padding: 0px 33px;
    }

    ${media.laptop} {
      font-size: 16px;
    }
  }
  ${media.tablet} {
    font-size: 16px;
  }
  ${media.laptop} {
    font-size: 20px;
  }
`;

const Brace = styled.div<{
  fullAnimationDuration: number;
  braceNumber: number;
}>`
  display: inline-block;
  vertical-align: middle;
  animation: highlight ease-out ${(props) => `${props.fullAnimationDuration}s`};
  animation-iteration-count: 3;
  animation-delay: ${(props) => `${props.braceNumber * 0.5}s`};
  @keyframes highlight {
    10% {
      opacity: 0;
    }

    20% {
      opacity: 1;
    }
  } ;
`;

const getBracesCount = (windowSize: WindowSizeState) => {
  if (windowSize.width >= breakpoints.tablet) return 5;
  return 3;
};

const BracesAnimation: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const windowSize = useWindowSize();
  const bracesCount = getBracesCount(windowSize);

  const createBraces = (symbol: string) =>
    Array(bracesCount)
      .fill(symbol)
      .map((brace: string, index: number) => (
        <Brace key={index} fullAnimationDuration={bracesCount * 0.5} braceNumber={index + 1}>
          {brace}
        </Brace>
      ));

  const bracesNormal = createBraces('>');
  const bracesReversed = createBraces('<');

  return (
    <BracesContainer>
      <div className='braces '>{bracesReversed}</div>
      <div className='text'>{children}</div>
      <div className='braces'>{bracesNormal}</div>
    </BracesContainer>
  );
};

export const DefaultBanner = ({ content }: DefaultBannerProps) => {
  return <BracesAnimation>{content.text}</BracesAnimation>;
};

const Banner = ({ content, renderContent }: BannerProps) => {
  return (
    <a target='_blank' rel='noreferrer' href={content.href}>
      <BannerContainer>{renderContent({ content })}</BannerContainer>
    </a>
  );
};

export default Banner;
