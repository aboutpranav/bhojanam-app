import React, { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import "./FoodListing.css";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import FilterSort from "../../components/FilterSort/FilterSort";
import { StoreContext } from "../../context/StoreContext";

const FoodListing = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchParams] = useSearchParams();
  const { handleRatingFilter, handlePriceSort } = useContext(StoreContext);

  useEffect(() => {
    // Handle URL parameters for pre-filtering
    const category = searchParams.get("category");
    const filter = searchParams.get("filter");

    if (category) {
      setSelectedCategories([category]);
    }

    if (filter === "popular") {
      // Set rating filter to 4+ for popular items
      handleRatingFilter(4.0);
    }
  }, [searchParams, handleRatingFilter]);

  return (
    <div className="food-listing-page">
      <div className="food-listing-header">
        <h1>Our Complete Menu</h1>
        <p className="food-listing-subtitle">
          Discover all our delicious offerings - from appetizers to desserts, we
          have something for every taste and craving.
        </p>
      </div>

      <ExploreMenu
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />

      <FilterSort />

      <FoodDisplay selectedCategories={selectedCategories} />
    </div>
  );
};

export default FoodListing;
