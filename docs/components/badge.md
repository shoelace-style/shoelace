# Badge

[component-header:sl-badge]

Badges are used to draw attention and display statuses or counts.

```html preview
<sl-badge>Badge</sl-icon></sl-badge>
```

## Examples

### Types

Set the `type` attribute to change the badge's type.

```html preview
<sl-badge type="primary">Primary</sl-icon></sl-badge>
<sl-badge type="success">Success</sl-badge>
<sl-badge type="info">Info</sl-badge>
<sl-badge type="warning">Warning</sl-badge>
<sl-badge type="danger">Danger</sl-badge>
```

### Pill Badges

```html preview
<sl-badge type="primary" pill>Primary</sl-icon></sl-badge>
<sl-badge type="success" pill>Success</sl-badge>
<sl-badge type="info" pill>Info</sl-badge>
<sl-badge type="warning" pill>Warning</sl-badge>
<sl-badge type="danger" pill>Danger</sl-badge>
```

### With Buttons

One of the most common use cases for badges is attaching them to buttons. To make this easier, badges will be automatically positioned at the top-right when they're a child of a button.

```html preview
<sl-button>
  Requests
  <sl-badge pill>30</sl-badge>
</sl-button>

<sl-button style="margin-left: 1rem;">
  Warnings
  <sl-badge type="warning" pill>8</sl-badge>
</sl-button>

<sl-button style="margin-left: 1rem;">
  Errors
  <sl-badge type="danger" pill>6</sl-badge>
</sl-button>
```

### With Menu Items

When including badges in menu items, use the `suffix` slot to make sure they're aligned correctly.

```html preview
<sl-menu
  style="max-width: 240px; border: solid 1px var(--sl-color-gray-90); border-radius: var(--sl-border-radius-medium);"
>
  <sl-menu-label>Messages</sl-menu-label>
  <sl-menu-item>Comments <sl-badge slot="suffix" pill>4</sl-badge></sl-menu-item>
  <sl-menu-item>Replies <sl-badge slot="suffix" pill>12</sl-badge></sl-menu-item>
</sl-menu>
```

[component-metadata:sl-badge]
