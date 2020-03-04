# Tabs

TODO


<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description               | Type                                     | Default |
| ---------- | ---------- | ------------------------- | ---------------------------------------- | ------- |
| `position` | `position` | The position of the tabs. | `"bottom" \| "left" \| "right" \| "top"` | `'top'` |


## Events

| Event       | Description                   | Type               |
| ----------- | ----------------------------- | ------------------ |
| `slTabHide` | Emitted when a tab is hidden. | `CustomEvent<any>` |
| `slTabShow` | Emitted when a tab is shown.  | `CustomEvent<any>` |


## Methods

### `show(panel: string) => Promise<void>`

Shows the specified tab panel.

#### Returns

Type: `Promise<void>`




## Slots

| Slot    | Description                               |
| ------- | ----------------------------------------- |
|         | Used for grouping tab panels in the tabs. |
| `"nav"` | Used for grouping tabs in the tabs.       |


----------------------------------------------


