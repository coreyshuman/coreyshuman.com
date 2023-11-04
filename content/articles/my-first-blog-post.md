---
title: My First Blog Post
description: Learning how to use @nuxt/content to create a blog
img: https://images.unsplash.com/reserve/LJIZlzHgQ7WPSh5KVTCB_Typewriter.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60
alt: my first blog post
published: true
created: 2022-01-01
updated: 2022-01-02
author: 
  name: Corey Shuman
tags: 
  - nuxtjs
  - javascript
---

Welcome to my first blog post using content module

:dog: :cat: :cat: :heart:

# This is a heading h1 style converted to h2

This is some more info :beer: :coffee: :tada:

<div class="bg-purple text-steel p-4 mb-4">
  This is HTML inside markdown that has some classes
</div>

<info-box>
  <template #info-box>
    This is a vue component inside markdown using slots
  </template>
</info-box>

```js {1,3-5}[nuxt.config.js]
const btn = document.getElementById('btn');
let count = 0;

function render() {
  btn.innerText = `Count: ${count}`;
}

btn.addEventListener('click', () => {
  // count from 1 to 10.
  if (count < 10) {
    count += 1;
    render();
  }
});
```

test

```html
<p>code styling is easy</p>
```

Here's a simple footnote,[^1] and here's a longer one.[^bignote]

[^1]: This is the first footnote.
[^bignote]: Here's one with multiple paragraphs and code.

    Indent paragraphs to include them in the footnote.

    `{ my code }`

    Add as many paragraphs as you like.

### This is a sub heading h3

This is some more info

#### This is another sub heading h4

This is some more info

##### This is another sub heading h5

This is some more info

###### This is another sub heading h6

This is some more info

## This is another heading

This is some more info
