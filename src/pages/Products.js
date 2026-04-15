import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Products.css";

import skin from "../assets/skin.webp";
import seoul from "../assets/seoul.webp";
import round from "../assets/round.webp";

function Products() {
  const [filter, setFilter] = useState("All");
  const { addToCart } = useCart(); // Cart function yahan se liya

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const allProducts = [
    { id: "0", img: seoul, title: "Seoul 1988 Serum", price: "Rs. 1,500", brand: "CELLCOSMET", category: "Serums" },
    { id: "1", img: skin, title: "Cosrx Snail Essence 100ML", price: "Rs. 4,500", brand: "VALMONT", category: "Essence" },
    { id: "2", img: round, title: "ROUND LAB Cleanser", price: "Rs. 3,000", brand: "SOFTY PEARL", category: "Cleansers" },
  ];

  const categories = ["All", "Cleansers", "Serums", "Essence", "Moisturizers", "Sunscreen"];

  const filteredProducts = filter === "All" 
    ? allProducts 
    : allProducts.filter(p => p.category === filter);

  return (
    <div className="productsPage">
      <div className="luxuryContainer">
        <nav className="breadcrumb">
          <Link to="/">home</Link> <span className="sep">/</span> <p>curated stock</p>
        </nav>

        <div className="productsLayout">
          <aside className="filterSidebar">
            <div className="sidebarTitleSection">
              <h3>Category</h3>
              {filter !== "All" && (
                <button className="clearBtn" onClick={() => setFilter("All")}>Clear</button>
              )}
            </div>
            <ul className="categoryList">
              {categories.map((cat) => (
                <li key={cat} className={filter === cat ? "activeCat" : ""} onClick={() => setFilter(cat)}>{cat}</li>
              ))}
            </ul>
          </aside>

          <main className="productsContent">
            <div className="gridHeader">
              <h2 className="collectionTitle">{filter} Collection</h2>
              <span className="stockCount">{filteredProducts.length} essentials</span>
            </div>

            <div className="luxuryGrid">
              {filteredProducts.map((product) => (
                <div className="stockCard" key={product.id}>
                  <Link to={`/product/${product.id}`} className="imageContainer">
                    <img src={product.img} alt={product.title} className="stockImg" />
                    <div className="imageOverlay"><div className="viewAction">View Detail</div></div>
                  </Link>
                  <div className="stockInfo">
                    <div className="infoTop">
                      <span className="brandLabel">{product.brand}</span>
                      <h3 className="itemTitle">{product.title}</h3>
                    </div>
                    <div className="infoBottom">
                      <p className="itemPrice">{product.price}</p>
                      {/* CLICK EVENT ADDED HERE */}
                      <button className="minimalBagBtn" onClick={() => addToCart(product)}>+ Add to Bag</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Products;