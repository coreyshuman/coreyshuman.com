---
title: Embedding Code into a Post
description: Custom code-runner component for demonstrating examples.
img: https://images.unsplash.com/photo-1588432415392-51f6e1a61d5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80
alt: my second blog post
created: 2022-01-01
updated: 2022-01-02
author: 
  name: Corey Shuman
tags: 
  - nuxtjs
---

# Code Runner

<info-box>
  <template #info-box>
    This is a vue component inside markdown using slots
  </template>
</info-box>

```js
var code = 'test';
```

## space

::embed-code
::template #code-html

```html[index.html]
  <h1 style="text-align:center;">Hello World</h1>
  <p>Here is some content</p>
  <p>Counter: <span id="count"></span></p>
  <button>Reset</button>
```

::
::template #code-css

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
::template #code-js

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
