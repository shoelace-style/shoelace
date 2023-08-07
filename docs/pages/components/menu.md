---
meta:
  title: Menu
  description: Menus provide a list of options for the user to choose from.
layout: component
---

You can use [menu items](/components/menu-item), [menu labels](/components/menu-label), and [dividers](/components/divider) to compose a menu. Menus support keyboard interactions, including type-to-select an option.

```html:preview
<sl-menu style="max-width: 200px;">
  <sl-menu-item value="undo">
    <sl-icon slot="prefix" name="arrow-counterclockwise"></sl-icon>
    Undo
  </sl-menu-item>
  <sl-menu-item value="redo" disabled>
    <sl-icon slot="prefix" name="arrow-clockwise"></sl-icon>
    Redo
  </sl-menu-item>
  <sl-divider></sl-divider>
  <sl-menu-item value="cut">
    <sl-icon slot="prefix" name="scissors"></sl-icon>
    Cut
  </sl-menu-item>
  <sl-menu-item value="copy">
    <sl-icon slot="prefix" name="files"></sl-icon>
    Copy
  </sl-menu-item>
  <sl-menu-item value="paste" disabled>
    <sl-icon slot="prefix" name="clipboard-check"></sl-icon>
    Paste
  </sl-menu-item>
  <sl-divider></sl-divider>
  <sl-menu-item value="delete">
    <sl-icon slot="prefix" name="trash"></sl-icon>
    Delete
  </sl-menu-item>
</sl-menu>
```

{% raw %}

```jsx:react
import { SlDivider, SlIcon, SlMenu, SlMenuItem } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlMenu style={{ maxWidth: '200px' }}>
    <SlMenuItem value="undo">
      <SlIcon slot="prefix" name="arrow-counterclockwise" />
      Undo
    </SlMenuItem>
    <SlMenuItem value="redo" disabled>
      <SlIcon slot="prefix" name="arrow-clockwise" />
      Redo
    </SlMenuItem>
    <SlDivider />
    <SlMenuItem value="cut">
      <SlIcon slot="prefix" name="scissors" />
      Cut
    </SlMenuItem>
    <SlMenuItem value="copy">
      <SlIcon slot="prefix" name="files" />
      Copy
    </SlMenuItem>
    <SlMenuItem value="paste" disabled>
      <SlIcon slot="prefix" name="clipboard-check" />
      Paste
    </SlMenuItem>
    <SlDivider />
    <SlMenuItem value="delete">
      <SlIcon slot="prefix" name="trash" />
      Delete
    </SlMenuItem>
  </SlMenu>
);
```

{% endraw %}

:::tip
Menus are intended for system menus (dropdown menus, select menus, context menus, etc.). They should not be mistaken for navigation menus which serve a different purpose and have a different semantic meaning. If you're building navigation, use `<nav>` and `<a>` elements instead.
:::
