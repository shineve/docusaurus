---
title: 前端 Error Handling (Axios)
keywords: [front-end, javascript, coding, conventions]
date: 2022-05-15
authors: shineve
categories:
  - Front-End
  - Coding Conventions
tags:
  - JavaScript
  - Coding Conventions
---

對於 API 來說，後端經常定義的結構如下：

```ts
type Response = {
    code: Number, // 狀態碼
    desc: String, // 詳細描述
    results: Array | Object // 前端需要的數據
}

enum SERVER_ERROR_CODE  {
    SUCCESS: 200,
    CLIENT_ERROR: 400,
    INTERNAL_SERVER_ERROR: 500,
}
```

### Bad

```js
batchGetDocumentDetails(documents).then(res => {
  const res = response.data;
  if (res.code === SERVER_ERROR_CODE.SUCCESS) {
    this.closeModal();
    this.$toast.show(res.results);
  } else {
    if (res.code === SERVER_ERROR_CODE.CLIENT_ERROR) {
      this.$toast.show(res.desc);
    }
  }
});
```

### Good

```js
batchGetDocumentDetails(documents)
  .then(res => {
    const res = response.data;
    this.closeModal();
    this.$toast.show(res.results);
  })
  .catch(res => {
    if (res === SERVER_ERROR_CODE.CLIENT_ERROR) {
      this.$toast.show(res.desc);
    }
  });
```

### 解決方案

在 http 層 axios 拿到數據後進行統一處理

```js
import Vue from 'vue';
import axios from 'axios';

const service = axios.create({
  baseURL: rootURL, // api的base_url，即 http://www.google.com/api/ 中的 http://www.google.com/
  timeout: 15000, // 請求超時時間
});

// request攔截器
service.interceptors.request.use(
  config => {
    if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
      config.headers['Content-Type'] = 'application/json';
      if (config.type === 'form') {
        config.headers['Content-Type'] = 'multipart/form-data';
      } else {
        config.data = JSON.stringify(config.data);
      }
    }

    return config;
  },
  error => {
    Promise.reject(error);
  },
);

// respone攔截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code === SERVER_ERROR_CODE.SUCCESS) {
      // 統一處理， 直接返回數據
      return res.results;
    } else {
      // 錯誤統一報出
      Vue.prototype.$toast.show(res.desc);
      return Promise.reject(res);
    }
  },
  error => {
    return Promise.reject(error);
  },
);

export default service;
```

Promise 執行 reject 代碼，瀏覽器會報`Uncaught (in promise)`錯誤。這是因爲中斷了 Promise 操作但又沒有對其進行處理，故會出現此錯誤。
只需要使用攔截`unhandledrejection`並阻止默認行為即可。

```js
// Promise Catch不報錯
window.addEventListener('unhandledrejection', event => event.preventDefault());
```
