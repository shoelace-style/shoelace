# Usage

Shoelace components are just regular HTML elements, or "custom elements" to be precise. You can use them like any other element. Each component has detailed documentation that describes its full API, including properties, events, methods, and more.

## Web Component Basics

### Properties

Many components have properties ("props") that can be set using attributes. For example, buttons accept a `size` attribute that dictates the button's size.

```html
<sl-button size="small">Small</sl-button>
```

Some props are booleans, so they only have true/false values. To activate a boolean prop, add the corresponding attribute without a value.

```html
<sl-button disabled>Pill Button</sl-button>
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

You can listen for standard events such as `click`, `mouseover`, etc. as you normally would. In addition, some components emit custom events. These work the same way as standard events, but are prefixed with `sl` to prevent collisions with standard events and other libraries.

```html
<sl-checkbox>Checkbox</sl-checkbox>

<script>
  const checkbox = document.querySelector('sl-checkbox');
  checkbox.addEventListener('slChange', event => {
    console.log(event.target.checked ? 'checked' : 'not checked');
  });
</script>
```

Refer to a component's documentation for a complete list of its custom events.

### Methods

Some components have methods you can call to trigger various behaviors. For example, you can set focus on a Shoelace input using the `setFocus()` method.

```html
<sl-input></sl-input>

<script>
  const input = document.querySelector('sl-input');
  input.setFocus();
</script>
```

Refer to a component's documentation for a complete list of its methods and their arguments.

### Slots

Most components use slots to accept content inside of them. The most common slot is the _default_ slot, which includes any content inside the component that doesn't have a `slot` attribute.

For example, a button's default slot is used to populate its label.

```html
<sl-button>Label</sl-button>
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

### Differences from Native Elements

You might expect similarly named elements to share the same API as native elements. This is not the case. Shoelace components are not designed to be one-to-one replacements for their HTML counterparts.

For example, both `<button>` and `<sl-button>` have a `type` attribute, but they do different things (the former controls whether the button submits the form and the latter controls the button's appearance). Similarly, you can't call `focus()` on a Shoelace input — you need to use the component's `setFocus()` method instead. There are technical reasons for some of these design decisions that are outside the scope of this page.

?> **Don't make assumptions about a component's API!** To prevent unexpected behaviors, please take the time to review the documentation and make sure you understand what each property, method, and event is intended to do.

## Vue

Vue [plays nice](https://custom-elements-everywhere.com/#vue) with custom elements. Just make sure to tell it to ignore Shoelace components. This is pretty easy because they all start with `sl-`.

```js
Vue.config.ignoredElements = [/^sl-/];

new Vue({ ... });
```

### Two-way Binding

One caveat is there's currently [no support for v-model on custom elements](https://github.com/vuejs/vue/issues/7830), but you can handle two-way binding manually instead.

```html
<!-- This doesn't work -->
<sl-input v-model="name">

<!-- This works, but it's a bit longer -->
<sl-input :value="name" @input="name = $event.target.value">
```

If that's too verbose, you can use a custom directive instead. 👇

### Two-way Binding with a Custom Directive

This will create a `v-sl-model` directive that works with Shoelace components. Add the following code to a file called `shoelace-model-directive.js`:

```js
const wm = new WeakMap();

export default {
  install: function (Vue) {
    Vue.directive('sl-model', {
      bind (el, binding, vnode) {
        const inputHandler = event => Vue.set(vnode.context, binding.expression, event.target.value);
        wm.set(el, inputHandler);
        el.value = binding.value;
        el.addEventListener('input', inputHandler);
      },
      componentUpdated(el, binding) {
        el.value = binding.value;
      },      
      unbind(el) {
        const inputHandler = wm.get(el);
        el.removeEventListener(el, inputHandler);
      }
    })
  }    
};
```

Next, import the directive and enable it like this.

```js
import ShoelaceModelDirective from 'shoelace-model-directive.js';

Vue.use(ShoelaceModelDirective);
Vue.config.ignoredElements = [/^sl-/];

// Your init here
new Vue({ ... });
```

Now you can use the `v-sl-model` directive to keep your data in sync!

```html
<sl-input v-sl-model="name">
```

## React

React [mostly plays nice](https://custom-elements-everywhere.com/#react) with custom elements, but it's a bit finicky about props.

> React passes all data to Custom Elements in the form of HTML attributes. For primitive data this is fine, but the system breaks down when passing rich data, like objects or arrays. In these instances you end up with stringified values like `some-attr="[object Object]"` which can't actually be used.

Event handling can also be cumbersome.

> Because React implements its own synthetic event system, it cannot listen for DOM events coming from Custom Elements without the use of a workaround. Developers will need to reference their Custom Elements using a ref and manually attach event listeners with addEventListener. This makes working with Custom Elements cumbersome.

If you're starting a new project, one solution is to consider using [Preact](https://preactjs.com/) as [this isn't an issue.](https://custom-elements-everywhere.com/#preact) If you're dead set on using React, you can wrap Shoelace components for a better experience. 👇

### Wrapping Components

You can use this utility to wrap Shoelace components so they work better in React. Add the following code to a file called `wrap-custom-element.js`:

```js
import React from 'react';

export default function wrapCustomElement(tagName) {
  const CustomElement = tagName;

  return class extends React.Component {
    constructor(props) {
      super(props);
      this.customElement = React.createRef();
    }

    componentDidMount() {
      this.syncProps(this.props);
    }

    componentWillReceiveProps(props) {
      this.syncProps(props);
    }

    syncProps(props) {
      const el = this.customElement.current;

      Object.keys(props).forEach(name => {
        if (name === 'children' || name === 'style') {
          return;
        }

        if (name.indexOf('on') === 0 && name[2] === name[2].toUpperCase()) {
          this.syncEvent(name.substring(2), props[name]);
        } else {
          el[name] = props[name];
        }
      });
    }

    syncEvent(eventName, newEventHandler) {
      const el = this.customElement.current;
      const eventNameLc = eventName[0].toLowerCase() + eventName.substring(1);
      const eventStore = el.__events || (el.__events = {});
      const oldEventHandler = eventStore[eventNameLc];

      if (oldEventHandler) {
        el.removeEventListener(eventNameLc, oldEventHandler);
      }

      if (newEventHandler) {
        el.addEventListener(
          eventNameLc,
          (eventStore[eventNameLc] = function handler(event) {
            newEventHandler.call(this, event);
          })
        );
      }
    }

    render() {
      return (
        <CustomElement ref={this.customElement} style={this.props.style}>
          {this.props.children}
        </CustomElement>
      );
    }
  };
}
```

Then you can import Shoelace components and use them like this.

```js
import wrapCustomElement from 'wrap-custom-element.js';

const SlButton = wrapCustomElement('sl-button');

return <SlButton type="primary">Click me</SlButton>;
```

