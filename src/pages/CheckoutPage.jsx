import { useState } from "react";
import { useCart } from "../context/CardContext";

function CheckoutPage() {
  const baseurl = import.meta.env.VITE_DJANGO_BASE_URL?.replace(/\/$/, "") || "http://127.0.0.1:8000";
  const { clearCart, cartItems } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    payment_method: "COD",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
  }     

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    if (!cartItems?.length) {
      setError("Your cart is empty. Add items to your cart before placing an order.");
      setLoading(false);
      return;
    }

    try {
        const response = await fetch(`${baseurl}/api/order/create/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(formData),
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(data.error || "Failed to place order");
        }

        setMessage(data.message || "Order placed successfully!");
        clearCart();
    } catch (err) {
        setError(err.message || "Failed to place order. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        {/* Checkout form content would go here */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields would go here */}
          <input
            type="text"
            name="name"
            placeholder="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p2"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p2"
          />
          <textarea
            name="address"
            id="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p2"
          />
          <input
            type="tel"
            name="phone"
            id="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p2"
          />
          <select
            name="payment_method"
            id="payment_method"
            value={formData.payment_method}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p2"
          >
            <option value="COD">Cash on Delivery</option>
            <option value="CreditCard">online payment</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            {loading ? "Processing..." : "Place Order"}
          </button>

          {message && <p className="mt-4 text-green-500">{message}</p>}
          {error && <p className="mt-4 text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
}
export default CheckoutPage;
