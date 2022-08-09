import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { labelS } from "assets/mixins";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const StyledContainer = styled.div`
  .icon {
    position: relative;
    background-color: ${({ theme }) => theme.color.white};
    color: ${({ theme }) => theme.color.black};
    border-radius: 50%;
    padding: 15px;
    margin: 10px;
    width: 12px;
    height: 12px;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  ${({ theme }) => theme.media.atSmall} {
    .tooltip {
      position: absolute;
      top: 0;
      ${labelS};
      padding: 5px 8px;
      border-radius: 5px;
      box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
      opacity: 0;
      pointer-events: none;
      transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      white-space: pre;
      margin: 4px;
    }

    .tooltip::before {
      position: absolute;
      content: "";
      height: 8px;
      width: 8px;
      bottom: -3px;
      left: 50%;
      transform: translate(-50%) rotate(45deg);
      transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    .icon:hover .tooltip {
      top: -45px;
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }

    .icon:hover span,
    .icon:hover .tooltip {
      text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.1);
    }

    .logo:hover,
    .logo:hover .tooltip,
    .logo:hover .tooltip::before {
      background-color: ${({ theme }) => theme.color.primary500};
      color: ${({ theme }) => theme.color.white};
    }
    .tooltip,
    .tooltip::before {
      z-index: 99;
    }
  }
`;

interface Props {
  className?: string;
  icon: IconProp;
  tooltip?: string;
  onClick: () => void;
}

const IconButton: React.FC<Props> = ({ className, icon, tooltip, onClick }) => {
  return (
    <StyledContainer className={className} onClick={onClick}>
      <div className="wrapper">
        <div className="icon logo">
          {tooltip && <div className="tooltip">{tooltip}</div>}
          <span>
            <FontAwesomeIcon icon={icon} size="1x" />
          </span>
        </div>
      </div>
    </StyledContainer>
  );
};

export default IconButton;
