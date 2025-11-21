import React from 'react';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import CheckoutForm from '../components/CheckoutForm';

export default function HomePage() {
    return (
        <>
            <Hero />
            <ProductGrid />
            <CheckoutForm />
        </>
    );
}
