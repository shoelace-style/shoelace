# Range

[component-header:sl-range]

Ranges...

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

```html preview
<sl-range min="0" max="100" step="1"></sl-range>
```

## Examples

### Custom Formatter

```html preview
<sl-range min="0" max="100" step="1" class="range-with-custom-formatter"></sl-range>

<script>
  const range = document.querySelector('.range-with-custom-formatter');
  range.tooltipFormatter = value => `Total - ${value}%`;
</script>
```

### Without Tooltip

```html preview
<sl-range min="0" max="100" step="1" tooltip="none"></sl-range>
```

### Disabled

```html preview
<sl-range min="0" max="100" step="1" disabled></sl-range>
```

[component-metadata:sl-range]
