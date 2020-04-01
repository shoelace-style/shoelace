# Dropdown

```html preview
<sh-dropdown>
  <sh-button slot="trigger" caret>Dropdown</sh-button>
  <sh-dropdown-item>Dropdown Item 1</sh-dropdown-item>
  <sh-dropdown-item>Dropdown Item 2</sh-dropdown-item>
  <sh-dropdown-item>Dropdown Item 3</sh-dropdown-item>
  <sh-dropdown-divider></sh-dropdown-divider>
  <sh-dropdown-item checked>Checked</sh-dropdown-item>
  <sh-dropdown-item disabled>Disabled</sh-dropdown-item>
  <sh-dropdown-divider></sh-dropdown-divider>
  <sh-dropdown-item>
    Prefix
    <ion-icon slot="prefix" name="save-outline"></ion-icon>
  </sh-dropdown-item>
  <sh-dropdown-item>
    Suffix Text
    <small slot="suffix"><kbd>cmd+s</kbd></small>
  </sh-dropdown-item>
  <sh-dropdown-item>
    Suffix Icon
    <ion-icon slot="suffix" name="open-outline"></ion-icon>
  </sh-dropdown-item>
</sh-dropdown>
```

```html preview
<sh-dropdown>
  <sh-button slot="trigger" caret>Edit</sh-button>
  <sh-dropdown-item>Cut</sh-dropdown-item>
  <sh-dropdown-item>Copy</sh-dropdown-item>
  <sh-dropdown-item>Paste</sh-dropdown-item>
  <sh-dropdown-divider></sh-dropdown-divider>
  <sh-dropdown-item>Find</sh-dropdown-item>
  <sh-dropdown-item>Replace</sh-dropdown-item>
</sh-dropdown>
```

```html preview
<sh-dropdown>
  <sh-button slot="trigger" caret>Scrolling Menu</sh-button>
  <sh-dropdown-item>Item 1</sh-dropdown-item>
  <sh-dropdown-item>Item 2</sh-dropdown-item>
  <sh-dropdown-item>Item 3</sh-dropdown-item>
  <sh-dropdown-item>Item 4</sh-dropdown-item>
  <sh-dropdown-item>Item 5</sh-dropdown-item>
  <sh-dropdown-item>Item 6</sh-dropdown-item>
  <sh-dropdown-item>Item 7</sh-dropdown-item>
  <sh-dropdown-item>Item 8</sh-dropdown-item>
  <sh-dropdown-item>Item 9</sh-dropdown-item>
  <sh-dropdown-item>Item 10</sh-dropdown-item>
  <sh-dropdown-item>Item 11</sh-dropdown-item>
  <sh-dropdown-item>Item 12</sh-dropdown-item>
  <sh-dropdown-item>Item 13</sh-dropdown-item>
  <sh-dropdown-item>Item 14</sh-dropdown-item>
  <sh-dropdown-item>Item 15</sh-dropdown-item>
  <sh-dropdown-item>Item 16</sh-dropdown-item>
  <sh-dropdown-item>Item 17</sh-dropdown-item>
  <sh-dropdown-item>Item 18</sh-dropdown-item>
  <sh-dropdown-item>Item 19</sh-dropdown-item>
  <sh-dropdown-item>Item 20</sh-dropdown-item>
</sh-dropdown>
```


<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                                                                                                                              | Type                                                         | Default          |
| ----------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ---------------- |
| `placement` | `placement` | The preferred placement of the dropdown menu. Note that the actual placement may vary as needed to keep the menu inside of the viewport. | `"bottom-end" \| "bottom-start" \| "top-end" \| "top-start"` | `'bottom-start'` |


## Methods

### `close() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `open() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Slots

| Slot        | Description                                              |
| ----------- | -------------------------------------------------------- |
|             | Used to group the dropdown's menu items.                 |
| `"trigger"` | The dropdown's trigger, usually a `<sh-button>` element. |


----------------------------------------------


