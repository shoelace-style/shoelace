# Tooltip

```html preview
<sl-button>Tooltip</sl-button>
<sl-tooltip>This is a tooltip</sl-tooltip>

<sl-button>Tooltip With Arrow</sl-button>
<sl-tooltip arrow>This is a tooltip with arrow</sl-tooltip>

<a href="#">Tooltip On Link</a>
<sl-tooltip>This is a tooltip on a link</sl-tooltip>

<br><br>

<sl-button>Top</sl-button>
<sl-tooltip placement="top" arrow>Tooltip</sl-tooltip>

<sl-button>Bottom</sl-button>
<sl-tooltip placement="bottom" arrow>Tooltip</sl-tooltip>

<sl-button>Left</sl-button>
<sl-tooltip placement="left" arrow>Tooltip</sl-tooltip>

<sl-button>Right</sl-button>
<sl-tooltip placement="right" arrow>Tooltip</sl-tooltip>
```


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


## Events

| Event         | Description                                                                                                  | Type               |
| ------------- | ------------------------------------------------------------------------------------------------------------ | ------------------ |
| `slAfterHide` | Emitted after the tooltip has hidden and all transitions are complete.                                       | `CustomEvent<any>` |
| `slAfterShow` | Emitted after the tooltip has shown and all transitions are complete.                                        | `CustomEvent<any>` |
| `slHide`      | Emitted when the tooltip begins to hide. Calling `event.preventDefault()` will prevent it from being hidden. | `CustomEvent<any>` |
| `slShow`      | Emitted when the tooltip begins to show. Calling `event.preventDefault()` will prevent it from being shown.  | `CustomEvent<any>` |


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


