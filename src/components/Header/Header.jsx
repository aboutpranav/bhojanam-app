import React from "react";
import "./Header.css";

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

        <a href="/menu">
          <button>View Menu</button>
        </a>
      </div>
    </div>
  );
};

export default Header;
