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

## SSR and client scripts

In the following tutorial you will notice that Shoelace cannot be imported in the frontmatter of Astro files. This is because Shoelace relies on globals from the DOM to be present.

There is a [Lit + Astro integration for SSR](https://docs.astro.build/en/guides/integrations-guide/lit/) , however it will not work with Shoelace in its current state due to some reliance on DOM APIs that aren't shimmed. We are working to resolve this.

## Instructions - Astro 4.11.3

- Node: v18.17.1 or v20.3.0 or higher. ( v19 is not supported.)
- Astro: 4.11.3
- Shoelace: 2.15.1

To get started using Shoelace with Astro, the following packages must be installed.

```bash
npm install @shoelace-style/shoelace rollup-plugin-copy
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
  // setBasePath to tell Shoelace where to load icons from.
  import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';
  setBasePath('/shoelace-assets/');

  // Load all components.
  import '@shoelace-style/shoelace';
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
  // setBasePath to tell Shoelace where to load icons from.
  import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';
  setBasePath('/shoelace-assets/');

  // Load all components.
  import '@shoelace-style/shoelace';

  const duration = 3000;
  import { setDefaultAnimation } from '@shoelace-style/shoelace/dist/utilities/animation-registry.js';

  setDefaultAnimation('tooltip.show', {
    keyframes: [
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1 }
    ],
    options: { duration: duration, easing: 'ease' }
  });
</script>
```

## Modifying Astro Config

You'll notice the above steps never added our icons into our `/public` directory. To solve this, we can install `rollup-plugin-copy` to copy Shoelace's assets into your public directory.

Here's what your Astro config should look like:

```js
// astro.config.mjs

import { defineConfig } from 'astro/config';
import copy from 'rollup-plugin-copy';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [
      copy({
        // Copy only on first build. We dont want to trigger additional server reloads.
        copyOnce: true,
        hook: 'buildStart',
        targets: [
          { src: 'node_modules/@shoelace-style/shoelace/dist/assets/*', dest: 'public/shoelace-assets/assets/' }
        ]
      })
    ]
  }
});
```
