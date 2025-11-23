import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/api';

export default function SalePage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadSoldOutProducts() {
            try {
                const data = await fetchProducts();
                // 篩選出官網售價欄位包含 "已售完" 的商品
                const soldOutProducts = data.filter(p => {
                    if (!p || !p.id || !p.name) return false;

                    // 檢查官網售價欄位是否包含 "已售完"
                    const officialPriceStr = String(p.officialPrice || '');
                    return officialPriceStr.includes('已售完');
                });

                console.log('Sold out products:', soldOutProducts);
                console.log('Sold out products count:', soldOutProducts.length);
                setProducts(soldOutProducts);
            } catch (error) {
                console.error("Failed to load sold out products", error);
            } finally {
                setLoading(false);
            }
        }
        loadSoldOutProducts();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
        );
    }

    return (
        <div className="bg-white">
            {/* 頁面標題 */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-center mb-4 uppercase tracking-wider">
                        Sale
                    </h1>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto">
                        Maison Mori官網已完售商品專區
                    </p>
                </div>
            </section>

            {/* 商品展示 */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    {/* 商品數量顯示 */}
                    <p className="text-center text-sm text-gray-500 mb-6">
                        顯示 {products.length} 個Maison Mori官網已完售商品
                    </p>

                    {/* 商品網格 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 text-gray-500">
                                目前沒有Maison Mori官網已完售的商品
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
