#  11 - Custom Video Player

> 上傳日 2018 / 10 / 01


# 主題 

介紹如何使用 HTML5 的 video tag 來完成各種播放器功能
播放 / 暫停、 快進 / 快退、音量控制、速率控制等...

# 步驟

### Step 1. 基本設定

作者已經有將基礎的 CSS 及 html tag 設定好，僅需針對個項目的功能開始進行 JS 撰寫即可，
但這邊我有將背景色調調整，並把對應 icon 改用 font-awesome 來顯示 (原本是文字符號)。

> 由於寫到最後已經很多寫法跟原作者的方法不太一樣，所以接著各功能會再稍微備註為何這麼寫。


### Step 2. 播放 / 暫停按鈕

為了在整個播放器範圍及點擊播放按鈕時能播放 / 暫停。
先針對兩個元素做 `addEventListener`，
並在`togglePlay()`中使影片產生對應動作 & 更換圖示，比較特別的是使用了`video[method]`的寫法，來直接操作 video 的屬性，直接用在影片是否已經暫停`paused`來判斷。

```
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  const icon = video.paused ? `<i class="icon-play"></i>` : `<i class="icon-pause">`;
  toggle.innerHTML = icon;
  video[method]();
}

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
```
> 原本是將圖標更換 & 影片動作分開寫，我改成寫在一起。

### Step3. 音量 / 速率操作

在 HTML 中已經定義好對應的`input-range`標籤，在這裡只需要做監聽並取屬性值來操作就好了。

```
<input type="range" name="volume" class="player_slider" min="0" max="1" step="0.05" value="1">
<input type="range" name="playvbackRate" class="player__slider" min="0.5" max="2" step="0.1" value="1">
```

在 JavaScript 的部分，ranges 是透過 `querySelectorAll` 來取得的，所以可以用`forEach`來把所有 range 加上
`addEventListener`，也因為 range 是拖曳條，除了`click`外，也必須要監聽`mousemove`，而 name 的命名`volume`與`playbackRate`也就是 vedio 本身的屬性，直接使用。

```
function handleRangeUpdate();
  video[this.name] = this.value;
}
ranges.forEach(range => {
  range.addEventListener('change', handleRangeUpdate);
  range.addEventListener('mousemove', handleRangeUpdate);
})
```

### Step 4. 快進 / 快退操作

一樣也在 HTML 中的 `input`定義好對應的秒數了，只須取出使用。

```
<button data-skip="-10" class="player_button skip_left"><i class="icon-backward"></i></button>
<button data-skip="25" class="play_button skip_right"><i class="icon-forward"></i></button>
```

在 JavaScript 中，原本的寫法只有點擊後觸發，
因為我有加上鍵盤觸發的動作，所以將`skip`加上了一個參數`direction`來判斷，而`skipButtons`也跟Step3的`ranges`一樣用 forEach 來加上監聽效果，
快進快退的做法是取出 input 中設定的 `data-skip`後透過`currentTime`來調整影片時間。

```
function skip(direction) {
  let skipTime = 0;
  if (direction === 'left') {
  skipTime = document.querySelector('.skip_left').dataset.skip;
  } else if (direction === 'right') {
  skipTime = document.querySelector('.skip_right').dataset.skip;
  } else {
  skipTime = this.dataset.skip;
  }
  video.currentTime += parseFloat(skipTime);
}
skipButtons.forEach(button => {
  button.addEventListener('click', skip);
})
```
### Step5. 進度條顯示

使用 video 的`currentTime` 與 `duration` 計算出進度 % 數，
再透過 CSS 改變進度條的色塊 % 數，值得一提的是作者有說到兩個監聽參數： `timeupdate`與`progress`都可以做為影片變動時的觸發條件，
我稍微小測試後發現，使用`progress`會在載入時就將進度顯示在正確位置，
而`timeupdate`必須在啟動播放後才會去抓到正確的位置，
可以將 CSS 中的 flexBasis 預設設為 50% 來觀察這兩者的差別。

```
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}`;
 }
 video.addEventListener('progress', handleProgress);
```
 
 ### Step 6. 進度條操作
 
 在影片的進度條上，作點擊切換段落，或者是按著滑動片段，分解動作會有：`點擊`、`按住並移動`這兩種觸發條件，
 為了要讓 function 能同時判斷兩者狀態，必須要將其中一個條件設 flag，
 這裡就將`mousedown`做了一個flag來操作狀態，
 並利用`e.offsetX`的位置及`progress.offsetWidth`寬度與影片總長來操作當前秒數。
 
 監聽的部分，因為原本重複寫了四次`addEventListener`，
 所以我把會使用到的 event 寫在一個陣列裡面，使用 forEach 去執行。
 
 ```
 let mousedown = false;
 function scrunb(e) {
  const mouseType = e.type;
  if (mouseType === 'mousedown') { mousedown = true; }
  if (mouseType === 'mouseup') { mousedown = false; }
  if (mouseType === 'click' || mouseType === 'mousemove' && mousedown) {
  const scrunbTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrunbTime;
  }
}
const progressEvents = ['click', 'mousemove', 'mousedown', 'mouseup'];
progressEvents.forEach(progressEvent => {
  progress.addEventListener(progressEvent, scrunb);
})
```

### Step 7.全螢幕

作者最後有提到的小功能，他說留給我們自己去研究。
首先在 HTML 中加上對應的功能按鈕與圖標

```
<button class="player_button fullScreen" title="Full Screen"><i class="icon-fullscreen"></i><button>
```

然後再 JavaScript 中加入這段，多個判斷是為了不同瀏覽器而寫的，值得一提的是，不用對取消全螢幕做特別處理，預設就會有 esc 關閉及對應的關閉 icon 了，
但如果有特別需求可以使用`exitFullScdreen()`來關閉。
```
function fullScreen() {
  if(video.requesFullScreen) {
    video.requestFullScreen();
   } else if (video.msRequestFullscreen) {
    video.msRequestFullscreen();
   } else if (video.mozRequestFullScreen) {
    video.mozRequestFullscreen();
   } else if (video.webkitRequestFullScreen) {
    video.webkitRequestFullScreen();
   }
}
fullScreenBtn.addEventListener('click', fullScreen);
```

### Step8. 鍵盤動作偵測

最後加上的功能是鍵盤對應操作，
加入了空白對應 播放 / 暫停、鍵盤左右鍵對應快進 / 快退，空白鍵加上了 `preventDefault`是防止預設空白會跳到最底下的功能。

```
function eventKeydown(e) {
  switch (e.keyCode) {
  //空白鍵
  case 32:
    e.preventDefault()
    togglePlay();
    break;
    //方向鍵左
    case 37:
      skip('left');
      break;
    //方向鍵右
    case 39:
      skip('right');
      break;
    }
 }
 document.addEventListener('keydown', eventKeydown);
 ```
 
 # HTML5 語法 & 備註
 
 ### Video & Media Element
 
 這次的主軸是 HTML 的`video` 標籤，所以蠻多操作都是直接操作`video`的屬性，
 例如偵測暫停的`paused`或是當前播放時間`currentTime`，
 但其實這些屬性並非`video`獨有的，而是 HTML Media Element，好比說`audio`也會有。
 
 >參閱: 
 ><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video"> MDN - Video</a>
 ><a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement"> MDN - HTMLMediaElement</a>
 
 
 # JavaScript 語法 & 備註
 
 ### 屬性使用
 
 在 Step2 中有使用`video[method]()`的方法來操作屬性，
 其實相關的操作方法就等同於`video.play()`，但不能寫成`video.method()`，
 因為這樣就變成呼叫 video 底下的 function method 了，
 所以使用中括號 [] 包起來的會自動變成字串，可以避免掉這樣的問題。
 
 ### HTMLElment.dataset
 在 Step4 中使用到的，使用`dataset`可以取得`htmlTag`中的`data-*`屬性！
 
 > 參閱: <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset"> MDN - dataset</a>
 
 ### Event.preventDefault()
 
 在 Step.8 中使用到的，這個方法是將取消事件(如果事件可取消)，
 這次使用的場景是於網頁瀏覽器中按下空白，預設會將網頁捲到底部，
 但我希望只要啟動我的 播放 / 暫停功能就好不要捲動，就可以使用。
 
 > 參閱: <a href="https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault"> MDN - Event.preventDefault()</a>
 
