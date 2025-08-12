import { createContext, useEffect, useState } from "react";

import { toast } from "react-toastify";

import useFetch from "../useFetch";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const [wishlistItems, setWishlistItems] = useState({});

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFoodList, setFilteredFoodList] = useState([]);

  const [ratingFilter, setRatingFilter] = useState(0);
  const [priceSort, setPriceSort] = useState("");

  // const API_URL = "http://localhost:3000/foodItems";
  const API_URL = "https://bhojanam-app-backend.vercel.app/foodItems";

  const { data: apiResponse, loading, error } = useFetch(API_URL, []);

  const food_list = apiResponse || [];

  useEffect(() => {
    let filtered = [...food_list];

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (ratingFilter > 0) {
      filtered = filtered.filter((item) => item.rating >= ratingFilter);
    }

    if (priceSort === "low-to-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (priceSort === "high-to-low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredFoodList(filtered);
  }, [food_list, searchTerm, ratingFilter, priceSort]);

  const addToCart = (itemId) => {
    const item = food_list.find((product) => product._id === itemId);
    const itemName = item ? item.name : "Item";

    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
      toast.success(`${itemName} added to cart!`);
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
      toast.success(`${itemName} quantity increased!`);
    }
  };

  const removeFromCart = (itemId) => {
    const item = food_list.find((product) => product._id === itemId);
    const itemName = item ? item.name : "Item";

    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (cartItems[itemId] === 1) {
      toast.info(`${itemName} removed from cart`);
    } else {
      toast.info(`${itemName} quantity decreased`);
    }
  };

  const clearCart = () => {
    setCartItems({});

    toast.success("Cart cleared successfully");

    console.log("Cart cleared successfully");
  };

  const addToWishlist = (itemId) => {
    const item = food_list.find((product) => product._id === itemId);
    const itemName = item ? item.name : "Item";

    setWishlistItems((prev) => ({ ...prev, [itemId]: true }));

    toast.success(`${itemName} added to wishlist!`);
  };

  const removeFromWishlist = (itemId) => {
    const item = food_list.find((product) => product._id === itemId);
    const itemName = item ? item.name : "Item";

    setWishlistItems((prev) => {
      const newWishlist = { ...prev };
      delete newWishlist[itemId];
      return newWishlist;
    });

    toast.info(`${itemName} removed from wishlist`);
  };

  const toggleWishlist = (itemId) => {
    if (wishlistItems[itemId]) {
      removeFromWishlist(itemId);
    } else {
      addToWishlist(itemId);
    }
  };

  const getWishlistItems = () => {
    return food_list.filter((item) => wishlistItems[item._id]);
  };

  const getWishlistCount = () => {
    return Object.keys(wishlistItems).length;
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const handleRatingFilter = (minRating) => {
    setRatingFilter(minRating);
  };

  const handlePriceSort = (sortType) => {
    setPriceSort(sortType);
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setRatingFilter(0);
    setPriceSort("");
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchTerm.trim() !== "") count++;
    if (ratingFilter > 0) count++;
    if (priceSort !== "") count++;
    return count;
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);

        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }

    return totalAmount;
  };

  const contextValue = {
    food_list,
    filteredFoodList,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalCartAmount,
    searchTerm,
    handleSearch,
    clearSearch,
    loading,
    error,
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    getWishlistItems,
    getWishlistCount,

    ratingFilter,
    priceSort,
    handleRatingFilter,
    handlePriceSort,
    clearAllFilters,
    getActiveFiltersCount,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
