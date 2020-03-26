# Button

Good ol' buttons. They're usually the first thing I look at when reviewing a component library. Shoelace offers a variation for every theme color.

```html preview
<sh-button type="default">Default</sh-button>
<sh-button type="primary">Primary</sh-button>
<sh-button type="success">Success</sh-button>
<sh-button type="info">Info</sh-button>
<sh-button type="warning">Warning</sh-button>
<sh-button type="danger">Danger</sh-button>
```

## Round

Use the `round` prop to give buttons rounded edges.

```html preview
<sh-button type="default" round>Default</sh-button>
<sh-button type="primary" round>Primary</sh-button>
<sh-button type="success" round>Success</sh-button>
<sh-button type="info" round>Info</sh-button>
<sh-button type="warning" round>Warning</sh-button>
<sh-button type="danger" round>Danger</sh-button>
```

## Sizes

Use the `size` prop to change a button's size.

```html preview
<sh-button size="small">Small</sh-button>
<sh-button size="medium">Medium</sh-button>
<sh-button size="large">Large</sh-button>
```

## Circle

Use the `circle` prop to create circular icon buttons.

```html preview
<sh-button type="default" size="small" circle><ion-icon name="settings-outline"></ion-icon></sh-button>
<sh-button type="default" size="medium" circle><ion-icon name="settings-outline"></ion-icon></sh-button>
<sh-button type="default" size="large" circle><ion-icon name="settings-outline"></ion-icon></sh-button>
```

## Text

Use `type="text"` to create text buttons, which share the same size as regular buttons but don't have backgrounds or borders.

```html preview
<sh-button type="text" size="small">Text</sh-button>
<sh-button type="text" size="medium">Text</sh-button>
<sh-button type="text" size="large">Text</sh-button>
```

## Block

Use the `block` prop to create a block-level button that spans 100% of its container's width.

```html preview
<sh-button type="default" block size="small">Small</sh-button>
<br>
<sh-button type="default" block size="medium">Medium</sh-button>
<br>
<sh-button type="default" block size="large">Large</sh-button>
```

## Icons

Use the `prefix` and `suffix` slots to add icons.

```html preview
<sh-button type="default">
  <ion-icon slot="prefix" name="arrow-back-outline"></ion-icon>
  Back
</sh-button>
<sh-button type="default">
  <ion-icon slot="suffix" name="arrow-forward-outline"></ion-icon>
  Next
</sh-button>
<sh-button type="default">
  <ion-icon slot="prefix" name="link-outline"></ion-icon>
  <ion-icon slot="suffix" name="open-outline"></ion-icon>
  Open
</sh-button>
```

## Caret

Use the `caret` prop to add a dropdown indicator when a button will trigger a dropdown, menu, or popover.

```html preview
<sh-button size="small" caret>Small</sh-button>
<sh-button size="medium" caret>Medium</sh-button>
<sh-button size="large" caret>Large</sh-button>
```

## Loading

Use the `loading` prop to make a button busy. The width will remain the same as before, preventing adjacent elements from moving around.

```html preview
<sh-button type="default" loading>Default</sh-button>
<sh-button type="primary" loading>Primary</sh-button>
<sh-button type="success" loading>Success</sh-button>
<sh-button type="info" loading>Info</sh-button>
<sh-button type="warning" loading>Warning</sh-button>
<sh-button type="danger" loading>Danger</sh-button>
```

## Disabled

Use the `disabled` prop to disable a button.

```html preview
<sh-button type="default" disabled>Default</sh-button>
<sh-button type="primary" disabled>Primary</sh-button>
<sh-button type="success" disabled>Success</sh-button>
<sh-button type="info" disabled>Info</sh-button>
<sh-button type="warning" disabled>Warning</sh-button>
<sh-button type="danger" disabled>Danger</sh-button>
```


<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description                                                                        | Type                                                                               | Default     |
| ---------------- | ----------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ----------- |
| `block`          | `block`           | Set to true to draw a full-width button.                                           | `boolean`                                                                          | `false`     |
| `caret`          | `caret`           | Set to true to draw the button with a caret for use with dropdowns, popovers, etc. | `boolean`                                                                          | `false`     |
| `circle`         | `circle`          | Set to true to draw a circle button.                                               | `boolean`                                                                          | `false`     |
| `disabled`       | `disabled`        | Set to true to disable the button.                                                 | `boolean`                                                                          | `false`     |
| `loading`        | `loading`         | Set to true to draw the button in a loading state.                                 | `boolean`                                                                          | `false`     |
| `nativeTabindex` | `native-tabindex` | The button's tabindex attribute.                                                   | `number`                                                                           | `undefined` |
| `round`          | `round`           | Set to true to draw a rounded button.                                              | `boolean`                                                                          | `false`     |
| `size`           | `size`            | The button's size.                                                                 | `"large" or "medium" or "small"`                                                   | `'medium'`  |
| `type`           | `type`            | The button's type.                                                                 | `"danger" or "default" or "info" or "primary" or "success" or "text" or "warning"` | `'default'` |


## Methods

### `removeFocus() => Promise<void>`

Removes focus from the button.

#### Returns

Type: `Promise<void>`



### `setFocus() => Promise<void>`

Sets focus on the button.

#### Returns

Type: `Promise<void>`




## Slots

| Slot       | Description                                               |
| ---------- | --------------------------------------------------------- |
|            | The button's label.                                       |
| `"prefix"` | Used to prepend an icon or similar element to the button. |
| `"suffix"` | Used to append an icon or similar element to the button.  |


----------------------------------------------


