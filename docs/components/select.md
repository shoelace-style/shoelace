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
<sl-select label="Select one" pill multiple>
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

[component-metadata:sl-select]
