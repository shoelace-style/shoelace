# Customizing

Shoelace can be customized at a high level through design tokens. This gives you control over theme colors and general styling. For more advanced customizations, you can make use of component parts and custom properties to target individual components.

## Design Tokens

Shoelace makes use of several design tokens to provide a consistent appearance across components. You can customize them and use them in your own application with pure CSS — no preprocessor required.

Design tokens offer a high-level way to customize the library with minimal effort. There are no component-specific variables, however, as design tokens are intended to be generic and highly reusable. To customize an individual component, refer to the section entitled [Component parts](#component-parts).

Design tokens are CSS custom properties ("CSS variables") that are defined in the `:root` block of `shoelace.css`. This stylesheet is imported when you install Shoelace, so design tokens are available on your page at that point. Because design tokens are global, they're always prefixed with `--sl` to avoid collisions with other libraries.

To customize a design token, simply override it in your stylesheet using a `:root` block.

```css
:root {
  /* Changes the primary color to a shade of orange at 90% saturation */
  --sl-color-primary-hue: 30;
  --sl-color-primary-saturation: 90%;
}
```

Many design tokens are described further along in this documentation. For a complete list, refer to one `shoelace.css` or `shoelace.scss` in the project's source code.

!> **Never modify variables directly in `shoelace.css`** because your changes will be overwritten when you upgrade the library. Even if you don't plan on upgrading, it's always better to override design tokens in your own stylesheet for better maintainability.

## Component Parts

Whereas design tokens offer a high-level way to customize the library, component parts offer a low-level way to customize individual components. Again, this is done with pure CSS — no preprocessor required.

Shoelace components use a [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) to encapsulate their styles and behaviors. As a result, you can't simply target their internals with the usual CSS selectors. Instead, components expose "parts" that can be targetted with the [CSS part selector](https://developer.mozilla.org/en-US/docs/Web/CSS/::part), or `::part()`.

Here's an example that targets a buttons label.

```css
sl-button::part(label) {
  color: tomato;
}
```

At first glance, this might seem a bit limiting, but it comes with a few important advantages:

- Customizations can be made to components with explicit selectors, such as `::part(icon)`, rather than implicit selectors, such as `.button > div > span + .icon`, that are much more fragile.

- The internal structure of a component will likely change as the component evolves. By exposing its parts through the API, the internals can be reworked without fear of breaking users' customizations as long as its parts remain the same.

- It encourages us to think more about how components are designed and how customizations should be allowed before users can take advantage of them. Once we opt a part into the component's API, it won't be altered or removed until the next major version of the library.

Not all components expose parts. For those that do, they can be found in the component's API documentation.

### Custom Properties

For convenience, some components expose CSS custom properties that you can customize. These are not design tokens, nor do they have the same `--sl-` prefix since they're always scoped to a component.

You can set custom properties on a component in your stylesheet.

```css
sl-avatar {
  --size: 6rem;
}
```

This will also work if you need to target a subset of components with a specific class.

```css
sl-avatar.your-class {
  --size: 6rem;
}
```

Alternatively, you can set them inline directly on the element.

```html
<sl-avatar style="--size: 6rem;"></sl-avatar>
```

Not all components expose CSS custom properties. For those that do, they can be found in the component's API documentation.

## Writing a Theme

Customizing Shoelace is fairly easy, but you can take things a step further and create a full-blown theme if you want. A theme is nothing more than a stylesheet that uses the APIs described above to customize Shoelace's design tokens and components.

It's a good practice to include `shoelace.css` in your app and add your theme's stylesheet directly below it. That way, when an update introduces a new design token, your theme will still work with the default design token value.

### Submitting a Theme

**I am very interested in offering well-designed themes to compliment this library.** To submit a theme for review, please open an issue on GitHub with the theme attached. Once approved, your theme will be showcased in the project's documentation (that section is coming soon).

Themes that are in high demand include:

- Dark mode (must complement the default theme)
- High contrast (for optimal accessibility)

**I am willing to contribute a minimum of $100 USD each to commission the themes listed above.** Reach out to [@claviska](https://twitter.com/claviska) on Twitter for details and requirements (DMs are open).

Please note the following requirements before submitting a theme.

- Themes must be complete and of high quality
- Themes must be available under the same open source license as Shoelace
- If a theme is not original, the derivative work must have a license that is compatible with Shoelace's license
