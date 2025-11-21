# Google Apps Script CORS 修復

## 問題
瀏覽器控制台顯示 CORS 錯誤，因為 Google Apps Script 沒有設定 `Access-Control-Allow-Origin` 標頭。

## 解決方案

請更新您的 Google Apps Script 中的 `getProducts` 函式，在最後加上 CORS 標頭：

### 修改後的 getProducts 函式

```javascript
// 新增：取得商品資料的函式
function getProducts() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('SHEETS1'); // 商品資料工作表
  
  if (!sheet) {
    const output = ContentService.createTextOutput(JSON.stringify({ error: '找不到商品資料工作表' }))
      .setMimeType(ContentService.MimeType.JSON);
    output.setHeader('Access-Control-Allow-Origin', '*');
    return output;
  }
  
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) {
    const output = ContentService.createTextOutput('[]').setMimeType(ContentService.MimeType.JSON);
    output.setHeader('Access-Control-Allow-Origin', '*');
    return output;
  }
  
  const headers = data[0];
  const products = [];
  
  // 找出欄位索引
  const nameIdx = headers.indexOf('產品名稱');
  const codeIdx = headers.indexOf('產品編號');
  const priceIdx = headers.indexOf('我方11月售價'); // 使用最新售價
  const imageIdx = headers.indexOf('照片連結');
  const descIdx = headers.indexOf('產品內容說明');
  const categoryIdx = headers.indexOf('分類');
  const sizeIdx = headers.indexOf('尺寸');
  const colorIdx = headers.indexOf('顏色');
  const qtyIdx = headers.indexOf('數量');
  
  // 從第二列開始讀取資料（跳過表頭）
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    
    // 只回傳有產品名稱和價格的商品
    if (row[nameIdx] && row[priceIdx]) {
      products.push({
        id: row[codeIdx] || i, // 使用產品編號作為 ID，若無則用索引
        name: row[nameIdx],
        price: row[priceIdx],
        image: row[imageIdx] || '',
        description: row[descIdx] || '',
        category: row[categoryIdx] || '',
        size: row[sizeIdx] || '',
        color: row[colorIdx] || '',
        quantity: row[qtyIdx] || 0
      });
    }
  }
  
  // 重要：加入 CORS 標頭
  const output = ContentService.createTextOutput(JSON.stringify(products))
    .setMimeType(ContentService.MimeType.JSON);
  output.setHeader('Access-Control-Allow-Origin', '*');
  return output;
}
```

## 關鍵修改

在每個 `return` 語句中，都要：
1. 先建立 `output` 變數
2. 使用 `output.setHeader('Access-Control-Allow-Origin', '*')` 設定 CORS 標頭
3. 回傳 `output`

## 部署步驟

1. 更新 Google Apps Script 中的 `getProducts` 函式
2. 點擊「部署」→「管理部署」
3. 點擊現有部署旁的「編輯」圖示
4. 選擇「新版本」
5. 點擊「部署」
6. 重新整理網頁測試

## 測試

更新後，在瀏覽器控制台應該會看到：
- ✅ "從 Google Sheets 載入商品資料"
- ✅ 顯示真實商品資料陣列
- ❌ 不再有 CORS 錯誤
