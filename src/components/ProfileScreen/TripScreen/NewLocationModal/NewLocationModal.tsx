import React, { useState } from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";
import * as yup from "yup";
import TextInputField from "components/shared/InputField/index";
import Button from "components/shared/Button/Button";
import { LocationPayload, Trip } from "types/types";
import CustomModal from "components/shared/CustomModal/CustomModal";
import FileInput, {
  FileWithPreview
} from "components/shared/FileInput/FileInput";
import { useNavigate } from "react-router-dom";
import { createLocation, createPosts } from "../../api";

const StyledModalContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  form {
    display: flex;
    flex-direction: column;
    flex: 1;
    > button {
      margin-top: ${({ theme }) => theme.spacing.space3};
    }
    .location-name {
      margin-bottom: ${({ theme }) => theme.spacing.space2};
    }
  }
`;

interface Props {
  closeNewLocationModal: () => void;
  showNewLocationModal: boolean;
  trip: Trip;
  getTrip: () => void;
}

const NewLocationModal: React.FC<Props> = ({
  closeNewLocationModal,
  showNewLocationModal,
  trip,
  getTrip
}) => {
  const [createLocationLoading, setCreateLocationLoading] = useState(false);
  const [files, setFiles] = useState<FileWithPreview[] | []>([]);
  const navigate = useNavigate();
  const initialValues = {
    name: ""
  };
  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required")
  });

  const onChangeFiles = (files: FileWithPreview[]) => {
    setFiles(files);
  };

  const handleCreateLocation = async (values: LocationPayload) => {
    setCreateLocationLoading(true);
    const { error, location } = await createLocation({
      trip: trip._id,
      ...values
    });

    if (!error && location?._id && files.length) {
      await createPosts({
        files,
        location: location?._id,
        trip: trip._id
      });
    }
    await getTrip();
    navigate(`?location=${location?._id}`);
    closeNewLocationModal();
    return;
  };

  return (
    <CustomModal
      showModal={showNewLocationModal}
      onCloseModal={closeNewLocationModal}
      title={`Create a new location in ${trip.title}`}
    >
      <StyledModalContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={values => handleCreateLocation(values)}
        >
          {({ isValid, dirty }) => (
            <Form>
              <TextInputField
                name="name"
                placeholder="Name"
                className="location-name"
              />
              <FileInput files={files} onChangeFiles={onChangeFiles} />
              <Button
                type="submit"
                loading={createLocationLoading}
                disabled={!dirty || !isValid}
              >
                Save
              </Button>
            </Form>
          )}
        </Formik>
      </StyledModalContent>
    </CustomModal>
  );
};

export default NewLocationModal;
