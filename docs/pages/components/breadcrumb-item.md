---
meta:
  title: Breadcrumb Item
  description: Breadcrumb Items are used inside breadcrumbs to represent different links.
layout: component
---

## Examples

### Basic Breadcrumb Item

```html:preview
<sl-breadcrumb>
  <sl-breadcrumb-item>
    <sl-icon slot="prefix" library="fa" name="arrow-left"></sl-icon>
    Finance integrations
  </sl-breadcrumb-item>
  <sl-breadcrumb-item>Start tasks</sl-breadcrumb-item>
  <sl-breadcrumb-item>Upload balance</sl-breadcrumb-item>
</sl-breadcrumb>
```

```pug:slim
sl-breadcrumb
  sl-breadcrumb-item
    sl-icon slot="prefix" library="fa" name="fas-arrow-left"
    | Finance integrations
  sl-breadcrumb-item Start tasks
  sl-breadcrumb-item Upload balance
```

```jsx:react
import SlBreadcrumb from '@teamshares/shoelace/dist/react/breadcrumb';
import SlBreadcrumbItem from '@teamshares/shoelace/dist/react/breadcrumb-item';
import SlIcon from '@teamshares/shoelace/dist/react/icon';

const App = () => (
  <SlBreadcrumb>
    <SlBreadcrumbItem>
      <SlIcon slot="prefix" library="fa" name="arrow-left"></SlIcon>
      Finance integrations
    </SlBreadcrumbItem>
    <SlBreadcrumbItem>Start tasks</SlBreadcrumbItem>
    <SlBreadcrumbItem>Upload balance</SlBreadcrumbItem>
  </SlBreadcrumb>
);
```

:::tip
Additional demonstrations can be found in the [breadcrumb examples](/components/breadcrumb).
:::
