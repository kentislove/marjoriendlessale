import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, Menu } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { cn } from '../lib/utils';

export default function Header() {
    const { setIsCartOpen, cartCount } = useCart();

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-4">
                    <button className="md:hidden p-2 hover:bg-gray-100 rounded-md">
                        <Menu className="h-6 w-6" />
                    </button>
                    <Link to="/" className="text-2xl font-bold tracking-tighter uppercase">
                        Marjorie
                    </Link>
                </div>

                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <NavLink
                        to="/"
                        className={({ isActive }) => cn(
                            "hover:text-gray-600 transition-colors",
                            isActive && "text-black font-semibold"
                        )}
                    >
                        New Arrivals
                    </NavLink>
                    <NavLink
                        to="/clothing"
                        className={({ isActive }) => cn(
                            "hover:text-gray-600 transition-colors",
                            isActive && "text-black font-semibold"
                        )}
                    >
                        Clothing
                    </NavLink>
                    <NavLink
                        to="/dress"
                        className={({ isActive }) => cn(
                            "hover:text-gray-600 transition-colors",
                            isActive && "text-black font-semibold"
                        )}
                    >
                        Dress
                    </NavLink>
                    <NavLink
                        to="/sale"
                        className={({ isActive }) => cn(
                            "hover:text-gray-600 transition-colors",
                            isActive && "text-black font-semibold"
                        )}
                    >
                        Sale
                    </NavLink>
                </nav>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ShoppingBag className="h-6 w-6" />
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
}
