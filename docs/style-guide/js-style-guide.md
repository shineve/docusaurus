---
title: JavaScript Coding Style
keywords: [front-end, javascript, coding, conventions]
date: 2022-05-02
authors: shineve
slug: /
categories:
  - Front-End
  - Coding Conventions
tags:
  - JavaScript
  - Coding Conventions
---

### Variables

Naming: Camel Case

Convention: Use a prefix

```js
// bad
let setCount = 10;

// good
let maxCount = 10;
```

### Constants

Naming: ALL_CAPS

Convention: Use \_ to separate words

```js
// bad
const serverErrorCode = {
  success: 200,
  internalServerError: 500,
};

// good
const SERVER_ERROR_CODE = {
  SUCCESS: 200,
  INTERNAL_SERVER_ERROR: 500,
};
```

### Functions

Naming: Camel Case

Convention: Use a verb prefix

```js
// bad
function essay() {}

// good
function writeEssay() {}
```

> Common verbs: can, has, is, load, get, set

### Classes

Naming: Pascal Case

Convention: Use a prefix

```js
// bad
class human {}

// good
class Human {}
```

### Comments

#### Single-line

```js
// Single-line comment
let total = 10;
```

#### Multi-line

```js
/**
 * Multi-line comment
 */
```

### Reduce Nesting

Exit early when the condition is not allowed. A classic scenario is data validation.

```js
// bad
if (condition1) {
    if (condition2) {
        ...
    }
}

// good
if (!condition1) return
if (!condition2) return
...
```

### Reduce Specific Tag Values

Use constants for self-explanatory values.

```js
// bad
// 1 represents add, 2 represents edit, 3 represents delete
type: 1;

// good
const MODIFY_TYPE = {
  ADD: 1,
  EDIT: 2,
  DELETE: 3,
};

type: MODIFY_TYPE.ADD;
```

### Expressions

Make expressions as concise as possible.

```js
// bad
if (name === '') {
  // ...
}
if (collection.length > 0) {
  // ...
}
if (notTrue === false) {
  // ...
}

// good
if (!name) {
  // ...
}
if (collection.length) {
  // ...
}
if (notTrue) {
  // ...
}
```

### Use Positive Wording

Use positive wording if possible. Negative wording can make it difficult to understand when used in negative judgments.

```js
// bad
if (!isProductNotReleased) {
  // ...
}

// good
if (isProductReleased) {
  // ...
}

if (!isProductReleased) {
  // ...
}
```

### Handling Multiple Branches

For multiple value conditions of the same variable or expression, use switch instead of if.

```js
// bad
let type = typeof variable;
if (type === 'object') {
  // ...
} else if (type === 'number' || type === 'boolean' || type === 'string') {
  // ...
}

// good
switch (typeof variable) {
  case 'object':
    // ...
    break;
  case 'number':
  case 'boolean':
  case 'string':
    // ...
    break;
}
```

### Use Variable Names to Explain

When the logic is complex, define a new variable to explain it rather than using obscure abbreviations.

```js
// bad
function isQualifiedPlayer(user) {
  return (
    (user.rate > 80 && user.score > 300 && user.level > 120) ||
    user.medals.filter(medal => medal.type === 'gold').length > 10
  );
}

// good
function isQualifiedPlayer(value) {
  const isExperiencedPlayer = user.rate > 80 && user.score > 300 && user.level > 120;
  const isGoldMedalPlayer = user.medals.filter(medal => medal.type === 'gold').length > 10;
  return isExperiencedPlayer || isGoldMedalPlayer;
}
```

### Use function names to explain

On the basis of "single responsibility", the logic can be hidden in the function and explained using accurate function names.

```js
// bad
if (modifyType === MODIFY_TYPE.ADD) {
    await batchVariableAPI(data);
    this.closeModal();
    this.$toast.show('Create success!');
} else {
    await updateVariableAPI(data);
    this.closeModal();
    this.$toast.show('Edit success!');
}

// good
modifyType === MODIFY_TYPE.ADD ？ this._insertVariable(data) : this._updateVariable(data);

async _insertVariable(data) {
    await batchVariableAPI(data);
    this._successOperation('Insert success!');
}

async _updateVariable(data) {
    await updateVariableAPI(data);
    this._successOperation('Edit success!');
}

_successOperation(toastMsg) {
    this.closeModal()
    this.$toast.show(toastMsg)
}
```
