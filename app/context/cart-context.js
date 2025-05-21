"use client"
import {
    createContext,
    useContext,
    useState,
    useEffect
} from "react";

/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} name
 * @property {number} price
 * @property {string} [image]
 * @property {string} [description]
 */

/**
 * @typedef {Object} CartItem
 * @property {number} id
 * @property {string} name
 * @property {number} price
 * @property {number} quantity
 */

/**
 * @typedef {Object} CartContextType
 * @property {CartItem[]} cartItems
 * @property {boolean} isCartOpen
 * @property {(product: Product) => void} addToCart
 * @property {(id: number) => void} removeFromCart
 * @property {(id: number, quantity: number) => void} updateQuantity
 * @property {() => void} toggleCart
 */

const CartContext = createContext(null);

export function CartProvider({children}) {

    const [cartItems, setCartItems] = useState(() => {
        if (typeof window !== "undefined") {
            const savedCart = localStorage.getItem("cart");
            return savedCart ? JSON.parse(savedCart) : [];
        }
        return [];
    });

    const [isCartOpen, setIsCartOpen] = useState(false);

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("cart", JSON.stringify(cartItems))
        }
    }, [cartItems]);

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen)
    }

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id)
            if (existingItem) {
                return prevItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
            } else {
                return [
                    ...prevItems,
                    {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: 1,
                    },
                ]
            }
        })
        setIsCartOpen(true);
    }

    const removeFromCart = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };


    const updateQuantity = (id, quantity) => {
        if (quantity <= 0) {
            removeFromCart(id)
        } else {
            setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
        }
    }

    return (
        <CartContext.Provider
            value={{
                cartItems,
                isCartOpen,
                addToCart,
                removeFromCart,
                updateQuantity,
                toggleCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);