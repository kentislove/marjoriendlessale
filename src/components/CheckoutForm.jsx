import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { submitOrder } from '../services/api';
import { Loader2 } from 'lucide-react';

export default function CheckoutForm() {
    const { cart, cartTotal, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error' | null
    const [shippingMethod, setShippingMethod] = useState('');
    const [shippingFee, setShippingFee] = useState(0);
    const [finalTotal, setFinalTotal] = useState(0);

    // 計算運費
    useEffect(() => {
        let fee = 0;

        switch (shippingMethod) {
            case 'family_prepay':
                // 全家店到店（先匯款後取貨）- 滿1000免運，未滿+60
                fee = cartTotal >= 1000 ? 0 : 60;
                break;
            case 'family_cod':
                // 全家店到店（貨到付款）- 滿2000免運，未滿+60
                fee = cartTotal >= 2000 ? 0 : 60;
                break;
            case 'home_delivery':
                // 宅配到府 - 固定145
                fee = 145;
                break;
            case 'pickup':
                // 面交自取 - 免運
                fee = 0;
                break;
            default:
                fee = 0;
        }

        setShippingFee(fee);
        setFinalTotal(cartTotal + fee);
    }, [shippingMethod, cartTotal]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (cart.length === 0) return;

        setLoading(true);
        setStatus(null);

        const formData = new FormData(e.target);
        const orderData = {
            contact: formData.get('contact'),
            recipientName: formData.get('recipientName'),
            shippingMethod: shippingMethod,
            shippingFee: shippingFee,
            subtotal: cartTotal,
            totalAmount: finalTotal,
            items: cart.map(item => `${item.name} (尺寸:${item.size || '無'}, 顏色:${item.color || '無'}) x${item.quantity}`).join(', '),
            // 條件式欄位
            ...(shippingMethod === 'family_prepay' || shippingMethod === 'family_cod' ? {
                storeName: formData.get('storeName'),
                storeCode: formData.get('storeCode'),
            } : {}),
            ...(shippingMethod === 'home_delivery' ? {
                address: formData.get('address'),
            } : {}),
        };

        const result = await submitOrder(orderData);

        setLoading(false);
        if (result.success) {
            setStatus('success');
            clearCart();
            e.target.reset();
            setShippingMethod('');
        } else {
            setStatus('error');
        }
    };

    if (cart.length === 0 && status !== 'success') {
        return null; // Don't show checkout if cart is empty, unless success message
    }

    return (
        <section id="checkout" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-2xl">
                <h2 className="text-3xl font-bold text-center mb-2 uppercase tracking-wider">
                    填寫收件資訊
                </h2>
                <p className="text-center text-gray-600 mb-8">
                    我們會用這份資訊幫你保留庫存，並回傳付款 / 寄件資訊給你
                </p>

                {status === 'success' ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg overflow-hidden">
                        {/* 成功訊息 */}
                        <div className="text-green-800 p-6 text-center">
                            <div className="mb-4">
                                <svg className="w-16 h-16 mx-auto text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-3">訂單已成功送出！</h3>
                            <p className="text-lg mb-2">感謝您的訂購</p>
                            <p className="text-sm">我們會盡快透過 LINE 與您聯繫確認訂單細節。</p>
                        </div>

                        {/* LINE@ 聯繫區塊 */}
                        <div className="bg-white border-t border-green-200 p-6">
                            <div className="text-center mb-4">
                                <p className="text-gray-700 font-semibold mb-2">💬 也歡迎您主動聯繫我們</p>
                                <p className="text-sm text-gray-600">如有任何問題或想加快處理速度，請透過 LINE@ 聯繫客服</p>
                            </div>

                            <a
                                href="https://lin.ee/E6oixVD"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
                            >
                                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                                </svg>
                                <span className="text-lg">立即聯繫 LINE@客服</span>
                            </a>
                        </div>

                        {/* 繼續購物按鈕 */}
                        <div className="bg-gray-50 border-t border-green-200 p-4 text-center">
                            <button
                                onClick={() => setStatus(null)}
                                className="text-gray-700 hover:text-gray-900 font-medium underline underline-offset-4"
                            >
                                ← 繼續購物
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white p-8 rounded-lg shadow-sm border">
                        {/* 訂單摘要 */}
                        <div className="mb-8 pb-8 border-b">
                            <h3 className="text-lg font-bold mb-4">訂單摘要</h3>

                            {/* 商品列表 */}
                            <div className="space-y-2 mb-4">
                                {cart.map(item => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span className="flex-1">
                                            {item.name}
                                            {item.size && <span className="text-gray-500 ml-1">({item.size})</span>}
                                            {item.color && <span className="text-gray-500 ml-1">{item.color}</span>}
                                            <span className="text-gray-500"> x{item.quantity}</span>
                                        </span>
                                        <span className="font-medium">NT$ {(item.price * item.quantity).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>

                            {/* 小計 */}
                            <div className="flex justify-between text-sm pt-4 border-t">
                                <span>小計</span>
                                <span>NT$ {cartTotal.toLocaleString()}</span>
                            </div>

                            {/* 運費 */}
                            {shippingMethod && (
                                <>
                                    <div className="flex justify-between text-sm mt-2">
                                        <span>運費</span>
                                        <span className={shippingFee === 0 ? 'text-green-600 font-medium' : ''}>
                                            {shippingFee === 0 ? '免運 ✓' : `NT$ ${shippingFee}`}
                                        </span>
                                    </div>

                                    {/* 免運提示 */}
                                    {shippingMethod === 'family_prepay' && cartTotal < 1000 && (
                                        <div className="text-xs text-orange-600 mt-1 text-right">
                                            💡 再買 NT$ {(1000 - cartTotal).toLocaleString()} 即可免運
                                        </div>
                                    )}
                                    {shippingMethod === 'family_cod' && cartTotal < 2000 && (
                                        <div className="text-xs text-orange-600 mt-1 text-right">
                                            💡 再買 NT$ {(2000 - cartTotal).toLocaleString()} 即可免運
                                        </div>
                                    )}
                                </>
                            )}

                            {/* 總計 */}
                            <div className="flex justify-between text-lg font-bold pt-4 border-t mt-4">
                                <span>總計</span>
                                <span className="text-xl">NT$ {finalTotal.toLocaleString()}</span>
                            </div>
                        </div>

                        {/* 結帳表單 */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* 姓名 */}
                            <div>
                                <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700 mb-1">
                                    姓名 *
                                </label>
                                <input
                                    type="text"
                                    id="recipientName"
                                    name="recipientName"
                                    required
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                                    placeholder="請輸入您的姓名"
                                />
                            </div>

                            {/* LINE ID / 聯絡方式 */}
                            <div>
                                <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
                                    LINE ID / 聯絡方式 *
                                </label>
                                <input
                                    type="text"
                                    id="contact"
                                    name="contact"
                                    required
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                                    placeholder="請輸入 LINE ID 或手機號碼"
                                />
                            </div>

                            {/* 配送方式選擇器 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    配送方式 *
                                </label>
                                <div className="space-y-3">
                                    {/* 全家店到店（先匯款後取貨） */}
                                    <label className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${shippingMethod === 'family_prepay'
                                        ? 'border-black bg-gray-50'
                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                        }`}>
                                        <input
                                            type="radio"
                                            name="shippingMethod"
                                            value="family_prepay"
                                            checked={shippingMethod === 'family_prepay'}
                                            onChange={(e) => setShippingMethod(e.target.value)}
                                            className="mt-1 mr-3"
                                            required
                                        />
                                        <div className="flex-1">
                                            <div className="font-medium">全家店到店（先匯款後取貨）</div>
                                            <div className="text-sm text-gray-600 mt-1">
                                                滿 NT$ 1,000 免運，未滿 +NT$ 60
                                            </div>
                                        </div>
                                    </label>

                                    {/* 全家店到店（貨到付款） */}
                                    <label className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${shippingMethod === 'family_cod'
                                        ? 'border-black bg-gray-50'
                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                        }`}>
                                        <input
                                            type="radio"
                                            name="shippingMethod"
                                            value="family_cod"
                                            checked={shippingMethod === 'family_cod'}
                                            onChange={(e) => setShippingMethod(e.target.value)}
                                            className="mt-1 mr-3"
                                        />
                                        <div className="flex-1">
                                            <div className="font-medium">全家店到店（貨到付款）</div>
                                            <div className="text-sm text-gray-600 mt-1">
                                                滿 NT$ 2,000 免運，未滿 +NT$ 60
                                            </div>
                                        </div>
                                    </label>

                                    {/* 宅配到府 */}
                                    <label className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${shippingMethod === 'home_delivery'
                                        ? 'border-black bg-gray-50'
                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                        }`}>
                                        <input
                                            type="radio"
                                            name="shippingMethod"
                                            value="home_delivery"
                                            checked={shippingMethod === 'home_delivery'}
                                            onChange={(e) => setShippingMethod(e.target.value)}
                                            className="mt-1 mr-3"
                                        />
                                        <div className="flex-1">
                                            <div className="font-medium">宅配到府（先匯款後宅配）</div>
                                            <div className="text-sm text-gray-600 mt-1">
                                                固定運費 NT$ 145
                                            </div>
                                        </div>
                                    </label>

                                    {/* 面交自取 */}
                                    <label className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${shippingMethod === 'pickup'
                                        ? 'border-black bg-gray-50'
                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                        }`}>
                                        <input
                                            type="radio"
                                            name="shippingMethod"
                                            value="pickup"
                                            checked={shippingMethod === 'pickup'}
                                            onChange={(e) => setShippingMethod(e.target.value)}
                                            className="mt-1 mr-3"
                                        />
                                        <div className="flex-1">
                                            <div className="font-medium">面交自取</div>
                                            <div className="text-sm text-green-600 mt-1">
                                                ✓ 免運費
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* 條件式欄位：全家店到店 */}
                            {(shippingMethod === 'family_prepay' || shippingMethod === 'family_cod') && (
                                <>
                                    <div>
                                        <label htmlFor="storeName" className="block text-sm font-medium text-gray-700 mb-1">
                                            全家店名 *
                                        </label>
                                        <input
                                            type="text"
                                            id="storeName"
                                            name="storeName"
                                            required
                                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                                            placeholder="例：台北信義店"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="storeCode" className="block text-sm font-medium text-gray-700 mb-1">
                                            全家店號 *
                                        </label>
                                        <input
                                            type="text"
                                            id="storeCode"
                                            name="storeCode"
                                            required
                                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                                            placeholder="例：012345"
                                        />
                                    </div>
                                </>
                            )}

                            {/* 條件式欄位：宅配地址 */}
                            {shippingMethod === 'home_delivery' && (
                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                        詳細地址 *
                                    </label>
                                    <textarea
                                        id="address"
                                        name="address"
                                        required
                                        rows="3"
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black resize-none"
                                        placeholder="請輸入完整地址，包含縣市、鄉鎮市區、街道門牌號碼&#10;例：台北市信義區信義路五段7號"
                                    />
                                </div>
                            )}

                            {/* 條件式欄位：面交提醒 */}
                            {shippingMethod === 'pickup' && (
                                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 text-2xl">
                                            ⚠️
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-yellow-900 mb-2">
                                                請聯絡客服確認面交時間地點
                                            </h4>
                                            <p className="text-sm text-yellow-800 mb-3">
                                                選擇面交自取後，請透過 LINE@ 客服聯絡我們，確認面交的時間和地點。
                                            </p>
                                            <a
                                                href="https://lin.ee/E6oixVD"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                                                </svg>
                                                聯絡 LINE@ 客服
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 錯誤訊息 */}
                            {status === 'error' && (
                                <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg text-center">
                                    訂單送出失敗，請稍後再試或聯絡客服。
                                </div>
                            )}

                            {/* 送出按鈕 */}
                            <button
                                type="submit"
                                disabled={loading || !shippingMethod}
                                className="w-full bg-black text-white py-3 rounded-md font-bold uppercase hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                                {loading ? '處理中...' : '送出訂單需求'}
                            </button>

                            {!shippingMethod && (
                                <p className="text-sm text-gray-500 text-center">
                                    請先選擇配送方式
                                </p>
                            )}
                        </form>
                    </div>
                )}
            </div>
        </section>
    );
}
