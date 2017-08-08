---
layout: default.html
title: Utilities
description: Use these utilities for quick prototyping.
---

## Utilities

Shoelace provides a number of helpful utility classes that make prototyping easier.

### Text Utilities

Text utilities are classes that can be applied to just about any element. The text inside will be
formatted appropriately.

<table class="table">
  <thead>
    <tr>
      <th>Class</th>
      <th>Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>`text-success`</td>
      <td class="text-success">This is success text</td>
    </tr>
    <tr>
      <td>`text-info`</td>
      <td class="text-info">This is info text</td>
    </tr>
    <tr>
      <td>`text-warning`</td>
      <td class="text-warning">This is warning text</td>
    </tr>
    <tr>
      <td>`text-danger`</td>
      <td class="text-danger">This is danger text</td>
    </tr>
    <tr>
      <td>`text-muted`</td>
      <td class="text-muted">This is muted text</td>
    </tr>
    <tr>
      <td>`text-small`</td>
      <td class="text-small">This is small text</td>
    </tr>
    <tr>
      <td>`text-bold`</td>
      <td class="text-bold">This is bold text</td>
    </tr>
    <tr>
      <td>`text-italic`</td>
      <td class="text-italic">This is italic text</td>
    </tr>
    <tr>
      <td>`text-left`</td>
      <td class="text-left">This is left-aligned text</td>
    </tr>
    <tr>
      <td>`text-center`</td>
      <td class="text-center">This is centered text</td>
    </tr>
    <tr>
      <td>`text-right`</td>
      <td class="text-right">This is right-aligned text</td>
    </tr>
    <tr>
      <td>`text-justify`</td>
      <td class="text-justify">This is justified text</td>
    </tr>
    <tr>
      <td>`text-nowrap`</td>
      <td class="text-nowrap">This is text that won’t wrap</td>
    </tr>
    <tr>
      <td>`text-lowercase`</td>
      <td class="text-lowercase">This is lowercase text</td>
    </tr>
    <tr>
      <td>`text-uppercase`</td>
      <td class="text-uppercase">This is uppercase text</td>
    </tr>
    <tr>
      <td>`text-capitalize`</td>
      <td class="text-capitalize">This is capitalized text</td>
    </tr>
  </tbody>
</table>

### Float Utilities
Float utilities are provided to easily float elements to the left or right. Just apply the `float-left` or `float-right` class to an element to float it left or right.

A clearfix utility is also available to clear floated elements. Just apply the `clearfix` class to the appropriate element.

### Sizing Utilities

Sizing utilities can be used to set a relative width or height on any element. Just apply a `width-*` or `height-*` class and the appropriate element will be sized accordingly. Sizes are available as percentages from 0 – 100 in multiples of five.

```html
<div class="width-25">25%</div>
<div class="width-50">50%</div>
<div class="width-75">75%</div>
<div class="width-100">100%</div>

<div class="height-25">25%</div>
<div class="height-50">50%</div>
<div class="height-75">75%</div>
<div class="height-100">100%</div>
```

<div class="width-sizing-example">
  <div class="width-25">25%</div>
  <div class="width-50">50%</div>
  <div class="width-75">75%</div>
  <div class="width-100">100%</div>
</div>

<div class="height-sizing-example">
  <div class="height-25">25%</div>
  <div class="height-50">50%</div>
  <div class="height-75">75%</div>
  <div class="height-100">100%</div>
</div>

### Spacing Utilities

Spacing utilities can be used to add or remove paddings and margins to any element. Just apply the desired class and the appropriate element will receive the respective padding/margin.

Class names are prefixed with `padding-` or `margin-` for padding and margin, respectively. To apply spacing to all sides of an element, use the following classes:

```
padding-[none|small|medium|big]
margin-[none|small|medium|big]
```

Example:

```html
<div class="padding-none margin-big">
```

To apply spacing to a specific side of an element, use one or more of the following classes:

```
padding-[top|right|bottom|left|x|y]-[none|small|medium|big]
margin-[top|right|bottom|left|x|y]-[none|small|medium|big]
```

Example:

```html
<div class="padding-left-medium margin-bottom-none">
```

You can also use `margin-[x|y|xy]-auto` to set automatic margins horizontally and/or vertically.
