---
layout: default.html
title: Progress Bars
description: These progress bars are easy to create and render consistently in all browsers.
---

## Progress Bars

HTML5 introduced the `<progress>` element, but it’s not currently possible to style consistently in all browsers. As a result, Shoelace offers a custom alternative.

Create a progress bar with the following markup. Use the `progress-[xs|sm|lg|xl]` modifiers to change the size. To set the state, use a [sizing utility](utilities.html#sizing-utilities) or set the width explicitly on the `progress-bar` element.

An optional text label can be included inside the `progress-bar` element.

```html
<div class="progress progress-xs">
  <div class="progress-bar w-20">20%</div>
</div>

<div class="progress progress-sm">
  <div class="progress-bar w-40">40%</div>
</div>

<div class="progress">
  <div class="progress-bar w-60">60%</div>
</div>

<div class="progress progress-lg">
  <div class="progress-bar w-70">80%</div>
</div>

<div class="progress progress-xl">
  <div class="progress-bar w-100">100%</div>
</div>
```

<div class="progress progress-xs">
  <div class="progress-bar w-20">20%</div>
</div>

<div class="progress progress-sm">
  <div class="progress-bar w-40">40%</div>
</div>

<div class="progress">
  <div class="progress-bar w-60">60%</div>
</div>

<div class="progress progress-lg">
  <div class="progress-bar w-70">80%</div>
</div>

<div class="progress progress-xl">
  <div class="progress-bar w-100">100%</div>
</div>

When progress can’t be determined, use the `progress-indeterminate` modifier to set an indeterminate state.

```html
<div class="progress progress-indeterminate">
  <div class="progress-bar"></div>
</div>
```

<div class="progress progress-indeterminate">
  <div class="progress-bar"></div>
</div>

### Variations

Use the `progress-*` modifier to create variations.

```html
<div class="progress progress-secondary">
  <div class="progress-bar w-50">50%</div>
</div>

<div class="progress progress-success">
  <div class="progress-bar w-50">50%</div>
</div>

<div class="progress progress-info">
  <div class="progress-bar w-50">50%</div>
</div>

<div class="progress progress-warning">
  <div class="progress-bar w-50">50%</div>
</div>

<div class="progress progress-danger">
  <div class="progress-bar w-50">50%</div>
</div>

<div class="progress progress-light">
  <div class="progress-bar w-50">50%</div>
</div>

<div class="progress progress-dark">
  <div class="progress-bar w-50">50%</div>
</div>
```

<div class="progress progress-secondary">
  <div class="progress-bar w-50">50%</div>
</div>

<div class="progress progress-success">
  <div class="progress-bar w-50">50%</div>
</div>

<div class="progress progress-info">
  <div class="progress-bar w-50">50%</div>
</div>

<div class="progress progress-warning">
  <div class="progress-bar w-50">50%</div>
</div>

<div class="progress progress-danger">
  <div class="progress-bar w-50">50%</div>
</div>

<div class="progress progress-light">
  <div class="progress-bar w-50">50%</div>
</div>

<div class="progress progress-dark">
  <div class="progress-bar w-50">50%</div>
</div>
