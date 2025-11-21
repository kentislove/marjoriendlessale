import React from 'react';

export default function Footer() {
    return (
        <footer className="border-t bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-bold uppercase mb-4">Marjorie</h3>
                        <p className="text-sm text-gray-500">
                            Fashion for the modern muse. Timeless pieces designed to elevate your everyday style.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-medium mb-4">Shop</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-black">New Arrivals</a></li>
                            <li><a href="#" className="hover:text-black">Clothing</a></li>
                            <li><a href="#" className="hover:text-black">Accessories</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-black">Contact Us</a></li>
                            <li><a href="#" className="hover:text-black">Shipping & Returns</a></li>
                            <li><a href="#" className="hover:text-black">FAQ</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium mb-4">Newsletter</h4>
                        <p className="text-sm text-gray-500 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                            />
                            <button className="bg-black text-white px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-800">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t pt-8 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} Marjorie Sales. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
