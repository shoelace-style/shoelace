# Backdrop

[component-header:sl-backdrop]

The backdrop signals to the user of a state change within the application and can be used for creating loaders, dialogs and more. In its simplest form, the backdrop component will add a dimmed layer over your application.

```html preview
<sl-backdrop class="backdrop">
  <sl-spinner style="font-size: 3rem;"></sl-spinner>
</sl-backdrop>
<sl-button>Open backdrop</sl-button>

<script>
  (() => {
    const backdrop = document.querySelector('.backdrop')
    const openButton = backdrop.nextElementSibling;
    
    openButton.addEventListener('click', () => backdrop.show())

  })()
</script>
```

### Ignoring Clicks on the Overlay

By default, the overlay is closed when the user clicks or taps on the overlay. To prevent this behavior, cancel the `sl-overlay-dismiss` event.

```html preview
<sl-backdrop class="backdrop-no-overlay-dismiss">
  <sl-button class="sl-button-no-overlay-dismiss">Close backdrop</sl-button>
</sl-backdrop>
<sl-button>Open backdrop</sl-button>

<script>
  (() => {
    const backdrop = document.querySelector('.backdrop-no-overlay-dismiss')
    const openButton = backdrop.nextElementSibling;
    const closeButton = document.querySelector('.sl-button-no-overlay-dismiss')

    openButton.addEventListener('click', () => backdrop.show())
    closeButton.addEventListener('click', () => backdrop.hide())
    backdrop.addEventListener('sl-overlay-dismiss', event => event.preventDefault());

  })()
</script>
```

[component-metadata:sl-backdrop]