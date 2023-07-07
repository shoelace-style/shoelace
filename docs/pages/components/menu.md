---
meta:
  title: Menu
  description: Menus provide a list of options for the user to choose from.
layout: component
---

You can use [menu items](/components/menu-item), [menu labels](/components/menu-label), and [dividers](/components/divider) to compose a menu. Menus support keyboard interactions, including type-to-select an option.

```html:preview
<sl-menu style="max-width: 200px;">
  <sl-menu-item value="undo">Undo</sl-menu-item>
  <sl-menu-item value="redo">Redo</sl-menu-item>
  <sl-divider></sl-divider>
  <sl-menu-item value="cut">Cut</sl-menu-item>
  <sl-menu-item value="copy">Copy</sl-menu-item>
  <sl-menu-item value="paste">Paste</sl-menu-item>
  <sl-menu-item value="delete">Delete</sl-menu-item>
  <sl-divider></sl-divider>
  <sl-menu-item>
    Find
    <sl-menu slot="submenu">
      <sl-menu-item value="find-previous">Find Previous</sl-menu-item>
      <sl-menu-item value="find-next">Find Next</sl-menu-item>
    </sl-menu>
  </sl-menu-item>
</sl-menu>
```

{% raw %}

```jsx:react
import { SlDivider, SlMenu, SlMenuItem } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlMenu style={{ maxWidth: '200px' }}>
    <SlMenuItem value="undo">Undo</SlMenuItem>
    <SlMenuItem value="redo">Redo</SlMenuItem>
    <SlDivider />
    <SlMenuItem value="cut">Cut</SlMenuItem>
    <SlMenuItem value="copy">Copy</SlMenuItem>
    <SlMenuItem value="paste">Paste</SlMenuItem>
    <SlMenuItem value="delete">Delete</SlMenuItem>
    <SlDivider />
    <SlMenuItem>
      Find
      <SlMenu slot="submenu">
        <SlMenuItem value="find-previous">Find Previous</SlMenuItem>
        <SlMenuItem value="find-next">Find Next</SlMenuItem>
      </SlMenu>
    </SlMenuItem>
  </SlMenu>
);
```

{% endraw %}

:::tip
Menus are intended for system menus (dropdown menus, select menus, context menus, etc.). They should not be mistaken for navigation menus which serve a different purpose and have a different semantic meaning. If you're building navigation, use `<nav>` and `<a>` elements instead.
:::

## Examples

### Submenus

The `submenu` slot of a [menu-item](/components/menu-item) can be used to nest a menu, which is rendered by leveraging the [popup](/components/popup) component.

```html:preview
<sl-menu style="max-width: 200px;">
  <sl-menu-item>
    Submenu
    <sl-menu slot="submenu">
      <sl-menu-item>Submenu Option 1</sl-menu-item>
      <sl-menu-item>Submenu Option 2</sl-menu-item>
      <sl-menu-item>
        Submenu Option 3
        <sl-menu slot="submenu">
          <sl-menu-item>Sub-submenu Option 1</sl-menu-item>
        </sl-menu>
      </sl-menu-item>
    </sl-menu>
  </sl-menu-item>
  <sl-menu-item disabled>
    Disabled Submenu
    <sl-menu slot="submenu">
      <sl-menu-item>Disabled Submenu Option 1</sl-menu-item>
    </sl-menu>
  </sl-menu-item>
</sl-menu>
```

{% raw %}

```jsx:react
import { SlMenu, SlMenuItem } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlMenu style={{ maxWidth: '200px' }}>
    <SlMenuItem>
      Submenu
      <SlMenu slot="submenu">
        <SlMenuItem>Submenu Option 1</SlMenuItem>
        <SlMenuItem>Submenu Option 2</SlMenuItem>
        <SlMenuItem>
          Submenu Option 3
          <SlMenu slot="submenu">
            <SlMenuItem>Sub-submenu Option 1</SlMenuItem>
          </SlMenu>
        </SlMenuItem>
      </SlMenu>
    </SlMenuItem>
  </SlMenu>
);
```

{% endraw %}
