# Drawer

[component-header:sl-drawer]

Drawers slide in from a container to expose additional options and information.

```html preview
<sl-drawer label="Drawer" class="drawer-overview">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  <sl-button slot="footer" type="primary">Close</sl-button>
</sl-drawer>

<sl-button>Open Drawer</sl-button>

<script>
  const drawer = document.querySelector('.drawer-overview');
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('sl-button[type="primary"]');

  openButton.addEventListener('click', () => drawer.show());
  closeButton.addEventListener('click', () => drawer.hide());
</script>
```

## Examples

### Slide in From Start

By default, drawers slide in from the end. To make the drawer slide in from the start, set the `placement` attribute to `start`.

```html preview
<sl-drawer label="Drawer" placement="start" class="drawer-placement-start">
  This drawer slides in from the start.
  <sl-button slot="footer" type="primary">Close</sl-button>
</sl-drawer>

<sl-button>Open Drawer</sl-button>

<script>
  const drawer = document.querySelector('.drawer-placement-start');
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('sl-button[type="primary"]');

  openButton.addEventListener('click', () => drawer.show());
  closeButton.addEventListener('click', () => drawer.hide());
</script>
```

### Slide in From Top

To make the drawer slide in from the top, set the `placement` attribute to `top`.

```html preview
<sl-drawer label="Drawer" placement="top" class="drawer-placement-top">
  This drawer slides in from the top.
  <sl-button slot="footer" type="primary">Close</sl-button>
</sl-drawer>

<sl-button>Open Drawer</sl-button>

<script>
  const drawer = document.querySelector('.drawer-placement-top');
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('sl-button[type="primary"]');

  openButton.addEventListener('click', () => drawer.show());
  closeButton.addEventListener('click', () => drawer.hide());
</script>
```

### Slide in From Bottom

To make the drawer slide in from the bottom, set the `placement` attribute to `bottom`.

```html preview
<sl-drawer label="Drawer" placement="bottom" class="drawer-placement-bottom">
  This drawer slides in from the bottom.
  <sl-button slot="footer" type="primary">Close</sl-button>
</sl-drawer>

<sl-button>Open Drawer</sl-button>

<script>
  const drawer = document.querySelector('.drawer-placement-bottom');
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('sl-button[type="primary"]');

  openButton.addEventListener('click', () => drawer.show());
  closeButton.addEventListener('click', () => drawer.hide());
</script>
```

### Contained to an Element

By default, the drawer slides out of its [containing block](https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#Identifying_the_containing_block), which is usually the viewport. To make the drawer slide out of its parent element, add the `contained` attribute and `position: relative` to the parent.

```html preview
<div
  style="position: relative; border: solid 2px var(--sl-panel-border-color); height: 300px; padding: 1rem; margin-bottom: 1rem;"
>
  The drawer will be contained to this box. This content won't shift or be affected in any way when the drawer opens.

  <sl-drawer label="Drawer" contained class="drawer-contained" style="--size: 50%;">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    <sl-button slot="footer" type="primary">Close</sl-button>
  </sl-drawer>
</div>

<sl-button>Open Drawer</sl-button>

<script>
  const drawer = document.querySelector('.drawer-contained');
  const openButton = drawer.parentElement.nextElementSibling;
  const closeButton = drawer.querySelector('sl-button[type="primary"]');

  openButton.addEventListener('click', () => drawer.show());
  closeButton.addEventListener('click', () => drawer.hide());
</script>
```

### Custom Size

Use the `--size` custom property to set the drawer's size. This will be applied to the drawer's width or height depending on its `placement`.

```html preview
<sl-drawer label="Drawer" class="drawer-custom-size" style="--size: 50vw;">
  This drawer is always 50% of the viewport.
  <sl-button slot="footer" type="primary">Close</sl-button>
</sl-drawer>

<sl-button>Open Drawer</sl-button>

<script>
  const drawer = document.querySelector('.drawer-custom-size');
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('sl-button[type="primary"]');

  openButton.addEventListener('click', () => drawer.show());
  closeButton.addEventListener('click', () => drawer.hide());
</script>
```

### Scrolling

By design, a drawer's height will never exceed 100% of its container. As such, drawers will not scroll with the page to ensure the header and footer are always accessible to the user.

```html preview
<sl-drawer label="Drawer" class="drawer-scrolling">
  <div style="height: 150vh; border: dashed 2px var(--sl-color-gray-200); padding: 0 1rem;">
    <p>Scroll down and give it a try! 👇</p>
  </div>
  <sl-button slot="footer" type="primary">Close</sl-button>
</sl-drawer>

<sl-button>Open Drawer</sl-button>

<script>
  const drawer = document.querySelector('.drawer-scrolling');
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('sl-button[type="primary"]');

  openButton.addEventListener('click', () => drawer.show());
  closeButton.addEventListener('click', () => drawer.hide());
</script>
```

### Preventing the Drawer from Closing

By default, drawers will close when the user clicks the close button, clicks the overlay, or presses the <kbd>Escape</kbd> key. In most cases, the default behavior is the best behavior in terms of UX. However, there are situations where this may be undesirable, such as when data loss will occur.

To keep the drawer open in such cases, you can cancel the `sl-request-close` event. When canceled, the drawer will remain open and pulse briefly to draw the user's attention to it.


```html preview
<sl-drawer label="Drawer" class="drawer-deny-close">
  This dialog will not close unless you use the button below.
  <sl-button slot="footer" type="primary">Save &amp; Close</sl-button>
</sl-drawer>

<sl-button>Open Drawer</sl-button>

<script>
  const drawer = document.querySelector('.drawer-deny-close');
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('sl-button[type="primary"]');

  openButton.addEventListener('click', () => drawer.show());
  closeButton.addEventListener('click', () => drawer.hide());

  drawer.addEventListener('sl-request-close', event => event.preventDefault());
</script>
```

### Customizing Initial Focus

By default, the drawer's panel will gain focus when opened. This allows the first tab press to focus on the first tabbable element within the drawer. To set focus on a different element, listen for and cancel the `sl-initial-focus` event.

```html preview
<sl-drawer label="Drawer" class="drawer-focus">
  <sl-input placeholder="I will have focus when the drawer is opened"></sl-input>
  <sl-button slot="footer" type="primary">Close</sl-button>
</sl-drawer>

<sl-button>Open Drawer</sl-button>

<script>
  const drawer = document.querySelector('.drawer-focus');
  const input = drawer.querySelector('sl-input');
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('sl-button[type="primary"]');

  openButton.addEventListener('click', () => drawer.show());
  closeButton.addEventListener('click', () => drawer.hide());

  drawer.addEventListener('sl-initial-focus', event => {
    event.preventDefault();
    input.focus({ preventScroll: true });
  });    
</script>
```

[component-metadata:sl-drawer]
