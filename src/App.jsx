import { useState } from "react";
import Header from "./components/Header/Header";
import CategoryFilter from "./components/Main/CategoryFilter";
import RestaurantList from "./components/Main/RestaurantList";
import RestaurantDetailModal from "./components/Aside/RestaurantDetailModal";
import AddRestaurantModal from "./components/Aside/AddRestaurantModal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

function App() {
  // 상태값
  const [isDetailModal, setIsDetailModal] = useState(false);

  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);

  const [isAddModal, setIsAddModal] = useState(false);

  const client = useQueryClient();
  
  async function fetchRestaurants() {
    const res = await fetch("http://localhost:3000/restaurants");
    const data = await res.json();
    return data;
  }

  const { data: totalRestaurants = [] } = useQuery({
    queryKey: ["restaurants"],
    queryFn: fetchRestaurants,
  });

  const selectedRestaurant = totalRestaurants.find(
    (r) => r.id === selectedRestaurantId,
  );

  //  핸들러
  const handleClickRestaurantList = (r) => {
    setIsDetailModal(true);
    setSelectedRestaurantId(r.id);
  };

  const addRestaurant = async (newRestaurant) => {
    await fetch("http://localhost:3000/restaurants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRestaurant),
    });
  };
  const { mutate } = useMutation({
    mutationFn: addRestaurant,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["restaurants"] });
    },
  });

  const handleClickAddRestaurant = async (newRestaurant) => {
    mutate(newRestaurant);
    console.log("음식점 추가 완료");
    setIsAddModal(false);
  };

  return (
    <>
      <Header setIsAddModal={setIsAddModal} />
      <main>
        <CategoryFilter />
        <RestaurantList
          totalRestaurants={totalRestaurants}
          handleClickRestaurantList={handleClickRestaurantList}
        />
      </main>
      <aside>
        {isDetailModal && (
          <RestaurantDetailModal
            setIsDetailModal={setIsDetailModal}
            selectedRestaurant={selectedRestaurant}
          />
        )}
        {isAddModal && (
          <AddRestaurantModal
            setIsAddModal={setIsAddModal}
            handleClickAddRestaurant={handleClickAddRestaurant}
          />
        )}
      </aside>
    </>
  );
}

export default App;
