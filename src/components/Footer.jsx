function Footer() {
  return (
    <footer id="footer" className="mt-16 bg-[#24364a] text-slate-300">
      <div className="bg-yellow-400 py-5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 sm:flex-row sm:px-6">
          <p className="font-bold text-slate-900">📦 Sign up for our newsletter</p>
          <div className="flex w-full max-w-md overflow-hidden rounded-lg bg-white">
            <input className="min-w-0 flex-1 px-4 py-2 text-sm text-slate-900 outline-none" placeholder="Your email address" />
            <button className="bg-[#24364a] px-5 text-sm font-bold text-white">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <h3 className="mb-3 text-xl font-black text-white">ShopNest</h3>
          <p className="text-sm leading-6">A full-stack e-commerce project powered by React, Django and Django REST Framework.</p>
        </div>
        <div>
          <h4 className="mb-3 font-bold text-white">Navigate</h4>
          <div className="space-y-2 text-sm"><p>Home</p><p>Shop All</p><p>Featured Products</p><p>Deals</p></div>
        </div>
        <div>
          <h4 className="mb-3 font-bold text-white">Support</h4>
          <div className="space-y-2 text-sm"><p>support@shopnest.local</p><p>+91 0123 45678</p><p>Mon–Sat · 9 AM–6 PM</p></div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs">Built with React + Django REST Framework · © 2026 ShopNest</div>
    </footer>
  );
}

export default Footer;
