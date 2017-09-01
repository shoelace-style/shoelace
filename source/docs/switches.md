---
layout: default.html
title: Switches
description: These pure CSS switches can be used as a checkbox replacement.
---

## Switches

Switches provide an alternative to standard checkboxes. Many people find them more intuitive and easier to use, especially on mobile devices. Shoelace provides a way to create beautiful, animated switches with pure CSS.

Because this is a pure CSS solution, there are a couple important things to remember:

- Each switch must have a unique `id`
- The `<label>` must have a `for` attribute that references the switch `id`
- The `<label>` must come **after** the checkbox, otherwise the control won’t render

The markup for a switch looks like this:

```html
<span class="switch">
  <input type="checkbox" id="switch-1">
  <label for="switch-1">Switch 1</label>
</span>

<span class="switch">
  <input type="checkbox" id="switch-2" checked>
  <label for="switch-2">Switch 2</label>
</span>
```

<div class="input-field">
  <span class="switch">
    <input type="checkbox" id="switch-1">
    <label for="switch-1">Switch 1</label>
  </span>

  <span class="switch">
    <input type="checkbox" id="switch-2" checked>
    <label for="switch-2">Switch 2</label>
  </span>
</div>

Use the `switch-[xs|sm|lg|xl]` modifiers to change the size of a switch.

```html
<span class="switch switch-xs">
  <input type="checkbox" id="switch-xs">
  <label for="switch-xs">XS</label>
</span>

<span class="switch switch-sm">
  <input type="checkbox" id="switch-sm">
  <label for="switch-sm">SM</label>
</span>

<span class="switch">
  <input type="checkbox" id="switch-default">
  <label for="switch-default">Default</label>
</span>

<span class="switch switch-lg">
  <input type="checkbox" id="switch-lg">
  <label for="switch-lg">LG</label>
</span>

<span class="switch switch-xl">
  <input type="checkbox" id="switch-xl">
  <label for="switch-xl">XL</label>
</span>
```

<div class="input-field">
  <span class="switch switch-xs">
    <input type="checkbox" id="switch-xs">
    <label for="switch-xs">XS</label>
  </span>

  <span class="switch switch-sm">
    <input type="checkbox" id="switch-sm">
    <label for="switch-sm">SM</label>
  </span>

  <span class="switch">
    <input type="checkbox" id="switch-default">
    <label for="switch-default">Default</label>
  </span>

  <span class="switch switch-lg">
    <input type="checkbox" id="switch-lg">
    <label for="switch-lg">LG</label>
  </span>

  <span class="switch switch-xl">
    <input type="checkbox" id="switch-xl">
    <label for="switch-xl">XL</label>
  </span>
</div>

Disabled switches are dimmed out. To disable a switch, add the `disabled` attribute to the checkbox (not the wrapper).

```html
<span class="switch">
  <input type="checkbox" disabled id="switch-disabled">
  <label for="switch-disabled">Disabled</label>
</span>
```

<div class="input-field">
  <span class="switch">
    <input type="checkbox" disabled id="switch-disabled">
    <label for="switch-disabled">Disabled</label>
  </span>
</div>


### Variations

Use the `switch-*` modifier to create variations.

```html
<span class="switch switch-secondary">...</span>
<span class="switch switch-success">...</span>
<span class="switch switch-info">...</span>
<span class="switch switch-warning">...</span>
<span class="switch switch-danger">...</span>
<span class="switch switch-light">...</span>
<span class="switch switch-dark">...</span>
```

<span class="switch switch-secondary">
  <input type="checkbox" id="variation-secondary" checked>
  <label for="variation-secondary">Secondary</label>
</span>

<span class="switch switch-success">
  <input type="checkbox" id="variation-success" checked>
  <label for="variation-success">Success</label>
</span>

<span class="switch switch-info">
  <input type="checkbox" id="variation-info" checked>
  <label for="variation-info">Info</label>
</span>

<span class="switch switch-warning">
  <input type="checkbox" id="variation-warning" checked>
  <label for="variation-warning">Warning</label>
</span>

<span class="switch switch-danger">
  <input type="checkbox" id="variation-danger" checked>
  <label for="variation-danger">Danger</label>
</span>

<span class="switch switch-light">
  <input type="checkbox" id="variation-light" checked>
  <label for="variation-light">Light</label>
</span>

<span class="switch switch-dark">
  <input type="checkbox" id="variation-dark" checked>
  <label for="variation-dark">Dark</label>
</span>
