import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { cn } from '../lib/utils';

export default function CartDrawer() {
    const navigate = useNavigate();
    const {
        cart,
        isCartOpen,
        setIsCartOpen,
        removeFromCart,
        updateQuantity,
        cartTotal
    } = useCart();

    if (!isCartOpen) return null;

    // 解析圖片網址（取第一張圖片）
    const getFirstImage = (imageString) => {
        if (!imageString) return 'https://placehold.co/800x1200/e5e7eb/6b7280?text=No+Image';
        // 分割逗號並取第一張圖片
        const images = imageString.split(',').map(url => url.trim()).filter(url => url);
        return images[0] || 'https://placehold.co/800x1200/e5e7eb/6b7280?text=No+Image';
    };

    const handleCheckout = () => {
        setIsCartOpen(false);
        navigate('/checkout');
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={() => setIsCartOpen(false)}
            />

            {/* Drawer */}
            <div className="relative w-full max-w-md bg-white shadow-xl flex flex-col h-full animate-in slide-in-from-right duration-300">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-bold uppercase">Shopping Cart</h2>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                            <p>Your cart is empty.</p>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="mt-4 text-black underline underline-offset-4 hover:text-gray-600"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} className="flex gap-4">
                                <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-md border bg-gray-100">
                                    <img
                                        src={getFirstImage(item.image)}
                                        alt={item.name}
                                        className="h-full w-full object-cover"
                                        onError={(e) => {
                                            e.target.src = 'https://placehold.co/800x1200/e5e7eb/6b7280?text=No+Image';
                                        }}
                                    />
                                </div>
                                <div className="flex flex-1 flex-col justify-between">
                                    <div className="flex justify-between">
                                        <h3 className="font-medium">{item.name}</h3>
                                        <p className="font-medium">${item.price.toLocaleString()}</p>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center border rounded-md">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="p-1 hover:bg-gray-100"
                                            >
                                                <Minus className="h-4 w-4" />
                                            </button>
                                            <span className="px-2 text-sm">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-1 hover:bg-gray-100"
                                            >
                                                <Plus className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-400 hover:text-red-500"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="border-t p-4 space-y-4 bg-gray-50">
                        <div className="flex justify-between text-lg font-bold">
                            <span>Total</span>
                            <span>${cartTotal.toLocaleString()}</span>
                        </div>

                        {/* 購物車說明文字 */}
                        <p className="text-sm text-gray-600 text-center px-2">
                            確認品項與數量後，按『我要下單』填寫收件資訊給小編
                        </p>

                        <button
                            onClick={handleCheckout}
                            className="w-full bg-black text-white py-3 rounded-md font-bold uppercase hover:bg-gray-800 transition-colors"
                        >
                            我要下單 ➜
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
