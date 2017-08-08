---
layout: default.html
title: Customizing
description: Learn how to customize Shoelace.css with CSS variables.
---

## Customizing

You can customize Shoelace without editing core files or using a preprocessor. To add customizations, simply override one or more of the variables found in `[variables.css](source/css/variables.css)` in your own stylesheet.

For example, you can customize the default text color and background like this:

```css
:root {
  --body-color: white;
  --body-bg-color: black;
}
```

### Using Variables

You can use any of Shoelace’s variables in your stylesheet. This makes it easy to reuse values without hardcoding them. It also provides a foundation for extending Shoelace with your own [custom components](#custom-components).

.your-selector {
  color: var(--state-danger);
}
```

Refer to `[variables.css](source/css/variables.css)` for a complete list of variables in Shoelace. If you’re not familiar with CSS variables, [this article](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) will bring you up to speed. There’s also an [interactive demo](https://codepen.io/claviska/pen/NvGVYM?editors=1100) if you want to try it out.

### Custom Components

You can create custom components to extend Shoelace’s functionality. Here are some best practices to keep things consistent and easy for others to understand.

**Familiarize yourself with Shoelace’s naming conventions.** A custom accordion component, for example, would have a class name such as `accordion`, modifier classes such as `accordion-open`, and variable names that look like `--accordion-bg-color`. Try to follow similar patterns as much as possible.

**Define new variables when it makes sense to.** Take a look at `[variables.css](source/css/variables.css)` to see how existing components are defined. Many use core variables instead of hardcoded properties as default values. This makes it easy for users to customize things quickly, but still provides enough flexibility to style individual components.

**Semantic markup is strongly encouraged.** Custom components should use the most appropriate elements and the minimal amount of markup required.

**Keep everything together.** During development, each component should be in its own folder along with its stylesheets, scripts, and documentation. Components shouldn’t depend on other components’ styles or scripts. This makes it easier to add or remove components from your app without affecting others. Of course, it’s perfectly fine to bundle components for optimization purposes in production.
