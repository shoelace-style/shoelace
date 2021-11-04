# Vue

Vue [plays nice](https://custom-elements-everywhere.com/#vue) with custom elements, so you can use Shoelace in your Vue apps with ease.

## Installation

To add Shoelace to your Vue app, install the package from npm.

```bash
npm install @shoelace-style/shoelace
```

You'll need to tell Vue to ignore Shoelace components. This is pretty easy because they all start with `sl-`.

```js
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

app.config.compilerOptions.isCustomElement = tag => tag.startsWith('sl-');

app.mount('#app');
```

## Binding Complex Data

When binding complex data such as objects and arrays, use the `.prop` modifier to make Vue bind them as a property instead of an attribute.

```html
<sl-color-picker :swatches.prop="mySwatches" />
```

## Two-way Binding

One caveat is there's currently [no support for v-model on custom elements](https://github.com/vuejs/vue/issues/7830), but you can still achieve two-way binding manually.

```html
<!-- This doesn't work -->
<sl-input v-model="name">

<!-- This works, but it's a bit longer -->
<sl-input :value="name" @input="name = $event.target.value">
```

If that's too verbose for your liking, you can use a custom directive instead. [This utility](https://www.npmjs.com/package/@shoelace-style/vue-sl-model) adds a custom directive that will work just like `v-model` but for Shoelace components. To install it, use this command.

```bash
npm install @shoelace-style/vue-sl-model
```

Next, import the directive and enable it like this.

```js
import ShoelaceModelDirective from '@shoelace-style/vue-sl-model';
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);
app.use(ShoelaceModelDirective);

app.config.compilerOptions.isCustomElement = tag => tag.startsWith('sl-');

app.mount('#app');
```

Now you can use the `v-sl-model` directive to keep your data in sync!

```html
<sl-input v-sl-model="name">
```
