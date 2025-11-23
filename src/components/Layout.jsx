import React from 'react';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import FloatingLineButton from './FloatingLineButton';

export default function Layout({ children }) {
    return (
        <div className="flex min-h-screen flex-col font-sans">
            <Header />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
            <CartDrawer />
            <FloatingLineButton />
        </div>
    );
}
