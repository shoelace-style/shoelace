---
layout: default.html
title: Dropdowns
description: Add beautiful menus to your app with dropdowns.
---

## Dropdowns

Dropdowns can be created using the markup below. You can use a `<button>` or an `<a>` as a trigger. Dropdown indicators (i.e. carets) are added for you. Menu items are simply `<a>` elements. Dividers are simply `<hr>` elements.

Note the class names used for the main container, the trigger, and the menu. Additionally, menu items can be disabled by adding the `disabled` class. Menu items can also be given a checked state using the `checked` class.

To disable a dropdown entirely, add the `disabled` property to the dropdown trigger if it’s a button. If it’s a link, add the `disabled` class instead.

```html
<div class="dropdown">
  <button type="button" class="dropdown-trigger">Dropdown</button>
  <div class="dropdown-menu">
    <a href="#">Item 1</a>
    <a href="#">Item 2</a>
    <a href="#">Item 3</a>
    <a href="#" class="checked">Checked</a>
    <a href="#" class="disabled">Disabled</a>
    <hr>
    <a href="#">More...</a>
  </div>
</div>
```

<div class="input-single">
  <div class="dropdown">
    <button type="button" class="dropdown-trigger">Dropdown</button>
    <div class="dropdown-menu">
      <a href="#">Item 1</a>
      <a href="#">Item 2</a>
      <a href="#">Item 3</a>
      <a href="#" class="checked">Checked</a>
      <a href="#" class="disabled">Disabled</a>
      <hr>
      <a href="#">More...</a>
    </div>
  </div>
</div>

Use the `dropdown-top` and `dropdown-left` modifiers to change the positioning of the menu. You can combine these modifiers as needed.

```html
<div class="dropdown dropdown-left">
  ...
</div>

<div class="dropdown dropdown-top">
  ...
</div>

<div class="dropdown dropdown-top dropdown-left">
  ...
</div>
```

<div class="input-single">
  <div class="dropdown dropdown-left">
    <button type="button" class="dropdown-trigger">Left</button>
    <div class="dropdown-menu">
      <a href="#">Item 1</a>
      <a href="#">Item 2</a>
      <a href="#">Item 3</a>
    </div>
  </div>

  <div class="dropdown dropdown-top">
    <button type="button" class="dropdown-trigger">Top</button>
    <div class="dropdown-menu">
      <a href="#">Item 1</a>
      <a href="#">Item 2</a>
      <a href="#">Item 3</a>
    </div>
  </div>

  <div class="dropdown dropdown-top dropdown-left">
    <button type="button" class="dropdown-trigger">Top Left</button>
    <div class="dropdown-menu">
      <a href="#">Item 1</a>
      <a href="#">Item 2</a>
      <a href="#">Item 3</a>
    </div>
  </div>
</div>

Dropdowns with button triggers can be used inside input groups.

<div class="input-group">
  <span class="input-addon">$</span>
  <input type="text" placeholder="10.00">
  <div class="dropdown dropdown-left">
    <button type="button" class="dropdown-trigger">Currency</button>
    <div class="dropdown-menu">
      <a href="#" class="checked">USD</a>
      <a href="#">AUD</a>
      <a href="#">CAD</a>
      <a href="#">GBP</a>
    </div>
  </div>
</div>

### Events

Dropdowns require `shoelace.js` to make them interactive. You don’t need to initialize them. Simply include the script and everything “just works.”

There is no JavaScript API. Shoelace’s philosophy believes that custom components should act like native components as much as possible. You can, however, listen for various events:

- `show` – Fires when a dropdown is shown.
- `hide` – Fires when a dropdown is hidden.
- `select` – Fires when a dropdown menu item is selected. The second callback argument is a reference to the respective menu item.

This example will log all three events for a dropdown with an id of `my-dropdown`.

```javascript
$('#my-dropdown')
  .on('show', function(event) {
    console.log('show', event.target);
  })
  .on('hide', function(event) {
    console.log('hide', event.target);
  })
  .on('select', function(event, item) {
    console.log('select', event.target, item);
  });
```
