# Radio Group

[component-header:sl-radio-group]

Radio Groups are used to group multiple radios so they function as a single control.

```html preview
<sl-radio-group label="Select an item">
  <sl-radio value="1" checked>Item 1</sl-radio>
  <sl-radio value="2">Item 2</sl-radio>
  <sl-radio value="3">Item 3</sl-radio>
</sl-radio-group>
```

## Examples

### Hiding the Fieldset

You can hide the fieldset and legend that wraps the radio group using the `no-fieldset` attribute. In this case, a label is still required for assistive devices to properly identify the control.

```html preview
<sl-radio-group label="Select an item" no-fieldset>
  <sl-radio value="1" checked>Item 1</sl-radio>
  <sl-radio value="2">Item 2</sl-radio>
  <sl-radio value="3">Item 3</sl-radio>
</sl-radio-group>
```

[component-metadata:sl-radio-group]
