import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Location } from "types/types";

const LocationListItemContainer = styled.li<{
  $showActions: boolean;
}>`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing.space};
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.color.black};
  padding: ${({ theme }) => theme.spacing.space};
  .header {
    display: flex;
    justify-content: space-between;
    a {
      color: ${({ theme }) => theme.color.black};
    }
  }
  .actions {
    height: ${({ $showActions }) => ($showActions ? "auto" : "0px")};
    overflow: hidden;
  }
`;

const LocationIcon = styled.span`
  font-family: "Material Icons";
  cursor: pointer;
`;

const ContextMenuIcon = styled.span`
  font-family: "Material Icons";
  cursor: pointer;
`;

const Action = styled.div`
  cursor: pointer;
`;

interface Props {
  location: Location;
  unfoldedLocationId: String;
  handleUnfoldedLocationChange: (locationId: String) => void;
}

const LocationListItem: React.FC<Props> = ({
  location,
  unfoldedLocationId,
  handleUnfoldedLocationChange
}) => {
  const toggleActions = () => {
    handleUnfoldedLocationChange(location._id);
  };

  return (
    <LocationListItemContainer
      $showActions={unfoldedLocationId === location._id}
    >
      <div className="header">
        <Link to={`?location=${location._id}`}>
          <LocationIcon>location_on</LocationIcon>
          <span>{location.name}</span>
        </Link>
        <ContextMenuIcon onClick={toggleActions}>more_horiz</ContextMenuIcon>
      </div>
      <div className="actions">
        <Action>Delete</Action>
      </div>
    </LocationListItemContainer>
  );
};

export default LocationListItem;
