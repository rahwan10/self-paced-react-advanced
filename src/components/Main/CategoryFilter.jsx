import { useCategory } from "../../CategoryStore";
import styled from "styled-components";
import foodCategory from "../../data/foodCategory";
import "../styles/default.css";

const RestaurantFilterContainer = styled.section`
  display: flex;
  justify-content: space-between;

  padding: 0 16px;
  margin-top: 24px;
`;
const SelectedCategory = styled.select`
  height: 44px;
  min-width: 125px;

  border: 1px solid #d0d5dd;
  border-radius: 8px;
  background: transparent;

  font-size: 16px;
  padding: 8px;
`;
function CategoryFilter() {
  const category = useCategory((state) => state.category);
  const setCategory = useCategory((state) => state.setCategory);
  return (
    <RestaurantFilterContainer>
      <SelectedCategory
        name="category"
        id="category-filter"
        className="restaurant-filter"
        aria-label="음식점 카테고리 필터"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="전체">전체</option>
        {foodCategory.map((categoryName) => (
          <option key={categoryName} value={categoryName}>
            {categoryName}
          </option>
        ))}
      </SelectedCategory>
    </RestaurantFilterContainer>
  );
}

export default CategoryFilter;
