# Icon

```html preview
<div style="font-size: 1.5rem;">
  <sl-icon name="alert-triangle"></sl-icon>
  <sl-icon name="archive"></sl-icon>
  <sl-icon name="battery"></sl-icon>
  <sl-icon name="bell"></sl-icon>
  <sl-icon name="clock"></sl-icon>
  <sl-icon name="chevron-down"></sl-icon>
  <sl-icon name="download"></sl-icon>
  <sl-icon name="file"></sl-icon>
  <sl-icon name="flag"></sl-icon>
  <sl-icon name="image"></sl-icon>
  <sl-icon name="mic"></sl-icon>
  <sl-icon name="search"></sl-icon>
  <sl-icon name="trash"></sl-icon>
  <sl-icon name="x-circle"></sl-icon>
</div>
```

Icons are courtesy of [Feather Icons](https://feathericons.com/).

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                                                   | Type     | Default     |
| ------------- | -------------- | ------------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| `label`       | `label`        | An alternative description to use for accessibility. If omitted, the name or src will be used to generate it. | `string` | `undefined` |
| `name`        | `name`         | The name of the icon to draw.                                                                                 | `string` | `undefined` |
| `src`         | `src`          | An external URL of the SVG file to fetch.                                                                     | `string` | `undefined` |
| `strokeWidth` | `stroke-width` | An alternative description to use for accessibility. If omitted, the name or src will be used to generate it. | `string` | `'2'`       |


## Dependencies

### Used by

 - [sl-alert](../alert)
 - [sl-button](../button)
 - [sl-dropdown-item](../dropdown-item)
 - [sl-input](../input)

### Graph
```mermaid
graph TD;
  sl-alert --> sl-icon
  sl-button --> sl-icon
  sl-dropdown-item --> sl-icon
  sl-input --> sl-icon
  style sl-icon fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


