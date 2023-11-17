"use client";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [cart, setCart] = useState({});

  useEffect(() => {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    setCart(cart);
  }, []);

  const increaseQuantity = (itemID) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[itemID]) {
        newCart[itemID].quantity += 1;
      }
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const decreaseQuantity = (itemID) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[itemID] && newCart[itemID].quantity > 0) {
        newCart[itemID].quantity -= 1;
      }
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  return (
    <div className="p-4 flex flex-col">
      <h1 className="text-2xl mb-4">Shopping Cart</h1>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="text-start">Image</th>
            <th className="text-start">Name</th>
            <th className="text-start">Description</th>
            <th className="text-start">Price</th>
            <th className="text-start">Quantity</th>
            <th className="text-start">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(cart).map((item) => (
            <tr key={item.itemID}>
              <td className="text-center">
                <img
                  src={item.itemImage}
                  alt={item.itemName}
                  className="w-16 h-16 mr-2"
                />
              </td>
              <td>{item.itemName}</td>
              <td className="w-1/9 truncate">
                {item.itemDescription.split(" ").slice(0, 10).join(" ")}...
              </td>
              <td>{item.itemPrice}</td>
              <td>{item.quantity}</td>
              <td>
                <button
                  onClick={() => increaseQuantity(item.itemID)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => decreaseQuantity(item.itemID)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                >
                  -
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
