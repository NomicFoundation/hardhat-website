import React, { useState } from "react";
import { styled } from "linaria/react";
import { tm, tmDark, media, breakpoints } from "../../themes";

interface CopyButtonProps {
  code: string;
}

const Button = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.5;
  color: ${tm((t) => t.colors.copyButtonText)};
  background-color: ${tm((t) => t.colors.copyButtonBackground)};
  border: 1px solid ${tm((t) => t.colors.copyButtonBorder)};
  border-radius: 4px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s ease-in-out, background-color 0.2s ease-in-out;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  @media (hover: hover) {
    &:hover {
      background-color: ${tm((t) => t.colors.copyButtonHoverBackground)};
    }
  }

  &:active {
    transform: scale(0.95);
  }

  @media screen and (max-width: ${breakpoints.smd}px) {
    opacity: 1;
    top: 4px;
    right: 4px;
  }

  ${media.md} {
    padding: 4px 8px;
    font-size: 12px;
    min-width: auto;
    min-height: auto;
  }

  ${media.mqDark} {
    color: ${tmDark((t) => t.colors.copyButtonTextDark)};
    background-color: ${tmDark((t) => t.colors.copyButtonBackgroundDark)};
    border-color: ${tmDark((t) => t.colors.copyButtonBorderDark)};

    @media (hover: hover) {
      &:hover {
        background-color: ${tmDark((t) => t.colors.copyButtonHoverBackgroundDark)};
      }
    }
  }
`;

export const CopyButton: React.FC<CopyButtonProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Button 
      onClick={handleCopy}
      aria-label="Copy code to clipboard"
      className="copy-button"
    >
      {copied ? "Copied!" : "Copy"}
    </Button>
  );
};