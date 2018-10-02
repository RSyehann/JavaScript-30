# 24 - Sticky Nav

# 主題

透過 CSS 的 `position: fixed` 與 JavaScript 的 `classList` 來製作網站常見的置頂選單。


# 步驟

### Step1. 取得頁面元素並偵測選單到頂部的高度

```
// 取得 nav 元素
const nav = document.querySelector('#main');
// 透過 offsetTop 取得 nav 頂部到整個 page 的頂部距離
let topOfNav = nav.offsetTop;
```

### Step2. 對 CSS 增加樣式 fixed-nav

```
/* 當有 fixed-nav 時，把 site-wrap 縮放回1，讓整體有放大效果 */
.fixed-nav .site-wrap {
  transform: scale(1);
}

/* 當有 fixed-nav 時，把 nav 改為 fixed 並加上陰影 */
.fixed-nav nav {
  position: fixed;
  box-shadowed: 0 5px rgba(0, 0, 0, 0.1);
}

/* 當有 fixed-nav 時，把 logo 寬度增加，使其顯示出來 */
.fixed-nav li.logo {
  max-width: 500px;
}
```

### Step3. 進行網頁捲軸高度偵測，決定是否變更選單樣式

```
function fixNav() {
  // 如果目前捲軸的高度高過於 nav 的頂部
  if (window.scrollY >= topOfNav) {
    /* 設定一個 padding-top 並增加 fixed-nav
       因為當 position 被設定為 fixed 時，將不會再佔據原有的高度
       所以要動態的增加一個 offsetHeight 來將內容部位增高避免怪異的彈跳遮擋現象 */
    document.body.style.paddingTop = nav.offsetHeight + 'px';
    document.body.classList.add('fixed-nav');
  } else {
    // 還原 padding-top 並移除 fixed-nav
    document.body.style.paddingTop = 0;
    document.body.classList.remove('fixed-nav');
  }
}
// 監聽 scroll 動作
windo.addEventListener('scroll', fixNav);
```

# 其他

這個也是比較基礎的小練習，比較特別的是體驗到網站切換時使用`transform: scale()` 來做些微縮放在視覺上感受蠻棒的。
