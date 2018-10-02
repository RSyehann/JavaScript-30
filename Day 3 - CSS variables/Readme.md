 # 03 CSS Variables
 
 > 首次上傳： 2018/10/01
 
 # 主題
 
 用 JS 與 CSS 搭配製作一個即時的濾鏡效果，特效為調整內距、模糊、邊框色
 
 # 步驟
 
 Step1. 利用 CSS Variable 來定義 CSS 的變數 (有點像 Sass 的感覺)
 
 Step2. 利用 addEventListener 來綁 HTML 的控制桿，並更新值到 CSS 變數中來達到即時調整的效果。
 
 # JavaScript 語法 & 備註
 
 ### dataset
 
 用 `dataset` 可以取出對象的 `data-*` 屬性，也等同於`getAttribute`
 
 ```
 <div id="test" data-no="123"></div>
 document.querySelector('#test').dataset.no // 輸出123
 document.querySelector('#test ').getAttribute('data-no'); // 輸出123
 ```
 
 ### style.setProperty()
 
 等同於style.cssPropertyName
 
 ```
 style.setProperty('padding', '15px');
 /*  等同於 */
 style.padding = '15px';
 ```
 
 但在實際應用中，前者的做法會很方便帶參數進去
 
 > 參照: <a href="https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/setProperty">MDN - setProperty</a>\
 
 # CSS語法 & 備註
 
 ### filter.blur()
 
 CSS3 的濾鏡功能，blur 是高斯模糊，參數越高越模糊。
 
 > 參照: <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/filter">MDN - filter</a>
 
 
