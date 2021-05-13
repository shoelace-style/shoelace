# Radio

[component-header:sl-radio]

Radios allow the user to select one option from a group of many.

Radios are designed to be used with [radio groups](/components/radio-group). As such, all of the examples on this page utilize them to demonstrate their correct usage.

```html preview
<sl-radio-group label="Select an option" no-fieldset>
  <sl-radio value="1" checked>Option 1</sl-radio>
  <sl-radio value="2">Option 2</sl-radio>
  <sl-radio value="3">Option 3</sl-radio>
</sl-radio-group>
```

?> This component doesn't work with standard forms. Use [`<sl-form>`](/components/form) instead.

## Examples

### Disabled

Use the `disabled` attribute to disable a radio.

```html preview
<sl-radio-group label="Select an option" no-fieldset>
  <sl-radio value="1" checked>Option 1</sl-radio>
  <sl-radio value="2">Option 2</sl-radio>
  <sl-radio value="3">Option 3</sl-radio>
  <sl-radio value="4" disabled>Disabled</sl-radio>
</sl-radio-group>
```

[component-metadata:sl-radio]
