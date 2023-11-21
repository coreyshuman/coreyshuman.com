---
title: Stereoscopic Gimbal – Parts List and Detailed Photos
description: A compiled list of components and upclose photos of the Stereoscopic Gimbal.
img: /assets/posts/camera-gimbal-parts/gimbal-03.webp
alt: my third blog post
published: true
created: 2016-01-08
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

I’ve received a few requests for this, so I have compiled a detailed parts list for my 3D Gimbal. That list is below, followed by some detailed photos to help anyone who would like to recreate this project. I was hoping to include some build instructions, but unfortunately my constant barrage of deadlines hasn’t let up so I won’t have time. I’ve tried to double check and verify all information here but inevitably there are probably mistakes.

# Parts List

_Edit November 14, 2023 - Links removed because ServoCity changed their routing and broke all the links. Many of these parts are now discontinued._

<position justify="center">

<TableStyle color="metal" width="450px" :column-widths="['w-1/6', 'w-5/6']">

| Qty | Part Name                                     |
| :-: | --------------------------------------------- |
|  1  | Direct drive servo 6 inch cradle tilt (Hitec) |
|  1  | ¼ inch ball bearing quad pillow block         |
|  4  | ¼ inch bore set screw hub                     |
|  2  | ¼ inch bore flat bearing mount                |
|  1  | ¼ inch x 2.25 inch D-Shaft                    |
|  1  | ¼ inch x 1.5 inch D-Shaft                     |
|  1  | 3/8 inch x 4 inch precision shaft             |
|  1  | 3/8 inch bore thrust washer                   |
|  1  | 2 inch smooth hub pulley                      |
|  1  | 1 inch smooth hub pulley                      |
|  2  | 9 inch aluminum channel                       |
|  1  | 3 inch aluminum channel                       |
|  1  | 90 degree hub to hub mount                    |
|  1  | 4.5 inch 1/8 " smooth belt                    |
|  1  | Hitec HS-5645MG                               |
|  1  | Hitec HS-645MG                                |
|  1  | Hitec HS-5665MH                               |
|  4  | Large square screw plate                      |
|  4  | 3/8 inch bore clamping hub                    |
|  1  | 3/8 inch spacers                              |
|  1  | 3/8 inch ball bearing quad pillow block       |
|  1  | 3/8 inch bore flat bearing mount              |
|  1  | 90 degree dual side mount B                   |
|  1  | Standard servo plate B                        |
|  1  | Standard servo plate C                        |
|  1  | Round base A                                  |
|  1  | 64T, 32 P, ½ inch bore aluminum gear          |
|  1  | 32T, 32P metal servo gear (Hitec)             |
|  2  | 90 degree quad hub mount D                    |
|  1  | Servo set screw shaft coupler (Hitec)         |
| 12  | 6-32x1/4 inch Socket Head Machine Cap Screw   |
| 24  | 6-32x5/16 inch Socket Head Machine Cap Screw  |
| 16  | 6-32x3/8 inch Socket Head Machine Cap Screw   |
| 48  | 6-32x1/2 inch Socket Head Machine Cap Screw   |

</TableStyle>

</position>

The estimated cost including 2 Raspberry Pis and cameras is $500 – $550.

# Photos

Here are my detailed build photos along with some commentary (click for larger).

## Gimbal Base

3 inch channel supporting 3/8 inch shaft and mounted to board. Notice the thrust washer (blue) between the base and horizontal channel.

<position justify="center">
  <progressive-image src="/assets/posts/camera-gimbal-parts/gimbal-01.webp" width="650px" alt="a" size="large" >
  </progressive-image>
</position>

<position justify="center">
  <progressive-image src="/assets/posts/camera-gimbal-parts/gimbal-02.webp" width="650px" alt="a" size="large" >
  </progressive-image>
</position>

## Horizontal Channel

Note - servo is removed in this photo.

<position justify="center">
  <progressive-image src="/assets/posts/camera-gimbal-parts/gimbal-03.webp" width="650px" alt="a" size="large" >
  </progressive-image>
</position>

## Vertical Channel

<position justify="center">
  <progressive-image src="/assets/posts/camera-gimbal-parts/gimbal-04.webp" width="650px" alt="a" size="large" >
  </progressive-image>
</position>

4.5 inch belt around 1 and 2 inch hubs. I would recommend using a timing (notched) belt instead of this smooth belt because it slips too much.

<position justify="center">
  <progressive-image src="/assets/posts/camera-gimbal-parts/gimbal-05.webp" width="650px" alt="a" size="large" >
  </progressive-image>
</position>

## Tilt Mechanism

The tilt mechanism (black) is all from a single kit. Servo City offers a great YouTube video on how to assemble this piece, embedded below.

<position justify="center">

<youtube 
    src="https://www.youtube.com/embed/yZwZVvHpme4?si=dEYzuM8ePTHeXFsv" 
    title="ServoCity's video showing instructions on how to build the cradle tilt kit"
    width="675px">
</youtube>

</position>

## Complete Without Electronics

<position justify="center">
  <progressive-image src="/assets/posts/camera-gimbal-parts/gimbal-06.webp" width="650px" alt="a" size="large" >
  </progressive-image>
</position>

## Complete With Electronics

<position justify="center">
  <progressive-image src="/assets/posts/camera-gimbal-parts/gimbal-07.webp" width="650px" alt="a" size="large" >
  </progressive-image>
</position>
