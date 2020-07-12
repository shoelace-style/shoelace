# Range

[component-header:sl-range]

Ranges allow the user to select a single value within a given range using a slider.

```html preview
<sl-range min="0" max="100" step="1"></sl-range>
```

?> This component doesn't work with standard forms. Use [`<sl-form>`](/components/form.md) instead.

## Examples

### Disabled

Use the `disabled` prop to disable a slider.

```html preview
<sl-range min="0" max="100" step="1" disabled></sl-range>
```

### Tooltip Placement

By default, the tooltip is shown on top. Set `tooltip` to `bottom` to show it below the slider.

```html preview
<sl-range min="0" max="100" step="1" tooltip="bottom"></sl-range>
```

### Disable the Tooltip

To disable the tooltip, set `tooltip` to `none`.

```html preview
<sl-range min="0" max="100" step="1" tooltip="none"></sl-range>
```

### Custom Tooltip Formatter

You can change the tooltip's content by setting the `tooltipFormatter` prop to a function that accepts the range's value as an argument.

```html preview
<sl-range min="0" max="100" step="1" class="range-with-custom-formatter"></sl-range>

<script>
  const range = document.querySelector('.range-with-custom-formatter');
  range.tooltipFormatter = value => `Total - ${value}%`;
</script>
```

[component-metadata:sl-range]
