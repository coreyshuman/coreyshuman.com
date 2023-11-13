---
title: Code Highlight Test Page
description: This is a test page to validate code highlighting and theme colors.
img: /assets/headers/car.png
alt: Hello i'm article 9
created: 2021-01-01
updated: 2021-01-02
published: false
author: 
  name: Corey Shuman
tags: 
  - web development
projects:
  - tower900-usb
---

# Code Highlighting Tests

Look at these great language examples :tada:

## This section will print the texmate scope explanations

```cs[print-explanation.code]
private double opacity;

[Description("Opacity of the control"),
DefaultValue(1),
Category("Appearance"),
Browsable(true),
TypeConverter(typeof(OpacityConverter))]
public double Opacity
{
    get { return opacity; }
    set
    {
        opacity = value;
        InvalidateEx();
    }
}

```

## C#

```csharp[csharp.cs]
using System;
using System.ComponentModel;
using System.Threading;
using Application.Models;

namespace Application.Services
{
    abstract class ControllerServiceBase : IService
    {
        /// <summary>
        /// Freqency in Hz that the task will run. Valid values 1 - 1000;
        /// </summary>
        public int TaskFrequency
        {
            get
            {
                return frequency;
            }
            set
            {
                frequency = value > 1000 ? 1000 : value;
                if (frequency < 1) frequency = 1;

                period = (int)Math.Round(1000 / (decimal)frequency);
            }
        }

        private int frequency = 2;
        private int period = 500;
        private UserSettings userSettings = null;
        private UsbApp usbApplication = null;
        private HardwareManager hardwareManager = null;
        private BackgroundWorker serviceThread;
        private int controllerIdx = 0;

        public void BeginService(UserSettings us, UsbApp ap, HardwareManager hw)
        {
            userSettings = us;
            usbApplication = ap;
            hardwareManager = hw;
            serviceThread = new BackgroundWorker();
            serviceThread.WorkerReportsProgress = false;
            serviceThread.DoWork += new DoWorkEventHandler(ServiceThread_DoWork);
            serviceThread.RunWorkerAsync();
        }

        public void CloseService()
        {
            serviceThread.CancelAsync();
        }

        private void ServiceThread_DoWork(object sender, DoWorkEventArgs e)
        {
            while (true)
            {
                try
                {
                    var controllerContext = GetNextControllerContext();
                    if (controllerContext == null) throw new Exception("Failed to find next controller context.");
                    ServiceTask(controllerContext.Item1, controllerContext.Item2, controllerContext.Item3);
                }
                catch (Exception ex)
                {
                    Trace.TraceError($"ServiceThread Error: {ex.ToString()}");
                }
                Thread.Sleep(period);
            }
        }

        /// <summary>
        /// Override this function and do your service tasks here.
        /// </summary>
        /// <param name="applicationData"></param>
        /// <param name="controllerSettings"></param>
        public abstract void ServiceTask(ApplicationData applicationData, ControllerSettings controllerSettings);

        public Tuple<ApplicationData, ControllerSettings> GetNextControllerContext()
        {
            try
            {
                if (++controllerIdx >= usbApplication.DeviceCount)
                {
                    controllerIdx = 0;
                }

                var usbDevice = usbApplication.GetDevice(controllerIdx);
                var appData = usbDevice?.AppData;
                if (appData == null)
                {
                    return null;
                }
                var controllerSettings = userSettings.GetControllerByAddress(appData.DeviceControllerData.DeviceAddress);
                if (controllerSettings == null)
                {
                    return null;
                }

                return new Tuple<ApplicationData, ControllerSettings>(appData, controllerSettings);
            }
            catch(Exception ex)
            {
                Trace.TraceError("Couldn't locate next controller: " + ex.Message);
                return null;
            }
        }
    }
}
```

## TypeScript

```ts[typescript.ts]
import { IDriver } from '../Interfaces/Interfaces';

// create a canvas with a chart
export default class Chart {
  static readonly ChartColor = '#fe9440';
  private canvas: Canvas;
  public value: number;

  constructor(driver: IDriver) {
    this.canvas = document.createElement('canvas');
    this.canvas.color = Chart.ChartColor; // pseudo-code
  }

  get canvas(): Canvas {
    return this.canvas;
  }

  public draw(id: string): void {
    document.getElementById(id).appendChild(this.canvas);
  }

  static calculateRange(value: number): Array<number> | null {
    const min: number = 1;
    if(value >= 10) {
      return new Array(min, value);
    } else if(value > min) {
      return [0, min];
    }

    return null;
  }
}

```

## JavaScript

```js[javascript.js]
const btn = document.getElementById('btn');
let count = 0;

function render() {
  btn.innerText = `Count ${count}`;
}

btn.addEventListener('click', () => {
  // Count from 1 to 10.
  if (count < 10) {
    count += 1;
  }
  render();
});
```

## HTML

```html[html.html]
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Home Page</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>Animated Border Using <em>::before</em> and <span class="">Clip Path</span></h1>
  <p>
    <a href="/home">Rounded Edges</a>
  </p>
  <div id="container">
    <svg width="0" height="0">
      <defs>
        <clipPath id="clipped" clipPathUnits="objectBoundingBox">
          <rect x="0" y="0" width="1" height=".01"/>
          <path d="M0,0 L0,0.06  Q0,0,0.04,0 Z" stroke-width="2"></path>
        </clipPath>
      </defs>
    </svg>
  </div>
  <script src="scripts.js"></script>
</body>
</html>
```

## CSS

```css[css.css]
/* global body color */
body {
    background-color: #222;
    color: white;
}

#container {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
}

#container .card {
    width: calc(33vw - 75px);
    height: 20vh;
    border-radius: 8px;
    margin: 10px;
    padding: 20px;
}

.card4::before {
    --border-width: 2px;
    --windowposition-width: calc(100% - 2 * var(--border-width));
    --windowposition-height: calc(100% - 4px);
    position: absolute;
    content: "";
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    margin: -2px;
    border-radius: inherit;
    border: 2px solid #eee3;
    background: radial-gradient(300px circle at var(--x) var(--y), #3f3 0, transparent 100%) border-box;
    clip-path: polygon(
        0% 0%,
        0% 100%,
        var(--border-width) 100%,
        var(--border-width) var(--border-width),
        calc(var(--border-width) + calc(100% - 2 * var(--border-width))) var(--border-width),
        calc(var(--border-width) + calc(100% - 2 * var(--border-width))) calc(var(--border-width) + calc(100% - 2 * var(--border-width))),
        var(--border-width) calc(var(--border-width) + calc(100% - 2 * var(--border-width))),
        var(--border-width) 100%,
        100% 100%,
        100% 0%
    );
    clip-path: url(#clipped)
}

```

## C

```c[c.c]
#include "GenericTypeDefs.h"
#include "./HardwareProfile/HardwareProfile.h"
#include <stdlib.h>

// support 12 x 5 leds for chaining led strips
#define NUM_LED_STRIPS_SUPPORTED 5

static BYTE LedBufferA[DEVICECOUNT][DEVICESIZEBYTES];
BYTE *LedDrawBuffer = (BYTE*)&LedBufferA;
BOOL LedBusy = FALSE;
static DWORD bitIndex = 0x100;
static DWORD shiftAmount = 8;
static BYTE ledStripLoop = NUM_LED_STRIPS_SUPPORTED;

void LightingInit(void)
{
    T1CON = 0x0; // Stop the timer and clear the control register,
    // prescaler at 1:1,internal clock source
    TMR1 = 0x0; // Clear the timer register
    PR1 = INNERBITDELAY; // Load the period register
    IPC1bits.T1IP = 7;
    IPC1bits.T1IS = 3;
    // Can be done in a single operation by assigning PC2SET = 0x0000000D
    IFS0CLR = _IFS0_T1IF_MASK; // Clear the timer interrupt status flag
    IEC0SET = _IEC0_T1IE_MASK; // Enable timer interrupts
}

void SwapBuffer(void)
{
    if(LedDrawBuffer == (BYTE*)LedBufferA)
    {
        LedDrawBuffer = (BYTE*)LedBufferB;
        LedWriteBuffer = (BYTE*)LedBufferA;
    }
    else
    {
        LedDrawBuffer = (BYTE*)LedBufferA;
        LedWriteBuffer = (BYTE*)LedBufferB;
    }
}

// Use DWord Ptr for improved performance
void ClearLedsForDevice(BYTE devIndex)
{
    int i = 0;
    DWORD *ledWrite = (DWORD*)(LedWriteBuffer + (devIndex * DEVICESIZEBYTES));
    for(i=0; i<DEVICESIZEBYTES / sizeof(DWORD); i++)
    {
        *ledWrite++ = 0x00000000;
    }
}

void SetDeviceLedColorDW(BYTE devIndex, BYTE ledIndex, DWORD color)
{
    WORD offset = devIndex*DEVICESIZEBYTES + ledIndex * LEDSIZE;
    BYTE * ledWrite = LedWriteBuffer + offset;
    *ledWrite++ = color & 0xFF;
    *ledWrite++ = color >> 8 & 0xFF;
    *ledWrite++ = color >> 16 & 0xFF;
}

void __ISR(_TIMER_1_VECTOR, IPL7SOFT) Timer1Handler(void)
{
    INTDisableInterrupts();

    // Time-critical protocol clocked to WS2812B LED data lines
    // Timed for 48 MHz instruction clock
    asm volatile (
        "LW $t5, LedDrawBuffer \n"
        "LA $t0, shiftAmount \n"
        "LW $t7, shiftAmount \n"
        "ADDI $t7, $t7, -1 \n"      // decrement shiftAmount
        "SW $t7, 0($t0) \n"         // save shiftAmount
        "LW $t0, byteIndex \n"
        "ADD $t5, $t5, $t0 \n"      // byte offset
        "LB $t0, 0($t5) \n"         // load data 1
        "LB $t1, 36($t5) \n"        // load data 2
        "LB $t2, 72($t5) \n"        // load data 3
        "LB $t3, 108($t5) \n"       // load data 4
        "LB $t4, 144($t5) \n"       // load data 5
        "LA $t6, LATCCLR \n"
        "LI $t5, 0x0384 \n"         // bit mask for LATC outputs
        "LI $v0, 0x0000 \n"
        "LI $v1, 0x0100 \n"         // bit mask for LATB output

        // Start data bit, set outputs 1,2,4,5 high
        // LATC Clock 0
        "SW $t5, 0($t6) \n"         // set LATC output high

        "LA $t8, LATBCLR \n"

        // output 1, read bit
        "SRLV $t6, $t0, $t7 \n"     // shift bit to [0]
        "ANDI $t6, $t6, 0x1 \n"     // mask bit [0]
        "SLL $t6, $t6, 0x09 \n"     // shift bit to rc[9] location
        "OR $v0, $v0, $t6 \n"       // OR into v0

        // Start data bit, set output 3 high
        // LATB Clock 0
        "SW $v1, 0($t8) \n"         // set LATB output high

        // output 2, read bit
        "SRLV $t6, $t1, $t7 \n"     // shift bit to [0]
        "ANDI $t6, $t6, 0x1 \n"     // mask bit [0]
        "SLL $t6, $t6, 0x02 \n"     // shift bit to rc[2] location
        "OR $v0, $v0, $t6 \n"       // OR into v0
        // output 4, read bit
        "SRLV $t6, $t3, $t7 \n"     // shift bit to [0]
        "ANDI $t6, $t6, 0x1 \n"     // mask bit [0]
        "SLL $t6, $t6, 0x07 \n"     // shift bit to rc[7] location
        "OR $v0, $v0, $t6 \n"       // OR into v0
        // output 5, read bit
        "SRLV $t6, $t4, $t7 \n"     // shift bit to [0]
        "ANDI $t6, $t6, 0x1 \n"     // mask bit [0]
        "SLL $t6, $t6, 0x08 \n"     // shift bit to rc[8] location
        "OR $v0, $v0, $t6 \n"       // OR into v0

        // update data bit hi/lo status for output 1,2,4,5
        "XOR $v0, $v0, $t5 \n"      // xor to invert bit status
        "LA $t1, LATCSET \n"
         // LATC Clock 21 = 0.437us
        "SW $v0, 0($t1) \n"

        // output 3, read bit
        "SRLV $t6, $t2, $t7 \n"     // shift bit to [0]
        "ANDI $t6, $t6, 0x1 \n"     // mask bit [0]
        "SLL $v0, $t6, 0x08 \n"     // shift bit to rb[8] location

        // update data bit hi/lo status for output 3
        "XOR $v0, $v0, $v1 \n"      // xor to invert bit status
        "LA $t1, LATBSET \n"
        // LATB Clock 21 = 0.437us
        "SW $v0, 0($t1) \n"

        // end data bit, set low for output 1,2,4,5
        "LA $t1, LATCSET \n"
        "NOP \n"
        "NOP \n"
        // LATC Clock 33 = 0.688us
        "SW $t5, 0($t1) \n"         // set all outputs low
        "NOP \n"
        // end data bit, set low for output 3
        "LA $t1, LATBSET \n"
        // LATB Clock 33 = 0.688us
        "SW $v1, 0($t1) \n"

        // 0.688us of 1.25us elapsed
        // Interrupt should refire in 0.56us to 0.86us
    );

    // update index, shift amount, and led strip count
    // This workload time is variable, but stays within WS2182B spec
    if(shiftAmount == 0) {
        shiftAmount = 8;
        if(++ byteIndex == 36) {
            byteIndex = 0;
            if(-- ledStripLoop == 0) {
                // data complete, turn off timer
                T1CONbits.TON = 0;
                LedBusy = FALSE;
                ledStripLoop = NUM_LED_STRIPS_SUPPORTED;
            }
        }
    }

    TMR1 = 0x0;
    IFS0CLR = _IFS0_T1IF_MASK; // Clear the timer interrupt status flag
    INTEnableInterrupts();
}
```

## XML

```xml[xml.xml]
<?xml version="1.0" encoding="utf-8"?>
<UserSettings xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <Controllers>
    <f:ControllerSettings Address="4">
      <Name>Fans</Name>
      <AlertOnDisconnect>true</AlertOnDisconnect>
      <Devices>
        <DeviceSettings Index="0">
          <Name>Fan 1</Name>
          <text><![CDATA[Hello World!]]></text>
          <Sensor />
          <SensorType>Temperature</SensorType>
          <IdentifierList>
            <string />
          </IdentifierList>
          <CalculationMethod>Max</CalculationMethod>
          <FanCurveValues>
            <int>30</int>
            <int>100</int>
          </FanCurveValues>
          <UseFanCurve>false</UseFanCurve>
          <AlertOnFanStopped>false</AlertOnFanStopped>
          <IncreaseStep>5</IncreaseStep>
          <DecreaseStep>3</DecreaseStep>
          <IncreaseHysteresis>3</IncreaseHysteresis>
          <DecreaseHysteresis>5</DecreaseHysteresis>
        </DeviceSettings>
      </Devices>
    </f:ControllerSettings>
  </Controllers>
  <UserProfiles>
    <UserProfile Index="0">
      <ProfileColor Red="213" Green="170" Blue="0" />
      <Controllers>
        <UserProfileController Address="0">
          <Devices>
            <UserProfileDevice Index="0">
              <LightingMode>Rotate</LightingMode>
              <LightingSpeed>10</LightingSpeed>
              <LightColors Red="53" Green="19" Blue="0" />
              <!--
              <LightColors Red="53" Green="19" Blue="0" />
              -->
            </UserProfileDevice>
          </Devices>
        </UserProfileController>
      </Controllers>
    </UserProfile>
  </UserProfiles>
  <ComputerName>MyComputer</ComputerName>
  <SoftwareVersion>1.3.20.0</SoftwareVersion>
  <LatestFirmwareVersion>1.28</LatestFirmwareVersion>
</UserSettings>
```
