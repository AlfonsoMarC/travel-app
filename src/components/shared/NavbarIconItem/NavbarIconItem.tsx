import React from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledListItem = styled.li<{ $withIcon: boolean }>`
  margin: 0px ${({ theme }) => theme.spacing.space2};

  ${({ $withIcon }) => {
    if ($withIcon) {
      return css`
        .navbar-menu-item.icon {
          font-family: "Material Icons";
          ${({ theme }) => theme.media.atMedium} {
            display: none;
          }
        }
        .navbar-menu-item.label {
          display: none;
          ${({ theme }) => theme.media.atMedium} {
            display: flex;
          }
        }
      `;
    }
  }}
`;

interface Props {
  to: string;
  icon?: string;
  label: string;
}

const NavbarIconItem: React.FC<Props> = ({ to, icon, label }) => {
  return (
    <StyledListItem $withIcon={Boolean(icon)}>
      <NavLink className="nav-link" to={to}>
        <span className="navbar-menu-item icon">{icon}</span>
        <span className="navbar-menu-item label">{label}</span>
      </NavLink>
    </StyledListItem>
  );
};

export default NavbarIconItem;
