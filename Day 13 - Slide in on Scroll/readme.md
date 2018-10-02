# 13 - Slide in on Scroll

> 上傳日： 2018 / 10 / 01


# 主題

這篇介紹當滾動視窗到定時，動畫滑入圖片的效果。
而我在這裡替圖片增加了簡易的 lazy load 效果。

# 步驟

### Step1. 基礎設定

作者已經在所有的圖片中加入了待會會用到的 class:

    1. align-right / align-left: 滑入效果用(左 / 右)
    2. slide-in : JavaScript 抓取用並已經將相關的動畫滑入效果寫好。
    
### Step2. 建立觸發條件，並監聽滾動事件

目的是使滾動視窗到定點時顯示效果，
所以要監聽的是整個視窗，用`window`，事件選用`scroll`，
但是如果單純使用`scroll`來操作的話，每次的畫面滾動都會有大量事件被觸發．
會對效能上造成影響，所以作者多寫了一個`debounce`來使觸發間隔為20毫秒以上。

```
function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function () {
    var context = this, args = arguments;
    var later = function () {
        timeout = null;
        if(!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
    };
}
```

所以監聽事件就會寫成`window.addEventListener('scroll',, debounce(checkSlide))`;。

### Step3. 設定觸發後的事件內容

在一開始先取得所有`.slide-in`的圖片元素，使用`querySelectorAll`，

```
const sliderImages = document.querySelectorAll('.slide-in');
```

接著編寫每次`scroll`觸發的`checkSlide` function：

```
function checkSlide() {
    sliderImages.forEach(sliderImage => {
        // 取得圖片 1/2 高度的定位點 (卷軸垂直位移量＋視窗高度) - 1/2圖片高度
        const slideInAt = (window.scrollY + window.innerHeight) - (sliderImage.height / 2);
        // 取得圖片底部定位點 (利用圖片頂部定位點 + 圖片高度取得)
        const imageBottom = sliderImage.offsetTop + sliderImage.height;
        // 判斷視窗是否已經超過圖片高度一半
        const isHalfShown = slideInAt > sliderImage.offsetTop;
        // 判斷滾動範圍是否已經超過圖片底部(卷軸垂直位移量)
        const isNotScrolledPast = window.scrollY < imageBottom;
        // 判斷是否超過圖片一半高，且視窗尚未超過圖片底部來增加或移除 CSS 效果
        if (isHalfShown && isNotScrollPast) {
            sliderImage.classList.add('active');
        } else {
            sliderImage.classList.remove('active');
        }
    });
}
```

# JavaScript 語法備註

### Window.scrollY 目前瀏覽器視窗已滾動的Y軸 (垂直位置)

> 參閱：<a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY"> MDN - Window.scrollY</a>

### Window.innerHeight 目前瀏覽器視窗的高度

> 參閱：<a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/innerHeight"> MDN - Window.innerHeight</a>

### HTMLELement.offsetTop 返回指定元素相對於有父元素`(offsetParent)`中的頂端位置。
以此練習來說`sliderImage`的父元素就是`window`。

> 參閱：<a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/innerHeight"> MDN - Window.innerHeight </a>

### HTMLElement.dataset 透過`dataset`可以取回在 HTML 中設置的 `data-*`內容。
注意使用`dataset`時 property 不用再加上`data-`開頭，例如：

```
<div class="test" data-greet="hi"></div>
```
```
document.querySelector('.test').dataset.greet; // hi
```

> 參閱： <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dataset"> MDN - HTMLElement.dataset </a>
