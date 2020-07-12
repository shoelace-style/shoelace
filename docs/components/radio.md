# Radio

[component-header:sl-radio]

Radios allow the user to select one option from a group of many.

```html preview
<sl-radio>Radio</sl-radio><br>
```

?> This component doesn't work with standard forms. Use [`<sl-form>`](/components/form.md) instead.

## Examples

### Checked

Use the `checked` attribute to activate the radio.

```html preview
<sl-radio checked>Checked</sl-radio><br>
```

### Disabled

Use the `disabled` attribute to disable the radio.

```html preview
<sl-radio disabled>Disabled</sl-radio><br>
```

### Grouping Radios

Radios are grouped based on their `name` attribute.

```html preview
<sl-radio name="option" checked>Option 1</sl-radio><br>
<sl-radio name="option">Option 2</sl-radio><br>
<sl-radio name="option">Option 3</sl-radio><br>
<sl-radio name="option">Option 4</sl-radio><br>
```

[component-metadata:sl-radio]
