# Drawer

[component-header:sl-drawer]

Drawers slide out from a container to expose additional options and information.

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

## Examples

### Placement

```html preview
<sl-drawer label="Drawer" placement="left" class="drawer-placement">
  This drawer slides in from the left.
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

### Contained

By default, the drawer slides out of its [containing block](https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#Identifying_the_containing_block), which is usually the viewport. To make the drawer slide out of its parent element, set this prop and add `position: relative` to the parent.

```html preview
<div
  style="position: relative; border: solid 2px var(--sl-color-gray-80); height: 300px; padding: 1rem; margin-bottom: 1rem;"
>
  The drawer will be contained to this box. This content won't shift or be affected in any way when the drawer opens.

  <sl-drawer label="Drawer" contained class="drawer-contained" style="--width: 50%;">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    <sl-button slot="footer" type="primary">Close</sl-button>
  </sl-drawer>
</div>

<sl-button>Open Drawer</sl-button>

<script>
  (() => {
    const drawer = document.querySelector('.drawer-contained');
    const openButton = drawer.parentElement.nextElementSibling;
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

### Custom Width

```html preview
<sl-drawer label="Drawer" class="drawer-custom-width" style="--width: 50vw;">
  This drawer is always 50% of the viewport.
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
  This drawer doesn't have a header.
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
  This drawer doesn't have a footer.
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

### Ignore Overlay Clicks

By default, drawers are closed when the user clicks or taps on the overlay. To prevent this behavior, cancel the `slOverlayDismiss` event.

```html preview
<sl-drawer label="Drawer" class="drawer-no-overlay-dismiss">
  This drawer will not be closed when you click outside of it.
  <sl-button slot="footer" type="primary">Close</sl-button>
</sl-drawer>

<sl-button>Open Drawer</sl-button>

<script>
  (() => {
    const drawer = document.querySelector('.drawer-no-overlay-dismiss');
    const openButton = drawer.nextElementSibling;
    const closeButton = drawer.querySelector('sl-button[type="primary"]');

    openButton.addEventListener('click', () => drawer.show());
    closeButton.addEventListener('click', () => drawer.hide());

    drawer.addEventListener('slOverlayDismiss', event => event.preventDefault());
  })();
</script>
```

[component-metadata:sl-drawer]
