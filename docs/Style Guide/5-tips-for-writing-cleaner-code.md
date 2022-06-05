---
title: 5 Tips for Writing Cleaner Code
keywords: [front-end, javascript, coding, conventions]
date: 2022-06-06
authors: shineve
slug: /5-tips-for-writing-cleaner-code
categories:
  - Front-End
  - Coding Conventions
tags:
  - JavaScript
  - Coding Conventions
---

### 1. 避免不必要的嵌套 (Nesting)

過多的嵌套可能會使代碼更難讀、更容易出錯，因此我們可以提早 `return` 來避免過多的嵌套。

```js
// Bad
function deleteItem(item) {
  if (item != null) {
    console.log('Deleting item');
    item.delete();
  }
}

// Good
function deleteItem(item) {
  if (item == null) return;

  console.log('Deleting item');
  item.delete();
}
```

Nested if 的例子

```js
// Bad
function saveItem(item) {
  if (item != null) {
    console.log("Validating");

    if (item.isValid()) {
      console.log("Saving item");
      item.save();
    }
}

// Good
function saveItem(item) {
  if (item == null) return;

  console.log("Validating");
  if (!item.isValid) return;

  console.log("Saving item");
  item.save();
}
```

### 2.多利用解構 (Destruct)

[參考文件](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

我們經常會在 Function 內接受一個 `Object` 為參數，這時候我們可以使用 `destruct` 來解構這個 `Object`，這樣我們就可以直接使用 `Object` 的屬性來取得資料。

在不使用 `destruct` 的例子：

```js
// not so good
function getFullName(person) {
  const firstName = person.firstName;
  const lastName = person.lastName;
  return `${firstName} ${lastName}`;
}
```

使用 `destruct` 後的例子：

```js
// good
function getFullName(person) {
  const { firstName, lastName } = person;
  return `${firstname} ${lastName}`;
}

// better
function getFullName({ firstName, lastName }) {
  return `${firstName} ${lastName}`;
}
```

### 3. 使用 Pure Function 來避免副作用 (Side Effects)

在寫一個 Function 時，最好不要使用到 Function 外的 Variables，這樣可以避免副作用。

```js
// bad
let items = 5;
function changeNumber(number) {
  items = number + 3;
  return items;
}
changeNumber(5);
```

上面的例子中，我們在 `changeNumber` 內使用到了 `items` 這個 global variables，這樣的做法很容易導致不可預測的狀況，例如 items 不存在了或其 data type 被改變了，這時就會出現錯誤。

要避免上面的這種 副作用，我們可以使用 `Pure Function`的方式重新撰寫：

```js
// good
function addNumByThree(number) {
  return number + 3;
}
```

上面的例子中，我們移除掉了外部 variables 的依賴(External Dependency)，使得其功能完全獨立，不會影響到其他的部分，因此我們可以更容易預測 `Function` 的行為。

### 4. 盡量讓 Function 只做一件事

我們在撰寫 `Function` 時，最好不要讓它做太多事，這樣可以減少 `Function` 的複雜度，並且可以減少 `Function` 的副作用。

不好的例子：

```js
// Bad
function validateAndSignUp() {
  // Do a heap of stuff here
}
```

上面的這種方式很容易讓我們的代碼過於複雜，最終變成 [`Spaghetti code`](https://zh.wikipedia.org/zh-tw/%E9%9D%A2%E6%9D%A1%E5%BC%8F%E4%BB%A3%E7%A0%81)，同時也讓代碼難以複用、維護、debug。
因此我們可以將它拆成一個一個的小單元：

```js
function validate() {
  // Validate Input
}

function signUp() {
  // Sign Up User
}
```

### 5. 使用有意義的詞語命名

1. 當 `Function` 是一個行為時，使用**動詞**命名。

```js
// bad
function passwordValidation() {
  //
}
// good
function validatePassword() {
  //
}
```

2. 如果 variables 是 `Boolean` 時，加上 `is` 前綴。

```js
const isValidPassword = validatePassword('abcd');
```

3. 如果 variables 是 `Array` 時，命名其為複數或加上 `list` 後綴。

```js
// bad
const animal = ['cat', 'dog', 'bird'];
// good
const animals = ['cat', 'dog', 'bird'];
const animalList = ['cat', 'dog', 'bird'];
```

4. 使用 `callback` 時，迭代時始終使用有意義的名稱：

```js
// Really bad
animals.forEach(a => {
  console.log(a);
});

// Good
animals.forEach(animal => {
  console.log(animal);
});
```
