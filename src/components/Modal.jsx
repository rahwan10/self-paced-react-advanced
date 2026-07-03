import PropTypes from "prop-types";
import styled from "styled-components";
const OpenModal = styled.div`
  display: block;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background: rgba(0, 0, 0, 0.35);
`;

const ModalContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;

  padding: 32px 16px;

  border-radius: 8px 8px 0px 0px;
  background: #ffffff;
`;
function Modal({ children, onClose }) {
  return (
    <OpenModal>
      <ModalBackdrop
        role="button"
        tabIndex={0}
        aria-label="모달 닫기"
        onKeyDown={onClose}
        onClick={onClose}
      />
      <ModalContainer>{children}</ModalContainer>
    </OpenModal>
  );
}
export default Modal;

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};
