# Divider

[component-header:sl-divider]

Dividers are used to visually separate or group elements.

```html preview
<sl-divider></sl-divider>
```

## Examples

### Width

Use the `--width` custom property to change the width of the divider.

```html preview
<sl-divider style="--width: 4px;"></sl-divider>
```

### Color

Use the `--color` custom property to change the color of the divider.

```html preview
<sl-divider style="--color: tomato;"></sl-divider>
```

### Spacing

Use the `--spacing` custom property to change the amount of space between the divider and it's neighboring elements.

```html preview
<div style="text-align: center;">
  Above
  <sl-divider style="--spacing: 2rem;"></sl-divider>
  Below
</div>
```

### Vertical

Add the `vertical` attribute to draw the divider in a vertical orientation. The divider will span the full height of its container. Vertical dividers work especially well inside of a flex container.

```html preview
<div style="display: flex; align-items: center; height: 2rem;">
  First
  <sl-divider vertical></sl-divider>
  Middle
  <sl-divider vertical></sl-divider>
  Last
</div>
```

### Menu Dividers

Use dividers in [menus](/components/menu) to visually group menu items.

```html preview
<sl-menu style="max-width: 200px; border: solid 1px rgb(var(--sl-panel-border-color)); border-radius: var(--sl-border-radius-medium);">
  <sl-menu-item value="1">Option 1</sl-menu-item>
  <sl-menu-item value="2">Option 2</sl-menu-item>
  <sl-menu-item value="3">Option 3</sl-menu-item>
  <sl-divider></sl-divider>
  <sl-menu-item value="4">Option 4</sl-menu-item>
  <sl-menu-item value="5">Option 5</sl-menu-item>
  <sl-menu-item value="6">Option 6</sl-menu-item>
</sl-menu>
```

[component-metadata:sl-divider]
