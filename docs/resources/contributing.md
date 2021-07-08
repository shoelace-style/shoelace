# Contributing

Shoelace is an open source project, meaning everyone can use it and contribute to its development. When you join our community, you'll find a friendly group of enthusiasts at all experience levels who are willing to chat about anything and everything related to Shoelace.

The easiest way to get started contributing is to join the [community chat](https://discord.gg/mg8f26C). This is where we hang out, discuss new ideas, ask for feedback, and more!

A common misconception about contributing to an open source project is that you need to know how to code. This simply isn't true. In fact, there are _many_ ways to contribute, and some of the most important contributions come from those who never write a single line of code. Here's a list of ways you can make a meaningful contribution to the project:

- Submitting well-written bug reports
- Submitting feature requests that are within the scope of the project
- Improving the documentation
- Responding to users that need help in the community chat or discussion forum
- Triaging issues on GitHub
- Being a developer advocate for the project
- Sponsoring the project financially
- Writing tests
- Sharing ideas
- And, of course, contributing code!

Please take a moment to review these guidelines to make the contribution process as easy as possible for both yourself and the project's maintainers.

## Using the Issue Tracker

The [issue tracker](https://github.com/shoelace-style/shoelace/issues) is for bug reports, feature requests, and pull requests.

- Please **do not** use the issue tracker for personal support requests. Use [the discussion forum](https://github.com/shoelace-style/shoelace/discussions/categories/help) instead.
- Please **do not** derail, hijack, or troll issues. Keep the discussion on topic and be respectful of others.
- Please **do not** post comments with "+1" or "👍". Use [reactions](https://github.blog/2016-03-10-add-reactions-to-pull-requests-issues-and-comments/) instead.
- Please **do** use the issue tracker for feature requests, bug reports, and pull requests.

Issues that do not follow these guidelines are subject to closure. There simply aren't enough resources for the author and contributors to troubleshoot personal support requests.

### Feature Requests

Feature requests can be added using the issue tracker.

- Please **do** search for an existing request before suggesting a new feature.
- Please **do** use the "👍" reaction to vote for a feature.
- Please **do** share substantial use cases and perspective that support new features if they haven't already been mentioned.
- Please **do not** bump, spam, or ping contributors to prioritize your own feature.

If you would like your feature prioritized, please consider [sponsoring the project](https://github.com/sponsors/claviska).

### Bug Reports

A bug is _a demonstrable problem_ caused by code in the library. Bug reports are an important contribution to the quality of the project. When submitting a bug report, there are a few steps you can take to make sure your issues gets attention quickly.

- Please **do not** paste in large blocks of irrelevant code
- Please **do** search for an existing issue before creating a new one
- Please **do** explain the bug clearly
- Please **do** provide a minimal test case that demonstrates the bug (e.g. [jsfiddle.net](https://jsfiddle.net/) or [CodePen](https://codepen.io/))
- Please **do** provide additional information, when necessary, to replicate the bug

**A minimal test case is critical to a successful bug report.** It demonstrates that the bug exists in the library and not in surrounding code. Contributors should be able to understand the bug without studying your code, otherwise they'll probably move on to another bug.

If you would like your bug prioritized, please consider [sponsoring the project](https://github.com/sponsors/claviska).

### Pull Requests

To keep the project on track, please consider the following guidelines before submitting a PR.

- Please **do not** submit a PR without opening an issue first, especially for non-trivial changes. This may prevent you from doing work that won't be accepted for various reasons (e.g. someone is already working on it, it's not a good fit for the project, it needs additional planning, etc.)
- Please **do** make sure your PR clearly defines what you're changing. Even if you feel your changes are obvious, please explain them so other contributors can more easily review your works. PRs without detailed descriptions are subject to closure pending more details.
- Please **do** open your PR against the `next` branch.
- Please **do not** edit anything in `dist/`. These files are generated automatically, so you need to edit the source files instead.

The author reserves the right to reject any PR that's outside the scope of the project or doesn't meet code quality standards.

### Branches

`current` - This branch reflects the latest release and powers [shoelace.style](https://shoelace.style/).

`next` - This is the branch you should submit pull requests against. It reflects what's coming in the _next_ release, which can be previewed at [next.shoelace.style](https://next.shoelace.style/).

## Developing

To set up a local dev environment, [fork the repo](https://github.com/shoelace-style/shoelace/fork) on GitHub, clone it locally, and install its dependencies.

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/shoelace
cd shoelace
npm install
```

Once you've cloned the repo, run the following command to spin up the Shoelace dev server.

```bash
npm start
```

After the initial build, a browser will open automatically to a local version of the docs. The documentation is powered by Docsify, which uses raw markdown files to generate pages on the fly.

### Creating New Components

To scaffold a new component, run the following command, replacing `sl-tag-name` with the desired tag name.

```bash
npm run create sl-tag-name
```

This will generate a source file, a stylesheet, and a docs page for you. When you start the dev server, you'll find the new component in the "Components" section of the sidebar.

### Dev Sandbox

Component development occurs _within_ the local docs site. I've found that offering common variations _in the docs_ is more beneficial for users than segmenting demos and code examples into separate tools such as Storybook. This encourages more thorough documentation, streamlines development for maintainers, and simplifies how the project is built. It also reduces installation and startup times significantly.

There is currently no hot module reloading (HMR), as browsers don't provide a way to unregister custom elements. However, most changes to the source will reload the browser automatically. 

For more information about running and building the project locally, refer to `README.md` in the project's root.

### Testing

Shoelace uses [Web Test Runner](https://modern-web.dev/guides/test-runner/getting-started/) for testing. To launch the test runner during development, open a terminal and launch the dev server.

```bash
npm start
```

In a second terminal window, launch the test runner.

```bash
npm run test:watch
```

Follow the on-screen instructions to work with the test runner. Tests will automatically re-run as you make changes.

To run tests only once, make sure to build the project first.

```bash
npm run build
npm run test
```

## Best Practices

The following is a non-exhaustive list of conventions, patterns, and best practices we try to follow. As a contributor, we ask that you make a good faith effort to follow them as well. This ensures consistency and maintainability throughout the project.

If in doubt, use your best judgment and the maintainers will be happy to guide you during the code review process. If you'd like clarification on something before submitting a PR, feel free to reach out on the [community chat](https://discord.gg/mg8f26C).

?> This section can be a lot to digest in one sitting, so don't feel like you need to take it all in right now. Most contributors will be better off skimming this section and reviewing the relevant content as needed.

### Accessibility

Shoelace is built with accessibility in mind. Creating generic components that are fully accessible to users with varying capabilities across a multitude of circumstances is a daunting challenge. Oftentimes, the solution to an a11y problem is not written in black and white and, therefore, we may not get it right the first time around. There are, however, guidelines we can follow in our effort to make Shoelace an accessible foundation from which applications and websites can be built.

We take this commitment seriously, so please ensure your contributions have this goal in mind. If you need help with anything a11y-related, please [reach out to the community](/resources/community) for assistance. If you discover an accessibility concern within the library, please file a bug on the [issue tracker](https://github.com/shoelace-style/shoelace/issues).

It's important to remember that, although accessibility starts with foundational components, it doesn't end with them. It everyone's responsibility to encourage best practices and ensure we're providing an optimal experience for all of our users.

### Documentation

Maintaining good documentation can be a painstaking task, but poor documentation leads to frustration and makes the project less appealing to users. Fortunately, writing documentation for Shoelace is fast and easy!

Most of Shoelace's technical documentation is generated with JSDoc comments and TypeScript metadata from the source code. Every property, method, event, etc. is documented this way. In-code comments encourage contributors to keep the documentation up to date as changes occur so the docs are less likely to become stale. Refer to an existing component to see how JSDoc comments are used in Shoelace.

Instructions, code examples, and interactive demos are hand-curated to give users the best possible experience. Typically, the most relevant information is shown first and less common examples are shown towards the bottom. Edge cases and gotchas should be called out in context with tips or warnings.

The docs are powered by [Docsify](https://docsify.now.sh/). Check out `docs/_sidebar.md` and `docs/components/` to get an idea of how pages are structured and formatted. If you're creating a new component, it may help to use an existing component's markdown file as a template.

If you need help with documentation, feel free to reach out on the [community chat](https://discord.gg/mg8f26C).

### Code Formatting

Most code formatting is handled automatically by [Prettier](https://prettier.io/) via commit hooks. However, for the best experience, you should [install it in your editor](https://prettier.io/docs/en/editors.html) and enable format on save.

Please do not make any changes to `prettier.config.cjs` without consulting the maintainers.

### Composability

Components should be composable, meaning you can easily reuse them with and within other components. This reduces the overall size of the library, expedites feature development, and maintains a consistent user experience.

The `<sl-select>` component, for example, makes use of the dropdown, input, menu, and menu item components. Because it's offloading most of its functionality and styles to lower-level components, the select component remains lightweight and its appearance is consistent with other form controls and menus.

### Component Stucture

All components have a host element, which is a reference to the `<sl-*>` element itself. Make sure to always set the host element's `display` property to the appropriate value depending on your needs, as the default is `inline` per the custom element spec.

```css
:host {
  display: block;
}
```

Aside from `display`, avoid setting styles on the host element when possible. The reason for this is that styles applied to the host element are not encapsulated. Instead, create a base element that wraps the component's internals and style that instead. This convention also makes it easier to use BEM in components, as the base element can serve as the "block" entity.

### Class Names

All components use a [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM), so styles are completely encapsulated from the rest of the document. As a result, class names used _inside_ a component won't conflict with class names _outside_ the component, so we're free to name them anything we want.

Internally, each component uses the [BEM methodology](http://getbem.com/) for class names. There is no technical requirement to do this — it's purely the preference of the author to enforce consistency and clarity throughout components. As such, all contributions are expected to follow this pattern.

### Boolean Props

Boolean props should _always_ default to `false`, otherwise there's no way for the user to unset the, without JavaScript. To keep the API as friendly and consistent as possible, use a name like `noHeader` with a default value of `false` instead of `header` with a default value of `true`.

### Conditional Slots

When a component relies on the presence of slotted content to do something, don't assume its initial state is permanent. Slotted content can be added or removed any time and components must be aware of this. A good practice to manage this is:

- Add `@slotchange={this.handleSlotChange}` to the slots you want to watch
- Add a `handleSlotChange` method and use the `hasSlot` utility to update state variables for the the respective slot(s)
- Never conditionally render `<slot>` elements in a component — always use `hidden` so the slot remains in the DOM and the `slotchange` event can be captured

See the source of card, dialog, or drawer for examples.

### Custom Events

Components must only emit custom events, and all custom events must start with `sl-` as a namespace. For compatibility with frameworks that utilize DOM templates, custom events must have lowercase, kebab-style names. For example, use `sl-change` instead of `slChange`.

This convention avoids the problem of browsers lowercasing attributes, causing some frameworks to be unable to listen to them. This problem isn't specific to one framework, but [Vue's documentation](https://vuejs.org/v2/guide/components-custom-events.html#Event-Names) provides a good explanation of the problem.

### CSS Custom Properties

To expose custom properties as part of a component's API, scope them to the `:host` block.

```scss
:host {
  --color: var(--sl-color-primary-500);
  --background-color: var(--sl-color-gray-100);
}
```

Then use the following syntax for comments so they appear in the generated docs. Do not use the `--sl-` prefix, as that is reserved for design tokens that live in the global scope.

```js
/**
 * @cssproperty --color: The component's text color.
 * @cssproperty --background-color: The component's background color. 
 */
@customElement('sl-example')
export default class SlExample {
  // ...
}
```

### When to use a property vs. a CSS custom property

When designing a component's API, standard properties are generally used to change the _behavior_ of a component, whereas CSS custom properties ("CSS variables") are used to change the _appearance_ of a component. Remember that properties can't respond to media queries, but CSS variables can.

There are some exceptions to this (e.g. when it significantly improves developer experience), but a good rule of thumbs is "will this need to change based on screen size?" If so, you probably want to use a CSS variable.

### When to use a CSS custom property vs. a CSS part

There are two ways to enable customizations for components. One way is with CSS custom properties ("CSS variables"), the other is with CSS parts ("parts").

CSS variables are scoped to the host element and can be reused throughout the component. A good example of a CSS variable would be `--border-width`, which might get reused throughout a component to ensure borders share the same width for all internal elements.

Parts let you target a specific element inside the component's shadow DOM but, by design, you can't target a part's children or siblings. You can _only_ customize the part itself. Use a part when you need to allow a single element inside the component to accept styles.

This convention can be relaxed when the developer experience is greatly improved by not following these suggestions.

### A Note About Sass

The Shoelace _source_ is developed using Sass for the convenience of nested selectors, imports, and tedious things such as color palette generation. By design, Sass variables, color functions, and other preprocessor-specific feaures are not used in the source and will not be accepted in a PR.

Consumers of the library should never need to worry about preprocessing the library.

### Form Controls

Form controls should support validation through the following conventions:

- All form controls must have an `invalid` property that reflects their validity
- All form controls must have a `setCustomValidity()` method so the user can set a custom validation message
- All form controls must have a `reportValidity()` method that report their validity during form submission
- All form controls should mirror their native validation attributes such as `required`, `pattern`, `minlength`, `maxlength`, etc. when possible
- All form controls must be serialized by `<sl-form>`
