TODO


<!-- Auto Generated Below -->


## Properties

| Property           | Attribute  | Description                                    | Type                         | Default                               |
| ------------------ | ---------- | ---------------------------------------------- | ---------------------------- | ------------------------------------- |
| `disabled`         | `disabled` | Set to true to disable the input.              | `boolean`                    | `false`                               |
| `max`              | `max`      | The input's max attribute.                     | `number`                     | `100`                                 |
| `min`              | `min`      | The input's min attribute.                     | `number`                     | `0`                                   |
| `name`             | `name`     | The input's name attribute.                    | `string`                     | `''`                                  |
| `step`             | `step`     | The input's step attribute.                    | `number`                     | `1`                                   |
| `tooltip`          | `tooltip`  | The tooltip's position.                        | `"bottom" \| "off" \| "top"` | `'top'`                               |
| `tooltipFormatter` | --         | A function used to format the tooltip's value. | `(value: number) => string`  | `(value: number) => value.toString()` |
| `value`            | `value`    | The input's value attribute.                   | `number`                     | `undefined`                           |


## Methods

### `removeFocus() => Promise<void>`

Removes focus from the input.

#### Returns

Type: `Promise<void>`



### `setFocus() => Promise<void>`

Sets focus on the input.

#### Returns

Type: `Promise<void>`




----------------------------------------------


