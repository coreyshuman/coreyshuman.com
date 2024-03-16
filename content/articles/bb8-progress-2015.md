---
title: Custom BB-8 Progress Update
description: Progress update on my custom BB-8 robot build.
img: /assets/posts/bb8-progress-2015/bb8-01.webp
alt: electronic prototype boards, wires, and a multimeter laid messily on a table
published: true
created: 2015-09-30
updated: 2023-11-15
author: 
  name: Corey Shuman
tags: 
  - robotics
  - electronics
projects:
  - custom-bb8
---

I’ve been working on many different things over the last month so I though I’d do an update. First, I’ve been working on the audio module. I’m using an old XGS PIC-16 development board I had lying around plus some custom firmware to play WAVE files from an SD card. I’m also trying my hand at building a home-made class D amplifier (basically just an h-bridge) to take advantage of parts I have lying around plus the chance to learn.

<position justify="center">
  <progressive-image src="/assets/posts/bb8-progress-2015/bb8-01.webp" width="650px" alt="electronic prototype boards, wires, and a multimeter laid messily on a table" size="large" >
  </progressive-image>
</position>

I cut a higher quality roller/magnet board from ABS which will be used on the gimbal and on the bottom of the head. Here is one of those boards:

<position justify="center">
  <progressive-image src="/assets/posts/bb8-progress-2015/bb8-02.webp" width="650px" alt="a triangular piece of plastic with roller wheels and magnets placed in the three corners" size="large" >
  </progressive-image>
</position>

And most exciting, I convinced a friend (thanks Dylan!) to let me borrow his 3D printer so that I could start working on the details on BB-8’s head. Below is a photo of the main eye I printed. I still need to clean up the parts, but I am very happy with the result, especially since this is my first 3D printing experience. I’m hooked!

<position justify="center">
  <progressive-image src="/assets/posts/bb8-progress-2015/bb8-03.webp" width="650px" alt="a 3d printed ring made to look like a camera shroud" size="large" >
  </progressive-image>
</position>

I used the 3D models made by James from http://xrobots.co.uk/ so thanks to him!

Oh yes, one other thing: I added an OLED screen to the main CPU for debugging purposes. It allows me to view the measured tilt angle of the frame as well as the input levels from the controller. It’s been very helpful.

<position justify="center">
  <progressive-image src="/assets/posts/bb8-progress-2015/bb8-04.webp" width="650px" alt="side-by-side images of an OLED screen in two states, one showing a crude image of bb-8 with the words 'BB-8 Corey' and one showing a series of lines and dots which represent input states" size="large" >
  </progressive-image>
</position>
