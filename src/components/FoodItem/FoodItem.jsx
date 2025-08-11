import React, { useContext } from "react";

import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image, rating }) => {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    wishlistItems,
    toggleWishlist,
  } = useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={image} alt="" />

        <div className="wishlist-heart" onClick={() => toggleWishlist(id)}>
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill={wishlistItems[id] ? "tomato" : "none"}
            xmlns="http://www.w3.org/2000/svg"
            className="heart-icon-food"
          >
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              stroke={wishlistItems[id] ? "tomato" : "white"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt=""
            />

            <p>{cartItems[id]}</p>

            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>

          <p className="food-item-rating">
            {rating}{" "}
            <span>
              <i class="bi bi-star-fill"></i>
            </span>
          </p>
        </div>

        <p className="food-item-desc">{description}</p>

        <p className="food-item-price">₹ {price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
