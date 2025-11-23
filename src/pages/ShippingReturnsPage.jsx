import React from 'react';
import { Package, Truck, Store, Users, RefreshCw, AlertCircle } from 'lucide-react';

export default function ShippingReturnsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <section className="bg-black text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Shipping & Returns
                    </h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        配送與退換貨政策說明
                    </p>
                </div>
            </section>

            {/* Shipping Methods */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">配送方式</h2>

                    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
                        {/* 全家店到店（先匯款） */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center justify-center w-14 h-14 bg-green-100 rounded-full">
                                    <Store className="h-7 w-7 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">全家店到店</h3>
                                    <p className="text-sm text-gray-500">先匯款後取貨</p>
                                </div>
                            </div>
                            <div className="space-y-3 text-gray-600">
                                <div className="flex items-start gap-2">
                                    <span className="text-green-600 font-semibold mt-0.5">✓</span>
                                    <p>配送時間：3-5 個工作天</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-green-600 font-semibold mt-0.5">✓</span>
                                    <p>運費：訂單滿 NT$ 1,000 免運，未滿 +NT$ 60</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-green-600 font-semibold mt-0.5">✓</span>
                                    <p>到店後請於 7 天內取貨</p>
                                </div>
                            </div>
                        </div>

                        {/* 全家店到店（貨到付款） */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full">
                                    <Store className="h-7 w-7 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">全家店到店</h3>
                                    <p className="text-sm text-gray-500">貨到付款</p>
                                </div>
                            </div>
                            <div className="space-y-3 text-gray-600">
                                <div className="flex items-start gap-2">
                                    <span className="text-blue-600 font-semibold mt-0.5">✓</span>
                                    <p>配送時間：3-5 個工作天</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-blue-600 font-semibold mt-0.5">✓</span>
                                    <p>運費：訂單滿 NT$ 2,000 免運，未滿 +NT$ 60</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-blue-600 font-semibold mt-0.5">✓</span>
                                    <p>到店後請於 7 天內取貨</p>
                                </div>
                            </div>
                        </div>

                        {/* 宅配到府 */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center justify-center w-14 h-14 bg-purple-100 rounded-full">
                                    <Truck className="h-7 w-7 text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">宅配到府</h3>
                                    <p className="text-sm text-gray-500">先匯款後宅配</p>
                                </div>
                            </div>
                            <div className="space-y-3 text-gray-600">
                                <div className="flex items-start gap-2">
                                    <span className="text-purple-600 font-semibold mt-0.5">✓</span>
                                    <p>配送時間：2-3 個工作天</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-purple-600 font-semibold mt-0.5">✓</span>
                                    <p>運費：固定 NT$ 145</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-purple-600 font-semibold mt-0.5">✓</span>
                                    <p>送達指定地址</p>
                                </div>
                            </div>
                        </div>

                        {/* 面交自取 */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center justify-center w-14 h-14 bg-orange-100 rounded-full">
                                    <Users className="h-7 w-7 text-orange-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">面交自取</h3>
                                    <p className="text-sm text-gray-500">現場付款</p>
                                </div>
                            </div>
                            <div className="space-y-3 text-gray-600">
                                <div className="flex items-start gap-2">
                                    <span className="text-orange-600 font-semibold mt-0.5">✓</span>
                                    <p>時間地點：與客服約定</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-orange-600 font-semibold mt-0.5">✓</span>
                                    <p>運費：免運費</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-orange-600 font-semibold mt-0.5">✓</span>
                                    <p>現場驗貨後付款</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 配送限制 */}
                    <div className="max-w-3xl mx-auto mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-2">全家店到店配送限制</h4>
                                <ul className="space-y-1 text-sm text-gray-700">
                                    <li>• 單件商品重量不可超過 5 公斤</li>
                                    <li>• 單件商品尺寸不可超過 45 x 30 x 30 公分</li>
                                    <li>• 到店後請於 7 天內取貨，逾期將退回</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Returns Policy */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <RefreshCw className="h-12 w-12 mx-auto mb-4 text-gray-700" />
                            <h2 className="text-3xl font-bold mb-4">退換貨政策</h2>
                            <p className="text-gray-600">
                                我們重視您的購物體驗，請詳閱以下退換貨規定
                            </p>
                        </div>

                        {/* 一般商品退換貨 */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <Package className="h-6 w-6 text-green-600" />
                                一般商品退換貨
                            </h3>
                            <div className="space-y-4 text-gray-700">
                                <div className="flex items-start gap-3">
                                    <span className="text-green-600 font-bold text-lg">✓</span>
                                    <div>
                                        <p className="font-semibold">退換貨期限</p>
                                        <p className="text-gray-600">商品收到後 7 天內</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-green-600 font-bold text-lg">✓</span>
                                    <div>
                                        <p className="font-semibold">退換貨條件</p>
                                        <p className="text-gray-600">商品有瑕疵且尚有庫存</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-green-600 font-bold text-lg">✓</span>
                                    <div>
                                        <p className="font-semibold">申請方式</p>
                                        <p className="text-gray-600">透過 LINE@客服聯繫，提供訂單編號及瑕疵照片</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-green-600 font-bold text-lg">✓</span>
                                    <div>
                                        <p className="font-semibold">商品狀態要求</p>
                                        <p className="text-gray-600">商品需保持完整包裝，不影響二次銷售</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sale 商品特別說明 */}
                        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8">
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-red-700">
                                <AlertCircle className="h-6 w-6" />
                                Sale 頁面商品特別說明
                            </h3>
                            <div className="space-y-4">
                                <div className="bg-white rounded-lg p-4 border border-red-200">
                                    <p className="text-red-700 font-semibold mb-2">
                                        ⚠️ Sale 頁面（Maison Mori 官網已完售商品）恕不接受退換貨
                                    </p>
                                    <p className="text-gray-700">
                                        這些商品為限量或已停產商品，一經售出即無法退換。下單前請務必：
                                    </p>
                                </div>
                                <ul className="space-y-2 text-gray-700 ml-6">
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-600 font-bold">•</span>
                                        <span>仔細確認商品尺寸與說明</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-600 font-bold">•</span>
                                        <span>查看商品實際照片</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-600 font-bold">•</span>
                                        <span>如有疑問請先透過 LINE@客服詢問</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* 不接受退換貨的情況 */}
                        <div className="mt-6 bg-white rounded-2xl shadow-lg p-8">
                            <h3 className="text-xl font-bold mb-4">以下情況恕不接受退換貨</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-start gap-2">
                                    <span className="text-gray-400">✗</span>
                                    <span>商品已使用、清洗或吊牌已拆除</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-gray-400">✗</span>
                                    <span>商品包裝不完整或配件短少</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-gray-400">✗</span>
                                    <span>超過 7 天退換貨期限</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-gray-400">✗</span>
                                    <span>非商品本身瑕疵（如個人喜好、尺寸選擇錯誤等）</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-gray-400">✗</span>
                                    <span>Sale 頁面商品（Maison Mori 官網已完售商品）</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 下單須知 */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12">下單須知</h2>

                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg p-8 border border-blue-100">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                        <span className="text-blue-600">1.</span>
                                        確認品項與數量
                                    </h3>
                                    <p className="text-gray-700 ml-6">
                                        下單前請仔細確認購物車內的商品、尺寸、顏色及數量是否正確。
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                        <span className="text-blue-600">2.</span>
                                        填寫收件資訊
                                    </h3>
                                    <p className="text-gray-700 ml-6">
                                        請填寫正確的聯絡方式、收件人姓名及配送資訊，以確保順利收到商品。
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                        <span className="text-blue-600">3.</span>
                                        保留庫存
                                    </h3>
                                    <p className="text-gray-700 ml-6">
                                        訂單送出後，我們會為您保留商品庫存，並透過 LINE@客服回傳付款及寄件資訊。
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                        <span className="text-blue-600">4.</span>
                                        完成付款
                                    </h3>
                                    <p className="text-gray-700 ml-6">
                                        收到匯款帳號後，請於 3 天內完成付款並回傳後五碼，逾期訂單將自動取消。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-black text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">還有其他問題？</h2>
                    <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                        如果您對配送或退換貨有任何疑問，歡迎隨時聯繫我們的客服團隊
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://lin.ee/E6oixVD"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition-colors"
                        >
                            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                            </svg>
                            LINE@客服
                        </a>
                        <a
                            href="mailto:sales@kentware.com"
                            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white hover:bg-gray-100 text-black font-semibold rounded-full transition-colors"
                        >
                            Email 聯繫
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
