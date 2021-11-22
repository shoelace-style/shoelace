# Radio Group

[component-header:sl-radio-group]

Radio Groups are used to group multiple radios so they function as a single control.

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

## Examples

### Showing the Fieldset

You can show a fieldset and legend that wraps the radio group using the `fieldset` attribute.

```html preview
<sl-radio-group label="Select an option" fieldset>
  <sl-radio value="1" checked>Option 1</sl-radio>
  <sl-radio value="2">Option 2</sl-radio>
  <sl-radio value="3">Option 3</sl-radio>
</sl-radio-group>
```

```jsx react
import { SlRadio, SlRadioGroup } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlRadioGroup label="Select an option" fieldset>
    <SlRadio value="1" checked>Option 1</SlRadio>
    <SlRadio value="2">Option 2</SlRadio>
    <SlRadio value="3">Option 3</SlRadio>
  </SlRadioGroup>
);
```

### Using the required attribute

Adding a `required` attribute to `sl-radio-group` will require at least one option to be selected.

```html preview
<sl-radio-group id="radio-group1" label="Select an option" fieldset required>
  <sl-radio value="1" name="foo">Option 1</sl-radio>
  <sl-radio value="2" name="foo">Option 2</sl-radio>
  <sl-radio value="3" name="foo">Option 3</sl-radio>
</sl-radio-group>

<br />

<sl-button id="group1">Validate Group</sl-button>

<script>
  const button = document.getElementById('group1');
  const group = document.getElementById('radio-group1');

  button.addEventListener('click', ()=> group.reportValidity())
</script>
```

Alternatively, if any of the `sl-radio` elements has a `required` attribute, `sl-radio-group` mimics the behaviour of the browser and will require at least one selection from the group.

```html preview
<sl-radio-group id="radio-group2" label="Select an option" fieldset>
  <sl-radio value="1" name="foo" required>Option 1</sl-radio>
  <sl-radio value="2" name="foo">Option 2</sl-radio>
  <sl-radio value="3" name="foo">Option 3</sl-radio>
</sl-radio-group>

<br />

<sl-button id="group2">Validate Group</sl-button>

<script>
  const button = document.getElementById('group2');
  const group = document.getElementById('radio-group2');

  button.addEventListener('click', ()=> group.reportValidity())
</script>
```
[component-metadata:sl-radio-group]
