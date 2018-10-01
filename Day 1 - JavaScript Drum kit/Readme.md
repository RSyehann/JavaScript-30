### This is a JavaScript practice with <a href="https://javascript30.com/">JavaScript30</a> by <a href="https://wesbos.com/">Wes Bos</a> without any frameworks, no compilers, no boilerplate, and no libraries.
這是一個 JS30 挑戰的紀錄與心得分享，希望你會喜歡:)


<h1>01 - Drum kit</h1>

<p>主題：透過 JS 使鍵盤在按下按鍵時播放出對應按鍵的聲音，並同時產生一個特效，在按下其他鍵後會關閉該特效並於新按鍵中啟用</p>

# [<a href="">Demo</a>] [<a href="https://github.com/RSyehann/JavaScript-30">GitHub</a>] 

步驟

### Step 1.新增keydown Listener

利用window.addEventListener('keydown', playSound);來監聽鍵盤動作。

### Step 2.建立 function playSound
  
  1.利用傳入的 e.keyCode 來取得對應的 audio 標籤及該按鍵的 div 標籤
  2.判斷傳入的 e.keyCode 是否有對應的 audio 標籤，若無則退出
  3.使對應的 div 加上 playing 樣式，產生對應的點擊特效
  4.使對應的 audio播放時間為0
  5.播放對應的音檔

### Step3. 新增transitioned listener

1.偵測所有包含 className='key' 的元件
2.當該元件觸發特效並結束時(transitionend)，呼叫 removeTransition

### Step4. 建立function removeTransition

1.判斷傳入的 propertyName 是否為 transform 若否則退出
2.若為transform，則移除 playing 樣式

<h2>JavaScript 語法 & 備註</h2>

<h3>element.classList: </h3>

這個會回傳 element 的 class值（陣列）
範例用到了 classList 的方法 add() 及 remove()

classList.add('aaa', 'bbb', 'ccc'); //新增多個className
classList.remove('aaa', 'bbb', 'ccc'); //移除多個className

如果已經存在／不存在的 className 則會被忽略。

 還有其他法如：
 toggle()偵測是否存在這個className，存在則刪除/不存在則新增
 contains() 偵測是否存在這個className, 返回true/false
參閱：<a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/classList">MDN-Element.classList</a>

<h3> HTMLmediaElement(audio);</h3>

HTML的 `audio` 標籤，在 HTML 放置如下標籤指定音源

<audio src="sound/a.mp3"></audio>

透過 JavaScript 來操作：
`element.play()`進行播放
`element.currentTime`指定播放秒數
範例中使用 currentTime 是為了達到連發的效果

<h3>forEach</h3>

之前沒在 JavaScript 中使用的語法，用法如下：
```
arr.forEach(callback function)
```

```
let datas = ['data1', 'data2', 'data3'];
//for迴圈寫法
for(let i = 0; i < datas.length; i++) {
  console.log(datas[i]);
}
//forEach寫法
datas.forEach(function(data){
  console.log(data);
});
三者都會輸出
//data1
//data2
//data3

datas.forEach(console.log);
//如果透過上面直接console.log來看到結果是：
//data1 0 ["data1", "data2", "data3"]
//data2 1 ["data1", "data2", "data3"]
//data3 2 ["data1", "data2", "data3"]
//回傳的分別是value, index, array本身內容。

> 參閱：<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach"> MDN-Array-prototype.forEach() </a>

箭頭函式(Arrow Function)

ES6的新語法

```
//傳統寫法
let func1 = function(arg) { console.log('Hi, ' +arg); };
//箭頭函式寫法
let func2 = arg => console.log('Hi, ' + arg);
//補充：如果該 function 沒有參數要傳，要帶空括號如下
let func3 = () => console.log('Hi');
```

> 參閱:<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions"> MDN-Arrow functions </a>

### addEventListener
因為是第一次看到 `transtionend` 這個event，所以去 MDN 查了 HTML DOM event 紀錄連結在此

> 參閱:<a href="https://developer.mozilla.org/en-US/docs/Web/Events"> MDN-Event Reference </a>

### template literals 模板文字

是利用 - 反引號(back-tik)或稱重音符(grave accent)來組合字串，在範圍內可利用`${}` 加上變數操作

例如原本的字串 + 變數組合寫法

```
let str = '<div data-key"' +  key + '">' + '<button>click me</button>' + '</div>';
```
改用 template string 來做只要
```
let str = `<div data-key="${key}">
          <button>click me</button>
          </div>`;
```

用```包住字串，利用`${}` 來包變數這樣可以很輕鬆的組出易於閱讀的組合字串！不用像ES5語法還要注意單雙引號與＋的配合。

參閱： <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals"> Template literals</a>

Array.from

範例中有這段
const keys = Array.from(document.querySelectorAll('.key'));

查詢了`Array.from`才知道這是一個將一個物件或是字串轉為陣列格式的語法，但當時覺得為何要把陣列再轉成陣列，querySelectorAll 不就是返回陣列嗎？
再查下去才發現 querySelectorAll 返回的是 nodeList 且 nodeList 跟 Array 是不同的，雖然都很像陣列，但 nodeList 並沒有 array.prototype 上的方法ㄅ
最簡單的例子是用 array.push() 去測試，會發現由 querySelectorAll 得到的物件無法用.push()。


```
let testNodeList = document.querySelectorAll('.key');
testNodeList.push('add');  // <-- 非陣列會報錯TypeError; testNodeList.push is not a function

let testArray = Array.from(testNodeList);
Array.push('add');  // <-- 轉為陣列就可以了
```

至於在範例中轉型的原因，
我想應該是因為若無轉型為 Array 使用 nodeList 來 forEach 可能會導致某些瀏覽器版本錯誤。

nodeList 由 querySelector 及 childNodes 返回的參閱： <a href="https://developer.mozilla.org/en-US/docs/Web/API/NodeList"> MDN-NodeList </a>


### CSS語法 ＆ 備註

display: flex

CSS3 的排版語法，以範例中的來做備註紀錄

```
.keys {
  display: flex; /*要使用 flex 要在元素內先宣告 flex */
  flex: 1; /* 這是一個簡寫，全部為flex: flex-grow|flex-shrink|flex-basis*/
  min-height: 100vh; /*vh代表view height, 百分比呈現 */
  align-items: center; /* 宣告後為 flex 後才有效的屬性，垂直置中*/
  justify-content: center; /* 宣告後 flex 後才有效的屬性，水平置中*/
}

> 參閱: <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/flex">MDN-flex </a>


