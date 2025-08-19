import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";

const PlaceOrder = () => {
  const {
    getTotalCartAmount,
    getDeliveryFee,
    getFinalTotal,
    isFreeDeliveryEligible,
    getRemainingForFreeDelivery,
  } = useContext(StoreContext);
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [addressesLoading, setAddressesLoading] = useState(false);
  const [addressesError, setAddressesError] = useState(null);

  const [customerInfo] = useState({
    firstName: "SomeFirstName",
    lastName: "SomeLastName",
    email: "someemail@mail.com",
    phone: "9900000000",
  });

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    setAddressesLoading(true);
    setAddressesError(null);
    try {
      // const response = await fetch("http://localhost:3000/addresses");
      const response = await fetch(
        "https://bhojanam-app-backend.vercel.app/addresses"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch addresses");
      }
      const data = await response.json();
      setAddresses(data);

      if (data.length > 0) {
        setSelectedAddress(data[0]._id);

        toast.success("Addresses loaded successfully");
      } else {
        toast.warning(
          "No saved addresses found. Please add an address from your profile."
        );
      }
    } catch (error) {
      setAddressesError(error.message);

      toast.error(`Error loading addresses: ${error.message}`);

      console.error("Error fetching addresses:", error);
    } finally {
      setAddressesLoading(false);
    }
  };

  const handleAddressChange = (addressId) => {
    setSelectedAddress(addressId);

    const selectedAddr = addresses.find((addr) => addr._id === addressId);
    if (selectedAddr) {
      toast.info(
        `Delivery address selected: ${selectedAddr.street}, ${selectedAddr.city}`
      );
    }
  };

  const handleProceedToPayment = () => {
    if (!selectedAddress) {
      toast.warning("Please select a delivery address");

      alert("Please select a delivery address");
      return;
    }

    if (getTotalCartAmount() === 0) {
      toast.warning("Your cart is empty");

      alert("Your cart is empty");
      return;
    }

    const selectedAddressData = addresses.find(
      (addr) => addr._id === selectedAddress
    );

    toast.success("Proceeding to order confirmation...");

    navigate("/order-confirmation", {
      state: {
        selectedAddress: selectedAddressData,
        customerInfo: customerInfo,
        cartTotal: getTotalCartAmount(),
      },
    });
  };

  const cartTotal = getTotalCartAmount();
  const deliveryFee = getDeliveryFee();
  const finalTotal = getFinalTotal();
  const freeDeliveryEligible = isFreeDeliveryEligible();
  const remainingForFreeDelivery = getRemainingForFreeDelivery();

  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Select Delivery Address</p>

        {addressesLoading ? (
          <div className="loading-addresses">
            <p>Loading addresses...</p>
          </div>
        ) : addressesError ? (
          <div className="error-addresses">
            <p>Error loading addresses: {addressesError}</p>
            <button type="button" onClick={fetchAddresses}>
              Retry
            </button>
          </div>
        ) : addresses.length > 0 ? (
          <div className="address-selection">
            {addresses.map((address) => (
              <div key={address._id} className="address-option">
                <div
                  className={`address-option ${
                    selectedAddress === address._id ? "selected" : ""
                  }`}
                  onClick={() => handleAddressChange(address._id)}
                >
                  <div className="address-header">
                    <strong>
                      {address.firstName} {address.lastName}
                    </strong>
                  </div>
                  <div className="address-details">
                    <p>{address.street}</p>
                    <p>
                      {address.city}, {address.state} {address.zipCode}
                    </p>
                    <p>{address.country}</p>
                    <p>📧 {address.email}</p>
                    <p>📞 {address.phone}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-addresses">
            <p>No saved addresses found.</p>
            <p>
              Please add an address from your profile before placing an order.
            </p>
          </div>
        )}
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>

          {!freeDeliveryEligible && remainingForFreeDelivery > 0 && (
            <div className="free-delivery-notice">
              <div className="notice-content">
                <i className="bi bi-truck"></i>
                <span>
                  Add ₹{remainingForFreeDelivery} more to get{" "}
                  <strong>FREE DELIVERY!</strong>
                </span>
              </div>
            </div>
          )}

          {freeDeliveryEligible && (
            <div className="free-delivery-achieved">
              <div className="notice-content success">
                <i className="bi bi-check-circle-fill"></i>
                <span>
                  🎉 <strong>FREE DELIVERY</strong> unlocked!
                </span>
              </div>
            </div>
          )}

          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹ {cartTotal}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p className={deliveryFee === 0 ? "free-delivery-text" : ""}>
                {deliveryFee === 0 ? (
                  <span>
                    <s>₹30</s>{" "}
                    <strong style={{ color: "#28a745" }}>FREE</strong>
                  </span>
                ) : (
                  `₹ ${deliveryFee}`
                )}
              </p>
            </div>
            <hr />
            <div className="cart-total-details">
              <strong>Total</strong>
              <strong>₹ {finalTotal}</strong>
            </div>
          </div>
          <button
            type="button"
            onClick={handleProceedToPayment}
            disabled={!selectedAddress || cartTotal === 0}
            className={!selectedAddress || cartTotal === 0 ? "disabled" : ""}
          >
            Proceed to Confirmation
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
