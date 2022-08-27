import React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { body, modalTitle } from "assets/mixins";
import Button from "components/shared/Button/Button";
import { Icon } from "../styles";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  ${({ theme }) => theme.media.atSmall} {
    width: 380px;
  }
  ${({ theme }) => theme.media.atMedium} {
    width: 400px;
  }
  .custom-modal-header {
    display: flex;
    align-items: flex-start;
    margin-bottom: ${({ theme }) => theme.spacing.space4};
  }
  .custom-modal-title {
    ${modalTitle};
    margin: 0;
  }
  .custom-modal-message {
    ${body};
    margin-bottom: ${({ theme }) => theme.spacing.space4};
  }
  .button-container {
    display: inline-flex;
    gap: ${({ theme }) => theme.spacing.space4};
    > button {
      flex: 1;
    }
  }
`;
interface Props {
  showModal: boolean;
  onCloseModal: () => void;
  onConfirm: () => void;
  title: string;
  message?: string;
  confirmLabel?: string;
  loading?: boolean;
}

const ConfirmModal: React.FC<Props> = ({
  showModal,
  onCloseModal,
  onConfirm,
  title,
  message,
  confirmLabel,
  loading
}) => {
  Modal.setAppElement("#root");

  return (
    <Modal
      isOpen={showModal}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <StyledContainer>
        <div className="custom-modal-header">
          <h2 className="custom-modal-title">{title}</h2>
          <Icon onClick={onCloseModal}>close</Icon>
        </div>
        <p className="custom-modal-message">{message}</p>
        <div className="button-container">
          <Button onClick={onCloseModal}>Cancel</Button>
          <Button onClick={onConfirm} loading={loading}>
            {confirmLabel ?? "Confirm"}
          </Button>
        </div>
      </StyledContainer>
    </Modal>
  );
};

export default ConfirmModal;
