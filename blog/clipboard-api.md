---
title: Clipboard API - Copy text to clipboard with JavaScript
description: 該篇文章將會介紹如何使用 JavaScript 將文字複製到剪貼簿。
keywords: [javascript, clipboard, copy, cut, paste]
date: 2021-3-26
authors: shineve
categories:
- Front-End
tags:
- JavaScript
- Web Development
---
Copy buttons are often used in many websites and applications, in this tutorial, you would learn how to copy text in your website or web app across all browsers.

[Demo](https://codepen.io/shineve/pen/VwPaPda)

## The Wide Support Way

To appreciate the improved way of copying text to clipboard, we need to take a brief look at how we used to have to do things.

```jsx
function wideSupportCopyToClipboard(textToCopy) {
  // Add a temporary textarea element so that we can later run the copy command
  const textarea = document.createElement('textarea');

  //Add value we want to copy to the textarea
  textarea.value = textToCopy;
  // Avoid keyboard open in iOS
  textarea.readOnly = true;
  textarea.contentEditable = 'true';

  //Append invisible textarea to the document
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);

  //select the text to be copied
  textarea.select();

  // Copy the selected text inside the textarea to the clipboard
  document.execCommand('copy');

  //Remove temporary textarea from the document
  textarea.remove();
}
```

<!--truncate-->

## Clipboard API

The [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API) to provide copy, cut and paste events as well as provide access to the OS clipboard. This API is intended to replace the need of the **[document.execCommand()](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand)** method which is now being deprecated.

The awesome part of the Clipboard API is that it provides [Async Clipboard API](https://www.w3.org/TR/clipboard-apis/#async-clipboard-api) with a well-defined permissions model that doesn't block the page, it allows us to provide better user experience when transferring time consuming resources. You can check for more details [here](https://blog.alyssaholland.me/how-to-copy-text-to-the-clipboard-using-jsx).

The [Clipboard API browser compatibility](https://caniuse.com/?search=clipboard) is also now supported in major browsers after Safari recently announced [support for it in version 13.1](https://webkit.org/blog/10855/).

## The New Way

```jsx
function newWayCopyToClipboard(textToCopy) {
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      console.log("Text copied to clipboard");
    })
    .catch((error) => {
      console.error("Failed to copy: ", error);
    });
}
```

## Final

We can keep the wide support version to make sure everything goes well when something goes wrong.

```jsx
async function copyToClipboard(textToCopy) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(textToCopy);
      console.log("Text copied to clipboard with Clipboard API");
    } catch {
      console.error("Failed to copy: ", error);
      wideSupportCopyToClipboard(textToCopy);
    }
  } else {
    wideSupportCopyToClipboard(textToCopy);
  }
}
```

## Resources

- [MDN - Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)
- [MDN - Clipboard.writeText()](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText)
- [Can I Use - Clipboard API browser Compatibility](https://caniuse.com/?search=clipboard)
- [Unblocking clipboard access - Safer, unblocked clipboard access for text and images](https://web.dev/async-clipboard/)
  