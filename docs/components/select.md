# Select

[component-header:sl-select]

```html preview
<form id="f" target="_blank" method="GET">
  <sl-select name="single" label="Select One" clearable>
    <sl-option value="option-1">Option 1</sl-option>
    <sl-option value="option-2">Option 2</sl-option>
    <sl-option value="option-3">Option 3</sl-option>
    <sl-option value="option-4">Option 4</sl-option>
    <sl-option value="option-5">Option 5</sl-option>
    <sl-option value="option-6">Option 6</sl-option>
  </sl-select>

  <br />

  <sl-select name="many" label="Select Many" multiple clearable value="option-2">
    <sl-option value="option-1">Option 1</sl-option>
    <sl-option value="option-2">Option 2</sl-option>
    <sl-option value="option-3">Option 3</sl-option>
    <sl-option value="option-4">Option 4</sl-option>
    <sl-option value="option-5">Option 5</sl-option>
    <sl-option value="option-6">Option 6</sl-option>
  </sl-select>

  <br />

  <sl-button variant="primary" type="submit">Submit</sl-button>
</form>

<script>
  const form = document.querySelector('#f');

  form.addEventListener('submit', event => {});
</script>
```
