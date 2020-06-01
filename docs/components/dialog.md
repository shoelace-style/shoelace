# Dialog

[component-header:sl-dialog]

Dialogs...

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

```html preview
<sl-dialog label="Dialog" id="dialog-overview">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  <sl-button slot="footer" type="primary" id="dialog-overview-close">Close</sl-button>
</sl-dialog>

<sl-button id="dialog-overview-open">Open Dialog</sl-button>

<script>
  (() => {
    const dialog = document.querySelector('#dialog-overview');
    const openButton = document.querySelector('#dialog-overview-open');
    const closeButton = document.querySelector('#dialog-overview-close');
    
    openButton.addEventListener('click', () => dialog.show());
    closeButton.addEventListener('click', () => dialog.hide());
  })();
</script>
```

[component-metadata:sl-dialog]

## Examples

### Scrolling

```html preview
<sl-dialog label="Dialog" id="dialog-scrolling">
  <div style="height: 150vh; border: dashed 1px var(--sl-color-gray-80); padding: 0 1rem;">
    <p>
      By design, the dialog's height will never exceed that of the viewport. As such, the dialog won't scroll with the 
      page, ensuring the header and footer are always accessible to the user.
    </p>
    <p>Give it a try! 👇</p>
  </div>
  <sl-button slot="footer" type="primary" id="dialog-scrolling-close">Close</sl-button>
</sl-dialog>

<sl-button id="dialog-scrolling-open">Open Dialog</sl-button>

<script>
  (() => {
    const dialog = document.querySelector('#dialog-scrolling');
    const openButton = document.querySelector('#dialog-scrolling-open');
    const closeButton = document.querySelector('#dialog-scrolling-close');
    
    openButton.addEventListener('click', () => dialog.show());
    closeButton.addEventListener('click', () => dialog.hide());
  })();
</script>
```