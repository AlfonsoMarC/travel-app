import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { logout } from "actions/auth";
import NavbarIconItem from "components/shared/NavbarIconItem/NavbarIconItem";

const StyledNavbarContainer = styled.div`
  flex-shrink: 0;
  display: grid;
  grid-template-columns: 180px 1fr 80px;
  height: 56px;
  background-color: ${({ theme }) => theme.color.primary500};
  align-items: center;
  padding: ${({ theme }) => theme.spacing.space2}
    ${({ theme }) => theme.spacing.space5};
`;

const StyledLink = styled(Link)`
  width: 300px;
  color: ${({ theme }) => theme.color.primary100};
  &:hover {
    color: ${({ theme }) => theme.color.white};
  }
`;

const StyledMenu = styled.ul`
  display: flex;
  flex: 1;
  .nav-link {
    color: ${({ theme }) => theme.color.primary100};
    &.active {
      color: ${({ theme }) => theme.color.white};
    }
  }
`;

const StyledLogoutContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  > button {
    color: ${({ theme }) => theme.color.primary100};
    &:hover {
      color: ${({ theme }) => theme.color.white};
    }
  }
`;

const Navbar: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <StyledNavbarContainer>
      <div>
        <StyledLink to="/">Travel App</StyledLink>
      </div>
      <StyledMenu>
        <NavbarIconItem to="/home" icon="home" label="Home" />
        <NavbarIconItem to="/profile" icon="perm_identity" label="Profile" />
      </StyledMenu>
      <StyledLogoutContainer>
        <button onClick={handleLogout}>Logout</button>
      </StyledLogoutContainer>
    </StyledNavbarContainer>
  );
};

export default Navbar;
