import React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { modalTitle } from "assets/mixins";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  ${({ theme }) => theme.media.atSmall} {
    width: 380px;
    height: 500px;
  }

  ${({ theme }) => theme.media.atMedium} {
    width: 500px;
    height: 500px;
  }

  .custom-modal-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: ${({ theme }) => theme.spacing.space4};
  }

  .custom-modal-title {
    ${modalTitle};
    margin: 0;
  }

  .custom-modal-content {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
`;

const Icon = styled.span`
  font-family: "Material Icons";
  font-size: 24px;
  cursor: pointer;
`;

interface Props {
  showModal: boolean;
  onCloseModal: () => void;
  title: string;
  children: JSX.Element;
}

const CustomModal: React.FC<Props> = ({
  showModal,
  onCloseModal,
  title,
  children
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
        <div className="custom-modal-content">{children}</div>
      </StyledContainer>
    </Modal>
  );
};

export default CustomModal;
