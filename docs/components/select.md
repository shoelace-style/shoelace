# Select

[component-header:sl-select]

Selects allow you to choose one or more items from a dropdown menu.

```html preview
<sl-select placeholder="Select one">
  <sl-menu-item value="option-1">Option 1</sl-menu-item>
  <sl-menu-item value="option-2">Option 2</sl-menu-item>
  <sl-menu-item value="option-3">Option 3</sl-menu-item>
  <sl-menu-divider></sl-menu-divider>
  <sl-menu-item value="option-4">Option 4</sl-menu-item>
  <sl-menu-item value="option-5">Option 5</sl-menu-item>
  <sl-menu-item value="option-6">Option 6</sl-menu-item>
</sl-select>
```

?> This component doesn't work with standard forms. Use [`<sl-form>`](/components/form.md) instead.

## Examples

### Labels

Use the `label` attribute to give the select an accessible label.

```html preview
<sl-select label="Select one">
  <sl-menu-item value="option-1">Option 1</sl-menu-item>
  <sl-menu-item value="option-2">Option 2</sl-menu-item>
  <sl-menu-item value="option-3">Option 3</sl-menu-item>
</sl-select>
```

### Help Text

Add descriptive help text to an input with the `help-text` slot.

```html preview
<sl-select label="Experience">
  <sl-menu-item value="option-1">Novice</sl-menu-item>
  <sl-menu-item value="option-2">Intermediate</sl-menu-item>
  <sl-menu-item value="option-3">Advanced</sl-menu-item>

  <div slot="help-text">Please tell us your skill level.</div>
</sl-select>
```

### Multiple

To allow multiple options to be selected, use the `multiple` attribute.

```html preview
<sl-select placeholder="Select a few" multiple>
  <sl-menu-item value="option-1">Option 1</sl-menu-item>
  <sl-menu-item value="option-2">Option 2</sl-menu-item>
  <sl-menu-item value="option-3">Option 3</sl-menu-item>
  <sl-menu-divider></sl-menu-divider>
  <sl-menu-item value="option-4">Option 4</sl-menu-item>
  <sl-menu-item value="option-5">Option 5</sl-menu-item>
  <sl-menu-item value="option-6">Option 6</sl-menu-item>
</sl-select>
```

### Size

Use the `size` attribute to change a select's size.

```html preview
<sl-select placeholder="Small" size="small" multiple>
  <sl-menu-item value="option-1">Option 1</sl-menu-item>
  <sl-menu-item value="option-2">Option 2</sl-menu-item>
  <sl-menu-item value="option-3">Option 3</sl-menu-item>
</sl-select>

<br>

<sl-select placeholder="Medium" size="medium" multiple>
  <sl-menu-item value="option-1">Option 1</sl-menu-item>
  <sl-menu-item value="option-2">Option 2</sl-menu-item>
  <sl-menu-item value="option-3">Option 3</sl-menu-item>
</sl-select>

<br>

<sl-select placeholder="Large" size="large" multiple>
  <sl-menu-item value="option-1">Option 1</sl-menu-item>
  <sl-menu-item value="option-2">Option 2</sl-menu-item>
  <sl-menu-item value="option-3">Option 3</sl-menu-item>
</sl-select>
```

### Pill

Use the `pill` prop to give selects rounded edges.

```html preview
<sl-select pill multiple>
  <sl-menu-item value="option-1">Option 1</sl-menu-item>
  <sl-menu-item value="option-2">Option 2</sl-menu-item>
  <sl-menu-item value="option-3">Option 3</sl-menu-item>
</sl-select>
```

### Groups

Options can be grouped visually using menu labels and menu dividers.

```html preview
<sl-select placeholder="Select one">
  <sl-menu-label>Group 1</sl-menu-label>
  <sl-menu-item value="option-1">Option 1</sl-menu-item>
  <sl-menu-item value="option-2">Option 2</sl-menu-item>
  <sl-menu-item value="option-3">Option 3</sl-menu-item>
  <sl-menu-divider></sl-menu-divider>
  <sl-menu-label>Group 2</sl-menu-label>
  <sl-menu-item value="option-4">Option 4</sl-menu-item>
  <sl-menu-item value="option-5">Option 5</sl-menu-item>
  <sl-menu-item value="option-6">Option 6</sl-menu-item>
</sl-select>
```

### Disabled

Use the `disabled` prop to disable a select.

```html preview
<sl-select placeholder="Disabled" disabled>
  <sl-menu-item value="option-1">Option 1</sl-menu-item>
  <sl-menu-item value="option-2">Option 2</sl-menu-item>
  <sl-menu-item value="option-3">Option 3</sl-menu-item>
</sl-select>
```

### Validation

Show a valid or invalid state by setting the `valid` and `invalid` attributes, respectively. Help text can be used to provide feedback for validation and will be styled accordingly.

```html preview
<sl-select placeholder="Valid" valid>
  <sl-menu-item value="option-1">Option 1</sl-menu-item>
  <sl-menu-item value="option-2">Option 2</sl-menu-item>
  <sl-menu-item value="option-3">Option 3</sl-menu-item>

  <div slot="help-text">This is a valid selection!</div>
</sl-select>

<br>

<sl-select placeholder="Invalid" invalid>
  <sl-menu-item value="option-1">Option 1</sl-menu-item>
  <sl-menu-item value="option-2">Option 2</sl-menu-item>
  <sl-menu-item value="option-3">Option 3</sl-menu-item>

  <div slot="help-text">This is not a valid selection!</div>
</sl-select>
```

[component-metadata:sl-select]
