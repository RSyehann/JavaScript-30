# 29 - Countdown Timer

> 上傳日: 2018 / 10 / 02

# 主題 

製作一個倒數計時器

# 步驟

### Step1. 取得頁面元素並替預設

```
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelector('[data-time]');
```

### Step2. 設定計時器

```
// 外層變數，供計時器主體使用
let countdown;

/** 計時器 **/
function timer(seconds) {
  // 新的計時器被啟動時，先把原本的 setInterval 清除
  clearInterval(countdown);
  // 取得時間
  const now = Date.now();
  const timeStamp = now + seconds * 1000;
  // 倒數計時與結束的時間顯示 function
  displayTimeLeft(seconds);
  displayEndTime(timeStamp);
  // 計時器執行在 countdown 裡面方便接著清除使用
  countdown = setInterval(() => {
    // 取得要跑的總時長
    const secondsLeft = Math.round((timeStamp - Date.now()) / 1000);
    // 如果時間已經小於零，結束這個 Interval
    if (secondsLeft < 0) {
        clearInterval(countdown);
        return;
    }
    // 更新時間
    displayTimeLeft(secondsLeft);
  }, 1000);
  
}

// 顯示倒數時間
function displayTimeLeft(seconds) {
  // 透過 Math.floor 來取得分鐘數(傳入秒數 / 60 取得最大整數)
  const minutes = Math.floor(seconds / 60);
  // 用 % 來取得傳入秒數除以 60 的餘數 (扣除分鐘數後的秒數)
  const remainderSeconds = seconds % 60;
  console.log({minutes, remainderSeconds});
  // 顯示秒數的部分若小於0數字前補0
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  // 顯示對應時間
  document.title = display;
  timerDisplay.textContent = display;
}

// 顯示結束時間
function displayEndTime(timestamp) {
  // 用傳入的 timestamp 在取得 date 資訊
  const end = new Date(timestamp);
  // 從 date 取得小時數
  const hour = end.getHours();
  // 轉 12 小時制
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  // 從 date 取得分鐘數
  const minutes = end.getMinutes();
  // 顯示結束時間，與上方一樣，若分鐘數小於 10，則前面補 0 
  endTime.textContent = `Be Back At ${hour}: ${minutes < 10 ? '0' : ''}${minutes}`;
}
```

### Step3. 預設的固定時間倒數按鈕

```
// 開始計時 (HTML 畫面設定好的時間)
function startTimer() {
  // 取得 html 中設定的 data-time (秒數)
  const seconds = parseInt(this.dataset.time);
  // 傳入計時器 function
  timer(seconds);
}


// 替每個時間按鈕加上監聽 click 事件，用來啟動計時 function
buttons.forEach(button => button.addEventListener('click', startTimer));
```

### Step4. 自定時間倒數

```
// HTML 中的 input 自訂倒數時間輸入欄位監聽
document.customForm.addEventListener('submit', function(e) {
  // 因為用form，submit 後避免跳頁使用 preventDefault() 來阻止預設事件
  e.preventDefault();
  // 取得 input 欄位的值
  const mins = this.minutes.value;
  // 傳入計時器
  timer(mins * 60);
  // 清空input
  this.reset();
})
```

# 其他

這篇練習也算是相對簡單的時間，主要是學著用變數把 setInterval 內容包住，
並且運用`clearInterval`來避免多個計時器啟動。

