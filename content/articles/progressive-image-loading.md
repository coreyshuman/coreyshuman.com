---
title: Progressive Image Loading for a Positive Low Bandwidth Experience
description: I demonstrate how to use progressive jpegs and tiny blurred placeholder images to provide a positive low-bandwidth experience when using high quality or large images on a website.
img: https://images.unsplash.com/photo-1588010986054-727675e6f36a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60
alt: my third blog post
created: 2022-01-01
updated: 2022-01-02
author: 
  name: Corey Shuman
tags: 
  - javascript
  - web development
---

# Goals

- talk about influence from Instagram, impressed by placeholder color matching image
- want to do this but with higher fidelity
- outcome: we've got something interesting for user to see while image is loading

# What is a progressive image

- show progressive jpeg loading versus regular

<video playsinline controls>
    <source src="/assets/blog/progressive-loading-demo/default-behavior.mp4" type="video/mp4">
</video>

# Creating our blurry thumbnail

- low pixel, low quality image
- show how much we can get away with using css blur
- do css blur so that image can be as small as possible

# Using thumbnail blur with progressive loading

<video playsinline controls>
    <source src="/assets/blog/progressive-loading-demo/with-background-thumbnail.mp4" type="video/mp4">
</video>

# Add a loading indicator

# Wrap up, compare original with full experience

<video playsinline controls>
    <source src="/assets/blog/progressive-loading-demo/with-loading.mp4" type="video/mp4">
</video>

Image reference
https://unsplash.com/photos/IEWoxRpew-0
