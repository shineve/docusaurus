---
title: husky
keywords: [javascript, automation]
date: 2023-04-025
authors: shineve
categories:
  - Automation
tags:
  - Automation
---

# husky

`husky` is a tool that enables developers to create Git hooks that execute custom scripts. These scripts will be executed before or after certain Git commands are run.

They can be used to automate various tasks such as formatting code, running tests, and more.

## Installation

we install `husky` and initialize it with the following command:

```sh
  npx husky-init && npm install
```

This will create a `.husky` directory in the root of your project. Inside this directory, you will find a `pre-commit` file. This file contains the following code:

```sh
  #!/bin/sh
  . "$(dirname "$0")/_/husky.sh"

  npm-test
```

This script will run the `npm-test` command before the `git commit` command is run.

## Advanced Usage

Refer to [Automation Format Workflow](../Format.md)

## References

- [husky](https://typicode.github.io/husky/#/?id=automatic-recommended)
