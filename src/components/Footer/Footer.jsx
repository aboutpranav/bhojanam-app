import React from "react";

import { Link } from "react-router-dom";

import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img className="logo" src={assets.logo} alt="" />

          <p>
            We prepare every dish fresh, using the finest ingredients, and
            deliver it straight from our kitchen to your door. Our easy online
            ordering and secure payment options make enjoying your favorite
            meals simple. Track your delivery in real time and savor the
            convenience. Because when it comes to great food, we believe it
            should always arrive hot, fresh, and full of flavor.
          </p>

          <div className="footer-social-icons">
            <i class="bi bi-facebook"></i>
            <i class="bi bi-twitter-x"></i>
            <i class="bi bi-linkedin"></i>
          </div>
        </div>

        <div className="footer-content-center">
          <h2>COMPANY</h2>

          <ul>
            <Link to="/">
              <li>Home</li>
            </Link>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>

          <ul>
            <li>+91 9912345678</li>
            <li>contact@bhojaman.com</li>
          </ul>
        </div>
      </div>

      <hr />

      <p className="footer-copyright">
        Copyright 2025 &copy; Bhojanam.com - All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
