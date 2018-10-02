# 25 - Event Capture, Propagation, Bubbling and Once

# 主題

解析`addEventListener`中的事件的捕捉、傳遞、氣泡與單次執行方法


# 步驟

### Step1. 建立事件模型與基本呼叫

首先建立三層 DIV 作為稍後測試使用的模型，依序包覆為 : 紫色 > 淺橘色 > 深橘色

```
<div class="one">
  <div class="two">
    <div class="three">
    </div>
  </div>
</div>
```

接著建立`click`事件

```
//取得頁面的所有 div
const divs = document.querySelectorAll('div');

function logText(e) {
  // 印出當前 div 的 class name
  console.log(this.classList.value);
}

// 為對著畫面中間(深橘色/one)做點擊時，console.log印出來的是

```
three
two
one
```

會從`click`的位置的最深處開始向外層連動所有的 div `click`事件，像是氣泡一樣的從內向外浮出去。

### Step3. addEventListener 的第三個參數 -1: capture

深入檢查，會發現其實`addEventListener`是有第三個參數的：

```
divs.forEach(div => div.addEventListener('click', logText, {
  capture: false, // 預設為false
}));
```

第三個參數的第一個屬性`Capture`就是事件的捕捉順序，
剛剛提到 `click` 後 console 印出來的順序是由內向外，
若將`Capture`設為`true`會在點擊中間(深橘色/one)會印出:
```
one
```
就只有印出 one 而已，這是因為對當前最外層的容器 one 去點了，
就已經捕捉到目的了，所以他不會再往下找，只會點擊到最外層目標為止。

### Step4. stopPropagation()

但如果想從內層向外層點，而且是依選取層印出對應層級的話，
就要在列印的 function 加上 `topPropagation()`來使用:

```
function logText(e) {
  console.log(this.classList.value);
  e.stopPropagation(); //stop bubbling!
 }
```

這會使原本向外延伸的氣泡事件停止。

Step5. addEventListener 的第三個參數 -2: once
而`addEventListener`的第三參數還有一個新屬性`once`，
新增一個按鈕的`click`事件來測試：

```
button.addEventListener('click', () => {
  console.log('Click'!!!);
), {
  once: true;
});
```

它可以使這個按鈕`click`被執行結束後，直接`unbind`這個元素與事件，
之後這個按鈕就已經不會再被觸發`click`事件了！可以運用在很多避免重複點擊的狀況，例如表單送出後禁止 user 重複點擊。


