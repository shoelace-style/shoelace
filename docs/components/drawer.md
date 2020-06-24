# Drawer

[component-header:sl-drawer]

Drawers...

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

```html preview
<sl-drawer label="Drawer" class="drawer-overview">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  <sl-button slot="footer" type="primary">Close</sl-button>
</sl-drawer>

<sl-button>Open Drawer</sl-button>

<script>
  (() => {
    const drawer = document.querySelector('.drawer-overview');
    const openButton = drawer.nextElementSibling;
    const closeButton = drawer.querySelector('sl-button[type="primary"]');
    
    openButton.addEventListener('click', () => drawer.show());
    closeButton.addEventListener('click', () => drawer.hide());
  })();
</script>
```

[component-metadata:sl-drawer]

## Examples=

### Placement

```html preview
<sl-drawer label="Drawer" placement="left" class="drawer-placement">
  I slide in from the left.
  <sl-button slot="footer" type="primary">Close</sl-button>
</sl-drawer>

<sl-button>Open Drawer</sl-button>

<script>
  (() => {
    const drawer = document.querySelector('.drawer-placement');
    const openButton = drawer.nextElementSibling;
    const closeButton = drawer.querySelector('sl-button[type="primary"]');
    
    openButton.addEventListener('click', () => drawer.show());
    closeButton.addEventListener('click', () => drawer.hide());
  })();
</script>
```

### Pinned

By default, drawers are closed when the user interacts outside of it (e.g. clicks outside). The `pinned` prop keeps the drawer open until the user explicitly closes it.

```html preview
<sl-drawer label="Drawer" pinned class="drawer-pinned">
  I'm pinned, so I won't be closed when you click outside of the drawer.
  <sl-button slot="footer" type="primary">Close</sl-button>
</sl-drawer>

<sl-button>Open Drawer</sl-button>

<script>
  (() => {
    const drawer = document.querySelector('.drawer-pinned');
    const openButton = drawer.nextElementSibling;
    const closeButton = drawer.querySelector('sl-button[type="primary"]');
    
    openButton.addEventListener('click', () => drawer.show());
    closeButton.addEventListener('click', () => drawer.hide());
  })();
</script>
```

### Scrolling

By design, a drawer's height is 100% of its container and will never exceed that of the viewport. As such, drawers will not scroll with the page ensuring the header and footer are always accessible to the user.

```html preview
<sl-drawer label="Drawer" class="drawer-scrolling">
  <div style="height: 150vh; border: dashed 2px var(--sl-color-gray-80); padding: 0 1rem;">
    <p>Scroll down and give it a try! 👇</p>
  </div>
  <sl-button slot="footer" type="primary">Close</sl-button>
</sl-drawer>

<sl-button>Open Drawer</sl-button>

<script>
  (() => {
    const drawer = document.querySelector('.drawer-scrolling');
    const openButton = drawer.nextElementSibling;
    const closeButton = drawer.querySelector('sl-button[type="primary"]');
    
    openButton.addEventListener('click', () => drawer.show());
    closeButton.addEventListener('click', () => drawer.hide());
  })();
</script>
```

### Overlay

```html preview
<sl-drawer label="Drawer" overlay class="drawer-overlay">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  <sl-button slot="footer" type="primary">Close</sl-button>
</sl-drawer>

<sl-button>Open Drawer</sl-button>

<script>
  (() => {
    const drawer = document.querySelector('.drawer-overlay');
    const openButton = drawer.nextElementSibling;
    const closeButton = drawer.querySelector('sl-button[type="primary"]');
    
    openButton.addEventListener('click', () => drawer.show());
    closeButton.addEventListener('click', () => drawer.hide());
  })();
</script>
```

### Custom Width

```html preview
<sl-drawer label="Drawer" class="drawer-custom-width" style="--width: 50vw;">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  <sl-button slot="footer" type="primary">Close</sl-button>
</sl-drawer>

<sl-button>Open Drawer</sl-button>

<script>
  (() => {
    const drawer = document.querySelector('.drawer-custom-width');
    const openButton = drawer.nextElementSibling;
    const closeButton = drawer.querySelector('sl-button[type="primary"]');
    
    openButton.addEventListener('click', () => drawer.show());
    closeButton.addEventListener('click', () => drawer.hide());
  })();
</script>
```

### No Header

```html preview
<sl-drawer label="Drawer" no-header class="drawer-no-header">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  <sl-button slot="footer" type="primary">Close</sl-button>
</sl-drawer>

<sl-button>Open Drawer</sl-button>

<script>
  (() => {
    const drawer = document.querySelector('.drawer-no-header');
    const openButton = drawer.nextElementSibling;
    const closeButton = drawer.querySelector('sl-button[type="primary"]');
    
    openButton.addEventListener('click', () => drawer.show());
    closeButton.addEventListener('click', () => drawer.hide());
  })();
</script>
```

### No Footer

```html preview
<sl-drawer label="Drawer" no-footer class="drawer-no-footer">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</sl-drawer>

<sl-button>Open Drawer</sl-button>

<script>
  (() => {
    const drawer = document.querySelector('.drawer-no-footer');
    const openButton = drawer.nextElementSibling;
    
    openButton.addEventListener('click', () => drawer.show());
  })();
</script>
```