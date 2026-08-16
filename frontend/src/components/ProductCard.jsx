
import { Link } from "react-router-dom";
import { useCart } from "../context/CardContext";
import { useState } from "react";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const baseUrl = (import.meta.env.VITE_DJANGO_BASE_URL || "http://127.0.0.1:8000").replace(/\/$/, "");
  const image = product.image
    ? product.image.startsWith("http") ? product.image : `${baseUrl}${product.image.startsWith("/") ? "" : "/"}${product.image}`
    : "https://via.placeholder.com/500x400?text=Product";
  const price = Number(product.price || 0);

  const handleAdd = async () => {
    await addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article className="shop-product-card">
      <Link to={`/product/${product.id}`} className="shop-product-link">
        <div className="shop-product-media">
          <span className="shop-product-badge">Popular</span>
          <button type="button" aria-label="Add to wishlist" onClick={(e) => e.preventDefault()} className="shop-wishlist">♡</button>
          <img src={image} alt={product.name} />
          <span className="shop-quick-view">Quick view →</span>
        </div>
      </Link>
      <div className="shop-product-body">
        <p className="shop-product-category">{product.category?.name || "Featured"}</p>
        <Link to={`/product/${product.id}`} className="shop-product-name">{product.name}</Link>
        <div className="shop-rating"><span>★★★★★</span><small>4.8</small></div>
        <p className="shop-product-description">{product.description}</p>
        <div className="shop-product-bottom">
          <strong>₹{price.toFixed(2)}</strong>
          <button type="button" onClick={handleAdd} className={`shop-add-button ${added ? "added" : ""}`}>
            {added ? "✓ Added" : "Add to cart"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
