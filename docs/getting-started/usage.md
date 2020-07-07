# Usage

## Web Component Basics

Shoelace components are just regular HTML elements, or "custom elements" to be precise. You can use them like any other element. Each component has detailed documentation showing its props, events, methods, and more.

### Properties

Many components have properties ("props") that can be set using attributes. For example, buttons accept a `size` attribute that determines the button's size.

```html
<sl-button size="small">Small</sl-button>
```

Some props are booleans, so they only have true/false values. To set a boolean prop, add the corresponding attribute with no value.

```html
<sl-button pill>Pill Button</sl-button>
```

In rare cases, a prop may require an array, an object, or a function. For example, to customize the color picker's swatches, you set the `swatches` prop to an array of colors. This can be done with JavaScript.

```html
<sl-color-picker></sl-color-picker>

<script>
  const colorPicker = document.querySelector('sl-color-picker');
  colorPicker.swatches = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
</script>
```

### Events

You can listen for standard events such as `click`, `mouseover`, etc. as you normally would. In addition, some components emit custom events. You can listen for custom events the same way. All custom events are prefixed with `sl`.

```html
<sl-checkbox>Checkbox</sl-checkbox>

<script>
  const checkbox = document.querySelector('sl-checkbox');
  checkbox.addEventListener('slChange', event => {
    console.log('The checkbox has changed');
  });
</script>
```

### Methods

Some components have methods you can call to trigger certain behaviors.


### Differences from Native Elements

You might expect similarly named elements to share the same API as native elements. This is not the case. Shoelace components are not designed to be one-to-one replacements for their HTML counterparts.

For example, both `<button>` and `<sl-button>` have a `type` attribute, but they do different things (the former controls whether the button submits the form and the latter controls the button's appearance). Similarly, you can't call `focus()` on a Shoelace input — you need to use the component's `setFocus()` method instead. There are technical reasons for some of these design decisions that are outside the scope of this page.

**TL;DR – Please don't make assumptions about a component's API!** To prevent unexpected behaviors, take the time to review the documentation and make sure you understand what each property, method, and event is actually doing.

## With Frameworks

### React

TODO

### Vue

TODO

### Angular

TODO
