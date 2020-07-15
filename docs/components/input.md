# Input

[component-header:sl-input]

Inputs collect data from the user.

```html preview
<sl-input></sl-input>
```

?> This component doesn't work with standard forms. Use [`<sl-form>`](/components/form.md) instead.

## Examples

### Labels

Use the `label` attribute to give the input an accessible label.

```html preview
<sl-input label="Name"></sl-input>
<br>
<sl-input type="email" label="Email" placeholder="bob@example.com"></sl-input>
```

### Help Text

Add descriptive help text to an input with the `help-text` slot.

```html preview
<sl-input label="Nickname">
  <div slot="help-text">What would you like people to call you?</div>
</sl-input>
```

### Placeholder

Use the `placeholder` attribute to add a placeholder.

```html preview
<sl-input placeholder="Type something"></sl-input>
```

### Size

Use the `size` attribute to change an input's size.

```html preview
<sl-input placeholder="Small" size="small"></sl-input>
<br>
<sl-input placeholder="Medium" size="medium"></sl-input>
<br>
<sl-input placeholder="Large" size="large"></sl-input>
```

### Pill

Use the `pill` prop to give inputs rounded edges.

```html preview
<sl-input placeholder="Small" size="small" pill></sl-input>
<br>
<sl-input placeholder="Medium" size="medium" pill></sl-input>
<br>
<sl-input placeholder="Large" size="large" pill></sl-input>
```

### Prefix & Suffix Icons

Use the `prefix` and `suffix` slots to add icons.

```html preview
<sl-input placeholder="Small" size="small">
  <sl-icon name="tag" slot="prefix"></sl-icon>
  <sl-icon name="gear" slot="suffix"></sl-icon>
</sl-input>
<br>
<sl-input placeholder="Medium" size="medium">
  <sl-icon name="tag" slot="prefix"></sl-icon>
  <sl-icon name="gear" slot="suffix"></sl-icon>
</sl-input>
<br>
<sl-input placeholder="Large" size="large">
  <sl-icon name="tag" slot="prefix"></sl-icon>
  <sl-icon name="gear" slot="suffix"></sl-icon>
</sl-input>
```

### Clearable

Add the `clearable` prop to add a clear button when the input has content.

```html preview
<sl-input placeholder="Clearable" size="small" clearable></sl-input>
<br>
<sl-input placeholder="Clearable" size="medium" clearable></sl-input>
<br>
<sl-input placeholder="Clearable" size="large" clearable></sl-input>
```

### Toggle Password

Add the `toggle-password` prop to add a toggle button that will show the password when activated.

```html preview
<sl-input type="password" placeholder="Password Toggle" size="small" toggle-password></sl-input>
<br>
<sl-input type="password" placeholder="Password Toggle" size="medium" toggle-password></sl-input>
<br>
<sl-input type="password" placeholder="Password Toggle" size="large" toggle-password></sl-input>
```

### Disabled

Use the `disabled` attribute to disable an input.

```html preview
<sl-input placeholder="Disabled" size="small" disabled></sl-input>
<br>
<sl-input placeholder="Disabled" size="medium" disabled></sl-input>
<br>
<sl-input placeholder="Disabled" size="large" disabled></sl-input>
```

### Validation

Show a valid or invalid state by setting the `valid` and `invalid` attributes, respectively. Help text can be used to provide feedback for validation and will be styled accordingly.

```html preview
<sl-input label="Valid" valid>
  <div slot="help-text">This is a valid input</div>
</sl-input>

<br>

<sl-input label="Invalid" invalid>
  <div slot="help-text">This is an invalid input</div>
</sl-input>
```

[component-metadata:sl-input]
