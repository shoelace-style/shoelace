# Form Controls

Every Shoelace component makes use of a [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) to encapsulate markup, styles, and behavior. One caveat of this approach is that native `<form>` elements do not recognize form controls located inside a shadow root.

Shoelace solves this problem by using the [`formdata`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/formdata_event) event, which is [available in all modern browsers](https://caniuse.com/mdn-api_htmlformelement_formdata_event). This means, when a form is submitted, Shoelace form controls will automatically append their values to the `FormData` object that's used to submit the form. In most cases, things will "just work." However, if you're using a form serialization library, it might need to be adapted to recognize Shoelace form controls.

?> If you're using an older browser that doesn't support the `formdata` event, a lightweight polyfill will be automatically applied to ensure forms submit as expected.

## Form Serialization

Serialization is just a fancy word for collecting form data. If you're relying on standard form submissions, e.g. `<form action="...">`, you can probably skip this section. However, most modern apps use the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) or a library such as [axios](https://github.com/axios/axios) to submit forms using JavaScript.

The [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) interface offers a standard way to serialize forms in the browser. You can create a `FormData` object from any `<form>` element like this.

```js
const form = document.querySelector('form');
const data = new FormData(form);

// All form control data is available in a FormData object
```

However, some folks find `FormData` tricky to work with or they need to pass a JSON payload to their server. To accommodate this, Shoelace offers a serialization utility that gathers form data and returns a simple JavaScript object instead.

```js
import { serialize } from '@shoelace-style/shoelace/dist/utilities/form.js';

const form = document.querySelector('form');
const data = serialize(form);

// All form control data is available in a plain object
```

This results in an object with name/value pairs that map to each form control. If more than one form control shares the same name, the values will be passed as an array, e.g. `{ name: ['value1', 'value2'] }`.

## Form Control Validation

Client-side validation can be enabled through the browser's [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation) for Shoelace form controls. You can activate it using attributes such as `required`, `pattern`, `minlength`, and `maxlength`. Shoelace implements many of the same attributes as native form controls, but check each form control's documentation for a list of all supported properties.

As the user interacts with a form control, its `invalid` attribute will reflect its validity based on its current value and the constraints that have been defined. When a form control is invalid, the containing form will not be submitted. Instead, the browser will show the user a relevant error message. If you don't want to use client-side validation, you can suppress this behavior by adding `novalidate` to the surrounding `<form>` element.

All form controls support validation, but not all validation props are available for every component. Refer to a component's documentation to see which validation props it supports.

!> Client-side validation can be used to improve the UX of forms, but it is not a replacement for server-side validation. **You should always validate and sanitize user input on the server!**

### Required Fields

To make a field required, use the `required` prop. The form will not be submitted if a required form control is empty.

```html preview
<form class="input-validation-required">
  <sl-input name="name" label="Name" required></sl-input>
  <br />
  <sl-select label="Favorite Animal" clearable required>
    <sl-menu-item value="birds">Birds</sl-menu-item>
    <sl-menu-item value="cats">Cats</sl-menu-item>
    <sl-menu-item value="dogs">Dogs</sl-menu-item>
    <sl-menu-item value="other">Other</sl-menu-item>
  </sl-select>
  <br />
  <sl-textarea name="comment" label="Comment" required></sl-textarea>
  <br />
  <sl-checkbox required>Check me before submitting</sl-checkbox>
  <br /><br />
  <sl-button type="submit" variant="primary">Submit</sl-button>
</form>

<script>
  const form = document.querySelector('.input-validation-required');
  form.addEventListener('submit', event => {
    event.preventDefault();
    alert('All fields are valid!');
  });
</script>
```

```jsx react
import { SlButton, SlCheckbox, SlInput, SlMenuItem, SlSelect, SlTextarea } from '@shoelace-style/shoelace/dist/react';

const App = () => {
  function handleSubmit(event) {
    event.preventDefault();
    alert('All fields are valid!');
  }

  return (
    <form onSubmit={handleSubmit}>
      <SlInput name="name" label="Name" required />
      <br />
      <SlSelect label="Favorite Animal" clearable required>
        <SlMenuItem value="birds">Birds</SlMenuItem>
        <SlMenuItem value="cats">Cats</SlMenuItem>
        <SlMenuItem value="dogs">Dogs</SlMenuItem>
        <SlMenuItem value="other">Other</SlMenuItem>
      </SlSelect>
      <br />
      <SlTextarea name="comment" label="Comment" required></SlTextarea>
      <br />
      <SlCheckbox required>Check me before submitting</SlCheckbox>
      <br />
      <br />
      <SlButton type="submit" variant="primary">
        Submit
      </SlButton>
    </form>
  );
};
```

### Input Patterns

To restrict a value to a specific [pattern](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern), use the `pattern` attribute. This example only allows the letters A-Z, so the form will not submit if a number or symbol is entered. This only works with `<sl-input>` elements.

```html preview
<form class="input-validation-pattern">
  <sl-input name="letters" required label="Letters" pattern="[A-Za-z]+"></sl-input>
  <br />
  <sl-button type="submit" variant="primary">Submit</sl-button>
</form>

<script>
  const form = document.querySelector('.input-validation-pattern');
  form.addEventListener('submit', event => {
    event.preventDefault();
    alert('All fields are valid!');
  });
</script>
```

```jsx react
import { SlButton, SlInput } from '@shoelace-style/shoelace/dist/react';

const App = () => {
  function handleSubmit(event) {
    event.preventDefault();
    alert('All fields are valid!');
  }

  return (
    <form onSubmit={handleSubmit}>
      <SlInput name="letters" required label="Letters" pattern="[A-Za-z]+" />
      <br />
      <SlButton type="submit" variant="primary">
        Submit
      </SlButton>
    </form>
  );
};
```

### Input Types

Some input types will automatically trigger constraints, such as `email` and `url`.

```html preview
<form class="input-validation-type">
  <sl-input variant="email" label="Email" placeholder="you@example.com" required></sl-input>
  <br />
  <sl-input variant="url" label="URL" placeholder="https://example.com/" required></sl-input>
  <br />
  <sl-button type="submit" variant="primary">Submit</sl-button>
</form>

<script>
  const form = document.querySelector('.input-validation-type');
  form.addEventListener('submit', event => {
    event.preventDefault();
    alert('All fields are valid!');
  });
</script>
```

```jsx react
import { SlButton, SlInput } from '@shoelace-style/shoelace/dist/react';

const App = () => {
  function handleSubmit(event) {
    event.preventDefault();
    alert('All fields are valid!');
  }

  return (
    <form onSubmit={handleSubmit}>
      <SlInput variant="email" label="Email" placeholder="you@example.com" required />
      <br />
      <SlInput variant="url" label="URL" placeholder="https://example.com/" required />
      <br />
      <SlButton type="submit" variant="primary">
        Submit
      </SlButton>
    </form>
  );
};
```

### Custom Validation

To create a custom validation error, use the `setCustomValidity` method. The form will not be submitted when this method is called with anything other than an empty string, and its message will be shown by the browser as the validation error. To make the input valid again, call the method a second time with an empty string as the argument.

```html preview
<form class="input-validation-custom">
  <sl-input label="Type 'shoelace'" required></sl-input>
  <br />
  <sl-button type="submit" variant="primary">Submit</sl-button>
</form>

<script>
  const form = document.querySelector('.input-validation-custom');
  const input = form.querySelector('sl-input');

  form.addEventListener('submit', event => {
    event.preventDefault();
    alert('All fields are valid!');
  });

  input.addEventListener('sl-input', () => {
    if (input.value === 'shoelace') {
      input.setCustomValidity('');
    } else {
      input.setCustomValidity("Hey, you're supposed to type 'shoelace' before submitting this!");
    }
  });
</script>
```

```jsx react
import { useRef, useState } from 'react';
import { SlButton, SlInput } from '@shoelace-style/shoelace/dist/react';

const App = () => {
  const input = useRef(null);
  const [value, setValue] = useState('');

  function handleInput(event) {
    setValue(event.target.value);

    if (event.target.value === 'shoelace') {
      input.current.setCustomValidity('');
    } else {
      input.current.setCustomValidity("Hey, you're supposed to type 'shoelace' before submitting this!");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    alert('All fields are valid!');
  }

  return (
    <form onSubmit={handleSubmit}>
      <SlInput ref={input} label="Type 'shoelace'" required value={value} onSlInput={handleInput} />
      <br />
      <SlButton type="submit" variant="primary">
        Submit
      </SlButton>
    </form>
  );
};
```

### Custom Validation Styles

The `invalid` attribute reflects the form control's validity, so you can style invalid fields using the `[invalid]` selector. The example below demonstrates how you can give erroneous fields a different appearance. Type something other than "shoelace" to demonstrate this.

```html preview
<sl-input class="custom-input" label="Type Something" required pattern="shoelace">
  <small slot="help-text">Please enter "shoelace" to continue</small>
</sl-input>

<style>
  .custom-input[invalid]:not([disabled])::part(label),
  .custom-input[invalid]:not([disabled])::part(help-text) {
    color: var(--sl-color-danger-600);
  }

  .custom-input[invalid]:not([disabled])::part(base) {
    border-color: var(--sl-color-danger-500);
  }

  .custom-input[invalid]:focus-within::part(base) {
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-color-danger-500);
  }
</style>
```

```jsx react
import { SlInput } from '@shoelace-style/shoelace/dist/react';

const css = `
  .custom-input[invalid]:not([disabled])::part(label),
  .custom-input[invalid]:not([disabled])::part(help-text) {
    color: var(--sl-color-danger-600);
  }

  .custom-input[invalid]:not([disabled])::part(base) {      
    border-color: var(--sl-color-danger-500);
  } 

  .custom-input[invalid]:focus-within::part(base) {
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-color-danger-500);
  }
`;

const App = () => (
  <>
    <SlInput className="custom-input" required pattern="shoelace">
      <small slot="help-text">Please enter "shoelace" to continue</small>
    </SlInput>

    <style>{css}</style>
  </>
);
```

### Third-party Validation

To opt out of the browser's built-in validation and use your own, add the `novalidate` attribute to the form. This will ignore all constraints and prevent the browser from showing its own warnings when form controls are invalid.

Remember that the `invalid` attribute on form controls reflects validity as defined by the [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation). You can set it initially, but the `invalid` attribute will update as the user interacts with the form control. As such, you should not rely on it to set invalid styles using a custom validation library.

Instead, toggle a class and target it in your stylesheet as shown below.

```html
<form novalidate>
  <sl-input class="invalid"></sl-input>
</form>

<style>
  sl-input.invalid {
    ...;
  }
</style>
```
