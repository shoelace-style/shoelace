---
layout: default.html
title: Utilities
description: Use these utilities for quick prototyping.
---

## Utilities

Shoelace provides a number of helpful utilities that make designing and prototyping easier.

### Background Utilities

Background utilities can be applied to change an element’s background color.

```html
<div class="bg-primary">Primary</div>
<div class="bg-secondary">Secondary</div>
<div class="bg-success">Success</div>
<div class="bg-info">Info</div>
<div class="bg-warning">Warning</div>
<div class="bg-danger">Danger</div>
<div class="bg-light">Light</div>
<div class="bg-dark">Dark</div>
```

<div class="mar-b-sm pad-sm bg-primary text-light">Primary</div>
<div class="mar-b-sm pad-sm bg-secondary text-light">Secondary</div>
<div class="mar-b-sm pad-sm bg-success text-light">Success</div>
<div class="mar-b-sm pad-sm bg-info text-light">Info</div>
<div class="mar-b-sm pad-sm bg-warning text-light">Warning</div>
<div class="mar-b-sm pad-sm bg-danger text-light">Danger</div>
<div class="mar-b-sm pad-sm bg-light text-dark">Light</div>
<div class="mar-b-sm pad-sm bg-dark text-light">Dark</div>

### Breakpoint Utilities

Responsive breakpoints exist for five tiers of screen sizes. By default, the breakpoints are:

- `xs` &rarr; 575px and below
- `sm` &rarr; 576px – 767px
- `md` &rarr; 768px – 991px
- `lg` &rarr; 992px - 1199px
- `xl` &rarr; 1200px and above

If you’re building Shoelace from source, you can use the custom media queries found in [`source/css/variables.css`](../source/css/variables.css) to easily target various breakpoints without hard-coding screen sizes in your stylesheet.

```css
@media (--breakpoint-xs-up) { /* xs screens and above */ }
@media (--breakpoint-sm-up) { /* sm screens and above */ }
@media (--breakpoint-md-up) { /* md screens and above */ }
@media (--breakpoint-lg-up) { /* lg screens and above */ }
@media (--breakpoint-xl-up) { /* xl screens and above */ }

@media (--breakpoint-xs-down) { /* xs screens and below */ }
@media (--breakpoint-sm-down) { /* sm screens and below */ }
@media (--breakpoint-md-down) { /* md screens and below */ }
@media (--breakpoint-lg-down) { /* lg screens and below */ }
@media (--breakpoint-xl-down) { /* xl screens and below */ }

@media (--breakpoint-xs-only) { /* xs screens only */ }
@media (--breakpoint-sm-only) { /* sm screens only */ }
@media (--breakpoint-md-only) { /* md screens only */ }
@media (--breakpoint-lg-only) { /* lg screens only */ }
@media (--breakpoint-xl-only) { /* xl screens only */ }
```

### Display Utilities

Display utilities let you hide elements based on the current breakpoint. Use `hide-[xs|sm|md|lg|xl]` to hide an element only at a specific viewport. Use `hide-*-up` to hide an element at and above a specific breakpoint. Use `hide-*-down` to hide an element at and below a specific breakpoint.

```html
<div class="row">
  <div class="col-2 hide-xs">hide-xs</div>
  <div class="col-2 hide-sm">hide-sm</div>
  <div class="col-2 hide-md">hide-md</div>
  <div class="col-2 hide-lg">hide-lg</div>
  <div class="col-2 hide-xl">hide-xl</div>
</div>
```

<div class="container grid-example">
  <div class="row">
    <div class="col-2 hide-xs">hide-xs</div>
    <div class="col-2 hide-sm">hide-sm</div>
    <div class="col-2 hide-md">hide-md</div>
    <div class="col-2 hide-lg">hide-lg</div>
    <div class="col-2 hide-xl">hide-xl</div>
  </div>
</div>

### Float Utilities

Float utilities are provided to easily float elements to the left or right. Just apply the `float-left` or `float-right` class to an element to float it left or right.

A clearfix utility is also available to clear floated elements. Just apply the `clearfix` class to the appropriate element.

### Sizing Utilities

Sizing utilities can be used to set a relative width or height on any element. Just apply a `w-*` or `h-*` class and the appropriate element will be sized accordingly. Sizes are available as percentages from 0 – 100 in multiples of five.

You can also use the `w-max-100` and `h-max-100` classes to set a max width and height of 100%.

```html
<div class="w-25">25%</div>
<div class="w-50">50%</div>
<div class="w-75">75%</div>
<div class="w-100">100%</div>

<div class="h-25">25%</div>
<div class="h-50">50%</div>
<div class="h-75">75%</div>
<div class="h-100">100%</div>
```

<div class="width-sizing-example">
  <div class="w-25">25%</div>
  <div class="w-50">50%</div>
  <div class="w-75">75%</div>
  <div class="w-100">100%</div>
</div>

<div class="height-sizing-example">
  <div class="h-25">25%</div>
  <div class="h-50">50%</div>
  <div class="h-75">75%</div>
  <div class="h-100">100%</div>
</div>

### Spacing Utilities

Spacing utilities can be used to add or remove paddings and margins to any element. Just apply the desired class and the appropriate element will receive the respective padding/margin.

Class names are prefixed with `pad-` or `mar-` for padding and margin, respectively. To apply spacing to all sides of an element, use the following classes.

```
pad-[0|xs|sm|md|lg|xl]
mar-[0|xs|sm|md|lg|xl]
```

Example:

```html
<div class="pad-0 mar-xl">
```

To apply spacing to a specific side of an element, use one or more of the following classes indicating top, right, bottom, left, x (horizontal), and y (vertical):

```
pad-[t|r|b|l|x|y]-[0|xs|sm|md|lg|xl]
mar-[t|r|b|l|x|y]-[0|xs|sm|md|lg|xl]
```

Example:

```html
<div class="pad-l-md mar-b-0">
```

You can also use `mar-[x|y|xy]-auto` to set automatic margins horizontally and/or vertically.

### Text Utilities

Text utility classes can be applied to change the appearance of text.

<table class="table">
  <thead>
    <tr>
      <th>Class</th>
      <th>Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>`text-primary`</td>
      <td class="text-primary">This is primary text</td>
    </tr>
    <tr>
      <td>`text-secondary`</td>
      <td class="text-secondary">This is secondary text</td>
    </tr>
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
      <td>`text-light`</td>
      <td class="text-light">This is light text</td>
    </tr>
    <tr>
      <td>`text-dark`</td>
      <td class="text-dark">This is dark text</td>
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
      <td>`text-muted`</td>
      <td class="text-muted">This is muted text</td>
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
