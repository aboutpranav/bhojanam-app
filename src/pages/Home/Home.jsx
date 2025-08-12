import React, { useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";
import FilterSort from "../../components/FilterSort/FilterSort";

const Home = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  return (
    <div>
      <Header />

      <ExploreMenu
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />

      <FilterSort />

      <FoodDisplay selectedCategories={selectedCategories} />

      <AppDownload />
    </div>
  );
};

export default Home;
