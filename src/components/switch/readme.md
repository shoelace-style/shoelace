# Switch

```html preview
<sl-switch>Switch</sl-switch><br><br>
<sl-switch checked>Checked</sl-switch><br><br>
<sl-switch disabled>Disabled</sl-switch><br><br>
```


<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                        | Type      | Default     |
| ---------- | ---------- | -------------------------------------------------- | --------- | ----------- |
| `checked`  | `checked`  | Set to true to draw the switch in a checked state. | `boolean` | `false`     |
| `disabled` | `disabled` | Set to true to disable the switch.                 | `boolean` | `false`     |
| `name`     | `name`     | A native input's name attribute.                   | `string`  | `undefined` |
| `value`    | `value`    | The native input's value attribute.                | `string`  | `undefined` |


## Events

| Event      | Description                               | Type               |
| ---------- | ----------------------------------------- | ------------------ |
| `slBlur`   | Emitted when the control loses focus.     | `CustomEvent<any>` |
| `slChange` | Emitted when the control's state changes. | `CustomEvent<any>` |
| `slFocus`  | Emitted when the control gains focus.     | `CustomEvent<any>` |


## Methods

### `removeFocus() => Promise<void>`

Removes focus from the switch.

#### Returns

Type: `Promise<void>`



### `setFocus() => Promise<void>`

Sets focus on the switch.

#### Returns

Type: `Promise<void>`




## Slots

| Slot | Description         |
| ---- | ------------------- |
|      | The switch's label. |


----------------------------------------------


