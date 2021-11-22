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
  <SlRadioGroup label="Select an option" fieldset value="1">
    <SlRadio value="1" checked>Option 1</SlRadio>
    <SlRadio value="2">Option 2</SlRadio>
    <SlRadio value="3">Option 3</SlRadio>
  </SlRadioGroup>
);
```

### Using the required attribute

Adding a `required` attribute to `sl-radio-group` will require at least one option to be selected.

```html preview
<sl-radio-group class="required-radio-group" label="Select an option" fieldset required>
  <sl-radio value="1" name="foo">Option 1</sl-radio>
  <sl-radio value="2" name="foo">Option 2</sl-radio>
  <sl-radio value="3" name="foo">Option 3</sl-radio>
</sl-radio-group>
<br />
<sl-button class="required-button">Validate Group</sl-button>
<sl-button class="required-reset-button">Reset Group</sl-button>

<script>
  const button = document.querySelector('sl-button.required-button');
  const resetButton = document.querySelector('sl-button.required-reset-button');
  const group = document.querySelector('sl-radio-group.required-radio-group');

  button.addEventListener('click', ()=> group.reportValidity());
  resetButton.addEventListener('click', () => { group.value = ''})
</script>
```

```jsx react
import { SlRadio, SlRadioGroup } from '@shoelace-style/shoelace/dist/react';
const validateGroup = () => {
  const group = document.querySelector('sl-radio-group.required-radio-group');
  group.reportValidity();
}
const App = () => (
  <>
    <SlRadioGroup label="Select an option" fieldset required>
      <SlRadio value="1" checked>Option 1</SlRadio>
      <SlRadio value="2">Option 2</SlRadio>
      <SlRadio value="3">Option 3</SlRadio>
    </SlRadioGroup>
    <br />
    <sl-button class="required-button" onClick={()=> validateGroup()}>Validate Group</sl-button>
  </>
);
```

[component-metadata:sl-radio-group]
