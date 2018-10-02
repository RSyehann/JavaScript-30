# 28 - Video Speed Controller

> 上傳日: 2018 / 10 / 02

# 主題

製作一個可控制影片速率的拉把。

這個練習可以算是延續<a href="https://github.com/RSyehann/JavaScript-30/tree/master/Day%2011%20-%20Custom%20Video%20Player"> 11 - Custom Video Player </a>的操作，
主要是把原本`input range`改成`div`的滑鼠事件監聽。


# 步驟

### Step1. 取得頁面元素

```
const speed = document.querySelector('.speed');
const bar = document.querySelector('.speed-bar');
const video = document.querySelector('.flex');
```

### Step2. 建立滑鼠移動監聽與事件

```
/** 滑鼠移動事件 **/
function handleMove (e) {
  // 取得觸發點位置 (滑鼠位於整頁頂端的Y軸定位 - speed 框到整夜頂端的距離)
  const y = e.pageY - this.offsetTop;
  // 設定百分比 (y / speed 框的高度)
  const percent = y / this.offsetHeight;
  const min = 0.4;
  const max = 4;
  // 用 Math.round 來計算取得 四捨五入的百分比值
  const height = Math.round(percent * 100) + '%';
  // 取得播放速率(0.4一跳，最多4倍速)
  const playbackRate = percent * (max - min) + min;
  // 調整 speed-bar 的樣式高度
  bar.style.height = height;
  // 用 toFixed(2) 來設定最多取得小數點後兩位，顯示於 speed-bar 上
  bar.textContent = playbackRate.toFixed(2) + 'x';
  // 控制影片的速率
  video.playbackRate = playbackRate;
}
```

