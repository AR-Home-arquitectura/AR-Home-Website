"use client";
import Navbar from "./components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { AuthContextProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Arhome</title>
        <meta name='Webapp' content='Webapp' />
      </head>
      <body className={inter.className}>
        <AuthContextProvider>
          <CartProvider>
            <Navbar />
            {children}
          </CartProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
