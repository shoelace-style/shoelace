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
  <input type="checkbox" class="switch" id="switch-1">
  <label for="switch-1">Option 1</label>
</span>

<span class="switch">
  <input type="checkbox" class="switch" id="switch-2" checked>
  <label for="switch-2">Option 2</label>
</span>
```

<div class="input-single">
  <span class="switch">
    <input type="checkbox" class="switch" id="switch-1">
    <label for="switch-1">Option 1</label>
  </span>

  <span class="switch">
    <input type="checkbox" class="switch" id="switch-2" checked>
    <label for="switch-2">Option 2</label>
  </span>
</div>

Use the `switch-small` and `switch-big` modifiers to change the size of a switch.

<div class="input-single">
  <span class="switch switch-small">
    <input type="checkbox" class="switch" id="switch-3">
    <label for="switch-3">Small</label>
  </span>

  <span class="switch">
    <input type="checkbox" class="switch" id="switch-4">
    <label for="switch-4">Normal</label>
  </span>

  <span class="switch switch-big">
    <input type="checkbox" class="switch" id="switch-5">
    <label for="switch-5">Big</label>
  </span>
</div>

Disabled switches are dimmed out. To disable a switch, add the `disabled` attribute to the checkbox (not the wrapper).

<div class="input-single">
  <span class="switch">
    <input type="checkbox" class="switch" disabled id="switch-6">
    <label for="switch-6">Disabled</label>
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
  <input type="checkbox" class="switch" id="variation-1" checked>
  <label for="variation-1">Secondary</label>
</span>

<span class="switch switch-success">
  <input type="checkbox" class="switch" id="variation-2" checked>
  <label for="variation-2">Success</label>
</span>

<span class="switch switch-info">
  <input type="checkbox" class="switch" id="variation-3" checked>
  <label for="variation-3">Info</label>
</span>

<span class="switch switch-warning">
  <input type="checkbox" class="switch" id="variation-4" checked>
  <label for="variation-4">Warning</label>
</span>

<span class="switch switch-danger">
  <input type="checkbox" class="switch" id="variation-5" checked>
  <label for="variation-5">Danger</label>
</span>

<span class="switch switch-light">
  <input type="checkbox" class="switch" id="variation-6" checked>
  <label for="variation-6">Light</label>
</span>

<span class="switch switch-dark">
  <input type="checkbox" class="switch" id="variation-7" checked>
  <label for="variation-7">Dark</label>
</span>
