---
meta:
  title: Svelte
  description: Tips for using Shoelace in your Svelte app.
---

# Svelte

Svelte [plays nice](https://custom-elements-everywhere.com/#svelte) with custom elements, so you can use Shoelace in your Svelte apps with ease.

## Installation

To add Shoelace to your Svelte app, install the package from npm.

```bash
npm install @shoelace-style/shoelace
```

Next, [include a theme](/getting-started/themes) and set the [base path](/getting-started/installation#setting-the-base-path) for icons and other assets. In this example, we'll import the light theme and use the CDN as a base path.

```jsx
// main.js or main.ts
import '@shoelace-style/shoelace/dist/themes/light.css';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path';

setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@%VERSION%/%CDNDIR%/');
```

:::tip
If you'd rather not use the CDN for assets, you can create a build task that copies `node_modules/@shoelace-style/shoelace/dist/assets` into a public folder in your app. Then you can point the base path to that folder instead.
:::

## Usage

### QR code generator example

```jsx
<h1>Live editing</h1>

<sl-input label="Message" value={message} oninput={event => message = event.target.value}></sl-input>

<sl-alert open>
  <sl-icon slot="icon" name="info-circle"></sl-icon>
  {message}
</sl-alert>

<script>
  import '@shoelace-style/shoelace/dist/components/alert/alert.js'
  import '@shoelace-style/shoelace/dist/components/input/input.js';

  let message = $state('')
</script>
```

### Two-way Binding

One caveat is there's currently Svelte only supports `bind:value` directive in `<input>`, `<textarea>` and `<select>`, but you can still achieve two-way binding manually.

```jsx
// ❌ These do not work
<sl-input bind:value="name"></sl-input>

<sl-select bind:value="job">
  <sl-option value="designer">Designer</sl-option>
  <sl-option value="developer">Developer</sl-option>
</sl-select>

// ✅ These are a bit longer, but work
<sl-input value={name} oninput={event => name = event.target.value}></sl-input>

<sl-select value={job} onsl-input={event => job = event.target.value}>
  <sl-option value="designer">Designer</sl-option>
  <sl-option value="developer">Developer</sl-option>
</sl-select>
```

:::tip
Are you using Shoelace with Svelte? [Help us improve this page!](https://github.com/shoelace-style/shoelace/blob/next/docs/frameworks/svelte.md)
:::

### Slots

Slots in Shoelace/web components are functionally the same as basic slots in Svelte. Slots can be assigned to elements using the `slot` attribute followed by the name of the slot it is being assigned to.

Here is an example:

```jsx
<sl-drawer label="Drawer" placement="start" class="drawer-placement-start" bind:open={drawerIsOpen}>
  This drawer slides in from the start.
  <div slot="footer">
    <sl-button variant="primary" onclick={() => (drawerIsOpen = false)}>
      Close
    </sl-button>
  </div>
</sl-drawer>
```
