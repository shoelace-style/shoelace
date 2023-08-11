---
meta:
  title: Radio
  description: Radios allow the user to select a single option from a group.
layout: component
---

Radios are designed to be used with [radio groups](/components/radio-group).

```html:preview
<sl-radio-group label="Select an option" name="a" value="1">
  <sl-radio value="1">Option 1</sl-radio>
  <sl-radio value="2">Option 2</sl-radio>
  <sl-radio value="3">Option 3</sl-radio>
</sl-radio-group>
```

```jsx:react
import SlRadio from '@shoelace-style/shoelace/dist/react/radio';
import SlRadioGroup from '@shoelace-style/shoelace/dist/react/radio-group';

const App = () => (
  <SlRadioGroup label="Select an option" name="a" value="1">
    <SlRadio value="1">Option 1</SlRadio>
    <SlRadio value="2">Option 2</SlRadio>
    <SlRadio value="3">Option 3</SlRadio>
  </SlRadioGroup>
);
```

:::tip
This component works with standard `<form>` elements. Please refer to the section on [form controls](/getting-started/form-controls) to learn more about form submission and client-side validation.
:::

## Examples

### Initial Value

To set the initial value and checked state, use the `value` attribute on the containing radio group.

```html:preview
<sl-radio-group label="Select an option" name="a" value="3">
  <sl-radio value="1">Option 1</sl-radio>
  <sl-radio value="2">Option 2</sl-radio>
  <sl-radio value="3">Option 3</sl-radio>
</sl-radio-group>
```

```jsx:react
import SlRadio from '@shoelace-style/shoelace/dist/react/radio';
import SlRadioGroup from '@shoelace-style/shoelace/dist/react/radio-group';

const App = () => (
  <SlRadioGroup label="Select an option" name="a" value="3">
    <SlRadio value="1">Option 1</SlRadio>
    <SlRadio value="2">Option 2</SlRadio>
    <SlRadio value="3">Option 3</SlRadio>
  </SlRadioGroup>
);
```

### Disabled

Use the `disabled` attribute to disable a radio.

```html:preview
<sl-radio-group label="Select an option" name="a" value="1">
  <sl-radio value="1">Option 1</sl-radio>
  <sl-radio value="2" disabled>Option 2</sl-radio>
  <sl-radio value="3">Option 3</sl-radio>
</sl-radio-group>
```

```jsx:react
import SlRadio from '@shoelace-style/shoelace/dist/react/radio';
import SlRadioGroup from '@shoelace-style/shoelace/dist/react/radio-group';

const App = () => (
  <SlRadioGroup label="Select an option" name="a" value="1">
    <SlRadio value="1">Option 1</SlRadio>
    <SlRadio value="2" disabled>
      Option 2
    </SlRadio>
    <SlRadio value="3">Option 3</SlRadio>
  </SlRadioGroup>
);
```

## Sizes

Add the `size` attribute to the [Radio Group](/components/radio-group) to change the radios' size.

```html preview
<sl-radio-group size="small" value="1">
  <sl-radio value="1">Small 1</sl-radio>
  <sl-radio value="2">Small 2</sl-radio>
  <sl-radio value="3">Small 3</sl-radio>
</sl-radio-group>

<br />

<sl-radio-group size="medium" value="1">
  <sl-radio value="1">Medium 1</sl-radio>
  <sl-radio value="2">Medium 2</sl-radio>
  <sl-radio value="3">Medium 3</sl-radio>
</sl-radio-group>

<br />

<sl-radio-group size="large" value="1">
  <sl-radio value="1">Large 1</sl-radio>
  <sl-radio value="2">Large 2</sl-radio>
  <sl-radio value="3">Large 3</sl-radio>
</sl-radio-group>
```

```jsx react
import SlRadio from '@shoelace-style/shoelace/dist/react/radio';

const App = () => (
  <>
    <SlRadioGroup size="small" value="1">
      <SlRadio value="1">Small 1</SlRadio>
      <SlRadio value="2">Small 2</SlRadio>
      <SlRadio value="3">Small 3</SlRadio>
    </SlRadioGroup>

    <br />

    <SlRadioGroup size="medium" value="1">
      <SlRadio value="1">Medium 1</SlRadio>
      <SlRadio value="2">Medium 2</SlRadio>
      <SlRadio value="3">Medium 3</SlRadio>
    </SlRadioGroup>

    <br />

    <SlRadioGroup size="large" value="1">
      <SlRadio value="1">Large 1</SlRadio>
      <SlRadio value="2">Large 2</SlRadio>
      <SlRadio value="3">Large 3</SlRadio>
    </SlRadioGroup>
  </>
);
```
