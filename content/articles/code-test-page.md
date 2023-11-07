---
title: Code Highlight Test Page
description: This is a test page to validate code highlighting and theme colors.
img: https://images.unsplash.com/photo-1588512285341-c481fb6de19d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1406&q=80
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

```csharp[print-explanation.code]
using System;
using System.ComponentModel;

//test
namespace Application.Services
{
    abstract class ControllerServiceBase : IService
    {
        /// <summary>
        /// Freqency in Hz that the task will run. Valid values 1 - 1000;
        /// <param name="applicationData"></param>
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
