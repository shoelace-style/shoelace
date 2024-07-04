---
meta:
  title: Integrating with Astro
  description: This page explains how to integrate Shoelace with an Astro app.
---

# Integrating with Astro

This page explains how to integrate Shoelace with an Astro app.

:::tip
This is a community-maintained document. Please [ask the community](/resources/community) if you have questions about this integration. You can also [suggest improvements](https://github.com/shoelace-style/shoelace/blob/next/docs/tutorials/integrating-with-astro.md) to make it better.
:::

## Instructions - Astro 4.11.3

- Node: v18.17.1 or v20.3.0 or higher. ( v19 is not supported.)
- Astro: 4.11.3
- Shoelace: 2.15.1

To get started using Shoelace with Astro, the following packages must be installed.

```bash
npm install @shoelace-style/shoelace
```



### Importing components

In `/src/pages/index.astro`, set the base path and import Shoelace.

```html
---
// import default stylesheet
import "@shoelace-style/shoelace/dist/themes/light.css";
---

<html>
  <body>
    <sl-button>Button</sl-button>
  </body>
</html>

<script>
  import "@shoelace-style/shoelace"
</script>

```

:::tip
If you want to cherry pick components, replace the main Shoelace import with 'import "@shoelace-style/shoelace/dist/components/button/button.js";' for whichever component you would like.
:::

You only have to import in the main `index.astro` file. The components can be used anywhere throughout the project.

### Customizing animations

In `/src/pages/index.astro`, set custom animations after the Shoelace import.

```html
---
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path.js";
setBasePath("dist/assets");
---

<html>
  <body>
    <sl-tooltip content="This is a tooltip">
      <sl-button>Hover Me</sl-button>
    </sl-tooltip>
  </body>
</html>

<script>
  import "@shoelace-style/shoelace"

  const duration = 3000;
  import { setDefaultAnimation } from "@shoelace-style/shoelace/dist/utilities/animation-registry.js";
  
  setDefaultAnimation("tooltip.show", {
  keyframes: [
   { opacity: 0, scale: 0.8 },
   { opacity: 1, scale: 1 },
  ],
    options: { duration: duration, easing: "ease" },
  });
</script>

```

