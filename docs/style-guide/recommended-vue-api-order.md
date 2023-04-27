---
title: 前端 Vue API 順序
keywords: [front-end, javascript, coding, conventions]
date: 2022-05-17
authors: shineve
categories:
  - Front-End
  - Coding Conventions
tags:
  - JavaScript
  - Coding Conventions
---

# 推薦-Vue 實例選項順序

> 在 Vue 中，export default 對象中有很多約定的 API Key。每個人的順序排放都可能不一致，但保持統一的代碼風格有助於團隊成員多人協作。

Vue 官網文檔中也有推薦[順序](https://cn.vuejs.org/v2/style-guide/index.html#%E4%BC%98%E5%85%88%E7%BA%A7-C-%E7%9A%84%E8%A7%84%E5%88%99%EF%BC%9A%E6%8E%A8%E8%8D%90-%E5%B0%86%E9%80%89%E6%8B%A9%E5%92%8C%E8%AE%A4%E7%9F%A5%E6%88%90%E6%9C%AC%E6%9C%80%E5%B0%8F%E5%8C%96),文檔中對選項順序做了許多分類。但從工程項目角度思考，需要更加精簡以及合理的排序。推薦如下規則進行排序：

1. Vue 擴展: extends, mixins, components
2. Vue 數據: props, model, data, computed, watch
3. Vue 資源: filters, directives
4. Vue 生命週期: created, mounted, destroy...
5. Vue 方法: methods

以下為推薦的順序：

```js
export default {
  name: '',
  /*1. Vue擴展 */
  extends: {},
  mixins: [], // extends 和 mixins 都會擴展邏輯，需要重點放前面
  components: {},
  /* 2. Vue數據 */
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  /* 3. Vue資源 */
  filters: {},
  directives: {},
  /* 4. Vue生命週期 */
  beforeCreate() {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  destroy() {},
  /* 5. Vue方法 */
  methods: {}, // all the methods should be put here in the last
};
```
