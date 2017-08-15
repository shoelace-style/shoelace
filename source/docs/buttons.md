---
layout: default.html
title: Buttons
description: Add styled buttons to your app with minimal effort.
---

## Buttons

To create a button, use the `<button>` element or apply the `button` class to an `<a>`.

```html
<button type="button">Button</button>
```

<div class="input-single">
  <button type="button">Button</button>
</div>

Use the `button-small` and `button-big` modifiers to change the size of a button.

```html
<button type="button" class="button-small">Small Button</button>
<button type="button">Normal Button</button>
<button type="button" class="button-big">Big Button</button>
```

<div class="input-single">
  <button type="button" class="button-small">Small Button</button>
  <button type="button">Normal Button</button>
  <button type="button" class="button-big">Big Button</button>
</div>

Use the `button-block` modifier to make a button span the entire width of its parent.

```html
<button type="button" class="button-block button-small">Small Block Button</button>
<button type="button" class="button-block">Normal Block Button</button>
<button type="button" class="button-block button-big">Big Block Button</button>
```

<div class="input-single">
  <button type="button" class="button-block button-small">Small Block Button</button>
</div>

<div class="input-single">
  <button type="button" class="button-block">Normal Block Button</button>
</div>

<div class="input-single">
  <button type="button" class="button-block button-big">Big Block Button</button>
</div>

To disable a button set the `disabled` property on `<button>` elements. You can simulate the disabled state on links by adding the `disabled` class, but additional JavaScript is required to prevent them from being activated.

```html
<button type="button" disabled>Disabled Button</button>
<a href="#" class="button disabled">Disabled Link</a>
```

<div class="input-single">
  <button type="button" disabled>Disabled Button</button>
  <a href="#" class="button disabled">Disabled Link</a>
</div>

You can force buttons to have an active state by applying the `active` class.

```html
<button type="button" class="active">Active Button</button>
<a href="#" class="button active">Active Link</a>
```

<div class="input-single">
  <button type="button" class="active">Active Button</button>
  <a href="#" class="button active">Active Link</a>
</div>

### Variations

Use the `button-*` modifier to create variations.

```html
<button type="button" class="button-secondary">Secondary</button>
<button type="button" class="button-success">Success</button>
<button type="button" class="button-info">Info</button>
<button type="button" class="button-warning">Warning</button>
<button type="button" class="button-danger">Danger</button>
<button type="button" class="button-light">Light</button>
<button type="button" class="button-dark">Dark</button>
```

<div class="input-single">
  <button type="button" class="button-secondary">Secondary</button>
  <button type="button" class="button-success">Success</button>
  <button type="button" class="button-info">Info</button>
  <button type="button" class="button-warning">Warning</button>
  <button type="button" class="button-danger">Danger</button>
  <button type="button" class="button-light">Light</button>
  <button type="button" class="button-dark">Dark</button>
</div>

### Link Buttons

Buttons can be styled to look like normal links with the `button-link` modifier. Button sizing is maintained so they align properly with other buttons.

```html
<a href="#" class="button button-link">Link Button</a>
```

<div class="input-single">
  <a href="#" class="button button-link">Link Button</a>
</div>

### Loader Buttons

Buttons can be given a loading state with the `button-loader` modifier. This will make the button text invisible and display a loader using the `::after` pseudo-element. The button’s width will not be affected.

```html
<button type="button" class="button-loader button-small">Small</button>
<button type="button" class="button-loader">Loader</button>
<button type="button" class="button-loader button-big">Loader</button>
```

<div class="input-single">
  <button type="button" class="button-loader button-small">Loader</button>
  <button type="button" class="button-loader">Loader</button>
  <button type="button" class="button-loader button-big">Loader</button>
</div>

Loader buttons also work with button variations.

```html
<button type="button" class="button-loader button-secondary">Button</button>
<button type="button" class="button-loader button-success">Button</button>
<button type="button" class="button-loader button-info">Button</button>
<button type="button" class="button-loader button-warning">Button</button>
<button type="button" class="button-loader button-danger">Button</button>
<button type="button" class="button-loader button-light">Button</button>
<button type="button" class="button-loader button-dark">Button</button>
```

<div class="input-single">
  <button type="button" class="button-loader button-secondary">Button</button>
  <button type="button" class="button-loader button-success">Button</button>
  <button type="button" class="button-loader button-info">Button</button>
  <button type="button" class="button-loader button-warning">Button</button>
  <button type="button" class="button-loader button-danger">Button</button>
  <button type="button" class="button-loader button-light">Button</button>
  <button type="button" class="button-loader button-dark">Button</button>
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
