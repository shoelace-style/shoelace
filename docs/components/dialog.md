# Dialog

[component-header:sl-dialog]

Dialogs, sometimes called "modals", appear above the page and require the user's immediate attention.

```html preview
<sl-dialog label="Dialog" class="dialog-overview">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  <sl-button slot="footer" type="primary">Close</sl-button>
</sl-dialog>

<sl-button>Open Dialog</sl-button>

<script>
  const dialog = document.querySelector('.dialog-overview');
  const openButton = dialog.nextElementSibling;
  const closeButton = dialog.querySelector('sl-button[slot="footer"]');

  openButton.addEventListener('click', () => dialog.show());
  closeButton.addEventListener('click', () => dialog.hide());
</script>
```

```jsx react
import { useState } from 'react';
import { SlButton, SlDialog } from '@shoelace-style/shoelace/dist/react';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SlDialog label="Dialog" open={open} onSlAfterHide={() => setOpen(false)}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        <SlButton slot="footer" type="primary" onClick={() => setOpen(false)}>
          Close
        </SlButton>
      </SlDialog>

      <SlButton onClick={() => setOpen(true)}>Open Dialog</SlButton>
    </>
  );
};
```

## UX Tips

- Use a dialog when you immediately require the user's attention, e.g. confirming a destructive action.
- Always provide an obvious way for the user to dismiss the dialog.
- Don't nest dialogs. It almost always leads to a poor experience for the user.

## Examples

### Custom Width

Use the `--width` custom property to set the dialog's width.

```html preview
<sl-dialog label="Dialog" class="dialog-width" style="--width: 50vw;">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  <sl-button slot="footer" type="primary">Close</sl-button>
</sl-dialog>

<sl-button>Open Dialog</sl-button>

<script>
  const dialog = document.querySelector('.dialog-width');
  const openButton = dialog.nextElementSibling;
  const closeButton = dialog.querySelector('sl-button[slot="footer"]');

  openButton.addEventListener('click', () => dialog.show());
  closeButton.addEventListener('click', () => dialog.hide());
</script>
```

```jsx react
import { useState } from 'react';
import { SlButton, SlDialog } from '@shoelace-style/shoelace/dist/react';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SlDialog 
        label="Dialog" 
        open={open} 
        style={{ '--width': '50vw' }} 
        onSlAfterHide={() => setOpen(false)}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        <SlButton slot="footer" type="primary" onClick={() => setOpen(false)}>
          Close
        </SlButton>
      </SlDialog>

      <SlButton onClick={() => setOpen(true)}>Open Dialog</SlButton>
    </>
  );
};
```

### Scrolling

By design, a dialog's height will never exceed that of the viewport. As such, dialogs will not scroll with the page ensuring the header and footer are always accessible to the user.

```html preview
<sl-dialog label="Dialog" class="dialog-scrolling">
  <div style="height: 150vh; border: dashed 2px rgb(var(--sl-color-neutral-200)); padding: 0 1rem;">
    <p>Scroll down and give it a try! 👇</p>
  </div>
  <sl-button slot="footer" type="primary">Close</sl-button>
</sl-dialog>

<sl-button>Open Dialog</sl-button>

<script>
  const dialog = document.querySelector('.dialog-scrolling');
  const openButton = dialog.nextElementSibling;
  const closeButton = dialog.querySelector('sl-button[slot="footer"]');

  openButton.addEventListener('click', () => dialog.show());
  closeButton.addEventListener('click', () => dialog.hide());
</script>
```

```jsx react
import { useState } from 'react';
import { SlButton, SlDialog } from '@shoelace-style/shoelace/dist/react';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SlDialog label="Dialog" open={open} onSlAfterHide={() => setOpen(false)}>
        <div style={{
          height: '150vh',
          border: 'dashed 2px rgb(var(--sl-color-neutral-200))',
          padding: '0 1rem'
        }}>
          <p>Scroll down and give it a try! 👇</p>
        </div>

        <SlButton slot="footer" type="primary" onClick={() => setOpen(false)}>
          Close
        </SlButton>
      </SlDialog>

      <SlButton onClick={() => setOpen(true)}>Open Dialog</SlButton>
    </>
  );
};
```

### Preventing the Dialog from Closing

By default, dialogs will close when the user clicks the close button, clicks the overlay, or presses the <kbd>Escape</kbd> key. In most cases, the default behavior is the best behavior in terms of UX. However, there are situations where this may be undesirable, such as when data loss will occur.

To keep the dialog open in such cases, you can cancel the `sl-request-close` event. When canceled, the dialog will remain open and pulse briefly to draw the user's attention to it.

```html preview
<sl-dialog label="Dialog" class="dialog-deny-close">
  This dialog will not close unless you use the button below.
  <sl-button slot="footer" type="primary">Save &amp; Close</sl-button>
</sl-dialog>

<sl-button>Open Dialog</sl-button>

<script>
  const dialog = document.querySelector('.dialog-deny-close');
  const openButton = dialog.nextElementSibling;
  const saveButton = dialog.querySelector('sl-button[slot="footer"]');

  openButton.addEventListener('click', () => dialog.show());
  saveButton.addEventListener('click', () => dialog.hide());

  dialog.addEventListener('sl-request-close', event => event.preventDefault());
</script>
```

```jsx react
import { useState } from 'react';
import { SlButton, SlDialog } from '@shoelace-style/shoelace/dist/react';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SlDialog 
        label="Dialog" 
        open={open} 
        onSlRequestClose={event => event.preventDefault()}
        onSlAfterHide={() => setOpen(false)}
      >
        This dialog will not close unless you use the button below.
        <SlButton slot="footer" type="primary" onClick={() => setOpen(false)}>
          Save &amp; Close
        </SlButton>
      </SlDialog>

      <SlButton onClick={() => setOpen(true)}>Open Dialog</SlButton>
    </>
  );
};
```

### Customizing Initial Focus

By default, the dialog's panel will gain focus when opened. This allows the first tab press to focus on the first tabbable element within the dialog. To set focus on a different element, listen for and cancel the `sl-initial-focus` event.

```html preview
<sl-dialog label="Dialog" class="dialog-focus">
  <sl-input placeholder="I will have focus when the dialog is opened"></sl-input>
  <sl-button slot="footer" type="primary">Close</sl-button>
</sl-dialog>

<sl-button>Open Dialog</sl-button>

<script>
  const dialog = document.querySelector('.dialog-focus');
  const input = dialog.querySelector('sl-input');
  const openButton = dialog.nextElementSibling;
  const closeButton = dialog.querySelector('sl-button[slot="footer"]');

  openButton.addEventListener('click', () => dialog.show());
  closeButton.addEventListener('click', () => dialog.hide());

  dialog.addEventListener('sl-initial-focus', event => {
    event.preventDefault();
    input.focus({ preventScroll: true });
  });
</script>
```

```jsx react
import { useRef, useState } from 'react';
import { 
  SlButton, 
  SlDialog, 
  SlInput 
} from '@shoelace-style/shoelace/dist/react';

const App = () => {
  const input = useRef(null);
  const [open, setOpen] = useState(false);

  function handleInitialFocus(event) {
    event.preventDefault();
    input.current.focus();
  }

  return (
    <>
      <SlDialog 
        label="Dialog" 
        open={open} 
        onSlInitialFocus={handleInitialFocus}
        onSlAfterHide={() => setOpen(false)}
      >
        <SlInput ref={input} placeholder="I will have focus when the dialog is opened" />
        <SlButton slot="footer" type="primary" onClick={() => setOpen(false)}>
          Close
        </SlButton>
      </SlDialog>

      <SlButton onClick={() => setOpen(true)}>Open Dialog</SlButton>
    </>
  );
};
```

[component-metadata:sl-dialog]
