---
layout: default.html
title: Loaders
description: These pure CSS loaders are easy to use and look great.
---

## Loaders

Create a pure CSS loader by applying the `loader` class to an empty `<span>` element. You can use the `loader-xs|sm|lg|xl` modifiers to change the size.

```html
<span class="loader loader-xs"></span>
<span class="loader loader-sm"></span>
<span class="loader"></span>
<span class="loader loader-lg"></span>
<span class="loader loader-xl"></span>
```
<div class="input-field">
  <span class="loader loader-xs"></span>
  <span class="loader loader-sm"></span>
  <span class="loader"></span>
  <span class="loader loader-lg"></span>
  <span class="loader loader-xl"></span>
</div>

### Variations

Use the `loader-*` modifier to create variations.

```html
<span class="loader loader-secondary"></span>
<span class="loader loader-success"></span>
<span class="loader loader-info"></span>
<span class="loader loader-warning"></span>
<span class="loader loader-danger"></span>
<span class="loader loader-light"></span>
<span class="loader loader-dark"></span>
```

<span class="loader loader-secondary"></span>
<span class="loader loader-success"></span>
<span class="loader loader-info"></span>
<span class="loader loader-warning"></span>
<span class="loader loader-danger"></span>
<span class="loader loader-light"></span>
<span class="loader loader-dark"></span>

### Background Loaders

You can simulate a background loader using `loader-bg`. This is achieved using `position: relative` on the container and the `::after` pseudo-element. You can use the `loader-bg-xs|sm|lg|xl` modifiers to change the size.

```html
<div class="loader-bg loader-bg-xs"></div>
<div class="loader-bg loader-bg-sm"></div>
<div class="loader-bg"></div>
<div class="loader-bg loader-bg-lg"></div>
<div class="loader-bg loader-bg-xl"></div>
```

<div class="loader-example clearfix">
  <div class="loader-bg loader-bg-xs"></div>
  <div class="loader-bg loader-bg-sm"></div>
  <div class="loader-bg"></div>
  <div class="loader-bg loader-bg-lg"></div>
  <div class="loader-bg loader-bg-xl"></div>
</div>

### Background Variations

Use the `loader-bg-*` modifier to create variations.

```html
<div class="loader-bg loader-bg-secondary"></div>
<div class="loader-bg loader-bg-success"></div>
<div class="loader-bg loader-bg-info"></div>
<div class="loader-bg loader-bg-warning"></div>
<div class="loader-bg loader-bg-danger"></div>
<div class="loader-bg loader-bg-light"></div>
<div class="loader-bg loader-bg-dark"></div>
```

<div class="loader-example clearfix">
  <div class="loader-bg loader-bg-secondary"></div>
  <div class="loader-bg loader-bg-success"></div>
  <div class="loader-bg loader-bg-info"></div>
  <div class="loader-bg loader-bg-warning"></div>
  <div class="loader-bg loader-bg-danger"></div>
  <div class="loader-bg loader-bg-light"></div>
  <div class="loader-bg loader-bg-dark"></div>
</div>
