// Service to interact with Google Apps Script
const API_URL = "https://script.google.com/macros/s/AKfycbyDb4lvuGV7KUkWc83E_5oxdolsPnBNo-N1fuXDUFGF_Fq6yTIPxye2ZhHY5qnSuCGe/exec";

export const submitOrder = async (orderData) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            mode: "no-cors", // Important for Google Apps Script without CORS headers
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
        });
        // With no-cors, we can't check response.ok or get JSON
        // We assume success if no network error
        return { success: true };
    } catch (error) {
        console.error("Order submission failed:", error);
        return { success: false, error };
    }
};

export const fetchProducts = async () => {
    try {
        // 嘗試從 Google Apps Script 取得商品資料
        // 加上 ?action=products 參數來取得商品資料而非訂單資料
        const response = await fetch(`${API_URL}?action=products`);

        if (response.ok) {
            const data = await response.json();
            console.log('從 Google Sheets 載入商品資料:', data);
            console.log('總共載入商品數量:', data.length);

            // 檢查前幾個商品的資料結構
            if (data.length > 0) {
                console.log('第一個商品範例:', data[0]);
                if (data.length > 1) {
                    console.log('第二個商品範例:', data[1]);
                }
            }

            // 轉換中文欄位名稱為英文
            const validProducts = [];
            let invalidCount = 0;

            for (let i = 0; i < data.length; i++) {
                const p = data[i];

                // 支援中文和英文欄位名稱
                const name = p.name || p.產品名稱 || p['產品名稱'];
                let priceRaw = p.price || p.價格 || p['我方11月售價'] || p['我方10月售價'] || p['我方售價'];
                const id = p.id || p.產品編號 || p['產品編號'];
                const image = p.image || p.照片連結 || p['照片連結'];

                // 處理價格：移除逗號並轉換為數字
                if (typeof priceRaw === 'string') {
                    priceRaw = priceRaw.replace(/,/g, ''); // 移除逗號
                }
                const price = Number(priceRaw);

                const hasName = name && String(name).trim() !== '';
                const hasPrice = !isNaN(price) && price > 0;

                if (hasName && hasPrice) {
                    // 轉換為統一的英文欄位格式
                    // 使用組合 ID 確保唯一性：產品編號 + 索引
                    validProducts.push({
                        id: id ? `${id}_${i}` : `product_${i}`,
                        name: String(name).trim(),
                        price: price,
                        image: image || '',
                        description: p.description || p.產品內容說明 || p['產品內容說明'] || '',
                        category: p.category || p.分類 || p['分類'] || '',
                        size: p.size || p.尺寸 || p['尺寸'] || '',
                        color: p.color || p.顏色 || p['顏色'] || '',
                        quantity: p.quantity || p.數量 || p['數量'] || 0,
                        officialPrice: p.officialPrice || p.官網售價 || p['官網售價'] || ''
                    });
                } else {
                    invalidCount++;
                    // 只記錄前 3 個無效商品，避免控制台被塞爆
                    if (invalidCount <= 3) {
                        console.log('無效商品範例 (缺少名稱或價格):', { name, price, priceRaw, raw: p });
                    }
                }
            }

            console.log('有效商品數量:', validProducts.length, '/ 無效商品數量:', invalidCount);

            if (validProducts.length > 0) {
                // 按產品名稱 + 分類分組商品（合併變體）
                const productGroups = new Map();

                for (const product of validProducts) {
                    // 使用產品名稱 + 分類作為分組鍵，確保不同分類的同名商品分開
                    const groupKey = `${product.name}__${product.category}`;

                    if (!productGroups.has(groupKey)) {
                        // 建立新的商品群組
                        productGroups.set(groupKey, {
                            id: product.id.split('_')[0], // 使用第一個變體的基礎 ID
                            name: product.name,
                            price: product.price,
                            image: product.image,
                            description: product.description,
                            category: product.category,
                            officialPrice: product.officialPrice, // 保留官網售價資訊
                            variants: [],
                            availableSizes: new Set(),
                            availableColors: new Set()
                        });
                    }

                    const group = productGroups.get(groupKey);

                    // 加入變體資訊
                    group.variants.push({
                        id: product.id,
                        size: product.size,
                        color: product.color,
                        quantity: product.quantity,
                        price: product.price,
                        officialPrice: product.officialPrice // 保留每個變體的官網售價
                    });

                    // 收集可用的尺寸和顏色
                    if (product.size) group.availableSizes.add(product.size);
                    if (product.color) group.availableColors.add(product.color);

                    // 如果當前變體有圖片而群組沒有，使用當前變體的圖片
                    if (product.image && !group.image) {
                        group.image = product.image;
                    }
                }

                // 轉換 Set 為 Array
                const groupedProducts = Array.from(productGroups.values()).map(group => ({
                    ...group,
                    availableSizes: Array.from(group.availableSizes),
                    availableColors: Array.from(group.availableColors)
                }));

                console.log('✅ 成功載入', validProducts.length, '個商品變體');
                console.log('📦 分組後共', groupedProducts.length, '個獨立商品');
                console.log('第一個分組商品範例:', groupedProducts[0]);

                return groupedProducts;
            } else {
                console.warn('⚠️ 所有商品都被過濾掉了，使用備用資料');
            }
        }
    } catch (error) {
        console.warn('❌ 無法從 Google Sheets 載入商品，使用備用資料:', error);
    }

    // 備用資料：如果 API 載入失敗
    console.log('使用備用商品資料');
    return [
        {
            id: 1,
            name: "Classic Trench Coat",
            price: 12800,
            image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
            variants: [],
            availableSizes: ['S', 'M', 'L'],
            availableColors: ['Black', 'Beige']
        },
        {
            id: 2,
            name: "Silk Blouse",
            price: 4500,
            image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=800&q=80",
            variants: [],
            availableSizes: ['S', 'M'],
            availableColors: ['White', 'Pink']
        },
        {
            id: 3,
            name: "Pleated Skirt",
            price: 3200,
            image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=800&q=80",
            variants: [],
            availableSizes: ['S', 'M', 'L'],
            availableColors: ['Navy', 'Gray']
        },
        {
            id: 4,
            name: "Leather Handbag",
            price: 8900,
            image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
            variants: [],
            availableSizes: [],
            availableColors: ['Brown', 'Black']
        },
    ];
};
