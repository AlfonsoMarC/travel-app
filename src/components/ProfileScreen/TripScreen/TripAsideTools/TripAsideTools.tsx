import React, { useState } from "react";
import AsideMenu from "components/shared/AsideMenu/AsideMenu";
import IconButton from "components/shared/IconButton/IconButton";
import { Trip } from "types/types";
import UploadImagesModal from "./UploadImagesModal/UploadImagesModal";
import NewLocationModal from "./NewLocationModal/NewLocationModal";
import DeleteTripModal from "./DeleteTripModal/DeleteTripModal";

interface Props {
  trip: Trip;
  getTrip: () => void;
}

const TripAsideTools: React.FC<Props> = ({ trip, getTrip }) => {
  const [showUploadImagesModal, setshowUploadImagesModal] = useState(false);
  const [showNewLocationModal, setShowNewLocationModal] = useState(false);
  const [showDeleteTripModal, setshowDeleteTripModal] = useState(false);

  const toggleUploadImagesModal = () => {
    setshowUploadImagesModal(!showUploadImagesModal);
  };
  const toggleNewLocationModal = () => {
    setShowNewLocationModal(!showNewLocationModal);
  };
  const toggleDeleteTripModal = () => {
    setshowDeleteTripModal(!showDeleteTripModal);
  };
  return (
    <>
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
          <IconButton
            icon={"trash"}
            onClick={toggleDeleteTripModal}
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
          showModal={showNewLocationModal}
          onCloseModal={toggleNewLocationModal}
          trip={trip}
          getTrip={getTrip}
        />
      )}
      {showDeleteTripModal && (
        <DeleteTripModal
          showModal={showDeleteTripModal}
          onCloseModal={toggleDeleteTripModal}
          trip={trip}
        />
      )}
    </>
  );
};

export default TripAsideTools;
