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

  <sl-select name="animal" label="Favorite Animal" help-text="Select the best option." clearable required>
    <sl-option value="birds">Birds</sl-option>
    <sl-option value="cats">Cats</sl-option>
    <sl-option value="dogs">Dogs</sl-option>
    <sl-option value="other">Other</sl-option>
  </sl-select>

  <sl-checkbox value="accept" required>Accept terms and conditions</sl-checkbox>

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
  .validity-styles sl-select,
  .validity-styles sl-checkbox {
    display: block;
    margin-bottom: var(--sl-spacing-medium);
  }

  /* user invalid styles */
  .validity-styles sl-input[data-user-invalid]::part(base),
  .validity-styles sl-select[data-user-invalid]::part(combobox),
  .validity-styles sl-checkbox[data-user-invalid]::part(control) {
    border-color: var(--sl-color-danger-600);
  }

  .validity-styles [data-user-invalid]::part(form-control-label),
  .validity-styles [data-user-invalid]::part(form-control-help-text),
  .validity-styles sl-checkbox[data-user-invalid]::part(label) {
    color: var(--sl-color-danger-700);
  }

  .validity-styles sl-checkbox[data-user-invalid]::part(control) {
    outline: none;
  }

  .validity-styles sl-input:focus-within[data-user-invalid]::part(base),
  .validity-styles sl-select:focus-within[data-user-invalid]::part(combobox),
  .validity-styles sl-checkbox:focus-within[data-user-invalid]::part(control) {
    border-color: var(--sl-color-danger-600);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-color-danger-300);
  }

  /* User valid styles */
  .validity-styles sl-input[data-user-valid]::part(base),
  .validity-styles sl-select[data-user-valid]::part(combobox),
  .validity-styles sl-checkbox[data-user-valid]::part(control) {
    border-color: var(--sl-color-success-600);
  }

  .validity-styles [data-user-valid]::part(form-control-label),
  .validity-styles [data-user-valid]::part(form-control-help-text),
  .validity-styles sl-checkbox[data-user-valid]::part(label) {
    color: var(--sl-color-success-700);
  }

  .validity-styles sl-checkbox[data-user-valid]::part(control) {
    background-color: var(--sl-color-success-600);
    outline: none;
  }

  .validity-styles sl-input:focus-within[data-user-valid]::part(base),
  .validity-styles sl-select:focus-within[data-user-valid]::part(combobox),
  .validity-styles sl-checkbox:focus-within[data-user-valid]::part(control) {
    border-color: var(--sl-color-success-600);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-color-success-300);
  }
</style>
```

## Inline Form Validation

You can switch from normal validation mode, where validation messages are presented by browser specific tooltips, to an inline validation mode where the validation messages are displayed below the form fields, normally in red color.
This can be achieved completely in userland with customizations using CSS and JavaScript.
Here's the same example as the previous one, but this time we use inline form validation.

```html preview
<sl-animation class="animation-inline-validation" name="shakeX" duration="1000" iterations="1" easing="easeInOut">
  <form class="inline-validation">
    <sl-input
      name="name"
      label="Name"
      help-text="What would you like people to call you?"
      autocomplete="off"
      required
    ></sl-input>

    <sl-select name="animal" label="Favorite Animal" help-text="Select the best option." clearable required>
      <sl-option value="birds">Birds</sl-option>
      <sl-option value="cats">Cats</sl-option>
      <sl-option value="dogs">Dogs</sl-option>
      <sl-option value="other">Other</sl-option>
    </sl-select>

    <sl-checkbox value="accept" required>Accept terms and conditions</sl-checkbox>

    <sl-button type="submit" variant="primary">Submit</sl-button>
    <sl-button type="reset" variant="default">Reset</sl-button>
  </form>
</sl-animation>

<style>
  .inline-validation sl-input,
  .inline-validation sl-select,
  .inline-validation sl-checkbox {
    display: block;
    margin-bottom: var(--sl-spacing-medium);
  }

  /* user invalid styles */
  .inline-validation sl-input[data-user-invalid]::part(base),
  .inline-validation sl-select[data-user-invalid]::part(combobox),
  .inline-validation sl-checkbox[data-user-invalid]::part(control) {
    border-color: var(--sl-color-danger-600);
  }

  .inline-validation [data-user-invalid]::part(form-control-label),
  .inline-validation [data-user-invalid]::part(form-control-help-text),
  .inline-validation sl-checkbox[data-user-invalid]::part(label) {
    color: var(--sl-color-danger-700);
  }

  .inline-validation sl-checkbox[data-user-invalid]::part(control) {
    outline: none;
  }

  .inline-validation sl-input:focus-within[data-user-invalid]::part(base),
  .inline-validation sl-select:focus-within[data-user-invalid]::part(combobox),
  .inline-validation sl-checkbox:focus-within[data-user-invalid]::part(control) {
    border-color: var(--sl-color-danger-600);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-color-danger-300);
  }

  /* User valid styles */
  .inline-validation sl-input[data-user-valid]::part(base),
  .inline-validation sl-select[data-user-valid]::part(combobox),
  .inline-validation sl-checkbox[data-user-valid]::part(control) {
    border-color: var(--sl-color-success-600);
  }

  .inline-validation [data-user-valid]::part(form-control-label),
  .inline-validation [data-user-valid]::part(form-control-help-text),
  .inline-validation sl-checkbox[data-user-valid]::part(label) {
    color: var(--sl-color-success-700);
  }

  .inline-validation sl-checkbox[data-user-valid]::part(control) {
    background-color: var(--sl-color-success-600);
    outline: none;
  }

  .inline-validation sl-input:focus-within[data-user-valid]::part(base),
  .inline-validation sl-select:focus-within[data-user-valid]::part(combobox),
  .inline-validation sl-checkbox:focus-within[data-user-valid]::part(control) {
    border-color: var(--sl-color-success-600);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-color-success-300);
  }

  /* styles for the inline validation messages */

  .inline-validation :is([data-valid], [data-invalid]):not(sl-button)::after {
    display: block;
    font-size: var(--sl-font-size-small);
    color: var(--sl-color-danger-700);
    content: '\00a0';
  }

  .inline-validation [data-user-invalid]:not(sl-button)::after {
    content: attr(data-error);
  }
</style>

<script type="module">
  // With the following few lines of JavaScript code plus the app independent
  // utility function `activateInlineFormValidation` you can switch to
  // inline form validation mode.
  const form = document.querySelector('form.inline-validation');
  const animation = document.querySelector('sl-animation.animation-inline-validation');

  activateInlineFormValidation(form);

  form.addEventListener('submit', ev => {
    ev.preventDefault();
    alert('All fields are valid');
  });

  // I the user tries to submit invalid form data then shake the form
  // for a moment to indicate an submit error
  form.addEventListener(
    'sl-invalid',
    () => {
      animation.play = true;
    },
    true
  );

  /**
   * `activateInlineFormValidation` is a utility function for Shoelace based HTML
   * forms. It allows to switch from the usual tooltip based way of showing validation
   * errors to inline form validation where validation errors will be displayed below
   * the corresponding form controls.
   * This will be achieved by dynamically adding data attributes for error messages
   * to the form controls, if required. And to use the CSS function `attr(...)`
   * to retrieve the error messages in CSS (by using the `::after` pseudo-element).
   *
   * @param container  A DOM container element, for example the form element
   * @param errorAttribute  Name of the data attribute of the form controls to
   *                        store the current validation message. Default value is
   *                        'data-error'.
   *
   * @return  Returns a cancellation function to undo the changes that
   *          have been necessary to activate inline validation
   */
  function activateInlineFormValidation(container, errorAttribute = 'data-error') {
    let formControls = null; // type: Set<HTMLElement> | null

    // Checks whether an element is a Shoelace form control
    const isFormControl = elem => {
      return (
        elem instanceof HTMLElement &&
        typeof elem.checkValidity === 'function' &&
        typeof elem.reportValidity === 'function' &&
        typeof elem.validationMessage === 'string'
      );
    };

    // Updates the error data attribute of a given Shoelace form control,
    // depending on the form control's `validationMessage` property
    const updateValidationMessage = formControl => {
      const message = formControl.validationMessage;

      if (typeof message === 'string' && message !== '') {
        formControl.setAttribute(errorAttribute, message);
      } else {
        formControl.removeAttribute(errorAttribute);
      }
    };

    // Updates the error attributes for all Shoelace form controls
    // in the container and returns a set of all currently existing
    // Shoelace form controls in the container.
    const updateAllValidationMessages = () => {
      const ret = new Set();

      for (const elem of container.querySelectorAll(':is([data-valid], [data-invalid])')) {
        if (isFormControl(elem)) {
          ret.add(elem);
          updateValidationMessage(elem);
        }
      }

      return ret;
    };

    // --- event handlers --------------

    const onInvalid = event => {
      // Prevent the browser from showing the usual validation error tooltips
      event.preventDefault();
    };

    const onInput = event => {
      const target = event.target;

      if (formControls.has(target)) {
        // Update error attribute depending on validation message
        updateValidationMessage(target);
      }
    };

    // --- main ------------------------

    // Register event handlers
    container.addEventListener('sl-input', onInput);
    container.addEventListener('sl-invalid', onInvalid, true);

    // Register mutation observer to detect dynamically added
    // or removed form controls
    const observer = new MutationObserver(() => {
      // Update and remember current form controls
      const newFormControls = updateAllValidationMessages();

      // Cleanup previously removed form controls
      for (const formControl of formControls) {
        if (!newFormControls.has(formControl)) {
          formControl.removeAttribute(errorAttribute);
        }
      }

      formControls = newFormControls;
    });

    // Observe the whole DOM subtree of the container
    observer.observe(container, {
      childList: true,
      subtree: true
    });

    formControls = updateAllValidationMessages();

    // provide cancellation functionality

    let cancelled = false;

    const cancel = () => {
      if (cancelled) {
        return;
      }

      container.removeEventListener('sl-input', onInput);
      container.removeEventListener('sl-invalid', onInvalid, true);
      observer.disconnect();

      for (const formControl of formControls) {
        formControl.removeAttribute(errorAttribute);
      }

      formControls = null;
      cancelled = true;
    };

    return cancel;
  }
</script>
```

## Inline Form Validation (old version - to be deleted after testing) // TODO!!!!

```html preview
<sl-animation class="animation-inline-validation2" name="shakeX" duration="1000" iterations="1" easing="easeInOut">
  <form class="inline-validation2">
    <sl-radio-group name="salutation" label="Salutation" required>
      <sl-radio value="mrs">Mrs.</sl-radio>
      <sl-radio value="mr">Mr.</sl-radio>
      <sl-radio value="other">Other</sl-radio>
    </sl-radio-group>

    <sl-input name="name" label="Name" required></sl-input>
    <sl-input name="email" type="email" label="Email" required></sl-input>

    <sl-select name="country" label="Country" help-text="Only USA and Canada" clearable required>
      <sl-option value="US">USA</sl-option>
      <sl-option value="CA">Canada</sl-option>
    </sl-select>

    <label>
      Your favorite color *
      <sl-color-picker required>Your favorite color</sl-color-picker>
    </label>

    <sl-switch name="customer" required>Please approve that this is really your favorite color</sl-switch>

    <sl-textarea name="question" label="Your question" required></sl-textarea>

    <sl-checkbox name="accept" required>Accept terms and conditions</sl-checkbox>

    <sl-button type="submit" variant="primary">Submit</sl-button>
    <sl-button type="reset" variant="default">Reset</sl-button>
  </form>
</sl-animation>

<script type="module">
  const form = document.querySelector('form.inline-validation2');
  const animation = document.querySelector('sl-animation.animation-inline-validation2');

  updateAllValidationMessages(form);

  form.addEventListener('submit', event => {
    event.preventDefault();
    alert('All fields are valid!');
  });

  form.addEventListener(
    'sl-invalid',
    event => {
      updateValidationMessage(event.target);
      event.preventDefault();
      animation.play = true;
    },
    true
  );

  form.addEventListener('sl-input', event => {
    updateValidationMessage(event.target);
  });

  function isFormControl(elem) {
    return (
      elem.hasAttribute('data-valid') ||
      (elem.hasAttribute('data-invalid') && typeof elem.validationMessage === 'string')
    );
  }

  function updateValidationMessage(formControl) {
    if (isFormControl(formControl)) {
      formControl.setAttribute('data-error', formControl.validationMessage);
    }
  }

  function updateAllValidationMessages(container) {
    for (const elem of container.querySelectorAll('*')) {
      if (isFormControl(elem)) {
        updateValidationMessage(elem);
      }
    }
  }
</script>

<style>
  .inline-validation2 :is([data-valid], [data-invalid]):not(sl-button) {
    display: block;
    margin-bottom: var(--sl-spacing-small);
  }

  .inline-validation2 sl-radio-group sl-radio {
    display: inline-block;
    margin-right: 1rem;
  }

  /* user invalid styles */
  .inline-validation2 sl-input[data-user-invalid]::part(base),
  .inline-validation2 sl-select[data-user-invalid]::part(combobox) {
    border-color: var(--sl-color-danger-600);
  }

  .inline-validation2 sl-input:focus-within[data-user-invalid]::part(base),
  .inline-validation2 sl-textarea:focus-within[data-user-invalid]::part(base),
  .inline-validation2 sl-select:focus-within[data-user-invalid]::part(combobox) {
    border-color: var(--sl-color-danger-600);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-color-danger-300);
  }

  /* User valid styles */
  .inline-validation2 sl-input[data-user-valid]::part(base),
  .inline-validation2 sl-textarea[data-user-valid]::part(base),
  .inline-validation2 sl-select[data-user-valid]::part(combobox) {
    border-color: var(--sl-color-success-600);
  }

  .inline-validation2 sl-input:focus-within[data-user-valid]::part(base),
  .inline-validation2 sl-textarea:focus-within[data-user-valid]::part(base),
  .inline-validation2 sl-select:focus-within[data-user-valid]::part(combobox) {
    border-color: var(--sl-color-success-600);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-color-success-300);
  }

  .inline-validation2 :is([data-valid], [data-invalid]):not(sl-button)::after {
    display: block;
    font-size: var(--sl-font-size-small);
    color: var(--sl-color-danger-700);
    content: '\00a0';
  }

  .inline-validation2 [data-user-invalid]:not(sl-button)::after {
    content: attr(data-error);
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
