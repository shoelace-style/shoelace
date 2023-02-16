# Tab Panel

[component-header:sl-tab-panel]

```html preview
<sl-tab-group>
  <sl-tab slot="nav" panel="general">General</sl-tab>
  <sl-tab slot="nav" panel="custom">Custom</sl-tab>
  <sl-tab slot="nav" panel="advanced">Advanced</sl-tab>
  <sl-tab slot="nav" panel="disabled" disabled>Disabled</sl-tab>

  <sl-tab-panel name="general">This is the general tab panel.</sl-tab-panel>
  <sl-tab-panel name="custom">This is the custom tab panel.</sl-tab-panel>
  <sl-tab-panel name="advanced">This is the advanced tab panel.</sl-tab-panel>
  <sl-tab-panel name="disabled">This is a disabled tab panel.</sl-tab-panel>
</sl-tab-group>
```

```pug slim
sl-tab-group
  sl-tab slot="nav" panel="general" General
  sl-tab slot="nav" panel="custom" Custom
  sl-tab slot="nav" panel="advanced" Advanced
  sl-tab slot="nav" panel="disabled" disabled="true" Disabled
  sl-tab-panel name="general" This is the general tab panel.
  sl-tab-panel name="custom" This is the custom tab panel.
  sl-tab-panel name="advanced" This is the advanced tab panel.
  sl-tab-panel name="disabled" This is a disabled tab panel.
```

```jsx react
import { SlTab, SlTabGroup, SlTabPanel } from '@teamshares/shoelace/dist/react';

const App = () => (
  <SlTabGroup>
    <SlTab slot="nav" panel="general">
      General
    </SlTab>
    <SlTab slot="nav" panel="custom">
      Custom
    </SlTab>
    <SlTab slot="nav" panel="advanced">
      Advanced
    </SlTab>
    <SlTab slot="nav" panel="disabled" disabled>
      Disabled
    </SlTab>

    <SlTabPanel name="general">This is the general tab panel.</SlTabPanel>
    <SlTabPanel name="custom">This is the custom tab panel.</SlTabPanel>
    <SlTabPanel name="advanced">This is the advanced tab panel.</SlTabPanel>
    <SlTabPanel name="disabled">This is a disabled tab panel.</SlTabPanel>
  </SlTabGroup>
);
```

?> Additional demonstrations can be found in the [tab group examples](/components/tab-group).

[component-metadata:sl-tab-panel]
