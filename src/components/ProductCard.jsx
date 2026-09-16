import { Link } from "react-router-dom";
import { useCart } from "../context/CardContext";

function ProductCard({ product, compact = false }) {
  const { addToCart } = useCart();

  const baseUrl = (
    import.meta.env.VITE_DJANGO_BASE_URL || "http://127.0.0.1:8000"
  ).replace(/\/$/, "");

  const image = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `${baseUrl}${product.image.startsWith("/") ? "" : "/"}${product.image}`
    : "https://via.placeholder.com/500x400?text=Product";

  const price = Number(product.price || 0);

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-2xl bg-white
      shadow-sm ring-1 ring-slate-200
      transition-all duration-300
      hover:-translate-y-1 hover:shadow-xl
      ${compact ? "" : "p-1"}`}
    >
      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative flex h-60 items-center justify-center overflow-hidden rounded-xl bg-slate-50 p-6">
          <img
            src={image}
            alt={product.name}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
          />

          {/* View Details */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full bg-slate-900/80 py-2 text-center text-sm font-semibold text-white backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-0">
            View Details
          </div>
        </div>
      </Link>

      {/* Product Information */}
      <div className="flex flex-1 flex-col p-5">
        {/* Category */}
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
          {product.category?.name || "Featured"}
        </p>

        {/* Product Name */}
        <Link to={`/product/${product.id}`}>
          <h3 className="mt-2 min-h-[48px] line-clamp-2 text-base font-bold leading-6 text-slate-900 transition-colors hover:text-blue-700">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="mt-2 line-clamp-2 min-h-[40px] text-sm leading-5 text-slate-500">
          {product.description}
        </p>

        {/* Bottom Section */}
        <div className="mt-auto pt-5">
          <div className="flex items-center justify-between gap-3">
            {/* Price */}
            <span className="text-xl font-black text-[#24364a]">
              ₹{price.toFixed(2)}
            </span>

            {/* Add to Cart */}
            <button
              type="button"
              onClick={() => addToCart(product)}
              className="rounded-full bg-[#24364a] px-4 py-2.5 text-sm font-bold text-white
              transition-all duration-200
              hover:bg-yellow-400 hover:text-slate-900
              active:scale-95"
            >
              Add to Cart
            </button>
          </div>

          {/* Details Link */}
          <Link
            to={`/product/${product.id}`}
            className="mt-3 block text-center text-sm font-semibold text-slate-500 transition-colors hover:text-[#24364a]"
          >
            View product details →
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;