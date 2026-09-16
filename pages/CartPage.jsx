import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../src/context/CardContext";

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, total } = useCart();
  const baseUrl = (
    import.meta.env.VITE_DJANGO_BASE_URL || "http://127.0.0.1:8000"
  ).replace(/\/$/, "");
  const [message, setMessage] = useState("");

  return (
    <main className="min-h-screen bg-slate-100 py-10">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-yellow-600">
              Your shopping bag
            </p>
            <h1 className="text-4xl font-black text-slate-900">Your Cart</h1>
          </div>
          <Link
            to="/products"
            className="font-bold text-blue-700 hover:underline"
          >
            Continue shopping →
          </Link>
        </div>
        {message && (
          <div className="mb-5 rounded-xl bg-white p-4 font-semibold text-slate-800 shadow-sm">
            {message}
          </div>
        )}
        {!cartItems.length ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
            <p className="text-xl font-bold">Your cart is empty.</p>
            <Link
              to="/products"
              className="mt-5 inline-block rounded-full bg-[#24364a] px-6 py-3 font-bold text-white"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
            <div className="space-y-4">
              {cartItems.map((item) => {
                const price = Number(
                  item.product_price ?? item.product?.price ?? 0,
                );
                const quantity = Number(item.quantity || 1);
                const rawImage = item.product_image || item.product?.image;
                const image = rawImage
                  ? rawImage.startsWith("http")
                    ? rawImage
                    : `${baseUrl}${rawImage.startsWith("/") ? "" : "/"}${rawImage}`
                  : null;
                return (
                  <div
                    key={item.id}
                    className="flex flex-col gap-5 rounded-2xl bg-white p-5 shadow-sm sm:flex-row sm:items-center"
                  >
                    {image ? (
                      <img
                        src={image}
                        alt={item.product_name || "Product"}
                        className="h-28 w-28 rounded-xl bg-slate-50 object-contain p-2"
                      />
                    ) : (
                      <div className="h-28 w-28 rounded-xl bg-slate-100" />
                    )}
                    <div className="flex-1">
                      <h2 className="text-lg font-bold">
                        {item.product_name || item.product?.name}
                      </h2>
                      <p className="mt-1 text-lg font-black">
                        ₹{price.toFixed(2)}
                      </p>
                      <p className="text-sm text-slate-500">
                        Item total: ₹{(price * quantity).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, quantity - 1)}
                        className="h-9 w-9 rounded-full bg-slate-100 font-bold"
                      >
                        −
                      </button>
                      <span className="min-w-8 text-center font-bold">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, quantity + 1)}
                        className="h-9 w-9 rounded-full bg-slate-100 font-bold"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-100"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
            <aside className="h-fit rounded-3xl bg-[#24364a] p-7 text-white shadow-xl">
              <p className="text-sm uppercase tracking-widest text-yellow-400">
                Summary
              </p>
              <h2 className="mt-2 text-2xl font-black">Order Total</h2>
              <div className="my-7 flex items-center justify-between border-b border-white/10 pb-5">
                <span className="text-white/70">Subtotal</span>
                <span className="text-2xl font-black">
                  ₹{Number(total || 0).toFixed(2)}
                </span>
                <Link to="/checkout" className="text-sm font-bold text-blue-400 hover:underline">
                  Proceed to Checkout →
                </Link>
              </div>
              <Link
                to="/checkout"
                className="w-full inline-flex items-center justify-center rounded-full bg-yellow-400 px-5 py-3 font-black text-slate-900 hover:bg-yellow-300"
              >
                Proceed to Checkout
              </Link>
              <p className="mt-4 text-center text-xs text-white/60">
                Complete your order on the checkout page.
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

export default CartPage;
