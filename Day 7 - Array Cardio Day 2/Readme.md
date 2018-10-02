# 07 - Array Cardio Day 2

> 上傳日：2018 / 10 / 01


# 主題

延續<a href="https://github.com/RSyehann/JavaScript-30/tree/master/Day%204%20-%20Array%20Cardio%20Day%201">[04 - Array Cardio Day 1]</a>的Array的各種操作，這次有五個範例。

# 步驟

### 練習範例內有提供了 2 組資料：

1. people : [{name: 'string', year: number}]
2. comments : [{text: 'string', id: number}]

### 要練習的題目有：

1. people 是否有19歲以上的人
2. People 是否每個人都19歲以上
3. 在 Comments 中找到 id 是 823423 的資料
4. 在 Comments 中找到 id 是 823423 的資料索引值，並透過索引值刪除這筆資料

# JavaScript 語法 & 備註

# 1. some()

題目： people 是否有 19 歲以上的人？
解答：
```
const isAdult = people.some(person => ((new Date()).getFullYear()) - person.year >= 19);
```

透過`some()`會將 Array 中的資料逐筆進行判斷，只要有一筆通過判斷則回傳`true`並結束。

> 參閱: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some">MDN - Array.prototype.some()</a>


# **2. every() **

題目：people 是否每個人都 19歲以上？
解答：
```
const allAdults = people.every(person => ((new Date()).getFullYear()) - person.year >= 19);
```

`every()`會對 Array 中的每筆資料進行判斷，只要有一筆不符合則回傳`false`並結束。
與`some()`是相反操作的感覺。

> 參閱: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every"> MDN - Array.prototype.every()</a>

# 3. ** find() **

題目：在 comments 中找到 id 是 823423 的資料
解答：
```
const comment = comment.find(comment => comment.id === 823423);
```

`find()` 會對 Array 中的逐筆進行判斷，返回符合條件的索引值，
接著利用`spared`也就是省略符號`...`來進行展開陣列並透過`slice()`組合陣列，
`...comments.slice(0, index),`這段先將陣列開頭到索引值前的資料加進來，
`...comments.slice(index + 1)`這段則是將索引值+1後，延續到陣列結束的資料加進來。
`slice()`的第一個參數是陣列索引的起點，第二個是終點(且不會被使用)無填寫則是到結束。

> 參閱:

> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex"> MDN - Array.prototype.findIndex()</a>

> <a href="https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Spread_syntax"> MDN - Spread.syntax </a>

> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice"> MDN - Array.prototype.slice() </a>

