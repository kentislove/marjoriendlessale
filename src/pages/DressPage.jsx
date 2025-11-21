import React from 'react';
import ProductGrid from '../components/ProductGrid';

export default function DressPage() {
    // 定義裙裝和洋裝分類列表
    const dressCategories = [
        '洋裝',
        '短洋裝',
        '蛋糕裙',
        '長裙',
        '紗裙',
        '短裙',
        '套裝',
        '鉛筆裙',
        '傘裙',
        '雙層裙',
        '直筒裙'
    ];

    return (
        <div className="bg-white">
            {/* 頁面標題 */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-center mb-4 uppercase tracking-wider">
                        Dress
                    </h1>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto">
                        探索我們精選的洋裝與裙裝系列，展現優雅與時尚
                    </p>
                </div>
            </section>

            {/* 商品展示 */}
            <ProductGrid filterCategories={dressCategories} />
        </div>
    );
}
