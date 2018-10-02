# 06 - Type Ahead

> 首次上傳: 2018 / 10 / 01

# 主題
利用`fetch`來取回 json 檔案，並透過 `filter()` 及 `RegExp()`等語法來製作搜尋即時顯示關聯效果！

# 步驟


### Step 1

預設已經有建立了一個城市的 .json 清單，
先建立一個空的陣列`cities`並透過 fetch 來取得 json 資料存進去。

### Step 2

建立`function findMatches(wordToMatch, cities)`
裡面建立了一個 `RegExp` 用於 match 來進行字串比對。

### Step 3
建立`displayMatches()`並用`addEventListener`來監測輸入框的`change`&`keyup`，
每次鍵盤輸入時都會觸發`displayMatches()`來處理比對，
將比對結果用`map()`來 return 組合的 HTML 的`<li>`資料。

# JavaScript 語法 & 備註


### fetch()

> 目前參照過 Codecademy 的教學方法
> 先將連結附上．心得待補：<a href="https://www.codecademy.com/courses/intermediate-javascript-requests/lessons/requests-i/exercises/http-requests?action=resume_content_item&course_redirect=introduction-to-javascript">HTTP Requests</a>

### RegExg()

> 正規表達式，這個真的非常複雜
> 有做紀錄的部分就是參數後面的`g`代表全部
> 參閱: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp"> MDN-RegExp</a>

### .join()
將陣列資料用參數內的字串連接轉為一個字串，
範例中上了`.join()`來避免 `map` 回傳的陣列有`,`產生。

# CSS 語法 & 備註


### nth-child()

範例中利用`nth-child(odd)`與`nth-child(even)`來抓`<li>`的奇偶數

> 參閱: <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child"> MDN-:nth-child</a>


