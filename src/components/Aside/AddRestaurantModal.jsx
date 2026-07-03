import { useRef } from 'react';
import PropTypes from 'prop-types';
import '../styles/default.css';
import '../styles/AddRestaurantModal.css';
import foodCategory from '../../data/foodCategory';
import Modal from '../Modal';

function AddRestaurantModal({ handleClickAddRestaurant }) {
  const nameRef = useRef();
  const categoryRef = useRef();
  const descriptionRef = useRef();

  const handleAdd = () => {
    if (!nameRef.current.value || !categoryRef.current.value) {
      alert('카테고리와 이름은 필수 입력값입니다.');
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
      <h2 className="modal-title text-title">새로운 음식점</h2>
      <form>
        <div className="form-item form-item--required">
          <label htmlFor="category" className="text-caption">
            카테고리
          </label>
          <select id="category" name="category" required ref={categoryRef}>
            <option value="">선택해 주세요</option>
            {foodCategory.map((r) => (
              <option value={r}>{r}</option>
            ))}
          </select>
        </div>

        <div className="form-item form-item--required">
          <label htmlFor="name" className="text-caption">
            이름
          </label>
          <input type="text" name="name" id="name" required ref={nameRef} />
        </div>

        <div className="form-item">
          <label htmlFor="description" className="text-caption">
            설명
          </label>
          <textarea name="description" id="description" cols="30" rows="5" ref={descriptionRef} />
          <span className="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
        </div>

        <div className="button-container">
          <button
            type="submit"
            onClick={() => handleAdd()}
            className="button button--primary text-caption"
          >
            추가하기
          </button>
        </div>
      </form>
    </Modal>
  );
}
AddRestaurantModal.propTypes = {
  handleClickAddRestaurant: PropTypes.func.isRequired,
};
export default AddRestaurantModal;
