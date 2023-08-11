---
meta:
  title: Copy Button
  description: Copies data to the clipboard when the user clicks the button.
layout: component
---

```html:preview
<sl-copy-button value="Shoelace rocks!"></sl-copy-button>
```

```jsx:react
import { SlCopyButton } from '@shoelace-style/shoelace/dist/react/copy-button';

const App = () => (
  <SlCopyButton value="Shoelace rocks!" />
);
```

## Examples

### Custom Labels

Copy Buttons display feedback in a tooltip. You can customize the labels using the `copy-label`, `success-label`, and `error-label` attributes.

```html:preview
<sl-copy-button
  value="Custom labels are easy"
  copy-label="Click to copy"
  success-label="You did it!"
  error-label="Whoops, your browser doesn't support this!"
></sl-copy-button>
```

```jsx:react
import { SlCopyButton } from '@shoelace-style/shoelace/dist/react/copy-button';

const App = () => (
  <SlCopyButton
    value="Custom labels are easy"
    copy-label="Click to copy"
    success-label="You did it!"
    error-label="Whoops, your browser doesn't support this!"
  />
);
```

### Custom Icons

Use the `copy-icon`, `success-icon`, and `error-icon` slots to customize the icons that get displayed for each state. You can use [`<sl-icon>`](/components/icon) or your own images.

```html:preview
<sl-copy-button value="Copied from a custom button">
  <sl-icon slot="copy-icon" name="clipboard"></sl-icon>
  <sl-icon slot="success-icon" name="clipboard-check"></sl-icon>
  <sl-icon slot="error-icon" name="clipboard-x"></sl-icon>
</sl-copy-button>
```

```jsx:react
import { SlCopyButton } from '@shoelace-style/shoelace/dist/react/copy-button';
import { SlIcon } from '@shoelace-style/shoelace/dist/react/icon';

const App = () => (
  <>
    <SlCopyButton value="Copied from a custom button">
      <SlIcon slot="copy-icon" name="clipboard" />
      <SlIcon slot="success-icon" name="clipboard-check" />
      <SlIcon slot="error-icon" name="clipboard-x" />
    </SlCopyButton>
  </>
);
```

### Copying Values From Other Elements

Normally, the data that gets copied will come from the component's `value` attribute, but you can copy data from any element within the same document by providing its `id` to the `from` attribute.

When using the `from` attribute, the element's [`textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) will be copied by default. Passing an attribute or property modifier will let you copy data from one of the element's attributes or properties instead.

To copy data from an attribute, use `from="id[attr]"` where `id` is the id of the target element and `attr` is the name of the attribute you'd like to copy. To copy data from a property, use `from="id.prop"` where `id` is the id of the target element and `prop` is the name of the property you'd like to copy.

```html:preview
<!-- Copies the span's textContent -->
<span id="my-phone">+1 (234) 456-7890</span>
<sl-copy-button from="my-phone"></sl-copy-button>

<br><br>

<!-- Copies the input's "value" property -->
<sl-input id="my-input" type="text" value="User input" style="display: inline-block; max-width: 300px;"></sl-input>
<sl-copy-button from="my-input.value"></sl-copy-button>

<br><br>

<!-- Copies the link's "href" attribute -->
<a id="my-link" href="https://shoelace.style/">Shoelace Website</a>
<sl-copy-button from="my-link[href]"></sl-copy-button>
```

```jsx:react
import { SlCopyButton } from '@shoelace-style/shoelace/dist/react/copy-button';
import { SlInput } from '@shoelace-style/shoelace/dist/react/input';

const App = () => (
  <>
    {/* Copies the span's textContent */}
    <span id="my-phone">+1 (234) 456-7890</span>
    <SlCopyButton from="my-phone" />

    <br /><br />

    {/* Copies the input's "value" property */}
    <SlInput id="my-input" type="text" />
    <SlCopyButton from="my-input.value" />

    <br /><br />

    {/* Copies the link's "href" attribute */}
    <a id="my-link" href="https://shoelace.style/">Shoelace Website</a>
    <SlCopyButton from="my-link[href]" />
  </>
);
```

### Handling Errors

A copy error will occur if the value is an empty string, if the `from` attribute points to an id that doesn't exist, or if the browser rejects the operation for any reason. When this happens, the `sl-error` event will be emitted.

This example demonstrates what happens when a copy error occurs. You can customize the error label and icon using the `error-label` attribute and the `error-icon` slot, respectively.

```html:preview
<sl-copy-button from="i-do-not-exist"></sl-copy-button>
```

```jsx:react
import { SlCopyButton } from '@shoelace-style/shoelace/dist/react/copy-button';

const App = () => (
  <SlCopyButton from="i-do-not-exist" />
);
```

### Disabled

Copy buttons can be disabled by adding the `disabled` attribute.

```html:preview
<sl-copy-button value="You can't copy me" disabled></sl-copy-button>
```

```jsx:react
import { SlCopyButton } from '@shoelace-style/shoelace/dist/react/copy-button';

const App = () => (
  <SlCopyButton value="You can't copy me" disabled />
);
```

### Changing Feedback Duration

A success indicator is briefly shown after copying. You can customize the length of time the indicator is shown using the `feedback-duration` attribute.

```html:preview
<sl-copy-button value="Shoelace rocks!" feedback-duration="250"></sl-copy-button>
```

```jsx:react
import { SlCopyButton } from '@shoelace-style/shoelace/dist/react/copy-button';

const App = () => (
  <SlCopyButton value="Shoelace rocks!" feedback-duration={250} />
);
```

### Custom Styles

You can customize the button to your liking with CSS.

```html:preview
<sl-copy-button value="I'm so stylish" class="custom-styles">
  <sl-icon slot="copy-icon" name="asterisk"></sl-icon>
  <sl-icon slot="success-icon" name="check-lg"></sl-icon>
  <sl-icon slot="error-icon" name="x-lg"></sl-icon>
</sl-copy-button>

<style>
  .custom-styles {
    --success-color: white;
    --error-color: white;
    color: white;
  }

  .custom-styles::part(button) {
    background-color: #ff1493;
    border: solid 4px #ff7ac1;
    border-right-color: #ad005c;
    border-bottom-color: #ad005c;
    border-radius: 0;
    transition: 100ms scale ease-in-out, 100ms translate ease-in-out;
  }

  .custom-styles::part(button):hover {
    scale: 1.1;
  }

  .custom-styles::part(button):active {
    translate: 0 2px;
  }

  .custom-styles::part(button):focus-visible {
    outline: dashed 2px deeppink;
    outline-offset: 4px;
  }
</style>
```

```jsx:react
import { SlCopyButton } from '@shoelace-style/shoelace/dist/react/copy-button';

const css = `
  .custom-styles {
    --success-color: white;
    --error-color: white;
    color: white;
  }

  .custom-styles::part(button) {
    background-color: #ff1493;
    border: solid 4px #ff7ac1;
    border-right-color: #ad005c;
    border-bottom-color: #ad005c;
    border-radius: 0;
    transition: 100ms scale ease-in-out, 100ms translate ease-in-out;
  }

  .custom-styles::part(button):hover {
    scale: 1.1;
  }

  .custom-styles::part(button):active {
    translate: 0 2px;
  }

  .custom-styles::part(button):focus-visible {
    outline: dashed 2px deeppink;
    outline-offset: 4px;
  }
`;

const App = () => (
  <>
    <SlCopyButton value="I'm so stylish" className="custom-styles" />

    <style>{css}</style>
  </>
);
```
