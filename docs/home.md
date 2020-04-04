<img class="logo" src="/assets/wordmark.svg" alt="Shoelace" data-no-zoom>

👟 _A forward-thinking design system for desktop and mobile._

---

Shoelace harnesses the power of [web components](#web-components) to bring you a modern, versatile, open source design system. 

Here's why you'll love it:

- Works with any framework 🧩
- Can be loaded via CDN ⚡️
- Fully customizable with CSS — no build required 🎨
- Hand-crafted with developer experience in mind 📐

Shoelace is designed and developed in New Hampshire by [@claviska](https://twitter.com/claviska). You can use it under the terms of the MIT License.

---

## Quick Start

The fastest way to start using Shoelace is with the CDN. In the `<head>` section of your page, include these tags.

```html
<link rel="stylesheet" src="//SOME_CDN/shoelace/shoelace.css">
<script type="module" src="//SOME_CDN/shoelace/shoelace.esm.js"></script>
```

Now you have access to all of Shoelace's components! Try adding a button to your page:

```html
<sl-button>Click Me</sl-button>
```

!> Don't want to use the CDN? Check out the [installation instructions](installation.md) for more options.

---

## Web Components

Thanks to the popularity of frameworks such as React, Vue, and Angular, component-driven development is a way of life for front-end developers these days. Let's face it — components are awesome, and they make a lot of sense in terms of design, development, and testing.

Unfortunately, framework-specific components fail us in a number of ways:

- You can only use them in the framework they're designed for. 🔒
- Their lifespan is limited to that of the framework's. ⏳
- New versions can lead to breaking changes, requiring substantial effort to update your components. 😭

Web Components solve these problems. They're [supported by all modern browsers](https://caniuse.com/#feat=custom-elementsv1), they're framework-agnostic, and because they're [part of the standard](https://www.webcomponents.org/specs), we can be confident that the respective APIs will be supported for many years to come.

If you're not yet familiar with Web Components, [MDN describes them](https://developer.mozilla.org/en-US/docs/Web/Web_Components) as:

> A suite of different technologies allowing you to create reusable custom elements — with their functionality encapsulated away from the rest of your code — and utilize them in your web apps.

In other words, we finally have a way to create our very own HTML elements and use them in any framework we want!

## Browser Support

Shoelace is built for modern browsers. If you need to support IE11 or pre-Chromium Edge, you probably don't want to use this library.

Although Web Components can (to some degree) be polyfilled for older browsers, supporting them is outside the scope of this project. If you're using Shoelace in a legacy browser, things will probably not work the way they're intended to.

!> Shoelace makes use of the `::part` selector for styling, which isn't supported in Safari yet. However, it's present in Safari 13.1 beta so it should be available very soon.

## Attribution

- Components are compiled by [Stencil](https://stenciljs.com/)
- Theme colors and form controls are inspired by [Element](element.eleme.io)
- Icons are courtesy of [Bootstrap Icons](https://icons.getbootstrap.com/)
- Positioning of menus, popovers, etc. is handled by [Popper.js](https://popper.js.org/)
- Tooltips are powered by [Tippy.js](https://atomiks.github.io/tippyjs/)
- Documentation is powered by [Docsify](https://docsify.js.org/)
- The Shoelace logo was designed with a single shoelace by [Adam K Olson](https://twitter.com/adamkolson)
