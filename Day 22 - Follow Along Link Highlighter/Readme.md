# 22 - Follow Along Link HighLighter

# 主題

透過`getBoundingClientRect`與 CSS 的 `transform`來達到 HighLight 樣式會跟著指定位置移動的效果

# 步驟

### Step1. 取得頁面元素

```
//  取得 HTMl 中所有的 a 元素
const triggers = document.querySelectorAll('a');
// 建立一個 span 來放置 highlight 效果
const highlight = document.createElement('span');
highlight.classList.add('highlight');
// 將建立的 span 加到頁面中
document.body.append(hightlight);
```

### Step2. 撰寫移入狀態

用以下的 JS 對目標(a連結)定位並設定樣式

```
// 效果
function highlightLink() {
  // 取得this(由a.addEventListener傳入，所以會是該a)的資訊
  const linkCoords = this.getBoundingClientRect();
  // 建立一個 coords 物件來存放會使用的寬高與定位資訊
  const coords = {
    width: linkCoords.width,
    height: linkCoords.height,
    left: linkCoords.left + window.scrollX,
    top: linkCoords.top + window.scrollY
  }
  // 設定 highlight 效果的寬高及定位
  highlight.style.width = `${coords.width}px`;
  highlight.style.height = `${coords.height}px`;
  hightlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
 }
 
 // 監聽所有 a 元素的滑鼠移入，觸發 highlightLink
 triggers.forEach(a => a.addEventListener('mouseenter', highlightLink));
 ```
 
 位移的效果主要來自已經寫好的 CSS 與 JS 裡面重新定位的 `translate`
 ```
 .highlight {
  transition: all 0.2s;
  border-bottom: 2px solid white;
  position: absolute;
  top: 0;
  background: white;
  left: 0;
  z-index: -1;
  border-radius: 20px;
  display: block;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
 }
 ```
 
 # 語法 & 備註
 
 ### Element.getBoundingClientRect()
 
 返回目標元素的大小與相對於瀏覽器視窗的位置資訊
 
 > 參閱： <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect"> MDN - Element.getBoundingClientRect </a>
