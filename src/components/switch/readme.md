# Switch

```html preview
<sh-switch>Switch</sh-switch><br><br>
<sh-switch checked>Checked</sh-switch><br><br>
<sh-switch disabled>Disabled</sh-switch><br><br>
```


<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description                                        | Type      | Default     |
| ---------------- | ----------------- | -------------------------------------------------- | --------- | ----------- |
| `checked`        | `checked`         | Set to true to draw the switch in a checked state. | `boolean` | `false`     |
| `disabled`       | `disabled`        | Set to true to disable the switch.                 | `boolean` | `false`     |
| `name`           | `name`            | A native input's name attribute.                   | `string`  | `undefined` |
| `nativeTabindex` | `native-tabindex` | The switch's tabindex attribute.                   | `number`  | `undefined` |
| `value`          | `value`           | The native input's value attribute.                | `string`  | `undefined` |


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


