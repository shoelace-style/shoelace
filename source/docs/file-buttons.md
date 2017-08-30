---
layout: default.html
title: File Buttons
description: Add buttons to let users select files in your app.
---

## File Buttons

File inputs are notoriously hard to style consistently in every browser. Shoelace offers file buttons as an alternative.

File buttons are much easier to style, but come with the caveat that the name and number of files selected will not be automatically shown to the user. This aspect of a file button’s UX can be handled effectively with JavaScript, but this is left as an [exercise for the user](https://stackoverflow.com/questions/2189615/how-to-get-file-name-when-user-select-a-file-via-input-type-file).

To create a file button, use the following markup. Note that the input needs to have an `id` and the label needs to have a matching `for` attribute. The label also needs to have the `button` class.

```html
<span class="file-button">
  <input type="file" id="my-file">
  <label class="button" for="my-file">Select File</label>
</span>
```

<span class="file-button">
  <input type="file" id="file-input">
  <label class="button" for="file-input">Select File</label>
</span>

This approach is a bit more verbose than simply wrapping the input with a label, but the extra markup makes file buttons accessible via keyboard.

You can allow multiple files to be selected by adding the `multiple` attribute:

```html
<span class="file-button">
  <input type="file" id="my-files" multiple>
  <label class="button" for="my-files">Select Files</label>
</span>
```

<span class="file-button">
  <input type="file" id="my-files" multiple>
  <label class="button" for="my-files">Select Files</label>
</span>

### Variations

File buttons can use [button modifiers](buttons.html). Just apply the appropriate classes to the label.

<span class="file-button">
  <input type="file" id="file-input-xs">
  <label class="button button-xs" for="file-input-xs">Browse</label>
</span>
<span class="file-button">
  <input type="file" id="file-input-sm">
  <label class="button button-sm" for="file-input-sm">Browse</label>
</span>
<span class="file-button">
  <input type="file" id="file-input-default">
  <label class="button" for="file-input-default">Browse</label>
</span>
<span class="file-button">
  <input type="file" id="file-input-lg">
  <label class="button button-lg" for="file-input-lg">Browse</label>
</span>
<span class="file-button">
  <input type="file" id="file-input-xl">
  <label class="button button-xl" for="file-input-xl">Browse</label>
</span>

<span class="file-button">
  <input type="file" id="file-input-default">
  <label class="button" for="file-input-default">Browse</label>
</span>
<span class="file-button">
  <input type="file" id="file-input-secondary">
  <label class="button button-secondary" for="file-input-secondary">Browse</label>
</span>
<span class="file-button">
  <input type="file" id="file-input-success">
  <label class="button button-success" for="file-input-success">Browse</label>
</span>
<span class="file-button">
  <input type="file" id="file-input-info">
  <label class="button button-info" for="file-input-info">Browse</label>
</span>
<span class="file-button">
  <input type="file" id="file-input-warning">
  <label class="button button-warning" for="file-input-warning">Browse</label>
</span>
<span class="file-button">
  <input type="file" id="file-input-danger">
  <label class="button button-danger" for="file-input-danger">Browse</label>
</span>
<span class="file-button">
  <input type="file" id="file-input-light">
  <label class="button button-light" for="file-input-light">Browse</label>
</span>
<span class="file-button">
  <input type="file" id="file-input-dark">
  <label class="button button-dark" for="file-input-dark">Browse</label>
</span>

You can also use file buttons in [input groups](forms.html#input-groups).

<div class="input-group">
  <span class="file-button">
    <input type="file" id="file-input-group">
    <label class="button" for="file-input-group">Select File</label>
  </span>
  <input type="text">
  <button type="button">Submit</button>
</div>
