---
title: CSS Postprocessor (PostCSS)
description: 你認識 CSS Postprocessor 嗎？你了解為什麼要使用它嗎？
keywords: [postcss, css, autoprefixer]
date: 2021-10-03 
authors: shineve
categories:
- Front-End
tags:
- CSS
- CSS Postprocessor
- PostCSS
---
以最知名的 [PostCSS](https://postcss.org/) 為例，它是一個使用 JavaScript 轉換 CSS 的工具，它提供很多的API來分析、修改CSS的規則，因此它可以被利用來開發各種的工具，在拓展性極高的狀況下，它其實並不局限在於後處理。

以下是較常見的 PostCSS Plugins：

- [autoprefixer](https://github.com/postcss/autoprefixer): 加入各家瀏覽器的前綴詞（prefix），例如：-webkit-、-moz-。
- [stylelint](https://stylelint.io/): 語法檢查和報錯。
- [postcss-preset-env](https://www.npmjs.com/package/postcss-preset-env): 將先進的功能轉為目前主流瀏覽器所能支援的語法。（類似 [Babel](https://babeljs.io/)）
- [postcss-nested](https://www.npmjs.com/package/postcss-nested): 提供 CSS Nesting 功能。
- [cssnano](https://cssnano.co/): 在不改變CSS的效果為前提下，對CSS檔案做縮減及優化。
- [Lost Grid](https://github.com/peterramsing/lost): 讓系統支援 Grid System。（通過 `calc()` 實現因此支援度很高）

### 優勢

1. 有彈性、好擴充，因為是以 Plugin 的方式插入，未來若主流瀏覽器支援了這些功能，要拔除特定 plugin 是很容易的。
2. 更輕量，不像 Sass 可能預先綁了許多可能用不到的功能。
3. 速度快。由於 PostCSS 的功能由所掛的 Plugin 數量而定，體積小，因此轉換的速度幾乎比 Sass 快三倍。
4. 相對 CSS Preprocessor，更容易撰寫自己所想要的功能，因為使用 PostCSS 是可以自建 Plugin 而不是修改 Library。

### Vue 中 PostCSS 的應用

1. [Vue CLI](https://cli.vuejs.org/guide/css.html#postcss) 中就有使用到上方所提的 [autoprefixer](https://github.com/postcss/autoprefixer)，來擴大專案的瀏覽器支援度 。
2. `Vue` 中有一個非常實用的 [Scoped CSS](https://vue-loader.vuejs.org/guide/scoped-css.html) 功能，讓各個 Component 之間的 CSS 不會互相污染，而這項功能正是透過 PostCSS 的協助來完成的。
