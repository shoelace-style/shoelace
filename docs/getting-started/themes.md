## Themes

Customizing Shoelace is easy, but you can take things a step further and create an entire theme. The following themes have been designed or vetted by the Shoelace team and are available under an open source license.

## Available Themes

- [Shoelace Dark](#) by [@claviska](https://twitter.com/claviska)

## Creating a Theme

A theme is nothing more than a stylesheet that uses the Shoelace API to customize design tokens and/or components. To create a theme, you will need a decent understanding of CSS, including [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) and the [`::part` selector](https://developer.mozilla.org/en-US/docs/Web/CSS/::part).

The easiest way to create a theme is to piggyback on top of the default theme, adjusting design tokens and styling components only where necessary to achieve the look you want. This makes your theme ligher and more "future proof", as future Shoelace versions may introduce new components that you might not have accounted for.

Technically, you can roll your own theme from scratch without using the default theme as a baseline, but that approach isn't recommended.

### Design Tokens

Themes should be scoped to a class using the following convention, where `name` represents the name of your theme. To customize design tokens, for example, use the following syntax.

```css
.sl-theme-name { 
  --sl-color-primary-hue: 290;
  --sl-color-primary-saturation: 80%;

  /* more design token customizations here */
}
```

?> Your theme should avoid scoping custom properties to `:root`. The default theme does this to provide base styles that will apply to the page when no `sl-theme-` class is applied. If you want to be able to switch themes with classes, avoid using `:root` in your theme.

### Components

To customize individual components, use the following syntax.

```css
.sl-theme-name sl-button {
  /* your custom button styles here */
}
```

## Using a Theme

If your theme adheres to the guidelines above, you can use it by importing the stylesheet adding the `sl-theme-name` class you chose to the `<body>` tag.

```html
<head>
  <link rel="stylesheet" href="path/to/dark.css">
</head>

<body class="sl-theme-dark">
  <!-- Everything inside will use the dark theme -->
</body>
```

In fact, you can apply a theme class to any element on the page, not just the body. This lets you use multiple themes on the same page. Whether or not this is a good practice is left to the discretion of the designer.

### Detecting the User's Color Scheme Preference

Shoelace doesn't try to auto-detect light/dark mode preferences and, if you plan on distributing your theme, neither should yours. This should be done at the application level. As a best practice, to provide a dark theme in your own app, you should:

- Try checking for [`prefers-color-scheme`](https://stackoverflow.com/a/57795495/567486) and use its value by default
- Allow the user to override it in your app
- Remember the user's preference and restore it on subsequent logins

Not all apps support dark mode, so themes that use the `prefers-color-scheme` media query won't look right when the user prefers dark mode (e.g. light chrome and dark components). For distributed themes, avoid auto-detect and let users opt in to your theme.

## Submitting a Theme

**I am very interested in offering well-designed themes to complement this library.** To submit a theme for review, please [open an issue](https://github.com/shoelace-style/shoelace/issues/new) on GitHub with the theme linked or attached. Once approved, your theme will be showcased on this page.

Please note the following requirements before submitting a theme.

- Themes must be complete and of high quality
- Themes must be available under a compatible open source license
- If a theme is not original, the derivative work must be properly credited
