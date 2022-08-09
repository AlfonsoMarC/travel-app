import React, { useState } from "react";
import styled from "styled-components";
import CustomModal from "components/shared/CustomModal/CustomModal";
import FileInput, {
  FileWithPreview
} from "components/shared/FileInput/FileInput";
import Button from "components/shared/Button/Button";
import { Trip } from "types/types";
import Select, { Option } from "components/shared/Select/Select";
import { createPosts } from "../../api";

const StyledModalContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  button {
    margin-top: ${({ theme }) => theme.spacing.space4};
  }
`;

interface Props {
  showModal: boolean;
  onCloseModal: () => void;
  trip: Trip;
  getTrip: () => void;
}

const UploadImagesModal: React.FC<Props> = ({
  showModal,
  onCloseModal,
  trip,
  getTrip
}) => {
  const [files, setFiles] = useState<FileWithPreview[] | []>([]);
  const [saveLoading, setsaveLoading] = useState(false);

  const locationSelectOptions =
    trip.locations?.map(location => ({
      value: location._id,
      label: location.name
    })) ?? [];
  const [location, setLocation] = useState<Option>(
    locationSelectOptions?.[0] ?? null
  );

  const onChangeLocation = (newLocation: Option) => {
    setLocation(newLocation);
  };

  const onChangeFiles = (files: FileWithPreview[]) => {
    setFiles(files);
  };

  const handleSave = async () => {
    setsaveLoading(true);
    await createPosts({
      files: files,
      trip: trip._id
    });
    await getTrip();
    onCloseModal();
  };
  return (
    <CustomModal
      title={`Upload images to ${trip.title}`}
      showModal={showModal}
      onCloseModal={onCloseModal}
    >
      <StyledModalContent>
        <Select
          options={locationSelectOptions}
          selectedOption={location}
          onChangeOption={onChangeLocation}
        />
        <FileInput files={files} onChangeFiles={onChangeFiles} />
        <Button
          onClick={handleSave}
          loading={saveLoading}
          disabled={!files.length}
        >
          Save
        </Button>
      </StyledModalContent>
    </CustomModal>
  );
};

export default UploadImagesModal;
