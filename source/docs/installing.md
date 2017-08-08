---
layout: default.html
title: Installing
description: How to install Shoelace.css.
---

## Installing

Shoelace is incredibly easy to use. To get started, simply link to `shoelace.css` in your project. You can use the CDN version or download the source manually.

To make certain components interactive (e.g. dropdowns and tabs), you’ll need to load [jQuery](https://cdnjs.com/libraries/jquery/) or [Zepto](https://cdnjs.com/libraries/zepto/) along with `shoelace.js`.

### CDN

The easiest way to use Shoelace is via CDN. Just add this to the `<head>`:

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/shoelace-css/{version}/shoelace.css">
```

And this before `</body>` but after jQuery/Zepto:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/shoelace-css/{version}/shoelace.js"></script>
```

This service is provided free, courtesy of [CDNJS](https://cdnjs.com/). New releases can take up to 12 hours to appear on the CDN.

### Download

Alternatively, you can [download the source](https://github.com/claviska/shoelace-css/releases) and link to `shoelace.css` from your own server. Just add this stylesheet to your `<head>`:

```html
<link rel="stylesheet" href="dist/shoelace.css">
```

And this before `</body>` but after jQuery/Zepto:

```html
<script src="dist/shoelace.js"></script>
```

### NPM

If you’re using NPM, you can install Shoelace by running:

```
npm install --save-dev shoelace-css
```
