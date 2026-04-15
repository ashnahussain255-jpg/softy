import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function Success() {
  const { cartItems, clearCart } = useCart(); // clearCart function context mein add karna hoga

  useEffect(() => {
    // Yahan hum backend ko order details bhej kar save karwa sakte hain
    // Aur phir cart khali kar denge
    clearCart();
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '150px 20px' }}>
      <h1 style={{ color: '#d4af37', fontFamily: 'Playfair Display' }}>Thank You for Your Order!</h1>
      <p>Your luxury skincare essentials are being prepared for shipment.</p>
      <Link to="/products" style={{ color: '#000', textDecoration: 'underline' }}>
        Continue Shopping
      </Link>
    </div>
  );
}

export default Success;