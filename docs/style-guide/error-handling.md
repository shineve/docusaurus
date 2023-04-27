---
title: Axios error handling
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

For APIs, the commonly defined backend structure is as follows:

```ts
type Response = {
    code: Number, // status code
    desc: String, // detailed description
    results: Array | Object // data needed by the frontend
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

### Solution

After receiving the data from the http layer axios, perform unified processing.

```js
import axios from 'axios';

const service = axios.create({
  baseURL: rootURL, // api's base_url, i.e., http://www.google.com/ in http://www.google.com/api/
  timeout: 15000, // request timeout time
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

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code === SERVER_ERROR_CODE.SUCCESS) {
      // unified processing, directly return data
      return res.results;
    } else {
      // unified error reporting
      this.$toast.show(res.desc);
      return Promise.reject(res);
    }
  },
  error => {
    return Promise.reject(error);
  },
);

export default service;
```

If a Promise execution rejects a code, the browser will report an `Uncaught (in promise)` error because the Promise operation has been interrupted but has not been handled. To prevent this error from occurring, simply intercept `unhandledrejection` and prevent default behavior.

```js
// Promise Catch does not report errors
window.addEventListener('unhandledrejection', event => event.preventDefault());
```
