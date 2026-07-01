<<<<<<< HEAD
import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import CategoryFilter from './components/Main/CategoryFilter';
import RestaurantList from './components/Main/RestaurantList';
import RestaurantDetailModal from './components/Aside/RestaurantDetailModal';
import AddRestaurantModal from './components/Aside/AddRestaurantModal';
=======
import { useState } from "react";
import Header from "./components/Header/Header";
import CategoryFilter from "./components/Main/CategoryFilter";
import RestaurantList from "./components/Main/RestaurantList";
import RestaurantDetailModal from "./components/Aside/RestaurantDetailModal";
import AddRestaurantModal from "./components/Aside/AddRestaurantModal";
<<<<<<< HEAD
<<<<<<< HEAD
import { useQuery } from "@tanstack/react-query";
>>>>>>> 1897623 (feat: TanStack으로 restaurant 상태를 서버 상태로 관리)
=======
import { useQuery, useMutation } from "@tanstack/react-query";
>>>>>>> 0bf3031 (feat: useMutation을 사용해 음식점 추가 기능 구현)
=======
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
>>>>>>> 9b7088b (feat: query invalidation 적용)

function App() {
  // 상태값
  const [category, setCategory] = useState('전체');

  const [isDetailModal, setIsDetailModal] = useState(false);

  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);

  const [isAddModal, setIsAddModal] = useState(false);

  const client = useQueryClient();

  async function fetchRestaurants() {
    const res = await fetch("http://localhost:3000/restaurants");
    const data = await res.json();
    return data;
  }

<<<<<<< HEAD
  useEffect(() => {
    fetch('http://localhost:3000/restaurants')
      .then((res) => res.json())
      .then((data) => setTotalRestaurants(data));
  }, []);
  // 파생값
  const filteredRestaurants =
    category === '전체'
      ? totalRestaurants
      : totalRestaurants.filter((r) => r.category === category);
=======
  const { data: totalRestaurants = [] } = useQuery({
    queryKey: ["restaurants"],
    queryFn: fetchRestaurants,
  });
>>>>>>> 1897623 (feat: TanStack으로 restaurant 상태를 서버 상태로 관리)

  const selectedRestaurant = totalRestaurants.find((r) => r.id === selectedRestaurantId);

  //  핸들러
  const handleClickRestaurantList = (r) => {
    setIsDetailModal(true);
    setSelectedRestaurantId(r.id);
  };

<<<<<<< HEAD
<<<<<<< HEAD
  const handleClickAddRestaurant = (newRestaurant) => {
    setIsAddModal(false);
    setTotalRestaurants((prev) => [...prev, newRestaurant]);
=======
  const handleClickAddRestaurant = async (newRestaurant) => {
=======
  const addRestaurant = async (newRestaurant) => {
>>>>>>> 0bf3031 (feat: useMutation을 사용해 음식점 추가 기능 구현)
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

    onError: (context) => {
      client.setQueryData(["restaurants"], context.previousRestaurants);
    },

    onSettled: () => {
      client.invalidateQueries({ queryKey: ["restaurants"] });
    },
  });

  const handleClickAddRestaurant = async (newRestaurant) => {
    mutate(newRestaurant);
    console.log("음식점 추가 완료");
    setIsAddModal(false);
>>>>>>> 1897623 (feat: TanStack으로 restaurant 상태를 서버 상태로 관리)
  };

  return (
    <>
      <Header setIsAddModal={setIsAddModal} />
      <main>
        <CategoryFilter category={category} setCategory={setCategory} />
        <RestaurantList
          filteredRestaurants={filteredRestaurants}
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
        {isAddModal && <AddRestaurantModal handleClickAddRestaurant={handleClickAddRestaurant} />}
      </aside>
    </>
  );
}

export default App;
