import React from 'react';

export default function Hero() {
    return (
        <div className="relative bg-gray-900 text-white overflow-hidden">
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1920&q=80"
                    alt="Fashion Banner"
                    className="h-full w-full object-cover opacity-60"
                />
            </div>
            <div className="relative container mx-auto px-4 py-24 md:py-32 flex flex-col items-center text-center">
                <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tight mb-4">
                    Year End Sale
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mb-8 text-gray-200">
                    Limited time offer. Free shipping on all orders. While stocks last.
                </p>
                <a
                    href="#products"
                    className="bg-white text-black px-8 py-3 rounded-full font-bold uppercase tracking-wide hover:bg-gray-100 transition-colors"
                >
                    Shop Now
                </a>
            </div>
        </div>
    );
}
