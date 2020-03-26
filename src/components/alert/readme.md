# Alert

```html preview
<sh-alert type="primary">
  <strong>Your changes have been saved</strong><br>
  You can continue working or safely leave the app now.
</sh-alert><br>
<sh-alert type="success">
  <strong>Your changes have been saved</strong><br>
  You can continue working or safely leave the app now.
</sh-alert><br>
<sh-alert type="info">
  <strong>Your changes have been saved</strong><br>
  You can continue working or safely leave the app now.
</sh-alert><br>
<sh-alert type="warning">
  <strong>Your changes have been saved</strong><br>
  You can continue working or safely leave the app now.
</sh-alert><br>
<sh-alert type="danger">
  <strong>Your changes have been saved</strong><br>
  You can continue working or safely leave the app now.
</sh-alert>
```

```html preview
<sh-alert type="primary">
  <ion-icon slot="icon" style="font-size: 20px;" name="information-circle-outline"></ion-icon>
  <strong>Your changes have been saved</strong><br>
  You can continue working or safely leave the app now.
</sh-alert><br>

<sh-alert type="success">
  <ion-icon slot="icon" style="font-size: 20px;" name="checkmark-outline"></ion-icon>
  <strong>Your changes have been saved</strong><br>
  You can continue working or safely leave the app now.
</sh-alert><br>

<sh-alert type="info">
  <ion-icon slot="icon" style="font-size: 20px;" name="settings-outline"></ion-icon>
  <strong>Your changes have been saved</strong><br>
  You can continue working or safely leave the app now.
</sh-alert><br>

<sh-alert type="warning">
  <ion-icon slot="icon" style="font-size: 20px;" name="warning-outline"></ion-icon>
  <strong>Your changes have been saved</strong><br>
  You can continue working or safely leave the app now.
</sh-alert><br>

<sh-alert type="danger">
  <ion-icon slot="icon" style="font-size: 20px;" name="alert-circle-outline"></ion-icon>
  <strong>Your changes have been saved</strong><br>
  You can continue working or safely leave the app now.
</sh-alert>
```

```html preview
<sh-alert type="primary" closable>
  <strong>Your changes have been saved</strong><br>
  You can continue working or safely leave the app now.
</sh-alert><br>

<sh-alert type="success" closable>
  <strong>Your changes have been saved</strong><br>
  You can continue working or safely leave the app now.
</sh-alert><br>

<sh-alert type="info" closable>
  <strong>Your changes have been saved</strong><br>
  You can continue working or safely leave the app now.
</sh-alert><br>

<sh-alert type="warning" closable>
  <strong>Your changes have been saved</strong><br>
  You can continue working or safely leave the app now.
</sh-alert><br>

<sh-alert type="danger" closable>
  <strong>Your changes have been saved</strong><br>
  You can continue working or safely leave the app now.
</sh-alert>
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
| `shClose` | Emitted when the alert is closed. | `CustomEvent<any>` |


## Slots

| Slot     | Description                   |
| -------- | ----------------------------- |
|          | The alert's content.          |
| `"icon"` | An icon to show in the alert. |


----------------------------------------------


