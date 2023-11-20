---
title: Progressive Image Loading for a Positive Low Bandwidth Experience
description: I demonstrate how to use progressive JPEG and tiny blurred placeholder images to provide a positive low-bandwidth experience when using high quality or large images on a website.
img: /assets/headers/scenic.png
alt: a scenic view of the California desert
published: true
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

- show progressive JPEG loading versus regular

<video playsinline controls>
    <source src="/assets/posts/progressive-loading-demo/default-behavior.mp4" type="video/mp4">
</video>

# Creating our blurry thumbnail

- low pixel, low quality image
- show how much we can get away with using CSS blur
- do CSS blur so that image can be as small as possible

# Using thumbnail blur with progressive loading

<video playsinline controls>
    <source src="/assets/posts/progressive-loading-demo/with-background-thumbnail.mp4" type="video/mp4">
</video>

# Add a loading indicator

# Wrap up, compare original with full experience

<video playsinline controls>
    <source src="/assets/posts/progressive-loading-demo/with-loading.mp4" type="video/mp4">
</video>

Image reference
https://unsplash.com/photos/IEWoxRpew-0

<progressive-image src="/assets/headers/car.png" alt="a scenic desert" size="large" width="100%" >
</progresive-imge>
