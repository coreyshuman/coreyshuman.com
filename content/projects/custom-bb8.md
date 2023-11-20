---
title: Custom BB-8 Robot
description: My attempt at re-creating the robot BB-8 from the new Star Wars movies.
img: /assets/headers/bb-blue-03.webp
alt: CAD software view of a PCB design with many colorful traces
created: 2015-04-20
updated: 2023-11-15
author:
  name: Corey Shuman
tags: 
  - robotics
  - electronics
---

My attempt to create a fully function BB-8 robot after seeing the physical robot demoed at Star Wars Celebration.

[BB-8 Code on GitHub](https://github.com/coreyshuman/BB-8)

# Quick notes on the project

**Main Board**

- Built on the PIC32 UBW32 "Bit Whacker" platform
- Requires Microchip Legacy Stack for USB drivers
- Memory allocation is setup to use USB bootloader
- Implements MPU-9150 9 DOF driver
- PMW Output to motors (3 wheel platform) and 2 servos for head movement
- Remote control via custom serial protocol over XBEE radio

**Daughter Board**

- Arduino Nano
- Communicates with main board via I2C
- Controls body sphere LEDs (Neopixels)
- Functions as EEPROM storage for main board

**Audio**

- Built on XGS 16-bit PIC development board
- Custom WAVE audio trigger board software
- Streams WAVE files from an SD card
- Controlled via UART commands

**Development Environment**

- MPLABX IDE v1.95 or greater
- Microchip legacy library TCP/IP and USB libraries
- MPLAB XC32 Compiler v1.20
- Arduino IDE

# The Footage that Started it All...

<youtube 
    src='https://www.youtube.com/embed/A_K10fX9DSY?si=ceM9KyrFiQE5_2Du' 
    title='A short video showing a metal camera gimbal mirroring the orientation of a VR headset as it is moved around'
    width='100%'>
</youtube>
