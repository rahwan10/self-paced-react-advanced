import PropTypes from "prop-types";
import { useRef } from "react";
import foodCategory from "../../data/foodCategory";
import styled from "styled-components";
import Modal from "../Modal";

const ModalTitle = styled.h2`
  margin-bottom: 36px;
`;

const FormItem = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 36px;
  padding-left: 4px;
`;

const NameInput = styled.input`
  height: 44px;
  padding: 8px;
  margin: 6px 0;

  border: 1px solid #d0d5dd;
  border-radius: 8px;

  font-size: 16px;
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
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
`;

const Label = styled.label`
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;

  &.required::after {
    content: "*";
    padding-left: 4px;
    color: #ec4a0a;
  }
`;

const Select = styled.select`
  padding: 8px;
  margin: 6px 0;

  border: 1px solid #d0d5dd;
  border-radius: 8px;

  font-size: 16px;
`;

const Textarea = styled.textarea`
  padding: 8px;
  margin: 6px 0;

  border: 1px solid #d0d5dd;
  border-radius: 8px;

  font-size: 16px;
`;
function AddRestaurantModal({ handleClickAddRestaurant }) {
  const nameRef = useRef();
  const categoryRef = useRef();
  const descriptionRef = useRef();

  const handleAdd = () => {
    if (!nameRef.current.value || !categoryRef.current.value) {
      alert("카테고리와 이름은 필수 입력값입니다.");
      return;
    }
    const newRestaurant = {
      category: categoryRef.current.value,
      name: nameRef.current.value,
      description: descriptionRef.current.value,
    };
    handleClickAddRestaurant(newRestaurant);
  };
  return (
    <Modal>
      <ModalTitle>음식점 추가하기</ModalTitle>
      <form>
        <FormItem className="form-item form-item--required">
          <Label htmlFor="category" className="text-caption">
            카테고리
          </Label>
          <Select id="category" name="category" required ref={categoryRef}>
            <option value="">선택해 주세요</option>
            {foodCategory.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </Select>
        </FormItem>

        <FormItem className="form-item form-item--required">
          <Label htmlFor="name" className="text-caption">
            이름
          </Label>
          <NameInput type="text" name="name" id="name" required ref={nameRef} />
        </FormItem>

        <FormItem className="form-item">
          <Label htmlFor="description" className="text-caption">
            설명
          </Label>
          <Textarea
            name="description"
            id="description"
            cols="30"
            rows="5"
            ref={descriptionRef}
          />
          <span className="help-text text-caption">
            메뉴 등 추가 정보를 입력해 주세요.
          </span>
        </FormItem>

        <ButtonContainer>
          <Button type="submit" onClick={() => handleAdd()}>
            추가하기
          </Button>
        </ButtonContainer>
      </form>
    </Modal>
  );
}
AddRestaurantModal.propTypes = {
  handleClickAddRestaurant: PropTypes.func.isRequired,
};
export default AddRestaurantModal;
