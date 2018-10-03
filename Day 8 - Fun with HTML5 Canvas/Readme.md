# 8 - Fun with HTML5 Canvas

> 上傳日：2018 / 10 / 03

# 主題

使用 HTML5 的 Canvas 來製作一個畫布，透過滑鼠來繪製彩色粗細不一的線條。

# 步驟

### Step 1

先在 HTML 的地方建立一個`canvas`的區塊，
並設置一個變數 ctx 作為 canvas 的操作元素，
設定顏色`strokeStyle`、樣式`lineJoin`、`lineCap`、`lineWidth`...等等。

### Step 2

接著設定變數各種待會會應用到的變數

```
const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.hieght = window.innerHeight;
ctx.strokeStyle = '#BADA55'; // 研調顏色
ctx.lineJoin = 'round'; // 線條連接樣式(轉角)
ctx.lineCap = 'round'; // 線條結束樣式
ctx.lineWidth = 100;  // 線條寬度
let isDrawing = false;   // 判斷是否執行畫圖中
let lastX = 0;
let lastY = 0;
let hue = 0;   // 色相值，在 hsl 中使用
let direction = true;  // 判斷粗細增減用
```

### Step 3

寫 function 來執行畫圖！

```

function drow (e) {
  // 判斷是否`isDrawing`，`false`則`return`不觸發此 function
  if (!isDrawing) {return; }
  // 設定線條顏色為 hsl 模式，吃變數 hue
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  // 起始畫圖路徑
  ctx.beginPath();
  // 將路徑指針移動到 X、Y點
  ctx.moveTo(lastX, lastY);
  // 將起始點與目前滑鼠位置的X、Y用線條連接起來
  ctx.lineTo(e.offsetX, e.offsetY);
  // 將線條繪製出來
  ctx.stroke();
  // 把結束點放進X、Y變數中
  [lastX, lastY] = [e.offsetX, e.offsetY];
  
  // 做顏色的變化效果，當色相值超過 360 後歸零
  hue++;
  if (hue >= 360) {
      hue = 0;
  }
  // 做線條寬度的變化效果，當寬度達到指令值的時候，切換 direction 的 true / false
  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
      direction = !direction;
  }
  if (direction) {
      ctx.lineWidth++;
  }  else {
      ctx.lineWidth--;
  }
}
```

### Step 4

接著設定滑鼠對應的`addEventListener`效果

```
// 當滑鼠按下時，將目前滑鼠的位置設定為變數中的X、Y並讓 isDrawing 為 true
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY ];
});
// 滑鼠移動中，執行 function draw
canvas.addEventListener('mousemove', draw);
// 滑鼠放開，滑鼠離開 都將 isDrawing 改為 false 不觸發 function draw
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
```


# JavaScript 語法 & 備註

### direction = !direction

學到的是透過這個方式來做 true / false 的切換。

# HTML5 語法 & 備註

這篇幾乎都是使用到 canvas 的功能，
紀錄若要製作像這樣的畫布效果在 canvas 中的使用順序

### 1.定義線條樣式

(1) `strokeStyle`    線條顏色

(2) `lineWidth`      線條寬度

(3) `lineJoin`       線條的轉角樣式

(4) `lineCap`        線條的結束樣式

### 2.移動順序

(1)`beginPath()`     開啟一個新的繪製路徑

(2)`moveTo()`        將繪製路徑的起點移動到指定的座標中

(3)`lineTo()`        連接路徑終點到指定的座標中

(4)`stroke()`        線條的結束樣式


> 參閱： <a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D"> MDN - CanvasRenderingContext2D </a>

# 探索

作者有提到最可以去加入一個圖片相疊時的效果`globalCompositeOperation`
還蠻有趣的，可以再嘗試看看寫各種效果，或是弄幾個 checkbox 就可以設定很多畫筆跟效果了。

> 參閱： <a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation"> MDN - CanvasRenderingContext2D.globalCompositeOperation </a>
