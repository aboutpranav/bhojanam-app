import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./FoodItemDetails.css";
import { StoreContext } from "../../context/StoreContext";

const FoodItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [foodItem, setFoodItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const {
    cartItems,
    addToCart,
    addToCartBulk,
    setCartQuantity,
    removeFromCart,
    wishlistItems,
    toggleWishlist,
    food_list,
  } = useContext(StoreContext);

  // const API_URL = "http://localhost:3000/foodItems";
  const API_URL = "https://bhojanam-app-backend.vercel.app/foodItems";

  useEffect(() => {
    const fetchFoodItem = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
          throw new Error("Food item not found");
        }

        const data = await response.json();
        setFoodItem(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching food item:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodItem();
  }, [id]);

  // Sync quantity with cart quantity when component loads or cart changes
  useEffect(() => {
    const currentCartQuantity = cartItems[id] || 0;
    if (currentCartQuantity > 0) {
      setQuantity(currentCartQuantity);
    } else {
      setQuantity(1); // Reset to 1 if item is not in cart
    }
  }, [id, cartItems]);

  // Fixed handleAddToCart function - sets exact quantity in cart
  const handleAddToCart = () => {
    if (foodItem) {
      setCartQuantity(foodItem._id, quantity);
    }
  };

  // Fixed handleBuyNow function - sets exact quantity in cart
  const handleBuyNow = () => {
    if (foodItem) {
      setCartQuantity(foodItem._id, quantity);
      toast.success("Cart updated! Redirecting to checkout...");
      setTimeout(() => {
        navigate("/cart");
      }, 500);
    }
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    if (foodItem) {
      toggleWishlist(foodItem._id);
    }
  };

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    // Optional: You can also add to cart immediately
    // addToCart(id);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      // Optional: You can also remove from cart immediately
      // if (cartItems[id] > 0) {
      //   removeFromCart(id);
      // }
    }
  };
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <i key={i} className="bi bi-star-fill" style={{ color: "#ffc107" }}></i>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <i
          key="half"
          className="bi bi-star-half"
          style={{ color: "#ffc107" }}
        ></i>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <i
          key={`empty-${i}`}
          className="bi bi-star"
          style={{ color: "#ddd" }}
        ></i>
      );
    }

    return stars;
  };

  const getSimilarItems = () => {
    if (!foodItem) return [];

    return food_list
      .filter(
        (item) =>
          item.category === foodItem.category && item._id !== foodItem._id
      )
      .slice(0, 4);
  };

  if (loading) {
    return (
      <div className="food-item-details">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious details...</p>
        </div>
      </div>
    );
  }

  if (error || !foodItem) {
    return (
      <div className="food-item-details">
        <div className="error-container">
          <h2>Oops! Something went wrong</h2>
          <p>{error || "Food item not found"}</p>
          <button
            onClick={() => navigate("/menu")}
            className="back-to-menu-btn"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  const currentCartQuantity = cartItems[foodItem._id] || 0;
  const similarItems = getSimilarItems();

  return (
    <div className="food-item-details">
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span> / </span>
        <Link to="/menu">Menu</Link>
        <span> / </span>
        <span className="current-page">{foodItem.name}</span>
      </div>

      <div className="food-item-details-container">
        {/* Left Side - Image */}
        <div className="food-item-image-section">
          <div className="image-container">
            <img src={foodItem.image} alt={foodItem.name} />
            <div className="wishlist-button" onClick={handleWishlistToggle}>
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill={wishlistItems[foodItem._id] ? "tomato" : "none"}
                xmlns="http://www.w3.org/2000/svg"
                className="wishlist-heart-icon"
              >
                <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  stroke={wishlistItems[foodItem._id] ? "tomato" : "#333"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Right Side - Details */}
        <div className="food-item-info-section">
          <div className="category-badge">
            <span>{foodItem.category}</span>
          </div>

          <h1 className="food-item-title">{foodItem.name}</h1>

          <div className="rating-section">
            <div className="rating-stars">{renderStars(foodItem.rating)}</div>
            <span className="rating-text">
              {foodItem.rating} ({Math.floor(Math.random() * 100) + 20} reviews)
            </span>
          </div>

          <p className="food-item-description">{foodItem.description}</p>

          <div className="price-section">
            <span className="current-price">₹{foodItem.price}</span>
            {/* <span className="original-price">
              ₹{Math.floor(foodItem.price * 1.2)}
            </span> */}
            {/* <span className="discount">17% OFF</span> */}
          </div>

          <div className="quantity-section">
            <label>Quantity:</label>
            <div className="quantity-controls">
              <button
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="quantity-btn"
              >
                -
              </button>
              <span className="quantity-display">{quantity}</span>
              <button onClick={incrementQuantity} className="quantity-btn">
                +
              </button>
            </div>
          </div>

          {currentCartQuantity > 0 && (
            <div className="cart-info">
              <p>Already in cart: {currentCartQuantity} item(s)</p>
            </div>
          )}

          <div className="action-buttons">
            <button onClick={handleAddToCart} className="add-to-cart-btn">
              <i className="bi bi-cart-plus"></i>
              Add to Cart
            </button>
            <button onClick={handleBuyNow} className="buy-now-btn">
              <i className="bi bi-lightning-fill"></i>
              Buy Now
            </button>
          </div>

          <div className="additional-info">
            <div className="info-item">
              <i className="bi bi-truck"></i>
              <span>Free delivery on orders above ₹299</span>
            </div>
            <div className="info-item">
              <i className="bi bi-clock"></i>
              <span>Estimated delivery: 30-45 minutes</span>
            </div>
            <div className="info-item">
              <i className="bi bi-shield-check"></i>
              <span>100% safe and hygienic</span>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Items Section */}
      {similarItems.length > 0 && (
        <div className="similar-items-section">
          <h3>Similar Items You Might Like</h3>
          <div className="similar-items-grid">
            {similarItems.map((item) => (
              <Link
                key={item._id}
                to={`/foodItems/${item._id}`}
                className="similar-item-card"
              >
                <div className="similar-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="similar-item-info">
                  <h4>{item.name}</h4>
                  <div className="similar-item-rating">
                    {renderStars(item.rating)}
                    <span>({item.rating})</span>
                  </div>
                  <p className="similar-item-price">₹{item.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodItemDetails;
