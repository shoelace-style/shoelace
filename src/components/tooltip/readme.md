# sl-tooltip



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                                                                                                                                                                                                                                                          | Type                                                                                                                                                                 | Default              |
| -------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `arrow`        | `arrow`         | Set to true to draw the the tooltip with an arrow.                                                                                                                                                                                                                                                                                   | `boolean`                                                                                                                                                            | `false`              |
| `disabled`     | `disabled`      | Set to true to disable the tooltip so it won't show when triggered.                                                                                                                                                                                                                                                                  | `boolean`                                                                                                                                                            | `false`              |
| `distance`     | `distance`      | The distance in pixels from which to draw the tooltip from its target element.                                                                                                                                                                                                                                                       | `number`                                                                                                                                                             | `10`                 |
| `hideDelay`    | `hide-delay`    | The delay in ms before the tooltip hides.                                                                                                                                                                                                                                                                                            | `number`                                                                                                                                                             | `0`                  |
| `hideDuration` | `hide-duration` | The duration in ms of the tooltip's hide transition.                                                                                                                                                                                                                                                                                 | `number`                                                                                                                                                             | `250`                |
| `maxWidth`     | `max-width`     | The maximum width in pixels the tooltip can be before its content wraps.                                                                                                                                                                                                                                                             | `number`                                                                                                                                                             | `350`                |
| `placement`    | `placement`     | The preferred placement of the tooltip. Note that the actual placement may vary as needed to keep the tooltip inside of the viewport.                                                                                                                                                                                                | `"bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start"` | `'top'`              |
| `showDelay`    | `show-delay`    | The delay in ms before showing the tooltip.                                                                                                                                                                                                                                                                                          | `number`                                                                                                                                                             | `0`                  |
| `showDuration` | `show-duration` | The duration in ms of the tooltip's show transition.                                                                                                                                                                                                                                                                                 | `number`                                                                                                                                                             | `275`                |
| `target`       | `target`        | A selector or element to use as the tooltip's target. This is the element that will trigger the tooltip to show upon interaction. If no target is specified, the previous sibling element of the tooltip will be used. A common way to link a tooltip to a target is to give the target an `id` and pass `#id` to the `target` prop. | `HTMLElement \| string`                                                                                                                                              | `undefined`          |
| `trigger`      | `trigger`       | The events that cause a tooltip to show, separated by a space. Possible values include any combination of `mouseenter`, `focus`, `click`, and `manual`. Use `manual` if you only want to show and hide the tooltip programmatically.                                                                                                 | `string`                                                                                                                                                             | `'mouseenter focus'` |
| `zIndex`       | `z-index`       | Sets the tooltip's z-index.                                                                                                                                                                                                                                                                                                          | `number`                                                                                                                                                             | `9999`               |


## Events

| Event      | Description                                                                          | Type               |
| ---------- | ------------------------------------------------------------------------------------ | ------------------ |
| `slHidden` | Emitted when the tooltip has fully transitioned out and gets unmounted from the DOM. | `CustomEvent<any>` |
| `slHide`   | Emitted when the tooltip begins to hide.                                             | `CustomEvent<any>` |
| `slShow`   | Emitted when the tooltip begins to show, but before it gets mounted to the DOM.      | `CustomEvent<any>` |
| `slShown`  | Emitted when the tooltip has fully transitioned in.                                  | `CustomEvent<any>` |


## Methods

### `hide() => Promise<void>`

Shows the tooltip.

#### Returns

Type: `Promise<void>`



### `show() => Promise<void>`

Shows the tooltip.

#### Returns

Type: `Promise<void>`




## Slots

| Slot | Description            |
| ---- | ---------------------- |
|      | The tooltip's content. |


----------------------------------------------

*Shoelace Web Components are built with [StencilJS](https://stenciljs.com/)*
