# Tabs

```html preview
<sh-tabs position="top">
  <sh-tab slot="nav" panel="general">General</sh-tab>
  <sh-tab slot="nav" panel="custom">Custom</sh-tab>
  <sh-tab slot="nav" panel="advanced">Advanced</sh-tab>
  <sh-tab slot="nav" panel="disabled" disabled>Disabled</sh-tab>

  <sh-tab-panel name="general">General</sh-tab-panel>
  <sh-tab-panel name="custom">Custom</sh-tab-panel>
  <sh-tab-panel name="advanced">Advanced</sh-tab-panel>
  <sh-tab-panel name="disabled">Disabled</sh-tab-panel>
</sh-tabs>
```

```html preview
<sh-tabs position="bottom">
  <sh-tab slot="nav" panel="general">General</sh-tab>
  <sh-tab slot="nav" panel="custom">Custom</sh-tab>
  <sh-tab slot="nav" panel="advanced">Advanced</sh-tab>
  <sh-tab slot="nav" panel="disabled" disabled>Disabled</sh-tab>

  <sh-tab-panel name="general">General</sh-tab-panel>
  <sh-tab-panel name="custom">Custom</sh-tab-panel>
  <sh-tab-panel name="advanced">Advanced</sh-tab-panel>
  <sh-tab-panel name="disabled">Disabled</sh-tab-panel>
</sh-tabs>
```

```html preview
<sh-tabs position="left">
  <sh-tab slot="nav" panel="general">General</sh-tab>
  <sh-tab slot="nav" panel="custom">Custom</sh-tab>
  <sh-tab slot="nav" panel="advanced">Advanced</sh-tab>
  <sh-tab slot="nav" panel="disabled" disabled>Disabled</sh-tab>

  <sh-tab-panel name="general">General</sh-tab-panel>
  <sh-tab-panel name="custom">Custom</sh-tab-panel>
  <sh-tab-panel name="advanced">Advanced</sh-tab-panel>
  <sh-tab-panel name="disabled">Disabled</sh-tab-panel>
</sh-tabs>
```

```html preview
<sh-tabs position="right">
  <sh-tab slot="nav" panel="general">General</sh-tab>
  <sh-tab slot="nav" panel="custom">Custom</sh-tab>
  <sh-tab slot="nav" panel="advanced">Advanced</sh-tab>
  <sh-tab slot="nav" panel="disabled" disabled>Disabled</sh-tab>

  <sh-tab-panel name="general">General</sh-tab-panel>
  <sh-tab-panel name="custom">Custom</sh-tab-panel>
  <sh-tab-panel name="advanced">Advanced</sh-tab-panel>
  <sh-tab-panel name="disabled">Disabled</sh-tab-panel>
</sh-tabs>
```

```html preview
<sh-tabs>
  <sh-tab slot="nav" panel="tab-1">Tab 1</sh-tab>
  <sh-tab slot="nav" panel="tab-2">Tab 2</sh-tab>
  <sh-tab slot="nav" panel="tab-3">Tab 3</sh-tab>
  <sh-tab slot="nav" panel="tab-4">Tab 4</sh-tab>
  <sh-tab slot="nav" panel="tab-5">Tab 5</sh-tab>
  <sh-tab slot="nav" panel="tab-6">Tab 6</sh-tab>
  <sh-tab slot="nav" panel="tab-7">Tab 7</sh-tab>
  <sh-tab slot="nav" panel="tab-8">Tab 8</sh-tab>
  <sh-tab slot="nav" panel="tab-9">Tab 9</sh-tab>
  <sh-tab slot="nav" panel="tab-10">Tab 10</sh-tab>
  <sh-tab slot="nav" panel="tab-11">Tab 11</sh-tab>
  <sh-tab slot="nav" panel="tab-12">Tab 12</sh-tab>
  <sh-tab slot="nav" panel="tab-13">Tab 13</sh-tab>
  <sh-tab slot="nav" panel="tab-14">Tab 14</sh-tab>
  <sh-tab slot="nav" panel="tab-15">Tab 15</sh-tab>
  <sh-tab slot="nav" panel="tab-16">Tab 16</sh-tab>
  <sh-tab slot="nav" panel="tab-17">Tab 17</sh-tab>
  <sh-tab slot="nav" panel="tab-18">Tab 18</sh-tab>
  <sh-tab slot="nav" panel="tab-19">Tab 19</sh-tab>
  <sh-tab slot="nav" panel="tab-20">Tab 20</sh-tab>

  <sh-tab-panel name="tab-1">Tab Panel 1</sh-tab-panel>
  <sh-tab-panel name="tab-2">Tab Panel 2</sh-tab-panel>
  <sh-tab-panel name="tab-3">Tab Panel 3</sh-tab-panel>
  <sh-tab-panel name="tab-4">Tab Panel 4</sh-tab-panel>
  <sh-tab-panel name="tab-5">Tab Panel 5</sh-tab-panel>
  <sh-tab-panel name="tab-6">Tab Panel 6</sh-tab-panel>
  <sh-tab-panel name="tab-7">Tab Panel 7</sh-tab-panel>
  <sh-tab-panel name="tab-8">Tab Panel 8</sh-tab-panel>
  <sh-tab-panel name="tab-9">Tab Panel 9</sh-tab-panel>
  <sh-tab-panel name="tab-10">Tab Panel 10</sh-tab-panel>
  <sh-tab-panel name="tab-11">Tab Panel 11</sh-tab-panel>
  <sh-tab-panel name="tab-12">Tab Panel 12</sh-tab-panel>
  <sh-tab-panel name="tab-13">Tab Panel 13</sh-tab-panel>
  <sh-tab-panel name="tab-14">Tab Panel 14</sh-tab-panel>
  <sh-tab-panel name="tab-15">Tab Panel 15</sh-tab-panel>
  <sh-tab-panel name="tab-16">Tab Panel 16</sh-tab-panel>
  <sh-tab-panel name="tab-17">Tab Panel 17</sh-tab-panel>
  <sh-tab-panel name="tab-18">Tab Panel 18</sh-tab-panel>
  <sh-tab-panel name="tab-19">Tab Panel 19</sh-tab-panel>
  <sh-tab-panel name="tab-20">Tab Panel 20</sh-tab-panel>
</sh-tabs>
```


<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description               | Type                                     | Default |
| ---------- | ---------- | ------------------------- | ---------------------------------------- | ------- |
| `position` | `position` | The position of the tabs. | `"bottom" \| "left" \| "right" \| "top"` | `'top'` |


## Events

| Event       | Description                   | Type               |
| ----------- | ----------------------------- | ------------------ |
| `shTabHide` | Emitted when a tab is hidden. | `CustomEvent<any>` |
| `shTabShow` | Emitted when a tab is shown.  | `CustomEvent<any>` |


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


