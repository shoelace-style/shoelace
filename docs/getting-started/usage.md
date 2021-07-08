# Usage

Shoelace components are just regular HTML elements, or "custom elements" to be precise. You can use them like any other element. Each component has detailed documentation that describes its full API, including properties, events, methods, and more.

## Web Component Basics

### Properties

Many components have properties that can be set using attributes. For example, buttons accept a `size` attribute that maps to the `size` property which dictates the button's size.

```html
<sl-button size="small">Click me</sl-button>
```

Some properties are boolean, so they only have true/false values. To activate a boolean property, add the corresponding attribute without a value.

```html
<sl-button disabled>Click me</sl-button>
```

In rare cases, a property may require an array, an object, or a function. For example, to customize the color picker's list of preset swatches, you set the `swatches` property to an array of colors. This can be done with JavaScript.

```html
<sl-color-picker></sl-color-picker>

<script>
  const colorPicker = document.querySelector('sl-color-picker');
  colorPicker.swatches = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
</script>
```

Refer to a component's documentation for a complete list of its properties.

### Events

You can listen for standard events such as `click`, `mouseover`, etc. as you normally would. In addition, some components emit custom events. These work the same way as standard events, but are prefixed with `sl-` to prevent collisions with standard events and other libraries.

```html
<sl-checkbox>Check me</sl-checkbox>

<script>
  const checkbox = document.querySelector('sl-checkbox');
  checkbox.addEventListener('sl-change', event => {
    console.log(event.target.checked ? 'checked' : 'not checked');
  });
</script>
```

Refer to a component's documentation for a complete list of its custom events.

### Methods

Some components have methods you can call to trigger various behaviors. For example, you can set focus on a Shoelace input using the `focus()` method.

```html
<sl-input></sl-input>

<script>
  const input = document.querySelector('sl-input');
  input.focus();
</script>
```

Refer to a component's documentation for a complete list of its methods and their arguments.

### Slots

Many components use slots to accept content inside of them. The most common slot is the _default_ slot, which includes any content inside the component that doesn't have a `slot` attribute.

For example, a button's default slot is used to populate its label.

```html
<sl-button>Click me</sl-button>
```

Some components also have _named_ slots. A named slot can be populated by adding a child element with the appropriate `slot` attribute. Notice how the icon below has the `slot="prefix"` attribute? This tells the component to place the icon into its `prefix` slot.

```html
<sl-button>
  <sl-icon slot="prefix" name="gear"></sl-icon>
  Settings
</sl-button>
```

The location of a named slot doesn't matter. You can put it anywhere inside the component and the browser will move it to the right place automatically!

Refer to a component's documentation for a complete list of available slots.

### Don't Use Self-closing Tags

Custom elements cannot have self-closing tags. Similar to `<script>` and `<textarea>`, you must always include the full closing tag.

```html
<!-- Don't do this -->
<sl-input />

<!-- Always do this -->
<sl-input></sl-input>
```

### Differences from Native Elements

You might expect similarly named elements to share the same API as native HTML elements. This is not always the case. Shoelace components **are not** designed to be one-to-one replacements for their HTML counterparts.

For example, `<button>` and `<sl-button>` both have a `type` attribute, but it does different things. The former controls whether the button submits a form and the latter controls the button's appearance.

?> **Don't make assumptions about a component's API!** To prevent unexpected behaviors, please take the time to review the documentation and make sure you understand what each attribute, property, method, and event is intended to do.

## Code Completion

### VS Code

Shoelace ships with a file called `vscode.html-custom-data.json` that can be used to describe its components to Visual Studio Code. This enables code completion for Shoelace components (also known as "code hinting" or "IntelliSense"). To enable it, you need to tell VS Code where the file is.

1. [Install Shoelace locally](/getting-started/installation#local-installation)
2. Create a folder called `.vscode` at the root of your project
3. Create a file inside the folder called `settings.json`
4. Add the following to the file

```js
{
  "html.customData": ["./node_modules/@shoelace-style/shoelace/dist/vscode.html-custom-data.json"]
}
```

If `settings.json` already exists, simply add the above line to the root of the object. Note that you may need to restart VS Code for the changes to take affect.

### Other Editors

Most popular editors support custom code completion with a bit of configuration. Please [submit a feature request](https://github.com/shoelace-style/shoelace/issues/new/choose) for your editor of choice. PRs are also welcome!

## React

React [doesn't play nice](https://custom-elements-everywhere.com/#react) with custom elements — it's a bit finicky about props.

> React passes all data to Custom Elements in the form of HTML attributes. For primitive data this is fine, but the system breaks down when passing rich data, like objects or arrays. In these instances you end up with stringified values like `some-attr="[object Object]"` which can't actually be used.

Event handling can also be cumbersome.

> Because React implements its own synthetic event system, it cannot listen for DOM events coming from Custom Elements without the use of a workaround. Developers will need to reference their Custom Elements using a ref and manually attach event listeners with addEventListener. This makes working with Custom Elements cumbersome.

Fortunately, there's a package called [@shoelace-style/react](https://www.npmjs.com/package/@shoelace-style/react) that will let you use Shoelace components as if they were React components. You can install it using this command.

```bash
npm install @shoelace-style/react
```

Include the base theme and any components you want to use in your app.

```jsx
import '@shoelace-style/shoelace/dist/themes/base.css';

import SlButton from '@shoelace-style/react/dist/button';
import SlSpinner from '@shoelace-style/react/dist/spinner';

// ...

const MyComponent = (props) => {
  return (
    <SlButton type="primary">
      Click me
    </SlButton>
  )
};
```

### Dependencies

Some components depend on other components internally. For example, `<sl-button>` requires you to load `<sl-spinner>` because it's used internally for its loading state. If a component has dependencies, they'll be listed in the "Dependencies" section of its documentation. These are always Shoelace components, not third-party libraries. 

Since dependencies are just components, you can load them the same way.

```jsx
import SlButton from '@shoelace-style/react/dist/button';
import SlSpinner from '@shoelace-style/react/dist/spinner';
```

However, this may cause your linter to complain (e.g. "SlButton is defined but never used"). If you're not going to use the dependent components in your JSX, you can import them as side effects instead.

```jsx
import '@shoelace-style/react/dist/button';
import '@shoelace-style/react/dist/spinner';
```

This extra step is required for dependencies to ensure they get registered with the browser as custom elements.

## Vue

Vue [plays nice](https://custom-elements-everywhere.com/#vue) with custom elements. You just have to tell it to ignore Shoelace components. This is pretty easy because they all start with `sl-`.

```js
Vue.config.ignoredElements = [/^sl-/];

new Vue({ ... });
```

### Binding Complex Data

When binding complex data such as objects and arrays, use the `.prop` modifier to make Vue bind them as a property instead of an attribute.

```html
<sl-color-picker :swatches.prop="mySwatches" />
```

### Two-way Binding

One caveat is there's currently [no support for v-model on custom elements](https://github.com/vuejs/vue/issues/7830), but you can still achieve two-way binding manually.

```html
<!-- This doesn't work -->
<sl-input v-model="name">

<!-- This works, but it's a bit longer -->
<sl-input :value="name" @input="name = $event.target.value">
```

If that's too verbose, you can use a custom directive instead.

### Using a Custom Directive

You can use [this utility](https://www.npmjs.com/package/@shoelace-style/vue-sl-model) to add a custom directive to Vue that will work just like `v-model` but for Shoelace components. To install it, use this command.

```bash
npm install @shoelace-style/vue-sl-model
```

Next, import the directive and enable it like this.

```js
import ShoelaceModelDirective from '@shoelace-style/vue-sl-model';

Vue.config.ignoredElements = [/^sl-/];
Vue.use(ShoelaceModelDirective);

// Your init here
new Vue({ ... });
```

Now you can use the `v-sl-model` directive to keep your data in sync!

```html
<sl-input v-sl-model="name">
```

## Angular

Angular [plays nice](https://custom-elements-everywhere.com/#angular) with custom elements. Just make sure to apply the custom elements schema as shown below.

```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
```
