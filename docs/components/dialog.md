# Dialog

```html preview
<sl-dialog label="Dialog" id="dialog-1">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  <sl-button slot="footer" type="primary" id="dialog-1-close">Close</sl-button>
</sl-dialog>

<sl-button id="dialog-1-open">Open Dialog</sl-button>

<script>
  (() => {
    const dialog = document.querySelector('#dialog-1');
    const openButton = document.querySelector('#dialog-1-open');
    const closeButton = document.querySelector('#dialog-1-close');
    
    openButton.addEventListener('click', () => dialog.show());
    closeButton.addEventListener('click', () => dialog.hide());
  })();
</script>
```

[component-metadata:sl-dialog]