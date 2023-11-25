---
title: Syntax Examples
description: Learning how to use @nuxt/content to create a blog
img: /assets/headers/car.webp
alt: my first blog post
published: false
created: 2020-01-01
updated: 2020-01-02
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

<div class="bg-purple text-steel p-2">
  This is HTML inside markdown that has some classes
</div>

<info-box>
    This is an info box using slots.
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

Here's a basic footnote,[^1] and here's a longer one.[^bignote]

## This is a sub heading h2

This is some more info

### This is another sub heading h3

This is some more info

#### This is another sub heading h4

This is some more info

##### This is another sub heading h5

<ProgressiveImage
  src="/assets/headers/car.webp"
  alt="a car in a desert"
  blur="2px"
  loading-blur="2px"
  size="small"
  fit="fill">
</ProgressiveImage>

This is a paragraph after an image.

<position justify="center">

<ProgressiveImage
  src="/assets/headers/car.webp"
  alt="a car in a desert"
  width="250px"
  height="100%"
  blur="2px"
  loading-blur="1px"
  radius="10px 10px 0px 0px"
  size="small"
  fit="fill">
</ProgressiveImage>

<ProgressiveImage
  src="/assets/headers/car.webp"
  alt="a car in a desert"
  width="250px"
  height="100%"
  blur="2px"
  loading-blur="2px"
  radius="10px"
  size="small"
  fit="fill">
</ProgressiveImage>

</position>

- List after an image here
- After
- Image

<ProgressiveImage
  src="/assets/headers/car.webp"
  alt="a car in a desert"
  blur="2px"
  loading-blur="2px"
  size="small"
  fit="fill">
</ProgressiveImage>

```js
var code = 'after image';
```

<TableStyle>

| Item         | Price | # In stock |
| ------------ | :---: | ---------: |
| Juicy Apples | 1.99  |        739 |
| Bananas      | 1.89  |          6 |
| Super Pears  | 2.59  |         69 |
| Kumquat      | 0.92  |       1212 |

</TableStyle>

<position justify="center">

<TableStyle color="red" caption="Centered Table">

| Item         | Price | # In stock |
| ------------ | :---: | ---------: |
| Juicy Apples | 1.99  |        739 |
| Bananas      | 1.89  |          6 |
| Super Pears  | 2.59  |         69 |
| Kumquat      | 0.92  |       1212 |

</TableStyle>

</position>

<TableStyle color="lavender" caption="Fixed Widths Table" :column-widths="['w-2/4', 'w-1/4', 'w-1/4']">

| Item         | Price | # In stock |
| ------------ | :---: | ---------: |
| Juicy Apples | 1.99  |        739 |
| Bananas      | 1.89  |          6 |
| Super Pears  | 2.59  |         69 |
| Kumquat      | 0.92  |       1212 |

</TableStyle>

<TableStyle color="ocean" width='100px' caption="Small Table">

| Item                     | Price | # In stock |
| ------------------------ | :---: | ---------: |
| Juicy Apples             | 1.99  |        739 |
| Bananas                  | 1.89  |          6 |
| Super Pears              | 2.59  |         69 |
| Whathappenswithalongword | 0.92  |       1212 |

</TableStyle>

<TableStyle color="silver" caption="No Alternating" :alternating="false">

| Item         | Price | # In stock |
| ------------ | :---: | ---------: |
| Juicy Apples | 1.99  |        739 |
| Bananas      | 1.89  |          6 |
| Super Pears  | 2.59  |         69 |
| Kumquat      | 0.92  |       1212 |

</TableStyle>

[^1]: This is the first footnote.
[^bignote]: Here's one with multiple paragraphs and code.

    Indent paragraphs to include them in the footnote.

    `{ my code }`

    Add as many paragraphs as you like.
