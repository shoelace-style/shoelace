# Themes

Shoelace is designed to be highly customizable through pure CSS. Out of the box, you can choose from a light or dark theme. Alternatively, you can design your own theme from scratch.

A theme is nothing more than a stylesheet that uses the Shoelace API to define design tokens and apply custom styles to components. To create a theme, you will need a decent understanding of CSS, including [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) and the [`::part` selector](https://developer.mozilla.org/en-US/docs/Web/CSS/::part).

For developers, built-in themes are also available as JavaScript modules that export [Lit CSSResult](https://lit.dev/docs/api/styles/#CSSResult) objects. You can find them in `dist/themes/*.styles.js`.

## Theme Basics

All themes are scoped to classes using the `sl-theme-{name}` convention, where `{name}` is a lowercase, hyphen-delimited value representing the name of the theme. The included light and dark themes use `sl-theme-light` and `sl-theme-dark`, respectively. A custom theme called "Purple Power", for example, would use the `sl-theme-purple-power` class. 

Every selector must be scoped to the theme's class to ensure interoperability with other themes. You should also scope them to `:host` so they can be imported and applied to custom element shadow roots.

```css
:host,
.sl-theme-purple-power {
  /* ... */
}
```

### Activating Themes

To activate a theme, import it and apply the theme's class to the `<html>` element. This example imports and activates the dark theme, or "dark mode."

```html
<html class="sl-theme-dark">
  <head>
    <link rel="stylesheet" href="path/to/shoelace/dist/themes/dark.css">
  </head>

  <body>
    ...
  </body>
</html>
```

?> There is one exception to this rule — the light theme _does not_ need to be activated. For convenience, the light theme is scoped to `:root` and will be activated by default when imported.

### Using Multiple Themes

You can activate themes on various containers throughout the page. This example uses the light theme with a dark-themed sidebar.

```html
<html>
  <head>
    <link rel="stylesheet" href="path/to/shoelace/dist/themes/light.css">
    <link rel="stylesheet" href="path/to/shoelace/dist/themes/dark.css">
  </head>

  <body>
    <nav class="sl-theme-dark">
      <!-- dark-themed sidebar -->
    </nav>
    
    <!-- light-themed content -->
  </body>
</html>
```

## Creating Themes

There are two ways to create themes. The easiest way is to customize a built-in theme. The advanced way is to create a new theme from scratch. Which method you choose depends on your project's requirements and the amount of effort you're willing to commit to.

### Customizing a Built-in Theme

The easiest way to customize Shoelace is to override one of the built-in themes. You can do this by importing the light or dark theme as-is, then creating a separate stylesheet that overrides the [design tokens](/getting-started/customizing#design-tokens) and adds [component styles](/getting-started/customizing#component-parts) to your liking. You must import your theme _after_ the built-in theme.

If you're customizing the light theme, you should scope your styles to the following selectors.

```css
:root, 
:host, 
.sl-theme-light {
  /* your custom styles here */
}
```

If you're customizing the dark theme, you should scope your styles to the following selectors.

```css
:host,
.sl-theme-dark {
  /* your custom styles here */
}
```

By customizing a built-in theme, you'll maintain a smaller stylesheet containing only the changes you've made. Contrast this to [creating a new theme](#creating-a-new-theme), where you need to explicitly define every design token required by the library. This approach is more "future-proof," as new design tokens that emerge in subsequent versions of Shoelace will be accounted for by the built-in theme.

While this may be easier to maintain, the drawback is that your theme modifies a built-in theme and thus can't be activated independently.

### Creating a New Theme

Creating a new theme is more of an undertaking than [customizing an existing one](#customizing-a-built-in-theme). At a minimum, you must implement all of the required design tokens. The easiest way to do this is by "forking" one of the built-in themes and modifying it from there.

Start by changing the selector to match your theme's name. Assuming your new theme is called "Purple Power", your theme should be scoped like this.

```css
:host,
.sl-theme-purple-power {
  /* your custom styles here */
}
```

By creating a new theme, you won't be relying on a built-in theme as a foundation. Because the theme is decoupled from the built-ins, you can activate it independently as an alternative to the built-ins. This is the recommended approach if you're looking to open source your theme for others to use.

You will, however, need to maintain your theme more carefully, as new versions of Shoelace may introduce new design tokens that your theme won't have accounted for. Because of this, it's recommended that you clearly specify which version(s) of Shoelace your theme is designed to work with and keep it up to date as new versions of Shoelace are released.

## Dark Theme

The built-in dark theme uses an inverted + shifted color scale so, if you're using design tokens as intended, you'll get a decent dark mode for free. While this isn't the same as a professionally curated dark theme, it provides an excellent baseline for one and you're encouraged to customize it depending on your needs.

This was achieved by taking the light theme's [color tokens](/tokens/color) and "flipping" the scale so 100 becomes 900, 200 becomes 800, 300 becomes 700, etc. Next, the luminance of each primitive was increased slightly to avoid true black, a color that is typically undesirable in dark themes. The result is a custom palette that complements the light theme well and makes it easy to offer light and dark variations with minimal effort.

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
