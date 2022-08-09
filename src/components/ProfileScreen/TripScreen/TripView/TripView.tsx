import React, { useState } from "react";
import styled from "styled-components";
import { Trip } from "types/types";
import { useSearchParams } from "react-router-dom";
import { h2Title } from "assets/mixins";
import LocationList from "./LocationList/LocationList";
import LocationView from "./LocationView/LocationView";

const StyledTripViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  .trip-header-container {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    h2 {
      ${h2Title};
    }
  }
  .trip-content-container {
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    > .central-content {
      display: grid;
      grid-template-columns: 1fr 4fr;
      height: 100%;
    }
  }

  .aside-content {
    top: 0;
    position: absolute;
    right: 82px;
    width: calc(24% - 82px);
    height: 100%;
    border: 1px solid black;
  }
`;

interface Props {
  trip: Trip;
}

const TripView: React.FC<Props> = ({ trip }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const locationId = searchParams.get("location");
  const location = trip.locations?.find(
    location => location._id === locationId
  );
  const tripPosts = trip.posts ?? [];
  const filteredPosts = locationId
    ? tripPosts.filter(post => post.location === locationId)
    : tripPosts;

  const tripTitle = `${trip.title}${location ? `: ${location.name}` : ""}`;

  const onClickLocationListHeader = () => {
    setSearchParams({});
  };

  return (
    <StyledTripViewContainer>
      <div className="trip-header-container">
        <h2>{tripTitle}</h2>
      </div>
      <div className="trip-content-container">
        <div className="central-content">
          <LocationList
            locations={trip.locations ?? []}
            onClickLocationListHeader={onClickLocationListHeader}
          />
          <LocationView posts={filteredPosts} />
        </div>
        <div className="aside-content" />
      </div>
    </StyledTripViewContainer>
  );
};

export default TripView;
