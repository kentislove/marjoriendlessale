import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ClothingPage from './pages/ClothingPage';
import DressPage from './pages/DressPage';
import SalePage from './pages/SalePage';
import ContactPage from './pages/ContactPage';
import ShippingReturnsPage from './pages/ShippingReturnsPage';
import CheckoutPage from './pages/CheckoutPage';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <BrowserRouter basename="/marjoriendlessale">
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/clothing" element={<ClothingPage />} />
            <Route path="/dress" element={<DressPage />} />
            <Route path="/sale" element={<SalePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/shipping-returns" element={<ShippingReturnsPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;


