---
layout: default.html
title: Customizing
description: Learn how to customize Shoelace.css with CSS variables.
---

## Customizing

If you’re using the source version of Shoelace (i.e. not the CDN or `/dist` version), you can customize components using CSS variables. To add customizations, simply override one or more of the variables found in [`source/css/variables.css`](../source/css/variables.css).

For example, you can customize the default text color, background color, and the primary color by adding this to your stylesheet:

```css
:root {
  --body-color: white;
  --body-bg-color: black;
  --state-primary: tomato;
}
```

You don’t need to include all of the core variables. You only need to include the ones you want to customize.

### Using CSS Variables

You’re encouraged to use Shoelace’s variables in your own stylesheet. This makes it easy to reuse values without hardcoding them. It also provides a foundation for extending Shoelace with your own [custom components](#creating-custom-components).

```css
.your-component {
  background-color: var(--component-bg-color);
  border-color: var(--component-border-color);
  color: var(--state-secondary);
}
```

If you’re not familiar with CSS variables, [this article](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) will bring you up to speed.

### Creating Custom Components

You can create custom components to extend Shoelace’s functionality. Here’s what a component stylesheet looks like.

```css
/* Set default variables in a :root block. It's a good idea to
   base them off core variables when possible. This makes it
   easier to customize the library as a whole but still lets
   users change individual components.

   Never change or override core variables!
*/
:root {
  --accordion-bg-color: var(--component-bg-color);
  --accordion-border-color: var(--component-border-color);
  /* etc. */
}

/* Component styles */
.accordion {
  /* Base styles go here. */

  /* Modifiers can be nested and should always be prefixed with
     the component's name.
  */
  &.accordion-xs { }
  &.accordion-sm { }
  &.accordion-lg { }
  &.accordion-xl { }
}
```

Here are some best practices for creating custom components:

**Familiarize yourself with Shoelace’s naming conventions.** A custom accordion component, for example, would have a class name such as `accordion`, modifier classes such as `accordion-xs`, and variable names that look like `--accordion-bg-color`. Try to follow the same patterns as much as possible.

**Define new variables when it makes sense to.** Take a look at how existing components are defined. Many use core variables instead of hardcoded properties as default values. This makes it easy for users to customize things quickly, but still provides enough flexibility to style individual components.

**Provide source and dist versions.** Many people use Shoelace as a tool for prototyping. If you’re open sourcing your component, it’s best to provide both source and dist versions. The dist version is just a minified version of the source after it’s been processed by cssnext.

**Semantic markup is strongly encouraged.** Custom components should use the most appropriate elements and the minimal amount of markup required.
