import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ClothingPage from './pages/ClothingPage';
import DressPage from './pages/DressPage';
import SalePage from './pages/SalePage';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/clothing" element={<ClothingPage />} />
            <Route path="/dress" element={<DressPage />} />
            <Route path="/sale" element={<SalePage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
