import React, { useContext, useEffect } from "react";

import { toast } from "react-toastify";

import "./Wishlist.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../../components/FoodItem/FoodItem";

const Wishlist = () => {
  const { getWishlistItems, wishlistItems } = useContext(StoreContext);
  const wishlistItemsList = getWishlistItems();

  useEffect(() => {
    if (wishlistItemsList.length > 0) {
      toast.info(
        `You have ${wishlistItemsList.length} item${
          wishlistItemsList.length !== 1 ? "s" : ""
        } in your wishlist`
      );
    }
  }, []);

  const handleBrowseMenu = () => {
    toast.info("Redirecting to menu...");
    window.location.href = "/";
  };

  return (
    <div className="wishlist">
      <div className="wishlist-header">
        <h1>My Wishlist</h1>
        <p>Your favorite food items saved for later</p>
      </div>

      {wishlistItemsList.length === 0 ? (
        <div className="empty-wishlist">
          <div className="empty-wishlist-icon">
            <i className="bi bi-heart"></i>
          </div>
          <h2>Your wishlist is empty</h2>
          <p>
            Start adding your favorite food items to your wishlist by clicking
            the heart icon on any dish!
          </p>
          <button className="browse-menu-btn" onClick={handleBrowseMenu}>
            Browse Menu
          </button>
        </div>
      ) : (
        <div className="wishlist-content">
          <div className="wishlist-stats">
            <p>
              {wishlistItemsList.length} item
              {wishlistItemsList.length !== 1 ? "s" : ""} in your wishlist
            </p>
          </div>
          <div className="wishlist-items-grid">
            {wishlistItemsList.map((item) => (
              <FoodItem
                key={item._id}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
