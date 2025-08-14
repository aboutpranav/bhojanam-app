import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import FoodListing from "./pages/FoodListing/FoodListing";
import Cart from "./pages/Cart/Cart";
import Wishlist from "./pages/Wishlist/Wishlist";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import UserProfile from "./pages/UserProfile/UserProfile";
import OrderConfirmation from "./pages/OrderConfirmation/OrderConfirmation";
import FoodItemDetails from "./pages/FoodItemDetails/FoodItemDetails";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <div className="app">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<FoodListing />} />
          <Route path="/foodItems/:id" element={<FoodItemDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
        </Routes>
      </div>

      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
