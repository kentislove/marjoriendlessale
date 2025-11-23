import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load cart from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('marjorie-cart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart from local storage", e);
            }
        }
    }, []);

    // Save cart to local storage on change
    useEffect(() => {
        localStorage.setItem('marjorie-cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                // 檢查是否超過庫存
                const availableStock = existing.availableStock || existing.quantity || 0;
                const newQuantity = Math.min(existing.quantity + 1, availableStock);

                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: newQuantity } : item
                );
            }
            // 新增商品時，儲存可用庫存資訊
            return [...prev, {
                ...product,
                quantity: 1,
                availableStock: product.availableStock || product.quantity || 0
            }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (productId) => {
        setCart((prev) => prev.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) {
            removeFromCart(productId);
            return;
        }

        // 檢查庫存限制
        setCart((prev) => {
            const item = prev.find(i => i.id === productId);
            if (!item) return prev;

            // 取得商品的可用庫存
            const availableStock = item.availableStock || item.quantity || 0;

            // 如果新數量超過庫存，限制為最大庫存
            const finalQuantity = Math.min(quantity, availableStock);

            return prev.map((cartItem) =>
                cartItem.id === productId ? { ...cartItem, quantity: finalQuantity } : cartItem
            );
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                isCartOpen,
                setIsCartOpen,
                cartTotal,
                cartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
