import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Location } from "types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  location: Location;
}

const LocationListItemContainer = styled.li`
  margin: ${({ theme }) => theme.spacing.space};
  a {
    color: ${({ theme }) => theme.color.black};
  }
  span {
    margin-left: ${({ theme }) => theme.spacing.space};
  }
`;

const LocationListItem: React.FC<Props> = ({ location }) => {
  return (
    <LocationListItemContainer>
      <Link to={`?location=${location._id}`}>
        <FontAwesomeIcon icon="map-marker-alt" size="1x" />
        <span>{location.name}</span>
      </Link>
    </LocationListItemContainer>
  );
};

export default LocationListItem;
