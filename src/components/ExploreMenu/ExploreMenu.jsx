import React from "react";
import "./ExploreMenu.css";

import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ selectedCategories, setSelectedCategories }) => {
  const handleCategoryClick = (categoryName) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryName)) {
        return prev.filter((cat) => cat !== categoryName);
      } else {
        return [...prev, categoryName];
      }
    });
  };

  const clearAllCategories = () => {
    setSelectedCategories([]);
  };

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Discover What's Cooking...</h1>

      <p className="explore-menu-text">
        From fresh bites to hearty delights, our menu brings flavor to every
        craving. A fusion of flavors, thoughtfully prepared to excite your
        palate and satisfy your hunger, one dish at a time. Enjoy every dish
        made with care and creativity.
      </p>

      {selectedCategories.length > 0 && (
        <div className="selected-categories">
          <div className="selected-categories-list">
            <span className="selected-label">Selected: </span>
            {selectedCategories.map((cat, index) => (
              <span key={cat} className="selected-category-tag">
                {cat}
                {index < selectedCategories.length - 1 && ", "}
              </span>
            ))}
          </div>
          <button className="clear-categories-btn" onClick={clearAllCategories}>
            Clear All
          </button>
        </div>
      )}

      <div className="explore-menu-list" id="explore-menu-list">
        {menu_list.map((item, index) => {
          const isSelected = selectedCategories.includes(item.menu_name);

          return (
            <div
              onClick={() => handleCategoryClick(item.menu_name)}
              key={index}
              className="explore-menu-list-item"
            >
              <img
                className={isSelected ? "active" : ""}
                src={item.menu_image}
                alt=""
              />

              <p className={isSelected ? "selected-text" : ""}>
                {item.menu_name}
              </p>
            </div>
          );
        })}
      </div>

      <hr />
    </div>
  );
};

export default ExploreMenu;
