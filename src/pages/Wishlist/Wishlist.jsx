import React, { useContext } from "react";
import "./Wishlist.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../../components/FoodItem/FoodItem";

const Wishlist = () => {
  const { getWishlistItems, wishlistItems } = useContext(StoreContext);
  const wishlistItemsList = getWishlistItems();

  return (
    <div className="wishlist">
      <div className="wishlist-header">
        <h1>My Wishlist</h1>
        <p>Your favorite food items saved for later</p>
      </div>

      {wishlistItemsList.length === 0 ? (
        <div className="empty-wishlist">
          <div className="empty-wishlist-icon">
            <i class="bi bi-heart"></i>
          </div>
          <h2>Your wishlist is empty</h2>
          <p>
            Start adding your favorite food items to your wishlist by clicking
            the heart icon on any dish!
          </p>
          <button
            className="browse-menu-btn"
            onClick={() => (window.location.href = "/")}
          >
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
