---
title: Custom BB-8 Progress Update 2016
description: Mockup photos, circuits, and a quick test video of the BB-8 platform.
img: /assets/headers/bb-blue-02.webp
alt: my third blog post
published: true
created: 2016-05-11
updated: 2023-11-15
author: 
  name: Corey Shuman
tags: 
  - robotics
  - electronics
projects:
  - custom-bb8
---

I've made a lot of progress and changes to BB-8 over the last few months that haven't been documented here so I figured this would be a good time to snapshot where I'm at with the project.

My BB-8 is a 'hamster' design meaning there is a robotic platform that drives along the inside of the body sphere to create motion. The drive platform is 3-wheeled using omniwheels which gives me full range of motion, including strafing. This also allows the craft to sit more sturdily inside the sphere with all three wheels always making contact and applying drive to the sphere. There is a boom-style gimbal lifting from the top of the platform to control BB-8's head motion. The coupling between the gimbal and the head is magnetic. Following is an image of the platform and gimbal mocked-up inside the sphere, as well as a video of the platform operating.

**BB-8 drive platform mocked up inside the body sphere**

<position justify="center">
  <progressive-image src="/assets/posts/bb8-progress-2016/bb8-01.jpg" width="650px" alt="a" size="large" >
  </progressive-image>
</position>

**BB-8 drive platform 3D model**

<position justify="center">
  <progressive-image src="/assets/posts/bb8-progress-2016/bb8-02.png" width="650px" alt="a" size="large" >
  </progressive-image>
</position>

**Quick test video of all of the moving components**

<position justify="center">
<youtube 
    src='https://www.youtube.com/embed/UMntssljJvY?si=uE2xNq0PsE1sEL-r' 
    title='a'
    width='650px'>
</youtube>
</position>

**Testing the platform moving inside the ball**

<position justify="center">
<youtube 
    src='https://www.youtube.com/embed/oyNPaZXI8BM?si=p3SKiqkbrJL7Qy1K' 
    title='a'
    width='650px'>
</youtube>
</position>

The primary microprocessor controlling BB-8's body is a Microchip PIC32 MCU. The PIC32 processes orientation data from a 9 degrees-of-freedom MCU and controls the driver motors and gimbal servos. The PIC32 connects to two other microcontrollers: a PIC24 for audio playback, and an Arduino Uno "Top Board" to control the internal LEDs as well as to store configuration data. Control data is sent to the PIC32 via an XBEE wireless radio.

**BB-8 Primary MCU: PIC32**

<position justify="center">
  <progressive-image src="/assets/posts/bb8-progress-2016/bb8-03.jpg" width="650px" alt="a" size="large" >
  </progressive-image>
</position>

**Daughter board with XBEE radio, OLED display, and Neopixel LEDs**

<position justify="center">
  <progressive-image src="/assets/posts/bb8-progress-2016/bb8-04.jpg" width="650px" alt="a" size="large" >
  </progressive-image>
</position>

**BB-8 Audio: PIC24 MCU, MAX9744 Amp, and transducer "speakers"**

<position justify="center">
  <progressive-image src="/assets/posts/bb8-progress-2016/bb8-05.jpg" width="650px" alt="a" size="large" >
  </progressive-image>
</position>

For audio, I quickly discovered that sound doesn't escape the plastic sphere very wheel. As a result, I'm using surface transducer "speakers" that will turn the entire platform and sphere into a speaker through vibrations. I also have an OLED display as shown above for general diagnostic purposes.
