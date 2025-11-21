# Google Apps Script 更新說明

## 需要修改的部分

請在您的 Google Apps Script 中修改 `doGet` 函式，讓它能夠根據查詢參數回傳不同的資料：

### 修改後的 doGet 函式

```javascript
function doGet(e) {
  // 檢查是否有 action 參數
  const action = e.parameter.action;
  
  // 如果 action=products，回傳商品資料
  if (action === 'products') {
    return getProducts();
  }
  
  // 預設行為：回傳訂單收件資料（保留原功能）
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  if (data.length === 0) {
    return ContentService.createTextOutput('[]').setMimeType(ContentService.MimeType.JSON);
  }
  var headers = data.shift();
  var result = [];
  for (var i = 0; i < data.length; i++) {
    var row = {};
    for (var j = 0; j < headers.length; j++) {
      row[headers[j]] = data[i][j];
    }
    result.push(row);
  }
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// 新增：取得商品資料的函式
function getProducts() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('SHEETS1'); // 商品資料工作表
  
  if (!sheet) {
    return ContentService.createTextOutput(JSON.stringify({ error: '找不到商品資料工作表' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) {
    return ContentService.createTextOutput('[]').setMimeType(ContentService.MimeType.JSON);
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
  
  return ContentService.createTextOutput(JSON.stringify(products))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## 部署步驟

1. 開啟您的 Google Apps Script 專案
2. 將上述 `doGet` 和 `getProducts` 函式複製貼上，**取代**現有的 `doGet` 函式
3. 點擊「部署」→「管理部署」
4. 點擊現有部署旁的「編輯」圖示（鉛筆）
5. 在「版本」下拉選單選擇「新版本」
6. 點擊「部署」
7. **重要**：確認部署後的 URL 與之前相同

## 測試

部署完成後，您可以在瀏覽器測試：
```
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=products
```

應該會看到 JSON 格式的商品資料。
