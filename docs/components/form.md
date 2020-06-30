# Form

[component-header:sl-form]

Forms...

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.


TODO

- Since no native [type="submit"] exists, we need to listen for enter being pressed in native elements. Might as well just listen for it on sl elements too.




```html preview
<sl-form class="form-overview">
  <sl-input name="name" type="text" placeholder="Name"></sl-input>

  <br><br>

  <sl-textarea name="bio" placeholder="Bio"></sl-textarea>

  <br><br>

  <input type="text" name="native-text" placeholder="Native Textfield">
  
  <br><br>

  <input type="file" name="upload">

  <br><br>

  <sl-button type="primary" submit>Submit</sl-button>
</sl-form>


<script>
  const form = document.querySelector('.form-overview');

  form.addEventListener('slSubmit', event => {
    form.getFormData().then(formData => {
      for (const entry of formData.entries()) {
        console.log(entry); 
      }      
    });
  });  
</script>
```

[component-metadata:sl-form]
