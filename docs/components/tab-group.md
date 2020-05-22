# Tab Group

```html preview
<sl-tab-group placement="top">
  <sl-tab slot="nav" panel="general">General</sl-tab>
  <sl-tab slot="nav" panel="custom">Custom</sl-tab>
  <sl-tab slot="nav" panel="advanced">Advanced</sl-tab>
  <sl-tab slot="nav" panel="disabled" disabled>Disabled</sl-tab>

  <sl-tab-panel name="general">General</sl-tab-panel>
  <sl-tab-panel name="custom">Custom</sl-tab-panel>
  <sl-tab-panel name="advanced">Advanced</sl-tab-panel>
  <sl-tab-panel name="disabled">Disabled</sl-tab-panel>
</sl-tab-group>
```

```html preview
<sl-tab-group placement="bottom">
  <sl-tab slot="nav" panel="general">General</sl-tab>
  <sl-tab slot="nav" panel="custom">Custom</sl-tab>
  <sl-tab slot="nav" panel="advanced">Advanced</sl-tab>
  <sl-tab slot="nav" panel="disabled" disabled>Disabled</sl-tab>

  <sl-tab-panel name="general">General</sl-tab-panel>
  <sl-tab-panel name="custom">Custom</sl-tab-panel>
  <sl-tab-panel name="advanced">Advanced</sl-tab-panel>
  <sl-tab-panel name="disabled">Disabled</sl-tab-panel>
</sl-tab-group>
```

```html preview
<sl-tab-group placement="left">
  <sl-tab slot="nav" panel="general">General</sl-tab>
  <sl-tab slot="nav" panel="custom">Custom</sl-tab>
  <sl-tab slot="nav" panel="advanced">Advanced</sl-tab>
  <sl-tab slot="nav" panel="disabled" disabled>Disabled</sl-tab>

  <sl-tab-panel name="general">General</sl-tab-panel>
  <sl-tab-panel name="custom">Custom</sl-tab-panel>
  <sl-tab-panel name="advanced">Advanced</sl-tab-panel>
  <sl-tab-panel name="disabled">Disabled</sl-tab-panel>
</sl-tab-group>
```

```html preview
<sl-tab-group placement="right">
  <sl-tab slot="nav" panel="general">General</sl-tab>
  <sl-tab slot="nav" panel="custom">Custom</sl-tab>
  <sl-tab slot="nav" panel="advanced">Advanced</sl-tab>
  <sl-tab slot="nav" panel="disabled" disabled>Disabled</sl-tab>

  <sl-tab-panel name="general">General</sl-tab-panel>
  <sl-tab-panel name="custom">Custom</sl-tab-panel>
  <sl-tab-panel name="advanced">Advanced</sl-tab-panel>
  <sl-tab-panel name="disabled">Disabled</sl-tab-panel>
</sl-tab-group>
```

```html preview
<sl-tab-group>
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

  <sl-tab-panel name="tab-1">Tab panel 1</sl-tab-panel>
  <sl-tab-panel name="tab-2">Tab panel 2</sl-tab-panel>
  <sl-tab-panel name="tab-3">Tab panel 3</sl-tab-panel>
  <sl-tab-panel name="tab-4">Tab panel 4</sl-tab-panel>
  <sl-tab-panel name="tab-5">Tab panel 5</sl-tab-panel>
  <sl-tab-panel name="tab-6">Tab panel 6</sl-tab-panel>
  <sl-tab-panel name="tab-7">Tab panel 7</sl-tab-panel>
  <sl-tab-panel name="tab-8">Tab panel 8</sl-tab-panel>
  <sl-tab-panel name="tab-9">Tab panel 9</sl-tab-panel>
  <sl-tab-panel name="tab-10">Tab panel 10</sl-tab-panel>
  <sl-tab-panel name="tab-11">Tab panel 11</sl-tab-panel>
  <sl-tab-panel name="tab-12">Tab panel 12</sl-tab-panel>
  <sl-tab-panel name="tab-13">Tab panel 13</sl-tab-panel>
  <sl-tab-panel name="tab-14">Tab panel 14</sl-tab-panel>
  <sl-tab-panel name="tab-15">Tab panel 15</sl-tab-panel>
  <sl-tab-panel name="tab-16">Tab panel 16</sl-tab-panel>
  <sl-tab-panel name="tab-17">Tab panel 17</sl-tab-panel>
  <sl-tab-panel name="tab-18">Tab panel 18</sl-tab-panel>
  <sl-tab-panel name="tab-19">Tab panel 19</sl-tab-panel>
  <sl-tab-panel name="tab-20">Tab panel 20</sl-tab-panel>
</sl-tab-group>
```

## Notes

Serious consideration was given to simplifying the tab group API into two components with a structure similar to:

```html
<!-- Not a valid syntax! -->
<sl-tab-group placement="top">
  <sl-tab label="General">General</sl-tab>
  <sl-tab label="Custom">Custom</sl-tab>
  <sl-tab label="Advanced">Advanced</sl-tab>
  <sl-tab label="Disabled" disabled>Disabled</sl-tab>
</sl-tab-group>
```

However, there are two caveats to this approach. The first is that labels must be generated and stored in the tab group's shadow DOM. For accessibility reasons, tabs and tab panels must be linked via `id` using the `aria-controls` and `aria-labeledby` attribute, respectively. When a tab is inside a shadow DOM, its `id` becomes inaccessible to the light DOM and accessibility is broken.

The second thing is that labels would be limited to text only. If you wanted to put an icon, a badge, or another element inside the label, it wouldn't be possible with this approach.

[component-metadata:sl-tab-group]