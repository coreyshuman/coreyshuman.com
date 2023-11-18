---
title: OLED Display for Custom BB-8
description: Using an OLED screen to diagnose robot pitch, roll, and yaw.
img: /assets/posts/bb8-progress-2015/bb8-04.jpg
alt: my third blog post
published: true
created: 2015-09-15
updated: 2023-11-15
author: 
  name: Corey Shuman
tags: 
  - robotics
  - electronics
projects:
  - custom-bb8
---

**BB-8 OLED Splash Screen**

<position justify="center">
  <progressive-image src="/assets/posts/bb8-oled/oled-01.jpg" width="650px" alt="a small screen with blue-white text reading 'BB-8 Corey' and showing a crude drawing of BB-8" size="large" >
  </progressive-image>
</position>

I’ve added an OLED display to BB-8 to assist me in configuring and testing the little robot. Above is the splash screen shown on load. Below is the current diagnostic screen. The numbers on the left, labeled P, R, and Y represent the pitch, roll, and yaw of the robot platform. The series of dots on the right are 8 slider bars which correlate to the input from the remote controller. This information will help me a lot as I build out the stabilization and automation features in the software. The code related to displayed data can be seen in the file [diagnostic.c](https://github.com/coreyshuman/BB-8/blob/master/BB-8.X/diagnostic.c).

**BB-8 OLED Diagnostic Screen**

<position justify="center">
  <progressive-image src="/assets/posts/bb8-oled/oled-02.jpg" width="650px" alt="a small screen showing 8 progress bars which correspond to input data, and 3 numbers cooresponding to pitch, roll, and yaw" size="large" >
  </progressive-image>
</position>
