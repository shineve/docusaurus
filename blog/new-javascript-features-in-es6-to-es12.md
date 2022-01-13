---
title: New JavaScript Features in ES6 ~ ES12
description: New JavaScript Features in ES6 ~ ES12
keywords: [javascript]
date: 2021-04-04
authors: shineve
categories:
- Front-End
tags: 
- JavaScript
- Web Development
---

This article includes the most commonly used features released from ES6 to ES12.

To use those features in front end, you will need to use the [babel](https://babeljs.io/) to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments.

## ES6 / ES2015

### 1. class

```jsx
class Man {
  constructor(name) {
    this.name = name;
  }
  console() {
    console.log(this.name);
  }
}
const man = new Man('Hao');
man.console(); // Hao
```

### 2. ES Module

```jsx
// export function in module A
export const sub = (a, b) => a + b;
// import function in module B
import { sub } from './A';
console.log(sub(1, 2)); // 3
```

### 3. Arrow functions

```jsx
const func = (a, b) => a + b;
func(1, 2); // 3
```

<!--truncate-->

### 4. Default parameters

```jsx
function foo(age = 25) { 
  console.log(age); // 25
}
```

### 5. Template strings

```jsx
const name = 'Hao';
const str = `Your name is ${name}`;
console.log(str); // Your name is Hao
```

### 6. Destructuring assignment

```jsx
let a = 1, b= 2;
[a, b] = [b, a]; // a 2  b 1
```

### 7. Spread operator

```jsx
let a = [...'hello world']; // ["h", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d"]
```

### 8. Object property value shorthand

```jsx
const name = 'Hao',
const obj = { name };
console.log(obj); // { name: 'Hao' }
```

### 9. Promise

```jsx
Promise.resolve().then(() => { console.log(2); });
console.log(1);
// print 1 ，then 2
```

### 10. let & const

```jsx
let name = 'Hao'；
const arr = [];
```

## ES7 / ES2016

### 1. Array.prototype.includes()

```jsx
[1].includes(1); // true
```

### 2. Exponentiation operator

```jsx
console.log(2 ** 10); // 1024
console.log(3 ** 4); // 81
console.log(2 ** 3 ** 2); // 512
```

## ES8 / ES2017

### 1. async/await

```jsx
async getData(){
  const res = await api.getTableData(); // await asynchronous task
  // do something
}
```

### 2. Object.values()

```jsx
Object.values({a: 1, b: 2, c: 3}); // [1, 2, 3]
```

### 3. Object.entries()

```jsx
Object.entries({a: 1, b: 2, c: 3}); // [["a", 1], ["b", 2], ["c", 3]]
```

### 4. String padding

```jsx
// padStart
'hello'.padStart(10); // "     hello"
// padEnd
'hello'.padEnd(10) "hello     "
```

### 5. Trailing commas in function parameters

```jsx
function getMessage(str,str2,){
  console.log(`${str} ${str2}`) ;
}

getMessage("hello","frank") // hello frank
```

## ES9 / ES2018

### 1. Asynchronous Iteration

for await of loop support asynchronous iteration

```jsx
async function process(array) {
  for await (let i of array) {
    // doSomething(i);
  }
}
```

### 2. Promise.finally()

```jsx
Promise.resolve().then().catch(e => e).finally();
```

### 3. Rest/Spread Operator

```jsx
const values = [1, 2, 3, 5, 6];
console.log( Math.max(...values) ); // 6
```

### 4. Capturing groups in regular expression

**[Demo](https://regex101.com/r/74Ilcy/2)**

```jsx
const regexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;

console.log('2020-04-04'.match(regexp)); // {year: "1995", month: "12", day: "13"} 
```

## ES10 / ES2019

### 1. Array.flat() and Array.flatMap()

`flat()`

```jsx
[1, 2, [3, 4]].flat(Infinity); // [1, 2, 3, 4]
```

`flatMap()`

```jsx
[1, 2, 3, 4].flatMap(a => [a**2]); // [1, 4, 9, 16]
```

### 2. String.trimStart() and String.trimEnd()

`trimStart()` removes whitespace from the beginning of a string

```jsx
const greeting = '   Hello world!   ';

console.log(greeting.trimStart());
// expected output: "Hello world!   ";
```

`trimEnd()` removes whitespace from the end of a string

```jsx
const greeting = '   Hello world!   ';

console.log(greeting.trimEnd());
// expected output: "   Hello world!";
```

### 3. String.prototype.matchAll

`matchAll()` method returns an iterator of all results matching a string against a regular expression, including [capturing groups](https://javascript.info/regexp-groups).

```jsx
const regexp = /t(e)(st(\d?))/g;
const str = 'test1 test2';

const array = [...str.matchAll(regexp)];

console.log(array[0]);
// expected output: Array ["test1", "e", "st1", "1"]

console.log(array[1]);
// expected output: Array ["test2", "e", "st2", "2"]
```

### 4. Object.fromEntries()

`Object.fromEntries()` method transforms a list of key-value pairs into an object.

Converting a Map to an Object

```jsx
const map = new Map([ ['foo', 'bar'], ['baz', 42] ]);
console.log(Object.fromEntries(map)); // { foo: "bar", baz: 42 }
```

Converting an Array to an Object

```jsx
const arr= [ ['foo', 'bar'], ['baz', 42] ];
console.log(Object.fromEntries(arr)); // { foo: "bar", baz: 42 }
```

### 5. Optional catch binding

Error parameter is required in try...catch before ES10

```jsx
try {
  console.log('Foobar')
} catch(err) {
  console.error('Bar')
}
```

Error parameter is optional in ES10

```jsx
try {
  console.log('Foobar')
} catch {
  console.error('Bar')
}
```

## ES11 / ES2020

### 1. Nullish coalescing Operator

Nullish coalescing Operator (`??`) is a logical operator that returns its right-hand side operand when its left-hand side operand is null or undefined, and otherwise returns its left-hand side operand

```jsx
let user = {
  u1: 0,
  u2: false,
  u3: null,
  u4: undefined,
  u5: '',
}
let u1 = user.u1 ?? 'user1'  // 0
let u2 = user.u2 ?? 'user2'  // false
let u3 = user.u3 ?? 'user3'  // user3
let u4 = user.u4 ?? 'user4'  // user4
let u5 = user.u5 ?? 'user5'  // ''
```

### 2. Optional chaining

The Optional chaining (`?.`) operator functions similarly to the `.` chaining operator, except that instead of causing an error if a reference is nullish (`null` or `undefined`), the expression short-circuits with a return value of `undefined`.

```jsx
let user = {}
let u1 = user.children.name // TypeError: Cannot read property 'name' of undefined
let u1 = user.children?.name // undefined
```

### 3. Promise.allSettled

The `Promise.allSettled()` method returns a promise that resolves after all of the given promises have either fulfilled or rejected, with an array of objects that each describes the outcome of each promise.

```jsx
const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));
const promises = [promise1, promise2];

Promise.allSettled(promises).then(results => {
  results.forEach(result => {
    console.log(result);
  });
});

// expected output:
// "{ status: "fulfilled", value: 3 }"
// "{ status: "rejected", reason: "foo" }"
```

### 4. import()

Before ES11

```jsx
if (Math.random()) {
  import 'foo'; // SyntaxError
}

// You can’t even nest `import` and `export`
// inside a simple block:
{
  import 'foo'; // SyntaxError
}
```

You can import module on demand and using `[template strings]()`

```jsx
if (condition) {
  const dynamicModule = import('./module');
}

let moduleName = 'foo';

import(`./modules/${moduleName}.js`);
```

### 5. globalThis

`globalThis` is used to solve the problem that the names of global objects are not uniform in different environments such as browsers and Node.js, and it is troublesome to obtain global objects:

```jsx
// how we do it before globalThis exist
const getGlobal = function () {
  // the only reliable means to get the global object is
  // `Function('return this')()`
  // However, this causes CSP violations in Chrome apps.
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
};
```

## ES12 / ES2021

### 1. replaceAll

The `replaceAll()` method returns a new string with all matches of a pattern replaced by a replacement.

```jsx
const str = 'hello world';
str.replaceAll('l', ''); // "heo word"

const regex = /l/ig;
str.replaceAll(regex, 'p'); // heppo worpd
```

### 2. Promise.any

`Promise.any()` takes an iterable of Promise objects and, as soon as one of the promises in the iterable fulfills, returns a single promise that resolves with the value from that promise

```jsx
const promise1 = Promise.reject(0);
const promise2 = new Promise((resolve) => setTimeout(resolve, 100, 'quick'));
const promise3 = new Promise((resolve) => setTimeout(resolve, 500, 'slow'));

const promises = [promise1, promise2, promise3];

Promise.any(promises).then((value) => console.log(value));

// expected output: "quick"
```

### 3. Logical Assignment Operator

Logical assignment operator combines the logical operations(&&, || or ??) with assignment.

```jsx
a ||= b
// equals to
a = a || (a = b)

a &&= b
// equals to
a = a && (a = b)

a ??= b
// equals to
a = a ?? (a = b)
```

***Examples***

```jsx
let x = 1;
let y = 2;
x &&= y;
console.log(x); // 2
```

```jsx
let x = 1;
let y = 2;
x ||= y;
console.log(x); // 1
```

```jsx
let x;
let y = 2;
x ??= y;
console.log(x); // 2
```

### 4. Underscores as Numeric Separator

```jsx
const billion = 1_000_000_000;
console.log(billion); // 1000000000

1_000_000_000 === 1000000000; // true
```
