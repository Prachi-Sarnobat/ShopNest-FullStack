import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CardContext";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const baseUrl = (import.meta.env.VITE_DJANGO_BASE_URL || "http://127.0.0.1:8000").replace(/\/$/, "");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${baseUrl}/api/products/${id}/`)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        return response.json();
      })
      .then(setProduct)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, baseUrl]);

  if (loading) return <main className="min-h-screen p-10 text-center">Loading product details...</main>;
  if (error) return <main className="min-h-screen p-10 text-center text-red-600">Error fetching product: {error}</main>;
  if (!product) return <main className="min-h-screen p-10 text-center">Product not found.</main>;

  const image = product.image ? (product.image.startsWith("http") ? product.image : `${baseUrl}${product.image.startsWith("/") ? "" : "/"}${product.image}`) : "https://via.placeholder.com/800x600?text=Product";

  return (
    <main className="min-h-screen bg-slate-100 py-10">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Link to="/products" className="mb-5 inline-block font-semibold text-blue-700 hover:underline">← Back to products</Link>
        <div className="grid overflow-hidden rounded-3xl bg-white shadow-xl lg:grid-cols-2">
          <div className="flex min-h-[420px] items-center justify-center bg-slate-50 p-10"><img src={image} alt={product.name} className="max-h-[520px] w-full object-contain" /></div>
          <div className="p-8 sm:p-12">
            <p className="text-sm font-bold uppercase tracking-widest text-yellow-600">{product.category?.name || "Product"}</p>
            <h1 className="mt-2 text-4xl font-black text-slate-900">{product.name}</h1>
            <div className="my-6 text-3xl font-black text-[#24364a]">₹{Number(product.price || 0).toFixed(2)}</div>
            <p className="leading-7 text-slate-600">{product.description || "No description available."}</p>
            <button onClick={() => addToCart(product)} className="mt-8 w-full rounded-full bg-[#24364a] px-7 py-4 font-bold text-white hover:bg-yellow-400 hover:text-slate-900 sm:w-auto">Add to Cart</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
