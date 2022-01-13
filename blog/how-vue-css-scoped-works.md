---
title: How Vue Scoped CSS Works?
description: This article explains how data-* attributes work and how to use them to style elements in Vue.
keywords: [vue, html, css]
date: 2021-10-04
authors: shineve
categories: 
- Front-End
tags:
- HTML
- CSS
- Vue
---

Vue 中的 [Scoped CSS](https://vue-loader.vuejs.org/guide/scoped-css.html) 是透過 `HTML` 的 [data-* attribute](https://developer.mozilla.org/zh-TW/docs/Web/HTML/Global_attributes/data-*) 來達成的，`data-* attribute` 讓我們可以在 `HTML Element` 上自定義添加一些自己需要用到的屬性名稱，以方便自己容易理解。

```html
<div class="example" data-source="facebook">
  <span>Text from Facebook</span>
</div>
```

它也支援我們透過 `CSS` 和 `JavaScript` 來取得 `data-* attribute` 的屬性值。

### 透過 CSS 取得或選取 data-\*attribute

我們可以透過 [CSS Attribute Selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors)來選取指定的 Element。

``` css
/* CSS */
.example[data-source="facebook"] {
  color: blue;
}
```

<!--truncate-->

### 使用 JS 取得 data-\* attribute 的屬性值

當我們要取得 `data-* attribute` 的屬性值時，我們可以簡單利用 `JavaScript` 中的 [dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) 物件，就可以取得其中的內容。

``` js
// Javascript
const el = document.querySelector('.example');
console.log(el.dataset.source) // facebook
```

## Scoped CSS in Vue

`Vue` 在打包時，每個 `.vue` 檔的會根使用當前檔案的 `hash` 來做為 `[data-* attribute]`，綁定在在每一個 Element 及 CSS selector 上，來達到 Component 之間互不污染的效果。

```jsx
 // Parent.vue //
 <template>
   <div class="example">I'm a </div>
 </template>
 
 <script>
   export default {
     name: 'Parent',
   };
 </script>
 
 // Notice the `scoped` attribute on the style tag.
 <style scoped>
   .example {
     font-size: 1.5em;
     background-color: blue;
   }
 </style>
```

Transpiled:

```jsx
// Parent.vue (transpiled) //
<template>
  // 可以看到這邊產生了一個 data-* attribute
  <div class="example" data-v-123456>I'm a </div>
</template>

<script>
  export default {
    name: 'Parent',
  };
</script>

<style scoped>
  /* 可以看到這邊產生了一個 data-* attribute */
  .example[data-v-123456] {
    font-size: 1.5em;
    background-color: blue;
  }
</style>
```
