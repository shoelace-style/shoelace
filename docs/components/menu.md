# Menu

[component-header:sl-menu]

You can use [menu items](/components/menu-item), [menu labels](/components/menu-label), and [dividers](/components/divider) to compose a menu. Menus support keyboard interactions, including type-to-select an option.

```html preview
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

```pug slim
sl-menu style="max-width: 200px;"
  sl-menu-item value="undo" Undo
  sl-menu-item value="redo" Redo
  sl-divider
  sl-menu-item value="cut" Cut
  sl-menu-item value="copy" Copy
  sl-menu-item value="paste" Paste
  sl-menu-item value="delete" Delete
```

```jsx react
import { SlDivider, SlMenu, SlMenuItem } from '@teamshares/shoelace/dist/react';

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

?> Menus are intended for system menus (dropdown menus, select menus, context menus, etc.). They should not be mistaken for navigation menus which serve a different purpose and have a different semantic meaning. If you're building navigation, use `<nav>` and `<a>` elements instead.

[component-metadata:sl-menu]
