import React from 'react';
import ProductGrid from '../components/ProductGrid';

export default function ClothingPage() {
    // 定義服裝分類列表
    const clothingCategories = [
        '背心',
        '襯衫',
        '罩衫',
        '上衣',
        '外套',
        '針織開衫',
        'T恤',
        '織衫',
        '短版T',
        '內搭'
    ];

    return (
        <div className="bg-white">
            {/* 頁面標題 */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-center mb-4 uppercase tracking-wider">
                        Clothing
                    </h1>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto">
                        探索我們精選的服裝系列，包含各式上衣、外套、襯衫等時尚單品
                    </p>
                </div>
            </section>

            {/* 商品展示 */}
            <ProductGrid filterCategories={clothingCategories} />
        </div>
    );
}
