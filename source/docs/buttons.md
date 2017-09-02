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

<div class="input-field">
  <button type="button">Button</button>
</div>

Use the `button-[xs|sm|lg|xl]` modifiers to change the size of a button.

```html
<button type="button" class="button-xs">XS Button</button>
<button type="button" class="button-sm">SM Button</button>
<button type="button">Default Button</button>
<button type="button" class="button-lg">LG Button</button>
<button type="button" class="button-xl">XL Button</button>
```

<div class="input-field">
  <button type="button" class="button-xs">XS Button</button>
  <button type="button" class="button-sm">SM Button</button>
  <button type="button">Default Button</button>
  <button type="button" class="button-lg">LG Button</button>
  <button type="button" class="button-xl">XL Button</button>
</div>

To disable a button set the `disabled` property on `<button>` elements. You can simulate the disabled state on links by adding the `disabled` class, but additional JavaScript is required to prevent them from being activated.

```html
<button type="button" disabled>Disabled Button</button>
<a href="#" class="button disabled">Disabled Link</a>
```

<div class="input-field">
  <button type="button" disabled>Disabled Button</button>
  <a href="#" class="button disabled">Disabled Link</a>
</div>

You can force buttons to have an active state by applying the `active` class.

```html
<button type="button" class="active">Active Button</button>
<a href="#" class="button active">Active Link</a>
```

<div class="input-field">
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

<div class="input-field">
  <button type="button" class="button-secondary">Secondary</button>
  <button type="button" class="button-success">Success</button>
  <button type="button" class="button-info">Info</button>
  <button type="button" class="button-warning">Warning</button>
  <button type="button" class="button-danger">Danger</button>
  <button type="button" class="button-light">Light</button>
  <button type="button" class="button-dark">Dark</button>
</div>

### Block Buttons

Use the `button-block` modifier to make a button span the entire width of its parent.

```html
<button type="button" class="button-block">Block Button</button>
```

<div class="input-field">
  <button type="button" class="button-block">Block Button</button>
</div>

### Link Buttons

Buttons can be styled to look like normal links with the `button-link` modifier. Button sizing is maintained so they align properly with other buttons.

```html
<a href="#" class="button button-link">Link Button</a>
```

<div class="input-field">
  <a href="#" class="button button-link">Link Button</a>
</div>

### Loader Buttons

Buttons can be given a loading state with the `button-loader` modifier. This will make the button text invisible and display a loader using the `::after` pseudo-element. The button’s width will not be affected.

```html
<button type="button" class="button-loader button-xs">Button</button>
<button type="button" class="button-loader button-sm">Button</button>
<button type="button" class="button-loader">Button</button>
<button type="button" class="button-loader button-lg">Button</button>
<button type="button" class="button-loader button-xl">Button</button>
```

<div class="input-field">
  <button type="button" class="button-loader button-xs">Button</button>
  <button type="button" class="button-loader button-sm">Button</button>
  <button type="button" class="button-loader">Button</button>
  <button type="button" class="button-loader button-lg">Button</button>
  <button type="button" class="button-loader button-xl">Button</button>
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

<div class="input-field">
  <button type="button" class="button-loader button-secondary">Button</button>
  <button type="button" class="button-loader button-success">Button</button>
  <button type="button" class="button-loader button-info">Button</button>
  <button type="button" class="button-loader button-warning">Button</button>
  <button type="button" class="button-loader button-danger">Button</button>
  <button type="button" class="button-loader button-light">Button</button>
  <button type="button" class="button-loader button-dark">Button</button>
</div>
