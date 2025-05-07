// @ts-nocheck
import React from 'react';
import Image from 'next/image';
import { styled } from 'linaria/react';
import { media, tmSelectors } from '../../themes';

export interface Props {
  src: string;
  alt: string;
}

// TODO: solve the issue with badges
const ImageContainer = styled.div`
  max-width: 100%;
  position: relative;
  width: ${({ width }) => width};
  img {
    width: ${({ width }) => width};
    height: auto;
  }
  & .md-img {
    position: relative !important;
    height: unset !important;
  }
  &.light {
    display: block;
  }
  &.dark {
    display: none;
  }
  & span {
    padding: 0 !important;
  }

  span & div {
    width: 120px !important;
  }

  ${tmSelectors.dark} {
    &.light {
      display: none;
    }
    &.dark {
      display: block;
    }
  }
  ${media.mqDark} {
    ${tmSelectors.auto} {
      &.light {
        display: none;
      }
      &.dark {
        display: block;
      }
    }
  }
`;

const isShellBadge = (src: string): boolean => /img\.shields\.io/.test(src);
const isHardhatBadge = (alt: string): boolean => alt === 'hardhat';

const calcImgWidth = ({ isShellBdg, isHardhatBdg }) => {
  if (isHardhatBdg) return '140px';
  if (isShellBdg) return '80px';
  return null;
};

// Parse classes from alt text in format "alt#class1 class2"
const parseAltAndClasses = (altText: string): { alt: string; classes: string | null } => {
  if (!altText || !altText.includes('#')) {
    return { alt: altText, classes: null };
  }

  const [alt, ...classParts] = altText.split('#');
  const classes = classParts.join('#'); // Rejoin in case there were multiple # in the alt text

  return {
    alt: alt.trim(),
    classes: classes.trim() || null,
  };
};

const MDImage = ({ src, alt }: Props) => {
  const { alt: cleanAlt, classes: customClasses } = parseAltAndClasses(alt);
  const isHardhatBdg = isHardhatBadge(cleanAlt);
  const isShellBdg = isShellBadge(src);

  const containerClassName = [isHardhatBdg ? 'hardhat-badge' : '', customClasses].filter(Boolean).join(' ') || null;

  return (
    <ImageContainer width={calcImgWidth({ isHardhatBdg, isShellBdg })} className={containerClassName}>
      <Image
        className='md-img'
        src={src}
        alt={cleanAlt}
        width='100%'
        height='100%'
        quality={100}
        layout='responsive'
        objectFit='contain'
      />
    </ImageContainer>
  );
};

export default MDImage;
