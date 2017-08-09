---
layout: default.html
title: Grid System
description: Shoelace doesn’t ship with a grid system because you don’t need one!
---

## Grid System

Shoelace doesn’t ship with a grid system because [you don’t need one](https://rachelandrew.co.uk/archives/2017/07/01/you-do-not-need-a-css-grid-based-grid-system/). You should use the [CSS Grid Layout](https://gridbyexample.com/) instead.

This website uses the CSS Grid Layout. It’s really simple!

```html
<main id="wrap">
  <nav id="nav">
    ...
  </nav>

  <div id="content">
    ...
  </div>
</main>
```

Now we just need a couple styles to turn the nav and content elements into columns. This will make the nav `12rem` wide and the content `100% - 12rem` so it fills the rest of the space.

```css
#wrap {
  display: grid;
  grid-template-columns: 12rem calc(100% - 12rem);
}
```

You can use media queries to make grids responsive. This is how we make the nav appear on top of the content on smaller screens.

```css
@media (max-width: 60rem) {
  #wrap {
    display: block;
  }
}
```

Support for CSS Grid Layouts is [very good](http://caniuse.com/css-grid), but if you have an obligation to support older browsers, consider using the Bootstrap grid [without any extras](https://github.com/zirafa/bootstrap-grid-only) in combination with Shoelace.
