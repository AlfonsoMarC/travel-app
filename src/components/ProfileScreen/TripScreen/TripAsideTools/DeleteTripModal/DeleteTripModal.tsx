import React, { useState } from "react";
import ConfirmModal from "components/shared/ConfirmModal/ConfirmModal";
import { Trip } from "types/types";
import { deleteTrip } from "components/ProfileScreen/api";
import { useNavigate } from "react-router-dom";

interface Props {
  showModal: boolean;
  onCloseModal: () => void;
  trip: Trip;
}

const DeleteTripModal: React.FC<Props> = ({
  showModal,
  onCloseModal,
  trip
}) => {
  const [deleteTripLoading, setDeleteTripLoading] = useState(false);
  let navigate = useNavigate();

  const handleConfirmDeleteTrip = async () => {
    setDeleteTripLoading(true);
    const { error } = await deleteTrip(trip._id);
    if (error) {
      alert("Error!");
    }
    setDeleteTripLoading(false);
    onCloseModal();
    navigate("../trips");
  };

  return (
    <ConfirmModal
      showModal={showModal}
      onCloseModal={onCloseModal}
      onConfirm={handleConfirmDeleteTrip}
      title={`Are you sure you want to delete ${trip.title}?`}
      message="If you delete this trip all its posts will be lost"
      loading={deleteTripLoading}
    />
  );
};

export default DeleteTripModal;
