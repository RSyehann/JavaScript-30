# 05 - Flex Panel Gallery
> 首次上傳: 2018 / 10 / 01

# 主題

用 CSS 與 JS 來製作一個點擊後會動畫展開的圖片展示效果，
運用到了 CSS 的 flex、tramsform、transition...這篇比較偏向 CSS 知識。


# 步驟


### Step 1

由於整體 HTML 的 tag 是由 1 個 `panels`包覆 5 個 `panel`，
為了使其設定為 flex，先在外層容器 `panels`加上 `display: flex`
接著為每個 `panel`加上`flex:1` 來使各子元件最大占比為 1
也就會變成同容器中的 5 個元件都設為 1，那就是每個元件最大佔比為 20%。

PS.因為對 flex 並不熟悉，我是用佔比來理解，若有錯請幫忙指正，感謝。

### Step 2

在為`panel`加上 `justify-content: center`使其水平置中
並再加上了 `display: flex` 及 `flex:direction: column`，
再加上一層 `display: flex` 可以使 `panel` 底下的元件也變成 flex 控管。


### Step 3

對 `panel`底下的`first-child`及`last-child` 做位移效果，
使其能在預設狀態於可視範圍外，並設計`open-active`
當觸發時，配合`transition`產生移回原位的動畫，
也在`.panel.open`中新增了`flex:5`使其觸發時會有展開的動畫。

### Step 4

編寫 JS 先取得所有 panel 的節點，
接著設計 toggle function 使執行的物件藉由 `.classList.toggle`來新增／移除動畫 class
並透過 addEventListener 來監測當 `click` & `transitionend`時觸發 toggle function。

> `.classList` & `transitionend` & `toggle`在<a href="https://github.com/RSyehann/JavaScript-30/tree/master/Day%201%20-%20JavaScript%20Drum%20kit">第一篇</a>剛好有提到。

# JavaScript 語法 & 備註

### e.propertyName & includes()

在範例中，觸發動畫效果的順序為：

1. `click`其中一張圖(panel)觸發`addEventListener`中的 `toggleOpen`
2. 為其增加 `open`，增加`Flex:5`的效果，同時也是使用了`.panel`中的`transition: flex`這段
3. 當`.open`的`transition`結束時，觸發了`transitionend`來作動`toggleActive`
4. 為其增加`.open-active`效果，讓原本是可視範圍外的`p`文字滑入

在`順序:4`時有個判斷

```
function toggleActive(e) {
  if (e.propertyName.includes('flex')) {
      this.classList.toggle('open-active');
  }
}
```

e.propertyName 可以抓到觸發 `transitionend`的屬性名稱，
而`.open`中觸發的`transition`屬性有兩個，分別為 `font` 與 `flex`
要使其在`flex`之後在觸發的話，就要判斷進來的是不是`flex`，但因為`transition: flex 0.7s...` 這段在 sarafi 是 `flex`，而其他瀏覽器為`flex-grow`
所以不能用`e.property === 'flex'`來寫，會使其中一方瀏覽器抓不到值，
作者提到因為兩者都有`flex`的字眼，所以利用`.include('flex')`來判斷，只要`e.property`有包含到`flex`的字串就使其通過判斷，加入動畫效果。

> 參閱: MDN- String.prototype.includes()

# CSS 語法 & 備註

### flex

flex 我目前還不熟，他還在我的待讀清單中，僅依據目前這篇使用到的做筆記：

### display: flex

把該容器設定為 flex 模式， 可以在其他 flex 中設定(角色為子元素時)。

### flex: flex-grow flex-shrink flex-basis

flex 的簡寫，第一為佔比，第二為壓縮值，第三為默認尺寸

### flex-direction

flex 排列的方向， `column`(垂直向)或`row`（水平向）， 默認為`row`

> 行與列的中文用法，我自己有點混淆像是我會說 `第314行要加個分號哦`，也會說`工具列上的第三個icon`兩者都是在描述水平向，但是中文就會用不同的形容去描述。

### justify-content & align-items

依據 `flex-direction` 設定的主/側來決定排列方式，例如設定`flex-direction: row`那麼`justify-content: center`就指水平置中，而`align-items:center`代表垂直置中。

> 參閱: <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout"> MDN - CSS Flexible Box Layout</a>

### :first-child() & :last-child()

CSS的`:偽類別`，分別可以選取first（第一個）/last(最後一個)子元素，
在範例的`panel`中，除了主圖的大字外，上下各有一個`p`包含了點擊後進場的動畫文字：

```
<div class="panel panel1">
<p>Hey</p>
<p>Let's</p>
<p>Dance</p>
</div>
```

透過`panel > *: first-child` 選取 `Hey` 透過 `panel > *: last-child`選取 `Dance`

