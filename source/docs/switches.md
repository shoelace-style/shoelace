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
