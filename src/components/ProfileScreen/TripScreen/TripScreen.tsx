import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import useFetchModel from "customHooks/useFetchModel";
import AsideMenu from "components/shared/AsideMenu/AsideMenu";
import IconButton from "components/shared/IconButton/IconButton";
import useViewport from "customHooks/useViewport";
import UploadImagesModal from "./UploadImagesModal/UploadImagesModal";
import TripView from "./TripView/TripView";
import NewLocationModal from "./NewLocationModal/NewLocationModal";
import PostListView from "./PostListView/PostListView";

const StyledTripContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`;

const TripScreen: React.FC = () => {
  const { tripId } = useParams<{ uid?: string; tripId?: string }>();
  const { isMedium } = useViewport();
  const [showUploadImagesModal, setshowUploadImagesModal] = useState(false);
  const [showNewLocationModal, setShowNewLocationModal] = useState(false);

  const toggleUploadImagesModal = () => {
    setshowUploadImagesModal(!showUploadImagesModal);
  };
  const toggleNewLocationModal = () => {
    setShowNewLocationModal(!showNewLocationModal);
  };
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

  return !tripError ? (
    <StyledTripContainer>
      {isMedium ? <TripView trip={trip} /> : <PostListView trip={trip} />}

      <AsideMenu className="trip-aside-tools">
        <>
          <IconButton
            icon={"image"}
            onClick={toggleUploadImagesModal}
            tooltip="Upload images"
          />
          <IconButton
            icon={"map-marker-alt"}
            onClick={toggleNewLocationModal}
            tooltip="Create location"
          />
        </>
      </AsideMenu>
      {showUploadImagesModal && (
        <UploadImagesModal
          showModal={showUploadImagesModal}
          onCloseModal={toggleUploadImagesModal}
          trip={trip}
          getTrip={getTrip}
        />
      )}
      {showNewLocationModal && (
        <NewLocationModal
          closeNewLocationModal={toggleNewLocationModal}
          showNewLocationModal={showNewLocationModal}
          trip={trip}
          getTrip={getTrip}
        />
      )}
    </StyledTripContainer>
  ) : (
    <div>trip error</div>
  );
};

export default TripScreen;
