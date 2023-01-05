# Usage

Shoelace components are just regular HTML elements, or [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) to be precise. You can use them like any other element. Each component has detailed documentation that describes its full API, including properties, events, methods, and more.

If you're new to custom elements, often referred to as "web components," this section will familiarize you with how to use them.

## Attributes & Properties

Many components have properties that can be set using attributes. For example, buttons accept a `size` attribute that maps to the `size` property which dictates the button's size.

```html
<sl-button size="small">Click me</sl-button>
```

Some properties are boolean, so they only have true/false values. To activate a boolean property, add the corresponding attribute without a value.

```html
<sl-button disabled>Click me</sl-button>
```

In rare cases, a property may require an array, an object, or a function. For example, to customize the color picker's list of preset swatches, you set the `swatches` property to an array of colors. This must be done with JavaScript.

```html
<sl-color-picker></sl-color-picker>

<script>
  const colorPicker = document.querySelector('sl-color-picker');
  colorPicker.swatches = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
</script>
```

Refer to a component's documentation for a complete list of its properties.

## Events

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

## Methods

Some components have methods you can call to trigger various behaviors. For example, you can set focus on a Shoelace input using the `focus()` method.

```html
<sl-input></sl-input>

<script>
  const input = document.querySelector('sl-input');
  input.focus();
</script>
```

Refer to a component's documentation for a complete list of its methods and their arguments.

## Slots

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

## Don't Use Self-closing Tags

Custom elements cannot have self-closing tags. Similar to `<script>` and `<textarea>`, you must always include the full closing tag.

```html
<!-- Don't do this -->
<sl-input />

<!-- Always do this -->
<sl-input></sl-input>
```

## Differences from Native Elements

You might expect similarly named elements to share the same API as native HTML elements. This is not always the case. Shoelace components **are not** designed to be one-to-one replacements for their HTML counterparts.

For example, `<button>` and `<sl-button>` both have a `type` attribute, but it does different things. The former controls whether the button submits a form and the latter controls the button's appearance.

?> **Don't make assumptions about a component's API!** To prevent unexpected behaviors, please take the time to review the documentation and make sure you understand what each attribute, property, method, and event is intended to do.

## Waiting for Components to Load

Web components are registered with JavaScript, so depending on how and when you load Shoelace, you may notice a [Flash of Undefined Custom Elements (FOUCE)](https://www.abeautifulsite.net/posts/flash-of-undefined-custom-elements/) when the page loads. There are a couple ways to prevent this, both of which are described in the linked article.

One option is to use the [`:defined`](https://developer.mozilla.org/en-US/docs/Web/CSS/:defined) CSS pseudo-class to "hide" custom elements that haven't been registered yet. You can scope it to specific tags or you can hide all undefined custom elements as shown below.

```css
:not(:defined) {
  visibility: hidden;
}
```

As soon as a custom element is registered, it will immediately appear with all of its styles, effectively eliminating FOUCE. Note the use of `visibility: hidden` instead of `display: none` to reduce shifting as elements are registered. The drawback to this approach is that custom elements can potentially appear one by one instead of all at the same time.

Another option is to use [`customElements.whenDefined()`](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/whenDefined), which returns a promise that resolves when the specified element gets registered. You'll probably want to use it with [`Promise.allSettled()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) in case an element fails to load for some reason.

A clever way to use this method is to hide the `<body>` with `opacity: 0` and add a class that fades it in as soon as all your custom elements are defined.

```html
<style>
  body {
    opacity: 0;
  }

  body.ready {
    opacity: 1;
    transition: 0.25s opacity;
  }
</style>

<script type="module">
  await Promise.allSettled([
    customElements.whenDefined('sl-button'),
    customElements.whenDefined('sl-card'),
    customElements.whenDefined('sl-rating')
  ]);

  // Button, card, and rating are registered now! Add
  // the `ready` class so the UI fades in.
  document.body.classList.add('ready');
</script>
```

## Component Rendering and Updating

Shoelace components are built with [Lit](https://lit.dev/), a tiny library that makes authoring custom elements easier, more maintainable, and a lot of fun! As a Shoelace user, here is some helpful information about rendering and updating you should probably be aware of.

To optimize performance and reduce re-renders, Lit batches component updates. This means changing multiple attributes or properties at the same time will result in just a single re-render. In most cases, this isn't an issue, but there may be times you'll need to wait for the component to update before continuing.

Consider this example. We're going to change the `checked` property of the checkbox and observe its corresponding `checked` attribute, which happens to reflect.

```js
const checkbox = document.querySelector('sl-checkbox');
checkbox.checked = true;

console.log(checkbox.hasAttribute('checked')); // false
```

Most devs will expect this to be `true` instead of `false`, but the component hasn't had a chance to re-render yet so the attribute doesn't exist when `hasAttribute()` is called. Since changes are batched, we need to wait for the update before proceeding. This can be done using the `updateComplete` property, which is available on all Lit-based components.

```js
const checkbox = document.querySelector('sl-checkbox');
checkbox.checked = true;

checkbox.updateComplete.then(() => {
  console.log(checkbox.hasAttribute('checked')); // true
});
```

This time we see an empty string, which means the boolean attribute is now present!

?> Avoid using `setTimeout()` or `requestAnimationFrame()` in situations like this. They might work, but it's far more reliable to use `updateComplete` instead.

## Code Completion

### VS Code

Shoelace ships with a file called `vscode.html-custom-data.json` that can be used to describe it's custom elements to Visual Studio Code. This enables code completion for Shoelace components (also known as "code hinting" or "IntelliSense"). To enable it, you need to tell VS Code where the file is.

1. [Install Shoelace locally](/getting-started/installation#local-installation)
2. If it doesn't already exist, create a folder called `.vscode` at the root of your project
3. If it doesn't already exist, create a file inside that folder called `settings.json`
4. Add the following to the file

```js
{
  "html.customData": ["./node_modules/@shoelace-style/shoelace/dist/vscode.html-custom-data.json"]
}
```

If `settings.json` already exists, simply add the above line to the root of the object. Note that you may need to restart VS Code for the changes to take affect.

### Other Editors

Most popular editors support custom code completion with a bit of configuration. Please [submit a feature request](https://github.com/shoelace-style/shoelace/issues/new/choose) for your editor of choice. PRs are also welcome!
