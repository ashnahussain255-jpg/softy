import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '../context/CartContext';
import './Checkout.css';

// ⚠️ Apni Publishable key yahan dalein (pk_test_...)
const stripePromise = loadStripe('pk_test_51SnjK9FfGOxtwy5GYLXRXxqJFNcipStsUcufsDusFUigY1JB1DzIiHu5ERatpim5NN1jLQrfiHEFDwcqOvt67fjF00bzHe537A');

function Checkout() {
  const { cartItems } = useCart();

  const subtotal = cartItems.reduce((acc, item) => {
    const price = parseInt(item.price.replace(/[^0-9]/g, ""));
    return acc + (price * item.qty);
  }, 0);

const handlePayment = async () => {
  try {
  // Is line ko change karein:
const response = await fetch('https://softy.onrender.com/api/payment/checkout', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    cartItems: cartItems,
    customerInfo: { email: "test@test.com", name: "Ashna" }
  }),
});

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Payment failed');
    }

    const session = await response.json();
    const stripe = await stripePromise;
    
    await stripe.redirectToCheckout({
      sessionId: session.id,
    });

  } catch (err) {
    console.error("Detailed Error:", err);
    alert("Connection Error: Backend server tak baat nahi pahunch rahi.");
  }
};

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-main">
          <h2>Secure Checkout</h2>
          <p>You will be redirected to Stripe’s secure payment gateway to complete your purchase.</p>
          
          {/* Card fields ki jagah simple confirmation button */}
          <button className="pay-btn" onClick={handlePayment}>
            PROCEED TO PAYMENT — Rs. {(subtotal + 200).toLocaleString()}
          </button>
        </div>

        {/* Order Summary (Aapka existing side bar) */}
        <div className="order-summary">
           {/* ... aapka existing summary code ... */}
        </div>
      </div>
    </div>
  );
}

export default Checkout;