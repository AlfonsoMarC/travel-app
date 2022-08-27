import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import useFetchModel from "customHooks/useFetchModel";
import useViewport from "customHooks/useViewport";
import TripView from "./TripView/TripView";
import PostListView from "./PostListView/PostListView";
import TripAsideTools from "./TripAsideTools/TripAsideTools";

const StyledTripContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`;

const TripScreen: React.FC = () => {
  const { tripId } = useParams<{ uid?: string; tripId?: string }>();
  const { isMedium } = useViewport();

  const [{ loading: tripLoading, result: trip, error: tripError }, fetchModel] =
    useFetchModel({
      loading: true
    });

  const getTrip = useCallback(() => {
    fetchModel({ model: "trips", modelId: tripId });
  }, [fetchModel, tripId]);

  useEffect(() => {
    getTrip();
  }, [getTrip]);

  if (tripLoading) {
    return null;
  }

  return (
    <StyledTripContainer id="trip-screen-container">
      {!tripError ? (
        <>
          {isMedium ? <TripView trip={trip} /> : <PostListView trip={trip} />}
          <TripAsideTools trip={trip} getTrip={getTrip} />
        </>
      ) : (
        <div id="trip-screen-error">trip error</div>
      )}
    </StyledTripContainer>
  );
};

export default TripScreen;
