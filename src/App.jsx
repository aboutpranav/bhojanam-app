import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Wishlist from "./pages/Wishlist/Wishlist";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import { useState } from "react";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import UserProfile from "./pages/UserProfile/UserProfile";
import OrderConfirmation from "./pages/OrderConfirmation/OrderConfirmation";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <>
      {showLogin ? (
        <LoginPopup
          setShowLogin={setShowLogin}
          setIsLoggedIn={setIsLoggedIn}
          setUser={setUser}
        />
      ) : (
        <></>
      )}
      <div className="app">
        <Navbar
          setShowLogin={setShowLogin}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setUser={setUser}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route
            path="/profile"
            element={<UserProfile user={user} setUser={setUser} />}
          />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
};

export default App;
