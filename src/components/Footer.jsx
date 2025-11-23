import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <h3 className="text-white text-xl font-bold mb-4">MARJORIE</h3>
                        <p className="text-sm text-gray-400">
                            精選時尚服飾，為您打造獨特風格
                        </p>
                    </div>

                    {/* Shop */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">購物</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/" className="hover:text-white transition-colors">
                                    New Arrivals
                                </Link>
                            </li>
                            <li>
                                <Link to="/clothing" className="hover:text-white transition-colors">
                                    Clothing
                                </Link>
                            </li>
                            <li>
                                <Link to="/dress" className="hover:text-white transition-colors">
                                    Dress
                                </Link>
                            </li>
                            <li>
                                <Link to="/sale" className="hover:text-white transition-colors">
                                    Sale
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">客戶服務</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/shipping-returns" className="hover:text-white transition-colors">
                                    配送與退換貨
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-white transition-colors">
                                    聯絡我們
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="https://lin.ee/E6oixVD"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors"
                                >
                                    LINE@客服
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">聯繫方式</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a
                                    href="mailto:sales@kentware.com"
                                    className="hover:text-white transition-colors"
                                >
                                    sales@kentware.com
                                </a>
                            </li>
                            <li className="text-gray-400">
                                週一至週日 10:00 - 22:00
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Marjorie Sales. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

