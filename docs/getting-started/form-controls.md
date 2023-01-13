# Form Controls

Every Shoelace component makes use of a [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) to encapsulate markup, styles, and behavior. One caveat of this approach is that native `<form>` elements do not recognize form controls located inside a shadow root.

Shoelace solves this problem by using the [`formdata`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/formdata_event) event, which is [available in all modern browsers](https://caniuse.com/mdn-api_htmlformelement_formdata_event). This means, when a form is submitted, Shoelace form controls will automatically append their values to the `FormData` object that's used to submit the form. In most cases, things will "just work." However, if you're using a form serialization library, it might need to be adapted to recognize Shoelace form controls.

?> Shoelace uses event listeners to intercept the form's `formdata` and `submit` events. This allows it to inject data and trigger validation as necessary. If you're also attaching an event listener to the form, _you must attach it after Shoelace form controls are connected to the DOM_, otherwise your logic will run before Shoelace has a chance to inject form data and validate form controls.

## Data Serialization

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

## Constraint Validation

Client-side validation can be enabled through the browser's [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation) for Shoelace form controls. You can activate it using attributes such as `required`, `pattern`, `minlength`, `maxlength`, etc. Shoelace implements many of the same attributes as native form controls, but check the documentation for a list of supported properties for each component.

If you don't want to use client-side validation, you can suppress this behavior by adding `novalidate` to the surrounding `<form>` element.

?> If this syntax looks unfamiliar, don't worry! Most of what you're learning on this page is platform knowledge that applies to regular form controls, too.

!> Client-side validation can be used to improve the UX of forms, but it is not a replacement for server-side validation. **You should always validate and sanitize user input on the server!**

### Required Fields

To make a field required, use the `required` attribute. Required fields will automatically receive a `*` after their labels. This is configurable through the `--sl-input-required-content` custom property.

The form will not be submitted if a required field is incomplete.

```html preview
<form class="input-validation-required">
  <sl-input name="name" label="Name" required></sl-input>
  <br />
  <sl-select label="Favorite Animal" clearable required>
    <sl-option value="birds">Birds</sl-option>
    <sl-option value="cats">Cats</sl-option>
    <sl-option value="dogs">Dogs</sl-option>
    <sl-option value="other">Other</sl-option>
  </sl-select>
  <br />
  <sl-textarea name="comment" label="Comment" required></sl-textarea>
  <br />
  <sl-checkbox required>Check me before submitting</sl-checkbox>
  <br /><br />
  <sl-button type="submit" variant="primary">Submit</sl-button>
</form>

<script type="module">
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
  <sl-button type="reset" variant="default">Reset</sl-button>
</form>

<script type="module">
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
  <sl-input type="email" label="Email" placeholder="you@example.com" required></sl-input>
  <br />
  <sl-input type="url" label="URL" placeholder="https://example.com/" required></sl-input>
  <br />
  <sl-button type="submit" variant="primary">Submit</sl-button>
  <sl-button type="reset" variant="default">Reset</sl-button>
</form>

<script type="module">
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
      <SlInput type="email" label="Email" placeholder="you@example.com" required />
      <br />
      <SlInput type="url" label="URL" placeholder="https://example.com/" required />
      <br />
      <SlButton type="submit" variant="primary">
        Submit
      </SlButton>
    </form>
  );
};
```

### Custom Error Messages

To create a custom validation error, pass a non-empty string to the `setCustomValidity()` method. This will override any existing validation constraints. The form will not be submitted when a custom validity is set and the browser will show a validation error when the containing form is submitted. To make the input valid again, call `setCustomValidity()` again with an empty string.

```html preview
<form class="input-validation-custom">
  <sl-input label="Type “shoelace”" required></sl-input>
  <br />
  <sl-button type="submit" variant="primary">Submit</sl-button>
  <sl-button type="reset" variant="default">Reset</sl-button>
</form>

<script type="module">
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

?> Custom validation can be applied to any form control that supports the `setCustomValidity()` method. It is not limited to inputs and textareas.

## Custom Validation Styles

Due to the many ways form controls are used, Shoelace doesn't provide out of the box validation styles for form controls as part of its default theme. Instead, the following attributes will be applied to reflect a control's validity as users interact with it. You can use them to create custom styles for any of the validation states you're interested in.

- `data-required` - the form control is required
- `data-optional` - the form control is optional
- `data-invalid` - the form control is currently invalid
- `data-valid` - the form control is currently valid
- `data-user-invalid` - the form control is currently invalid and the user has interacted with it
- `data-user-valid` - the form control is currently valid and the user has interacted with it

These attributes map to the browser's built-in pseudo classes for validation: [`:required`](https://developer.mozilla.org/en-US/docs/Web/CSS/:required), [`:optional`](https://developer.mozilla.org/en-US/docs/Web/CSS/:optional), [`:invalid`](https://developer.mozilla.org/en-US/docs/Web/CSS/:invalid), [`:valid`](https://developer.mozilla.org/en-US/docs/Web/CSS/:valid), and the proposed [`:user-invalid`](https://developer.mozilla.org/en-US/docs/Web/CSS/:user-invalid) and [`:user-valid`](https://developer.mozilla.org/en-US/docs/Web/CSS/:user-valid).

?> In the future, data attributes will be replaced with custom pseudo classes such as `:--valid` and `:--invalid`. Shoelace is using data attributes as a workaround until browsers support custom states through [`ElementInternals.states`](https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/states).

### Styling Invalid Form Controls

You can target validity using any of the aforementioned data attributes, but it's usually preferable to target `data-user-invalid` and `data-user-valid` since they get applied only after a user interaction such as typing or submitting. This prevents empty form controls from appearing invalid immediately, which often results in a poor user experience.

This example demonstrates custom validation styles using `data-user-invalid` and `data-user-valid`. Try Typing in the fields to see how validity changes with user input.

```html preview
<form class="validity-styles">
  <sl-input
    name="name"
    label="Name"
    help-text="What would you like people to call you?"
    autocomplete="off"
    required
  ></sl-input>

  <sl-select label="Favorite Animal" help-text="Select the best option." clearable required>
    <sl-option value="birds">Birds</sl-option>
    <sl-option value="cats">Cats</sl-option>
    <sl-option value="dogs">Dogs</sl-option>
    <sl-option value="other">Other</sl-option>
  </sl-select>

  <sl-button type="submit" variant="primary">Submit</sl-button>
  <sl-button type="reset" variant="default">Reset</sl-button>
</form>

<script type="module">
  const form = document.querySelector('.validity-styles');
  form.addEventListener('submit', event => {
    event.preventDefault();
    alert('All fields are valid!');
  });
</script>

<style>
  .validity-styles sl-input,
  .validity-styles sl-select {
    margin-bottom: var(--sl-spacing-medium);
  }

  /* user invalid styles */
  .validity-styles sl-input[data-user-invalid]::part(base),
  .validity-styles sl-select[data-user-invalid]::part(combobox) {
    border-color: var(--sl-color-danger-600);
  }

  .validity-styles [data-user-invalid]::part(form-control-label),
  .validity-styles [data-user-invalid]::part(form-control-help-text) {
    color: var(--sl-color-danger-700);
  }

  .validity-styles sl-input:focus-within[data-user-invalid]::part(base),
  .validity-styles sl-select:focus-within[data-user-invalid]::part(combobox) {
    border-color: var(--sl-color-danger-600);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-color-danger-300);
  }

  /* User valid styles */
  .validity-styles sl-input[data-user-valid]::part(base),
  .validity-styles sl-select[data-user-valid]::part(combobox) {
    border-color: var(--sl-color-success-600);
  }

  .validity-styles [data-user-valid]::part(form-control-label),
  .validity-styles [data-user-valid]::part(form-control-help-text) {
    color: var(--sl-color-success-700);
  }

  .validity-styles sl-input:focus-within[data-user-valid]::part(base),
  .validity-styles sl-select:focus-within[data-user-valid]::part(combobox) {
    border-color: var(--sl-color-success-600);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-color-success-300);
  }
</style>
```

## Getting Associated Form Controls

At this time, using [`HTMLFormElement.elements`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/elements) will not return Shoelace form controls because the browser is unaware of their status as custom element form controls. Fortunately, Shoelace provides an `elements()` function that does something very similar. However, instead of returning an [`HTMLFormControlsCollection`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormControlsCollection), it returns an array of HTML and Shoelace form controls in the order they appear in the DOM.

```js
import { getFormControls } from '@shoelace-style/shoelace/dist/utilities/form.js';

const form = document.querySelector('#my-form');
const formControls = getFormControls(form);

console.log(formControls); // e.g. [input, sl-input, ...]
```

?> You probably don't need this function! If you're gathering form data for submission, you probably want to use [Data Serialization](#data-serializing) instead.
