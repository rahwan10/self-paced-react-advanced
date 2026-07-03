import PropTypes from "prop-types";
import styled from "styled-components";
import Modal from "../Modal";
import "../styles/default.css";

const ModalTitle = styled.h2`
  margin-bottom: 36px;
`;

const RestaurantInfo = styled.div`
  margin-bottom: 24px;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const Button = styled.button`
  width: 100%;
  height: 44px;

  margin-right: 16px;

  border: none;
  border-radius: 8px;

  font-weight: 600;
  cursor: pointer;
  background: #ec4a0a;

  color: #ffffff;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
`;

function RestaurantDetailModal({ setIsDetailModal, selectedRestaurant }) {
  return (
    <Modal onClose={() => setIsDetailModal(false)}>
      <ModalTitle>{selectedRestaurant.name}</ModalTitle>
      <RestaurantInfo>
        <Description>{selectedRestaurant.description}</Description>
      </RestaurantInfo>
      <ButtonContainer>
        <Button onClick={() => setIsDetailModal(false)}>닫기</Button>
      </ButtonContainer>
    </Modal>
  );
}

RestaurantDetailModal.propTypes = {
  setIsDetailModal: PropTypes.func.isRequired,
  selectedRestaurant: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};
export default RestaurantDetailModal;
