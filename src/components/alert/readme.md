# Alert

```html preview
<sl-alert type="primary">
  <strong>Your changes have been saved</strong><br>
  You can continue working or safely leave the app now.
</sl-alert><br>
<sl-alert type="success">
  <strong>Your changes have been saved</strong><br>
  You can continue working or safely leave the app now.
</sl-alert><br>
<sl-alert type="info">
  <strong>Your changes have been saved</strong><br>
  You can continue working or safely leave the app now.
</sl-alert><br>
<sl-alert type="warning">
  <strong>Your changes have been saved</strong><br>
  You can continue working or safely leave the app now.
</sl-alert><br>
<sl-alert type="danger">
  <strong>Your changes have been saved</strong><br>
  You can continue working or safely leave the app now.
</sl-alert>
```

```html preview
<sl-alert type="primary">
  <ion-icon slot="icon" name="information-circle-outline"></ion-icon>
  <strong>Your changes have been saved</strong><br>
  You can continue working or safely leave the app now.
</sl-alert><br>

<sl-alert type="success">
  <ion-icon slot="icon" name="checkmark-outline"></ion-icon>
  <strong>Your changes have been saved</strong><br>
  You can continue working or safely leave the app now.
</sl-alert><br>

<sl-alert type="info">
  <ion-icon slot="icon" name="settings-outline"></ion-icon>
  <strong>Your changes have been saved</strong><br>
  You can continue working or safely leave the app now.
</sl-alert><br>

<sl-alert type="warning">
  <ion-icon slot="icon" name="warning-outline"></ion-icon>
  <strong>Your changes have been saved</strong><br>
  You can continue working or safely leave the app now.
</sl-alert><br>

<sl-alert type="danger">
  <ion-icon slot="icon" name="alert-circle-outline"></ion-icon>
  <strong>Your changes have been saved</strong><br>
  You can continue working or safely leave the app now.
</sl-alert>
```

```html preview
<sl-alert type="primary" closable>
  <strong>Your changes have been saved</strong><br>
  You can continue working or safely leave the app now.
</sl-alert><br>

<sl-alert type="success" closable>
  <strong>Your changes have been saved</strong><br>
  You can continue working or safely leave the app now.
</sl-alert><br>

<sl-alert type="info" closable>
  <strong>Your changes have been saved</strong><br>
  You can continue working or safely leave the app now.
</sl-alert><br>

<sl-alert type="warning" closable>
  <strong>Your changes have been saved</strong><br>
  You can continue working or safely leave the app now.
</sl-alert><br>

<sl-alert type="danger" closable>
  <strong>Your changes have been saved</strong><br>
  You can continue working or safely leave the app now.
</sl-alert>
```

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                             | Type      | Default     |
| ---------- | ---------- | --------------------------------------- | --------- | ----------- |
| `closable` | `closable` | Set to true to make the alert closable. | `boolean` | `false`     |
| `closed`   | `closed`   | Set to true to close the alert.         | `boolean` | `false`     |
| `type`     | `type`     | The type of alert to draw.              | `string`  | `'primary'` |


## Events

| Event     | Description                       | Type               |
| --------- | --------------------------------- | ------------------ |
| `slClose` | Emitted when the alert is closed. | `CustomEvent<any>` |


## Slots

| Slot     | Description                   |
| -------- | ----------------------------- |
|          | The alert's content.          |
| `"icon"` | An icon to show in the alert. |


----------------------------------------------


