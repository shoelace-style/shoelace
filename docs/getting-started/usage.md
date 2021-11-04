# Usage

Shoelace components are just regular HTML elements, or [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) to be precise. You can use them like any other element. Each component has detailed documentation that describes its full API, including properties, events, methods, and more.

If you're new to custom elements, often referred to as "web components," this section will familiarize you with how to use them. 

## Properties

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
