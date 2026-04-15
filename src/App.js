// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import SideCart from './components/SideCart';
// Pages import karein
import Home from './pages/Home'; 
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail'; 
import Checkout from './pages/Checkout';
function App() {
  return (
    <CartProvider>
    <Router>
      <SideCart/>
      <Routes>
        {/* Home Page Route */}
        <Route path="/" element={<Home />} />
<Route path="/checkout" element={<Checkout />} />
        {/* Products List Route */}
        <Route path="/products" element={<Products />} />

        {/* Dynamic Product Detail Route - Ye click ko handle karega */}
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;