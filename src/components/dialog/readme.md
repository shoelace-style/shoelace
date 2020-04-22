# Dialog

```html preview
<sl-dialog label="Dialog" id="dialog-1">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  <sl-button slot="footer" type="primary" id="dialog-1-close">Close</sl-button>
</sl-dialog>

<sl-button id="dialog-1-open">Open Dialog</sl-button>

<script>
  (() => {
    const dialog = document.querySelector('#dialog-1');
    const openButton = document.querySelector('#dialog-1-open');
    const closeButton = document.querySelector('#dialog-1-close');
    
    openButton.addEventListener('click', () => dialog.open());
    closeButton.addEventListener('click', () => dialog.close());
  })();
</script>
```

<!-- Auto Generated Below -->


## Properties

| Property       | Attribute        | Description                                                                                                                                                              | Type      | Default |
| -------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- | ------- |
| `closeOnClick` | `close-on-click` | When true, clicking on the overlay will close the dialog.                                                                                                                | `boolean` | `false` |
| `label`        | `label`          | The dialog's label as displayed in the header. You should always include a relevant label even when using `no-header`, as it is required for proper accessibility.       | `string`  | `''`    |
| `noFooter`     | `no-footer`      | Set to true to disable the footer.                                                                                                                                       | `boolean` | `false` |
| `noHeader`     | `no-header`      | Set to true to disable the header. This will also remove the default close button, so please ensure you provide an easy, accessible way for users to dismiss the dialog. | `boolean` | `false` |


## Events

| Event          | Description                                                                                              | Type               |
| -------------- | -------------------------------------------------------------------------------------------------------- | ------------------ |
| `slAfterClose` | Emitted after the dialog closes and all transitions are complete.                                        | `CustomEvent<any>` |
| `slAfterOpen`  | Emitted after the dialog opens and all transitions are complete.                                         | `CustomEvent<any>` |
| `slClose`      | Emitted when the dialog menu closes. Calling `event.preventDefault()` will prevent it from being closed. | `CustomEvent<any>` |
| `slOpen`       | Emitted when the dialog menu opens. Calling `event.preventDefault()` will prevent it from being opened.  | `CustomEvent<any>` |


## Methods

### `close() => Promise<boolean>`

Closes the dialog

#### Returns

Type: `Promise<boolean>`



### `open() => Promise<boolean>`

Opens the dialog

#### Returns

Type: `Promise<boolean>`




## Slots

| Slot       | Description                                                                    |
| ---------- | ------------------------------------------------------------------------------ |
|            | The dialog's content.                                                          |
| `"footer"` | The dialog's footer, usually one or more buttons representing various actions. |


## Dependencies

### Depends on

- [sl-icon](../icon)

### Graph
```mermaid
graph TD;
  sl-dialog --> sl-icon
  style sl-dialog fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


