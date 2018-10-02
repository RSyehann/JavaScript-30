# 21 - Geolocation

> 上傳日: 2018 / 10 / 02


# 主題

利用`navigator.geolocation`來取得裝置的地理位置與速率

# 步驟

### Step1. 啟動Local Server

這個練習需要使用到local Server，
如果你已經有一個可在本機 run 起來的 server 可以直接使用，
或在這層資料夾底下運行`npm install` 來安裝`browser-sync`，
安裝完成後可以透過指令`npm start`來啟動 localserver (預設port3000)

> npm指令需要下載 node.js 來使用

### Step2. 測試

由於這個練習是需要取得定位資訊，
所以可以透過手機瀏覽器利用`npm start`啟動 server 後的 內網 ip 來連線，
或是使用 Mac 的 `Xcode` 開發工具來模擬移動中的裝置(影片教學是使用後者)。

### Step3. 撰寫程式

```
// 取得 HTML 中的元素
const arrow = document.querySelector('.arrow');
const speed = document.querySelector('.speed-value');
// 使用 watchPosition 來取得使用者的地理位置及海拔、速度
navigator.geolocation.watchPosition((data) => {
  // 若成功取回，則會回傳一組 Position (這裡定義名稱為 data)
  console.log(data);
  // 使用 coords.speed 取回速度(公尺 / 秒)
  speed.textContent = data.coords.speed;
  // 使用 coords.heading 取得方位，代表偏離北方的角度，0為正北、90為正東
  arrow.style.transform = `rotate(${data.coords.heading}deg)`;
}, (err) => {
  // 錯誤回傳訊息，例如為取得定位授權時
  console.log(err);
});
```

> 參閱: <a href="https://developer.mozilla.org/en-US/docs/Web/API/Geolocation"> MDN - Geolocation</a>

