# Textarea

```html preview
<sl-textarea placeholder="Standard" resize="none"></sl-textarea><br><br>

<sl-textarea placeholder="Resizable" resize="vertical"></sl-textarea><br><br>

<sl-textarea placeholder="Auto" resize="auto"></sl-textarea><br><br>

<sl-textarea placeholder="Disabled" resize="none" disabled></sl-textarea><br><br>
```


<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description                               | Type                                                                                  | Default      |
| ----------------- | ------------------ | ----------------------------------------- | ------------------------------------------------------------------------------------- | ------------ |
| `autocapitalize`  | `autocapitalize`   | The textarea's autocaptialize attribute.  | `string`                                                                              | `undefined`  |
| `autocomplete`    | `autocomplete`     | The textarea's autocomplete attribute.    | `string`                                                                              | `undefined`  |
| `autocorrect`     | `autocorrect`      | The textarea's autocorrect attribute.     | `string`                                                                              | `undefined`  |
| `autofocus`       | `autofocus`        | The textarea's autofocus attribute.       | `boolean`                                                                             | `undefined`  |
| `disabled`        | `disabled`         | Set to true to disable the textarea.      | `boolean`                                                                             | `false`      |
| `maxlength`       | `maxlength`        | The textarea's maxlength attribute.       | `number`                                                                              | `undefined`  |
| `name`            | `name`             | The textarea's name attribute.            | `string`                                                                              | `''`         |
| `nativeInputmode` | `native-inputmode` | The input's inputmode attribute.          | `"decimal" or "email" or "none" or "numeric" or "search" or "tel" or "text" or "url"` | `undefined`  |
| `nativeTabindex`  | `native-tabindex`  | The input's tabindex attribute.           | `number`                                                                              | `undefined`  |
| `placeholder`     | `placeholder`      | The textarea's placeholder text.          | `string`                                                                              | `undefined`  |
| `readonly`        | `readonly`         | Set to true for a readonly textarea.      | `boolean`                                                                             | `false`      |
| `required`        | `required`         | The textarea's required attribute.        | `boolean`                                                                             | `undefined`  |
| `resize`          | `resize`           | Controls how the textarea can be resized. | `"auto" or "none" or "vertical"`                                                      | `'vertical'` |
| `rows`            | `rows`             | The number of rows to display by default. | `number`                                                                              | `4`          |
| `size`            | `size`             | The textarea's size.                      | `"large" or "medium" or "small"`                                                      | `'medium'`   |
| `value`           | `value`            | The textarea's value attribute.           | `string`                                                                              | `''`         |


## Methods

### `removeFocus() => Promise<void>`

Removes focus fromt the textarea.

#### Returns

Type: `Promise<void>`



### `setFocus() => Promise<void>`

Sets focus on the textarea.

#### Returns

Type: `Promise<void>`




----------------------------------------------


