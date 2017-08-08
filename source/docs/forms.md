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
        <span class="text-small text-muted">
          File inputs aren’t supported. Use a <a href="#file-buttons">file button</a> instead.
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
      <td><code>&lt;progress&gt;&lt;/progress&gt;</code></td>
      <td><progress max="100" value="50"></progress></td>
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

You can change the size of most form controls with the `input-small` and `input-big` modifiers.

```html
<input type="text" class="input-small" placeholder="Small">
<input type="text" placeholder="Default">
<input type="text" class="input-big" placeholder="Big">

<select class="input-small"><option>Item</option></select>
<select><option>Item</option></select>
<select class="input-big"><option>Item</option></select>
```

<div class="two-column">
  <p><input type="text" class="input-small" placeholder="Small"></p>
  <p><input type="text" placeholder="Default"></p>
  <p><input type="text" class="input-big" placeholder="Big"></p>
  <p><select class="input-small"><option>Item</option></select></p>
  <p><select><option>Item</option></select></p>
  <p><select class="input-big"><option>Item</option></select></p>
</div>

Disabled form controls look like this:

<div class="input-single">
  <input type="text" placeholder="Input" disabled>
</div>

<div class="input-single">
  <label><input type="checkbox" disabled> Checkbox</label>
  <label><input type="radio" disabled> Radio</label>
</div>

Read-only form controls look like this:

<div class="input-single">
  <input type="text" readonly value="This is read-only">
</div>

### Form Control Spacing

For proper spacing of individual form controls, wrap them in `input-single` containers.

```html
<div class="input-single">
  <label>Name</label>
  <input type="text">
</div>

<div class="input-single">
  <label>Password</label>
  <input type="password">
</div>

<div class="input-single">
  <label><input type="checkbox"> Remember me</label>
</div>
```

<div class="input-single">
  <label>Username</label>
  <input type="text">
</div>

<div class="input-single">
  <label>Password</label>
  <input type="password">
</div>

<div class="input-single">
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

<div class="input-single">
  <div class="input-group">
    <input type="text">
    <button type="button">Submit</button>
  </div>
</div>

<div class="input-single">
  <div class="input-group">
    <button type="button">Submit</button>
    <input type="text">
  </div>
</div>

<div class="input-single">
  <div class="input-group">
    <input type="text" placeholder="First">
    <input type="text" placeholder="Middle">
    <input type="text" placeholder="Last">
    <button type="button">Submit</button>
  </div>
</div>

<div class="input-single">
  <div class="input-group">
    <button type="button">Option 1</button>
    <button type="button">Option 2</button>
    <button type="button">Option 3</button>
  </div>
</div>

### Input Addons

To create an input addon, use `<span class="input-addon">`. Addons can appear anywhere inside an input group. Use the `input-addon-small` and `input-addon-big` modifiers to change the size to match adjacent form controls.

```html
<div class="input-group">
  <span class="input-addon input-addon-small">$</span>
  <input type="text" class="input-small">
  <span class="input-addon input-addon-small">.00</span>
</div>

<div class="input-group">
  <span class="input-addon">$</span>
  <input type="text">
  <span class="input-addon">.00</span>
</div>

<div class="input-group">
  <span class="input-addon input-addon-big">$</span>
  <input type="text" class="input-big">
  <span class="input-addon input-addon-big">.00</span>
</div>
```

<div class="input-single">
  <div class="input-group">
    <span class="input-addon input-addon-small">$</span>
    <input type="text" class="input-small">
    <span class="input-addon input-addon-small">.00</span>
  </div>
</div>

<div class="input-single">
  <div class="input-group">
    <span class="input-addon">$</span>
    <input type="text">
    <span class="input-addon">.00</span>
  </div>
</div>

<div class="input-single">
  <div class="input-group">
    <span class="input-addon input-addon-big">$</span>
    <input type="text" class="input-big">
    <span class="input-addon input-addon-big">.00</span>
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
  <div class="input-single">
    <label>Username</label>
    <input type="text">
  </div>
  <div class="input-single">
    <label>Password</label>
    <input type="password">
  </div>
  <div class="input-single">
    <label>
      <input type="checkbox"> Remember me
    </label>
  </div>
  <div class="input-single">
    <button type="button">Login</button>
  </div>
</fieldset>

### Validation

Form controls can be made valid or invalid using the `input-valid` and `input-invalid` modifiers. It’s better to apply modifiers to the surrounding `input-single` so labels will be styled as well, but modifiers can be applied directly to form controls as needed.

```html
<div class="input-single input-valid">
  <label>Valid</label>
  <input type="text">
</div>

<div class="input-single input-invalid">
  <label>Invalid</label>
  <input type="text">
</div>
```

<div class="two-column">
  <div class="input-single input-valid">
    <label>Valid</label>
    <input type="text">
  </div>

  <div class="input-single input-invalid">
    <label>Invalid</label>
    <input type="text">
  </div>
</div>
