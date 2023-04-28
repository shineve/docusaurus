---
title: Pre-Commit
keywords: [front-end, javascript, coding, conventions]
date: 2023-04-025
authors: shineve
categories:
  - Automation
tags:
  - Automation
---

# Automated Format workflow with husky

In modern software development, formatting code is a crucial step that ensures code consistency and readability. However, formatting code manually can be tedious and error-prone. Fortunately, there are tools that can automate the process of formatting code.

In this blog post, we will discuss the use of husky, ESLint, Prettier, and lint-staged to format code on pre-commit.

## What are husky, ESLint, Prettier, and lint-staged?

- [**husky**](./Tools/husky.md) is a tool that enables developers to create Git hooks that execute custom scripts. These scripts will be executed before or after certain Git commands are run.

- **lint-staged** is a tool that allows you to only script on the files that have been modified instead of the entire codebase, which can save a lot of time and resources.

- **ESLint** is a pluggable and configurable JavaScript linter that helps detect errors and enforce coding conventions. It can be used to ensure that the codebase is free of syntax and stylistic errors.

- **Prettier** is a code formatter that can automatically format code to a consistent style. It can be integrated with ESLint to ensure that code is formatted in a consistent and readable way.

## Format code before you commit

By using tools mentioned above, we can automate the process of formatting code before we submit our commit.

This ensures that the codebase is always formatted consistently and free of syntax and stylistic errors.

## Setup Guide

### 1. Dependencies

```sh
npm i -D husky lint-staged eslint prettier
```

### 2. ESLint configuration

Create a `.eslintrc.js` file in the root of your project and add the desired ESLint configuration.

```js
module.exports = {
  extends: 'eslint:recommended',
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'double'],
  },
};
```

### 3. Prettier Settings

Create a `.prettierrc` file in the root of your project.

```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "printWidth": 80
}
```

### 4. Setup husky

Now we install husky and initialize it with the following command:

```sh
  npx husky-init && npm install
```

This will create a `.husky` directory in the root of your project. Inside this directory, you will find a `pre-commit` file. This file contains the following code:

```sh
  #!/bin/sh
  . "$(dirname "$0")/_/husky.sh"

  npm-test
```

we update the `pre-commit` file to the following to execute `lint-staged` instead of `npm-test` on pre-commit:

```sh
  #!/bin/sh
  . "$(dirname "$0")/_/husky.sh"

  npx lint-staged
```

### 4. Setup lint-staged

Add these scripts to your package.json:

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,css,scss}": "prettier --write"
  }
}
```

That's it! Now every time you commit changes to your code, husky will execute the `lint-staged` command, which in turn will run ESLint and Prettier on the modified files. This ensures that your code is always formatted consistently and free of syntax and stylistic errors.
