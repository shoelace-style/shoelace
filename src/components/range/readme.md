# Range

```html preview
<sh-range min="0" max="100" step="1"></sh-range>

<br><br>

<sh-range min="0" max="100" step="1" tooltip="bottom"></sh-range>

<br><br>

<!-- TODO: JS not executing -->
<sh-range id="range-with-custom-formatter" min="0" max="100" step="1"></sh-range>
<script>
document.querySelector('#range-with-custom-formatter').tooltipFormatter = value => `Total - ${value}%`;
</script>

<br><br>

<sh-range min="1" max="10" step=".25"></sh-range>

<br><br>

<sh-range min="0" max="100" step="1" disabled></sh-range>

<br><br>

<sh-range min="0" max="100" step="1" tooltip="off"></sh-range>
```

<!-- Auto Generated Below -->


## Properties

| Property           | Attribute         | Description                                    | Type                         | Default                               |
| ------------------ | ----------------- | ---------------------------------------------- | ---------------------------- | ------------------------------------- |
| `disabled`         | `disabled`        | Set to true to disable the input.              | `boolean`                    | `false`                               |
| `max`              | `max`             | The input's max attribute.                     | `number`                     | `100`                                 |
| `min`              | `min`             | The input's min attribute.                     | `number`                     | `0`                                   |
| `name`             | `name`            | The input's name attribute.                    | `string`                     | `''`                                  |
| `nativeTabindex`   | `native-tabindex` | The range's tabindex attribute.                | `number`                     | `undefined`                           |
| `step`             | `step`            | The input's step attribute.                    | `number`                     | `1`                                   |
| `tooltip`          | `tooltip`         | The tooltip's position.                        | `"bottom" \| "off" \| "top"` | `'top'`                               |
| `tooltipFormatter` | --                | A function used to format the tooltip's value. | `(value: number) => string`  | `(value: number) => value.toString()` |
| `value`            | `value`           | The input's value attribute.                   | `number`                     | `undefined`                           |


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


