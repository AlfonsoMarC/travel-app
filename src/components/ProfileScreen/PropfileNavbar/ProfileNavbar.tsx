import React from "react";
import styled from "styled-components";
import NavbarIconItem from "components/shared/NavbarIconItem/NavbarIconItem";

const StyledNavbarContainer = styled.div`
  position: relative;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.color.primary200};
  padding: ${({ theme }) => theme.spacing.space2};
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
    margin-right: ${({ theme }) => theme.spacing.space16};
    background: transparent;
    border-bottom: none;
  }
`;

interface Props {
  urlUser?: string;
}

const ProfileNavbar: React.FC<Props> = ({ urlUser }) => {
  const profileUrl = `/profile/${urlUser}`;

  return (
    <StyledNavbarContainer>
      <ul>
        <NavbarIconItem to={`${profileUrl}/trips`} label="Trips" />
        <NavbarIconItem to={`${profileUrl}/friends`} label="Friends" />
      </ul>
    </StyledNavbarContainer>
  );
};

export default ProfileNavbar;
