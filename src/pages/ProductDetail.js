import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FiPlus, FiMinus, FiTruck, FiShield, FiArrowLeft } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import { useCart } from "../context/CartContext"; // ✅ Step 1: Context Import
import "./ProductDetail.css";
import skin from "../assets/skin.webp";
import seoul from "../assets/seoul.webp";
import round from "../assets/round.webp";

const PRODUCTS = [
  { id: "0", title: "Niacinamide Repair Toner", brand: "VALMONT", subtitle: "Restoring Perfection SPF 50", price: "Rs. 1,800", img: skin },
  { id: "1", title: "K-Beauty Moisturizer", brand: "CELLCOSMET", subtitle: "Cellular Cream", price: "Rs. 2,500", img: seoul },
  { id: "2", title: "Deep Clean Foam Wash", brand: "SOFTY PEARL", subtitle: "Purifying Gentle Cleanse", price: "Rs. 2,000", img: round },
];

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const { addToCart } = useCart(); // ✅ Step 2: Function nikalna

  const product = PRODUCTS.find((p) => String(p.id) === String(id)) || PRODUCTS[0];

  useEffect(() => {
    setIsLoaded(false);
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, [id]);

  // ✅ Step 3: Quantity handle karne wala naya Add function
  const handleAddToBag = () => {
    // Agar humein multiple quantity aik saath add karni hai
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className={`pdpWrapper ${isLoaded ? "fade-in" : ""}`}>
      <Link to="/products" className="backNav"><FiArrowLeft /> Back to Shop</Link>

      <div className="pdpMainGrid">
        <div className="pdpImageSection">
          <div className="imageContainer">
            <img src={product.img} alt={product.title} className="pdpHeroImg" />
          </div>
        </div>

        <div className="pdpInfoSection">
          <div className="headerInfo">
            <span className="pdpBrandTag">{product.brand}</span>
            <h1 className="pdpMainTitle">{product.title}</h1>
            <p className="pdpSubtitle">{product.subtitle}</p>
          </div>

          <div className="pdpRating">
            <div className="stars">
              {[...Array(5)].map((_, i) => <AiFillStar key={i} className="starIcon" />)}
            </div>
            <span className="reviewText">12 Verified Reviews</span>
          </div>

          <div className="pdpPriceTag">{product.price}</div>

          <div className="pdpDescription">
            A premium restorative treatment designed for high-performance skincare. 
            It works at a cellular level to protect and rejuvenate your skin barrier.
          </div>

          <div className="pdpActionRow">
            <div className="qtyController">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><FiMinus /></button>
              <span className="qtyDisplay">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}><FiPlus /></button>
            </div>
            
            {/* ✅ Step 4: Click event lagana */}
            <button className="mainCartBtn" onClick={handleAddToBag}>
              ADD TO SHOPPING BAG
            </button>
          </div>

          <div className="pdpTrustBadges">
            <div className="badge"><FiTruck className="badgeIcon" /> <span>Complimentary Shipping</span></div>
            <div className="badge"><FiShield className="badgeIcon" /> <span>Quality Guarantee</span></div>
          </div>
        </div>
      </div>

      <section className="relatedProducts">
        <div className="relatedHeader">
          <span className="smallTitle">Discover More</span>
          <h2 className="mainTitle">You May Also Like</h2>
        </div>
        <div className="relatedGrid">
          {PRODUCTS.filter(p => String(p.id) !== String(id)).map(item => (
            <Link to={`/product/${item.id}`} className="relatedCard" key={item.id}>
              <div className="cardImgBox">
                <img src={item.img} alt={item.title} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.price}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
