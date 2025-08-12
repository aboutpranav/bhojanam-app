import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

import { StoreContext } from "../../context/StoreContext";

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  // const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const {
    getTotalCartAmount,
    searchTerm,
    handleSearch,
    clearSearch,
    getWishlistCount,
  } = useContext(StoreContext);

  const handleSearchChange = (e) => {
    handleSearch(e.target.value);

    if (e.target.value.trim() !== "") {
      toast.info(`Searching for "${e.target.value}"...`);
    }
  };

  const handleClearSearch = () => {
    clearSearch();

    toast.info("Search cleared");
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>

      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
        <a
          href="#explore-menu-list"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact us
        </a>
      </ul>

      <div className="navbar-right">
        <div className="navbar-search">
          {" "}
          <input
            type="text"
            placeholder="Search food items..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          {searchTerm && (
            <button onClick={handleClearSearch} className="clear-search">
              {" "}
              ×
            </button>
          )}
        </div>

        <div className="navbar-wishlist-icon">
          <Link to="/wishlist">
            <i className="bi bi-heart"></i>
          </Link>
          <div className={getWishlistCount() === 0 ? "" : "dot"}></div>
        </div>

        <div className="navbar-cart-icon">
          <Link to="/cart">
            <i className="bi bi-cart"></i>
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        <div className="navbar-profile">
          <Link to="/profile" className="profile-icon">
            <i className="bi bi-person-circle"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
