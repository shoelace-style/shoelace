# Customizing

## Design Tokens

Shoelace makes use of design tokens to provide a consistent appearance across components. You can customize them and use them in your own application with pure CSS — no preprocessor required.

Design tokens are CSS custom properties ("CSS variables") that are defined in the `:root` block of `shoelace.css`. This stylesheet is imported when you install Shoelace, so they're already available on your page at that point. Because design tokens are global, they're always prefixed with `--sl` to avoid collisions with other libraries.

To customize a design token, simply override it in your stylesheet using a `:root` block.

```css
:root {
  /* Changes the primary color to a shade of orange at 90% saturation */
  --sl-color-primary-hue: 30;
  --sl-color-primary-saturation: 90%;
}
```

Many design tokens are described later in this documentation. For a complete list, refer to one `shoelace.css` or `shoelace.scss` in the project's source code.

!> **Never modify variables directly in `shoelace.css`** because your changes will be overwritten when you upgrade the library. Even if you don't plan on upgrading, it's always better to override design tokens in your own stylesheet for better maintainability.

## CSS Parts

TODO

## Writing a Theme

TODO