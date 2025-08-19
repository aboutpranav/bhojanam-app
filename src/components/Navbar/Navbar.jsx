import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";

const Navbar = () => {
  const [menu, setMenu] = useState("home");

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

  const handleMenuClick = (menuItem) => {
    setMenu(menuItem);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm custom-navbar">
      <div className="container-fluid px-3">
        <Link className="navbar-brand" to="/">
          <img src={assets.logo} alt="Logo" className="logo" />
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="bi bi-list fs-4" style={{ color: "#49557e" }}></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto d-none d-lg-flex">
            <li className="nav-item">
              <Link
                className={`nav-link custom-nav-link ${
                  menu === "home" ? "active" : ""
                }`}
                to="/"
                onClick={() => handleMenuClick("home")}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link custom-nav-link ${
                  menu === "menu" ? "active" : ""
                }`}
                to="/menu"
                onClick={() => handleMenuClick("menu")}
              >
                Menu
              </Link>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link custom-nav-link ${
                  menu === "mobile-app" ? "active" : ""
                }`}
                href="#app-download"
                onClick={() => handleMenuClick("mobile-app")}
              >
                Mobile App
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link custom-nav-link ${
                  menu === "contact-us" ? "active" : ""
                }`}
                href="#footer"
                onClick={() => handleMenuClick("contact-us")}
              >
                Contact Us
              </a>
            </li>
          </ul>

          <div className="d-lg-none mt-3">
            <div className="mb-3 position-relative">
              <input
                type="text"
                className="form-control rounded-pill ps-3 pe-5"
                placeholder="Search food items..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              {searchTerm && (
                <button
                  onClick={handleClearSearch}
                  className="btn position-absolute top-50 end-0 translate-middle-y border-0 bg-transparent"
                  style={{ right: "10px" }}
                >
                  <i className="bi bi-x-circle text-muted"></i>
                </button>
              )}
            </div>

            <ul className="navbar-nav">
              <li className="nav-item border-bottom">
                <Link
                  className={`nav-link d-flex align-items-center py-3 ${
                    menu === "home" ? "active fw-bold" : ""
                  }`}
                  to="/"
                  onClick={() => handleMenuClick("home")}
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                >
                  <i className="bi bi-house me-3"></i>
                  Home
                </Link>
              </li>
              <li className="nav-item border-bottom">
                <Link
                  className={`nav-link d-flex align-items-center py-3 ${
                    menu === "menu" ? "active fw-bold" : ""
                  }`}
                  to="/menu"
                  onClick={() => handleMenuClick("menu")}
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                >
                  <i className="bi bi-grid me-3"></i>
                  Menu
                </Link>
              </li>
              <li className="nav-item border-bottom">
                <a
                  className={`nav-link d-flex align-items-center py-3 ${
                    menu === "mobile-app" ? "active fw-bold" : ""
                  }`}
                  href="#app-download"
                  onClick={() => handleMenuClick("mobile-app")}
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                >
                  <i className="bi bi-phone me-3"></i>
                  Mobile App
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link d-flex align-items-center py-3 ${
                    menu === "contact-us" ? "active fw-bold" : ""
                  }`}
                  href="#footer"
                  onClick={() => handleMenuClick("contact-us")}
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                >
                  <i className="bi bi-envelope me-3"></i>
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div className="d-flex align-items-center ms-auto">
            <div className="position-relative me-3 d-none d-lg-block">
              <input
                type="text"
                className="form-control rounded-pill ps-3 pe-5 desktop-search"
                placeholder="Search food items..."
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ width: "250px" }}
              />
              {searchTerm && (
                <button
                  onClick={handleClearSearch}
                  className="btn position-absolute top-50 end-0 translate-middle-y border-0 bg-transparent pe-3"
                >
                  <i className="bi bi-x-circle text-muted"></i>
                </button>
              )}
            </div>

            <div className="position-relative me-3">
              <Link to="/wishlist" className="text-decoration-none">
                <i
                  className="bi bi-heart fs-4 navbar-icon"
                  style={{ color: "#49557e" }}
                ></i>
                {getWishlistCount() > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "0.6rem" }}
                  >
                    {getWishlistCount()}
                  </span>
                )}
              </Link>
            </div>

            <div className="position-relative me-3">
              <Link to="/cart" className="text-decoration-none">
                <i
                  className="bi bi-cart fs-4 navbar-icon"
                  style={{ color: "#49557e" }}
                ></i>
                {getTotalCartAmount() > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "0.6rem" }}
                  >
                    •
                  </span>
                )}
              </Link>
            </div>

            <div className="dropdown">
              <Link
                to="/profile"
                className="text-decoration-none"
                id="profileDropdown"
                role="button"
              >
                <i
                  className="bi bi-person-circle fs-4 navbar-icon"
                  style={{ color: "#49557e" }}
                ></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
