# Checkbox

```html preview
<sh-checkbox>Default</sh-checkbox><br><br>
<sh-checkbox checked>Checked</sh-checkbox><br><br>
<sh-checkbox indeterminate>Indeterminate</sh-checkbox><br><br>
<sh-checkbox disabled>Disabled</sh-checkbox><br><br>
```

<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description                                                 | Type      | Default     |
| ---------------- | ----------------- | ----------------------------------------------------------- | --------- | ----------- |
| `checked`        | `checked`         | Set to true to draw the checkbox in a checked state.        | `boolean` | `false`     |
| `disabled`       | `disabled`        | Set to true to disable the checkbox.                        | `boolean` | `false`     |
| `indeterminate`  | `indeterminate`   | Set to true to draw the checkbox in an indeterminate state. | `boolean` | `false`     |
| `name`           | `name`            | A native input's name attribute.                            | `string`  | `undefined` |
| `nativeTabindex` | `native-tabindex` | The checkbox's tabindex attribute.                          | `number`  | `undefined` |
| `value`          | `value`           | The native input's value attribute.                         | `string`  | `undefined` |


## Methods

### `removeFocus() => Promise<void>`

Removes focus from the checkbox.

#### Returns

Type: `Promise<void>`



### `setFocus() => Promise<void>`

Sets focus on the checkbox.

#### Returns

Type: `Promise<void>`




## Slots

| Slot | Description           |
| ---- | --------------------- |
|      | The checkbox's label. |


----------------------------------------------


