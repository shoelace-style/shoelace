# Alert

```html preview
<sl-alert type="primary">This is a primary alert, if you couldn't tell.</sl-alert><br>
<sl-alert type="success">This is a success alert, if you couldn't tell.</sl-alert><br>
<sl-alert type="info">This is a info alert, if you couldn't tell.</sl-alert><br>
<sl-alert type="warning">This is a warning alert, if you couldn't tell.</sl-alert><br>
<sl-alert type="danger">This is a danger alert, if you couldn't tell.</sl-alert>
```

```html preview
<sl-alert type="primary">
  <ion-icon slot="icon" name="information-circle-outline"></ion-icon>
  This is a primary alert, if you couldn't tell.
</sl-alert><br>

<sl-alert type="success">
  <ion-icon slot="icon" name="checkmark-outline"></ion-icon>
  This is a success alert, if you couldn't tell.
</sl-alert><br>

<sl-alert type="info">
  <ion-icon slot="icon" name="settings-outline"></ion-icon>
  This is a info alert, if you couldn't tell.
</sl-alert><br>

<sl-alert type="warning">
  <ion-icon slot="icon" name="alert-circle-outline"></ion-icon>
  This is a warning alert, if you couldn't tell.
</sl-alert><br>

<sl-alert type="danger">
  <ion-icon slot="icon" name="alarm-outline"></ion-icon>
  This is a danger alert, if you couldn't tell.
</sl-alert>
```

```html preview
<sl-alert type="primary" closable>This is a primary alert, if you couldn't tell.</sl-alert><br>
<sl-alert type="success" closable>This is a success alert, if you couldn't tell.</sl-alert><br>
<sl-alert type="info" closable>This is a info alert, if you couldn't tell.</sl-alert><br>
<sl-alert type="warning" closable>This is a warning alert, if you couldn't tell.</sl-alert><br>
<sl-alert type="danger" closable>This is a danger alert, if you couldn't tell.</sl-alert>
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


