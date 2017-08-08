---
layout: default.html
title: Browser Support
description: Learn about browser support and polyfills for older browsers.
---

## Browser Support

> TL;DR — you can use Shoelace _today_ if you don’t care about Internet Explorer and older browsers (Edge is fine). If you need to support older browsers, just make sure to use a [grid system](#grid-system) and [Myth](http://www.myth.io/) as a polyfill.

Browser support for CSS variables is [pretty good](http://caniuse.com/#feat=css-variables), but if you need to support Internet Explorer, consider using [Myth](http://www.myth.io/) as a polyfill. Myth lets you write standards-compliant CSS and “fixes” it for unsupportive browsers.

Browser support for the CSS Grid is [very good](http://caniuse.com/#feat=css-grid), but if you need to support older browsers you can use a [grid system](#grid-system) instead.

Browser support for `calc` is [excellent](http://caniuse.com/#feat=calc). Shoelace uses this internally for relative calculations. You can use it along with CSS variables too.

Browser support for color modifiers is non-existent. [There is a draft](https://drafts.csswg.org/css-color/#modifying-colors), so hopefully that will change soon. Shoelace doesn’t use this feature, but it will when support improves.

Browser support for custom media queries is non-existent. [There is a draft](https://drafts.csswg.org/mediaqueries-5/#custom-mq), so hopefully that will change soon. Shoelace doesn’t use this feature, but it will when support improves.
