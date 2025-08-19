import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>
          Crave it? <br /> We Deliver.
        </h2>

        <p>
          Discover a wide variety of mouth-watering dishes made with premium
          <br /> ingredients and expert care. Satisfy every craving and make
          every meal memorable.
        </p>

        <Link to="/menu">
          <button>View Menu</button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
