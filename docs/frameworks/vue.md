# Vue

Vue [plays nice](https://custom-elements-everywhere.com/#vue) with custom elements, so you can use Shoelace in your Vue apps with ease.

?> These instructions are for Vue 3 and above. If you're using Vue 2, please see the [Vue 2 instructions](/frameworks/vue-2).

## Installation

To add Shoelace to your Vue app, install the package from npm.

```bash
npm install @shoelace-style/shoelace
```

Next, [include a theme](/getting-started/themes) and set the [base path](/getting-started/installation#setting-the-base-path) for icons and other assets. In this example, we'll import the light theme and use the CDN as a base path.

```jsx
import '@shoelace-style/shoelace/dist/themes/light.css';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path';

setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@%VERSION%/dist/');
```

?> If you'd rather not use the CDN for assets, you can create a build task that copies `node_modules/@shoelace-style/shoelace/dist/assets` into a public folder in your app. Then you can point the base path to that folder instead.

## Configuration

You'll need to tell Vue to ignore Shoelace components. This is pretty easy because they all start with `sl-`.

```js
import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('sl-')
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
```

Now you can start using Shoelace components in your app!

## Usage

### QR code generator example

```vue
<template>
  <div class="container">
    <h1>QR code generator</h1>

    <sl-input maxlength="255" clearable label="Value" v-model="qrCode"></sl-input>

    <sl-qr-code :value="qrCode"></sl-qr-code>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import '@shoelace-style/shoelace/dist/components/qr-code/qr-code.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';

const qrCode = ref();
</script>

<style>
.container {
  max-width: 400px;
  margin: 0 auto;
}

sl-input {
  margin: var(--sl-spacing-large) 0;
}
</style>
```

### Binding Complex Data

When binding complex data such as objects and arrays, use the `.prop` modifier to make Vue bind them as a property instead of an attribute.

```html
<sl-color-picker :swatches.prop="mySwatches" />
```

?> Are you using Shoelace with Vue? [Help us improve this page!](https://github.com/shoelace-style/shoelace/blob/next/docs/frameworks/vue.md)
