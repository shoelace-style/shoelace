# Radio Group

[component-header:sl-radio-group]

Radio groups are used to group multiple [radios](/components/radio) or [radio buttons](/components/radio-button) so they function as a single form control.

```html preview
<sl-radio-group label="Select an option" value="1">
  <sl-radio value="1">Option 1</sl-radio>
  <sl-radio value="2">Option 2</sl-radio>
  <sl-radio value="3">Option 3</sl-radio>
</sl-radio-group>
```

```jsx react
import { SlRadio, SlRadioGroup } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlRadioGroup label="Select an option" value="1">
    <SlRadio value="1">Option 1</SlRadio>
    <SlRadio value="2">Option 2</SlRadio>
    <SlRadio value="3">Option 3</SlRadio>
  </SlRadioGroup>
);
```

## Examples

### Showing the Label

You can show the fieldset and legend that wraps the radio group using the `fieldset` attribute. If you don't use this option, you should still provide a label so screen readers announce the control correctly.

```html preview
<sl-radio-group label="Select an option" value="1" fieldset>
  <sl-radio name="option" value="1">Option 1</sl-radio>
  <sl-radio name="option" value="2">Option 2</sl-radio>
  <sl-radio name="option" value="3">Option 3</sl-radio>
</sl-radio-group>
```

```jsx react
import { SlRadio, SlRadioGroup } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlRadioGroup label="Select an option" value="1" fieldset>
    <SlRadio name="option" value="1">
      Option 1
    </SlRadio>
    <SlRadio name="option" value="2">
      Option 2
    </SlRadio>
    <SlRadio name="option" value="3">
      Option 3
    </SlRadio>
  </SlRadioGroup>
);
```

### Radio Buttons

[Radio buttons](/components/radio-button) offer an alternate way to display radio controls. In this case, an internal [button group](/components/button-group) is used to group the buttons into a single, cohesive control.

```html preview
<sl-radio-group label="Select an option" value="1">
  <sl-radio-button name="option" value="1">Option 1</sl-radio-button>
  <sl-radio-button name="option" value="2">Option 2</sl-radio-button>
  <sl-radio-button name="option" value="3">Option 3</sl-radio-button>
</sl-radio-group>
```

```jsx react
import { SlRadioButton, SlRadioGroup } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlRadioGroup label="Select an option" value="1">
    <SlRadioButton name="option" value="1">
      Option 1
    </SlRadioButton>
    <SlRadioButton name="option" value="2">
      Option 2
    </SlRadioButton>
    <SlRadioButton name="option" value="3">
      Option 3
    </SlRadioButton>
  </SlRadioGroup>
);
```

### Custom Validity

Use the `setCustomValidity()` method to set a custom validation message. This will prevent the form from submitting and make the browser display the error message you provide. To clear the error, call this function with an empty string.

```html preview
<form class="custom-validity">
  <sl-radio-group label="Select an option" value="1">
    <sl-radio name="a" value="1">Not me</sl-radio>
    <sl-radio name="a" value="2">Me neither</sl-radio>
    <sl-radio name="a" value="3">Choose me</sl-radio>
  </sl-radio-group>
  <br />
  <sl-button type="submit" variant="primary">Submit</sl-button>
</form>
<script>
  const form = document.querySelector('.custom-validity');
  const radioGroup = form.querySelector('sl-radio-group');
  const errorMessage = 'You must choose the last option';
  // Set initial validity as soon as the element is defined
  customElements.whenDefined('sl-radio-group').then(() => {
    radioGroup.setCustomValidity(errorMessage);
  });
  // Update validity when a selection is made
  form.addEventListener('sl-change', () => {
    const isValid = radioGroup.value === '3';
    radioGroup.setCustomValidity(isValid ? '' : errorMessage);
  });
  // Handle form submit
  form.addEventListener('submit', event => {
    event.preventDefault();
    alert('All fields are valid!');
  });
</script>
```

```jsx react
import { useEffect, useRef } from 'react';
import { SlButton, SlIcon, SlRadio, SlRadioGroup } from '@shoelace-style/shoelace/dist/react';
const App = () => {
  const radio = useRef(null);
  const errorMessage = 'You must choose this option';
  function handleChange(event) {
    radio.current.setCustomValidity(radio.current.checked ? '' : errorMessage);
  }
  function handleSubmit(event) {
    event.preventDefault();
    alert('All fields are valid!');
  }
  useEffect(() => {
    radio.current.setCustomValidity(errorMessage);
  }, []);
  return (
    <form class="custom-validity" onSubmit={handleSubmit}>
      <SlRadioGroup label="Select an option" value="1">
        <SlRadio name="a" value="1" onSlChange={handleChange}>
          Not me
        </SlRadio>
        <SlRadio name="a" value="2" onSlChange={handleChange}>
          Me neither
        </SlRadio>
        <SlRadio ref={radio} name="a" value="3" onSlChange={handleChange}>
          Choose me
        </SlRadio>
      </SlRadioGroup>
      <br />
      <SlButton type="submit" variant="primary">
        Submit
      </SlButton>
    </form>
  );
};
```

[component-metadata:sl-radio-group]
