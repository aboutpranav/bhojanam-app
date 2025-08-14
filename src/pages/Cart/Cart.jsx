import React, { useContext } from "react";

import { toast } from "react-toastify";

import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    food_list,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    clearCart,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  const handleRemoveFromCart = (itemId) => {
    const item = food_list.find((product) => product._id === itemId);
    const itemName = item ? item.name : "Item";

    removeFromCart(itemId);
    toast.info(`${itemName} quantity decreased`);
  };

  const handleAddToCart = (itemId) => {
    const item = food_list.find((product) => product._id === itemId);
    const itemName = item ? item.name : "Item";

    addToCart(itemId);
    toast.success(`${itemName} quantity increased`);
  };

  const handleRemoveCompleteItem = (itemId) => {
    const item = food_list.find((product) => product._id === itemId);
    const itemName = item ? item.name : "Item";
    const currentQuantity = cartItems[itemId];

    // Remove all quantities of this item
    for (let i = 0; i < currentQuantity; i++) {
      removeFromCart(itemId);
    }
    toast.info(`${itemName} removed completely from cart`);
  };

  const handleClearCart = () => {
    clearCart();
    toast.success("Cart cleared successfully");
  };

  const getCartItems = () => {
    return food_list.filter((item) => cartItems[item._id] > 0);
  };

  const cartItemsList = getCartItems();

  if (cartItemsList.length === 0) {
    return (
      <div className="cart empty-cart">
        <div className="empty-cart-container">
          <div className="empty-cart-icon">
            <i
              className="bi bi-cart-x"
              style={{ fontSize: "4rem", color: "#ccc" }}
            ></i>
          </div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <button className="browse-menu-btn" onClick={() => navigate("/menu")}>
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <button
          className="clear-cart-btn"
          onClick={handleClearCart}
          disabled={cartItemsList.length === 0}
        >
          <i className="bi bi-trash"></i> Clear Cart
        </button>
      </div>

      <div className="cart-items">
        <div className="cart-items-title">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Actions</p>
        </div>

        <hr />

        {cartItemsList.map((item) => (
          <div key={item._id}>
            <div className="cart-items-title cart-items-item">
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <p className="item-name">{item.name}</p>
                <p className="item-category">{item.category}</p>
              </div>
              <p className="item-price">₹{item.price}</p>

              <div className="quantity-controls">
                <button
                  className="quantity-btn decrease"
                  onClick={() => handleRemoveFromCart(item._id)}
                  disabled={cartItems[item._id] <= 1}
                >
                  <i className="bi bi-dash"></i>
                </button>
                <span className="quantity-display">{cartItems[item._id]}</span>
                <button
                  className="quantity-btn increase"
                  onClick={() => handleAddToCart(item._id)}
                >
                  <i className="bi bi-plus"></i>
                </button>
              </div>

              <p className="item-total">₹{item.price * cartItems[item._id]}</p>

              <div className="item-actions">
                <button
                  onClick={() => handleRemoveCompleteItem(item._id)}
                  className="remove-item-btn"
                  title="Remove item completely"
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>

      <div className="cart-bottom">
        <div className="cart-summary">
          <div className="cart-stats">
            <p>
              <strong>Items in cart: {cartItemsList.length}</strong>
            </p>
            <p>
              <strong>
                Total quantity:{" "}
                {Object.values(cartItems).reduce((sum, qty) => sum + qty, 0)}
              </strong>
            </p>
          </div>
        </div>

        <div className="cart-total">
          <h2>Cart Total</h2>

          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 30}</p>
            </div>
            <hr />

            <div className="cart-total-details">
              <strong>Total</strong>
              <strong>
                ₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 30}
              </strong>
            </div>
          </div>

          <button
            onClick={() => navigate("/order")}
            disabled={getTotalCartAmount() === 0}
            className={getTotalCartAmount() === 0 ? "disabled" : ""}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>

        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>

            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
