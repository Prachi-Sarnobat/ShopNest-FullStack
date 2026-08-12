import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CardContext";

function Navbar() {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const cartCount = useMemo(
    () => cartItems?.reduce((total, item) => total + Number(item.quantity || 0), 0) || 0,
    [cartItems]
  );

  const submitSearch = (event) => {
    event.preventDefault();
    navigate(query.trim() ? `/products?search=${encodeURIComponent(query.trim())}` : "/products");
  };

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      <div className="bg-[#24364a] text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link to="/" className="text-2xl font-black tracking-tight">
            Shop<span className="text-yellow-400">Nest</span>
          </Link>

          <form onSubmit={submitSearch} className="order-3 flex w-full overflow-hidden rounded-lg bg-white sm:order-none sm:w-auto sm:flex-1 sm:max-w-xl">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search the store"
              className="min-w-0 flex-1 px-4 py-2.5 text-sm text-slate-900 outline-none"
            />
            <button className="bg-yellow-400 px-5 py-2.5 text-sm font-bold text-slate-900 hover:bg-yellow-300">
              Search
            </button>
          </form>

          <div className="flex items-center gap-4 text-sm font-semibold">
            <Link to="/products" className="hidden hover:text-yellow-400 sm:block">Products</Link>
            <Link to="/cart" className="relative rounded-full bg-white/10 px-4 py-2 hover:bg-white/20">
              Cart
              <span className="ml-2 inline-flex min-w-6 items-center justify-center rounded-full bg-yellow-400 px-1.5 py-0.5 text-xs text-slate-900">
                {cartCount}
              </span>
            </Link>
          </div>
        </div>
      </div>

      <nav className="bg-yellow-400 text-slate-900">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 py-3 text-sm font-bold sm:px-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/products" className="hover:underline">Shop All</Link>
          <a href="#featured" className="hover:underline">Featured</a>
          <a href="#deals" className="hover:underline">Deals</a>
          <a href="#footer" className="hover:underline">Contact</a>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
