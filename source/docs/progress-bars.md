---
layout: default.html
title: Progress Bars
description: These progress bars are easy to create and render consistently in all browsers.
---

## Progress Bars

HTML5 introduced the `<progress>` element, but it’s not currently possible to style consistently in all browsers. As a result, Shoelace offers a custom alternative.

Create a progress bar with the following markup. Use the `progress-small` and `progress-big` modifiers to change the size. To set the state, use a [sizing utility](utilities.html#sizing-utilities) or set the width explicitly on the `progress-bar` element.

An optional text label can be included inside the `progress-bar` element.

```html
<div class="progress progress-small">
  <div class="progress-bar width-25">25%</div>
</div>

<div class="progress">
  <div class="progress-bar width-50">50%</div>
</div>

<div class="progress progress-big">
  <div class="progress-bar width-75">75%</div>
</div>
```

<div class="progress progress-small">
  <div class="progress-bar width-25">25%</div>
</div>

<div class="progress">
  <div class="progress-bar width-50">50%</div>
</div>

<div class="progress progress-big">
  <div class="progress-bar width-75">75%</div>
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
<div class="progress">
  <div class="progress-bar width-50">50%</div>
</div>

<div class="progress progress-secondary">
  <div class="progress-bar width-50">50%</div>
</div>

<div class="progress progress-success">
  <div class="progress-bar width-50">50%</div>
</div>

<div class="progress progress-info">
  <div class="progress-bar width-50">50%</div>
</div>

<div class="progress progress-warning">
  <div class="progress-bar width-50">50%</div>
</div>

<div class="progress progress-danger">
  <div class="progress-bar width-50">50%</div>
</div>

<div class="progress progress-light">
  <div class="progress-bar width-50">50%</div>
</div>

<div class="progress progress-dark">
  <div class="progress-bar width-50">50%</div>
</div>
```

<div class="progress">
  <div class="progress-bar width-50">50%</div>
</div>

<div class="progress progress-secondary">
  <div class="progress-bar width-50">50%</div>
</div>

<div class="progress progress-success">
  <div class="progress-bar width-50">50%</div>
</div>

<div class="progress progress-info">
  <div class="progress-bar width-50">50%</div>
</div>

<div class="progress progress-warning">
  <div class="progress-bar width-50">50%</div>
</div>

<div class="progress progress-danger">
  <div class="progress-bar width-50">50%</div>
</div>

<div class="progress progress-light">
  <div class="progress-bar width-50">50%</div>
</div>

<div class="progress progress-dark">
  <div class="progress-bar width-50">50%</div>
</div>
