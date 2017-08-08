---
layout: default.html
title: Buttons
description: Add styled buttons to your app with minimal effort.
---

## Buttons

To create a button, use the `<button>` element or apply the `button` class to another element such as an `<a>`. You can change a button’s appearance using the `button-*` modifier.

```html
<button type="button">Default</button>
<button type="button" class="button-success">Success</button>
<button type="button" class="button-info">Info</button>
<button type="button" class="button-warning">Warning</button>
<button type="button" class="button-danger">Danger</button>
<button type="button" class="button-inverse">Inverse</button>
<button type="button" class="button button-link">Link</button>
```

<div class="input-single">
  <button type="button">Default</button>
  <button type="button" class="button-success">Success</button>
  <button type="button" class="button-info">Info</button>
  <button type="button" class="button-warning">Warning</button>
  <button type="button" class="button-danger">Danger</button>
  <button type="button" class="button-inverse">Inverse</button>
  <button type="button" class="button-link">Link</button>
</div>

Use the `button-small` and `button-big` modifiers to change the size of a button.

<div class="input-single">
  <button type="button" class="button-small">Small Button</button>
  <button type="button">Normal Button</button>
  <button type="button" class="button-big">Big Button</button>
</div>

Use the `button-block` modifier to make the button span the entire width of its parent element. You can also mix and match modifiers as needed.

<div class="input-single">
  <button type="button" class="button-block button-small">Small Block Button</button>
</div>

<div class="input-single">
  <button type="button" class="button-block">Normal Block Button</button>
</div>

<div class="input-single">
  <button type="button" class="button-block button-big">Big Block Button</button>
</div>

Disabled buttons look like this. Set the `disabled` property on `<button>` elements to achieve this effect. For all other elements, apply `class="disabled"` instead.

<div class="input-single">
  <button type="button" disabled>Default</button>
  <button type="button" class="button-success" disabled>Success</button>
  <button type="button" class="button-info disabled">Info</button>
  <button type="button" class="button-warning" disabled>Warning</button>
  <button type="button" class="button-danger" disabled>Danger</button>
  <button type="button" class="button-inverse" disabled>Inverse</button>
</div>

You can force buttons to have an active state by applying the `active` class.

<div class="input-single">
  <button type="button" class="active">Default</button>
  <button type="button" class="button-success active">Success</button>
  <button type="button" class="button-info active">Info</button>
  <button type="button" class="button-warning active">Warning</button>
  <button type="button" class="button-danger active">Danger</button>
  <button type="button" class="button-inverse active">Inverse</button>
</div>

### File Buttons

File inputs are notoriously hard to style properly in every browser. Shoelace offers file buttons as an alternative. These are much easier to style consistently, but come with the caveat that the name (or number) of files selected will not be automatically shown to the user. This aspect of a file button’s UX can be handled effectively with JavaScript, but this is left as an [exercise for the user](https://stackoverflow.com/questions/2189615/how-to-get-file-name-when-user-select-a-file-via-input-type-file).

File buttons are simply `<label>` elements with the `button` class and a nested file input.

```html
<label class="button">
  Select File
  <input type="file">
</label>
```

<div class="input-single">
  <label class="button">Select File <input type="file"></label>
</div>
