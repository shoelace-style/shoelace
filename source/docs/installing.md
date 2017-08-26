---
layout: default.html
title: Installing
description: How to install Shoelace.css.
---

## Installing

There are two ways to use Shoelace. If you want to get things up and running quickly, use the `dist/` version or the [CDN version](#cdn). This version isn’t customizable, nor can you use future CSS features with it. It’s primarily intended for prototyping.

If you’re developing a production app, you should [build Shoelace from source](#building-from-source). This version is completely customizable, modular, and let’s you use future CSS features _today_.

**Note:** To make certain components interactive (e.g. dropdowns and tabs), you’ll need to load [jQuery](https://cdnjs.com/libraries/jquery/) or [Zepto](https://cdnjs.com/libraries/zepto/) before `shoelace.js`.

### CDN

This is the best approach for prototyping, however, this version isn’t customizable and doesn’t support future CSS features. To load Shoelace via CDN, add this to your `<head>`:

```html
<link rel="stylesheet" href="https://cdn.shoelace.style/{{version}}/shoelace.css">
```

And this before `</body>` but after jQuery/Zepto:

```html
<script src="https://cdn.shoelace.style/{{version}}/shoelace.js"></script>
```

This service is provided free, courtesy of [KeyCDN](https://keycdn.com/).

### Building From Source

To make the most out of Shoelace, you should build it from source. This will let you use future CSS features _today_, such as [CSS variables](https://www.w3.org/TR/css-variables/), [nesting](http://tabatkins.github.io/specs/css-nesting/), [color functions](https://drafts.csswg.org/css-color/#modifying-colors), [and more](http://cssnext.io/features/). It also gives you complete control over customizing Shoelace.

The recommended way to build Shoelace is with [cssnext](http://cssnext.io/). There are instructions for webpack, gulp, grunt, browserify, and others located on the [setup page](http://cssnext.io/setup/).

You can [download Shoelace](https://github.com/claviska/shoelace-css/releases) from GitHub, but it’s probably better to use the npm version:

```text
npm install shoelace-css
```

The main source file is [`source/css/shoelace.css`](../source/css/shoelace.css). This bootstraps the entire project by importing core variables and all of Shoelace’s components.

If you don’t need everything, just load [`source/css/variables.css`](../source/css/variables.css) along with the components you want.
