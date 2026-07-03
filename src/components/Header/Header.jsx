import PropTypes from "prop-types";
import addButton from "../../../templates/add-button.png";
import styled from "styled-components";
import "../styles/default.css";

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;

  padding: 0 16px;

  background-color: #ec4a0a;
`;

const Title = styled.h1`
  color: #fcfcfd;
`;

const AddButton = styled.button`
  height: 40px;

  border: none;
  border-radius: 8px;
  background: transparent;

  font-size: 24px;
  cursor: pointer;
`;

const AddButtonImage = styled.img`
  display: block;
  width: 40px;
  height: 40px;
  object-fit: contain;
`;
function Header({ setIsAddModal }) {
  return (
    <HeaderWrapper>
      <Title>점심 뭐 먹지</Title>
      <AddButton
        type="button"
        onClick={() => setIsAddModal(true)}
        className="gnb__button"
        aria-label="음식점추가"
      >
        <AddButtonImage src={addButton} alt="음식점 추가" />
      </AddButton>
    </HeaderWrapper>
  );
}

Header.propTypes = {
  setIsAddModal: PropTypes.func.isRequired,
};
export default Header;
