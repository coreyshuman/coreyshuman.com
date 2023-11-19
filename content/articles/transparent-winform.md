---
title: Achieving True Transparency in Windows Forms
description: WinForm components set to "transparent" only inherit the color of their parent by default, but it is possible to achieve true transparency with a few lines of code.
img: /assets/headers/moon.jpg
alt: my third blog post
published: true
created: 2011-01-06
updated: 2023-11-13
author: 
  name: Corey Shuman
tags: 
  - dotnet
  - visual studio
  - c#
---

_This article was originally posted on Jan 6, 2011 using .NET Framework 4.0 and Visual Studio 2010._

Windows Forms components don't support true transparency out of the box. When you set a control to have a transparent background, really all you're doing is telling it to take on the background color of the control underneath it, as in these example pictures:

<position justify="center">
  <progressive-image src="/assets/posts/transparent-winform/transparent-01.png" alt="a scenic desert" size="large" radius="7px" >
  </progressive-image>
</position>

In this picure, I have two panels with their `BackColor` set to `ActiveCaption`, and the label's `BackColor` set to `Transparent`. The label is a child of the form, not the panel, so it takes on the form's `BackColor`, which is set to `Control`.

<position justify="center">
  <progressive-image src="/assets/posts/transparent-winform/transparent-02.png" alt="a scenic desert" size="large" radius="7px" >
  </progressive-image>
</position>

In this picture, one of the panels has been moved to overlap the other panel. This panel's `BackColor` property has been changed to `Transparent`. I also gave it a border so you could see exactly where it was. Since it is also a child of the form, it has taken in the form's `BackColor` as well. This is made more apparent when we set an image as the background of the form:

<position justify="center">
  <progressive-image src="/assets/posts/transparent-winform/transparent-03.png" alt="a scenic desert" size="large" radius="7px" >
  </progressive-image>
</position>

You'll see that the form, for the most part, "properly" applies its background image to the "transparent" label and panel, but since it's not true transparency, the portions overlapping the colored panel still show the background of the form instead of the panel.

There are ways to get around this though. By default, Windows Forms controls have the `WX_EX_TRANSPARENT` flag turned off, but this can be fixed by inheriting the control into a new class and overriding its `CreateParams` property, like this:

```cs
protected override CreateParams CreateParams
{
  get
  {
    CreateParams cp = base.CreateParams;
    cp.ExStyle |= 0x00000020; //WS_EX_TRANSPARENT
    return cp;
  }
}
```

That now gives us the ability to have true transparency in our control. In this example I'll go over panels and labels, but you could apply this to other form controls as well.

We'll start with a panel. Let's say that you don't just want full transparency, you also want to be able to control the opacity like you can with a regular Windows Form. To do that we'll need to add some properties to our inherited panel, namely a private `opacity` property, only for use within the class, and a public `Opacity` property for setting the opacity in the Designer.

```cs
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

This property definition has a handful of decorators applied to it:
`Description()` sets the description of the property in the Designer.
`DefaultValue()` sets the default value of the property.
`Category()` sets the category that the property will appear under in the Designer` 
`Browsable()`sets whether or not the property should be displayed in the Properties box.`TypeConverter()` offers an easy way to convert the double value into a proper 0-100% value for the Designer.

What this method does is return the value of the private opacity property if you're getting the value, and sets the private opacity property if you're setting it. It also runs the method `InvalidateEx()` when you set, which I will define here:

```cs
private void InvalidateEx()
{
  if (Parent == null) { return; }

  Rectangle rc = new Rectangle(this.Location, this.Size);
  Parent.Invalidate(rc, true);
}
```

This checks to see if the control is a child of another control, and if it is, it invalidates the parent control at the bounding box of the child control, causing it to be redrawn. If there is no parent it simply returns.

We also need to set a few other styles in the constructor. Create a constructor above all of the other code you've entered so far, so that it's the first method you've got (just for organization). Enter this code:

```cs
public PanelEx()
{
  this.SetStyle(ControlStyles.ResizeRedraw, true);
  this.SetStyle(
    ControlStyles.Opaque | ControlStyles.OptimizedDoubleBuffer | ControlStyles.DoubleBuffer,
    false
  );
}
```

Where I've put `PanelEx`, replace it with the name of your inherited Panel class. These styles will tell the panel that it needs to be repainted when it's resized, and that it is not opaque, nor should it use any form of double buffering (since the buffer uses an opaque background).

Finally, we need to override the panel's `OnPaintBackground` and `OnPaint` events, so that we can manage those ourselves:

```cs
protected override void OnPaintBackground(PaintEventArgs e)
{
  // do nothing
}

protected override void OnPaint(PaintEventArgs e)
{
  Color c = Color.FromArgb((int)(Opacity * 255), this.BackColor);
  e.Graphics.FillRectangle(new SolidBrush(c), this.ClientRectangle);
  base.OnPaint(e);
}
```

We don't want to draw a background at all, so we override `OnPaintBackground` to do nothing. We want to do all our drawing in `OnPaint`. You'll see that it's very simple; all I've done is create a new `Color` object using `Color.FromArgb()`. I've used the value of `Opacity` (which is a double from 0 - 1, so it needs to be converted to 0 - 255 to work as an alpha value), and the panel's current `BackColor` to generate a new color with real transparency. I then fill the `ClientRectangle` with that color using the `PaintEventArgs`'s `Graphics` object, and I call `base.OnPaint()`, which does the rest of the processing. You can see the result here:

<position justify="center">
  <progressive-image src="/assets/posts/transparent-winform/transparent-04.png" alt="a scenic desert" size="large" radius="7px" >
  </progressive-image>
</position>

Note that I've only done the panel so far, not the label. The panel's `Opacity` has been set to `50%`, and its `BackColor` set to `Black`. You can see that it's rendering properly and the portion that overlaps the colored panel is correctly showing the panel through. Now let's move on to the label, which is simpler since we don't need to add custom opacity.

First, inherit a `Label` into a new class, just like you did with the panel. Override `CreateParams` with the same code, add the same overrides for `OnPaintBackground`, and add the `SetStyle()` code in a constructor. Notice we don't need to override `OnPaint()` since we are not adding a custom opacity property. The code should look like this:

```cs
public partial class TransparentLabel : Label {
  public TransparentLabel()
  {
    this.SetStyle(ControlStyles.ResizeRedraw, true);
    this.SetStyle(
      ControlStyles.Opaque | ControlStyles.OptimizedDoubleBuffer | ControlStyles.DoubleBuffer,
      false
    );
  }

  protected override CreateParams CreateParams
  {
    get
    {
      CreateParams cp = base.CreateParams;
      cp.ExStyle |= 0x00000020; //WS_EX_TRANSPARENT
      return cp;
    }
  }

  protected override void OnPaintBackground(PaintEventArgs e)
  {
    // do nothing
  }
}
```

Finally, here is a picture with the properly transparent panel and labels:

<position justify="center">
  <progressive-image src="/assets/posts/transparent-winform/transparent-05.png" alt="a scenic desert" size="large" radius="7px" >
  </progressive-image>
</position>

After adding the custom components, you should be able to open your toolbox in the Designer and see your inherited Panel and Label controls.
