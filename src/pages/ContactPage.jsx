import React from 'react';
import { Mail, MessageCircle } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <section className="bg-black text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Contact Us
                    </h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        我們隨時為您服務！歡迎透過以下方式與我們聯繫
                    </p>
                </div>
            </section>

            {/* Contact Options */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">

                        {/* LINE@ Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow border border-gray-100">
                            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6 mx-auto">
                                <MessageCircle className="h-8 w-8 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-center mb-4">LINE@客服</h2>
                            <p className="text-gray-600 text-center mb-6">
                                最快速的聯繫方式！我們的客服團隊會立即為您解答
                            </p>
                            <div className="space-y-4">
                                <a
                                    href="https://lin.ee/E6oixVD"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition-colors shadow-md hover:shadow-lg"
                                >
                                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                                    </svg>
                                    開啟 LINE 對話
                                </a>
                                <div className="text-center">
                                    <p className="text-sm text-gray-500">或掃描 QR Code</p>
                                    <div className="mt-4 inline-block p-4 bg-gray-50 rounded-lg">
                                        <img
                                            src="https://qr-official.line.me/gs/M_e6oixvd_GW.png"
                                            alt="LINE QR Code"
                                            className="w-40 h-40"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Email Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow border border-gray-100">
                            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 mx-auto">
                                <Mail className="h-8 w-8 text-blue-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-center mb-4">Email 聯繫</h2>
                            <p className="text-gray-600 text-center mb-6">
                                寄送詳細的詢問或建議，我們會盡快回覆您
                            </p>
                            <div className="space-y-4">
                                <a
                                    href="mailto:sales@kentware.com"
                                    className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full transition-colors shadow-md hover:shadow-lg"
                                >
                                    <Mail className="h-5 w-5" />
                                    發送 Email
                                </a>
                                <div className="bg-gray-50 rounded-lg p-4 text-center">
                                    <p className="text-sm text-gray-500 mb-2">Email 地址</p>
                                    <p className="text-lg font-mono font-semibold text-gray-800">
                                        sales@kentware.com
                                    </p>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText('sales@kentware.com');
                                            alert('Email 地址已複製到剪貼簿！');
                                        }}
                                        className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        點擊複製
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Additional Info */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h3 className="text-2xl font-bold mb-6">營業時間</h3>
                        <div className="bg-white rounded-lg shadow-md p-8">
                            <div className="grid md:grid-cols-2 gap-6 text-left">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">LINE@客服</h4>
                                    <p className="text-gray-600">週一至週日</p>
                                    <p className="text-gray-600">10:00 - 22:00</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Email 回覆</h4>
                                    <p className="text-gray-600">週一至週五</p>
                                    <p className="text-gray-600">1-2 個工作天內回覆</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Teaser */}
            <section className="py-16">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-2xl font-bold mb-4">常見問題</h3>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        在聯繫我們之前，您可能想先查看常見問題解答
                    </p>
                    <div className="max-w-2xl mx-auto space-y-4">
                        <details className="bg-white rounded-lg shadow-md p-6 text-left">
                            <summary className="font-semibold cursor-pointer hover:text-blue-600">
                                如何查詢訂單狀態？
                            </summary>
                            <p className="mt-3 text-gray-600">
                                請透過 LINE@客服提供您的訂單編號，我們會立即為您查詢訂單狀態及配送進度。
                            </p>
                        </details>

                        <details className="bg-white rounded-lg shadow-md p-6 text-left">
                            <summary className="font-semibold cursor-pointer hover:text-blue-600">
                                配送需要多久時間？
                            </summary>
                            <p className="mt-3 text-gray-600">
                                全家店到店約 3-5 個工作天，宅配到府約 2-3 個工作天。實際配送時間可能因地區或天候因素而有所調整。
                            </p>
                        </details>

                        <details className="bg-white rounded-lg shadow-md p-6 text-left">
                            <summary className="font-semibold cursor-pointer hover:text-blue-600">
                                可以退換貨嗎？
                            </summary>
                            <div className="mt-3 text-gray-600 space-y-2">
                                <p className="font-semibold text-gray-900">一般商品：</p>
                                <p>商品收到後 7 天內，若商品有瑕疵且尚有庫存，可聯繫客服辦理退換貨。</p>
                                <p className="font-semibold text-gray-900 mt-3">Sale 頁面商品：</p>
                                <p className="text-red-600">⚠️ Sale 頁面（Maison Mori 官網已完售商品）恕不接受退換貨，下單前請確認尺寸與商品狀況。</p>
                            </div>
                        </details>

                        <details className="bg-white rounded-lg shadow-md p-6 text-left">
                            <summary className="font-semibold cursor-pointer hover:text-blue-600">
                                如何確認商品尺寸？
                            </summary>
                            <p className="mt-3 text-gray-600">
                                每件商品頁面都有詳細的尺寸說明，如有疑問可透過 LINE@客服詢問，我們會提供更詳細的尺寸資訊或實品照片。
                            </p>
                        </details>

                        <details className="bg-white rounded-lg shadow-md p-6 text-left">
                            <summary className="font-semibold cursor-pointer hover:text-blue-600">
                                付款方式有哪些？
                            </summary>
                            <div className="mt-3 text-gray-600 space-y-2">
                                <p>我們提供以下付款方式：</p>
                                <ul className="list-disc list-inside ml-4 space-y-1">
                                    <li>全家店到店：先匯款後取貨 或 貨到付款</li>
                                    <li>宅配到府：先匯款後宅配</li>
                                    <li>面交自取：現場付款</li>
                                </ul>
                                <p className="mt-2">匯款帳號會在您下單後由客服提供。</p>
                            </div>
                        </details>

                        <details className="bg-white rounded-lg shadow-md p-6 text-left">
                            <summary className="font-semibold cursor-pointer hover:text-blue-600">
                                商品是正品嗎？
                            </summary>
                            <p className="mt-3 text-gray-600">
                                我們所有商品皆為正品，少部分會標記為樣品及二手商品。
                            </p>
                        </details>

                        <details className="bg-white rounded-lg shadow-md p-6 text-left">
                            <summary className="font-semibold cursor-pointer hover:text-blue-600">
                                可以修改或取消訂單嗎？
                            </summary>
                            <p className="mt-3 text-gray-600">
                                訂單送出後，若尚未出貨，可透過 LINE@客服申請修改或取消。若已出貨則無法取消，需等收到商品後辦理退貨。
                            </p>
                        </details>

                        <details className="bg-white rounded-lg shadow-md p-6 text-left">
                            <summary className="font-semibold cursor-pointer hover:text-blue-600">
                                全家店到店有什麼限制嗎？
                            </summary>
                            <div className="mt-3 text-gray-600 space-y-2">
                                <p>全家店到店配送限制：</p>
                                <ul className="list-disc list-inside ml-4 space-y-1">
                                    <li>單件商品重量不可超過 5 公斤</li>
                                    <li>單件商品尺寸不可超過 45 x 30 x 30 公分</li>
                                    <li>到店後請於 7 天內取貨，逾期將退回</li>
                                </ul>
                            </div>
                        </details>

                        <details className="bg-white rounded-lg shadow-md p-6 text-left">
                            <summary className="font-semibold cursor-pointer hover:text-blue-600">
                                商品有保固嗎？
                            </summary>
                            <p className="mt-3 text-gray-600">
                                衣物採購原則上不提供保固，若有品質瑕疵問題，請於收到商品 7 天內聯繫客服處理。
                            </p>
                        </details>

                        <details className="bg-white rounded-lg shadow-md p-6 text-left">
                            <summary className="font-semibold cursor-pointer hover:text-blue-600">
                                如何知道商品是否還有庫存？
                            </summary>
                            <p className="mt-3 text-gray-600">
                                網站上顯示的庫存為即時更新，若商品顯示「缺貨」或「已售完」則暫時無法購買。您也可以透過 LINE@客服詢問特定商品的庫存狀況。
                            </p>
                        </details>
                    </div>
                </div>
            </section>
        </div>
    );
}
