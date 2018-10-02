#  10 - Hold Shift and Check Checkboxes

> 上傳日 2018 / 10 / 01


# 主題

介紹如何使用Shift + 左鍵來完成連續區間選取，
在這篇的探索中，我增加了連續區間取消選取及部分問題的改善

# 步驟

### Step1. 基本設定

用`querySelectorAll('.inbox input[type="checkbox"]')`來把 HTML 中的 checkbox 選起來，
並設置一個變數`let lastChecked;`作為稍後勾選位置的紀錄使用。

### Step2. 觸發設定

把所有選取的 checkboxes 使用 `forEach` 來加入 `addEventListener('click', handleCheck)`。

### Step3. handleCheck

在這個 function 裡面，建立了一個區域變數`let inBetween = false`來當作選取區間的標記。
並在每次觸發時檢查是否"有按著shift點擊"`if(e.shiftKey && this.checked)`，
若有的話則再跑一次`forEach`來透過`inBetween`對每個 checkbox 進行區間標記，
把屬於區間內的 checkbox 勾起來，並記錄此點擊的位置。


# 程式備註
```
//選取所有的checkbox
const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
let lastChecked;

function handleCheck(e) {
  let inBetween = false;
  // 檢查是否按著 shift 點選
  if (e.shiftKey && this.checked) {
      checkboxes.forEach(checkbox => {
      //當前點選的 checkbox 開始記錄到最後一個點選的 checkbox 關閉標記
      if (checkbox === this || checkbox === lastChecked) {
          inBetween = !inBetween;
          console.log('STarting to check them inbetween!');
      }
      // 勾選區間內為 true 的 checkbox
      if (inBetween) {
        checkbox.checked = true;
      }
      });
   }
   lastChild = this;
}
// 為每個 checkbox 加上 click 事件
checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck));
```

