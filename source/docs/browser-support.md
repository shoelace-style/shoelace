---
layout: default.html
title: Browser Support
description: Learn about browser support and polyfills for older browsers.
---

## Browser Support

> TL;DR — you can use Shoelace _today_ if you don’t care about Internet Explorer (Edge is fine). If you need to support IE, just use a [grid system](https://github.com/zirafa/bootstrap-grid-only) and a polyfill such as [Myth](http://www.myth.io/) or [cssnext](http://cssnext.io/).

Browser support for CSS variables is [pretty good](http://caniuse.com/#feat=css-variables), but if you need to support Internet Explorer, consider using [Myth](http://www.myth.io/) or [cssnext](http://cssnext.io/) as a polyfill. Both libraries let you write standards-compliant CSS and process it to work properly in unsupportive browsers.

Unfortunately, it’s impossible for polyfills to support variable scoping. Because of this, Shoelace only uses CSS variables that are assigned at the `:root` level.

Browser support for the CSS Grid is [very good](http://caniuse.com/#feat=css-grid), but if you need to support older browsers you can use a [grid system](https://github.com/zirafa/bootstrap-grid-only) instead.

Browser support for `calc` is [excellent](http://caniuse.com/#feat=calc). Shoelace uses this internally for relative calculations. You can use it along with CSS variables too.

Browser support for color modifiers is non-existent. [There is a draft](https://drafts.csswg.org/css-color/#modifying-colors), so hopefully that will change soon. Shoelace doesn’t use this feature, but it will when support improves.

Browser support for custom media queries is non-existent. [There is a draft](https://drafts.csswg.org/mediaqueries-5/#custom-mq), so hopefully that will change soon. Shoelace doesn’t use this feature, but it will when support improves.
