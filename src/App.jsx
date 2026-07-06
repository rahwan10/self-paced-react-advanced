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

  const {
    data: totalRestaurants = [],
    isLoading,
    isError,
  } = useQuery({
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

    onMutate: async (newRestaurant) => {
      await client.cancelQueries({ queryKey: ["restaurants"] });
      const previousRestaurants = client.getQueryData(["restaurants"]);
      client.setQueryData(["restaurants"], (old) => [...old, newRestaurant]);
      return { previousRestaurants };
    },

    onError: (err, newRestaurant, onMutateResult) => {
      console.error("Error adding restaurant:", err);
      console.log("Failed to add restaurant:", newRestaurant);
      console.log(
        "Restoring previous restaurants:",
        onMutateResult.previousRestaurants,
      );
      client.setQueryData(["restaurants"], onMutateResult.previousRestaurants);
    },

    onSettled: (data, err) => {
      client.invalidateQueries({ queryKey: ["restaurants"] });
      if (err) {
        alert("음식점 추가 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    },
  });

  const handleClickAddRestaurant = async (newRestaurant) => {
    mutate(newRestaurant);
    setIsAddModal(false);
  };

  return (
    <>
      <Header setIsAddModal={setIsAddModal} />
      <main>
        <CategoryFilter />
        {isLoading ? (
          <div>로딩중입니다...</div>
        ) : isError ? (
          <div>데이터를 불러오는 중 오류가 발생했습니다.</div>
        ) : (
          <RestaurantList
            totalRestaurants={totalRestaurants}
            handleClickRestaurantList={handleClickRestaurantList}
          />
        )}
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
