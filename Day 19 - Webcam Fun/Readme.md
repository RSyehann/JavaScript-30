# 19 - Webcam Fun

# 主題
利用`navigator.mediaDevices.getUserMedia`來取得視訊鏡頭影像，並透過`canvas`來達到拍照與濾鏡的效果。

# 步驟

### Step1. 啟動 Local Server

這個練習需要使用到 local Server，
如果你已經有一個可以在本機 run 起來的 server 可以直接使用，
或在這層資料夾底下運行 `npm install`來安裝`browser-sync`。
安裝完成後可以透過指令`npm start`來啟動localserver(預設port3000)。

> npm 指令需要下載 node.js 來使用。


### Step2. 取得影像

透過`navigator.mediaDevices.getUserMedia`來取得視訊影像


```
function getVideo() {
  // 取得 user 的視訊裝置，回傳 Promise 狀態
  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
   })
   // 如果允許則把回傳的 MediaStream 寫進 HTML 的 Video tag 中並播放
   .then(localMediaStream => {
    /* console.log(localMediaStream); */
    video.src = window.URL.createObjectURL(localMediaStream);
    video.play();
    })
    // 當失敗時印出錯誤結果
    .catch(err => {
      console.error(`ERROR: `, err);
      ))
  }
```

> 參閱： <a href="https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia"> MDN - MediaDevices.getUserMedia()</a>

### Step3. 取得視訊資料並輸出在 canvas 區塊中

```
  function paintToCanvas() {
  // 設置寬高
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.heigth = height;
  // 用 setInterval 來持續取得目前的影像資訊
  return setInterval(() => {
    // 在 canvas 中設置內容來源與 video 相同，並且X、Y軸及長寬與 video 相同
    ctx.drawImage(video, 0, 0, width, height);
  }, 16)
 }
```

> 參閱： <a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage"> MDN - CanvasRenderingContext@D.drawImage</a>

### Step4. 製作拍照功能！

```
function takePhoto() {
  // 拍照的音效 -> 把音效切到第 0 秒並播放
  snap.currentTime = 0;
  snap.play();
  // 利用 toDataURL 把 canvas 的內容轉為 base64 的圖檔資訊
  const data = canvas.toDataURL('image/jpeg');
  // 用 createElement 來建立一個新的 a 元素
  const link = document.createElement('a');
  // 設置連結位置為轉圖檔後的 base64 位置
  link.href = data;
  // 設置連結為下載
  link.setAttribute('download', 'photo');
  // 內部新增一個預覽圖
  link.innerHTML = `<img src="${data}" alt="photo" />`;
  // 在圖片區塞入新圖片 （在第一筆的位置）
  strip.insertBefore(link, strip.firstChild);
}
```

> 參閱： <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL"> MDN - HTMLCanvasElements.toDataURL</a>

> 參閱： <a href="https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore"> MDN - Node.insert Before</a>

### Step5. 濾鏡效果 (紅色)

再回到 Step3. 的`paintToCanvas()`中新增:

```
function paintToCanvas() {
  // ...略
  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    // 透過 getImageData 取得當前 canvas 中的所有像素點(r, g, b, alpha 的資訊)
    let pixels = ctx.getImageData(0, 0, width, height);
    // 製作效果
    pixels = redEffect(pixels); // 紅色濾鏡效果
    // 置入效果
    ctx.putImageData(pixels, 0, 0);
   }, 16)
 }
```

並新增一個對應的濾鏡 function `redEffect()`

```
  function redEffect(pixels) {
   //透過迴圈將取回的所有像素資料跑一次，i i +=4 是因為四個一組(r, g, b, alpha)
   for (let i = 0; i < pixels.data.length; i += 4) {
    // 下面組合就是單純把R(紅色)增強到達紅色濾鏡的效果
    pixels.data[i + 0] = pixels.data[i + 0] + 100;
    pixels.data[i + 1] = pixels.data[i + 1] - 50;
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5;
   }
   return pixels;
}
```

> 參閱：<a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData"> MDN - CanvasRenderingContext2D.getImageData()</a>

> 參閱: <a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData"> MDN - putImageData() </a>

# 其他

另外還有色彩分離與綠幕的濾鏡效果，
基本上程式操作邏輯與 Step5 的紅色濾鏡效果相同，
不過色彩的偏移設定我沒什麼顏色概念可以做說明...
所以能用紅色濾鏡做說明。

