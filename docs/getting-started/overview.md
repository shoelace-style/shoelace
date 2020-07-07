<img id="top" class="logo" src="/assets/images/wordmark.svg" alt="Shoelace" data-no-zoom style="max-width: 24rem;">

A forward-thinking library of web components.

- Works with all frameworks 🧩
- Works with CDNs 🚛
- Fully customizable with CSS 🎨
- Open source 😸

Designed in New Hampshire by [Cory LaViska](https://twitter.com/claviska).

## Quick Start 🥾

Add the following code to your page.

```html
<link rel="stylesheet" src="https://unpkg.com/@claviska/shoelace@%VERSION%/shoelace.css" />
<script type="module" src="https://unpkg.com/@claviska/shoelace@%VERSION%/shoelace.esm.js"></script>
```

Now you have access to all of Shoelace's components! Try adding a button:

```html
<sl-button>Click me</sl-button>
```

See the [installation instructions](getting-started/installation.md) for more details and other ways to install Shoelace.

## New to Web Components?

**TL;DR** – we finally have a way to create our own HTML elements and use them in any framework we want!

Thanks to the popularity of frameworks such as Angular, Vue, and React, component-driven development has become a way of life for front-end developers. Components help us encapsulate styles and behaviors into reusable building blocks. They make a lot of sense in terms of design, development, and testing.

Unfortunately, _framework-specific_ components fail us in a number of ways:

- You can only use them in the framework they're designed for 🔒
- Their lifespan is limited to that of the framework's ⏳
- New framework versions can lead to breaking changes, requiring substantial effort to update components 😭

Web components solve these problems. They're [supported by all modern browsers](https://caniuse.com/#feat=custom-elementsv1), they're framework-agnostic, and they're [part of the standard](https://www.webcomponents.org/specs), so we know they'll be supported by browsers for many years to come.

## Browser Support

Components are tested to work in the last two versions of the following browsers:

<img src="/assets/images/chrome.png" alt="Chrome" width="64" height="64" data-no-zoom />
<img src="/assets/images/edge.png" alt="Edge" width="64" height="64" data-no-zoom />
<img src="/assets/images/firefox.png" alt="Firefox" width="64" height="64" data-no-zoom />
<img src="/assets/images/opera.png" alt="Opera" width="64" height="64" data-no-zoom />
<img src="/assets/images/safari.png" alt="Safari" width="64" height="64" data-no-zoom />

If you need to support IE11 or pre-Chromium Edge, this library isn't for you. Although web components can (to some degree) be polyfilled for legacy browsers, supporting them is outside the scope of this project. If you're using Shoelace in such a browser, you're gonna have a bad time. ⛷


## License

Shoelace was designed in New Hampshire by [Cory LaViska](https://twitter.com/claviska). It's available under the terms of the MIT license.

Designing, developing, and supporting this library requires a lot of time, effort, and skill. I'd like to keep it open source so anyone can use it, but that doesn't provide me with an income.

**If you're using my software to make profit,** I respectfully ask that you help [fund its development](https://github.com/sponsors/claviska) by becoming a sponsor. There are multiple tiers to choose from with  benefits at various levels, including prioritized support, bug fixes, feature requests, and advertising.

<a class="repo-button repo-button--sponsor" href="https://github.com/sponsors/claviska" rel="noopener" target="_blank">
  <sl-icon name="heart"></sl-icon> Become a sponsor
</a>

<a class="repo-button" href="https://github.com/claviska/shoelace" rel="noopener" target="_blank">
  <sl-icon name="star"></sl-icon> Star
</a>

<a class="repo-button" href="https://twitter.com/shoelaceui" rel="noopener" target="_blank">
  <sl-icon src="/assets/images/twitter.svg" style="transform: scale(1.5);"></sl-icon> Follow
</a>

## Attribution

Special thanks to the following projects and individuals that helped make Shoelace possible.

- Components are compiled by [Stencil](https://stenciljs.com/)
- Documentation is powered by [Docsify](https://docsify.js.org/)
- Theme colors and form controls are inspired by [Element](element.eleme.io)
- Icons are courtesy of [Bootstrap Icons](https://icons.getbootstrap.com/)
- Positioning of menus, tooltips, et al is handled by [Popper.js](https://popper.js.org/)
- CDN services are provided by [unpkg](https://unpkg.com/)
- The Shoelace logo was designed with a single shoelace by [Adam K Olson](https://twitter.com/adamkolson)
