  // Inside CartProvider.jsx
  import React, { createContext, useState, useContext } from 'react';
  const CartContext = createContext([]);
  export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    //Add item to cart
    const addToCart = (item) => {
      setCartItems((prevItems) => [...prevItems, item]);
    };

    //Increase or decrease quanity of items in the cart
    const adjustQuantity = (itemId, newQuantity) => {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item._id === itemId
            ? { ...item, quantity: Math.max(newQuantity, 1) } // Ensure the quantity is at least 1
            : item
        )
      );
    }  
    //remove item from cart
    const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
  };


    return (
      <CartContext.Provider value={{ cartItems, addToCart,adjustQuantity,removeFromCart }}>
        {children}
        {/* Render flash message */}
      </CartContext.Provider>
    );
  };

  export const useCart = () => {
    return useContext(CartContext);
  };
  