import React, { useContext } from "react";
import "./FoodDisplay.css";

import { StoreContext } from "../../context/StoreContext";

import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const {
    filteredFoodList,
    searchTerm,
    loading,
    error,
    ratingFilter,
    priceSort,
    food_list,
  } = useContext(StoreContext);

  if (loading) {
    return (
      <div className="food-display" id="food-display">
        <h2>What everyone's ordering...</h2>
        <div className="loading-message">
          <p>Loading delicious food items...</p> {/* Loading message */}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="food-display" id="food-display">
        <h2>What everyone's ordering...</h2>
        <div className="error-message">
          <p>Sorry, we couldn't load the menu. Please try again later.</p>{" "}
          {/* Error message */}
          <p className="error-details">Error: {error}</p>{" "}
          {/* Show actual error for debugging */}
        </div>
      </div>
    );
  }

  const categoryFilteredItems = filteredFoodList.filter((item) => {
    if (category === "All" || category === item.category) {
      return true;
    }
    return false;
  });

  if (!categoryFilteredItems || categoryFilteredItems.length === 0) {
    return (
      <div className="food-display" id="food-display">
        <h2>What everyone's ordering...</h2>
        <div className="filter-status">
          {searchTerm && (
            <span className="filter-tag">Search: "{searchTerm}"</span>
          )}
          {category !== "All" && (
            <span className="filter-tag">Category: {category}</span>
          )}
          {ratingFilter > 0 && (
            <span className="filter-tag">Rating: {ratingFilter}+ stars</span>
          )}
          {priceSort && (
            <span className="filter-tag">
              Price:{" "}
              {priceSort === "low-to-high" ? "Low to High" : "High to Low"}
            </span>
          )}
        </div>
        <div className="no-items-message">
          <p>No food items match your current filters.</p>
          <p className="suggestion-text">
            Try adjusting your filters to see more items.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="food-display" id="food-display">
      <h2>What everyone's ordering...</h2>

      <div className="filter-status">
        <div className="results-count">
          <span className="count-text">
            Showing {categoryFilteredItems.length} of {food_list.length} items
          </span>
        </div>

        <div className="active-filters">
          {searchTerm && (
            <span className="filter-tag">
              <span className="filter-label">Search:</span> "{searchTerm}"
            </span>
          )}
          {category !== "All" && (
            <span className="filter-tag">
              <span className="filter-label">Category:</span> {category}
            </span>
          )}
          {ratingFilter > 0 && (
            <span className="filter-tag">
              <span className="filter-label">Rating:</span> {ratingFilter}+ ⭐
            </span>
          )}
          {priceSort && (
            <span className="filter-tag">
              <span className="filter-label">Price:</span>{" "}
              {priceSort === "low-to-high" ? "Low to High" : "High to Low"}
            </span>
          )}
        </div>
      </div>

      <div className="food-display-list" id="food-display-list">
        {categoryFilteredItems.map((item) => {
          return (
            <FoodItem
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              rating={item.rating}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
