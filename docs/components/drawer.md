# Drawer

[component-header:sl-drawer]

Drawers...

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

```html preview
<sl-drawer label="Title" class="drawer-overview">

  <div style="border: dashed 2px var(--sl-color-gray-90); height: calc(100% - 4px);"></div>
  
  <sl-button slot="footer" type="primary">Apply Changes</sl-button>
  <sl-button slot="footer" type="default">Cancel</sl-button>
</sl-drawer>

<sl-button>Open Drawer</sl-button>

<script>
  (() => {
    const drawer = document.querySelector('.drawer-overview');
    const openButton = drawer.nextElementSibling;

    const cancelButton = drawer.querySelector('sl-button[type="default"]');
    const applyButton = drawer.querySelector('sl-button[type="primary"]');

    openButton.addEventListener('click', () => drawer.show());
    cancelButton.addEventListener('click', () => drawer.hide());
    applyButton.addEventListener('click', () => drawer.hide());
  })();
</script>
```

[component-metadata:sl-drawer]

## Examples

### Absolute

To make the drawer slide out of a parent container, set `position: relative` and `overflow: hidden` on the parent container and set `position` to `absolute` on the drawer.

```html preview
<div class="drawer-in-container" style="position: relative; overflow: hidden; height: 250px; border: solid 2px var(--sl-color-gray-90); margin-bottom: 1rem;">
  <sl-drawer label="Title" position="absolute" style="--width: 50%;">
    I'm attached to a parent container
  </sl-drawer>
</div>
<sl-button>Open Drawer</sl-button>

<script>
  (() => {
    const drawer = document.querySelector('.drawer-in-container > sl-drawer');
    const openButton = document.querySelector('.drawer-in-container').nextElementSibling;
  
    openButton.addEventListener('click', () => drawer.show());
  })();
</script>
```

### Pinned

By default, drawers are closed when the user interacts outside of it (e.g. clicks outside). The `pinned` prop keeps the drawer open until the user explicitly closes it. When using this, consider providing a visual indicator to the user so it's obvious that the drawer can't be dismissed in the usual way.

```html preview
<sl-drawer label="Title" pinned class="drawer-pinned">
  <div style="border: dashed 2px var(--sl-color-gray-90); height: calc(100% - 4px);"></div>
  <sl-button slot="footer" type="primary">Close</sl-button>
</sl-drawer>

<sl-button>Toggle Drawer</sl-button>

<script>
  (() => {
    const drawer = document.querySelector('.drawer-pinned');
    const toggleButton = drawer.nextElementSibling;
    const closeButton = drawer.querySelector('sl-button[type="primary"]');

    toggleButton.addEventListener('click', () => drawer.open = !drawer.open);
    closeButton.addEventListener('click', () => drawer.hide());
  })();
</script>
```