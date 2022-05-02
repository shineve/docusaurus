---
title: 前端JS規範
keywords: [front-end, javascript, coding, conventions]
date: 2022-05-02
authors: shineve
categories:
  - Front-End
  - Coding Conventions
tags:
  - JavaScript
  - Coding Conventions
---

### 變數 (Variables)

命名方式：Camel Case

命名規範：前綴名詞

```js
// bad
let setCount = 10;

// good
let maxCount = 10;
```

### 常數 (Constant)

命名方式：全部大寫

命名規範：多個單詞時使用`_`做分割

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

### 函數 (Function)

命名方式：Camel Case

命名規範：前綴動詞

```js
// bad
function essay() {}

// good
function writeEssay() {}
```

> 常用動詞：can、has、is、load、get、set

### 類

命名方式：Pascal Case

命名規範：前綴名詞

```js
// bad
class human {}

// good
class Human {}
```

### 註釋

#### 單行

```js
// 單行註釋
let total = 10;
```

#### 多行

```js
/**
 * 多行註釋
 * /

```

### 減少嵌套

確定條件不允許時，儘早返回。經典使用場景：Data Validation

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

### 減少特定標記值

使用常數進行自解釋

```js
// bad
type: 1; // 1代表新增  2代表修改

// good
const MODIFY_TYPE = {
  ADD: 1,
  EDIT: 2,
};

type: MODIFY_TYPE.ADD;
```

### 表達式

儘可能簡潔表達式

```js
// bad
if (name === '') {
}
if (collection.length > 0) {
}
if (notTrue === false) {
}

// good
if (!name) {
}
if (collection.length) {
}
if (notTrue) {
}
```

### 分支較多處理

對於相同變數或表達式的多值條件，用`switch`代替`if`。

```js
// bad
let type = typeof variable;
if (type === 'object') {
  // ......
} else if (type === 'number' || type === 'boolean' || type === 'string') {
  // ......
}

// good
switch (typeof variable) {
  case 'object':
    // ......
    break;
  case 'number':
  case 'boolean':
  case 'string':
    // ......
    break;
}
```

### 使用 Variables 名字解釋

**邏輯複雜**時，建議定義新 Variables 來解釋，而不是晦澀難懂的簡寫。

```js
// bad
function(value) {
    return !helpers.req(value) || this.entity.entVocabularyEntries.filter(item => item.vocabularyEntryName === value).length < 2;
}

// good
function(value) {
    let entVocabularyList = this.entity.entVocabularyEntries;
    let repeatCount = entVocabularyList.filter(item => item.vocabularyEntryName === value).length;
    return !helpers.req(value) || repeatCount < 2;
}
```

### 使用 Function 名字解釋

**遵循單一職責**的基礎上，可以把邏輯隱藏在 function 中，同時使用準確的 function 名字解釋。

```js
// bad
if (modifyType === MODIFY_TYPE.ADD) {
    await batchVariableAPI(data);
    this.closeModal();
    this.$toast.show('添加成功');
} else {
    await updateVariableAPI(data);
    this.closeModal();
    this.$toast.show('修改成功');
}

// good
modifyType === MODIFY_TYPE.ADD ？ this._insertVariable(data) : this._updateVariable(data);

async _insertVariable() {
    await batchVariableAPI(data);
    this._successOperation('添加成功');
}

async _updateVariable() {
    updateVariableAPI(data);
    this._successOperation('修改成功');
}

_successOperation(toastMsg) {
    this.closeModal()
    this.$toast.show(toastMsg)
}
```

### 其他規範

使用 `prettier` 格式化工具以及 `eslint` 校驗

- 格式自動化
- 4 個縮進
- 全部單引號
- 方法 if / else / for / while / function / switch / do / try / catch / finally 關鍵字後有一個空格

`.prettierrc` 配置：

```js
module.exports = {
  printWidth: 100, // 設置prettier單行輸出（不折行）的（最大）長度
  tabWidth: 4, // 設置工具每一個水平縮進的空格數
  useTabs: false, // 使用tab（製表位）縮進而非空格
  semi: true, // 在語句末尾添加分號
  singleQuote: true, // 使用單引號而非雙引號
  trailingComma: 'all', // 在任何可能的多行中輸入尾逗號
  bracketSpacing: true, // 在對象字面量聲明所使用的的花括號後（{）和前（}）輸出空格
  arrowParens: 'avoid', // 爲單行箭頭函數的參數添加圓括號，參數個數爲1時可以省略圓括號
  jsxBracketSameLine: true, // 在多行JSX元素最後一行的末尾添加 > 而使 > 單獨一行（不適用於自閉和元素）
  rangeStart: 0, // 只格式化某個文件的一部分
  rangeEnd: Infinity, // 只格式化某個文件的一部分
  filepath: 'none', // 指定文件的輸入路徑，這將被用於解析器參照
};
```

`.eslintrc.js` 規則：

```js
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'plugin:vue/essential', // 使用 essential 規範
    'eslint:recommended', // 使用 ESLint 推薦規範
    '@vue/prettier', //使用 prettier
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    'arrow-parens': 0, // allow paren-less arrow functions
    'generator-star-spacing': 0, // allow async-await
    'no-unused-vars': 'error', // disabled no ununsed var  `V1.1`
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // no use debugger in production
    indent: [2, 4, { SwitchCase: 1 }], // 4 space for tab for perttier
    'space-before-function-paren': ['error', 'never'], // no space in function name for perttier
  },
};
```