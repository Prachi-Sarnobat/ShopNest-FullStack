import "./Footer.css";

function Footer() {
  return (
    <footer id="footer" className="shop-footer">
      <div className="shop-footer-newsletter">
        <div className="shop-footer-newsletter-inner">
          <div>
            <span className="shop-footer-kicker">STAY IN THE LOOP</span>
            <h2>Fresh finds. Better shopping.</h2>
            <p>Get new arrivals, exclusive deals and shopping inspiration.</p>
          </div>

          <form
            className="shop-footer-subscribe"
            onSubmit={(event) => event.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email address"
              aria-label="Your email address"
            />
            <button type="submit">Subscribe →</button>
          </form>
        </div>
      </div>

      <div className="shop-footer-main">
        <div className="shop-footer-grid">
          <div className="shop-footer-brand">
            <a href="/" className="shop-footer-logo">
              Shop<span>Nest</span>
            </a>
            <p>
              A full-stack e-commerce project powered by React,
              Django and Django REST Framework.
            </p>

            <div className="shop-footer-socials">
              <a href="#!" aria-label="Instagram">◎</a>
              <a href="#!" aria-label="Facebook">f</a>
              <a href="#!" aria-label="X">𝕏</a>
              <a href="#!" aria-label="YouTube">▶</a>
            </div>
          </div>

          <div className="shop-footer-column">
            <h3>Navigate</h3>
            <a href="/">Home</a>
            <a href="/products">Shop All</a>
            <a href="/#featured">Featured Products</a>
            <a href="/#deals">Deals</a>
          </div>

          <div className="shop-footer-column">
            <h3>Support</h3>
            <a href="#!">Shipping & Delivery</a>
            <a href="#!">Returns</a>
            <a href="#!">FAQs</a>
            <a href="#!">Contact Us</a>
          </div>

          <div className="shop-footer-column">
            <h3>Let's talk</h3>
            <p>Have a question? We'd love to hear from you.</p>
            <a href="mailto:support@shopnest.local">
              support@shopnest.local
            </a>
            <span>Mon–Sat · 9 AM–6 PM</span>
          </div>
        </div>
      </div>

      <div className="shop-footer-bottom">
        <span>© 2026 ShopNest. All rights reserved.</span>

        <div className="shop-footer-trust">
          <span>Secure checkout</span>
          <b>•</b>
          <span>Fast delivery</span>
          <b>•</b>
          <span>Easy returns</span>
        </div>

        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑ Back to top
        </button>
      </div>
    </footer>
  );
}

export default Footer;
