import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { toast } from "react-toastify";

import "./UserProfile.css";

const UserProfile = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("profile");
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });
  const [editingProfile, setEditingProfile] = useState(false);

  // Default user data
  const [user, setUser] = useState({
    firstName: "Sample",
    lastName: "User",
    email: "user@email.com",
    phone: "9910101010",
  });

  const [profileData, setProfileData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
  });

  const [addresses, setAddresses] = useState([]);
  const [addressesLoading, setAddressesLoading] = useState(false);
  const [addressesError, setAddressesError] = useState(null);

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState(null);

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  useEffect(() => {
    if (activeTab === "address") {
      fetchAddresses();
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === "orders") {
      console.log("Orders tab activated - fetching all orders");
      fetchOrders();
    }
  }, [activeTab]);

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

      toast.success(`${data.length} addresses loaded successfully`);
    } catch (error) {
      setAddressesError(error.message);

      toast.error(`Error loading addresses: ${error.message}`);

      console.error("Error fetching addresses:", error);
    } finally {
      setAddressesLoading(false);
    }
  };

  const fetchOrders = async () => {
    setOrdersLoading(true);
    setOrdersError(null);

    toast.info("Loading your order history...");

    try {
      console.log("Fetching all orders from database...");

      // const response = await fetch("http://localhost:3000/orders");
      const response = await fetch(
        "https://bhojanam-app-backend.vercel.app/orders"
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch orders: ${response.status}`);
      }

      const allOrders = await response.json();
      console.log("All orders fetched successfully:", allOrders);
      console.log("Number of orders:", allOrders.length);

      allOrders.forEach((order, index) => {
        console.log(`Order ${index + 1} structure:`, {
          _id: order._id,
          orderNumber: order.orderNumber,
          hasCustomerInfo: !!order.customerInfo,
          hasDeliveryAddress: !!order.deliveryAddress,
          hasItems: !!order.items,
          itemsCount: order.items?.length || 0,
          hasOrderSummary: !!order.orderSummary,
          status: order.status,
          paymentStatus: order.paymentStatus,
          orderDate: order.orderDate,
          fullOrder: order,
        });
      });

      setOrders(Array.isArray(allOrders) ? allOrders : []);

      toast.success(`${allOrders.length} orders loaded successfully`);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrdersError(error.message);

      toast.error(`Error loading orders: ${error.message}`);

      setOrders([]);
    } finally {
      setOrdersLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const statusColors = {
      Pending: "#ffc107",
      Confirmed: "#28a745",
      Preparing: "#fd7e14",
      "Out for Delivery": "#17a2b8",
      Delivered: "#28a745",
      Cancelled: "#dc3545",
    };
    return statusColors[status] || "#6c757d";
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date";
    }
  };

  const handleAddressInputChange = (e) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();

    toast.info("Adding new address...");

    try {
      const response = await fetch(
        "https://bhojanam-app-backend.vercel.app/addresses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newAddress),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add address");
      }

      const data = await response.json();
      console.log("Address added successfully:", data);

      toast.success("Address added successfully! 🏠");

      setNewAddress({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        phone: "",
      });
      setShowAddAddress(false);

      fetchAddresses();
    } catch (error) {
      console.error("Error adding address:", error);

      toast.error(`Failed to add address: ${error.message}`);
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      ...profileData,
    };
    setUser(updatedUser);
    setEditingProfile(false);

    toast.success("Profile updated successfully! ✅");
  };

  const deleteAddress = async (addressId) => {
    const addressToDelete = addresses.find((addr) => addr._id === addressId);
    const addressName = addressToDelete
      ? `${addressToDelete.street}, ${addressToDelete.city}`
      : "Address";

    toast.info("Deleting address...");

    try {
      const response = await fetch(
        `https://bhojanam-app-backend.vercel.app/addresses/${addressId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete address");
      }

      console.log("Address deleted successfully");
      toast.success(`${addressName} deleted successfully! 🗑️`);

      fetchAddresses();
    } catch (error) {
      console.error("Error deleting address:", error);

      toast.error(`Failed to delete address: ${error.message}`);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <i className="bi bi-person-circle"></i>
        </div>
        <div className="profile-info">
          <h1>
            {user.firstName} {user.lastName}
          </h1>
          <p>{user.email}</p>
        </div>
      </div>

      <div className="profile-tabs">
        <button
          className={activeTab === "profile" ? "tab active" : "tab"}
          onClick={() => setActiveTab("profile")}
        >
          Profile Details
        </button>
        <button
          className={activeTab === "address" ? "tab active" : "tab"}
          onClick={() => setActiveTab("address")}
        >
          Addresses
        </button>
        <button
          className={activeTab === "orders" ? "tab active" : "tab"}
          onClick={() => setActiveTab("orders")}
        >
          All Orders
        </button>
      </div>

      <div className="profile-content">
        {activeTab === "profile" && (
          <div className="profile-details">
            <div className="section-header">
              <h2>Profile Information</h2>
              <button
                className="edit-btn"
                onClick={() => setEditingProfile(!editingProfile)}
              >
                {editingProfile ? "Cancel" : "Edit"}
              </button>
            </div>

            {editingProfile ? (
              <form onSubmit={handleSaveProfile} className="edit-profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleProfileInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleProfileInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileInputChange}
                    required
                  />
                </div>
                <button type="submit" className="save-btn">
                  Save Changes
                </button>
              </form>
            ) : (
              <div className="profile-display">
                <div className="detail-item">
                  <span className="label">First Name:</span>
                  <span className="value">{user.firstName}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Last Name:</span>
                  <span className="value">{user.lastName}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Email:</span>
                  <span className="value">{user.email}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Phone:</span>
                  <span className="value">{user.phone}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Member Since:</span>
                  <span className="value">January 2024</span>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "address" && (
          <div className="address-section">
            <div className="section-header">
              <h2>Saved Addresses</h2>
              <button
                className="add-btn"
                onClick={() => setShowAddAddress(true)}
              >
                Add New Address
              </button>
            </div>

            {showAddAddress && (
              <div className="add-address-modal">
                <div className="modal-content">
                  <div className="modal-header">
                    <h3>Add New Address</h3>
                    <button
                      className="close-btn"
                      onClick={() => setShowAddAddress(false)}
                    >
                      ×
                    </button>
                  </div>
                  <form onSubmit={handleAddAddress} className="address-form">
                    <div className="multi-fields">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={newAddress.firstName}
                        onChange={handleAddressInputChange}
                        required
                      />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={newAddress.lastName}
                        onChange={handleAddressInputChange}
                        required
                      />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email address"
                      value={newAddress.email}
                      onChange={handleAddressInputChange}
                      required
                    />
                    <input
                      type="text"
                      name="street"
                      placeholder="Street"
                      value={newAddress.street}
                      onChange={handleAddressInputChange}
                      required
                    />
                    <div className="multi-fields">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={newAddress.city}
                        onChange={handleAddressInputChange}
                        required
                      />
                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={newAddress.state}
                        onChange={handleAddressInputChange}
                        required
                      />
                    </div>
                    <div className="multi-fields">
                      <input
                        type="text"
                        name="zipCode"
                        placeholder="Zip code"
                        value={newAddress.zipCode}
                        onChange={handleAddressInputChange}
                        required
                      />
                      <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={newAddress.country}
                        onChange={handleAddressInputChange}
                        required
                      />
                    </div>
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone"
                      value={newAddress.phone}
                      onChange={handleAddressInputChange}
                      required
                    />
                    <div className="form-actions">
                      <button type="submit" className="save-btn">
                        Save Address
                      </button>
                      <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => setShowAddAddress(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="address-list">
              {addressesLoading ? (
                <div className="loading">Loading addresses...</div>
              ) : addressesError ? (
                <div className="error">Error: {addressesError}</div>
              ) : addresses && addresses.length > 0 ? (
                addresses.map((address) => (
                  <div key={address._id} className="address-card">
                    <div className="address-header">
                      <span className="address-type">
                        {address.firstName} {address.lastName}
                      </span>
                      <button
                        className="delete-btn"
                        onClick={() => deleteAddress(address._id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                    <div className="address-details">
                      <p>{address.email}</p>
                      <p>{address.street}</p>
                      <p>
                        {address.city}, {address.state} {address.zipCode}
                      </p>
                      <p>{address.country}</p>
                      <p>{address.phone}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-addresses">
                  <p>No addresses saved yet. Add your first address!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="orders-section">
            <h2>All Orders</h2>

            <div className="orders-list">
              {ordersLoading ? (
                <div className="loading">Loading all orders...</div>
              ) : ordersError ? (
                <div className="error">
                  <p>Error: {ordersError}</p>
                  <button onClick={fetchOrders} className="retry-btn">
                    Retry
                  </button>
                </div>
              ) : orders && orders.length > 0 ? (
                orders.map((order) => (
                  <div key={order._id} className="order-card">
                    <div className="order-header">
                      <div className="order-info">
                        <h3>Order #{order.orderNumber}</h3>
                        <p className="order-date">
                          {formatDate(order.orderDate)}
                        </p>
                      </div>
                      <div className="order-status-container">
                        <span
                          className="order-status"
                          style={{
                            backgroundColor: getStatusColor(order.status),
                          }}
                        >
                          {order.status}
                        </span>
                        <span
                          className="payment-status"
                          style={{
                            backgroundColor:
                              order.paymentStatus === "Paid"
                                ? "#28a745"
                                : "#dc3545",
                          }}
                        >
                          {order.paymentStatus}
                        </span>
                      </div>
                    </div>

                    {order.deliveryAddress && (
                      <div className="order-address">
                        <h4>Delivery Address:</h4>
                        <p>
                          {order.deliveryAddress.firstName}{" "}
                          {order.deliveryAddress.lastName}
                          <br />
                          {order.deliveryAddress.street},{" "}
                          {order.deliveryAddress.city},{" "}
                          {order.deliveryAddress.state}{" "}
                          {order.deliveryAddress.zipCode}
                          <br />
                          {order.deliveryAddress.country}
                          <br />
                          Phone: {order.deliveryAddress.phone}
                        </p>
                      </div>
                    )}

                    {order.items && order.items.length > 0 && (
                      <div className="order-items">
                        <h4>Items ({order.items.length}):</h4>
                        {order.items.map((item, index) => (
                          <div key={index} className="order-item">
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="item-image-small"
                              />
                            )}
                            <div className="item-info">
                              <div className="item-name">{item.name}</div>
                              <div className="item-details">
                                Quantity: {item.quantity} × ₹{item.price} = ₹
                                {item.price * item.quantity}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {order.orderSummary && (
                      <div className="order-summary-small">
                        <h4>Order Summary:</h4>
                        <div className="summary-row">
                          <span>Subtotal:</span>
                          <span>₹{order.orderSummary.subtotal}</span>
                        </div>
                        <div className="summary-row">
                          <span>Delivery Fee:</span>
                          <span>₹{order.orderSummary.deliveryFee}</span>
                        </div>
                        <div className="summary-row total">
                          <span>Total:</span>
                          <span>₹{order.orderSummary.total}</span>
                        </div>
                      </div>
                    )}

                    {order.estimatedDeliveryTime && (
                      <div className="delivery-time">
                        <span>
                          🚚 Estimated Delivery:{" "}
                          {formatDate(order.estimatedDeliveryTime)}
                        </span>
                      </div>
                    )}

                    {order.notes && order.notes.trim() !== "" && (
                      <div className="order-notes">
                        <strong>Notes:</strong> {order.notes}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="no-orders">
                  <p>No orders found in the system.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
