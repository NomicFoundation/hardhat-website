import React, { ReactElement } from "react";
import { styled } from "linaria/react";
import GithubSlugger from "github-slugger";
import { media, tm, tmDark, tmSelectors } from "../../themes";
import MDLink from "./MDLink";

export interface Props {
  children: ReactElement | string;
}

const StyledH1 = styled.h1`
  margin-top: 48px;
  margin-bottom: 16px;
  font-size: 32px;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: 0.5px;
  color: ${tm(({ colors }) => colors.neutral800)};
  scroll-margin-top: 130px;
  & .hash {
    margin-left: -30px;
    margin-right: 7px;
    opacity: 0;
    cursor: pointer;
    color: ${tm(({ colors }) => colors.accent700)};
  }
  &:hover .hash {
    opacity: 1;

    &:hover {
      text-decoration: underline;
    }
  }
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

const StyledH2 = styled.h2`
  display: block;
  padding-top: 40px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${tm(({ colors }) => colors.neutral400)};
  font-weight: 600;
  font-size: 24px;
  line-height: 1.25;
  letter-spacing: 0.5px;
  color: ${tm(({ colors }) => colors.neutral800)};
  scroll-margin-top: 130px;
  & .hash {
    margin-left: -24px;
    opacity: 0;
    cursor: pointer;
    color: ${tm(({ colors }) => colors.accent900)};
  }
  &:hover .hash {
    opacity: 1;
    &:hover {
      text-decoration: underline;
    }
  }
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

const StyledH3 = styled.h3`
  margin-top: 32px;
  font-weight: 600;
  font-size: 21.6px;
  line-height: 1.25;
  letter-spacing: 0.5px;
  color: ${tm(({ colors }) => colors.neutral800)};
  scroll-margin-top: 130px;
  & .hash {
    margin-left: -24px;
    margin-right: 8px;
    opacity: 0;
    cursor: pointer;
    color: ${tm(({ colors }) => colors.accent900)};
  }
  &:hover .hash {
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
  & > span:hover {
    text-decoration: inherit;
  }
  & a {
    font-size: inherit;
    font-family: inherit;
    font-weight: inherit;
    line-height: inherit;
    color: inherit;
  }
`;
const StyledH4 = styled.h4`
  font-size: 16px;
  margin-top: 32px;
  font-weight: 600;
  font-size: 16px;
  line-height: 1.25;
  letter-spacing: 0.5px;
  color: ${tm(({ colors }) => colors.neutral800)};
  scroll-margin-top: 130px;
  & .hash {
    margin-left: -16px;
    margin-right: 4px;
    opacity: 0;
    cursor: pointer;
    color: ${tm(({ colors }) => colors.accent900)};
  }
  &:hover .hash {
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
const StyledH5 = styled.h5`
  margin-top: 24px;
  font-weight: 600;
  font-size: 13.2px;
  line-height: 1.25;
  letter-spacing: 0.5px;
  color: ${tm(({ colors }) => colors.neutral800)};
  scroll-margin-top: 130px;
  & .hash {
    margin-left: -16px;
    margin-right: 4px;
    opacity: 0;
    cursor: pointer;
    color: ${tm(({ colors }) => colors.accent900)};
  }
  &:hover .hash {
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

const slugger = new GithubSlugger();
const buildIdFromChildren = function getId(
  children: string | ReactElement
): string {
  if (typeof children === "string") {
    slugger.reset();
    return slugger.slug(children);
  }

  if (Array.isArray(children)) {
    return children
      .map((child) => {
        return getId(child);
      })
      .join(" ");
  }

  const hrefOnlyChildren = children?.props?.href;

  if (
    hrefOnlyChildren !== undefined &&
    typeof hrefOnlyChildren === "string" &&
    hrefOnlyChildren.startsWith("#")
  ) {
    return getId(hrefOnlyChildren.replace(/^#/g, ""));
  }

  return getId(children.props.children);
};

const H1 = ({ children }: Props) => {
  if (typeof children !== "string" && children.type === MDLink) {
    return (
      <StyledH1 id={buildIdFromChildren(children)}>
        <span className="hash">#</span>
        {children}
      </StyledH1>
    );
  }

  return (
    <StyledH1 id={buildIdFromChildren(children)}>
      <a href={`#${buildIdFromChildren(children)}`}>
        <span className="hash">#</span>
        {children}
      </a>
    </StyledH1>
  );
};

const H2 = ({ children }: Props) => {
  if (typeof children !== "string" && children.type === MDLink) {
    return (
      <StyledH2 id={buildIdFromChildren(children)}>
        <span className="hash">#</span>
        {children}
      </StyledH2>
    );
  }

  return (
    <StyledH2 id={buildIdFromChildren(children)}>
      <a href={`#${buildIdFromChildren(children)}`}>
        <span className="hash">#</span>
        {children}
      </a>
    </StyledH2>
  );
};

const H3 = ({ children }: Props) => {
  if (typeof children !== "string" && children.type === MDLink) {
    return (
      <StyledH3 id={buildIdFromChildren(children)}>
        <span className="hash">#</span>
        {children}
      </StyledH3>
    );
  }

  return (
    <StyledH3 id={buildIdFromChildren(children)}>
      <a href={`#${buildIdFromChildren(children)}`}>
        <span className="hash">#</span>
        {children}
      </a>
    </StyledH3>
  );
};

const H4 = ({ children }: Props) => {
  if (typeof children !== "string" && children.type === MDLink) {
    return (
      <StyledH4 id={buildIdFromChildren(children)}>
        <span className="hash">#</span>
        {children}
      </StyledH4>
    );
  }

  return (
    <StyledH4 id={buildIdFromChildren(children)}>
      <a href={`#${buildIdFromChildren(children)}`}>
        <span className="hash">#</span>
        {children}
      </a>
    </StyledH4>
  );
};

const H5 = ({ children }: Props) => {
  if (typeof children !== "string" && children.type === MDLink) {
    return (
      <StyledH5 id={buildIdFromChildren(children)}>
        <span className="hash">#</span>
        {children}
      </StyledH5>
    );
  }

  return (
    <StyledH5 id={buildIdFromChildren(children)}>
      <a href={`#${buildIdFromChildren(children)}`}>
        <span className="hash">#</span>
        {children}
      </a>
    </StyledH5>
  );
};

const Title = {
  H1,
  H2,
  H3,
  H4,
  H5,
};

export default Title;
