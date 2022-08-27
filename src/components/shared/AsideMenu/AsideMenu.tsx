import React from "react";
import styled from "styled-components";

const StyledAsideContainer = styled.div`
  display: flex;
  align-items: center;
  z-index: 99;
  width: 100%;
  bottom: 0;
  padding: 0 ${({ theme }) => theme.spacing.space4};
  background: ${({ theme }) => theme.color.white};
  border-top: 1px solid ${({ theme }) => theme.color.primary50};
  && .icon {
    background-color: ${({ theme }) => theme.color.bg};
    color: ${({ theme }) => theme.color.primary500};
    box-shadow: none;
  }
  && .icon-tooltip {
    display: none;
  }

  ${({ theme }) => theme.media.atMedium} {
    position: absolute;
    flex-direction: column;
    width: unset;
    height: 100%;
    bottom: unset;
    top: 60px;
    right: ${({ theme }) => theme.spacing.space4};
    padding: ${({ theme }) => theme.spacing.space3};
    background: transparent;
    border-top: none;
  }
`;

interface Props {
  className?: string;
  children: JSX.Element;
}

const AsideMenu: React.FC<Props> = ({ className, children }) => {
  return (
    <StyledAsideContainer className={className}>
      {children}
    </StyledAsideContainer>
  );
};

export default AsideMenu;
