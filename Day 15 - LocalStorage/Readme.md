## JavaScript - Event Delegation 事件委派

JavaScript Pattern 「Event Delegation」

### 範例

Event Delegation(事件委派) 是一種受惠於Event Bubbling 而能減少監聽器數目的方法。

```
<div class="parent">
    <div class="child" data-name="a"></div>
    <div class="child" data-name="b"></div>
    <div class="child" data-name="c"></div>
    <div class="subitem" data-name="d"></div>
</div>

$('.parent').on('click', '.child', function(){
    console.log($(this).data('name'));
});
```

程式碼解說

當我們 click 不同的小區塊時，就會console出他們個別的名字，例如：a、b或c。

實作方法是將click事件綁在parent上，藉由console