import React from "react";
import styled from "styled-components";
/* import {
  useRouteMatch,
  useLocation,
  useHistory,
  BrowserRouter
} from "react-router-dom"; */
import NavbarIconItem from "components/shared/NavbarIconItem/NavbarIconItem";

const StyledNavbarContainer = styled.div`
  position: relative;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.color.primary200};
  ul {
    display: flex;
  }
  .nav-link {
    color: ${({ theme }) => theme.color.primary200};
    &.active {
      color: ${({ theme }) => theme.color.primary800};
    }
  }

  ${({ theme }) => theme.media.atMedium} {
    position: absolute;
    right: 0;
    z-index: 99;
    width: unset;
    padding-right: ${({ theme }) => theme.spacing.space16};
    background: transparent;
    border-bottom: none;
  }
`;

const ProfileNavbar: React.FC = () => {
  // const { url } = useRouteMatch();

  return (
    <StyledNavbarContainer>
      <ul>
        eeeee
        {/*  <NavbarIconItem to={`${url}/trips`} label="Trips" />
        <NavbarIconItem to={`${url}/locations`} label="Locations" />
        <NavbarIconItem to={`${url}/articles`} label="Articles" /> */}
      </ul>
    </StyledNavbarContainer>
  );
};

export default ProfileNavbar;
