---
meta:
  title: Checkbox
  description: Checkboxes allow the user to toggle an option on or off.
layout: component
---

## Examples

### Basic Checkbox

```html:preview
<sl-checkbox>Checkbox</sl-checkbox>
```

```pug:slim
sl-checkbox Checkbox
```

```jsx:react
import SlCheckbox from '@teamshares/shoelace/dist/react/checkbox';

const App = () => <SlCheckbox>Checkbox</SlCheckbox>;
```

:::tip
This component works with standard `<form>` elements. Please refer to the section on [form controls](/getting-started/form-controls) to learn more about form submission and client-side validation.
:::

### Checked

Use the `checked` attribute to activate the checkbox.

```html:preview
<sl-checkbox checked>Checked</sl-checkbox>
```

```pug:slim
sl-checkbox checked="true" Checked
```

```jsx:react
import SlCheckbox from '@teamshares/shoelace/dist/react/checkbox';

const App = () => <SlCheckbox checked>Checked</SlCheckbox>;
```

### Indeterminate

Use the `indeterminate` attribute to make the checkbox indeterminate.

```html:preview
<sl-checkbox indeterminate>Indeterminate</sl-checkbox>
```

```pug:slim
sl-checkbox indeterminate="true" Indeterminate
```

```jsx:react
import SlCheckbox from '@teamshares/shoelace/dist/react/checkbox';

const App = () => <SlCheckbox indeterminate>Indeterminate</SlCheckbox>;
```

### Disabled

Use the `disabled` attribute to disable the checkbox.

```html:preview
<sl-checkbox disabled>Disabled</sl-checkbox>
```

```pug:slim
sl-checkbox disabled="true" Disabled
```

```jsx:react
import SlCheckbox from '@teamshares/shoelace/dist/react/checkbox';

const App = () => <SlCheckbox disabled>Disabled</SlCheckbox>;
```

### Sizes

Use the `size` attribute to change a checkbox's size.

```html:preview
<sl-checkbox size="small">Small</sl-checkbox>
<br />
<sl-checkbox size="medium">Medium</sl-checkbox>
<br />
<sl-checkbox size="large">Large</sl-checkbox>
```

```pug:slim
sl-checkbox size="small" Small
br
sl-checkbox size="medium" Medium
br
sl-checkbox size="large" Large
```

```jsx:react
import SlCheckbox from '@teamshares/shoelace/dist/react/checkbox';

const App = () => (
  <>
    <SlCheckbox size="small">Small</SlCheckbox>
    <br />
    <SlCheckbox size="medium">Medium</SlCheckbox>
    <br />
    <SlCheckbox size="large">Large</SlCheckbox>
  </>
);
```

### Contained

Use the `contained` attribute to add a container around the checkbox.

```html:preview
<sl-checkbox contained style="width: 100%;"> Checkbox </sl-checkbox>
<sl-checkbox contained disabled style="width: 100%;"> Disabled </sl-checkbox>
<sl-checkbox contained checked style="width: 100%;">
  Checked
  <div slot="description">A short description about this option</div>
</sl-checkbox>
```

```pug:slim
  sl-checkbox contained="true" style="width: 100%;" Checked
  sl-checkbox contained="true" disabled="true" style="width: 100%;" Disabled
  sl-checkbox contained="true" checked="true" style="width: 100%;" Checked
    div slot="description" A short description about this option
```

```jsx:react
import { SlRadio } from '@teamshares/shoelace/dist/react';
const App = () => (
  <>
    <SlCheckbox contained style="width: 100%;">
      Checked
    </SlCheckbox>
    <SlCheckbox contained disabled style="width: 100%;">
      Disabled
    </SlCheckbox>
    <SlCheckbox contained checked style="width: 100%;">
      Checked
      <div slot="description">A short description about this option</div>
    </SlCheckbox>
  </>
);
```

### Custom Validity

Use the `setCustomValidity()` method to set a custom validation message. This will prevent the form from submitting and make the browser display the error message you provide. To clear the error, call this function with an empty string.

```html:preview
<form class="custom-validity">
  <sl-checkbox>Check me</sl-checkbox>
  <br />
  <sl-button type="submit" variant="primary" style="margin-top: 1rem;">Submit</sl-button>
</form>
<script>
  const form = document.querySelector('.custom-validity');
  const checkbox = form.querySelector('sl-checkbox');
  const errorMessage = `Do not forget to check me!`;

  // Set initial validity as soon as the element is defined
  customElements.whenDefined('sl-checkbox').then(async () => {
    await checkbox.updateComplete;
    checkbox.setCustomValidity(errorMessage);
  });

  // Update validity on change
  checkbox.addEventListener('sl-change', () => {
    checkbox.setCustomValidity(checkbox.checked ? '' : errorMessage);
  });

  // Handle submit
  form.addEventListener('submit', event => {
    event.preventDefault();
    alert('All fields are valid!');
  });
</script>
```

```pug:slim
form.custom-validity
  sl-checkbox Check me
  br
  sl-button type="submit" variant="primary" style="margin-top: 1rem;" Submit

javascript:
  const form = document.querySelector(.custom-validity);
  const checkbox = form.querySelector(sl-checkbox);
  const errorMessage = `Do not forget to check me!`;

  // Set initial validity as soon as the element is defined
  customElements.whenDefined(sl-checkbox).then(() => {
    checkbox.setCustomValidity(errorMessage);
  });

  // Update validity on change
  checkbox.addEventListener(sl-change, () => {
    checkbox.setCustomValidity(checkbox.checked ?  : errorMessage);
  });

  // Handle submit
  form.addEventListener(submit, event => {
    event.preventDefault();
    alert(All fields are valid!);
  });
```

{% raw %}

```jsx:react
import { useEffect, useRef } from 'react';
import SlButton from '@teamshares/shoelace/dist/react/button';
import SlCheckbox from '@teamshares/shoelace/dist/react/checkbox';

const App = () => {
  const checkbox = useRef(null);
  const errorMessage = `Do not forget to check me!`;

  function handleChange() {
    checkbox.current.setCustomValidity(checkbox.current.checked ? '' : errorMessage);
  }

  function handleSubmit(event) {
    event.preventDefault();
    alert('All fields are valid!');
  }

  useEffect(() => {
    checkbox.current.setCustomValidity(errorMessage);
  }, []);

  return (
    <form class="custom-validity" onSubmit={handleSubmit}>
      <SlCheckbox ref={checkbox} onSlChange={handleChange}>
        Check me
      </SlCheckbox>
      <br />
      <SlButton type="submit" variant="primary" style={{ marginTop: '1rem' }}>
        Submit
      </SlButton>
    </form>
  );
};
```

{% endraw %}
