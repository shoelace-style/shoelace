# Form

[component-header:sl-form]

Forms collect data that can easily be processed or sent to a server.

All of Shoelace's components make use of the [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) to encapsulate markup, style, and behavior. One caveat of this approach is that native `<form>` elements don't recognize Shoelace form controls. This component solves that problem by serializing _both_ Shoelace form controls and native form controls.

```html preview
<sl-form class="form-overview">
  <sl-input name="name" type="text" label="Name"></sl-input>
  <br>
  <sl-select name="options" label="Select your favorite">
    <sl-menu-item value="birds">Birds</sl-menu-item>
    <sl-menu-item value="cats">Cats</sl-menu-item>
    <sl-menu-item value="dogs">Dogs</sl-menu-item>
  </sl-select>
  <br>
  <sl-checkbox name="awesome" value="yes!">
    I agree that Shoelace is awesome
  </sl-checkbox>
  <br><br>
  <sl-button submit>Submit</sl-button>
</sl-form>

<script>
  const form = document.querySelector('.form-overview');
  
  form.addEventListener('slSubmit', event => {
    const formData = event.detail.formData;
    const formControls = event.detail.formControls;
    
    // do something with the form data...
    for( const entry of formData.entries()) {
      console.log(entry);
    }

    // ...or do something with the raw form controls
    console.log(formControls);
  });
</script>
```

?> Shoelace forms don't make use of `action` and `method` attributes, and they don't submit automatically like native forms. To handle submission, you need to listen for the `slSubmit` event as shown in the example's source above.

[component-metadata:sl-form]

## Examples

### GET

TODO

### POST

TODO

### Native Form Controls

TODO
