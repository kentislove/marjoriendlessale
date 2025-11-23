import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { cn } from '../lib/utils';
import SearchModal from './SearchModal';
import { fetchProducts } from '../services/api';

export default function Header() {
    const { setIsCartOpen, cartCount } = useCart();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [allProducts, setAllProducts] = useState([]);
    const location = useLocation();

    // 載入所有商品資料供搜尋使用
    useEffect(() => {
        const loadProducts = async () => {
            try {
                const products = await fetchProducts();
                setAllProducts(products);
            } catch (error) {
                console.error('Failed to load products for search:', error);
            }
        };
        loadProducts();
    }, []);

    // 監聽路由變化，自動關閉搜尋框和行動版選單
    useEffect(() => {
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
    }, [location.pathname]);


    return (
        <>
            <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-md">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 hover:bg-gray-100 rounded-md"
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                        <Link to="/" className="text-2xl font-bold tracking-tighter uppercase">
                            Marjorie
                        </Link>
                    </div>

                    {/* 桌面版選單 */}
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
                        <NavLink
                            to="/contact"
                            className={({ isActive }) => cn(
                                "hover:text-gray-600 transition-colors",
                                isActive && "text-black font-semibold"
                            )}
                        >
                            Contact
                        </NavLink>
                    </nav>

                    <div className="flex items-center gap-4">
                        {/* LINE@客服連結 */}
                        <a
                            href="https://lin.ee/E6oixVD"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden md:flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-full transition-colors"
                        >
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                            </svg>
                            LINE@客服
                        </a>

                        {/* 搜尋按鈕 */}
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            title="搜尋商品"
                        >
                            <Search className="h-6 w-6" />
                        </button>

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

                {/* 行動版選單 */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t bg-white">
                        <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
                            <NavLink
                                to="/"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) => cn(
                                    "px-4 py-2 rounded-md hover:bg-gray-100 transition-colors",
                                    isActive && "bg-gray-100 font-semibold"
                                )}
                            >
                                New Arrivals
                            </NavLink>
                            <NavLink
                                to="/clothing"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) => cn(
                                    "px-4 py-2 rounded-md hover:bg-gray-100 transition-colors",
                                    isActive && "bg-gray-100 font-semibold"
                                )}
                            >
                                Clothing
                            </NavLink>
                            <NavLink
                                to="/dress"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) => cn(
                                    "px-4 py-2 rounded-md hover:bg-gray-100 transition-colors",
                                    isActive && "bg-gray-100 font-semibold"
                                )}
                            >
                                Dress
                            </NavLink>
                            <NavLink
                                to="/sale"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) => cn(
                                    "px-4 py-2 rounded-md hover:bg-gray-100 transition-colors",
                                    isActive && "bg-gray-100 font-semibold"
                                )}
                            >
                                Sale
                            </NavLink>
                            <NavLink
                                to="/contact"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) => cn(
                                    "px-4 py-2 rounded-md hover:bg-gray-100 transition-colors",
                                    isActive && "bg-gray-100 font-semibold"
                                )}
                            >
                                Contact
                            </NavLink>

                            {/* 行動版 LINE@客服連結 */}
                            <a
                                href="https://lin.ee/E6oixVD"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-full transition-colors"
                            >
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                                </svg>
                                LINE@客服
                            </a>
                        </nav>
                    </div>
                )}
            </header>

            {/* 搜尋模態框 */}
            <SearchModal
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
                allProducts={allProducts}
            />
        </>
    );
}
