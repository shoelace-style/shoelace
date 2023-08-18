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
</sl-menu>
```

{% raw %}

```jsx:react
import SlDivider from '@shoelace-style/shoelace/dist/react/divider';
import SlMenu from '@shoelace-style/shoelace/dist/react/menu';
import SlMenuItem from '@shoelace-style/shoelace/dist/react/menu-item';

const App = () => (
  <SlMenu style={{ maxWidth: '200px' }}>
    <SlMenuItem value="undo">Undo</SlMenuItem>
    <SlMenuItem value="redo">Redo</SlMenuItem>
    <SlDivider />
    <SlMenuItem value="cut">Cut</SlMenuItem>
    <SlMenuItem value="copy">Copy</SlMenuItem>
    <SlMenuItem value="paste">Paste</SlMenuItem>
    <SlMenuItem value="delete">Delete</SlMenuItem>
  </SlMenu>
);
```

{% endraw %}

:::tip
Menus are intended for system menus (dropdown menus, select menus, context menus, etc.). They should not be mistaken for navigation menus which serve a different purpose and have a different semantic meaning. If you're building navigation, use `<nav>` and `<a>` elements instead.
:::

## Examples

### In Dropdowns

Menus work really well when used inside [dropdowns](/components/dropdown).

```html:preview
<sl-dropdown>
  <sl-button slot="trigger" caret>Edit</sl-button>
  <sl-menu>
    <sl-menu-item value="cut">Cut</sl-menu-item>
    <sl-menu-item value="copy">Copy</sl-menu-item>
    <sl-menu-item value="paste">Paste</sl-menu-item>
  </sl-menu>
</sl-dropdown>
```

```jsx:react
import SlButton from '@shoelace-style/shoelace/dist/react/button';
import SlDropdown from '@shoelace-style/shoelace/dist/react/dropdown';
import SlMenu from '@shoelace-style/shoelace/dist/react/menu';
import SlMenuItem from '@shoelace-style/shoelace/dist/react/menu-item';

const App = () => (
  <SlDropdown>
    <SlButton slot="trigger" caret>Edit</SlButton>
    <SlMenu>
      <SlMenuItem value="cut">Cut</SlMenuItem>
      <SlMenuItem value="copy">Copy</SlMenuItem>
      <SlMenuItem value="paste">Paste</SlMenuItem>
    </SlMenu>
  </SlDropdown>
);
```

### Submenus

To create a submenu, nest an `<sl-menu slot="submenu">` in any [menu item](/components/menu-item).

```html:preview
<sl-menu style="max-width: 200px;">
  <sl-menu-item value="undo">Undo</sl-menu-item>
  <sl-menu-item value="redo">Redo</sl-menu-item>
  <sl-divider></sl-divider>
  <sl-menu-item value="cut">Cut</sl-menu-item>
  <sl-menu-item value="copy">Copy</sl-menu-item>
  <sl-menu-item value="paste">Paste</sl-menu-item>
  <sl-divider></sl-divider>
  <sl-menu-item>
    Find
    <sl-menu slot="submenu">
      <sl-menu-item value="find">Find…</sl-menu-item>
      <sl-menu-item value="find-previous">Find Next</sl-menu-item>
      <sl-menu-item value="find-next">Find Previous</sl-menu-item>
    </sl-menu>
  </sl-menu-item>
  <sl-menu-item>
    Transformations
    <sl-menu slot="submenu">
      <sl-menu-item value="uppercase">Make uppercase</sl-menu-item>
      <sl-menu-item value="lowercase">Make lowercase</sl-menu-item>
      <sl-menu-item value="capitalize">Capitalize</sl-menu-item>
    </sl-menu>
  </sl-menu-item>
</sl-menu>
```

{% raw %}

```jsx:react
import SlDivider from '@shoelace-style/shoelace/dist/react/divider';
import SlMenu from '@shoelace-style/shoelace/dist/react/menu';
import SlMenuItem from '@shoelace-style/shoelace/dist/react/menu-item';

const App = () => (
  <SlMenu style={{ maxWidth: '200px' }}>
    <SlMenuItem value="undo">Undo</SlMenuItem>
    <SlMenuItem value="redo">Redo</SlMenuItem>
    <SlDivider />
    <SlMenuItem value="cut">Cut</SlMenuItem>
    <SlMenuItem value="copy">Copy</SlMenuItem>
    <SlMenuItem value="paste">Paste</SlMenuItem>
    <SlDivider />
    <SlMenuItem>
      Find
      <SlMenu slot="submenu">
        <SlMenuItem value="find">Find…</SlMenuItem>
        <SlMenuItem value="find-previous">Find Next</SlMenuItem>
        <SlMenuItem value="find-next">Find Previous</SlMenuItem>
      </SlMenu>
    </SlMenuItem>
    <SlMenuItem>
      Transformations
      <SlMenu slot="submenu">
        <SlMenuItem value="uppercase">Make uppercase</SlMenuItem>
        <SlMenuItem value="lowercase">Make lowercase</SlMenuItem>
        <SlMenuItem value="capitalize">Capitalize</SlMenuItem>
      </SlMenu>
    </SlMenuItem>
  </SlMenu>
);
```

:::warning
As a UX best practice, avoid using more than one level of submenus when possible.
:::

{% endraw %}
