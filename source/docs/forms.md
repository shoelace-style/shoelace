---
layout: default.html
title: Forms
description: Default form control styles.
---

## Forms

Shoelace gives you beautiful forms without hassle. Most form controls don’t need a special class for styling.

### Form Controls

Form controls are styled at 100% of the width of their parent element.

<table class="table table-bordered">
  <thead>
    <tr>
      <th>Input Type</th>
      <th>Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>&lt;input type=&quot;checkbox&quot;&gt;</code></td>
      <td>
        <label><input type="checkbox" checked> Checkbox 1</label><br>
        <label><input type="checkbox"> Checkbox 2</label>
      </td>
    </tr>
    <tr>
      <td><code>&lt;input type=&quot;color&quot;&gt;</code></td>
      <td><input type="color" value="#0099dd"></td>
    </tr>
    <tr>
      <td><code>&lt;input type=&quot;date&quot;&gt;</code></td>
      <td><input type="date"></td>
    </tr>
    <tr>
      <td><code>&lt;input type=&quot;email&quot;&gt;</code></td>
      <td><input type="email"></td>
    </tr>
    <tr>
      <td>
        <code>&lt;input type=&quot;file&quot;&gt;</code>
        <br>
        <span class="text-small text-secondary">
          File inputs aren’t supported. Use a [file button](buttons.html#file-buttons) instead.
        </span>
      </td>
      <td>
        <label class="button button-block">Select File <input type="file"></label>
      </td>
    </tr>
    <tr>
      <td><code>&lt;input type=&quot;number&quot;&gt;</code></td>
      <td><input type="number"></td>
    </tr>
    <tr>
      <td><code>&lt;input type=&quot;password&quot;&gt;</code></td>
      <td><input type="password"></td>
    </tr>
    <tr>
      <td><code>&lt;input type=&quot;radio&quot;&gt;</code></td>
      <td>
        <label><input type="Radio" name="radio" checked> Radio 1</label><br>
        <label><input type="Radio" name="radio"> Radio 2</label>
      </td>
    </tr>
    <tr>
      <td><code>&lt;input type=&quot;range&quot;&gt;</code></td>
      <td><input type="range"></td>
    </tr>
    <tr>
      <td><code>&lt;input type=&quot;search&quot;&gt;</code></td>
      <td><input type="search"></td>
    </tr>
    <tr>
      <td><code>&lt;input type=&quot;text&quot;&gt;</code></td>
      <td><input type="text"></td>
    </tr>
    <tr>
      <td><code>&lt;input type=&quot;time&quot;&gt;</code></td>
      <td><input type="time"></td>
    </tr>
    <tr>
      <td><code>&lt;select&gt;</code></td>
      <td>
        <select>
          <option>Item 1</option>
          <option>Item 2</option>
          <option>Item 3</option>
        </select>
      </td>
    </tr>
    <tr>
      <td><code>&lt;textarea&gt;</code></td>
      <td><textarea rows="4"></textarea></td>
    </tr>
  </tbody>
</table>

You can change the size of most form controls with the `input-[xs|sm|lg|xl]` modifiers.

```html
<input type="text" class="input-xs" placeholder="XS">
<input type="text" class="input-sm" placeholder="SM">
<input type="text" placeholder="Default">
<input type="text" class="input-lg" placeholder="LG">
<input type="text" class="input-xl" placeholder="XL">

<select class="input-xs"><option>Item</option></select>
<select class="input-sm"><option>Item</option></select>
<select><option>Item</option></select>
<select class="input-lg"><option>Item</option></select>
<select class="input-xl"><option>Item</option></select>
```

<div class="two-column">
  <div class="column">
    <div class="input-field">
      <input type="text" class="input-xs" placeholder="XS">
    </div>
    <div class="input-field">
      <input type="text" class="input-sm" placeholder="SM">
    </div>
    <div class="input-field">
      <input type="text" placeholder="Default">
    </div>
    <div class="input-field">
      <input type="text" class="input-lg" placeholder="LG">
    </div>
    <div class="input-field">
      <input type="text" class="input-xl" placeholder="XL">
    </div>
  </div>

  <div class="column">
    <div class="input-field">
      <select class="input-xs"><option>XS</option></select>
    </div>
    <div class="input-field">
      <select class="input-sm"><option>SM</option></select>
    </div>
    <div class="input-field">
      <select><option>Default</option></select>
    </div>
    <div class="input-field">
      <select class="input-lg"><option>LG</option></select>
    </div>
    <div class="input-field">
      <select class="input-xl"><option>XL</option></select>
    </div>
  </div>
</div>

Disabled form controls look like this:

<div class="input-field">
  <input type="text" placeholder="Input" disabled>
</div>

<div class="input-field">
  <label><input type="checkbox" disabled> Checkbox</label>
  <label><input type="radio" disabled> Radio</label>
</div>

Read-only form controls look like this:

<div class="input-field">
  <input type="text" readonly value="This is read-only">
</div>

### Form Control Spacing

For proper spacing of individual form controls, wrap them in `input-field` containers.

```html
<div class="input-field">
  <label>Name</label>
  <input type="text">
</div>

<div class="input-field">
  <label>Password</label>
  <input type="password">
</div>

<div class="input-field">
  <label><input type="checkbox"> Remember me</label>
</div>
```

<div class="input-field">
  <label>Username</label>
  <input type="text">
</div>

<div class="input-field">
  <label>Password</label>
  <input type="password">
</div>

<div class="input-field">
  <label><input type="checkbox"> Remember me</label>
</div>

### Input Groups

Form controls and buttons can be grouped by wrapping them in `input-group` containers.

```html
<div class="input-group">
  <input type="text">
  <button type="button" class="button">Submit</button>
</div>

<div class="input-group">
  <button type="button" class="button">Submit</button>
  <input type="text">
</div>

<div class="input-group">
  <input type="text" placeholder="First">
  <input type="text" placeholder="Middle">
  <input type="text" placeholder="Last">
  <button type="button" class="button">Submit</button>
</div>

<div class="input-group">
  <button type="button" class="button">Option 1</button>
  <button type="button" class="button">Option 2</button>
  <button type="button" class="button">Option 3</button>
</div>
```

<div class="input-group">
  <input type="text">
  <button type="button">Submit</button>
</div>

<div class="input-group">
  <button type="button">Submit</button>
  <input type="text">
</div>

<div class="input-group">
  <input type="text" placeholder="First">
  <input type="text" placeholder="Middle">
  <input type="text" placeholder="Last">
  <button type="button">Submit</button>
</div>

<div class="input-group">
  <button type="button">Option 1</button>
  <button type="button">Option 2</button>
  <button type="button">Option 3</button>
</div>

### Input Addons

To create an input addon, use `<span class="input-addon">`. Addons can appear anywhere inside an input group. Use the `input-addon-[xs|sm|lg|xl]` modifiers to change the size to match adjacent form controls.

```html
<div class="input-group">
  <span class="input-addon input-addon-xs">$</span>
  <input type="text" class="input-xs">
  <span class="input-addon input-addon-xs">.00</span>
</div>

<div class="input-group">
  <span class="input-addon input-addon-sm">$</span>
  <input type="text" class="input-sm">
  <span class="input-addon input-addon-sm">.00</span>
</div>

<div class="input-group">
  <span class="input-addon">$</span>
  <input type="text">
  <span class="input-addon">.00</span>
</div>

<div class="input-group">
  <span class="input-addon input-addon-lg">$</span>
  <input type="text" class="input-lg">
  <span class="input-addon input-addon-lg">.00</span>
</div>

<div class="input-group">
  <span class="input-addon input-addon-xl">$</span>
  <input type="text" class="input-xl">
  <span class="input-addon input-addon-xl">.00</span>
</div>
```

<div class="input-field">
  <div class="input-group">
    <span class="input-addon input-addon-xs">$</span>
    <input type="text" class="input-xs">
    <span class="input-addon input-addon-xs">.00</span>
  </div>
</div>

<div class="input-field">
  <div class="input-group">
    <span class="input-addon input-addon-sm">$</span>
    <input type="text" class="input-sm">
    <span class="input-addon input-addon-sm">.00</span>
  </div>
</div>

<div class="input-field">
  <div class="input-group">
    <span class="input-addon">$</span>
    <input type="text">
    <span class="input-addon">.00</span>
  </div>
</div>

<div class="input-field">
  <div class="input-group">
    <span class="input-addon input-addon-lg">$</span>
    <input type="text" class="input-lg">
    <span class="input-addon input-addon-lg">.00</span>
  </div>
</div>

<div class="input-field">
  <div class="input-group">
    <span class="input-addon input-addon-xl">$</span>
    <input type="text" class="input-xl">
    <span class="input-addon input-addon-xl">.00</span>
  </div>
</div>

### Form Groups

Related form controls can be grouped in a `<fieldset>`. An optional `<legend>` can be used to display a name for the group.

```html
<fieldset>
  <legend>User</legend>
  ...
</fieldset>
```

<fieldset>
  <legend>Login</legend>
  <div class="input-field">
    <label>Username</label>
    <input type="text">
  </div>
  <div class="input-field">
    <label>Password</label>
    <input type="password">
  </div>
  <div class="input-field">
    <label>
      <input type="checkbox"> Remember me
    </label>
  </div>
  <div class="input-field">
    <button type="button">Login</button>
  </div>
</fieldset>

### Validation

Form controls can be made valid or invalid using the `input-valid` and `input-invalid` modifiers. It’s better to apply modifiers to the surrounding `input-field` so labels will be styled as well, but modifiers can be applied directly to form controls as needed.

```html
<div class="input-field input-valid">
  <label>Valid</label>
  <input type="text">
</div>

<div class="input-field input-invalid">
  <label>Invalid</label>
  <input type="text">
</div>
```

<div class="two-column">
  <div class="column">
    <div class="input-field input-valid">
      <label>Valid</label>
      <input type="text">
    </div>
  </div>

  <div class="column">
    <div class="input-field input-invalid">
      <label>Invalid</label>
      <input type="text">
    </div>
  </div>
</div>
