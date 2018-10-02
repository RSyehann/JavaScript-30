# 15 - LocalStorage

> 上傳日: 2018 / 10 / 02

# 主題

這篇介紹 LocalStorage 的用法，
透過一個小菜單來透過 localStorage 做資料增刪功能。

# 步驟

### Step1. 基礎設定

作者已經設定好這篇練習用的 HTML 與 CSS，
主要的架構由一個`div`包著`ul`與`from`，
類似 Todo-list 的清單(ul)與輸入欄位(form)。

### Step2. 撰寫輸入欄位新增功能

首先取得`form`元素及`ul`，並宣告一個空陣列來存放新增資料。

```
const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = [];
```

接著撰寫一個`addItem`，參照備註：

```
funtion addItem(e) {
    // 加上 preventDefault() 來避免每次 submit 都會重整網頁
    e.preventDefault();
    // 利用再次 querySelector 來選取 form 中的 input 欄位值
    const text = this.querySelector('[name=item]').value;
    // 宣告新增要存入的物件，是輸入的文字與是否勾選的狀態(done)
    const item = {
        text,
        done: false
    }
    console.log(item);
    // 清空輸入欄位
    this.reset();
   }
   
   // 監聽 submit 按鈕
   addItems.addEventListener('submit', addItem);
```

這樣每次 submit 後`items`就會新增在輸入欄位中的物件了！
可透過 console.log 來查看新增的物件狀態。

### Step3. 顯示新增的清單

在上一個步驟中所做的只有存於宣告的陣列中，
並沒有抓出來顯示在 HTML 中，所以要寫一個 function 來顯示：
```
    // ES6 可在 function 中的參數直接設定參數預設值
    function populationList(plates = [], platesList) {
      // 使用 map 搭配 join 來組成字串，並顯示在 HTML 的清單 ul 中
      plateList.innerHTML = plates.map((plate, i) => {
        return `
            <li>
                <input type="checkbox" date-index=${i}, id="item${i}" ${plate.done ? 'checked' : ''}/>
                <label for="item${i}">${plate.text}</label>
            </li>
        `;
     }).join('');
   }
```

然後要記得回到`addItem`中把`platesList`放在`items.push(item)`後面，讓每次輸入後都會執行這個 function 重新列出組成的物件字串。

### Step4. 加入 LocalStorage

當完成了新增功能後，就要進入主軸`LocalStorage`了，
這可以讓瀏覽器存取你設定在這個頁面的資訊，
所以首先在`addItem`中修改加入這段：

```
function addItem(e) {
// ...略
    populateList(items, itemList);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
// ...略
}
```

這裡將 items 的資訊存在 localStorage 中一個叫做`items`的自訂物件中，
注意的是存入的物件或陣列必須透過`JSON.stringify`轉為字串，
因為 loaclStorage 中的值是String，否則直接存只會得到"object object"的字串。

接著修改最一開始宣告的`items`:

```
const items = JSON.parse(localStorage.getItem('items')) || [];
```

讓頁面在重整後，先判斷 localStorage 中是否有存放`items`物件，沒有的話則給空陣列。


### Step5. 儲存 checkbox 狀態
這裡要新增一個 function `toggleDone` 並監聽 `itemsList` 的 click動作，

```
    function toggleDone(e) {
        // 偵測進來的點擊是input(checkbox)才動作
        if (!e.target.matches('input')) return;
        // 取得 checkbox 的 data-index 值
        const el = e.target;
        const index = el.dataset.index;
        // 利用！來使 done 的狀態在 true / false間切換
        items[index].don = !items[index].done;
        // 將更新後的狀態寫入 localStorage 中
        localStorage.setItem('items', JSON.stringify(items));
        // 更新列表
        populateList(items, itemsList);
     }
     // 監聽 click
     itemsList.addEventListener('click', toggleDone); 
 ```
 
 ### Step6. 增加刪除功能
 
 到目前為止只有新增跟儲存的功能，來增加一個刪除按鈕吧，
 首先在`populateList`中字串組成中改成這樣：
 ```
 `
    <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''}/>
        <label for="item${i}">${plate.text}</label>
        <span data-index=${i}>delete<span>
    </li>
 `
```
這會使每次輸出時多一個 delete 的文字在後方，
然後調整`toggleDone`:


```
    function toggleDone(e) {
        // 初始化一個存檔狀態
        let save = false;
        // 取得觸發元素的 data-index 值
        const el = e.target;
        const index = el.dataset.index;
        // 判斷觸發元素，如果是 input 則為 checkbox 的狀態切換
        if(e.target.matches('input')){
            items[index].done = !items[index].done;
            save = true;
        }
        // 如果是 span 則是透過 splice 刪除該物件
        if(e.target.matches('span')){
            items.splice(index, 1);
            save = true;
        }
        // 判斷上方有做事才存檔
        if (save) {
            localStorage.setItem('items', JSON.stringify(items));
            populateList(items, itemsList);
        }
      }
```

### Step7. 新增全選 / 全取消功能

在 HTML 的`form`元素後方加上這段 HTML Code:


```
<style>
    .checkMethod {
    padding: 0;
    text-align: left;
    list-style: none;
   }
</style>
<ul class="checkMethod">
    <li>
        <input class="checkAll" type="checkbox">
        <label>Check All</label>
    </li>
</ul>
```
使其有多一個 checkbox 來操作 全選 / 全取消，
接著撰寫對應的功能:

在 JavaScript 方面
```
// 取得操作元素
const checkAllBtn = document.querySelector('.checkAll');
// 全選 / 全取消
const checkAll = function(e) {
    // 取得觸發當下全選按鈕是否已勾選
    const checkStatus = e.target.checked;
    // 透過迴圈將每個 item 的 checkbox 狀態改為與全選 checkbox 狀態相同
    items.forEach(index => {
        index.done = checkStatus;
    });
    // 存檔
    localStorage.setItem('items', JSON.stringify(items));
    // 重整
    populateList(items, itemsList);
  }
  // 監聽操作元素動作
  checkAllBtn.addEventListener('click', checkAll);
```

