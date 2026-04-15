import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Context connect kiya

function Navbar() {
  const { cartItems, setIsCartOpen } = useCart();
  
  // Cart mein total items ki quantity calculate karna
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav style={styles.nav}>
      {/* BRAND LOGO - Emoji hata kar clean typography use ki hai */}
      <div style={styles.logoContainer}>
        <Link to="/" style={styles.logoText}>SOFTY PEARL</Link>
      </div>

      {/* NAVIGATION LINKS */}
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/products" style={styles.link}>Curated Stock</Link>
        
        {/* CART TRIGGER - Ye button ab SideCart ko open karega */}
        <button 
          onClick={() => setIsCartOpen(true)} 
          style={styles.cartBtn}
        >
          BAG <span style={styles.badge}>[{totalItems}]</span>
        </button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "25px 6%",
    background: "rgba(255, 255, 255, 0.98)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid #f0f0f0",
    position: "fixed", // Taake scroll ke waqt top par rahe
    top: 0,
    width: "100%",
    zIndex: 1000,
    boxSizing: "border-box"
  },

  logoContainer: {
    flex: 1
  },

  logoText: {
    fontSize: "22px",
    fontWeight: "500",
    letterSpacing: "4px", // Premium spaced-out look
    textDecoration: "none",
    color: "#000",
    fontFamily: "'Playfair Display', serif"
  },

  links: {
    display: "flex",
    alignItems: "center",
    gap: "40px"
  },

  link: {
    textDecoration: "none",
    color: "#1a1a1a",
    fontSize: "11px",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "2px",
    transition: "opacity 0.3s"
  },

  cartBtn: {
    background: "none",
    border: "none",
    fontSize: "11px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "2px",
    cursor: "pointer",
    color: "#1a1a1a",
    padding: 0
  },

  badge: {
    color: "#d4af37", // Champagne Gold for the number
    marginLeft: "4px"
  }
};

export default Navbar;