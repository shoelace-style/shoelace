# Context Menu

[component-header:sl-context-menu]

Context menus offer additional options through a menu that opens at the pointers location, usually triggered by a right-click.

Context menus are designed to work with [menus](/components/menu) and [menu items](/components/menu-item). The menu must include `slot="menu"`. Other content you provide will be part of the context menu's target area.

```html preview
<sl-context-menu>
  <div style="height: 200px; background: rgb(var(--sl-color-neutral-100)); display: flex; align-items: center; justify-content: center;">
    Right-click to activate the context menu
  </div>

  <sl-menu slot="menu">
    <sl-menu-item value="undo">Undo</sl-menu-item>
    <sl-menu-item value="redo">Redo</sl-menu-item>
    <sl-divider></sl-divider>
    <sl-menu-item value="cut">Cut</sl-menu-item>
    <sl-menu-item value="copy">Copy</sl-menu-item>
    <sl-menu-item value="paste">Paste</sl-menu-item>
    <sl-menu-item value="delete">Delete</sl-menu-item>
  </sl-menu>
</sl-context-menu>
```

## Examples

### Handling Selections

The [menu component](/components/menu) emits an `sl-select` event when a menu item is selected. You can use this to handle selections. The selected item will be available in `event.detail.item`.

```html preview
<div class="context-menu-selections">
  <sl-context-menu>
    <div style="height: 200px; background: rgb(var(--sl-color-neutral-100)); display: flex; align-items: center; justify-content: center;">
      Right-click to activate the context menu
    </div>

    <sl-menu slot="menu">
      <sl-menu-item value="cut">Cut</sl-menu-item>
      <sl-menu-item value="copy">Copy</sl-menu-item>
      <sl-menu-item value="paste">Paste</sl-menu-item>
    </sl-menu>
  </sl-context-menu>
</div>

<script>
  const container = document.querySelector('.context-menu-selections');
  const menu = container.querySelector('sl-menu');
  const result = container.querySelector('.result');

  menu.addEventListener('sl-select', event => {
    console.log(`You selected: ${event.detail.item.value}`);
  });
</script>
```

### Inline

The context menu uses `display: contents`, so it will assume the shape of the content you slot in.

```html preview
<sl-context-menu>
  <span style="background: rgb(var(--sl-color-neutral-100)); padding: .5rem 1rem;">
    Right-click here
  </span>

  <sl-menu slot="menu">
    <sl-menu-item value="cut">Cut</sl-menu-item>
    <sl-menu-item value="copy">Copy</sl-menu-item>
    <sl-menu-item value="paste">Paste</sl-menu-item>
  </sl-menu>
</sl-context-menu>
```

### Placement

The preferred placement of the context menu can be set with the `placement` attribute. Note that the actual position may vary to ensure the menu remains in the viewport.

```html preview
<sl-context-menu placement="top-end">
  <div style="height: 200px; background: rgb(var(--sl-color-neutral-100)); display: flex; align-items: center; justify-content: center;">
    Right-click to activate the context menu
  </div>

  <sl-menu slot="menu">
    <sl-menu-item value="undo">Undo</sl-menu-item>
    <sl-menu-item value="redo">Redo</sl-menu-item>
    <sl-divider></sl-divider>
    <sl-menu-item value="cut">Cut</sl-menu-item>
    <sl-menu-item value="copy">Copy</sl-menu-item>
    <sl-menu-item value="paste">Paste</sl-menu-item>
    <sl-menu-item value="delete">Delete</sl-menu-item>
  </sl-menu>
</sl-context-menu>
```

[component-metadata:sl-context-menu]
