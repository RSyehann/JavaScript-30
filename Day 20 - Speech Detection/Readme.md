# 20 - Speech Detection

# 主題

利用`SpeechRecognition`來做語音辨識，
並透過`interimResults`來輸出識別的結果。

# 步驟

### Step1. 啟動 Local Server

這個練習需要使用到 local Server，
如果你已經有一個可在本機 run 起來的 server 可以直接使用，
或在這層資料夾底下運行`npm install` 來安裝`browser-sync`，
安裝完成後可透過指令`npm start`來啟動 local Server (預設為port 3000)。

> npm 指令需要下載 node.js 來使用

### Step2. 將 SpeechRecognition 建立起來

```
  // 將全域環境中的 SpeechRecognition 指好(依據不同瀏覽器)
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  // 建立一個變數 recognition 來放為語音辨識功能
  const recognition = new SpeechRecognition();
  // 讓語音辨識回傳識別後的資訊 (預設為 false)
  recognition.interimResults = true;
```

> 參閱: <a href="https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/interimResults"> MDN - SpeechRecognition.interimResults </a>

### Step3. 把輸出區域準備好

```
// 建立一個 p 元素在 html 設定好的文字區中
let p = document.createElement('p');
const words = document.querySelector('.words');
words.addpendChild(p);
```

### Step4. 對識別系統作監聽

識別回傳的資料是`NodeList`，所以要用`map`操作得先轉`array`

```
// 監聽識別回傳
recognition.addEventListener('result', e => {
  // 將回傳資料先轉為 array 來操作
  const transcript = Array.from(e.results)
    // 透過 map 取得回傳陣列中的第 0 筆
    .map(result => result[0])
    // 在取得第 0 筆中的 transcript
    .map(result => result.transcript)
    // 用 join 把連結符號消掉
    .join('')
    
    // 把回傳內容塞到 p 元素中
    p.textContent = transcript;
    // 如果回傳內容已經結束 (一段話的結尾) 在建立一個新的 p 元素來放下一段文字
    if (e.result[0].isFinal) {
      p = document.createElement('p');
      words.appendChild(p);
    }
 })
 
 // 監聽如果語音識別起來，則再開啟一次新的識別
 recognition.addEventListener('end', recognition.start);
 // 開始識別
 recognition.start();
```

