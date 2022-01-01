# Customizing

Shoelace components can be customized at a high level through design tokens. This gives you control over theme colors and general styling. For more advanced customizations, you can make use of component parts and custom properties to target individual components.

## Design Tokens

Shoelace makes use of several design tokens to provide a consistent appearance across components. You can customize them and use them in your own application with pure CSS — no preprocessor required.

Design tokens offer a high-level way to customize the library with minimal effort. There are no component-specific variables, however, as design tokens are intended to be generic and highly reusable. To customize an individual component, refer to the section entitled [Component Parts](#component-parts).

Design tokens are accessed through CSS custom properties that are defined in your theme. Because design tokens live at the page level, they're prefixed with `--sl-` to avoid collisions with other libraries.

To customize a design token, simply override it in your stylesheet using a `:root` block. Here's an example that changes the primary theme to purple based on existing [color primitives](/tokens/color#primitives).

```css
:root {
  /* Changes the primary theme color to purple using primitives */
  --sl-color-primary-50: var(--sl-color-purple-50);
  --sl-color-primary-100: var(--sl-color-purple-100);
  --sl-color-primary-200: var(--sl-color-purple-200);
  --sl-color-primary-300: var(--sl-color-purple-300);
  --sl-color-primary-400: var(--sl-color-purple-400);
  --sl-color-primary-500: var(--sl-color-purple-500);
  --sl-color-primary-600: var(--sl-color-purple-600);
  --sl-color-primary-700: var(--sl-color-purple-700);
  --sl-color-primary-800: var(--sl-color-purple-800);
  --sl-color-primary-900: var(--sl-color-purple-900);
  --sl-color-primary-950: var(--sl-color-purple-950);
}
```

Many design tokens are described further along in this documentation. For a complete list, refer to `src/themes/light.styles.ts` in the project's [source code](https://github.com/shoelace-style/shoelace/blob/current/src/themes/light.styles.ts).

## Component Parts

Whereas design tokens offer a high-level way to customize the library, component parts offer a low-level way to customize individual components. Again, this is done with pure CSS — no preprocessor required.

Shoelace components use a [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) to encapsulate their styles and behaviors. As a result, you can't simply target their internals with the usual CSS selectors. Instead, components expose "parts" that can be targeted with the [CSS part selector](https://developer.mozilla.org/en-US/docs/Web/CSS/::part), or `::part()`.

Here's an example that modifies buttons with the `tomato-button` class.

```html preview
<sl-button class="tomato-button"> Tomato Button </sl-button>

<style>
  .tomato-button::part(base) {
    background: var(--sl-color-neutral-0);
    border: solid 1px tomato;
  }

  .tomato-button::part(base):hover {
    background: rgba(255, 99, 71, 0.1);
  }

  .tomato-button::part(base):active {
    background: rgba(255, 99, 71, 0.2);
  }

  .tomato-button::part(base):focus-visible {
    box-shadow: 0 0 0 3px rgba(255, 99, 71, 0.33);
  }

  .tomato-button::part(label) {
    color: tomato;
  }
</style>
```

At first glance, this approach might seem a bit verbose or even limiting, but it comes with a few important advantages:

- Customizations can be made to components with explicit selectors, such as `::part(icon)`, rather than implicit selectors, such as `.button > div > span + .icon`, that are much more fragile.

- The internal structure of a component will likely change as it evolves. By exposing component parts through an API, the internals can be reworked without fear of breaking customizations as long as its parts remain intact.

- It encourages us to think more about how components are designed and how customizations should be allowed before users can take advantage of them. Once we opt a part into the component's API, it's guaranteed to be supported and can't be removed until a major version of the library is released.

Most (but not all) components expose parts. You can find them in each component's API documentation under the "CSS Parts" section.

## Custom Properties

For convenience, some components expose CSS custom properties you can override. These are not design tokens, nor do they have the same `--sl-` prefix since they're scoped to a component.

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

## Animations

Some components use animation, such as when a dialog is shown or hidden. Animations are performed using the [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) rather than CSS. However, you can still customize them through Shoelace's animation registry. If a component has customizable animations, they'll be listed in the "Animation" section of its documentation.

To customize a default animation, use the `setDefaultAnimation()` method. The function accepts an animation name (found in the component's docs) and an object with `keyframes` and `options` or `null` to disable the animation.

This example will make all dialogs use a custom show animation.

```js
import { setDefaultAnimation } from '@shoelace-style/shoelace/dist/utilities/animation-registry.js';

// Change the default animation for all dialogs
setDefaultAnimation('dialog.show', {
  keyframes: [
    { transform: 'rotate(-10deg) scale(0.5)', opacity: '0' },
    { transform: 'rotate(0deg) scale(1)', opacity: '1' }
  ],
  options: {
    duration: 500
  }
});
```

If you only want to target a single component, use the `setAnimation()` method instead. This function accepts an element, an animation name, and an object comprised of animation `keyframes` and `options`.

In this example, only the target dialog will use a custom show animation.

```js
import { setAnimation } from '@shoelace-style/shoelace/dist/utilities/animation-registry.js';

// Change the animation for a single dialog
const dialog = document.querySelector('#my-dialog');

setAnimation(dialog, 'dialog.show', {
  keyframes: [
    { transform: 'rotate(-10deg) scale(0.5)', opacity: '0' },
    { transform: 'rotate(0deg) scale(1)', opacity: '1' }
  ],
  options: {
    duration: 500
  }
});
```

To learn more about creating Web Animations, refer to the documentation for [`Element.animate()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate).

?> Animations respect the users `prefers-reduced-motion` setting. When this setting is enabled, animations will not be played. To disable animations for all users, pass in `null` instead of a keyframes/options object.
