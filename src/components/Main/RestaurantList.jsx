import PropTypes from "prop-types";
import styled from "styled-components";
import { useCategory } from "../../CategoryStore";
import "../styles/default.css";

import korean from "../../../templates/category-korean.png";
import chinese from "../../../templates/category-chinese.png";
import japanese from "../../../templates/category-japanese.png";
import western from "../../../templates/category-western.png";
import asian from "../../../templates/category-asian.png";
import etc from "../../../templates/category-etc.png";

const categoryImage = {
  한식: korean,
  중식: chinese,
  일식: japanese,
  양식: western,
  아시안: asian,
  기타: etc,
};

const RestaurantListContainer = styled.section`
  display: flex;
  flex-direction: column;

  padding: 0 16px;
  margin: 16px 0;
`;

const Restaurant = styled.div`
  display: flex;
  align-items: flex-start;

  padding: 16px 8px;

  border-bottom: 1px solid #e9eaed;
`;
const RestaurantCategory = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  min-width: 64px;
  min-height: 64px;

  margin-right: 16px;

  border-radius: 50%;
  background: #f6a88a;
`;

const IconImage = styled.img`
  width: 36px;
  height: 36px;
`;

const RestaurantInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const RestaurantName = styled.h3`
  margin: 0;
`;

const RestaurantDescription = styled.p`
  display: -webkit-box;

  padding-top: 8px;

  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

function RestaurantList({ totalRestaurants, handleClickRestaurantList }) {
  const category = useCategory((state) => state.category);

  const filteredRestaurants =
    category === "전체"
      ? totalRestaurants
      : totalRestaurants.filter((r) => r.category === category);
  return (
    <RestaurantListContainer>
      <ul className="restaurant-list">
        {filteredRestaurants.map((r) => (
          <Restaurant
            key={r.id}
            role="button"
            tabIndex={0}
            aria-label="상세보기"
            onClick={() => {
              handleClickRestaurantList(r);
            }}
            onKeyDown={() => handleClickRestaurantList(r)}
            className="restaurant"
          >
            <RestaurantCategory>
              <IconImage
                src={categoryImage[r.category]}
                alt={r.category}
                className="category-icon"
              />
            </RestaurantCategory>
            <RestaurantInfo>
              <RestaurantName>{r.name}</RestaurantName>
              <RestaurantDescription>{r.description}</RestaurantDescription>
            </RestaurantInfo>
          </Restaurant>
        ))}
      </ul>
    </RestaurantListContainer>
  );
}

RestaurantList.propTypes = {
  totalRestaurants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      category: PropTypes.string,
      description: PropTypes.string,
    }),
  ).isRequired,
  handleClickRestaurantList: PropTypes.func.isRequired,
};

export default RestaurantList;
