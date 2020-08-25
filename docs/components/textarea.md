# Textarea

[component-header:sl-textarea]

Textareas collect data from the user and allow multiple lines of text.

```html preview
<sl-textarea></sl-textarea>
```

?> This component doesn't work with standard forms. Use [`<sl-form>`](/components/form.md) instead.

## Examples

### Rows

Use the `rows` attribute to change the number of text rows that get shown.

```html preview
<sl-textarea rows="2"></sl-textarea>
```

### Placeholders

Use the `placeholder` attribute to add a placeholder.

```html preview
<sl-textarea placeholder="Type something"></sl-textarea>
```

### Disabled

Use the `disabled` attribute to disable an input.

```html preview
<sl-textarea placeholder="Textarea" disabled></sl-textarea>
```

### Sizes

Use the `size` attribute to change a textarea's size.

```html preview
<sl-textarea placeholder="Small" size="small"></sl-textarea>
<br>
<sl-textarea placeholder="Medium" size="medium"></sl-textarea>
<br>
<sl-textarea placeholder="Large" size="large"></sl-textarea>
```

### Labels

Use the `label` attribute to give the textarea an accessible label.

```html preview
<sl-textarea label="Comments"></sl-textarea>
```

### Help Text

Add descriptive help text to a textarea with the `help-text` slot.

```html preview
<sl-textarea label="Feedback">
  <div slot="help-text">Please tell us what you think.</div>
</sl-textarea>
```

### Validation

Show a valid or invalid state by setting the `valid` and `invalid` attributes, respectively. Help text can be used to provide feedback for validation and will be styled accordingly.

```html preview
<sl-textarea label="Valid" valid>
  <div slot="help-text">This is a valid textarea.</div>
</sl-textarea>

<br>

<sl-textarea label="Invalid" invalid>
  <div slot="help-text">This is an invalid textarea.</div>
</sl-textarea>
```

### Prevent Resizing

By default, textareas can be resized vertically by the user. To prevent resizing, set the `resize` attribute to `none`.

```html preview
<sl-textarea resize="none"></sl-textarea>
```

### Expand with Content

Textareas will automatically resize to expand to fit their content when `resize` is set to `auto`.

```html preview
<sl-textarea resize="auto"></sl-textarea>
```

[component-metadata:sl-textarea]
