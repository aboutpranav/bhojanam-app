import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import "./OrderConfirmation.css";
import { StoreContext } from "../../context/StoreContext";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, food_list, getTotalCartAmount, clearCart } =
    useContext(StoreContext);

  const [orderData, setOrderData] = useState(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrderData, setPlacedOrderData] = useState(null);

  useEffect(() => {
    if (location.state) {
      setOrderData(location.state);
    } else {
      navigate("/order");
    }
  }, [location.state, navigate]);

  const getCartItemsForDisplay = () => {
    const items = [];
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const foodItem = food_list.find((item) => item._id === itemId);
        if (foodItem) {
          items.push({
            ...foodItem,
            quantity: cartItems[itemId],
          });
        }
      }
    }
    return items;
  };

  const cartItemsForDisplay = getCartItemsForDisplay();
  const subtotal = getTotalCartAmount();
  const deliveryFee = subtotal === 0 ? 0 : 30;
  const total = subtotal + deliveryFee;

  const createConfetti = () => {
    setShowConfetti(true);

    for (let i = 0; i < 150; i++) {
      setTimeout(() => {
        const confetti = document.createElement("div");
        confetti.className = "confetti-piece";
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.animationDelay = Math.random() * 3 + "s";
        confetti.style.backgroundColor = [
          "#ff6b6b",
          "#4ecdc4",
          "#45b7d1",
          "#f7dc6f",
          "#bb8fce",
          "#82e0aa",
          "#f8c471",
          "#85c1e9",
        ][Math.floor(Math.random() * 8)];

        document.body.appendChild(confetti);

        setTimeout(() => {
          if (document.body.contains(confetti)) {
            document.body.removeChild(confetti);
          }
        }, 4000);
      }, i * 30);
    }

    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  };

  const handlePlaceOrder = async () => {
    if (!orderData) return;

    setIsPlacingOrder(true);

    toast.info("Placing your order...");

    try {
      const orderPayload = {
        customerInfo: orderData.customerInfo,
        deliveryAddress: orderData.selectedAddress,
        items: cartItemsForDisplay.map((item) => ({
          foodId: item._id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
        })),
        orderSummary: {
          subtotal: subtotal,
          deliveryFee: deliveryFee,
          total: total,
        },
        paymentStatus: "Paid",
        status: "Confirmed",
      };

      const response = await fetch(
        "https://bhojanam-app-backend.vercel.app/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderPayload),
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Server error response:", errorData);
        throw new Error(`Server error: ${response.status} - ${errorData}`);
      }

      const result = await response.json();
      console.log("Order placed successfully:", result);

      setPlacedOrderData(result.order);
      setOrderPlaced(true);

      clearCart();

      toast.success(
        "🎉 Order placed successfully! Your food will be delivered soon."
      );

      createConfetti();
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error(`Failed to place order: ${error.message}. Please try again.`);
      alert(`Failed to place order: ${error.message}. Please try again.`);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleViewOrderHistory = () => {
    navigate("/profile", { state: { activeTab: "orders" } });
  };

  if (!orderData) {
    return (
      <div className="order-confirmation-container">
        <div className="loading">Loading order details...</div>
      </div>
    );
  }

  return (
    <div className="order-confirmation-container">
      {!orderPlaced ? (
        <>
          <div className="order-header">
            <h1>Order Confirmation</h1>
            <p className="order-subtitle">
              Please review your order details before placing
            </p>
          </div>

          <div className="order-content">
            <div className="order-section">
              <h2>Your Order</h2>
              <div className="order-items">
                {cartItemsForDisplay.map((item) => (
                  <div key={item._id} className="order-item">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="item-image"
                    />
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p className="item-description">{item.description}</p>
                      <div className="item-pricing">
                        <span className="quantity">Qty: {item.quantity}</span>
                        <span className="price">
                          ₹{item.price} × {item.quantity} = ₹
                          {item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-section">
              <h2>Delivery Address</h2>
              <div className="address-card">
                <div className="address-header">
                  <strong>
                    {orderData.selectedAddress.firstName}{" "}
                    {orderData.selectedAddress.lastName}
                  </strong>
                </div>
                <div className="address-details">
                  <p>{orderData.selectedAddress.street}</p>
                  <p>
                    {orderData.selectedAddress.city},{" "}
                    {orderData.selectedAddress.state}{" "}
                    {orderData.selectedAddress.zipCode}
                  </p>
                  <p>{orderData.selectedAddress.country}</p>
                  <p>📧 {orderData.selectedAddress.email}</p>
                  <p>📞 {orderData.selectedAddress.phone}</p>
                </div>
              </div>
            </div>

            <div className="order-section">
              <h2>Order Summary</h2>
              <div className="order-summary">
                <div className="summary-row">
                  <span>Subtotal ({cartItemsForDisplay.length} items)</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
                <hr />
                <div className="summary-row total-row">
                  <span>Total Amount</span>
                  <span>₹{total}</span>
                </div>
                <div className="estimated-time">
                  <p>🚚 Estimated delivery time: 30-45 minutes</p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-actions">
            <button
              className="btn-secondary"
              onClick={() => navigate("/order")}
            >
              Back to Address
            </button>
            <button
              className={`btn-primary ${isPlacingOrder ? "loading" : ""}`}
              onClick={handlePlaceOrder}
              disabled={isPlacingOrder}
            >
              {isPlacingOrder ? "Placing Order..." : `Place Order - ₹${total}`}
            </button>
          </div>
        </>
      ) : (
        <div className="order-success">
          <div className="success-animation">
            <div className="checkmark-circle">
              <div className="checkmark"></div>
            </div>
          </div>

          <h1>Order Placed Successfully! 🎉</h1>
          <p className="success-message">
            Thank you for your order. Your food will be delivered soon!
          </p>

          <div className="order-details-success">
            <div className="detail-row">
              <span className="label">Order Number:</span>
              <span className="value">{placedOrderData?.orderNumber}</span>
            </div>
            <div className="detail-row">
              <span className="label">Total Amount:</span>
              <span className="value">
                ₹{placedOrderData?.orderSummary.total}
              </span>
            </div>
            <div className="detail-row">
              <span className="label">Estimated Delivery:</span>
              <span className="value">
                {placedOrderData?.estimatedDeliveryTime
                  ? new Date(
                      placedOrderData.estimatedDeliveryTime
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "30-45 minutes"}
              </span>
            </div>
          </div>

          <div className="success-actions">
            <button className="btn-secondary" onClick={handleBackToHome}>
              Continue Shopping
            </button>
            <button className="btn-primary" onClick={handleViewOrderHistory}>
              View Order History
            </button>
          </div>
        </div>
      )}

      {showConfetti && <div className="confetti-container"></div>}
    </div>
  );
};

export default OrderConfirmation;
