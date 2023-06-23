---
meta:
  title: File Input
  description: A description of the component goes here.
layout: component
---

```html:preview
<form id="upload-form">
  <sl-file-input label="Upload a file" help-text="Select some files" name="myfiles" multiple></sl-file-input>

  <br />

  <sl-button variant="primary" type="submit">Submit</sl-button>
</form>

<script>
  const form = document.getElementById('upload-form');

  form.addEventListener('submit', event => {
    const formData = new FormData(form);

    event.preventDefault();

    for (const file of formData.values()) {
      console.log(file);
    }
  });
</script>
```

## Examples

### First Example

TODO

### Second Example

TODO

[component-metadata:sl-file-input]
