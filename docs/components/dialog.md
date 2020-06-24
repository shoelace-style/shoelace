# Dialog

[component-header:sl-dialog]

Dialogs...

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

```html preview
<sl-dialog label="Dialog" class="dialog-overview">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  <sl-button slot="footer" type="primary">Close</sl-button>
</sl-dialog>

<sl-button>Open Dialog</sl-button>

<script>
  (() => {
    const dialog = document.querySelector('.dialog-overview');
    const openButton = dialog.nextElementSibling;
    const closeButton = dialog.querySelector('sl-button[slot="footer"]');
    
    openButton.addEventListener('click', () => dialog.show());
    closeButton.addEventListener('click', () => dialog.hide());
  })();
</script>
```

[component-metadata:sl-dialog]

## Examples

### Pinned

By default, dialogs are closed when the user interacts outside of it (e.g. clicks outside). The `pinned` prop keeps the dialog open until the user explicitly closes it.

```html preview
<sl-dialog label="Dialog" pinned class="dialog-pinned">
  I'm pinned, so I won't be closed when you click outside of the dialog.
  <sl-button slot="footer" type="primary">Close</sl-button>
</sl-dialog>

<sl-button>Open Dialog</sl-button>

<script>
  (() => {
    const dialog = document.querySelector('.dialog-pinned');
    const openButton = dialog.nextElementSibling;
    const closeButton = dialog.querySelector('sl-button[slot="footer"]');
    
    openButton.addEventListener('click', () => dialog.show());
    closeButton.addEventListener('click', () => dialog.hide());
  })();
</script>
```

### Scrolling

By design, a dialog's height will never exceed that of the viewport. As such, dialogs will not scroll with the page ensuring the header and footer are always accessible to the user.

```html preview
<sl-dialog label="Dialog" class="dialog-scrolling">
  <div style="height: 150vh; border: dashed 2px var(--sl-color-gray-80); padding: 0 1rem;">
    <p>Scroll down and give it a try! 👇</p>
  </div>
  <sl-button slot="footer" type="primary">Close</sl-button>
</sl-dialog>

<sl-button>Open Dialog</sl-button>

<script>
  (() => {
    const dialog = document.querySelector('.dialog-scrolling');
    const openButton = dialog.nextElementSibling;
    const closeButton = dialog.querySelector('sl-button[slot="footer"]');
    
    openButton.addEventListener('click', () => dialog.show());
    closeButton.addEventListener('click', () => dialog.hide());
  })();
</script>
```
