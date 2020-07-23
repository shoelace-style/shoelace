# Form

[component-header:sl-form]

Forms collect data that can easily be processed and sent to a server.

All of Shoelace's components make use of the [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) to encapsulate markup, styles, and behavior. One caveat of this approach is that native `<form>` elements don't recognize Shoelace form controls.

This component solves that problem by serializing _both_ Shoelace form controls and native form controls. The resulting form data is exposed in the `slSubmit` event in a [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) object.

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

?> Shoelace forms don't make use of `action` and `method` attributes and they don't submit automatically like native forms. To handle submission, you need to listen for the `slSubmit` event as shown in the example above.

[component-metadata:sl-form]
