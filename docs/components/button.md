# Button

[component-header:sl-button]

Buttons represent actions that are available to the user.

```html preview
<sl-button>Button</sl-button>
```

## Examples

### Types

Use the `type` attribute to set the button's type.

```html preview
<sl-button type="default">Default</sl-button>
<sl-button type="primary">Primary</sl-button>
<sl-button type="success">Success</sl-button>
<sl-button type="info">Info</sl-button>
<sl-button type="warning">Warning</sl-button>
<sl-button type="danger">Danger</sl-button>
```

### Sizes

Use the `size` attribute to change a button's size.

```html preview
<sl-button size="small">Small</sl-button>
<sl-button size="medium">Medium</sl-button>
<sl-button size="large">Large</sl-button>
```

### Pill Buttons

Use the `pill` attribute to give buttons rounded edges.

```html preview
<sl-button size="small" pill>Small</sl-button>
<sl-button size="medium" pill>Medium</sl-button>
<sl-button size="large" pill>Large</sl-button>
```

### Circle Buttons

Use the `circle` attribute to create circular icon buttons.

```html preview
<sl-button type="default" size="small" circle><sl-icon name="gear"></sl-icon></sl-button>
<sl-button type="default" size="medium" circle><sl-icon name="gear"></sl-icon></sl-button>
<sl-button type="default" size="large" circle><sl-icon name="gear"></sl-icon></sl-button>
```

### Text Buttons

Use the `text` type to create text buttons that share the same size as regular buttons but don't have backgrounds or borders.

```html preview
<sl-button type="text" size="small">Text</sl-button>
<sl-button type="text" size="medium">Text</sl-button>
<sl-button type="text" size="large">Text</sl-button>
```

### Link Buttons

It's often helpful to have a button that works like a link. This is possible by setting the `href` attribute, which will make the component render an `<a>` under the hood. This gives you all the default link behavior the browser provides (e.g. <kbd>CMD/CTRL/SHIFT + CLICK</kbd>) and exposes the `target` and `download` attributes.

```html preview
<sl-button href="https://example.com/">Link</sl-button>
<sl-button href="https://example.com/" target="_blank">New Window</sl-button>
<sl-button href="/assets/images/wordmark.svg" download="shoelace.svg">Download</sl-button>
<sl-button href="https://example.com/" disabled>Disabled</sl-button>
```

?> When a `target` is set, the link will receive `rel="noreferrer noopener"` for [security reasons](https://mathiasbynens.github.io/rel-noopener/).

### Setting a Custom Width

As expected, buttons can be given a custom width by setting its `width`. This is useful for making buttons span the full width of their container on smaller screens.

```html preview
<sl-button type="default" size="small" style="width: 100%; margin-bottom: 1rem;">Small</sl-button>
<sl-button type="default" size="medium" style="width: 100%; margin-bottom: 1rem;">Medium</sl-button>
<sl-button type="default" size="large" style="width: 100%;">Large</sl-button>
```

### Prefix and Suffix Icons

Use the `prefix` and `suffix` slots to add icons.

```html preview
<sl-button type="default" size="small">
  <sl-icon slot="prefix" name="gear"></sl-icon>
  Settings
</sl-button>

<sl-button type="default" size="small">
  <sl-icon slot="suffix" name="arrow-counterclockwise"></sl-icon>
  Refresh
</sl-button>

<sl-button type="default" size="small">
  <sl-icon slot="prefix" name="link-45deg"></sl-icon>
  <sl-icon slot="suffix" name="box-arrow-up-right"></sl-icon>
  Open
</sl-button>

<br><br>

<sl-button type="default">
  <sl-icon slot="prefix" name="gear"></sl-icon>
  Settings
</sl-button>

<sl-button type="default">
  <sl-icon slot="suffix" name="arrow-counterclockwise"></sl-icon>
  Refresh
</sl-button>

<sl-button type="default">
  <sl-icon slot="prefix" name="link-45deg"></sl-icon>
  <sl-icon slot="suffix" name="box-arrow-up-right"></sl-icon>
  Open
</sl-button>

<br><br>

<sl-button type="default" size="large">
  <sl-icon slot="prefix" name="gear"></sl-icon>
  Settings
</sl-button>

<sl-button type="default" size="large">
  <sl-icon slot="suffix" name="arrow-counterclockwise"></sl-icon>
  Refresh
</sl-button>

<sl-button type="default" size="large">
  <sl-icon slot="prefix" name="link-45deg"></sl-icon>
  <sl-icon slot="suffix" name="box-arrow-up-right"></sl-icon>
  Open
</sl-button>
```

### Caret

Use the `caret` attribute to add a dropdown indicator when a button will trigger a dropdown, menu, or popover.

```html preview
<sl-button size="small" caret>Small</sl-button>
<sl-button size="medium" caret>Medium</sl-button>
<sl-button size="large" caret>Large</sl-button>
```

### Loading

Use the `loading` attribute to make a button busy. The width will remain the same as before, preventing adjacent elements from moving around. Clicks will be suppressed until the loading state is removed.

```html preview
<sl-button type="default" loading>Default</sl-button>
<sl-button type="primary" loading>Primary</sl-button>
<sl-button type="success" loading>Success</sl-button>
<sl-button type="info" loading>Info</sl-button>
<sl-button type="warning" loading>Warning</sl-button>
<sl-button type="danger" loading>Danger</sl-button>
```

### Disabled

Use the `disabled` attribute to disable a button. Clicks will be suppressed until the disabled state is removed.

```html preview
<sl-button type="default" disabled>Default</sl-button>
<sl-button type="primary" disabled>Primary</sl-button>
<sl-button type="success" disabled>Success</sl-button>
<sl-button type="info" disabled>Info</sl-button>
<sl-button type="warning" disabled>Warning</sl-button>
<sl-button type="danger" disabled>Danger</sl-button>
```

### Styling Buttons

This example demonstrates how to style buttons using a custom class. This is the recommended approach if you need to add additional variations. To customize an existing variation, modify the selector to target the button's type attribute instead of a class (e.g. `sl-button[type="primary"]`).

```html preview
<sl-button class="pink">Pink Button</sl-button>

<style>
  sl-button.pink::part(base) {
    /* Set design tokens for height and border width */
    --sl-input-height-medium: 48px;
    --sl-input-border-width: 4px;
    
    border-radius: 0;
    background-color: #ff1493;
    border-top-color: #ff7ac1;
    border-left-color: #ff7ac1;
    border-bottom-color: #ad005c;
    border-right-color: #ad005c;
    color: white;
    font-size: 1.125rem;
    box-shadow: 0 2px 10px #0002;
    transition: var(--sl-transition-medium) transform ease, var(--sl-transition-medium) border ease;
  }

  sl-button.pink::part(base):hover {
    transform: scale(1.05) rotate(-1deg);
  }

  sl-button.pink::part(base):active {
    border-top-color: #ad005c;
    border-right-color: #ff7ac1;
    border-bottom-color: #ff7ac1;
    border-left-color: #ad005c;
    transform: scale(1.05) rotate(-1deg) translateY(2px);
  }

  sl-button.pink::part(base):focus-visible {
    outline: dashed 2px deeppink;
    outline-offset: 4px;
  }
</style>
```

[component-metadata:sl-button]
