# Tabs

```html preview
<sl-tabs position="top">
  <sl-tab slot="nav" panel="general">General</sl-tab>
  <sl-tab slot="nav" panel="custom">Custom</sl-tab>
  <sl-tab slot="nav" panel="advanced">Advanced</sl-tab>
  <sl-tab slot="nav" panel="disabled" disabled>Disabled</sl-tab>

  <sl-tab-panel name="general">General</sl-tab-panel>
  <sl-tab-panel name="custom">Custom</sl-tab-panel>
  <sl-tab-panel name="advanced">Advanced</sl-tab-panel>
  <sl-tab-panel name="disabled">Disabled</sl-tab-panel>
</sl-tabs>
```

```html preview
<sl-tabs position="bottom">
  <sl-tab slot="nav" panel="general">General</sl-tab>
  <sl-tab slot="nav" panel="custom">Custom</sl-tab>
  <sl-tab slot="nav" panel="advanced">Advanced</sl-tab>
  <sl-tab slot="nav" panel="disabled" disabled>Disabled</sl-tab>

  <sl-tab-panel name="general">General</sl-tab-panel>
  <sl-tab-panel name="custom">Custom</sl-tab-panel>
  <sl-tab-panel name="advanced">Advanced</sl-tab-panel>
  <sl-tab-panel name="disabled">Disabled</sl-tab-panel>
</sl-tabs>
```

```html preview
<sl-tabs position="left">
  <sl-tab slot="nav" panel="general">General</sl-tab>
  <sl-tab slot="nav" panel="custom">Custom</sl-tab>
  <sl-tab slot="nav" panel="advanced">Advanced</sl-tab>
  <sl-tab slot="nav" panel="disabled" disabled>Disabled</sl-tab>

  <sl-tab-panel name="general">General</sl-tab-panel>
  <sl-tab-panel name="custom">Custom</sl-tab-panel>
  <sl-tab-panel name="advanced">Advanced</sl-tab-panel>
  <sl-tab-panel name="disabled">Disabled</sl-tab-panel>
</sl-tabs>
```

```html preview
<sl-tabs position="right">
  <sl-tab slot="nav" panel="general">General</sl-tab>
  <sl-tab slot="nav" panel="custom">Custom</sl-tab>
  <sl-tab slot="nav" panel="advanced">Advanced</sl-tab>
  <sl-tab slot="nav" panel="disabled" disabled>Disabled</sl-tab>

  <sl-tab-panel name="general">General</sl-tab-panel>
  <sl-tab-panel name="custom">Custom</sl-tab-panel>
  <sl-tab-panel name="advanced">Advanced</sl-tab-panel>
  <sl-tab-panel name="disabled">Disabled</sl-tab-panel>
</sl-tabs>
```

```html preview
<sl-tabs>
  <sl-tab slot="nav" panel="tab-1">Tab 1</sl-tab>
  <sl-tab slot="nav" panel="tab-2">Tab 2</sl-tab>
  <sl-tab slot="nav" panel="tab-3">Tab 3</sl-tab>
  <sl-tab slot="nav" panel="tab-4">Tab 4</sl-tab>
  <sl-tab slot="nav" panel="tab-5">Tab 5</sl-tab>
  <sl-tab slot="nav" panel="tab-6">Tab 6</sl-tab>
  <sl-tab slot="nav" panel="tab-7">Tab 7</sl-tab>
  <sl-tab slot="nav" panel="tab-8">Tab 8</sl-tab>
  <sl-tab slot="nav" panel="tab-9">Tab 9</sl-tab>
  <sl-tab slot="nav" panel="tab-10">Tab 10</sl-tab>
  <sl-tab slot="nav" panel="tab-11">Tab 11</sl-tab>
  <sl-tab slot="nav" panel="tab-12">Tab 12</sl-tab>
  <sl-tab slot="nav" panel="tab-13">Tab 13</sl-tab>
  <sl-tab slot="nav" panel="tab-14">Tab 14</sl-tab>
  <sl-tab slot="nav" panel="tab-15">Tab 15</sl-tab>
  <sl-tab slot="nav" panel="tab-16">Tab 16</sl-tab>
  <sl-tab slot="nav" panel="tab-17">Tab 17</sl-tab>
  <sl-tab slot="nav" panel="tab-18">Tab 18</sl-tab>
  <sl-tab slot="nav" panel="tab-19">Tab 19</sl-tab>
  <sl-tab slot="nav" panel="tab-20">Tab 20</sl-tab>

  <sl-tab-panel name="tab-1">Tab Panel 1</sl-tab-panel>
  <sl-tab-panel name="tab-2">Tab Panel 2</sl-tab-panel>
  <sl-tab-panel name="tab-3">Tab Panel 3</sl-tab-panel>
  <sl-tab-panel name="tab-4">Tab Panel 4</sl-tab-panel>
  <sl-tab-panel name="tab-5">Tab Panel 5</sl-tab-panel>
  <sl-tab-panel name="tab-6">Tab Panel 6</sl-tab-panel>
  <sl-tab-panel name="tab-7">Tab Panel 7</sl-tab-panel>
  <sl-tab-panel name="tab-8">Tab Panel 8</sl-tab-panel>
  <sl-tab-panel name="tab-9">Tab Panel 9</sl-tab-panel>
  <sl-tab-panel name="tab-10">Tab Panel 10</sl-tab-panel>
  <sl-tab-panel name="tab-11">Tab Panel 11</sl-tab-panel>
  <sl-tab-panel name="tab-12">Tab Panel 12</sl-tab-panel>
  <sl-tab-panel name="tab-13">Tab Panel 13</sl-tab-panel>
  <sl-tab-panel name="tab-14">Tab Panel 14</sl-tab-panel>
  <sl-tab-panel name="tab-15">Tab Panel 15</sl-tab-panel>
  <sl-tab-panel name="tab-16">Tab Panel 16</sl-tab-panel>
  <sl-tab-panel name="tab-17">Tab Panel 17</sl-tab-panel>
  <sl-tab-panel name="tab-18">Tab Panel 18</sl-tab-panel>
  <sl-tab-panel name="tab-19">Tab Panel 19</sl-tab-panel>
  <sl-tab-panel name="tab-20">Tab Panel 20</sl-tab-panel>
</sl-tabs>
```


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


