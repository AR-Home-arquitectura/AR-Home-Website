"use client"
import { db } from './firebase';
import { getDocs, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';


async function showDataFromFirestore() {
  const querySnapshot = await getDocs(collection(db, 'items'));

  const data = [];
  querySnapshot.forEach((doc) => {
    const itemData = doc.data();
    const formattedItem = {
      itemID: itemData.itemID || '',
      itemName: itemData.itemName || '',
      itemDescription: itemData.itemDescription || '',
      itemImage: itemData.itemImage || '',
      itemPrice: itemData.itemPrice || '',
      publishedDate: itemData.publishedDate ? itemData.publishedDate.toDate().toString() : '',
      sellerName: itemData.sellerName || '',
      sellerPhone: itemData.sellerPhone || '',
      status: itemData.status || '',
    };
    data.push(formattedItem);
  });

  return data;
}

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const itemsData = await showDataFromFirestore();
      setData(itemsData);
    };
    getData();
  }, []);

  const handleAddToCart = (item) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    const key = item.itemID;
    cart[key]
      ? (cart[key].quantity += 1)
      : (cart[key] = {
          itemID: item.itemID,
          itemName: item.itemName,
          itemDescription: item.itemDescription,
          itemImage: item.itemImage,
          itemPrice: item.itemPrice,
          publishedDate: item.publishedDate,
          sellerName: item.sellerName,
          sellerPhone: item.sellerPhone,
          status: item.status,
          quantity: 1,
        });
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  return (
    <main className="p-4">
      <h1 className="text-4xl font-bold">Firebase + Next.js</h1>
      <p className="text-xl mt-4">Ejemplo de integración de Firebase con Next.js</p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((item) => (
          <div key={item.itemID} className="bg-white p-4 rounded-md shadow-md">
            <img
              src={item.itemImage}
              alt={item.itemName}
              className="w-full h-32 object-contain mb-4 rounded-md"
            />
            <h3 className="text-lg font-semibold mb-2">{item.itemName}</h3>
            <p className="text-gray-700 mb-2">{item.itemDescription}</p>
            <p className="text-gray-600">Precio: S/.{item.itemPrice}</p>
            <p className="text-gray-600">Vendedor: {item.sellerName}</p>
            <p className="text-gray-600">Teléfono del vendedor: {item.sellerPhone}</p>
            <p className="text-gray-600">Estado: {item.status}</p>
            <p className="text-gray-600">
              Fecha de publicación: {item.publishedDate}
            </p>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleAddToCart(item)}
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
