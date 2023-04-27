---
title: 基于 JWT + Refresh Token 的用戶驗證
description: JWT在現在的網站中是非常常見的，但是在網站的開發中，我們需要設計一個方便的方式來驗證用戶的身份，這樣才能保證用戶的身份不被盜用。
keywords: [html, javascript, jwt, refresh token]
date: 2021-11-26
authors: shineve
categories:
- Front-End
- Back-End
tags:
- JavaScript
- Web Development
- JWT
---

HTTP 是一個 stateless 的協議，因此 server 並不知道每次的請求是由誰發送的（同一個 IP 並不代表同一個用戶），但我們在實際應用中，許多場景是會需要 client 和 server 之間的對話是有狀態的，例如用戶認證相關的API。

在 Web 應用中，用戶的認證（Authentication）和授權（Authorization）是非常重要的一塊，在實踐中有多種可用方案，並且各有其優點。

<!--truncate-->

## **基於 Session 的會話管理**

在 Web 應用發展的初期，大部分採用基於 Session 的會話管理方式，邏輯如下。

- 客戶端使用用戶名密碼進行認證
- 服務端生成並存儲 session，將 `sessionId` 通過 `cookie` 返回給客戶端
- 客戶端在訪問需要認證的接口時，在 cookie 中攜帶 `sessionId`
- 服務端通過 `sessionId` 查找 session 並進行驗證，返回給客戶端需要的數據

![cookie.jpg](cookie.jpg)

基於 session 的方式存在多種問題。

- 服務端需要存儲 session，並且由於 session 需要經常快速查找，通常存儲在內存或內存資料庫中，同時在線用戶較多時需要佔用大量的 server 資源。
- 當需要擴展時，創建 session 的 server 可能不是驗證 session 的 server，所以還需要將所有 session 單獨存儲並共享。
- 由於客戶端使用 cookie 存儲 `sessionId`，在跨域場景下需要進行兼容性處理，同時這種方式也難以防範 CSRF 攻擊。

## **基於 Token 的會話管理**

鑑於基於 session 的會話管理方式存在上述多個缺點，基於 Token 的 stateless 會話管理方式誕生了，所謂 stateless，就是服務端不再存儲信息，甚至是不再存儲 session ，邏輯如下。

- 客戶端使用用戶名密碼進行認證
- 服務端驗證用戶名密碼，通過後生成 Token 返回給客戶端
- 客戶端保存 Token，訪問需要認證的接口時在，URL 參數或 HTTP Header 中加入 Token
- 服務端通過解碼 Token 進行驗證，返回給客戶端需要的數據

![token.jpg](token.jpg)

基於 Token 的會話管理方式有效解決了基於 Session 的會話管理方式帶來的問題。

- 服務端不需要存儲和用戶驗證有關的信息，驗證信息會被加密到 Token 中，服務端只需要讀取 Token 中包含的驗證信息即可
- 避免了共享 Session 導致的不易擴展問題
- 不需要依賴 Cookie，有效避免 Cookie 帶來的 CSRF 攻擊問題
- 使用 CORS 可以快速解決跨域問題

## **JWT 介紹**

JWT 是 JSON Web Token 的縮寫，JWT 本身沒有定義任何技術實現，它只是定義了一種基於 Token 的會話管理的規則，涵蓋 Token 需要包含的標準內容和 Token 的生成過程。

一個 JWT Token 長這樣的。

```jsx
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

仔細辨別會發現它由 A.B.C 三部分組成，這三部分依次是頭部（Header）、負載（Payload）、簽名（Signature），頭部和負載以 JSON 形式存在，這就是 JWT 中的 JSON，三部分的內容都分別單獨經過了 `Base64` 編碼，以 `.` 拼接成一個 JWT Token。

JWT 的 Header 中存儲了所使用的加密算法和 Token 類型。

```jsx
{
  "alg": "HS256",
  "typ": "JWT"
}
```

Payload 是負載，[JWT 規範](https://en.wikipedia.org/wiki/JSON_Web_Token#Standard_fields)規定了一些字段，並推薦使用，開發者也可以自己指定字段和內容，例如下面的內容。

```jsx
{
  "sub": "1234567890",
  "name": "John Doe",
  "iss": "Hao", // issuer
  "iat": 1516239022, // issued at
  "exp": 1516669022, // expiration time
  "nbf": 1516250000, // not before
  "jti": "a123s4556" // JWT ID
}
```

需要注意的是，Payload的內容只經過了 `Base64` 編碼，對客戶端來說當於明文存儲，所以不要放置敏感信息。

Signature 部分用來驗證 JWT Token 是否被篡改，所以這部分會使用一個 Secret 將前兩部分加密，邏輯如下。

```jsx
HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)
```

## **JWT 優勢 & 問題**

### 優勢

JWT 擁有基於 Token 的會話管理方式所擁有的一切優勢

1. 不依賴 Cookie，使得其可以防止 CSRF 攻擊
2. 能在禁用 Cookie 的瀏覽器環境中正常運行
3. 服務端不再需要存儲 session，使得服務端認證及授權業務可以方便擴展
4. 降低了系統複雜度，因為不需要為了存儲 session 而引入 Redis 之類的工具

### 劣勢

由於服務端不再儲存 session，而是將 JWT 的有效期存儲在 Token 中，JWT 一旦簽發，就會在有效期內一直可用，無法在服務端廢止。當用戶進行登出操作，只能依賴客戶端刪除掉本地存儲的 JWT Token，如果需要禁用用戶，單純使用 JWT 就無法做到了。

## **基於 JWT 的實踐**

> [GitHub Demo](https://github.com/shineve/jwt-tutorial)

既然 JWT 依然存在諸多問題，甚至無法滿足一些業務上的需求，但是我們依然可以基於 JWT 在實踐中進行一些改進，來形成一個折中的方案。

前面講的 Token，都是 Access Token，也就是訪問資源接口時所需要的 Token，還有另外一種 Token， 叫 Refresh Token，通常情況下 Refresh Token 的有效期會比較長，而 Access Token 的有效期比較短，當 Access Token 因過期而失效時，可以讓客戶端再使用 Refresh Token 獲取到新的 Access Token，如果 Refresh Token 也失效了，用戶就只能重新登錄了。

在 JWT 的實踐中，引入 Refresh Token，將會話管理流程改進如下。

1. 客戶端使用用戶名密碼進行認證
2. 服務端生成有效時間較短的 Access Token（例如 10 分鐘），和有效時間較長的 Refresh Token（例如 7 天）
3. 客戶端訪問需要認證的接口時，攜帶 Access Token
4. 如果 Access Token 沒有過期，服務端驗證後返回給客戶端需要的數據
5. 如果攜帶 Access Token 訪問需要認證的接口時驗證失敗（例如返回 401 錯誤），則客戶端使用 Refresh Token 向刷新接口申請新的 Access Token
6. 如果 Refresh Token 沒有過期，服務端向客戶端簽發新的 Access Token
7. 客戶端使用新的 Access Token 訪問需要認證的接口

![jwt.jpg](jwt.jpg)

將生成的 Refresh Token 以及過期時間存儲在服務端的資料庫中，由於 Refresh Token 不會在客戶端請求業務接口時驗證，只有在申請新的 Access Token 時會驗證，所以將 Refresh Token 存儲在資料庫中，不會對業務接口的響應時間造成影響，也不需要像 Session 一樣一直保持在內存中以應對大量的請求。

上述的架構，提供了服務端禁用用戶 Token 的方式，當用戶需要登出或禁用用戶時，只需要將服務端的 Refresh Token 禁用或刪除，用戶就會在 Access Token 過期後，由於無法獲取到新的 Access Token 而再也無法訪問需要認證的接口。這樣的方式雖然會有一定的空窗期（取決於 Access Token 的失效時間），但是結合用戶登出時客戶端刪除 Access Token 的操作，基本上可以適應常規情況下對用戶認證鑑權的精度要求。

完整的流程一般如下：

![Spotify OAuth Flow](spotify-oauth-flow.jpg)

*以上是 Spotify 的 OAuth Flow，可以參考 [Spotify OAuth Flow](https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow)*

## **總結**

JWT 的使用，提高了開發者開發用戶驗證功能的效率，降低了系統架構的複雜度，同時也避免了大量的資料庫和緩存查詢，也降低了業務接口的響應延遲。

然而 JWT 的這些優點也增加了 Token 管理上的難度，通過引入 Refresh Token，既能繼續使用 JWT 所帶來的優勢，又能使得 Token 管理的精度符合業務需求。

## 參考

1. **[Hasura The Ultimate Guide to handling JWTs on frontend clients (GraphQL)](https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/)**
2. **[Spotify OAuth Flow](https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow)**
3. **[GitHub Demo](https://github.com/shineve/jwt-tutorial)**
