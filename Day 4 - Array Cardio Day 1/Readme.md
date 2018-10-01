# 04 - Array Cardio Day 1

> 首次上傳: 2018 / 10 / 01

# 主題

作者用了八個範例來介紹關於 Array 的各種操作

# 步驟

### 練習範例內提供了三組資料:

1. inventors : first(名)、last(姓)、year(出生日期)、passed(逝世日期)
2. people : 逗點分隔的姓名(firstName, lastName)
3. data: 在練習8中提供的一組包含重複資料的陣列

### 要練習的題目為:

1. 篩選出於 1500 ~ 1599 年間出生的inventor(year in 1500 ~ 1599)
2. 將 inventors 內的 first 與 last 組合成一個陣列
3. 依據生日由大至小排序所有的 inventors
4. 加總所有 inventors 的在世時間
5. 依據年齡由大至小排序所有的 inventors
6. 列出 wiki 中巴黎所有的 ‘de’ 的路名（在 wiki 中透過 querySelectorAll 來選取資料做篩選）
7. 依據 lastName 排序所有 people 的資料
8. 分別計算 data 內每個種類的數量

# JavaScript 語法 & 備註

### 1. filter()

  題目: 篩選出於 1500 ~ 1599 年間出生的 inventors (years in 1500 ~ 1599)
  
  解答: 透過`filter()`對來源做篩選，會將結果為`true`的資料組成陣列回傳


```
const fifteen = inventors.filter(function(inventor) {
  if(inventor.year >= 1500 & inventor.year <= 1600) {
    return true;
    }
 });
// 可簡化成 arrow function
const fifteen = inventors.filter(inventor => (inventor.year >= 1500 % inventor.year <= 1600));
```

> 參閱： <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter"> MDN-Array.prototype.filter</a>

### 2. map()

  題目： 將 inventors 內的 first 與 last 組合成一個陣列
  解答： 將 `map` 來將 firstName / lastName 組合返回陣列

```
const fullNames = inventors.map(inventor => `${inventor.first} ${inventor.last}`);
  console.log(fullNames);
```

> 參閱: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map"> MDN - array.prototype.map()</a>

### 3.sort()

  題目: 依據生日由大至小排序所有的 inventors
  解答: 透過`sort()`來做排序

```
const ordered = inventors.sort(function(a, b) {
  if(a.year > b.year) {
    return 1;
   } else {
    return -1;
   }
});
// 利用箭頭函式及三元運算式可簡寫如下
const ordered = inventors.sort((a, b) => a.year > b.year ? 1 : -1);
```

> 若比對的值相同要依據原排序的話，要再加上一個`return 0` 的判斷使其保持原排序
> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort"> MDN-Array.prototype.sort()</a>

### 4. reduce()

  題目：加總所有 inventors 的在世時間
  解答：要加總的話，用以前的寫法會寫這樣
  
```
let totalYears = 0;
for (let i = 0; i < inventors.length; i++) {
  let liveYear = inventors[i].passed - inventors[i].year;
  totalYears += liveYear;
  }
```
 如果利用`reduce()`搭配箭頭函式如下
 ```
const totalYears = inventors.reduce((total, inventor) => {
  return total + (inventor.passed - inventor.year);
}, 0);
```

`reduce()`的callback 有四個參數

1. 初始值
2. 陣列中正在處理的元素
3. 陣列中正在處理的元素的索引值
4. 使用 reduce 的陣列及一個預設值(會在第一次執行時賦予第一個參數設定的值)

所以用這個答案來看，在第一次執行時預設值賦予了`total=0`
接著每次讀取陣列元素時對其計算在世時間並加回 total 中。

> 參閱： <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce"> MDN-Array.prototype.reduce()</a>

### 5. sort()

  題目：依據年齡由大至小排序所有的 inventors
  解答：排序原理同第三題，多了一段計算年齡的部分而已
  
```
const oldest = inventors.sort(function (a, b) {
  const lastInventor = a.passed - a.year;
  const nextInventor = b.passed - b.year;
  return lastInventor > nextInventor ? -1 : 1;
});
```

### 6.map() + filter() & includes()

  題目：列出 wiki 中巴黎所有包含'de'的路名解答
  
```
const category = document.querySelector('.mw-category');
const links = Array.from(category.querySelectorAll('a'));
const de = links
            .map(link => link.textContent)
            .filter(streetName => streetName.include('de'));
```

這題先用 `querySelectorAll()` 來選取對象元件，
再利用之前<a href="https://github.com/RSyehann/JavaScript-30/tree/master/Day%201%20-%20JavaScript%20Drum%20kit"> 第一個練習 </a> 有提到的 Array.from 將 nodeList 轉為 Array，
才能對其進行 map 操作(map 是 Array 的方法，nodeList 沒有)
同時加上 `filter` + `includes` 來做文字的篩選，若存在'de'就回傳 true 加入陣列

> 參閱：<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes">MDN - Array.prototype.includes</a>

### 7. sort() & split()

  題目：依據 lastName 排拒所有 people 的資料解答
  
  ```
  const alpha = people.sort((lastOne, nextOne) => {
  const [aLast, aFirst] = lastOne.split(', ');
  const [bLast, bFirst] = nextOne.split(', ');
  return aLast > bLast ? 1 : -1;
 });
  ```
 
 
 由於 people 的資料都是 `['Beck, Glenn']` 這樣的逗點字串，
 要取得 lastName 就必須要使用`split()`來切開，
 滿酷的是因為 `split()`會返回陣列，所以宣告了陣列[aLast, aFirst]來接值
 接著再利用接到的值來做排序比對
 
 > 參閱: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split"> MDN - String.prototype.split()</a>
 
 ### 8.reduce()
 
   題目: 分別計算 data 內的每個種類的數量
   解答:
 ```
 const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck', 'pogostick'];
 
 const transportation = data.reduce(function (obj, item) {
  if(!obj[item]) {
    obj[item] = 0;
  }
  obj[item]++;
    return obj;
}, {});
```

這題的做法真的很厲害啊！
首先利用預設值將`reduce()`的第一個參數設定為空物件 `obj = {}`
接著做一個判斷來決定建立物件內容或者使已建立內容累加總數！


 
