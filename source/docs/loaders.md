---
layout: default.html
title: Loaders
description: These pure CSS loaders are easy to use and look great.
---

## Loaders

Create a pure CSS loader by applying the `loader` class to an empty `<span>` element. You can use the `loader-small` and `loader-big` modifiers to change the size.

```html
<span class="loader loader-small"></span>
<span class="loader"></span>
<span class="loader loader-big"></span>
```
<div class="input-single">
  <span class="loader loader-small"></span>
  <span class="loader"></span>
  <span class="loader loader-big"></span>
</div>

You can simulate a background loader using `loader-bg`. This is achieved using `position: relative` on the container and the `::after` pseudo-element. You can use the `loader-bg-small` and `loader-bg-big` modifiers to change the size.

```html
<div class="loader-bg loader-bg-small"></div>
<div class="loader-bg"></div>
<div class="loader-bg loader-bg-big"></div>
```

<div class="loader-example clearfix">
  <div class="loader-bg loader-bg-small"></div>
  <div class="loader-bg"></div>
  <div class="loader-bg loader-bg-big"></div>
</div>
