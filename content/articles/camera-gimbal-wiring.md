---
title: Stereoscopic Camera Gimbal Wiring Details
description: Here is how I wired up my 3-axis gimbal controlled by a VR headset.
img: /assets/posts/camera-gimbal-wiring/gimbal-02.webp
alt: metal mechanism mounted to a wooden base via a vertical channel and metal shaft
published: true
created: 2016-01-07
updated: 2023-11-14
author: 
  name: Corey Shuman
tags: 
  - c++
  - robotics
  - electronics
  - raspberry pi
  - opencv
projects:
  - stereoscopic-gimbal
---

This post details how I connected 3 servos to a Raspberry Pi for my [Stereoscopic Camera Gimbal](./post/camera-gimbal-demo).

In the previous demo videos of the gimbal, I was using a separate platform (PIC32) to operate the servos. To consolidate resources and simplify the design, I wanted to transfer the servo operation to one of the Raspberry Pis already on the gimbal.

A few months ago, I experimented with using the Raspberry Pi's IO pins to run servos. The code I put together for that is on [GitHub](https://github.com/coreyshuman/stereo_raspi). I’m using IO pins 4, 17, and 18 to operate the X, Y, and Z axis servos, respectively. I used protoboard to create a basic breakout board between the Raspberry Pi and the servos. External power was used for the servos. Here is the initial design sketch I put together:

<position justify="center">
  <progressive-image src="/assets/posts/camera-gimbal-wiring/gimbal-01.webp" alt="a protoboard with drawing over it showing how power and data pins will connext to 3 servos" size="large" >
  </progressive-image>
</position>

In the final design, I decided to add a power LED and status LEDs for each of the servo channels. I also flipped the servo connectors as compared to the preceding sketch. Here is the finished board with everything connected:

<position justify="center">
  <progressive-image src="/assets/posts/camera-gimbal-wiring/gimbal-02.webp" alt="a protoboard with soldered headers for a raspberry pi, 3 servos, and power" size="large" >
  </progressive-image>
</position>

Right now the software is converting the tracking position for each servo into an 8-bit value to transport from the Oculus Rift to the Raspberry Pi. The result of this is somewhat choppy motion in the servos, so I will be switching to use 16-bit values next time I touch the software. Besides that, it’s working well and I’m very happy with the result. The next step is to figure out how to mount this breakout board to the gimbal.
