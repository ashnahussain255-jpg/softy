import { Link } from "react-router-dom";
import "./Home.css";
import { useState } from "react";
import { useCart } from "../context/CartContext"; // ✅ Context Import Kiya

import care from "../assets/care.mp4"; 
import skin from "../assets/skin.webp";
import beauty from "../assets/beauty.webp";
import seoul from "../assets/seoul.webp";
import round from "../assets/round.webp";

function Home() {
  const [index, setIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // ✅ Cart Context se values nikalna
  const { cartItems, setIsCartOpen } = useCart();

  // ✅ Total Items calculate karna badge ke liye
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const menuData = [
    { title: "Shop by Concern", items: ["Hydration", "Acne & Blemishes", "Anti-Aging", "Brightening"] },
    { title: "Categories", items: ["Cleansers", "Toners", "Serums", "Moisturizers", "Sunscreen"] },
    { title: "Best Sellers", items: ["Cosrx Snail Mucin", "Anua Heartleaf", "Beauty of Joseon", "Round Lab"] }
  ];

  const products = [
    { id: "0", img: seoul, title: "Seoul 1988 Serum", price: "Rs. 1,500", brand: "CELLCOSMET" },
    { id: "1", img: skin, title: "Cosrx Snail Essence 100ML", price: "Rs. 4,500", brand: "VALMONT" },
    { id: "2", img: round, title: "ROUND LAB Cleanser", price: "Rs. 3,000", brand: "SOFTY PEARL" },
  ];

  const favorites = [
    { img: skin, title: "Niacinamide Repair Toner", price: "Rs. 1,800" },
    { img: seoul, title: "K-Beauty Moisturizer", price: "Rs. 2,500" },
    { img: round, title: "Deep Clean Foam Wash", price: "Rs. 2,000" },
  ];

  const next = () => setIndex((prev) => (prev + 1) % products.length);
  const prev = () => setIndex((prev) => (prev - 1 + products.length) % products.length);

  const getSlideClass = (i) => {
    if (i === index) return "activeSlide";
    if (i === (index - 1 + products.length) % products.length) return "lastSlide";
    return "nextSlide";
  };

  return (
    <div className="homeWrapper">
      {/* TOP ANNOUNCEMENT */}
      <div className="topBanner">
        FREE DELIVERY ON ALL ORDERS OVER RS. 5000 • SOFTY PEARL OFFICIAL
      </div>

      {/* NAVIGATION */}
      <nav className="navbar">
        <div className="navLeft">
          <div className="menuTrigger" onMouseEnter={() => setIsMenuOpen(true)} onMouseLeave={() => setIsMenuOpen(false)}>
            <div className="hamburgerIcon">
              <span></span><span></span><span></span>
            </div>
            {isMenuOpen && (
              <div className="megaMenu">
                <div className="megaMenuGrid">
                  {menuData.map((col, i) => (
                    <div key={i} className="menuColumn">
                      <h4>{col.title}</h4>
                      <ul>{col.items.map((item, j) => (<li key={j}><Link to="/products">{item}</Link></li>))}</ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="navLogo"><Link to="/" style={{textDecoration: 'none', color: 'inherit'}}>SOFTY PEARL</Link></div>
        
        <div className="navRight">
          <Link to="/products" className="navLink">Shop</Link>
          
          {/* ✅ Cart connect ho gaya yahan */}
          <button 
            className="navLink" 
            onClick={() => setIsCartOpen(true)} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit' }}
          >
            Cart ({totalItems})
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="hero">
        <div className="heroContent">
          <span className="heroSubtitle">New Arrival</span>
          <h1>the k-glow <br/> essentials.</h1>
          <Link to="/products" className="btn">Shop Now</Link>
        </div>
      </div>

      <div className="sectionDivider"></div>

      {/* PROMO SECTION */}
      <div className="promoContainer">
        <div className="promoText">
          <h2 className="promoTitle">banana things</h2>
          <p className="promoDesc">Something sweet for your skin. Meet our limited edition Peptide Lip Treatment in Caramelized Banana.</p>
          <Link to="/products" className="promoBtn">GRAB YOURS</Link>
        </div>
        <div className="promoImage">
          <Link to="/products">
            <img src={beauty} alt="Promo" style={{cursor: 'pointer'}} />
          </Link>
        </div>
      </div>

      <div className="sectionDivider silver"></div>

      {/* FAVORITES GRID */}
      <div className="section">
        <div className="sectionHeader">
          <span className="subtitle">Curated Collection</span>
          <h2 className="sectionTitle">shop the favorites</h2>
        </div>
        <div className="productGrid">
          {favorites.map((item, i) => (
            <div className="productCard" key={i}>
              <Link to="/products" className="imgContainer" style={{ display: 'block' }}>
                <img src={item.img} alt={item.title} />
                <button className="quickAdd">Quick Add +</button>
              </Link>
              <div className="productInfo">
                <Link to="/products" style={{ textDecoration: 'none', color: 'inherit' }}>
                   <h3 className="productTitle">{item.title}</h3>
                </Link>
                <p className="productPrice">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sectionDivider"></div>

      {/* SLIDER SECTION */}
      <div className="section sliderSection">
        <div className="sectionHeader">
          <span className="subtitle">Featured</span>
          <h2 className="sectionTitle">just arrived</h2>
        </div>
        <div className="sliderWrapper">
          <button className="arrow prevArrow" onClick={prev}>←</button>
          <div className="slider">
            {products.map((item, i) => (
              <div className={`slide ${getSlideClass(i)}`} key={i}>
                <div className="slideImgBox">
                   <Link to="/products"><img src={item.img} alt={item.title} /></Link>
                </div>
                <div className="slideContent">
                  <span className="slideBrand">{item.brand}</span>
                  <h3>{item.title}</h3>
                  <p className="slidePrice">{item.price}</p>
                  <Link to="/products" className="slideBtnLink">VIEW ALL PRODUCTS</Link>
                </div>
              </div>
            ))}
          </div>
          <button className="arrow nextArrow" onClick={next}>→</button>
        </div>
      </div>

      <div className="sectionDivider silver"></div>

      {/* VIDEO SECTION */}
      <div className="videoSection">
        <div className="videoWrapper">
          <video autoPlay loop muted playsInline className="mainVideo">
            <source src={care} type="video/mp4" />
          </video>
          <div className="videoOverlay">
            <span className="heroSubtitle" style={{color: '#555'}}>The Science of Glow</span>
            <h2>unveil your <br/> natural radiance.</h2>
            <Link to="/products" className="btn" style={{width: 'fit-content'}}>Explore Shop</Link>
          </div>
        </div>
      </div>

      <div className="sectionDivider"></div>

      {/* FEEDBACK SECTION */}
      <div className="feedbackSection">
        <div className="feedbackContent">
          <div className="stars">★★★★★</div>
          <p className="reviewText">
            "Softy Pearl's serum is a game changer for my morning routine. 
            The texture is lightweight and the glow is instant!"
          </p>
          <h3>What do you think?</h3>
          <p style={{fontSize: '14px', color: '#888', marginBottom: '20px'}}>
            Your feedback helps us grow.
          </p>
          <Link to="/products" className="promoBtn" style={{padding: '12px 40px', textDecoration: 'none'}}>
            SHOP THE COLLECTION
          </Link>
        </div>
      </div>

      <div className="sectionDivider silver"></div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footerGrid">
          <div className="footerBrand">
            <h3>Softy Pearl</h3>
            <p>© 2026. Minimalist Skincare.</p>
          </div>
          <div className="footerLinks">
            <Link to="/about">About</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/shipping">Track Shipping</Link>
          </div>
          <div className="newsletter">
            <p>Subscribe for updates</p>
            <div className="inputBox">
              <input type="email" placeholder="Email address" />
              <button>→</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;