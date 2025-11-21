import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { submitOrder } from '../services/api';
import { Loader2 } from 'lucide-react';

export default function CheckoutForm() {
    const { cart, cartTotal, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error' | null

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (cart.length === 0) return;

        setLoading(true);
        setStatus(null);

        const formData = new FormData(e.target);
        const orderData = {
            contact: formData.get('contact'),
            recipientName: formData.get('recipientName'),
            shippingMethod: formData.get('shippingMethod'),
            totalAmount: cartTotal,
            items: cart.map(item => `${item.name} x${item.quantity}`).join(', '), // Optional: send items detail if backend supports it, otherwise just total
            // The backend expects: contact, recipientName, shippingMethod, totalAmount
        };

        const result = await submitOrder(orderData);

        setLoading(false);
        if (result.success) {
            setStatus('success');
            clearCart();
            e.target.reset();
        } else {
            setStatus('error');
        }
    };

    if (cart.length === 0 && status !== 'success') {
        return null; // Don't show checkout if cart is empty, unless success message
    }

    return (
        <section id="checkout" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-2xl">
                <h2 className="text-3xl font-bold text-center mb-8 uppercase tracking-wider">
                    Checkout
                </h2>

                {status === 'success' ? (
                    <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg text-center">
                        <h3 className="text-xl font-bold mb-2">Order Placed Successfully!</h3>
                        <p>Thank you for your purchase. We will process your order shortly.</p>
                        <button
                            onClick={() => setStatus(null)}
                            className="mt-4 text-sm underline"
                        >
                            Place another order
                        </button>
                    </div>
                ) : (
                    <div className="bg-white p-8 rounded-lg shadow-sm border">
                        <div className="mb-8 pb-8 border-b">
                            <h3 className="text-lg font-bold mb-4">Order Summary</h3>
                            <div className="space-y-2 mb-4">
                                {cart.map(item => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span>{item.name} x{item.quantity}</span>
                                        <span>${(item.price * item.quantity).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between text-lg font-bold pt-4 border-t">
                                <span>Total</span>
                                <span>${cartTotal.toLocaleString()}</span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="recipientName"
                                    name="recipientName"
                                    required
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
                                    placeholder="Jane Doe"
                                />
                            </div>

                            <div>
                                <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
                                    Contact (Phone / Email)
                                </label>
                                <input
                                    type="text"
                                    id="contact"
                                    name="contact"
                                    required
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
                                    placeholder="0912345678"
                                />
                            </div>

                            <div>
                                <label htmlFor="shippingMethod" className="block text-sm font-medium text-gray-700 mb-1">
                                    Shipping Method
                                </label>
                                <select
                                    id="shippingMethod"
                                    name="shippingMethod"
                                    required
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
                                >
                                    <option value="Standard Shipping">Standard Shipping (Free)</option>
                                    <option value="Express Shipping">Express Shipping (+$100)</option>
                                    <option value="Store Pickup">Store Pickup</option>
                                </select>
                            </div>

                            {status === 'error' && (
                                <div className="text-red-600 text-sm text-center">
                                    Something went wrong. Please try again.
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-black text-white py-3 rounded-md font-bold uppercase hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                                {loading ? 'Processing...' : 'Place Order'}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </section>
    );
}
