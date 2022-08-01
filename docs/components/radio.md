# Radio

[component-header:sl-radio]

Radios allow the user to select a single option from a group.

Radios are designed to be used with [radio groups](/components/radio-group).

```html preview
<sl-radio-group label="Select an option">
  <sl-radio name="option" value="1" checked>Option 1</sl-radio>
  <sl-radio name="option" value="2">Option 2</sl-radio>
  <sl-radio name="option" value="3">Option 3</sl-radio>
</sl-radio-group>
```

```jsx react
import { SlRadio, SlRadioGroup } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlRadioGroup label="Select an option">
    <SlRadio name="option" value="1" checked>
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

?> This component works with standard `<form>` elements. Please refer to the section on [form controls](/getting-started/form-controls) to learn more about form submission and client-side validation.

## Examples

### Checked

To set the initial checked state, use the `checked` attribute.

```html preview
<sl-radio-group label="Select an option">
  <sl-radio name="option" value="1" checked>Option 1</sl-radio>
  <sl-radio name="option" value="2">Option 2</sl-radio>
  <sl-radio name="option" value="3">Option 3</sl-radio>
</sl-radio-group>
```

```jsx react
import { SlRadio, SlRadioGroup } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlRadioGroup label="Select an option">
    <SlRadio name="option" value="1" checked>
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

### Disabled

Use the `disabled` attribute to disable a radio.

```html preview
<sl-radio-group label="Select an option">
  <sl-radio name="option" value="1" checked>Option 1</sl-radio>
  <sl-radio name="option" value="2">Option 2</sl-radio>
  <sl-radio name="option" value="3" disabled>Option 3</sl-radio>
</sl-radio-group>
```

```jsx react
import { SlRadio, SlRadioGroup } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlRadioGroup label="Select an option">
    <SlRadio name="option" value="1" checked>
      Option 1
    </SlRadio>
    <SlRadio name="option" value="2">
      Option 2
    </SlRadio>
    <SlRadio name="option" value="3" disabled>
      Option 3
    </SlRadio>
  </SlRadioGroup>
);
```

### Custom Validity

Use the `setCustomValidity()` method to set a custom validation message. This will prevent the form from submitting and make the browser display the error message you provide. To clear the error, call this function with an empty string.

```html preview
<form class="custom-validity">
  <sl-radio-group label="Select an option">
    <sl-radio name="a" value="1" checked>Not me</sl-radio>
    <sl-radio name="a" value="2">Me neither</sl-radio>
    <sl-radio name="a" value="3">Choose me</sl-radio>
  </sl-radio-group>
  <br />
  <sl-button type="submit" variant="primary">Submit</sl-button>
</form>
<script>
  const form = document.querySelector('.custom-validity');
  const radio = form.querySelectorAll('sl-radio')[2];
  const errorMessage = 'You must choose this option';
  // Set initial validity as soon as the element is defined
  customElements.whenDefined('sl-radio').then(() => {
    radio.setCustomValidity(errorMessage);
  });
  // Update validity when a selection is made
  form.addEventListener('sl-change', () => {
    const isValid = radio.checked;
    radio.setCustomValidity(isValid ? '' : errorMessage);
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
      <SlRadioGroup label="Select an option">
        <SlRadio name="a" value="1" checked onSlChange={handleChange}>
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

[component-metadata:sl-radio]
