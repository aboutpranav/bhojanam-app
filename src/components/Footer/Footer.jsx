import React from "react";

import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img className="logo" src={assets.logo} alt="" />

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
            deserunt quae laboriosam velit beatae veniam est, corporis fugiat
            totam ullam? Qui, esse reprehenderit. Quisquam alias ipsum quidem
            odio, iste ad.
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
            <li>Home</li>
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
