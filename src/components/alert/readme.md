# sl-alert



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

This component was built with [Stencil](https://stenciljs.com/).
