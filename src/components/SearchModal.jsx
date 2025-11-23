import React, { useState, useEffect } from 'react';
import { X, Search, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function SearchModal({ isOpen, onClose, allProducts }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const { addToCart } = useCart();

    // 搜尋邏輯
    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }

        const query = searchQuery.toLowerCase().trim();
        const filtered = allProducts.filter(product => {
            const nameMatch = product.name?.toLowerCase().includes(query);
            const categoryMatch = product.category?.toLowerCase().includes(query);
            return nameMatch || categoryMatch;
        });

        setSearchResults(filtered);
    }, [searchQuery, allProducts]);

    // 解析圖片網址（取第一張圖片）
    const getFirstImage = (imageString) => {
        if (!imageString) return 'https://placehold.co/400x600/e5e7eb/6b7280?text=No+Image';
        const images = imageString.split(',').map(url => url.trim()).filter(url => url);
        return images[0] || 'https://placehold.co/400x600/e5e7eb/6b7280?text=No+Image';
    };

    // 關閉模態框並重置搜尋
    const handleClose = () => {
        setSearchQuery('');
        setSearchResults([]);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-4xl mx-4 bg-white rounded-2xl shadow-2xl max-h-[85vh] flex flex-col animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="flex items-center gap-4 p-6 border-b">
                    <Search className="h-6 w-6 text-gray-400" />
                    <input
                        type="text"
                        placeholder="搜尋產品名稱或分類..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 text-lg outline-none"
                        autoFocus
                    />
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Results */}
                <div className="flex-1 overflow-y-auto p-6">
                    {!searchQuery.trim() ? (
                        <div className="text-center text-gray-500 py-12">
                            <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                            <p>輸入產品名稱或分類開始搜尋</p>
                        </div>
                    ) : searchResults.length === 0 ? (
                        <div className="text-center text-gray-500 py-12">
                            <p className="text-lg font-medium mb-2">找不到相關產品</p>
                            <p className="text-sm">請嘗試其他關鍵字</p>
                        </div>
                    ) : (
                        <div>
                            <p className="text-sm text-gray-600 mb-4">
                                找到 {searchResults.length} 個商品
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {searchResults.map((product) => (
                                    <SearchProductCard
                                        key={product.id}
                                        product={product}
                                        getFirstImage={getFirstImage}
                                        addToCart={addToCart}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// 搜尋結果商品卡片組件
function SearchProductCard({ product, getFirstImage, addToCart }) {
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [currentStock, setCurrentStock] = useState(0);

    // 計算總庫存
    const totalStock = product.variants && product.variants.length > 0
        ? product.variants.reduce((sum, variant) => {
            const variantStock = Number(variant.quantity) || 0;
            return sum + variantStock;
        }, 0)
        : Number(product.quantity) || 0;

    // 當尺寸或顏色改變時，更新當前庫存
    useEffect(() => {
        console.log('🔄 尺寸/顏色變更:', { selectedSize, selectedColor });
        console.log('📦 商品變體:', product.variants);

        if (product.variants && product.variants.length > 0) {
            // 如果都沒選擇，顯示總庫存
            if (!selectedSize && !selectedColor) {
                setCurrentStock(totalStock);
                console.log('✨ 未選擇任何選項，顯示總庫存:', totalStock);
                return;
            }

            // 找到匹配的變體
            const matchingVariants = product.variants.filter(v => {
                const sizeMatch = !selectedSize || v.size === selectedSize;
                const colorMatch = !selectedColor || v.color === selectedColor;
                return sizeMatch && colorMatch;
            });

            console.log('🎯 匹配的變體:', matchingVariants);

            if (matchingVariants.length > 0) {
                // 如果有多個匹配的變體（例如只選了尺寸，有多個顏色），加總庫存
                const stock = matchingVariants.reduce((sum, v) => {
                    return sum + (Number(v.quantity) || 0);
                }, 0);
                setCurrentStock(stock);
                console.log('✅ 計算庫存:', stock);
            } else {
                setCurrentStock(0);
                console.log('❌ 無匹配變體');
            }
        } else {
            // 沒有變體的商品
            const stock = Number(product.quantity) || 0;
            setCurrentStock(stock);
            console.log('📌 無變體商品，庫存:', stock);
        }
    }, [selectedSize, selectedColor, product, totalStock]);

    // 加入購物車
    const handleAddToCart = () => {
        if (currentStock < 1) {
            alert('此商品目前缺貨');
            return;
        }

        // 檢查是否需要選擇尺寸或顏色
        const hasSize = product.availableSizes && product.availableSizes.length > 0;
        const hasColor = product.availableColors && product.availableColors.length > 0;

        if (hasSize && !selectedSize) {
            alert('請選擇尺寸');
            return;
        }

        if (hasColor && !selectedColor) {
            alert('請選擇顏色');
            return;
        }

        // 找到對應的變體
        let selectedVariant = null;
        if (product.variants && product.variants.length > 0) {
            selectedVariant = product.variants.find(v => {
                const sizeMatch = !selectedSize || v.size === selectedSize;
                const colorMatch = !selectedColor || v.color === selectedColor;
                return sizeMatch && colorMatch;
            });
        }

        const cartItem = {
            id: selectedVariant ? selectedVariant.id : product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size: selectedSize || '無',
            color: selectedColor || '無',
            quantity: 1,
            availableStock: currentStock
        };

        console.log('🛒 加入購物車:', cartItem);
        addToCart(cartItem);
        alert('已加入購物車！');
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
            <div className="flex gap-4">
                {/* 商品圖片 */}
                <div className="w-32 h-40 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                    <img
                        src={getFirstImage(product.image)}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.src = 'https://placehold.co/400x600/e5e7eb/6b7280?text=No+Image';
                        }}
                    />
                </div>

                {/* 商品資訊 */}
                <div className="flex-1 min-w-0 flex flex-col">
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                        {product.name}
                    </h3>
                    {product.category && (
                        <p className="text-sm text-gray-500 mb-2">
                            {product.category}
                        </p>
                    )}
                    <p className="text-xl font-bold text-gray-900 mb-3">
                        NT$ {product.price?.toLocaleString()}
                    </p>

                    {/* 尺寸選擇 */}
                    {product.availableSizes && product.availableSizes.length > 0 && (
                        <div className="mb-3">
                            <label className="text-xs font-medium text-gray-700 mb-1 block">
                                尺寸
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {product.availableSizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-3 py-1 text-sm border rounded transition-colors ${selectedSize === size
                                            ? 'border-black bg-black text-white'
                                            : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 顏色選擇 */}
                    {product.availableColors && product.availableColors.length > 0 && (
                        <div className="mb-3">
                            <label className="text-xs font-medium text-gray-700 mb-1 block">
                                顏色
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {product.availableColors.map(color => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        className={`px-3 py-1 text-sm border rounded transition-colors ${selectedColor === color
                                            ? 'border-black bg-black text-white'
                                            : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 庫存顯示和加入購物車按鈕 */}
                    <div className="mt-auto flex items-center justify-between gap-3">
                        <div className="text-sm">
                            {currentStock > 0 ? (
                                <span className="text-green-600 font-medium">
                                    庫存 {currentStock}
                                </span>
                            ) : totalStock > 0 ? (
                                <span className="text-orange-600 font-medium">
                                    請選擇尺寸/顏色
                                </span>
                            ) : (
                                <span className="text-red-600 font-medium">
                                    缺貨
                                </span>
                            )}
                        </div>
                        <button
                            onClick={handleAddToCart}
                            disabled={currentStock < 1}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${currentStock >= 1
                                ? 'bg-black text-white hover:bg-gray-800'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            <ShoppingCart className="h-4 w-4" />
                            加入購物車
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
