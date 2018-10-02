<h1>02 - JS and CSS Clock</h1>

> 上傳時間： 2018/10/01

# 主題
<br>
用 JS 與 CSS 搭配製作一個實時的時鐘效果。



# 步驟

### Step1. 製作時針、分針、秒針

利用 class `hand` 樣式來表現出時、分、秒針的樣式

### Step2. 設定定時器

利用 `setInterval(setDate, 1000);`每秒取得當前時間

### Step3. 利用當前時間來取得對應角度

將每秒取得的時間在`setData`裡面取出，並計算出對應角度
再透過`element.style.transform`來變更 CSS 效果，產生位移的感覺。

# JavaScript 語法 & 備註

### let & const  對於 ES6 新增的區域變數選告與常數宣告

我知道的是 const 需要的是一開始就指定值，且不可再被指定
但在之前的經驗裡，function 內我還是會放 let 來做變數的宣告，
實際上若該值不會再被變動，應該是用 const 做宣告會比較好。

### Date() 取得時間的函數

一定要搭配 new 來使用 像是`new Date()`
以下語法取得小時、分鐘、與秒數
`date.getSeconds()`取得當前秒數
`date.getMinutes()`取得當前分鐘
`date.getHours()`取得當前小時

### setInterval()  定時器

其語法為`setInterval(callback, time)`
第一個參數是要執行的function
第二個則是時間(毫秒)

# CSS 語法 & 備註

### transform-origin 變形的軸心

預設為物件的中心點，在這個範例中設定為100%(right)可以使其從時鐘面的中心點開始旋轉

### transform:rotate() 旋轉物件

數值後方要加上角度`deg`，可超過 360 度，正值為順時針轉，負值為逆時針旋轉。

### transition-timing-function: cubic-bezier() 設定動畫轉場所依據的貝茲曲線

可以透過 chrome 的開發者工具來進行可視化調整。

> 參閱 <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/transform?v=control"> MDN-transform</a>

