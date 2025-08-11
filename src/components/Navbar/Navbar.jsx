import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin, isLoggedIn, setIsLoggedIn, setUser }) => {
  const [menu, setMenu] = useState("home");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const {
    getTotalCartAmount,
    searchTerm,
    handleSearch,
    clearSearch,
    getWishlistCount,
  } = useContext(StoreContext);

  const handleSearchChange = (e) => {
    handleSearch(e.target.value);
  };

  const handleClearSearch = () => {
    clearSearch();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setShowProfileDropdown(false);
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

        {isLoggedIn ? (
          <div className="navbar-profile">
            <div
              className="profile-icon"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              <i className="bi bi-person-circle"></i>
            </div>
            {showProfileDropdown && (
              <div className="profile-dropdown">
                <Link
                  to="/profile"
                  onClick={() => setShowProfileDropdown(false)}
                >
                  <i className="bi bi-person"></i>
                  Profile
                </Link>
                <div className="dropdown-item" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right"></i>
                  Logout
                </div>
              </div>
            )}
          </div>
        ) : (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
