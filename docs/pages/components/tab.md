---
meta:
  title: Tab
  description: Tabs are used inside tab groups to represent and activate tab panels.
layout: component
unusedProperties: |
  - Boolean `closable`
---

## Examples

### Basic Tab

```html:preview
<sl-tab>Tab</sl-tab>
<sl-tab active>Active</sl-tab>
<sl-tab closable>Closable</sl-tab>
<sl-tab disabled>Disabled</sl-tab>
```

```pug:slim
sl-tab Tab
sl-tab active="true" Active
sl-tab closable="true" Closable
sl-tab disabled="true" Disabled
```

```jsx:react
import SlTab from '@teamshares/shoelace/dist/react/tab';

const App = () => (
  <>
    <SlTab>Tab</SlTab>
    <SlTab active>Active</SlTab>
    <SlTab closable>Closable</SlTab>
    <SlTab disabled>Disabled</SlTab>
  </>
);
```

:::tip
Additional demonstrations can be found in the [tab group examples](/components/tab-group).
:::
