---
title: .prettierrc
keywords: [front-end, javascript, coding, conventions]
date: 2023-04-28
authors: shineve
categories:
  - Front-End
  - Coding Conventions
tags:
  - JavaScript
  - Coding Conventions
---

# My .prettierrc config

```js
module.exports = {
  printWidth: 100, // Set the maximum length of a line of code before Prettier breaks it into multiple lines.
  tabWidth: 4, // Set the number of spaces to be used for each level of indentation.
  useTabs: false, // Use spaces instead of tabs for indentation.
  semi: true, // Add a semicolon at the end of each statement.
  singleQuote: true, // Use single quotes instead of double quotes for string literals.
  trailingComma: 'all', // Add a trailing comma to the end of any object or array with multiple lines.
  bracketSpacing: true, // Add a space between the opening and closing braces of object literals.
  arrowParens: 'avoid', // Omit parentheses around a function's parameter when there is only one parameter.
  jsxBracketSameLine: true, // Place the closing angle bracket of a JSX element on the same line as the last line of the element's content.
  rangeStart: 0, // Format only a portion of a file, starting from a specified line.
  rangeEnd: Infinity, // Format only a portion of a file, ending at a specified line.
  filepath: 'none', // Specify the path of the file being formatted, used by the parser for reference.
};
```
