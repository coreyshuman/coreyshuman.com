---
title: Minimizing a WinForms App to Taskbar
description: This is a programming guide on how to minimize a Windows Forms Application to the Taskbar, as well as show Taskbar notifications.
img: /assets/headers/clouds.jpg
alt: my third blog post
published: true
created: 2011-01-16
updated: 2023-11-13
author: 
  name: Corey Shuman
tags: 
  - dotnet
  - visual studio
  - c#
---

_This article was originally posted on Jan 16, 2011 using .NET Framework 4.0 and Visual Studio 2010._

Most programs you interact with daily operate in a window, but sometimes it is more convenient for your program to run in the background. Virus scan software is a perfect example of this. The easiest way to interact with a program running in the background is to add it to the Windows taskbar. In this article we are going to learn how to add an icon to Windows taskbar. I will demonstrate how you can minimize your program to the taskbar, add a context menu strip to the taskbar icon, and even create information bubbles in the taskbar.

Begin by creating a new C# project. Once you've created your project, find the `NotifyIcon` component in the toolbox and drag it onto your main form. `NotifyIcon1` should be added to the bottom of your form design window. Next you will want to select the icon to represent your program in the taskbar. This can be done in the properties window for the `notifyIcon` object. Add an image of your choice as the icon.

<position justify="center">
  <progressive-image src="/assets/posts/winform-hide-to-taskbar/taskbar-01.jpg" alt="a scenic desert" size="large" >
  </progressive-image>
</position>

Next, we want to find the `ContextMenuStrip` component in our toolbox, and drag that onto our form. You will see `contextMenuStrip1` added to the bottom of the design window, and the `ContextMenuStrip` will appear on our form. In this article we are going to add two selections to the context menu: `Restore` and `Close Application`. Go ahead and type those in now.

<position justify="center">
  <progressive-image src="/assets/posts/winform-hide-to-taskbar/taskbar-02.png" alt="a scenic desert" size="large" >
  </progressive-image>
</position>

Now double-click on the word `Restore` that you added to the `ContextMenuStrip`, and an event handler will be added to your main code. Add the following lines of code to this event handler to allow the `Restore` menu selection to restore your program to a visible state:

```cs
private void restoreToolStripMenuItem_Click(object sender, EventArgs e)
{
  Show();
  WindowState = FormWindowState.Normal;
}
```

You can also double-click on `notifyIcon1` and add the same code to allow for double-click restores on the taskbar icon:

```cs
private void notifyIcon1_MouseDoubleClick(object sender, MouseEventArgs e)
{
  Show();
  WindowState = FormWindowState.Normal;
}
```

Next, double-click on the `Close Application` menu choice and add a `Close()` function to the generated event handler:

```cs
private void closeApplicationToolStripMenuItem_Click(object sender, EventArgs e)
{
  Close();
}
```

Now that we have created the events for our context menu, we need to bind it to our `NotifyIcon` in the taskbar. Go to the properties menu for our `notifyIcon1` and look for `ContextMenuStrip` under `Behavior`. In the drop-down menu, you should be able to select the `contextMenuStrip1` that was added to the project.

At this point you should be able to run your application and see the icon you chose in the taskbar. If you right-click on this icon, our context menu should appear. Click on `Close Application` to make sure it functions properly.

Now that we have our taskbar icon, we want to hide our app from the Windows taskbar list of running apps when minimized. Add the following function to your main form code:

```cs
private void Form1_Resize(object sender, EventArgs e)
{
  if (FormWindowState.Minimized == WindowState)
  {
    Hide();
  }
}
```

You need to link this function as the event handle for a resize event. Add the following code to the `InitializeComponent()` function within the file `Form1.Designer.cs`:

```cs
this.Resize += new System.EventHandler(this.Form1_Resize);
```

Now any time a minimize resize event occurs, the program will be put into a hidden state. Only the taskbar icon will be visible. The program can be restored by right-clicking the icon and selecting `Restore`.

<position justify="center">
  <progressive-image src="/assets/posts/winform-hide-to-taskbar/taskbar-03.png" alt="a scenic desert" size="large" >
  </progressive-image>
</position>

Finally, let's discover how to add use a notification bubble with our taskbar icon.

Add a button to your form and double-click to add the event handler for the button. Add the following code you your button event handler function:

```cs
private void button1_Click(object sender, EventArgs e)
{
  notifyIcon1.BalloonTipTitle = "Title";
  notifyIcon1.BalloonTipText = "Notification Bubble Content.";
  notifyIcon1.ShowBalloonTip(5000);
}
```

As you can see above, `notifyIcon1` has two properties and a function we can call. `BalloonTipTitle` will be the string used as the title for our notification ballon. `BalloonTipText` will be the string written as the content for the bubble. Finally, `ShowBalloonTip(int timeout)` will be the length of time in milleseconds to display the ballon tip. Any time you press the button on the main form, the balloon tip will display for 5 seconds.

<position justify="center">
  <progressive-image src="/assets/posts/winform-hide-to-taskbar/taskbar-04.png" alt="a scenic desert" size="large" >
  </progressive-image>
</position>

There you have it, now you have a basic understanding of taskbar and balloon tip utilization. From here you can experiment with other functions available in the `notifyIcon` object, including adding an icon to the bubble tip, and adding event handlers for when the user clicks inside the bubble tip.
