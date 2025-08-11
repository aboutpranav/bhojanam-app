import React, { useContext, useState } from "react";
import "./FilterSort.css";
import { StoreContext } from "../../context/StoreContext";

const FilterSort = () => {
  const {
    ratingFilter,
    priceSort,
    handleRatingFilter,
    handlePriceSort,
    clearAllFilters,
    getActiveFiltersCount,
  } = useContext(StoreContext);

  const [showFilters, setShowFilters] = useState(false);

  const ratingOptions = [
    { value: 0, label: "All Ratings" },
    { value: 4.5, label: "4.5+ Stars" },
    { value: 4.0, label: "4.0+ Stars" },
    { value: 3.5, label: "3.5+ Stars" },
    { value: 3.0, label: "3.0+ Stars" },
  ];

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="filter-sort-container">
      <div className="filter-sort-header">
        <button
          className={`filter-toggle-btn ${showFilters ? "active" : ""}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          Filters & Sort
          {activeFiltersCount > 0 && (
            <span className="active-filters-badge">{activeFiltersCount}</span>
          )}
        </button>

        {activeFiltersCount > 0 && (
          <button className="clear-all-btn" onClick={clearAllFilters}>
            Clear All ({activeFiltersCount})
          </button>
        )}
      </div>

      {showFilters && (
        <div className="filter-sort-panel">
          {/* Rating Filter Section */}
          <div className="filter-section">
            <h4>Filter by Rating</h4>
            <div className="rating-filter-options">
              {ratingOptions.map((option) => (
                <label key={option.value} className="rating-option">
                  <input
                    type="radio"
                    name="ratingFilter"
                    value={option.value}
                    checked={ratingFilter === option.value}
                    onChange={() => handleRatingFilter(option.value)}
                  />
                  <span className="radio-custom"></span>
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h4>Sort by Price</h4>
            <div className="price-sort-options">
              <label className="price-option">
                <input
                  type="radio"
                  name="priceSort"
                  value=""
                  checked={priceSort === ""}
                  onChange={() => handlePriceSort("")}
                />
                <span className="radio-custom"></span>
                Default
              </label>
              <label className="price-option">
                <input
                  type="radio"
                  name="priceSort"
                  value="low-to-high"
                  checked={priceSort === "low-to-high"}
                  onChange={() => handlePriceSort("low-to-high")}
                />
                <span className="radio-custom"></span>
                Price: Low to High
              </label>
              <label className="price-option">
                <input
                  type="radio"
                  name="priceSort"
                  value="high-to-low"
                  checked={priceSort === "high-to-low"}
                  onChange={() => handlePriceSort("high-to-low")}
                />
                <span className="radio-custom"></span>
                Price: High to Low
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSort;
