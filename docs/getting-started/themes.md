# Themes

Shoelace is designed to be highly customizable through pure CSS. A simple, pleasing base theme is provided as well as an official [dark theme](#dark-mode).

The base theme must always be loaded first, even if you want to use another theme exclusively. It contains important, reusable design tokens that many components rely on.

If you're using the CDN, you can load the base theme by putting this tag in the `<head>` section of your page.

```html
<!-- Required -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@%VERSION%/dist/themes/base.css">
```

For developers, themes are also available as JavaScript modules that export [Lit CSSResult](https://lit.dev/docs/api/styles/#CSSResult) objects. You can find them in `dist/themes/*.styles.js`.

## Creating Your Own Theme

A theme is nothing more than a stylesheet that uses the Shoelace API to customize design tokens and/or components. To create a theme, you will need a decent understanding of CSS, including [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) and the [`::part` selector](https://developer.mozilla.org/en-US/docs/Web/CSS/::part).

The recommended way to create a theme is with a separate stylesheet that piggybacks on top of the base theme. You can [customize design tokens](/getting-started/customizing#design-tokens) and [style components](/getting-started/customizing#component-parts) to achieve the look you want. By working _with_ the base theme instead of replacing it, your theme will remain lightweight and "future proof", as upcoming versions of Shoelace may introduce new design tokens that your theme won't have.

### Scoping Your Styles

All theme classes must use the `sl-theme-{name}` convention, where `{name}` is a lowercase, hyphen-delimited value representing the name of your theme. For example, a theme called "Purple Power" would use the `sl-theme-purple-power` class.

Every selector in a theme must be scoped to the theme's class as to ensure interoperability with other themes. You should also scope them to `:host` so they can easily be imported and applied to third-party components.

```css
:host,
.sl-theme-purple-power {
  /* ... */
}
```

### Customizing Design Tokens

[Design tokens](/getting-started/customizing#design-tokens) give you a high-level way to customize Shoelace components. You can override them in your theme as shown below.

```css
:host,
.sl-theme-purple-power { 
  --sl-color-primary-50: #faf5ff;
  --sl-color-primary-100: #f3e8ff;
  --sl-color-primary-200: #e9d5ff;
  /* ... */
}
```

!> Avoid scoping design tokens to `:root`. You may notice that the base theme does this, but that's because it's not technically a theme — it's a set of design tokens and base styles that themes can use as a foundation to build upon.

### Customizing Components

To customize individual components, use the following syntax to target [component parts](/getting-started/customizing#component-parts). Available parts can be found in the "CSS Parts" section of each component's documentation.

```css
.sl-theme-purple-power sl-button::part(base) {
  /* your custom button styles here */
}
```

Some components offer additional customizations through [custom properties](http://localhost:4000/#/getting-started/customizing?id=custom-properties). If available, they will be listed in the "CSS Custom Properties" section of the documentation.

## Using Themes

If a theme adheres to the guidelines herein, you can import the stylesheet and activate it with the `sl-theme-{name}` class.

```html
<html class="sl-theme-purple-power">
  <head>
    ...
    <link rel="stylesheet" href="path/to/purple-power.css">
  </head>

  <body>
    ...
  </body>
</html>
```

If desired, you can import multiple themes and change between them by toggling the class on `<html>`.

## Dark Theme

The built-in dark theme uses an "inverted" color scale, so if you're using design tokens as intended, you'll get a decent dark mode for free. While this isn't the same as a professionally curated dark theme, it provides an excellent baseline for one and you're encouraged to customize it further depending on your specific needs.

To install the dark theme, add the following to the `<head>` section of your page.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@%VERSION%/dist/themes/dark.css">
```

To activate the theme, apply the `sl-theme-dark` class to the `<html>` element.

```html
<html class="sl-theme-dark">
  ...
</html>
```

### Detecting the User's Color Scheme Preference

Shoelace doesn't try to auto-detect the user's light/dark mode preference. This should be done at the application level. As a best practice, to provide a dark theme in your app, you should:

- Check for [`prefers-color-scheme`](https://stackoverflow.com/a/57795495/567486) and use its value by default
- Allow the user to override the setting in your app
- Remember the user's preference and restore it on subsequent logins

Shoelace avoids using the `prefers-color-scheme` media query because not all apps support dark mode, and it would break things for the ones that don't.
