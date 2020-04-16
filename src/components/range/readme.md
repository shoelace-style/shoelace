# Range

```html preview
<sl-range min="0" max="100" step="1"></sl-range>

<br><br>

<sl-range min="0" max="100" step="1" tooltip="bottom"></sl-range>

<br><br>

<!-- TODO: JS not executing -->
<sl-range id="range-with-custom-formatter" min="0" max="100" step="1"></sl-range>
<script>
document.querySelector('#range-with-custom-formatter').tooltipFormatter = value => `Total - ${value}%`;
</script>

<br><br>

<sl-range min="1" max="10" step=".25"></sl-range>

<br><br>

<sl-range min="0" max="100" step="1" disabled></sl-range>

<br><br>

<sl-range min="0" max="100" step="1" tooltip="off"></sl-range>
```

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


## Events

| Event      | Description                               | Type               |
| ---------- | ----------------------------------------- | ------------------ |
| `slBlur`   | Emitted when the control loses focus.     | `CustomEvent<any>` |
| `slChange` | Emitted when the control's value changes. | `CustomEvent<any>` |
| `slFocus`  | Emitted when the control gains focus.     | `CustomEvent<any>` |


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


