
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CardContext";


function Navbar() {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const cartCount = useMemo(() => cartItems?.reduce((total, item) => total + Number(item.quantity || 0), 0) || 0, [cartItems]);

  const submitSearch = (event) => {
    event.preventDefault();
    navigate(query.trim() ? `/products?search=${encodeURIComponent(query.trim())}` : "/products");
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-white/10 bg-[#303b42] text-white shadow-[0_8px_30px_rgba(30,34,35,.16)]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6 lg:flex-nowrap">
          <Link to="/" className="group shrink-0 text-[22px] font-black tracking-tight">Shop<span className="text-[#f5b700] transition group-hover:text-[#ffd45c]">Nest</span></Link>
          <form onSubmit={submitSearch} className="order-3 flex w-full overflow-hidden rounded-xl border border-white/10 bg-white lg:order-none lg:ml-7 lg:flex-1 lg:max-w-2xl">
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products, categories and more..." className="min-w-0 flex-1 px-4 py-2.5 text-sm text-[#28343b] outline-none" />
            <button aria-label="Search" className="bg-[#f5b700] px-5 font-black text-[#2c2b25] transition hover:bg-[#ffd24d]">⌕</button>
          </form>
          <div className="ml-auto flex items-center gap-2 text-xs font-bold sm:gap-3">
            <Link to="/products" className="hidden rounded-lg px-3 py-2 hover:bg-white/10 lg:block">Shop</Link>
            <button className="hidden rounded-lg px-3 py-2 hover:bg-white/10 sm:block">♡ Wishlist</button>
            <Link to="/cart" className="relative rounded-xl bg-white/10 px-3 py-2 transition hover:bg-white/20">🛒 Cart<span className="ml-1.5 inline-flex min-w-5 items-center justify-center rounded-full bg-[#f5b700] px-1.5 py-0.5 text-[10px] text-[#2c2b25]">{cartCount}</span></Link>
          </div>
        </div>
      </div>
      <nav className="border-b border-[#e9e1d3] bg-[#fffaf2]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 overflow-x-auto px-4 py-2.5 text-xs font-bold text-[#4d565b] sm:gap-10">
          <Link to="/" className="whitespace-nowrap hover:text-[#bd7b1d]">Home</Link>
          <Link to="/products" className="whitespace-nowrap hover:text-[#bd7b1d]">All Products</Link>
          <a href="/#featured" className="whitespace-nowrap hover:text-[#bd7b1d]">Best Sellers</a>
          <a href="/#deals" className="whitespace-nowrap hover:text-[#bd7b1d]">Deals</a>
          <a href="/#footer" className="whitespace-nowrap hover:text-[#bd7b1d]">Contact</a>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
