# sl-textarea



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute        | Description                               | Type                                                                                  | Default      |
| ---------------- | ---------------- | ----------------------------------------- | ------------------------------------------------------------------------------------- | ------------ |
| `autocapitalize` | `autocapitalize` | The textarea's autocaptialize attribute.  | `string`                                                                              | `undefined`  |
| `autocomplete`   | `autocomplete`   | The textarea's autocomplete attribute.    | `string`                                                                              | `undefined`  |
| `autocorrect`    | `autocorrect`    | The textarea's autocorrect attribute.     | `string`                                                                              | `undefined`  |
| `autofocus`      | `autofocus`      | The textarea's autofocus attribute.       | `boolean`                                                                             | `undefined`  |
| `disabled`       | `disabled`       | Set to true to disable the textarea.      | `boolean`                                                                             | `false`      |
| `inputmode`      | `inputmode`      | The textarea's inputmode attribute.       | `"decimal" \| "email" \| "none" \| "numeric" \| "search" \| "tel" \| "text" \| "url"` | `undefined`  |
| `maxlength`      | `maxlength`      | The textarea's maxlength attribute.       | `number`                                                                              | `undefined`  |
| `name`           | `name`           | The textarea's name attribute.            | `string`                                                                              | `''`         |
| `placeholder`    | `placeholder`    | The textarea's placeholder text.          | `string`                                                                              | `undefined`  |
| `readonly`       | `readonly`       | Set to true for a readonly textarea.      | `boolean`                                                                             | `false`      |
| `required`       | `required`       | The textarea's required attribute.        | `boolean`                                                                             | `undefined`  |
| `resize`         | `resize`         | Controls how the textarea can be resized. | `"auto" \| "none" \| "vertical"`                                                      | `'vertical'` |
| `rows`           | `rows`           | The number of rows to display by default. | `number`                                                                              | `4`          |
| `size`           | `size`           | The textarea's size.                      | `"large" \| "medium" \| "small"`                                                      | `'medium'`   |
| `value`          | `value`          | The textarea's value attribute.           | `string`                                                                              | `''`         |


## Events

| Event      | Description                               | Type               |
| ---------- | ----------------------------------------- | ------------------ |
| `slBlur`   | Emitted when the control loses focus.     | `CustomEvent<any>` |
| `slChange` | Emitted when the control's value changes. | `CustomEvent<any>` |
| `slFocus`  | Emitted when the control gains focus.     | `CustomEvent<any>` |
| `slInput`  | Emitted when the control receives input.  | `CustomEvent<any>` |


## Methods

### `removeFocus() => Promise<void>`

Removes focus fromt the textarea.

#### Returns

Type: `Promise<void>`



### `select() => Promise<void>`

Selects all the text in the input.

#### Returns

Type: `Promise<void>`



### `setFocus() => Promise<void>`

Sets focus on the textarea.

#### Returns

Type: `Promise<void>`



### `setRangeText(replacement: string, start: number, end: number, selectMode?: SelectionMode) => Promise<void>`

Replaces a range of text with a new string.

#### Returns

Type: `Promise<void>`



### `setSelectionRange(selectionStart: number, selectionEnd: number, selectionDirection?: "none" | "forward" | "backward") => Promise<void>`

Sets the start and end positions of the text selection (0-based).

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
