<img id="top" class="logo" src="/assets/images/wordmark.svg" alt="Shoelace" data-no-zoom style="max-width: 24rem;">

_A forward-thinking web component library for desktop and mobile._ 🥾

- 🧩 Works with any framework
- ⚡️ Works with CDNs
- 🎨 Fully customizable (no preprocessor required)

Shoelace is actively designed and developed in New Hampshire by [@claviska](https://twitter.com/claviska) and available under the MIT License.

## Quick Start

The fastest way to get started is with the CDN. Add this to your `<head>` section:

```html
<link rel="stylesheet" src="//SOME_CDN/shoelace/shoelace.css">
<script type="module" src="//SOME_CDN/shoelace/shoelace.esm.js"></script>
```

Now you have access to all of Shoelace's components! Try adding a button to your page:

```html
<sl-button>Click Me</sl-button>
```

?> Don't want to use the CDN? Check out the [installation instructions](overview/installation.md) for more options.

---

## Web Components

**TL;DR** – we finally have a way to create our very own HTML elements and use them in any framework we want!

Thanks to the popularity of frameworks such as React, Vue, and Angular, component-driven development is a way of life for front-end developers. Components are awesome, and they make a lot of sense in terms of design, development, and testing.

Unfortunately, *framework-specific* components fail us in a number of ways:

- 🔒 You can only use them in the framework they're designed for
- ⏳ Their lifespan is limited to that of the framework's
- 😭 New versions lead to breaking changes, requiring substantial effort to update components

Web Components solve these problems. They're [supported by all modern browsers](https://caniuse.com/#feat=custom-elementsv1), they're framework-agnostic, and they're [part of the standard](https://www.webcomponents.org/specs), so we know they'll be supported by browsers for many years to come.

## Browser Support

Shoelace is built for modern browsers. If you need to support IE11 or pre-Chromium Edge, you probably don't want to use this library.

Although Web Components can (to some degree) be polyfilled for older browsers, supporting them is outside the scope of this project. If you're using Shoelace in a legacy browser, things will probably not work the way they're intended to.

## Attribution

- Components are compiled by [Stencil](https://stenciljs.com/)
- Documentation is powered by [Docsify](https://docsify.js.org/)
- Theme colors and form controls are inspired by [Element](element.eleme.io)
- Icons are courtesy of [Feather Icons](https://feathericons.com/)
- Positioning of menus, tooltips, et al is handled by [Popper.js](https://popper.js.org/)
- The Shoelace logo was designed with a single shoelace by [Adam K Olson](https://twitter.com/adamkolson)
