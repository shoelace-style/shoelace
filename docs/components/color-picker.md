# Color Picker

[component-header:sl-color-picker]

Color pickers allow the user to select a color.

```html preview
<sl-color-picker></sl-color-picker>
```

## Examples

### Opacity

Use the `opacity` attribute to enable the opacity slider. When this is enabled, the value will be displayed as HEXA, RGBA, or HSLA based on `format`.

```html preview
<sl-color-picker opacity format="hsl"></sl-color-picker>
```

### Formats

Set the color picker's format with the `format` attribute. Valid options include `hex`, `rgb`, and `hsl`. Note that the color picker will accept any parsable format (including CSS color names) regardless of this option.

```html preview
<sl-color-picker format="hex" value="#4a90e2"></sl-color-picker>
<sl-color-picker format="rgb" value="rgb(80, 227, 194)"></sl-color-picker>
<sl-color-picker format="hsl" value="hsl(290, 87%, 47%)"></sl-color-picker>
```

### Inline

The color picker can be rendered inline instead of in a dropdown using the `inline` attribute.

```html preview
<sl-color-picker inline></sl-color-picker>
```

[component-metadata:sl-color-picker]
