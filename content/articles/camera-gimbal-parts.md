---
title: Stereoscopic Gimbal – Parts List and Detailed Photos
description: A compiled list of components and upclose photos of the Stereoscopic Gimbal.
img: /assets/posts/camera-gimbal-parts/gimbal-03.jpg
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
<!-- todo: table component -->

<table style="width:100%; " class="easy-table easy-table-default ">
<thead>
<tr><th>Qty</th>
<th>Part Name and Link</th>
</tr>
</thead>
<tbody>
<tr><td>1</td>
<td><a href="http://www.servocity.com/html/ddt560_direct_drive_tilt.html">Direct drive servo 6 inch cradle tilt (Hitec)</a></td>
</tr>

<tr><td>1</td>
<td><a href="http://www.servocity.com/html/1_4__ball_bearing_quad_pillow_.html">¼ inch ball bearing quad pillow block</a></td>
</tr>

<tr><td>4</td>
<td><a href="http://www.servocity.com/html/0_770__set_screw_hubs.html">¼ inch bore set screw hub</a></td>
</tr>

<tr><td>2</td>
<td><a href="http://www.servocity.com/html/1_4__bore_flat_bearing_mount__.html">¼ inch bore flat bearing mount</a></td>
</tr>

<tr><td>1</td>
<td><a href="http://www.servocity.com/html/1_4__preicision_d-shafting.html">¼ inch x 2.25 inch D-Shaft</a></td>
</tr>

<tr><td>1</td>
<td><a href="http://www.servocity.com/html/1_4__preicision_d-shafting.html">¼ inch x 1.5 inch D-Shaft</a></td>
</tr>

<tr><td>1</td>
<td><a href="http://www.servocity.com/html/3_8__precision_shafting.html">3/8 inch x 4 inch precision shaft</a></td>
</tr>

<tr><td>1</td>
<td><a href="http://www.servocity.com/html/thrust_bearings.html">3/8 inch bore thrust washer</a></td>
</tr>

<tr><td>1</td>
<td><a href="http://www.servocity.com/html/smooth_hub_pulleys.html">2 inch smooth hub pulley</a></td>
</tr>

<tr><td>1</td>
<td><a href="http://www.servocity.com/html/smooth_hub_pulleys.html">1 inch smooth hub pulley</a></td>
</tr>

<tr><td>2</td>
<td><a href="http://www.servocity.com/html/9_00__aluminum_channel__585450.html">9 inch aluminum channel</a></td>
</tr>

<tr><td>1</td>
<td><a href="http://www.servocity.com/html/3_00__aluminum_channel__585442.html">3 inch aluminum channel</a></td>
</tr>

<tr><td>1</td>
<td><a href="http://www.servocity.com/html/90o_hub_to_hub_mount__545400_.html">90 degree hub to hub mount</a></td>
</tr>

<tr><td>1</td>
<td><a href="http://www.servocity.com/html/smooth_belts.html">4.5 inch 1/8 " smooth belt</a></td>
</tr>

<tr><td>1</td>
<td><a href="http://www.servocity.com/html/hs-5645mg_digital_torque.html">Hitec HS-5645MG</a></td>
</tr>

<tr><td>1</td>
<td><a href="http://www.servocity.com/html/hs-645mg_ultra_torque.html">Hitec HS-645MG</a></td>
</tr>

<tr><td>1</td>
<td><a href="http://www.servocity.com/html/hs-5665mh_servo.html">Hitec HS-5665MH</a></td>
</tr>

<tr><td>4</td>
<td><a href="http://www.servocity.com/html/large_square_screw_plate__5854.html">Large square screw plate</a></td>
</tr>

<tr><td>4</td>
<td><a href="http://www.servocity.com/html/0_770__clamping_hubs.html">3/8 inch bore clamping hub</a></td>
</tr>

<tr><td>1</td>
<td><a href="http://www.servocity.com/html/shafting___tubing_spacers.html">3/8 inch spacers</a></td>
</tr>

<tr><td>1</td>
<td><a href="http://www.servocity.com/html/3_8__ball_bearing_quad_pillow_.html">3/8 inch ball bearing quad pillow block</a></td>
</tr>

<tr><td>1</td>
<td><a href="http://www.servocity.com/html/3_8__bore_flat_bearing_mount__.html">3/8 inch bore flat bearing mount</a></td>
</tr>

<tr><td>1</td>
<td><a href="http://www.servocity.com/html/90o_dual_side_mount_b__585508_.html">90 degree dual side mount B</a></td>
</tr>

<tr><td>1</td>
<td><a href="http://www.servocity.com/html/standard_servo_plate_b__575124.html">Standard servo plate B</a></td>
</tr>

<tr><td>1</td>
<td><a href="http://www.servocity.com/html/standard_servo_plate_c__575144.html">Standard servo plate C</a></td>
</tr>

<tr><td>1</td>
<td><a href="http://www.servocity.com/html/round_base_a__585438_.html">Round base A</a></td>
</tr>

<tr><td>1</td>
<td><a href="http://www.servocity.com/html/32_pitch_aluminum_hub_gears__1.html">64T, 32 P, ½ inch bore aluminum gear</a></td>
</tr>

<tr><td>1</td>
<td><a href="http://www.servocity.com/html/32p_hitec_metal_gear.html">32T, 32P metal servo gear (Hitec)</a></td>
</tr>

<tr><td>2</td>
<td><a href="http://www.servocity.com/html/90o_quad_hub_mount_d__545324_.html">90 degree quad hub mount D</a></td>
</tr>

<tr><td>1</td>
<td><a href="http://www.servocity.com/html/24t_set_screw_servo_shaft_coup.html">Servo set screw shaft coupler (Hitec)</a></td>
</tr>

<tr><td></td>
<td>Screws:</td>
</tr>

<tr><td></td>
<td>Screws found here: <a href="https://www.servocity.com/html/black-oxide_socket_head_machin.html">Link</a></td>
</tr>

<tr><td>12</td>
<td>6-32x1/4 inch Socket Head Machine Cap Screw</td>
</tr>

<tr><td>24</td>
<td>6-32x5/16 inch Socket Head Machine Cap Screw</td>
</tr>

<tr><td>16</td>
<td>6-32x3/8 inch Socket Head Machine Cap Screw</td>
</tr>

<tr><td>48</td>
<td>6-32x1/2 inch Socket Head Machine Cap Screw</td>
</tr>
</tbody></table>

The estimated cost including 2 Raspberry Pis and cameras is $500 – $550.

Here are my detailed build photos along with some commentary (click for larger):

# Photos

## Gimbal Base

3 inch channel supporting 3/8 inch shaft and mounted to board. Notice the thrust washer (blue) between the base and horizontal channel.

<position justify="center">
  <progressive-image src="/assets/posts/camera-gimbal-parts/gimbal-01.jpg" width="650px" alt="a" size="large" >
  </progressive-image>
</position>

<position justify="center">
  <progressive-image src="/assets/posts/camera-gimbal-parts/gimbal-02.jpg" width="650px" alt="a" size="large" >
  </progressive-image>
</position>


## Horizontal Channel

Note servo is removed.

<position justify="center">
  <progressive-image src="/assets/posts/camera-gimbal-parts/gimbal-03.jpg" width="650px" alt="a" size="large" >
  </progressive-image>
</position>

## Vertical Channel

<position justify="center">
  <progressive-image src="/assets/posts/camera-gimbal-parts/gimbal-04.jpg" width="650px" alt="a" size="large" >
  </progressive-image>
</position>

4.5 inch belt around 1 and 2 inch hubs. I would recommend using a timing (notched) belt instead of this smooth belt because it slips too much.

<position justify="center">
  <progressive-image src="/assets/posts/camera-gimbal-parts/gimbal-05.jpg" width="650px" alt="a" size="large" >
  </progressive-image>
</position>

## Tilt Mechanism

The tilt mechanism (black) is all from a single kit. Servo City offers a great YouTube video on how to assemble this piece, embedded below.

...youtube

## Complete Without Electronics

<position justify="center">
  <progressive-image src="/assets/posts/camera-gimbal-parts/gimbal-06.jpg" width="650px" alt="a" size="large" >
  </progressive-image>
</position>

## Complete With Electronics

<position justify="center">
  <progressive-image src="/assets/posts/camera-gimbal-parts/gimbal-07.jpg" width="650px" alt="a" size="large" >
  </progressive-image>
</position>