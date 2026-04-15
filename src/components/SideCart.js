import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Navigation ke liye
import { useCart } from '../context/CartContext';
import './SideCart.css';

function SideCart() {
  const { cartItems, isCartOpen, setIsCartOpen, updateQty, removeFromCart } = useCart();
  const navigate = useNavigate(); // ✅ Hook initialize kiya

  // Professional Price Calculation
  const subtotal = cartItems.reduce((acc, item) => {
    const price = parseInt(item.price.replace(/[^0-9]/g, "")) || 0;
    return acc + (price * item.qty);
  }, 0);

  // Total items count (quantity ke saath)
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const handleCheckout = () => {
    setIsCartOpen(false); // Checkout par jane se pehle cart band karein
    navigate('/checkout'); // ✅ Checkout page par bhej dega
  };

  return (
    <>
      {/* Background Overlay */}
      <div 
        className={`cart-overlay ${isCartOpen ? 'active' : ''}`} 
        onClick={() => setIsCartOpen(false)}
      ></div>

      {/* Side Drawer */}
      <div className={`side-cart ${isCartOpen ? 'active' : ''}`}>
        <div className="cart-inner">
          
          <div className="cart-header">
            <h3>Your Bag <span className="item-count">({totalItemsCount})</span></h3>
            <button className="close-drawer" onClick={() => setIsCartOpen(false)}>✕</button>
          </div>

          <div className="cart-body">
            {cartItems.length === 0 ? (
              /* --- EMPTY STATE --- */
              <div className="empty-cart-msg">
                <p>Your shopping bag is empty.</p>
                <button 
                  className="continue-shop-btn" 
                  onClick={() => setIsCartOpen(false)}
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              /* --- CART ITEMS LIST --- */
              cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-img-container">
                    <img src={item.img} alt={item.title} className="cart-item-img" />
                  </div>
                  
                  <div className="item-details">
                    <div className="title-row">
                      <h4>{item.title}</h4>
                      <button 
                        className="remove-item" 
                        onClick={() => removeFromCart(item.id)}
                        title="Remove item"
                      >
                        Remove
                      </button>
                    </div>
                    
                    <p className="item-brand-mini">{item.brand || "Softy Pearl"}</p>
                    <p className="item-price">{item.price}</p>
                    
                    <div className="qty-controls">
                      <button onClick={() => updateQty(item.id, -1)} aria-label="Decrease quantity">−</button>
                      <span className="qty-num">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} aria-label="Increase quantity">+</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* --- FOOTER SECTION --- */}
          {cartItems.length > 0 && (
            <div className="cart-footer">
              <div className="subtotal-row">
                <div className="subtotal-info">
                  <span>Subtotal</span>
                  <p className="tax-shipping-note">Shipping & taxes calculated at checkout</p>
                </div>
                <span className="subtotal-amount">Rs. {subtotal.toLocaleString()}</span>
              </div>
              
              <button className="checkout-btn" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SideCart;