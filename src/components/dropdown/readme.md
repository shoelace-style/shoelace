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
    <ion-icon slot="prefix" name="save-outline"></ion-icon>
  </sl-dropdown-item>
  <sl-dropdown-item>
    Suffix Text
    <small slot="suffix"><kbd>cmd+s<kbd></small>
  </sl-dropdown-item>
  <sl-dropdown-item>
    Suffix Icon
    <ion-icon slot="suffix" name="open-outline"></ion-icon>
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
| `"trigger"` | The dropdown's trigger, usually a `<sl-button>` element. |


----------------------------------------------


