import React, { useState } from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";
import * as yup from "yup";
import "react-day-picker/lib/style.css";
import CustomDatePicker from "components/shared/CustomDatePicker/CustomDatePicker";
import TextInputField from "components/shared/InputField/index";
import TextareaField from "components/shared/TextareaField";
import Button from "components/shared/Button/Button";
import CustomModal from "components/shared/CustomModal/CustomModal";
import { useNavigate } from "react-router-dom";
import { TripPayload } from "types/types";
import { createTrip } from "../../api";

const StyledModalContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  form {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .date-container {
    display: flex;
    justify-content: space-between;
  }
  .CustomDatePicker.right {
    .DayPickerInput-Overlay {
      right: 0;
      left: unset;
    }
  }

  ${({ theme }) => theme.media.atSmall} {
    .date-container {
      justify-content: unset;
      gap: 20px;
    }
    .CustomDatePicker.right {
      .DayPickerInput-Overlay {
        right: unset;
        left: 0;
      }
    }
  }
`;

const StyledTextareaField = styled(TextareaField)`
  background: ${({ theme }) => theme.color.white};
`;

interface Props {
  closeNewTripModal: () => void;
  showNewTripModal: boolean;
}

const NewTripModal: React.FC<Props> = ({
  closeNewTripModal,
  showNewTripModal
}) => {
  const [createTripLoading, setCreateTripLoading] = useState(false);
  const initialValues = {
    title: "",
    startDate: new Date(),
    endDate: new Date(),
    description: ""
  };
  const validationSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    startDate: yup.date().required("Enter a valid date"),
    endDate: yup.date().required("Enter a valid date"),
    description: yup.string().max(200, "Max 200 characters")
  });

  let navigate = useNavigate();

  const handleCreateTrip = async (values: TripPayload) => {
    setCreateTripLoading(true);
    const { error, id } = await createTrip(values);
    setCreateTripLoading(false);
    if (!error && id) {
      navigate(`../trip/${id}`);
    }
    return;
  };

  return (
    <CustomModal
      showModal={showNewTripModal}
      onCloseModal={closeNewTripModal}
      title="Create new trip"
    >
      <StyledModalContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={values => handleCreateTrip(values)}
        >
          {({ values, isValid, dirty }) => (
            <Form>
              <TextInputField name="title" placeholder="Title" />
              <div className="date-container">
                <CustomDatePicker
                  title="Start Date"
                  name="startDate"
                  value={values.startDate}
                />
                <CustomDatePicker
                  title="End Date"
                  name="endDate"
                  disableBeforeDate={values.startDate}
                  value={values.endDate}
                  className="right"
                />
              </div>
              <StyledTextareaField
                name="description"
                placeholder="Add a description (max 200 characters)..."
              />

              <Button
                type="submit"
                loading={createTripLoading}
                disabled={!isValid || !dirty}
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

export default NewTripModal;
