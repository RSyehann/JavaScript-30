# 09 - Dev Tools Domination

> 上傳日： 2018 / 10 / 01

# 主題

介紹 Chrome 開發工具，各種`console.log`的用法

# DOM Break On...

介紹了 DOM 的中斷點模式，分別有三種觸發模式可選(可複選)

### 1. subtree modifications: 當子元素點發生變化時

### 2. attribute modifications: 當元素發生變化時

### 3. node removal: 當元素被移除時

使用方法為如圖，對選取的元素按下`右鍵 > Break on...`即可。

# Console.Things

介紹各種 console.log 用法

### 1.console.log()

就是我們常用的那個 log 啦 XD



### 2. console.log('%s', value)

可將字串中的%s顯示為指定的參數


### 3. console.log('%c', font-style)

可將字串顯示為參數中帶入的 css 樣式 (font系列的style)

### 4. console.log(warning)

顯示為警告圖示

### 5. console.error()

顯示為錯誤圖示


### 6. console.info()

顯示為資訊圖示

### 7. console.assert()

可以拿來測試判斷是否為真，若為 false 則回傳對應的錯誤訊息。

### 8. console.clear()

清除console的所有訊息。

### 9. console.dir()

可以顯示選取物件的所有屬性，我寫的這個範例中，`console.log(test)`只能返回 test 本身的 funtion 內容
若使用 `console.dir(test)` 則可以印出 test 本身及其所擁有的屬性 (注意屬性第一行run)。

### 10. console.groupCollapsed() & console.groupEnd()

可以把輸出資訊透過 group 包起來。

### 11. console.count()

用來累加出現次數。

### 12. console.time() & console.timeEnd()

可以用來計算區域內執行的時間，我寫的範例是計算取回 json 資料的時間。

### 13. console.table()

可以把資料整理成 table 格式方便瀏覽。


# 其他

還有很多可以透過開發工具來協助的，例如監測整個網頁的讀取速度可以透過 `Network`這個業僉來查看，也可以設置模擬各種網路速度、或是離線狀態等等。

非常推薦觀看六角學院的免費課程，可以透過影片瞭解更多開發工具的操作範例。

> 推薦:<a href="https://www.udemy.com/chrome-devtools/" target="blank"> 六角學院 - Chrome 網頁除錯功能大解密 (免費) </a>
> 參閱 <a href="https://developers.google.com/web/tools/chrome-devtools/" target="blank"> Google Dev Tool API </a>
