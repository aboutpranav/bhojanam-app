import React from "react";
import "./ExploreMenu.css";

import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Discover What's Cooking...</h1>

      <p className="explore-menu-text">
        From fresh bites to hearty delights, our menu brings flavor to every
        craving. A fusion of flavors, thoughtfully prepared to excite your
        palate and satisfy your hunger, one dish at a time. Enjoy every dish
        made with care and creativity.
      </p>

      <div className="explore-menu-list" id="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              key={index}
              className="explore-menu-list-item"
            >
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt=""
              />

              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>

      <hr />
    </div>
  );
};

export default ExploreMenu;
