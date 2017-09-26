---
layout: default.html
title: Forms
description: Default form control styles.
stylesheets:
 - https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css
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
          File inputs aren’t supported. Use a [file button](file-buttons.html) instead.
        </span>
      </td>
      <td>
        <span class="file-button">
          <input type="file" id="file-button-ex">
          <label class="button button-block" for="file-button-ex">Select File</label>
        </span>
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

<div class="row">
  <div class="col-sm-6">
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
  <div class="col-sm-6">
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

### Input Fields

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

### Input Hints

You can add textual hints below form controls with the `input-hint` class.

```html
<div class="input-field">
  <label>Name</label>
  <input type="text">
  <p class="input-hint">What do people call you?</p>
</div>

<div class="input-field">
  <label>Age</label>
  <input type="number">
  <p class="input-hint">Enter your age in years</p>
</div>
```

<div class="row">
  <div class="col-sm-6">
    <div class="input-field">
      <label>Name</label>
      <input type="text">
      <p class="input-hint">What do people call you?</p>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="input-field">
      <label>Age</label>
      <input type="number">
      <p class="input-hint">Enter your age in years</p>
    </div>
  </div>
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

### Input Icons

Input icons add visual context to form controls. To add icons to a form control, wrap it with an `input-icon` element and add icons before and after it.

This example uses Font Awesome, but you can use whatever icon library you want. For consistency, use fixed with icons if your icon library supports them.

```html
<div class="input-icon">
  <i class="fa fa-fw fa-phone"></i>
  <input type="text">
</div>

<div class="input-icon">
  <input type="text">
  <i class="fa fa-fw fa-envelope-o"></i>
</div>

<div class="input-icon">
  <i class="fa fa-fw fa-user"></i>
  <input type="text">
  <i class="fa fa-check"></i>
</div>

<div class="input-icon">
  <i class="fa fa-fw fa-map-marker"></i>
  <select><option>United States</option></select>
</div>
```

<div class="row">
  <div class="col-md-6 mar-b-md">
    <div class="input-icon">
      <i class="fa fa-fw fa-phone"></i>
      <input type="text">
    </div>
  </div>
  <div class="col-md-6 mar-b-md">
    <div class="input-icon">
      <input type="text">
      <i class="fa fa-fw fa-envelope-o"></i>
    </div>
  </div>
  <div class="col-md-6 mar-b-md">
    <div class="input-icon">
      <i class="fa fa-fw fa-user"></i>
      <input type="text">
      <i class="fa fa-check"></i>
    </div>
  </div>
  <div class="col-md-6 mar-b-md">
    <div class="input-icon">
      <i class="fa fa-fw fa-map-marker"></i>
      <select><option>United States</option></select>
    </div>
  </div>
</div>

Input icons can be used inside form groups.

```html
<div class="input-group">
  <span class="input-addon">Location</span>
  <div class="input-icon">
    <i class="fa fa-fw fa-map-marker"></i>
    <input type="text">
    <i class="fa fa-fw fa-check"></i>
  </div>
  <button type="button">Submit</button>
</div>
```

<div class="input-group">
  <span class="input-addon">Location</span>
  <div class="input-icon">
    <i class="fa fa-fw fa-map-marker"></i>
    <input type="text">
    <i class="fa fa-fw fa-check"></i>
  </div>
  <button type="button">Submit</button>
</div>

Use the `input-icon-[xs|sm|lg|xs]` modifiers to change the size of input icons to match form controls.

```html
<div class="input-icon input-icon-xs">
  <i class="fa fa-fw fa-user"></i>
  <input class="input-xs" type="text">
  <i class="fa fa-check"></i>
</div>

<div class="input-icon input-icon-sm">
  <i class="fa fa-fw fa-user"></i>
  <input class="input-sm" type="text">
  <i class="fa fa-check"></i>
</div>

<div class="input-icon">
  <i class="fa fa-fw fa-user"></i>
  <input type="text">
  <i class="fa fa-check"></i>
</div>

<div class="input-icon input-icon-lg">
  <i class="fa fa-fw fa-user"></i>
  <input class="input-lg" type="text">
  <i class="fa fa-check"></i>
</div>

<div class="input-icon input-icon-xl">
  <i class="fa fa-fw fa-user"></i>
  <input class="input-xl" type="text">
  <i class="fa fa-check"></i>
</div>
```

<div class="input-field">
  <div class="input-icon input-icon-xs">
    <i class="fa fa-fw fa-user"></i>
    <input class="input-xs" type="text">
    <i class="fa fa-check"></i>
  </div>
</div>

<div class="input-field">
  <div class="input-icon input-icon-sm">
    <i class="fa fa-fw fa-user"></i>
    <input class="input-sm" type="text">
    <i class="fa fa-check"></i>
  </div>
</div>

<div class="input-field">
  <div class="input-icon">
    <i class="fa fa-fw fa-user"></i>
    <input type="text">
    <i class="fa fa-check"></i>
  </div>
</div>

<div class="input-field">
  <div class="input-icon input-icon-lg">
    <i class="fa fa-fw fa-user"></i>
    <input class="input-lg" type="text">
    <i class="fa fa-check"></i>
  </div>
</div>

<div class="input-field">
  <div class="input-icon input-icon-xl">
    <i class="fa fa-fw fa-user"></i>
    <input class="input-xl" type="text">
    <i class="fa fa-check"></i>
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

A form control can be made valid or invalid by adding the `input-valid` or `input-invalid` modifiers to the surrounding `input-field`.

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

<div class="row">
  <div class="col-12 col-sm-6">
    <div class="input-field input-valid">
      <label>Valid</label>
      <input type="text">
    </div>
  </div>
  <div class="col-12 col-sm-6">
    <div class="input-field input-invalid">
      <label>Invalid</label>
      <input type="text">
    </div>
  </div>
</div>

Never apply validation modifiers directly to a form control, as some components (e.g. input icons) wrap inputs with additional elements that won’t be able to inherit the correct styles.

```html
<div class="input-field input-valid">
  <label>Valid with Icons</label>
  <div class="input-icon">
    <i class="fa fa-fw fa-user"></i>
    <input type="text">
    <i class="fa fa-fw fa-check"></i>
  </div>
</div>

<div class="input-field input-invalid">
  <label>Invalid with Icons</label>
  <div class="input-icon">
    <i class="fa fa-fw fa-user"></i>
    <input type="text">
    <i class="fa fa-fw fa-times"></i>
  </div>
</div>
```

<div class="row">
  <div class="col-12 col-sm-6">
    <div class="input-field input-valid">
      <label>Valid with Icons</label>
      <div class="input-icon">
        <i class="fa fa-fw fa-user"></i>
        <input type="text">
        <i class="fa fa-fw fa-check"></i>
      </div>
    </div>
  </div>
  <div class="col-12 col-sm-6">
    <div class="input-field input-invalid">
      <label>Invalid with Icons</label>
      <div class="input-icon">
        <i class="fa fa-fw fa-user"></i>
        <input type="text">
        <i class="fa fa-fw fa-times"></i>
      </div>
    </div>
  </div>
</div>
