---
meta:
  title: Dialog
  description: 'Dialogs, also called "modals", appear above the page and require the user''s immediate attention.'
layout: component
---

## Examples

### Basic Dialog

```html:preview
<sl-dialog label="Basic dialog" class="dialog-basic">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  <sl-button slot="footer" variant="default">Cancel</sl-button>
  <sl-button slot="footer" variant="primary">Save</sl-button>
</sl-dialog>

<sl-button>Open basic dialog</sl-button>

<script>
  const dialog = document.querySelector('.dialog-basic');
  const openButton = dialog.nextElementSibling;
  const footerButtons = dialog.querySelectorAll('sl-button[slot="footer"]');

  openButton.addEventListener('click', () => dialog.show());
  footerButtons.forEach(button => {
    button.addEventListener('click', () => dialog.hide());
  });
</script>
```

```pug:slim
sl-dialog label="Basic dialog" class="dialog-basic"
  | Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  sl-button slot="footer" variant="default" Cancel
  sl-button slot="footer" variant="primary" Save
sl-button Open Dialog

javascript:
  const dialog = document.querySelector(.dialog-basic);
  const openButton = dialog.nextElementSibling;
  const footerButtons = dialog.querySelectorAll(sl-button[slot=footer]);

  openButton.addEventListener(click, () => dialog.show());
  footerButtons.forEach(button => {
    button.addEventListener('click', () => dialog.hide());
  });
```

```jsx:react
import { useState } from 'react';
import SlButton from '@teamshares/shoelace/dist/react/button';
import SlDialog from '@teamshares/shoelace/dist/react/dialog';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SlDialog label="Basic Ddialog" open={open} onSlAfterHide={() => setOpen(false)}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        <SlButton slot="footer" variant="default" onClick={() => setOpen(false)}>
          Cancel
        </SlButton>
        <SlButton slot="footer" variant="primary" onClick={() => setOpen(false)}>
          Close
        </SlButton>
      </SlDialog>

      <SlButton onClick={() => setOpen(true)}>Open Dialog</SlButton>
    </>
  );
};
```

### Dialog with Icon

Use the `header-icon` slot to display an `sl-icon` to the left of the dialog label (title). Set the dialog variant (`default` or `warning`) to apply a color theme to the icon.

:::warning
**Note:** When using the `warning` variant of the dialog, be sure to use the button variant `warning` for the dialog's primary action button.
:::

```html:preview
<sl-dialog label="Submit request?" class="dialog-default" variant="default">
  <sl-icon library="fa" name="circle-info" slot="header-icon"></sl-icon>
  If you need to, you'll be able to cancel this request after submitting it.
  <sl-button slot="footer" variant="default">Cancel</sl-button>
  <sl-button slot="footer" variant="primary">Submit request</sl-button>
</sl-dialog>

<sl-button>Open default dialog</sl-button>

<sl-dialog label="Cancel request?" class="dialog-warning" variant="warning">
  <sl-icon library="fa" name="exclamation-triangle" slot="header-icon"></sl-icon>
  You can't undo this action. You'll need to create a new request.
  <sl-button slot="footer" variant="default">Keep request</sl-button>
  <sl-button slot="footer" variant="warning">Cancel request</sl-button>
</sl-dialog>

<sl-button>Open warning dialog</sl-button>

<script>
  const dialogDefault = document.querySelector('.dialog-default');
  const openDialogDefault = dialogDefault.nextElementSibling;
  const footerButtonsDefault = dialogDefault.querySelectorAll('sl-button[slot="footer"]');

  openDialogDefault.addEventListener('click', () => dialogDefault.show());
  footerButtonsDefault.forEach(button => {
    button.addEventListener('click', () => dialogDefault.hide());
  });

  const dialogWarning = document.querySelector('.dialog-warning');
  const openDialogWarning = dialogWarning.nextElementSibling;
  const footerButtonsWarning = dialogWarning.querySelectorAll('sl-button[slot="footer"]');

  openDialogWarning.addEventListener('click', () => dialogWarning.show());
  footerButtonsWarning.forEach(button => {
    button.addEventListener('click', () => dialogWarning.hide());
  });
</script>
```

```pug:slim
sl-dialog label="Submit request?" class="dialog-default" variant="default"
  sl-icon library="fa" name="circle-info" slot="header-icon"
  | If you need to, you'll be able to cancel this request after submitting it.
  sl-button slot="footer" variant="default" Cancel
  sl-button slot="footer" variant="primary" Submit request

sl-button Open default dialog

sl-dialog label="Cancel request?" class="dialog-warning" variant="warning"
  sl-icon library="fa" name="exclamation-triangle" slot="header-icon"
  | You can't undo this action. You'll need to create a new request.
  sl-button slot="footer" variant="default" Keep request
  sl-button slot="footer" variant="warning" Cancel request

sl-button Open warning dialog

script.
  document.addEventListener('DOMContentLoaded', () => {
    const dialogDefault = document.querySelector('.dialog-default');
    const openDialogDefault = dialogDefault.nextElementSibling;
    const footerButtonsDefault = dialogDefault.querySelectorAll('sl-button[slot="footer"]');

    openDialogDefault.addEventListener('click', () => dialogDefault.show());
    footerButtonsDefault.forEach(button => {
      button.addEventListener('click', () => dialogDefault.hide());
    });

    const dialogWarning = document.querySelector('.dialog-warning');
    const openDialogWarning = dialogWarning.nextElementSibling;
    const footerButtonsWarning = dialogWarning.querySelectorAll('sl-button[slot="footer"]');

    openDialogWarning.addEventListener('click', () => dialogWarning.show());
    footerButtonsWarning.forEach(button => {
      button.addEventListener('click', () => dialogWarning.hide());
    });
  });
```

```jsx:react
import { useState } from 'react';
import SlButton from '@teamshares/shoelace/dist/react/button';
import SlDialog from '@teamshares/shoelace/dist/react/dialog';
import SlIcon from '@teamshares/shoelace/dist/react/icon';

const App = () => {
  const [dialogDefaultOpen, setDialogDefaultOpen] = useState(false);
  const [dialogWarningOpen, setDialogWarningOpen] = useState(false);

  const toggleDialogDefault = () => setDialogDefaultOpen(!dialogDefaultOpen);
  const toggleDialogWarning = () => setDialogWarningOpen(!dialogWarningOpen);

  return (
    <>
      <SlDialog label="Submit request?" class="dialog-default" variant="default" open={dialogDefaultOpen}>
        <SlIcon library="fa" name="circle-info" slot="header-icon" />
        If you need to, you'll be able to cancel this request after submitting it.
        <SlButton slot="footer" variant="default" onClick={toggleDialogDefault}>
          Cancel
        </SlButton>
        <SlButton slot="footer" variant="primary" onClick={toggleDialogDefault}>
          Submit request
        </SlButton>
      </SlDialog>
      <SlButton onClick={toggleDialogDefault}>Open default dialog</SlButton>

      <SlDialog label="Cancel request?" class="dialog-warning" variant="warning" open={dialogWarningOpen}>
        <SlIcon library="fa" name="exclamation-triangle" slot="header-icon" />
        You can't undo this action. You'll need to create a new request.
        <SlButton slot="footer" variant="default" onClick={toggleDialogWarning}>
          Keep request
        </SlButton>
        <SlButton slot="footer" variant="warning" onClick={toggleDialogWarning}>
          Cancel request
        </SlButton>
      </SlDialog>
      <SlButton onClick={toggleDialogWarning}>Open warning dialog</SlButton>
    </>
  );
};
```

### Announcement Dialog

Use the `announcement` variant to display a dialog with a large icon, more text, and a centered layout. This type of dialog can be useful for announcing new features in the app.

:::warning
**Note:** The `announcement` variant is meant to be used with positive or celebratory messages. Don't use this dialog for errors, warnings, or confirmation.
:::

```html:preview
<sl-dialog label="Meet your new Monthly Numbers dashboard" class="dialog-announcement" variant="announcement">
  <div slot="announcement-intro">Welcome!</div>
  <sl-icon library="fa" name="fal-party-horn" slot="header-icon"></sl-icon>
  Track your company's revenue, gross profit, and operating profit over the past month, quarter, and year, all on one page.
  <sl-button slot="footer" variant="primary" size="large">Let me explore</sl-button>
  <div slot="footer-text"><a href="#">Learn more about Monthly Numbers</a></div>
</sl-dialog>

<sl-button>Open announcement dialog</sl-button>

<script>
  const dialogAnnouncement = document.querySelector('.dialog-announcement');
  const openDialogAnnouncement = dialogAnnouncement.nextElementSibling;
  const footerButtonsAnnouncement = dialogAnnouncement.querySelectorAll('sl-button[slot="footer"]');

  openDialogAnnouncement.addEventListener('click', () => dialogAnnouncement.show());
  footerButtonsAnnouncement.forEach(button => {
    button.addEventListener('click', () => dialogAnnouncement.hide());
  });
</script>
```

```pug:slim
sl-dialog label="Meet your new Monthly Numbers dashboard" class="dialog-announcement" variant="announcement"
  div slot="announcement-intro" Welcome!
  sl-icon library="fa" name="fal-party-horn" slot="header-icon"
  | Track your company's revenue, gross profit, and operating profit over the past month, quarter, and year, all on one page.
  sl-button slot="footer" variant="primary" size="large" Let me explore
  div slot="footer-text"
    a href="#" Learn more about Monthly Numbers

sl-button Open announcement dialog

script.
  const dialogAnnouncement = document.querySelector('.dialog-announcement');
  const openDialogAnnouncement = dialogAnnouncement.nextElementSibling;
  const footerButtonsAnnouncement = dialogAnnouncement.querySelectorAll('sl-button[slot="footer"]');

  openDialogAnnouncement.addEventListener('click', () => dialogAnnouncement.show());
  footerButtonsAnnouncement.forEach(button => {
    button.addEventListener('click', () => dialogAnnouncement.hide());
  });
```

```jsx:react
import { useState } from 'react';
import SlButton from '@teamshares/shoelace/dist/react/button';
import SlDialog from '@teamshares/shoelace/dist/react/dialog';
import SlIcon from '@teamshares/shoelace/dist/react/icon';

const App = () => {
  const dialogAnnouncement = useRef(null);

  useEffect(() => {
    const openDialogAnnouncement = document.querySelector('.dialog-announcement + sl-button');
    const footerButtonsAnnouncement = document.querySelectorAll('.dialog-announcement sl-button[slot="footer"]');

    openDialogAnnouncement.addEventListener('click', () => dialogAnnouncement.current.show());
    footerButtonsAnnouncement.forEach(button => {
      button.addEventListener('click', () => dialogAnnouncement.current.hide());
    });
  }, []);

  return (
    <>
      <SlDialog ref={dialogAnnouncement} label="Meet your new Monthly Numbers dashboard" class="dialog-announcement" variant="announcement">
        <div slot="announcement-intro">Welcome!</div>
        <SlIcon library="fa" name="fal-party-horn" slot="header-icon" />
        Track your company's revenue, gross profit, and operating profit over the past month, quarter, and year, all on one page.
        <SlButton slot="footer" variant="primary" size="large">Let me explore</SlButton>
        <div slot="footer-text"><a href="#">Learn more about Monthly Numbers</a></div>
      </SlDialog>

      <SlButton>Open announcement dialog</SlButton>
    </>
  );
};
```

### Dialog Widths

Use the `size` property to set a dialog's width.

:::warning
**Note:** A `--width` custom property is also available, but opt to use one of the default sizes (`small`, `medium` (default), and `large`) whenever possible.
:::

```html:preview
<sl-dialog label="Small dialog" class="dialog-small" size="small">
  This is a small dialog.
  <sl-button slot="footer" variant="primary">Close</sl-button>
</sl-dialog>

<sl-button>Open small dialog</sl-button>

<sl-dialog label="Large dialog" class="dialog-large" size="large">
  This is a large dialog.
  <sl-button slot="footer" variant="primary">Close</sl-button>
</sl-dialog>

<sl-button>Open large dialog</sl-button>

<script>
  const dialogSmall = document.querySelector('.dialog-small');
  const openButtonSmallDialog = dialogSmall.nextElementSibling;
  const closeButtonSmallDialog = dialogSmall.querySelector('sl-button[slot="footer"]');

  openButtonSmallDialog.addEventListener('click', () => dialogSmall.show());
  closeButtonSmallDialog.addEventListener('click', () => dialogSmall.hide());

  const dialogLarge = document.querySelector('.dialog-large');
  const openButtonLargeDialog = dialogLarge.nextElementSibling;
  const closeButtonLargeDialog = dialogLarge.querySelector('sl-button[slot="footer"]');

  openButtonLargeDialog.addEventListener('click', () => dialogLarge.show());
  closeButtonLargeDialog.addEventListener('click', () => dialogLarge.hide());
</script>
```

```pug:slim
sl-dialog(label="Small dialog" class="dialog-small" size="small")
  | This is a small dialog.
  sl-button(slot="footer" variant="primary") Close

sl-button Open small dialog

sl-dialog(label="Large dialog" class="dialog-large" size="large")
  | This is a large dialog.
  sl-button(slot="footer" variant="primary") Close

sl-button Open large dialog

script
  document.addEventListener('DOMContentLoaded', () => {
    const dialogSmall = document.querySelector('.dialog-small');
    const openButtonSmallDialog = document.querySelector('sl-button:nth-of-type(1)');
    const closeButtonSmallDialog = document.querySelector('.dialog-small sl-button[slot="footer"]');

    openButtonSmallDialog.addEventListener('click', () => dialogSmall.show());
    closeButtonSmallDialog.addEventListener('click', () => dialogSmall.hide());

    const dialogLarge = document.querySelector('.dialog-large');
    const openButtonLargeDialog = document.querySelector('sl-button:nth-of-type(2)');
    const closeButtonLargeDialog = document.querySelector('.dialog-large sl-button[slot="footer"]');

    openButtonLargeDialog.addEventListener('click', () => dialogLarge.show());
    closeButtonLargeDialog.addEventListener('click', () => dialogLarge.hide());
  });
```

{% raw %}

```jsx:react
import { useState } from 'react';
import SlButton from '@teamshares/shoelace/dist/react/button';
import SlDialog from '@teamshares/shoelace/dist/react/dialog';

const App = () => {
  const [smallDialogOpen, setSmallDialogOpen] = useState(false);
  const [largeDialogOpen, setLargeDialogOpen] = useState(false);

  return (
    <>
      <sl-dialog label="Small dialog" className="dialog-small" size="small" open={smallDialogOpen}>
        This is a small dialog.
        <SlButton slot="footer" variant="primary" onClick={() => setSmallDialogOpen(false)}>
          Close
        </SlButton>
      </sl-dialog>

      <SlButton onClick={() => setSmallDialogOpen(true)}>Open small dialog</SlButton>

      <sl-dialog label="Large dialog" className="dialog-large" size="large" open={largeDialogOpen}>
        This is a large dialog.
        <SlButton slot="footer" variant="primary" onClick={() => setLargeDialogOpen(false)}>
          Close
        </SlButton>
      </sl-dialog>

      <SlButton onClick={() => setLargeDialogOpen(true)}>Open large dialog</SlButton>
    </>
  );
};
```

{% endraw %}

### Scrolling

By design, a dialog's height will never exceed that of the viewport. As such, dialogs will not scroll with the page ensuring the header and footer are always accessible to the user.

```html:preview
<sl-dialog label="Dialog" class="dialog-scrolling">
  <div style="height: 150vh; border: dashed 2px var(--sl-color-neutral-200); padding: 0 1rem;">
    <p>Scroll down and give it a try! 👇</p>
  </div>
  <sl-button slot="footer" variant="primary">Close</sl-button>
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

```pug:slim
sl-dialog label="Dialog" class="dialog-scrolling"
  div style="height: 150vh; border: dashed 2px var(--sl-color-neutral-200); padding: 0 1rem;"
    p Scroll down and give it a try! 👇
  sl-button slot="footer" variant="primary" Close
sl-button Open Dialog

javascript:
  const dialog = document.querySelector(.dialog-scrolling);
  const openButton = dialog.nextElementSibling;
  const closeButton = dialog.querySelector(sl-button[slot=footer]);

  openButton.addEventListener(click, () => dialog.show());
  closeButton.addEventListener(click, () => dialog.hide());
```

{% raw %}

```jsx:react
import { useState } from 'react';
import SlButton from '@teamshares/shoelace/dist/react/button';
import SlDialog from '@teamshares/shoelace/dist/react/dialog';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SlDialog label="Dialog" open={open} onSlAfterHide={() => setOpen(false)}>
        <div
          style={{
            height: '150vh',
            border: 'dashed 2px var(--sl-color-neutral-200)',
            padding: '0 1rem'
          }}
        >
          <p>Scroll down and give it a try! 👇</p>
        </div>

        <SlButton slot="footer" variant="primary" onClick={() => setOpen(false)}>
          Close
        </SlButton>
      </SlDialog>

      <SlButton onClick={() => setOpen(true)}>Open Dialog</SlButton>
    </>
  );
};
```

{% endraw %}

### Header Actions

The header shows a functional close button by default. You can use the `header-actions` slot to add additional [icon buttons](/components/icon-button) if needed.

```html:preview
<sl-dialog label="Dialog" class="dialog-header-actions">
  <sl-icon-button class="new-window" slot="header-actions" library="fa" name="fal-arrow-up-right-from-square"></sl-icon-button>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  <sl-button slot="footer" variant="primary">Close</sl-button>
</sl-dialog>

<sl-button>Open Dialog</sl-button>

<script>
  const dialog = document.querySelector('.dialog-header-actions');
  const openButton = dialog.nextElementSibling;
  const closeButton = dialog.querySelector('sl-button[slot="footer"]');
  const newWindowButton = dialog.querySelector('.new-window');

  openButton.addEventListener('click', () => dialog.show());
  closeButton.addEventListener('click', () => dialog.hide());
  newWindowButton.addEventListener('click', () => window.open(location.href));
</script>
```

```pug:slim
sl-dialog label="Dialog" class="dialog-header-actions"
  sl-icon-button class="new-window" slot="header-actions" name="arrow-top-right-on-square"
  | Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  sl-button slot="footer" variant="primary" Close
sl-button Open Dialog

javascript:
  const dialog = document.querySelector(.dialog-header-actions);
  const openButton = dialog.nextElementSibling;
  const closeButton = dialog.querySelector(sl-button[slot=footer]);
  const newWindowButton = dialog.querySelector(.new-window);

  openButton.addEventListener(click, () => dialog.show());
  closeButton.addEventListener(click, () => dialog.hide());
  newWindowButton.addEventListener(click, () => window.open(location.href));
```

```jsx:react
import { useState } from 'react';
import SlButton from '@teamshares/shoelace/dist/react/button';
import SlDialog from '@teamshares/shoelace/dist/react/dialog';
import SlIconButton from '@teamshares/shoelace/dist/react/icon-button';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SlDialog label="Dialog" open={open} onSlAfterHide={() => setOpen(false)}>
        <SlIconButton
          class="new-window"
          slot="header-actions"
          name="arrow-top-right-on-square"
          onClick={() => window.open(location.href)}
        />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        <SlButton slot="footer" variant="primary" onClick={() => setOpen(false)}>
          Close
        </SlButton>
      </SlDialog>

      <SlButton onClick={() => setOpen(true)}>Open Dialog</SlButton>
    </>
  );
};
```

### Preventing the Dialog from Closing

By default, dialogs will close when the user clicks the close button, clicks the overlay, or presses the [[Escape]] key. In most cases, the default behavior is the best behavior in terms of UX. However, there are situations where this may be undesirable, such as when data loss will occur.

To keep the dialog open in such cases, you can cancel the `sl-request-close` event. When canceled, the dialog will remain open and pulse briefly to draw the user's attention to it.

You can use `event.detail.source` to determine what triggered the request to close. This example prevents the dialog from closing when the overlay is clicked, but allows the close button or [[Escape]] to dismiss it.

```html:preview
<sl-dialog label="Dialog" class="dialog-deny-close">
  This dialog will not close when you click on the overlay.
  <sl-button slot="footer" variant="primary">Close</sl-button>
</sl-dialog>

<sl-button>Open Dialog</sl-button>

<script>
  const dialog = document.querySelector('.dialog-deny-close');
  const openButton = dialog.nextElementSibling;
  const closeButton = dialog.querySelector('sl-button[slot="footer"]');

  openButton.addEventListener('click', () => dialog.show());
  closeButton.addEventListener('click', () => dialog.hide());

  // Prevent the dialog from closing when the user clicks on the overlay
  dialog.addEventListener('sl-request-close', event => {
    if (event.detail.source === 'overlay') {
      event.preventDefault();
    }
  });
</script>
```

```pug:slim
sl-dialog label="Dialog" class="dialog-deny-close"
  | This dialog will not close when you click on the overlay.
  sl-button slot="footer" variant="primary" Close
sl-button Open Dialog

javascript:
  const dialog = document.querySelector(.dialog-deny-close);
  const openButton = dialog.nextElementSibling;
  const closeButton = dialog.querySelector(sl-button[slot=footer]);

  openButton.addEventListener(click, () => dialog.show());
  closeButton.addEventListener(click, () => dialog.hide());

  // Prevent the dialog from closing when the user clicks on the overlay
  dialog.addEventListener(sl-request-close, event => {
    if (event.detail.source === overlay) {
      event.preventDefault();
    }
  });
```

```jsx:react
import { useState } from 'react';
import SlButton from '@teamshares/shoelace/dist/react/button';
import SlDialog from '@teamshares/shoelace/dist/react/dialog';

const App = () => {
  const [open, setOpen] = useState(false);

  // Prevent the dialog from closing when the user clicks on the overlay
  function handleRequestClose(event) {
    if (event.detail.source === 'overlay') {
      event.preventDefault();
    }
  }

  return (
    <>
      <SlDialog label="Dialog" open={open} onSlRequestClose={handleRequestClose} onSlAfterHide={() => setOpen(false)}>
        This dialog will not close when you click on the overlay.
        <SlButton slot="footer" variant="primary" onClick={() => setOpen(false)}>
          Close
        </SlButton>
      </SlDialog>

      <SlButton onClick={() => setOpen(true)}>Open Dialog</SlButton>
    </>
  );
};
```

### Customizing Initial Focus

By default, the dialog's panel will gain focus when opened. This allows a subsequent tab press to focus on the first tabbable element in the dialog. If you want a different element to have focus, add the `autofocus` attribute to it as shown below.

```html:preview
<sl-dialog label="Dialog" class="dialog-focus">
  <sl-input autofocus placeholder="I will have focus when the dialog is opened"></sl-input>
  <sl-button slot="footer" variant="primary">Close</sl-button>
</sl-dialog>

<sl-button>Open Dialog</sl-button>

<script>
  const dialog = document.querySelector('.dialog-focus');
  const input = dialog.querySelector('sl-input');
  const openButton = dialog.nextElementSibling;
  const closeButton = dialog.querySelector('sl-button[slot="footer"]');

  openButton.addEventListener('click', () => dialog.show());
  closeButton.addEventListener('click', () => dialog.hide());
</script>
```

```pug:slim
sl-dialog label="Dialog" class="dialog-focus"
  sl-input autofocus="true" placeholder="I will have focus when the dialog is opened"
  sl-button slot="footer" variant="primary" Close
sl-button Open Dialog

javascript:
  const dialog = document.querySelector(.dialog-focus);
  const input = dialog.querySelector(sl-input);
  const openButton = dialog.nextElementSibling;
  const closeButton = dialog.querySelector(sl-button[slot=footer]);

  openButton.addEventListener(click, () => dialog.show());
  closeButton.addEventListener(click, () => dialog.hide());
```

```jsx:react
import { useState } from 'react';
import SlButton from '@teamshares/shoelace/dist/react/button';
import SlDialog from '@teamshares/shoelace/dist/react/dialog';
import SlInput from '@teamshares/shoelace/dist/react/input';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SlDialog label="Dialog" open={open} onSlAfterHide={() => setOpen(false)}>
        <SlInput autofocus placeholder="I will have focus when the dialog is opened" />
        <SlButton slot="footer" variant="primary" onClick={() => setOpen(false)}>
          Close
        </SlButton>
      </SlDialog>

      <SlButton onClick={() => setOpen(true)}>Open Dialog</SlButton>
    </>
  );
};
```

:::tip
You can further customize initial focus behavior by canceling the `sl-initial-focus` event and setting focus yourself inside the event handler.
:::
