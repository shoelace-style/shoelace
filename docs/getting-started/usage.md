# Usage

Shoelace components are just regular HTML elements, or "custom elements" to be precise. You can use them like any other element. Each component has detailed documentation that describes its full API, including properties, events, methods, and more.

## Web Component Basics

### Properties

Many components have properties ("props") that can be set using attributes. For example, buttons accept a `size` attribute that dictates the button's size.

```html
<sl-button size="small">Click me</sl-button>
```

Some props are booleans, so they only have true/false values. To activate a boolean prop, add the corresponding attribute without a value.

```html
<sl-button disabled>Click me</sl-button>
```

In rare cases, a prop may require an array, an object, or a function. For example, to customize the color picker's list of preset swatches, you set the `swatches` prop to an array of colors. This can be done with JavaScript.

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

For example, `<button>` and `<sl-button>` both have a `type` attribute, but it does different things (the former controls whether the button submits a form and the latter controls the button's appearance). Similarly, you can't call `focus()` on a Shoelace input — you need to use the component's `focus()` method instead. There are technical reasons for some of these design decisions that are outside the scope of this page.

?> **Don't make assumptions about a component's API!** To prevent unexpected behaviors, please take the time to review the documentation and make sure you understand what each property, method, and event is intended to do.

## Code Completion

### VS Code

Shoelace ships with a file called `vscode.html-custom-data.json` that can be used to describe its components to Visual Studio Code. This enables code completion for Shoelace components (also known as "code hinting" or "IntelliSense"). To enable it, you need to tell VS Code where the file is.

1. [Install Shoelace locally](/getting-started/installation.md#local-installation)
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

Fortunately, there's a utility that will wrap Shoelace components so you can use them as if they were React components. 👇

?> If you're starting a new project, consider using [Preact](https://preactjs.com/) as an alternative. It shares the same API as React and [handles custom elements quite well](https://custom-elements-everywhere.com/#preact).

### Wrapping Components

You can use [this utility](https://www.npmjs.com/package/@shoelace-style/react-wrapper) to wrap Shoelace components so they work like regular React components. To install it, use this command.

```bash
npm install @shoelace-style/react-wrapper
```

Now you can "import" Shoelace components as React components! Remember to [install Shoelace](/getting-started/installation.md) first, otherwise this won't work.

```js
import wrapCustomElement from '@shoelace-style/react-wrapper';

const SlButton = wrapCustomElement('sl-button');

return <SlButton type="primary">Click me</SlButton>;
```

A reference ("ref") to the underlying custom element is exposed through the `element` property so you can access it directly. This is useful for calling methods.

```jsx
<SlButton 
  ref={el => this.button = el} 
  onClick={() => this.button.element.current.blur()}
>
  Click me
</SlButton>
```

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

If that's too verbose, you can use a custom directive instead. 👇

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
