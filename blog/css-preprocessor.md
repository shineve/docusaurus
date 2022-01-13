---
title: CSS Preprocessor
description: 你認識 CSS Preprocessor 嗎？你了解為什麼要使用它嗎？
keywords: [css, sass, scss, less, stylus, styl]
date: 2021-10-03
authors: shineve
categories:
- Front-End
tags: 
- CSS
- CSS Preprocessor
- Sass
---
以最知名的 [Sass](https://sass-lang.com/) 為例，它提供了許多 CSS 語法的擴充，彌補 CSS 在大型專案維護性的不足，讓開發者可以更有結構地撰寫簡潔、清晰且好維護的 CSS 程式碼。

Sass 常用的有幾種功能：

- Variables：變數中可以儲存顏色、字型或任何 CSS 值。
- Nesting：可巢狀 CSS 選擇器，提供清晰的層次結構。
- Mixins：可以定義&重用程式碼塊。
- Extend：可以在一個選擇器內繼承另一個選擇器。
- Operators：可以在 CSS 中使用操作符進行計算。
- @if and @else / @for：可以迴圈/條件生成 CSS。

## CSS Preprocessor 可以解決什麼問題？

### 1. 文件切分

當頁面越來越複雜，需要加載的 CSS 文件也越來越大，我們有必要把大文件切分開來，否則難以維護。傳統的 CSS 文件切分方案基本上就是 CSS 原生的 `@import` 指令，或在 HTML 中加載多個 CSS 文件，這些方案通常不能滿足性能要求。

CSS Preprocessor擴展了 `@import` 指令的能力，通過編譯環節將切分後的文件重新合併為一個大文件。這一方面解決了大文件不便維護的問題，另一方面也解決了一堆小文件在加載時的性能問題。

<!--truncate-->

### 2. CSS Nesting

當我們在撰寫 HTML 時，可以輕易的寫出 DOM 之間嵌套的階層結構，但在傳統的 CSS 做不到，需要重複寫許多父元素選擇器。

```css
.nav {
    margin: auto;
     width: 1000px;
     color: #333;
}
 .nav li {
    float: left;
     width: 100px;
}
 .nav li a {
    display: block;
    text-decoration: none;
}
```

依賴 CSS Preprocessor 可以直接像在寫程式一樣將父子元素這樣一層一層包起來。這樣我們可以很容易地表達出規則之間的層級關係。

```scss
.nav {
 margin: auto;
 width: 1000px;
 color: #333;
 li {
  float: left;
  width: 100px;
  a {
   display: block;
   text-decoration: none;
  }
 }
}
```

### 3. CSS 的重複利用

Extends / Mixins 讓 CSS 能更好的被複用，以提高 CSS 的可維護性。Extends 與 Mixins 的最大區別就是 Mixins 可以傳入參數，Extends 只是單純繼承，與 TailwindCSS 的 `@apply` 效果相同

> *Mixins*

```scss
// Mixins
@mixin square($size, $radius: 0) {
  width: $size;
  height: $size;

  @if $radius != 0 {
    border-radius: $radius;
  }
}

.avatar {
  @include square(100px, $radius: 4px);
}

.card {
  @include square(300px, $radius: 2px);
}
```

```scss
// Mixins transpiled result
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 4px;
}

.card {
  width: 300px;
  height: 300px;
  border-radius: 2px;
}
```

> *Extends*

```scss
// Extends
%message-shared {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

%equal-heights {
  display: flex;
  flex-wrap: wrap;
}

.message {
  @extend %message-shared;
}

.success {
  @extend %message-shared;
  border-color: green;
}

.error {
  @extend %message-shared;
  border-color: red;
}

.warning {
  @extend %message-shared;
  border-color: yellow;
}
```

```scss
// Extends transpiled result
.warning, .error, .success, .message {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

.success {
  border-color: green;
}

.error {
  border-color: red;
}

.warning {
  border-color: yellow;
}
```

## 推薦閱讀

### 風格指南

> [Sass Style Guide](https://css-tricks.com/sass-style-guide/)

### 專案結構

> [The 7-1 Pattern](https://sass-guidelin.es/#architecture)

``` text
sass/
|
|– abstracts/ （or utilities/)
|   |– _variables.scss    // Sass Variables
|   |– _functions.scss    // Sass Functions
|   |– _mixins.scss       // Sass Mixins
|
|– base/
|   |– _reset.scss        // Reset/normalize
|   |– _typography.scss   // Typography rules
|
|– components/ (or modules/)
|   |– _buttons.scss      // Buttons
|   |– _carousel.scss     // Carousel
|   |– _slider.scss       // Slider
|
|– layout/
|   |– _navigation.scss   // Navigation
|   |– _grid.scss         // Grid system
|   |– _header.scss       // Header
|   |– _footer.scss       // Footer
|   |– _sidebar.scss      // Sidebar
|   |– _forms.scss        // Forms
|
|– pages/
|   |– _home.scss         // Home specific styles
|   |– _about.scss        // About specific styles
|   |– _contact.scss      // Contact specific styles
|
|– themes/
|   |– _theme.scss        // Default theme
|   |– _admin.scss        // Admin theme
|
|– vendors/
|   |– _bootstrap.scss    // Bootstrap
|   |– _jquery-ui.scss    // jQuery UI
|
`– main.scss              // Main Sass file
```
