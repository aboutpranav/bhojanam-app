import React, { useContext } from "react";

import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { Link } from "react-router-dom";

const FoodItem = ({ id, name, price, description, image, rating }) => {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    wishlistItems,
    toggleWishlist,
  } = useContext(StoreContext);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(id);
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <Link to={`/foodItems/${id}`}>
          <img className="food-item-image" src={image} alt={name} />
        </Link>

        <div className="wishlist-heart" onClick={handleWishlistClick}>
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
            onClick={(e) => {
              handleCartClick(e);
              addToCart(id);
            }}
            src={assets.add_icon_white}
            alt="Add to cart"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={(e) => {
                handleCartClick(e);
                removeFromCart(id);
              }}
              src={assets.remove_icon_red}
              alt="Remove from cart"
            />

            <p>{cartItems[id]}</p>

            <img
              onClick={(e) => {
                handleCartClick(e);
                addToCart(id);
              }}
              src={assets.add_icon_green}
              alt="Add to cart"
            />
          </div>
        )}
      </div>

      <Link to={`/foodItems/${id}`} className="food-item-info-link">
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
      </Link>
    </div>
  );
};

export default FoodItem;
