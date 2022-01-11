# Radio

[component-header:sl-radio]

Radios allow the user to select one option from a group of many.

Radios are designed to be used with [radio groups](/components/radio-group). As such, all of the examples on this page utilize them to demonstrate their correct usage.

```html preview
<sl-radio-group label="Select an option">
  <sl-radio value="1" checked>Option 1</sl-radio>
  <sl-radio value="2">Option 2</sl-radio>
  <sl-radio value="3">Option 3</sl-radio>
</sl-radio-group>
```

```jsx react
import { SlRadio, SlRadioGroup } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlRadioGroup label="Select an option">
    <SlRadio value="1" checked>Option 1</SlRadio>
    <SlRadio value="2">Option 2</SlRadio>
    <SlRadio value="3">Option 3</SlRadio>
  </SlRadioGroup>
);
```

?> This component works with standard `<form>` elements. Please refer to the section on [form controls](/getting-started/form-controls) to learn more about form submission and client-side validation.

## Examples

### Disabled

Use the `disabled` attribute to disable a radio.

```html preview
<sl-radio-group label="Select an option">
  <sl-radio value="1" checked>Option 1</sl-radio>
  <sl-radio value="2">Option 2</sl-radio>
  <sl-radio value="3">Option 3</sl-radio>
  <sl-radio value="4" disabled>Disabled</sl-radio>
</sl-radio-group>
```

```jsx react
import { SlRadio, SlRadioGroup } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlRadioGroup label="Select an option">
    <SlRadio value="1" checked>Option 1</SlRadio>
    <SlRadio value="2">Option 2</SlRadio>
    <SlRadio value="3">Option 3</SlRadio>
    <SlRadio value="4" disabled>Disabled</SlRadio>
  </SlRadioGroup>
);
```

[component-metadata:sl-radio]
