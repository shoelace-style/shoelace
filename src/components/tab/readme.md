# sl-tab



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                 | Type      | Default |
| ---------- | ---------- | ------------------------------------------------------------------------------------------- | --------- | ------- |
| `active`   | `active`   | Set to true to draw the tab in an active state.                                             | `boolean` | `false` |
| `disabled` | `disabled` | Set to true to draw the tab in a disabled state.                                            | `boolean` | `false` |
| `panel`    | `panel`    | The name of the tab panel the tab will control. The panel must exist in the same tab group. | `string`  | `''`    |


## Methods

### `removeFocus() => Promise<void>`

Removes focus from the tab.

#### Returns

Type: `Promise<void>`



### `setFocus() => Promise<void>`

Sets focus to the tab.

#### Returns

Type: `Promise<void>`




## Slots

| Slot | Description      |
| ---- | ---------------- |
|      | The tab's label. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
