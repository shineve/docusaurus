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

### 1. Avoid Unnecessary Nesting

Too much nesting can make code harder to read and more prone to errors, so we can use an early `return` to avoid excessive nesting.

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

Nested if example:

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

### 2.Make Use of Destructuring

[Reference document](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

We often accept an `Object` as a parameter within a function. At this time, we can use `destructuring` to destructure this `Object`, so that we can directly use the properties of the Object to obtain data.

Example without using `destructuring`:

```js
// not so good
function getFullName(person) {
  const firstName = person.firstName;
  const lastName = person.lastName;
  return `${firstName} ${lastName}`;
}
```

Example with `destructuring`:

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

### 3. Use Pure Functions to Avoid Side Effects

When writing a function, it is best not to use variables outside the function, so as to avoid side effects.

```js
// bad
let items = 5;
function changeNumber(number) {
  items = number + 3;
  return items;
}
changeNumber(5);
```

In the example above, we use `items`, a global variable, within `changeNumber`. This approach is prone to unpredictable situations, such as when items no longer exists or its data type is changed, which can lead to errors.

To avoid the above-mentioned side effects, we can rewrite it using the `Pure Function` approach:

```js
// good
function addNumByThree(number) {
  return number + 3;
}
```

In the example above, we removed the dependency on external variables, making its functionality completely independent and not affecting other parts. Therefore, we can more easily predict the behavior of the function.

### 4. 4. Make Functions Do One Thing Well

When writing functions, it is best not to do too much, which can reduce the complexity and side effects of the function.

Bad example:

```js
// Bad
function validateAndSignUp() {
  // Do a heap of stuff here
}
```

The above approach can easily make our code too complicated, eventually becoming a [Spaghetti code](https://zh.wikipedia.org/zh-tw/%E9%9D%A2%E6%9D%A1%E5%BC%8F%E4%BB%A3%E7%A0%81), and also make the code difficult to reuse, maintain, and debug. Therefore, we can break it down into small units:

```js
function validate() {
  // Validate Input
}

function signUp() {
  // Sign Up User
}
```

### 5. Use Meaningful Names

1. When Function is an action, name it using a verb.

```js
// bad
function passwordValidation() {
  // ...
}
// good
function validatePassword() {
  // ...
}
```

2. If the variable is a `Boolean`, prefix it with `is`.

```js
const isValidPassword = validatePassword('abcd');
```

3. If the variable is an `Array`, name it in plural or with a `list` suffix.

```js
// bad
const animal = ['cat', 'dog', 'bird'];
// good
const animals = ['cat', 'dog', 'bird'];
const animalList = ['cat', 'dog', 'bird'];
```

4. When using a `callback`, always use meaningful names when iterating:

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
