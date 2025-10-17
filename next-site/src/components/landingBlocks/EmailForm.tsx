import React, { useEffect, useRef } from "react";
import { styled } from "linaria/react";
import Section from "../Section";
import LandingContainer from "../LandingContainer";
import { media, tm, tmDark, tmSelectors } from "../../themes";
import backgroundImageLight from "../../assets/email-form/bg-light-big.svg";
import backgroundImageDark from "../../assets/email-form/bg-dark-big.svg";
import Lines from "../../assets/email-form/lines";

export interface EmailFormProps {}

const FormSection = styled.section`
  position: relative;
  width: 100%;
  padding: 162px 0;
  background: transparent;
  overflow: hidden;
  margin-top: 100px;
  ${media.tablet} {
    padding: 242px 0;
  }
  ${media.laptop} {
    padding: 529px 0;
    margin-top: 0;
  }
  ${media.desktop} {
    padding: 690px 0;
  }
`;

const BackgroundImage = styled.div<{ image: string; imageDark: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  background-image: ${(props) => `url(${props.image})`};
  background-size: auto 660px;
  background-position: center;
  background-repeat: no-repeat;
  ${tmSelectors.dark} {
    background-image: ${(props) => `url(${props.imageDark})`};
  }
  ${media.mqDark} {
    ${tmSelectors.auto} {
      background-image: ${(props) => `url(${props.imageDark})`};
    }
  }
  ${media.tablet} {
    background-size: auto 860px;
  }
  ${media.laptop} {
    background-size: auto 100%;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 352px;
  margin: 0 auto;
  gap: 16px;

  ${media.tablet} {
    gap: 24px;
    max-width: 377px;
  }
  ${media.laptop} {
    max-width: 665px;
    padding-top: 0;
    gap: 32px;
  }
`;

const FormTitle = styled.h2`
  font-family: "Source Code Pro", monospace;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.35;
  letter-spacing: 0.045em;
  margin: 0;
  text-align: center;
  color: ${tm(({ colors }) => colors.gray9)};

  ${tmSelectors.dark} {
    color: ${tmDark(({ colors }) => colors.gray8b)};
  }
  ${media.mqDark} {
    ${tmSelectors.auto} {
      color: ${tmDark(({ colors }) => colors.gray8b)};
    }
  }
  ${media.tablet} {
    font-size: 20px;
  }
  ${media.laptop} {
    font-size: 31px;
  }
  ${media.desktop} {
    font-size: 39px;
  }
`;

const FormRow = styled.div`
  display: flex;
  width: 100%;
  max-width: 300px;
  gap: 32px;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button.lg {
    height: 44px;
    font-size: 12px;
  }
  ${media.tablet} {
    max-width: 665px;
  }
  ${media.laptop} {
    flex-direction: row;
    button.lg {
      height: 56px;
      font-size: 14px;
    }
  }
  ${media.desktop} {
    button.lg {
      font-size: 16px;
    }
  }
`;

const LinesContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: max-content;
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: -24px;
  .lines {
    stroke: #ededee;
  }
  ${tmSelectors.dark} {
    .lines {
      stroke: #1c1f23;
    }
  }
  ${media.mqDark} {
    ${tmSelectors.auto} {
      .lines {
        stroke: #1c1f23;
      }
    }
  }
`;

const GhostFormContainer = styled.div`
  width: 400px;
  max-width: 100%;
`;

const EmailForm: React.FC<EmailFormProps> = () => {
  const ghostFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ghostFormRef.current && ghostFormRef.current.childElementCount === 0) {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/ghost/signup-form@~0.2/umd/signup-form.min.js";
      script.async = true;
      script.setAttribute("data-button-color", "#FFF100");
      script.setAttribute("data-button-text-color", "#181A1F");
      script.setAttribute("data-site", "https://blog.nomic.foundation/");
      script.setAttribute("data-locale", "en");

      ghostFormRef.current.appendChild(script);
    }
  }, []);

  return (
    <Section clearPadding>
      <LinesContainer>
        <Lines />
      </LinesContainer>
      <FormSection>
        <LandingContainer>
          <BackgroundImage
            image={backgroundImageLight.src}
            imageDark={backgroundImageDark.src}
          />
          <FormContainer>
            <FormTitle>
              Tell me about new product features as they come out
            </FormTitle>
            <FormRow>
              <GhostFormContainer ref={ghostFormRef} />
            </FormRow>
          </FormContainer>
        </LandingContainer>
      </FormSection>
    </Section>
  );
};

export default EmailForm;
