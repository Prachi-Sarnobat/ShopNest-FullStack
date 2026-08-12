import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

const BASE_URL = (import.meta.env.VITE_DJANGO_BASE_URL || "http://127.0.0.1:8000").replace(/\/$/, "");

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          fetch(`${BASE_URL}/api/products/`),
          fetch(`${BASE_URL}/api/category/`),
        ]);
        if (!productsResponse.ok) throw new Error(`Products API returned ${productsResponse.status}`);
        const productsData = await productsResponse.json();
        const categoriesData = categoriesResponse.ok ? await categoriesResponse.json() : [];
        setProducts(Array.isArray(productsData) ? productsData : productsData.results || []);
        setCategories(Array.isArray(categoriesData) ? categoriesData : categoriesData.results || []);
      } catch (err) {
        setError(err.message || "Unable to load the store.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const featured = useMemo(() => products.slice(0, 5), [products]);

  return (
    <>
      <main>
        <section className="relative overflow-hidden bg-[#2c2b4b]">
          <img
            src="https://cdn11.bigcommerce.com/s-gmsn9rvs48/images/stencil/original/carousel/3/slider-01.jpg?c=1"
            alt="Featured electronics"
            className="absolute inset-0 h-full w-full object-cover opacity-70"
          />
          <div className="relative mx-auto flex min-h-[520px] max-w-7xl items-center px-5 py-16 sm:px-6">
            <div className="max-w-xl text-white">
              <p className="mb-4 inline-block rounded-full bg-yellow-400 px-5 py-2 font-bold text-slate-900">Great offers every week</p>
              <h1 className="text-5xl font-black leading-tight sm:text-6xl">Smart gadgets.<br />Better prices.</h1>
              <p className="mt-5 max-w-lg text-lg text-white/85">Discover products from your Django database through a modern React storefront.</p>
              <Link to="/products" className="mt-8 inline-flex rounded-full bg-white px-7 py-3 font-bold text-[#24364a] transition hover:bg-yellow-400">Shop Now →</Link>
            </div>
          </div>
        </section>

        <section className="border-b bg-white py-9">
          <div className="mx-auto max-w-7xl px-5 sm:px-6">
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5">
              {(categories.length ? categories.slice(0, 5) : ["Gadgets", "Electronics", "Kitchen", "Garden", "Accessories"]).map((category) => (
                <Link key={category.id || category} to="/products" className="rounded-2xl bg-slate-50 p-5 text-center transition hover:-translate-y-1 hover:bg-yellow-50">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl shadow">{category.name ? "🛍️" : "✨"}</div>
                  <p className="font-bold text-slate-800">{category.name || category}</p>
                  <span className="text-xs text-slate-500">View products</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="deals" className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:px-6 md:grid-cols-2">
          <div className="relative min-h-64 overflow-hidden rounded-2xl bg-slate-900">
            <img src="https://cdn11.bigcommerce.com/s-gmsn9rvs48/product_images/uploaded_images/top-banner-01.jpg" alt="Smart watches" className="absolute inset-0 h-full w-full object-cover opacity-75" />
            <div className="relative z-10 p-8 text-white"><p>New Generation</p><h2 className="mt-1 text-3xl font-black">Smart Watches</h2><Link to="/products" className="mt-4 inline-block underline">Shop Now →</Link></div>
          </div>
          <div className="relative min-h-64 overflow-hidden rounded-2xl bg-yellow-100">
            <img src="https://cdn11.bigcommerce.com/s-gmsn9rvs48/product_images/uploaded_images/top-banner-02.jpg" alt="New gadgets" className="absolute inset-0 h-full w-full object-cover opacity-80" />
            <div className="relative z-10 p-8 text-slate-900"><p>Weekly deals</p><h2 className="mt-1 text-3xl font-black">New Gadgets</h2><Link to="/products" className="mt-4 inline-block underline">Explore →</Link></div>
          </div>
        </section>

        <section id="featured" className="bg-slate-100 py-14">
          <div className="mx-auto max-w-7xl px-5 sm:px-6">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div><p className="text-sm font-bold uppercase tracking-widest text-yellow-600">From your Django API</p><h2 className="mt-1 text-3xl font-black text-slate-900">Best Sellers</h2></div>
              <Link to="/products" className="font-bold text-blue-700 hover:underline">View all →</Link>
            </div>
            {loading ? <p className="rounded-2xl bg-white p-8 text-center">Loading products...</p> : error ? <p className="rounded-2xl bg-white p-8 text-center text-red-600">{error}</p> : featured.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">{featured.map((product) => <ProductCard key={product.id} product={product} compact />)}</div> : <p className="rounded-2xl bg-white p-8 text-center">No products in the database yet.</p>}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-slate-900">
            <img src="https://cdn11.bigcommerce.com/s-gmsn9rvs48/product_images/uploaded_images/sub-banner-01.jpg" alt="Hot deals" className="absolute inset-0 h-full w-full object-cover opacity-70" />
            <div className="relative px-7 py-16 text-white sm:px-12"><p className="text-sm uppercase tracking-widest text-yellow-400">Shop and save</p><h2 className="mt-2 max-w-xl text-4xl font-black">Hot deals on smart phones and electronics</h2><Link to="/products" className="mt-7 inline-flex rounded-full bg-yellow-400 px-6 py-3 font-bold text-slate-900">Browse Products</Link></div>
          </div>
        </section>

        <section className="bg-[#2a3b4e] py-10 text-white">
          <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-6 sm:grid-cols-2 lg:grid-cols-4">
            {[['🚚','Free Delivery','On selected orders'],['🏷️','Great Deals','Fresh offers weekly'],['🎧','Best Support','Here when you need us'],['🔒','Secure Shopping','Protected checkout']].map(([icon,title,text]) => <div key={title} className="flex items-center gap-4"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#172330] text-xl">{icon}</div><div><p className="font-bold text-yellow-400">{title}</p><p className="text-xs text-white/80">{text}</p></div></div>)}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Home;
