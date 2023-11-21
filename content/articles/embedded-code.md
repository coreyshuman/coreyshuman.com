---
title: Embedding Code into a Post
description: Custom code-runner component for demonstrating examples.
img: /assets/headers/car.webp
alt: my second blog post
publish: false
created: 2023-11-09
updated: 2023-11-10
author: 
  name: Corey Shuman
tags: 
  - nuxtjs
---

# Custom Embed Code

This demo uses a custom [Markdown Abstract Syntax Tree (MDAST)](https://github.com/syntax-tree/mdast) directive to wrap markdown code sections in a Vue component which provides syntax highlighting and a live demo of the code.

::embed-code
::template #html

```html[index.html]
  <h1 style="text-align:center;">Hello World</h1>
  <p>Here is some content</p>
  <p>Counter: <span id="count"></span></p>
  <button>Reset</button>
```

::
::template #css

```css[style.css]
  body {
    background: radial-gradient(#e66465, #9198e5);
    background-repeat: no-repeat;
    background-size: cover;
    color: white;
    height: 90vh;
  }
  button {
    background: radial-gradient(#387989, #6dd5ed);
    background-repeat: no-repeat;
  }
```

::
::template #js

```js[script.js]
  let count = 0;
  let el = document.getElementById('count');
  setInterval(() => {
    el.innerText = count ++;
  }, 200);
  document.querySelector('button').addEventListener('click', () => {
    count = 0;
    el.innerText = 0;
  });

```

::
::

Code box should show above

# JS-Only Example

This demo uses a custom MDAST directive to wrap markdown code sections in a Vue component which provides syntax highlighting and a live demo of the code.

::embed-code

::template #js

```js[script.js]
  for(let num = 0; num < 20; num++) {
    console.log(num);
  }
  console.error('this is an error');
```

::
::

# Reference

## Standard Embedded View Component

<info-box>
  <template #info-box>
    This is a Vue component inside markdown using slots
  </template>
</info-box>

## Standard Inline Code

```js
var code = 'test';
```
