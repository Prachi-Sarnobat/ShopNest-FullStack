import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const baseurl = import.meta.env.VITE_DJANGO_BASE_URL?.replace(/\/$/, "") || "http://localhost:8000";
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    //fetch cart from backend
    const fetchCart = async () =>{
        try{
            const res = await fetch(`${baseurl}/api/cart/`, {
                credentials: "include",
            })
            if(!res.ok) {
                throw new Error("Failed to fetch cart");
            }
            const data = await res.json();
            setCartItems(data.items || []);
            setTotal(data.total || 0);
        }catch (error){
            console.error("Error Fetching cart:",error)
        }
    };
    useEffect(() => {
     fetchCart();
    }, [])
    
    const addToCart = async(product) => {
        const productId = product?.id ?? product;
        try{
            const res = await fetch(`${baseurl}/api/cart/add/`,{
                method: 'POST',
                credentials: "include",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({product_id: productId}),
            })

            if (!res.ok) {
                const errorData = await res.json().catch(() => null);
                throw new Error(errorData?.error || `Failed to add product to cart: ${res.status}`);
            }

            await fetchCart();
        } catch (error) {
            console.error("Error adding to cart:",error);
        }
    }

    const removeFromCart = async(itemId) => {
      try{
         const res = await fetch(`${baseurl}/api/cart/remove/`,{
            method :"POST",
            credentials: "include",
            headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({cart_item_id : itemId}),
            })

            if (!res.ok) {
                const errorData = await res.json().catch(() => null);
                throw new Error(errorData?.error || `Failed to remove from cart: ${res.status}`);
            }

            await fetchCart();
        } catch (error) {
            console.error("Error removing from cart:",error);
        }
    }

    const updateQuantity = async (itemId, quantity) => {
        if (quantity < 1) {
            await removeFromCart(itemId);
            return
        }
        try {
            const res = await fetch(`${baseurl}/api/cart/update/`,{
            method :"POST",
            credentials: "include",
            headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({item_id : itemId, quantity : quantity}),
            })

            if (!res.ok) {
                const errorData = await res.json().catch(() => null);
                throw new Error(errorData?.error || `Failed to update cart quantity: ${res.status}`);
            }

            await fetchCart();
        } catch (error) {
            console.error("Error updating cart:",error);
        }
    }
    const clearCart = async () => {
        setCartItems([]);
        setTotal(0);
    }
    return (
        <CartContext.Provider
            value={{ cartItems,total, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
            </CartContext.Provider>
        );
};

export const useCart = () => useContext(CartContext);