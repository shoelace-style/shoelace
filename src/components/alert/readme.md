# Alert

```html preview
<sl-alert type="primary" open>
  Nothing fancy here, just a simple and functional alert.
</sl-alert><br>

<sl-alert type="primary" open closable>
  <sl-icon slot="icon" name="info"></sl-icon>
  A bit fancier because now it has an icon and is closable.
</sl-alert>
```

```html preview
<sl-alert type="primary" open closable>
  <sl-icon slot="icon" name="info" style="color: var(--sl-color-primary-50);"></sl-icon>
  <strong>Your changes have been saved</strong><br>
  You can continue working or safely leave the app now.
</sl-alert><br>

<sl-alert type="success" open closable>
  <sl-icon slot="icon" name="check-circle" style="color: var(--sl-color-success-50);"></sl-icon>
  <strong>Your changes have been saved</strong><br>
  You can continue working or safely leave the app now.
</sl-alert><br>

<sl-alert type="info" open closable>
  <sl-icon slot="icon" name="settings" style="color: var(--sl-color-info-50);"></sl-icon>
  <strong>Your changes have been saved</strong><br>
  You can continue working or safely leave the app now.
</sl-alert><br>

<sl-alert type="warning" open closable>
  <sl-icon slot="icon" name="alert-triangle" style="color: var(--sl-color-warning-50);"></sl-icon>
  <strong>Your changes have been saved</strong><br>
  You can continue working or safely leave the app now.
</sl-alert><br>

<sl-alert type="danger" open closable>
  <sl-icon slot="icon" name="alert-octagon" style="color: var(--sl-color-danger-50);"></sl-icon>
  <strong>Your changes have been saved</strong><br>
  You can continue working or safely leave the app now.
</sl-alert>
```

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                 | Type      | Default |
| ---------- | ---------- | ------------------------------------------- | --------- | ------- |
| `closable` | `closable` | Set to true to make the alert closable.     | `boolean` | `false` |
| `open`     | `open`     | Indicates whether or not the alert is open. | `boolean` | `false` |


## Events

| Event         | Description                                                                                        | Type               |
| ------------- | -------------------------------------------------------------------------------------------------- | ------------------ |
| `slAfterHide` | Emitted after the alert closes and all transitions are complete.                                   | `CustomEvent<any>` |
| `slAfterShow` | Emitted after the alert opens and all transitions are complete.                                    | `CustomEvent<any>` |
| `slHide`      | Emitted when the alert closes. Calling `event.preventDefault()` will prevent it from being closed. | `CustomEvent<any>` |
| `slShow`      | Emitted when the alert opens. Calling `event.preventDefault()` will prevent it from being opened.  | `CustomEvent<any>` |


## Methods

### `hide() => Promise<boolean>`

Hides the alert

#### Returns

Type: `Promise<boolean>`



### `show() => Promise<boolean>`

Hides the alert.

#### Returns

Type: `Promise<boolean>`




## Slots

| Slot           | Description                                       |
| -------------- | ------------------------------------------------- |
|                | The alert's content.                              |
| `"close-icon"` | An icon to use in lieu of the default close icon. |
| `"icon"`       | An icon to show in the alert.                     |


## CSS Custom Properties

| Name           | Description                              |
| -------------- | ---------------------------------------- |
| `--box-shadow` | The box shadow to render the alert with. |


## Dependencies

### Depends on

- [sl-icon](../icon)

### Graph
```mermaid
graph TD;
  sl-alert --> sl-icon
  style sl-alert fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


