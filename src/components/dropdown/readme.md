# Dropdown

```html preview
<sl-dropdown>
  <sl-button slot="trigger" caret>Dropdown</sl-button>
  <sl-dropdown-item>Dropdown Item 1</sl-dropdown-item>
  <sl-dropdown-item>Dropdown Item 2</sl-dropdown-item>
  <sl-dropdown-item>Dropdown Item 3</sl-dropdown-item>
  <sl-dropdown-divider></sl-dropdown-divider>
  <sl-dropdown-item checked>Checked</sl-dropdown-item>
  <sl-dropdown-item disabled>Disabled</sl-dropdown-item>
  <sl-dropdown-divider></sl-dropdown-divider>
  <sl-dropdown-item>
    Prefix
    <sl-icon slot="prefix" name="gift"></sl-icon>
  </sl-dropdown-item>
  <sl-dropdown-item>
    Suffix Icon
    <sl-icon slot="suffix" name="heart"></sl-icon>
  </sl-dropdown-item>
</sl-dropdown>
```

```html preview
<sl-dropdown>
  <sl-button slot="trigger" caret>Edit</sl-button>
  <sl-dropdown-item>Cut</sl-dropdown-item>
  <sl-dropdown-item>Copy</sl-dropdown-item>
  <sl-dropdown-item>Paste</sl-dropdown-item>
  <sl-dropdown-divider></sl-dropdown-divider>
  <sl-dropdown-item>Find</sl-dropdown-item>
  <sl-dropdown-item>Replace</sl-dropdown-item>
</sl-dropdown>
```

```html preview
<sl-dropdown>
  <sl-button slot="trigger" caret>Scrolling Menu</sl-button>
  <sl-dropdown-item>Item 1</sl-dropdown-item>
  <sl-dropdown-item>Item 2</sl-dropdown-item>
  <sl-dropdown-item>Item 3</sl-dropdown-item>
  <sl-dropdown-item>Item 4</sl-dropdown-item>
  <sl-dropdown-item>Item 5</sl-dropdown-item>
  <sl-dropdown-item>Item 6</sl-dropdown-item>
  <sl-dropdown-item>Item 7</sl-dropdown-item>
  <sl-dropdown-item>Item 8</sl-dropdown-item>
  <sl-dropdown-item>Item 9</sl-dropdown-item>
  <sl-dropdown-item>Item 10</sl-dropdown-item>
  <sl-dropdown-item>Item 11</sl-dropdown-item>
  <sl-dropdown-item>Item 12</sl-dropdown-item>
  <sl-dropdown-item>Item 13</sl-dropdown-item>
  <sl-dropdown-item>Item 14</sl-dropdown-item>
  <sl-dropdown-item>Item 15</sl-dropdown-item>
  <sl-dropdown-item>Item 16</sl-dropdown-item>
  <sl-dropdown-item>Item 17</sl-dropdown-item>
  <sl-dropdown-item>Item 18</sl-dropdown-item>
  <sl-dropdown-item>Item 19</sl-dropdown-item>
  <sl-dropdown-item>Item 20</sl-dropdown-item>
</sl-dropdown>
```


<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                                                                                                                                                                                                                                                   | Type                                                                                                                                                                 | Default          |
| ----------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `placement` | `placement` | The preferred placement of the dropdown menu. Note that the actual placement may vary as needed to keep the menu inside of the viewport.                                                                                                                      | `"bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start"` | `'bottom-start'` |
| `position`  | `position`  | The positioning strategy used for displaying the menu. If the menu is clipped by a containing element's overflow, setting this to `fixed` usually resolves it. Note that `fixed` is less performant than `absolute`, so avoid using the former when possible. | `"absolute" \| "fixed"`                                                                                                                                              | `'absolute'`     |


## Events

| Event          | Description                                                                                                | Type               |
| -------------- | ---------------------------------------------------------------------------------------------------------- | ------------------ |
| `slAfterClose` | Emitted after the dropdown menu closes and all transitions are complete.                                   | `CustomEvent<any>` |
| `slAfterOpen`  | Emitted after the dropdown menu opens and all transitions are complete.                                    | `CustomEvent<any>` |
| `slClose`      | Emitted when the dropdown menu closes. Calling `event.preventDefault()` will prevent it from being closed. | `CustomEvent<any>` |
| `slOpen`       | Emitted when the dropdown menu opens. Calling `event.preventDefault()` will prevent it from being opened.  | `CustomEvent<any>` |


## Methods

### `close() => Promise<boolean>`

Closes the dropdown menu

#### Returns

Type: `Promise<boolean>`



### `open() => Promise<boolean>`

Opens the dropdown menu

#### Returns

Type: `Promise<boolean>`




## Slots

| Slot        | Description                                              |
| ----------- | -------------------------------------------------------- |
|             | The dropdown's menu items.                               |
| `"trigger"` | The dropdown's trigger, usually a `<sl-button>` element. |


----------------------------------------------


