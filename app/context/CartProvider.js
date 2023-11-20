// CartContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || {};
    let countItems = 0;
    Object.values(cartItems).forEach((item) => {
      countItems += item.quantity || 0;
    });

    setCartCount(countItems);
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
