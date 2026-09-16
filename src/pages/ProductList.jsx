import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function ProductList() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const baseUrl = (import.meta.env.VITE_DJANGO_BASE_URL || "http://127.0.0.1:8000").replace(/\/$/, "");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch(`${baseUrl}/api/products/`),
          fetch(`${baseUrl}/api/category/`)
        ]);
        if (!productsRes.ok) throw new Error(`Products API returned ${productsRes.status}`);
        const productsData = await productsRes.json();
        const categoriesData = categoriesRes.ok ? await categoriesRes.json() : [];
        setProducts(Array.isArray(productsData) ? productsData : productsData.results || []);
        setCategories(Array.isArray(categoriesData) ? categoriesData : categoriesData.results || []);
      } catch (err) {
        setError(err.message || "Unable to load products.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [baseUrl]);

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesSearch = !q || product.name?.toLowerCase().includes(q) || product.description?.toLowerCase().includes(q);
      const matchesCategory = !category || String(product.category?.id) === String(category);
      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  return (
    <main className="min-h-screen bg-slate-100 px-5 py-10 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-3xl bg-[#24364a] p-7 text-white sm:p-10">
          <p className="text-sm font-bold uppercase tracking-widest text-yellow-400">Shop all</p>
          <h1 className="mt-2 text-4xl font-black">Find your next favorite product</h1>
          <p className="mt-2 text-white/75">Products are loaded directly from the Django REST API.</p>
        </div>

        <div className="mb-7 grid gap-3 rounded-2xl bg-white p-4 shadow-sm md:grid-cols-[1fr_220px]">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-xl border border-slate-200 px-4 py-3 outline-none">
            <option value="">All categories</option>
            {categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
        </div>

        {loading ? <div className="rounded-2xl bg-white p-10 text-center">Loading products...</div> : error ? <div className="rounded-2xl bg-white p-10 text-center text-red-600">{error}</div> : filteredProducts.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="rounded-2xl bg-white p-10 text-center text-slate-600">No matching products found.</div>}
      </div>
    </main>
  );
}

export default ProductList;
