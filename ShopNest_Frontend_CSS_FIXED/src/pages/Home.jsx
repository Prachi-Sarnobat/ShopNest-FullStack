
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";

const BASE_URL = (import.meta.env.VITE_DJANGO_BASE_URL || "http://127.0.0.1:8000").replace(/\/$/, "");
<div className="bg-red-500 p-10 text-5xl font-bold text-white">
  TAILWIND TEST
</div>
const categoryVisuals = {
  Electronics: { icon: "⌁", tone: "gold", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=700&q=80" },
  Fashion: { icon: "✦", tone: "rose", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=700&q=80" },
  "Home & Kitchen": { icon: "⌂", tone: "sage", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=80" },
  Beauty: { icon: "✧", tone: "peach", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=700&q=80" },
  Sports: { icon: "◉", tone: "blue", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=700&q=80" },
  Books: { icon: "▤", tone: "lavender", image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=700&q=80" },
};

const fallbackCategories = ["Electronics", "Fashion", "Home & Kitchen", "Beauty", "Sports", "Books"];

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [seconds, setSeconds] = useState(6 * 60 * 60 + 42 * 60 + 18);

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

  useEffect(() => {
    const timer = setInterval(() => setSeconds((value) => (value > 0 ? value - 1 : 24 * 60 * 60)), 1000);
    return () => clearInterval(timer);
  }, []);

  const featured = useMemo(() => products.slice(0, 5), [products]);
  const trending = useMemo(() => products.slice(5, 9), [products]);

  const time = {
    h: String(Math.floor(seconds / 3600)).padStart(2, "0"),
    m: String(Math.floor((seconds % 3600) / 60)).padStart(2, "0"),
    s: String(seconds % 60).padStart(2, "0"),
  };

  const shownCategories = categories.length ? categories.slice(0, 6) : fallbackCategories;

  return (
    <>
      <main className="home-page">
        {/* Announcement ticker */}
        <div className="announcement">
          <div className="announcement-track">
            <span>✦ Free delivery on selected orders</span>
            <span>✦ Easy 7-day returns</span>
            <span>✦ Fresh deals added every week</span>
            <span>✦ Secure checkout</span>
            <span>✦ Free delivery on selected orders</span>
            <span>✦ Easy 7-day returns</span>
            <span>✦ Fresh deals added every week</span>
          </div>
        </div>

        {/* Hero */}
        <section className="hero-modern">
          <div className="hero-grid-glow" />
          <div className="hero-orb hero-orb-one" />
          <div className="hero-orb hero-orb-two" />
          <div className="hero-particles" aria-hidden="true">
            {Array.from({ length: 18 }).map((_, index) => <i key={index} style={{ "--i": index }} />)}
          </div>

          <div className="hero-inner">
            <Reveal className="hero-copy">
              <span className="eyebrow-pill"><span className="pulse-dot" /> New season picks</span>
              <h1>Find something <em>worth loving.</em></h1>
              <p>Curated everyday essentials, smart gadgets and style picks — all in one beautiful place.</p>
              <div className="hero-actions">
                <Link to="/products" className="btn-primary shine-btn">Shop the collection <span>→</span></Link>
                <Link to="/products" className="btn-ghost">Explore categories</Link>
              </div>
              <div className="hero-proof">
                <div className="avatar-stack"><span>🧑🏻</span><span>👩🏽</span><span>🧑🏾</span><span>+</span></div>
                <div><strong>Loved by everyday shoppers</strong><small>Fresh products · Simple shopping</small></div>
              </div>
            </Reveal>

            <Reveal className="hero-showcase" delay={120}>
              <div className="hero-card-back" />
              <div className="hero-product-stage">
                <div className="sale-bubble">UP TO<br /><strong>50%</strong><br />OFF</div>
                <div className="hero-ring" />
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=85"
                  alt="Featured headphones"
                  className="hero-product-image"
                />
                <div className="floating-tag tag-one">★ 4.8 rating</div>
                <div className="floating-tag tag-two">Fast delivery</div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Benefits */}
        <section className="benefit-strip">
          {[
            ["↗", "Free delivery", "On selected orders"],
            ["✓", "Secure payment", "Protected checkout"],
            ["↻", "Easy returns", "7-day return window"],
            ["♡", "Helpful support", "We're here to help"],
          ].map(([icon, title, text], index) => (
            <Reveal key={title} delay={index * 70} className="benefit-item">
              <span className="benefit-icon">{icon}</span>
              <span><strong>{title}</strong><small>{text}</small></span>
            </Reveal>
          ))}
        </section>

        {/* Categories */}
        <section className="section-wrap">
          <Reveal className="section-heading">
            <div><span className="section-kicker">Browse by mood</span><h2>Shop your way</h2></div>
            <Link to="/products" className="section-link">View all <span>→</span></Link>
          </Reveal>
          <div className="category-grid">
            {shownCategories.map((category, index) => {
              const name = category.name || category;
              const visual = categoryVisuals[name] || categoryVisuals.Electronics;
              return (
                <Reveal key={category.id || name} delay={index * 70}>
                  <Link to="/products" className={`category-card tone-${visual.tone}`}>
                    <div className="category-image-wrap"><img src={visual.image} alt="" /></div>
                    <div className="category-overlay" />
                    <div className="category-info">
                      <span className="category-icon">{visual.icon}</span>
                      <strong>{name}</strong>
                      <small>Explore collection →</small>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Animated promo */}
        <section className="section-wrap">
          <Reveal className="promo-banner">
            <div className="promo-copy">
              <span className="promo-label">Limited-time drop</span>
              <h2>Big finds.<br /><em>Better prices.</em></h2>
              <p>Fresh picks are waiting. Catch today's favourites before the deal disappears.</p>
              <Link to="/products" className="btn-primary shine-btn">Shop deals →</Link>
            </div>
            <div className="promo-art">
              <div className="promo-glow" />
              <div className="promo-circle" />
              <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=85" alt="Featured watch" />
              <span className="promo-floating">TRENDING</span>
            </div>
            <div className="promo-sparkles" aria-hidden="true"><i /><i /><i /><i /><i /></div>
          </Reveal>
        </section>

        {/* Best sellers */}
        <section className="section-wrap products-section" id="featured">
          <Reveal className="section-heading">
            <div><span className="section-kicker">Most wanted</span><h2>Best sellers</h2><p>Popular picks from your Django catalog.</p></div>
            <Link to="/products" className="section-link">Shop all <span>→</span></Link>
          </Reveal>
          {loading ? (
            <div className="product-grid">{Array.from({ length: 5 }).map((_, i) => <div className="product-skeleton" key={i}><div /><span /><span /></div>)}</div>
          ) : error ? (
            <p className="state-card">{error}</p>
          ) : featured.length ? (
            <div className="product-grid">{featured.map((product, index) => <Reveal key={product.id} delay={index * 80}><ProductCard product={product} compact /></Reveal>)}</div>
          ) : (
            <p className="state-card">Add products from Django Admin and they will appear here.</p>
          )}
        </section>

        {/* Flash sale */}
        <section className="section-wrap" id="deals">
          <Reveal className="flash-sale">
            <div>
              <span className="flash-kicker">⚡ Flash sale</span>
              <h2>Deals that won't wait.</h2>
              <p>Grab a favourite before the timer hits zero.</p>
            </div>
            <div className="countdown">
              <div><strong>{time.h}</strong><small>HRS</small></div><b>:</b>
              <div><strong>{time.m}</strong><small>MIN</small></div><b>:</b>
              <div><strong>{time.s}</strong><small>SEC</small></div>
            </div>
            <Link to="/products" className="flash-button">See deals →</Link>
          </Reveal>
        </section>

        {/* Trending */}
        {trending.length > 0 && (
          <section className="section-wrap">
            <Reveal className="section-heading">
              <div><span className="section-kicker">Fresh on the shelf</span><h2>Trending now</h2></div>
              <Link to="/products" className="section-link">Discover more <span>→</span></Link>
            </Reveal>
            <div className="product-grid trending-grid">{trending.map((product, index) => <Reveal key={product.id} delay={index * 90}><ProductCard product={product} compact /></Reveal>)}</div>
          </section>
        )}

        {/* Story / stats */}
        <section className="section-wrap">
          <Reveal className="story-panel">
            <div className="story-copy">
              <span className="section-kicker">Why ShopNest</span>
              <h2>Shopping should feel <em>simple.</em></h2>
              <p>We keep the experience clean: easy discovery, honest product details, clear pricing and a checkout that doesn't get in your way.</p>
              <div className="story-stats">
                <div><strong>24/7</strong><small>store access</small></div>
                <div><strong>7 day</strong><small>easy returns</small></div>
                <div><strong>100%</strong><small>secure checkout</small></div>
              </div>
            </div>
            <div className="story-visual">
              <div className="story-card story-card-main">
                <span>SHOPNEST</span>
                <strong>Good things<br />are closer.</strong>
                <Link to="/products">Start exploring →</Link>
              </div>
              <div className="story-card story-card-float">✦<br /><small>Curated picks</small></div>
            </div>
          </Reveal>
        </section>

        {/* Newsletter */}
        <section className="section-wrap">
          <Reveal className="newsletter">
            <div><span className="section-kicker">Stay in the loop</span><h2>Deals worth opening.</h2><p>Get new arrivals and special offers without the noise.</p></div>
            <form onSubmit={(event) => event.preventDefault()} className="newsletter-form">
              <input type="email" placeholder="Your email address" aria-label="Your email address" />
              <button className="btn-primary">Join ShopNest</button>
            </form>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Home;
