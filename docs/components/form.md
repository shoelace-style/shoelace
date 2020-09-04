# Form

[component-header:sl-form]

Forms collect data that can easily be processed and sent to a server.

All Shoelace components make use of a [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) to encapsulate markup, styles, and behavior. One caveat of this approach is that native `<form>` elements will not recognize Shoelace form controls.

This component solves that problem by serializing _both_ Shoelace form controls and native form controls when the form is submitted. The resulting form data is exposed in the `slSubmit` event as a [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) object.

Shoelace forms don't make use of `action` and `method` attributes and they don't submit the same was as native forms. To handle submission, you need to listen for the `slSubmit` event as shown in the example below and make an XHR request with the resulting form data.

```html preview
<sl-form class="form-overview">
  <sl-input name="name" type="text" label="Name"></sl-input>
  <br>
  <sl-select name="favorite" label="Select your favorite">
    <sl-menu-item value="birds">Birds</sl-menu-item>
    <sl-menu-item value="cats">Cats</sl-menu-item>
    <sl-menu-item value="dogs">Dogs</sl-menu-item>
  </sl-select>
  <br>
  <sl-checkbox name="agree" value="yes">
    I totally agree
  </sl-checkbox>
  <br><br>
  <sl-button submit>Submit</sl-button>
</sl-form>

<script>
  const form = document.querySelector('.form-overview');

  // Watch for the slSubmit event
  form.addEventListener('slSubmit', event => {
    const formData = event.detail.formData;
    let output = '';

    //
    // Example 1: Post data to a server and wait for a JSON response
    //
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(result => {
      console.log('Success:', result);
    })
    .catch(error => {
      console.error('Error:', error);
    });

    //
    // Example 2: Output all form control names + values
    //
    for (const entry of formData.entries()) {
      output += `${entry[0]}: ${entry[1]}\n`;
    }
    alert(output);

    //
    // Example 3: Get all form controls that were serialized as 
    // an array of HTML elements
    //
    console.log(event.detail.formControls);
  });
</script>
```

## Form Control Validation

Client-side validation can be enabled through the browser's [constraint validations API](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation) for many form controls. You can enable it using props such as `required`, `pattern`, `minlength`, and `maxlength`. As the user interacts with the form control, the `invalid` attribute will reflect its validity based on its current value and the constraints that have been defined.

When a form control is invalid, the containing form will not be submitted. Instead, the browser will show the user a relevant error message. If you don't want to use cilent-side validation, you can suppress this behavior by adding `novalidate` to the `<sl-form>` element.

Form controls that support validation include [`sl-input`](/components/input), [`sl-textarea`](/components/textarea), [`sl-select`](/components/select), and [`sl-checkbox`](/components/checkbox). Not all validation props are available for every component. Refer to each component's documentation to see which validation props it supports.

Note that validity is not checked until the user interacts with the control or its containing form is submitted. This prevents required controls from being rendered as invalid right away, which can result in a poor user experience. If you need this behavior, set the `invalid` attribute initially.

!> Client-side validation can be used to improve the UX of forms, but it is not a replacement for server-side validation. **You should always validate and sanitize user input on the server!**

### Required Fields

To make a field required, use the `required` prop. The form will not be submitted if a required form control is empty.

```html preview
<sl-form class="input-validation-required">
  <sl-input name="name" label="Name" required></sl-input>
  <br>
  <sl-select label="Favorite Animal" clearable required>
    <sl-menu-item value="birds">Birds</sl-menu-item>
    <sl-menu-item value="cats">Cats</sl-menu-item>
    <sl-menu-item value="dogs">Dogs</sl-menu-item>
    <sl-menu-item value="other">Other</sl-menu-item>
  </sl-select>
  <br>
  <sl-textarea name="comment" label="Comment" required></sl-textarea>
  <br>
  <sl-checkbox required>Check me before submitting</sl-checkbox>
  <br><br>
  <sl-button type="primary" submit>Submit</sl-button>
</sl-form>

<script>
  const form = document.querySelector('.input-validation-required');
  form.addEventListener('slSubmit', () => alert('All fields are valid!'));
</script>
```

### Input Patterns

To restrict a value to a specific [pattern](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern), use the `pattern` attribute. This example only allows the letters A-Z, so the form will not submit if a number or symbol is entered. This only works with `<sl-input>` elements.

```html preview
<sl-form class="input-validation-pattern">
  <sl-input name="letters" required label="Letters" pattern="[A-Za-z]+"></sl-input>
  <br>
  <sl-button type="primary" submit>Submit</sl-button>
</sl-form>

<script>
  const form = document.querySelector('.input-validation-pattern');
  form.addEventListener('slSubmit', () => alert('All fields are valid!'));
</script>
```

### Input Types

Some input types will automatically trigger constraints, such as `email` and `url`.

```html preview
<sl-form class="input-validation-type">
  <sl-input type="email" label="Email" placeholder="you@example.com" required></sl-input>
  <br>
  <sl-input type="url" label="URL" placeholder="https://example.com/" required></sl-input>
  <br>
  <sl-button type="primary" submit>Submit</sl-button>
</sl-form>

<script>
  const form = document.querySelector('.input-validation-type');
  form.addEventListener('slSubmit', () => alert('All fields are valid!'));
</script>
```

### Custom Validation

To create a custom validation error, use the `setCustomValidity` method. The form will not be submitted when this method is called with anything other than an empty string, and its message will be shown by the browser as the validation error. To make the input valid again, call the method a second time with an empty string as the argument.

```html preview
<sl-form class="input-validation-custom">
  <sl-input label="Type 'shoelace'" required></sl-input>
  <br>
  <sl-button type="primary" submit>Submit</sl-button>
</sl-form>

<script>
  const form = document.querySelector('.input-validation-custom');
  const input = form.querySelector('sl-input');

  form.addEventListener('slSubmit', () => alert('All fields are valid!'));
  input.addEventListener('slInput', () => {
    if (input.value === 'shoelace') {
      input.setCustomValidity('');
    } else {
      input.setCustomValidity('Hey, you\'re supposed to type \'shoelace\' before submitting this!');
    }
  });
</script>
```

### Custom Validation Styles

The `invalid` attribute reflects the form control's validity, so you can style invalid fields using the `[invalid]` selector. The example below demonstrates how you can give erroneous fields a different appearance. Type something other than "shoelace" to demonstrate this.

```html preview
<sl-input class="custom-input" required pattern="shoelace">
  <small slot="help-text">Please enter "shoelace" to continue</small>
</sl-input>

<style>
  .custom-input[invalid]:not([disabled])::part(label),
  .custom-input[invalid]:not([disabled])::part(help-text) {
    color: var(--sl-color-danger-40);
  }

  .custom-input[invalid]:not([disabled])::part(base) {      
    border-color: var(--sl-color-danger-50);
  } 

  .custom-input[invalid] {
    --focus-ring: 0 0 0 var(--sl-focus-ring-width)
      hsla(
        var(--sl-color-danger-hue),
        var(--sl-color-danger-saturation),
        var(--sl-focus-ring-lightness),
        var(--sl-focus-ring-alpha)
      );
  }
</style>
```

### Third-party Validation

To opt out of the browser's built-in validation and use your own, add the `novalidate` attribute to the form. This will ignore all constraints and prevent the browser from showing its own warnings when form controls are invalid.

Remember that the `invalid` prop on form controls reflects validity as defined by the [constraint validation API](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation). You can set it initially, but the `invalid` prop will update as the user interacts with the form control. As such, you should not rely on it to set invalid styles using a custom validation library.

Instead, toggle a class or data attribute and target them in your stylesheet as shown below.

```html
<sl-form novalidate>
  <sl-input class="invalid"></sl-input>
  <sl-input data-invalid></sl-input>
</sl-form>

<style>
  sl-input.invalid {
    ...
  }

  sl-input[data-invalid] {
    ...
  }
</style>
```

[component-metadata:sl-form]
