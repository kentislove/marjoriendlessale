import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { fetchProducts } from '../services/api';

export default function ProductGrid({ filterCategories = null }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('全部');
    const [categories, setCategories] = useState(['全部']);

    useEffect(() => {
        async function loadProducts() {
            try {
                const data = await fetchProducts();
                // Filter out any invalid products
                let validProducts = data.filter(p =>
                    p && p.id && p.name && p.price !== undefined
                );

                // 如果提供了 filterCategories，只顯示這些分類的商品
                if (filterCategories && filterCategories.length > 0) {
                    validProducts = validProducts.filter(p =>
                        filterCategories.includes(p.category)
                    );
                }

                console.log('Loaded products:', validProducts);
                setProducts(validProducts);

                // 提取所有分類
                const categorySet = new Set(['全部']);
                validProducts.forEach(product => {
                    if (product.category && product.category.trim()) {
                        categorySet.add(product.category.trim());
                    }
                });
                setCategories(Array.from(categorySet));
                console.log('Categories:', Array.from(categorySet));
            } catch (error) {
                console.error("Failed to load products", error);
            } finally {
                setLoading(false);
            }
        }
        loadProducts();
    }, [filterCategories]);

    // 根據選擇的分類篩選商品
    const filteredProducts = selectedCategory === '全部'
        ? products
        : products.filter(p => p.category === selectedCategory);

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
        );
    }

    return (
        <section id="products" className="py-16 bg-white">
            <div className="container mx-auto px-4">

                {/* 分類選擇器 */}
                <div className="mb-8 flex justify-center">
                    <div className="relative">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="appearance-none bg-white border border-gray-300 rounded-lg px-6 py-3 pr-10 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent cursor-pointer transition-all"
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        {/* 自訂下拉箭頭 */}
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* 商品數量顯示 */}
                <p className="text-center text-sm text-gray-500 mb-6">
                    顯示 {filteredProducts.length} 個商品
                    {selectedCategory !== '全部' && ` (分類: ${selectedCategory})`}
                </p>

                {/* 商品網格 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-gray-500">
                            此分類目前沒有商品
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
