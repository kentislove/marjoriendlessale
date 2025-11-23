import React, { useState } from 'react';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Defensive check for product data
    if (!product || !product.name || product.price === undefined) {
        console.error('Invalid product data:', product);
        return null;
    }

    // 解析圖片網址（支援逗號分隔的多張圖片）
    const parseImages = (imageString) => {
        if (!imageString) return [];
        // 分割逗號並清理空白
        return imageString.split(',').map(url => url.trim()).filter(url => url);
    };

    const images = parseImages(product.image);
    const hasMultipleImages = images.length > 1;
    const currentImage = images[currentImageIndex] || 'https://placehold.co/800x1200/e5e7eb/6b7280?text=No+Image';

    const hasVariants = product.availableSizes?.length > 0 || product.availableColors?.length > 0;

    // 計算庫存數量
    const getStockInfo = () => {
        if (!product.variants || product.variants.length === 0) {
            return { stock: 0, isOutOfStock: true };
        }

        // 篩選符合選擇條件的變體
        const matchingVariants = product.variants.filter(v =>
            (!selectedSize || v.size === selectedSize) &&
            (!selectedColor || v.color === selectedColor)
        );

        if (matchingVariants.length === 0) {
            return { stock: 0, isOutOfStock: true };
        }

        // 累加所有符合條件的變體數量
        const totalStock = matchingVariants.reduce((sum, v) => {
            const qty = Number(v.quantity) || 0;
            return sum + qty;
        }, 0);

        console.log('Selected:', { size: selectedSize, color: selectedColor });
        console.log('Matching variants:', matchingVariants.length);
        console.log('Total stock:', totalStock);

        return {
            stock: totalStock,
            isOutOfStock: totalStock === 0
        };
    };

    const stockInfo = getStockInfo();

    const handleAddToCart = () => {
        if (hasVariants) {
            // 如果有變體，需要選擇尺寸和顏色
            if (product.availableSizes?.length > 0 && !selectedSize) {
                alert('請選擇尺寸');
                return;
            }
            if (product.availableColors?.length > 0 && !selectedColor) {
                alert('請選擇顏色');
                return;
            }

            // 檢查庫存
            if (stockInfo.isOutOfStock) {
                alert('此商品目前缺貨');
                return;
            }

            // 找到對應的變體
            const variant = product.variants?.find(v =>
                (!selectedSize || v.size === selectedSize) &&
                (!selectedColor || v.color === selectedColor)
            );

            if (variant) {
                addToCart({
                    ...product,
                    id: variant.id,
                    size: selectedSize,
                    color: selectedColor,
                    variantId: variant.id,
                    availableStock: stockInfo.stock // 傳遞可用庫存
                });
            }
        } else {
            // 沒有變體，直接加入購物車
            addToCart({
                ...product,
                availableStock: product.quantity || 0 // 傳遞可用庫存
            });
        }
    };

    const nextImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-lg border bg-white">
            {/* 圖片區域 */}
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                <img
                    src={currentImage}
                    alt={product.name}
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                        console.log('Image failed to load:', currentImage);
                        e.target.src = 'https://placehold.co/800x1200/e5e7eb/6b7280?text=No+Image';
                    }}
                />

                {/* 左右導航箭頭（只在有多張圖片時顯示） */}
                {hasMultipleImages && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="h-5 w-5 text-gray-800" />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                            aria-label="Next image"
                        >
                            <ChevronRight className="h-5 w-5 text-gray-800" />
                        </button>

                        {/* 圖片指示器 */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentImageIndex(index);
                                    }}
                                    className={`h-1.5 rounded-full transition-all ${index === currentImageIndex
                                        ? 'w-6 bg-white'
                                        : 'w-1.5 bg-white/60 hover:bg-white/80'
                                        }`}
                                    aria-label={`Go to image ${index + 1}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* 商品資訊 */}
            <div className="flex flex-1 flex-col p-4">
                <h3 className="text-sm font-medium text-gray-900">
                    {product.name}
                </h3>
                <div className="mt-1 flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                        ${product.price.toLocaleString()}
                    </p>
                    {/* 庫存顯示 */}
                    {hasVariants && (selectedSize || selectedColor) && (
                        <p className={`text-xs font-medium ${stockInfo.isOutOfStock ? 'text-red-600' : 'text-green-600'
                            }`}>
                            {stockInfo.isOutOfStock ? '缺貨' : `庫存: ${stockInfo.stock}`}
                        </p>
                    )}
                </div>

                {/* 尺寸選擇器 */}
                {product.availableSizes?.length > 0 && (
                    <div className="mt-3">
                        <label className="text-xs font-medium text-gray-700">尺寸</label>
                        <div className="mt-1 flex flex-wrap gap-2">
                            {product.availableSizes.map(size => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-3 py-1 text-xs border rounded ${selectedSize === size
                                        ? 'bg-black text-white border-black'
                                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* 顏色選擇器 */}
                {product.availableColors?.length > 0 && (
                    <div className="mt-3">
                        <label className="text-xs font-medium text-gray-700">顏色</label>
                        <div className="mt-1 flex flex-wrap gap-2">
                            {product.availableColors.map(color => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`px-3 py-1 text-xs border rounded ${selectedColor === color
                                        ? 'bg-black text-white border-black'
                                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                                        }`}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <button
                    onClick={handleAddToCart}
                    disabled={hasVariants && stockInfo.isOutOfStock && (selectedSize || selectedColor)}
                    className={`mt-4 w-full flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${hasVariants && stockInfo.isOutOfStock && (selectedSize || selectedColor)
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-black text-white hover:bg-gray-800'
                        }`}
                >
                    <Plus className="h-4 w-4" />
                    {hasVariants && stockInfo.isOutOfStock && (selectedSize || selectedColor) ? '缺貨' : '加入購物車'}
                </button>
            </div>
        </div>
    );
}
