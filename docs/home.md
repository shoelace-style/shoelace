<img class="logo" src="/assets/images/wordmark.svg" alt="Shoelace" data-no-zoom>

👟_A forward-thinking library of Web Components._

---

Shoelace is an open source component library for desktop and mobile that's built with [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components). Here are some reasons to consider it for your next project:

- Works with any framework 🧩
- Can be loaded via CDN ⚡️
- Fully customizable with CSS — no build required 🎨
- Hand-crafted with developer experience in mind 📐

Shoelace is designed and developed in New Hampshire by [@claviska](https://twitter.com/claviska). You can use it under the terms of the MIT License.

[Installation &rsaquo;](/installation)

---

## Why Web Components?

Thanks to the popularity of frameworks such as React, Vue, and Angular, component-driven development is a way of life for front-end developers these days. Let's face it — components are awesome, and they make a lot of sense in terms of design, development, and testing.

Unfortunately, framework-specific components fail us in a number of ways:

- You can only use them in the framework they're designed for. 🔒
- Their lifespan is limited to that of the framework's. ⏳
- New versions can lead to breaking changes, requiring substantial effort to update your components. 😭

Web Components solve these problems. They're [supported by all modern browsers](https://caniuse.com/#feat=custom-elementsv1), they're framework-agnostic, and because they're [part of the standard](https://www.webcomponents.org/specs), we can be confident that the respective APIs will be supported for many years to come.

If you're not yet familiar with Web Components, [MDN describes them](https://developer.mozilla.org/en-US/docs/Web/Web_Components) as:

> A suite of different technologies allowing you to create reusable custom elements — with their functionality encapsulated away from the rest of your code — and utilize them in your web apps.

In other words, we finally have a way to create our very own HTML elements (with scoped styles and scripts) and use them in [whatever framework we want.](https://custom-elements-everywhere.com/)

## Browser Support

Shoelace is built for modern browsers. If you need to support IE11 or pre-Chromium Edge, you probably don't want to use this library.

Although Web Components can (to some degree) be polyfilled for older browsers, supporting them is outside the scope of this project. If you're using Shoelace in a legacy browser, things will probably not work the way they're intended to.

!> Shoelace makes extensive use of the `::part` selector for styling, which isn't supported in Safari yet. However, it was added to [Safari Technology Preview 94](https://developer.apple.com/safari/technology-preview/release-notes/#r94) so it should land very soon.

## Attribution

- Theme colors and form controls were inspired by [Element](element.eleme.io).
- Positioning of menus, popovers, etc. is handled by [Popper.js](https://popper.js.org/).
- Tooltips are provided by [Tippy.js](https://atomiks.github.io/tippyjs/).
- The Shoelace logo was designed with a single shoelace by [Adam K Olson](https://twitter.com/adamkolson)
