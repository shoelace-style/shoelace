<!-- cspell:dictionaries lorem-ipsum -->

# Drawer

[component-header:sl-drawer]

Drawers slide in from a container to expose additional options and information.

```html preview
<sl-drawer label="Drawer" class="drawer-overview">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  <sl-button slot="footer" variant="primary">Close</sl-button>
</sl-drawer>

<sl-button>Open Drawer</sl-button>

<script>
  const drawer = document.querySelector('.drawer-overview');
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('sl-button[variant="primary"]');

  openButton.addEventListener('click', () => drawer.show());
  closeButton.addEventListener('click', () => drawer.hide());
</script>
```

```jsx react
import { useState } from 'react';
import { SlButton, SlDrawer } from '@shoelace-style/shoelace/dist/react';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SlDrawer label="Drawer" open={open} onSlAfterHide={() => setOpen(false)}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        <SlButton slot="footer" variant="primary" onClick={() => setOpen(false)}>
          Close
        </SlButton>
      </SlDrawer>

      <SlButton onClick={() => setOpen(true)}>Open Drawer</SlButton>
    </>
  );
};
```

## Examples

### Slide in From Start

By default, drawers slide in from the end. To make the drawer slide in from the start, set the `placement` attribute to `start`.

```html preview
<sl-drawer label="Drawer" placement="start" class="drawer-placement-start">
  This drawer slides in from the start.
  <sl-button slot="footer" variant="primary">Close</sl-button>
</sl-drawer>

<sl-button>Open Drawer</sl-button>

<script>
  const drawer = document.querySelector('.drawer-placement-start');
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('sl-button[variant="primary"]');

  openButton.addEventListener('click', () => drawer.show());
  closeButton.addEventListener('click', () => drawer.hide());
</script>
```

```jsx react
import { useState } from 'react';
import { SlButton, SlDrawer } from '@shoelace-style/shoelace/dist/react';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SlDrawer label="Drawer" placement="start" open={open} onSlAfterHide={() => setOpen(false)}>
        This drawer slides in from the start.
        <SlButton slot="footer" variant="primary" onClick={() => setOpen(false)}>
          Close
        </SlButton>
      </SlDrawer>

      <SlButton onClick={() => setOpen(true)}>Open Drawer</SlButton>
    </>
  );
};
```

### Slide in From Top

To make the drawer slide in from the top, set the `placement` attribute to `top`.

```html preview
<sl-drawer label="Drawer" placement="top" class="drawer-placement-top">
  This drawer slides in from the top.
  <sl-button slot="footer" variant="primary">Close</sl-button>
</sl-drawer>

<sl-button>Open Drawer</sl-button>

<script>
  const drawer = document.querySelector('.drawer-placement-top');
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('sl-button[variant="primary"]');

  openButton.addEventListener('click', () => drawer.show());
  closeButton.addEventListener('click', () => drawer.hide());
</script>
```

```jsx react
import { useState } from 'react';
import { SlButton, SlDrawer } from '@shoelace-style/shoelace/dist/react';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SlDrawer label="Drawer" placement="top" open={open} onSlAfterHide={() => setOpen(false)}>
        This drawer slides in from the top.
        <SlButton slot="footer" variant="primary" onClick={() => setOpen(false)}>
          Close
        </SlButton>
      </SlDrawer>

      <SlButton onClick={() => setOpen(true)}>Open Drawer</SlButton>
    </>
  );
};
```

### Slide in From Bottom

To make the drawer slide in from the bottom, set the `placement` attribute to `bottom`.

```html preview
<sl-drawer label="Drawer" placement="bottom" class="drawer-placement-bottom">
  This drawer slides in from the bottom.
  <sl-button slot="footer" variant="primary">Close</sl-button>
</sl-drawer>

<sl-button>Open Drawer</sl-button>

<script>
  const drawer = document.querySelector('.drawer-placement-bottom');
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('sl-button[variant="primary"]');

  openButton.addEventListener('click', () => drawer.show());
  closeButton.addEventListener('click', () => drawer.hide());
</script>
```

```jsx react
import { useState } from 'react';
import { SlButton, SlDrawer } from '@shoelace-style/shoelace/dist/react';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SlDrawer label="Drawer" placement="bottom" open={open} onSlAfterHide={() => setOpen(false)}>
        This drawer slides in from the bottom.
        <SlButton slot="footer" variant="primary" onClick={() => setOpen(false)}>
          Close
        </SlButton>
      </SlDrawer>

      <SlButton onClick={() => setOpen(true)}>Open Drawer</SlButton>
    </>
  );
};
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
    <sl-button slot="footer" variant="primary">Close</sl-button>
  </sl-drawer>
</div>

<sl-button>Open Drawer</sl-button>

<script>
  const drawer = document.querySelector('.drawer-contained');
  const openButton = drawer.parentElement.nextElementSibling;
  const closeButton = drawer.querySelector('sl-button[variant="primary"]');

  openButton.addEventListener('click', () => drawer.show());
  closeButton.addEventListener('click', () => drawer.hide());
</script>
```

```jsx react
import { useState } from 'react';
import { SlButton, SlDrawer } from '@shoelace-style/shoelace/dist/react';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        style={{
          position: 'relative',
          border: 'solid 2px var(--sl-panel-border-color)',
          height: '300px',
          padding: '1rem',
          marginBottom: '1rem'
        }}
      >
        The drawer will be contained to this box. This content won't shift or be affected in any way when the drawer
        opens.
        <SlDrawer label="Drawer" contained open={open} onSlAfterHide={() => setOpen(false)} style={{ '--size': '50%' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          <SlButton slot="footer" variant="primary" onClick={() => setOpen(false)}>
            Close
          </SlButton>
        </SlDrawer>
      </div>

      <SlButton onClick={() => setOpen(true)}>Open Drawer</SlButton>
    </>
  );
};
```

### Custom Size

Use the `--size` custom property to set the drawer's size. This will be applied to the drawer's width or height depending on its `placement`.

```html preview
<sl-drawer label="Drawer" class="drawer-custom-size" style="--size: 50vw;">
  This drawer is always 50% of the viewport.
  <sl-button slot="footer" variant="primary">Close</sl-button>
</sl-drawer>

<sl-button>Open Drawer</sl-button>

<script>
  const drawer = document.querySelector('.drawer-custom-size');
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('sl-button[variant="primary"]');

  openButton.addEventListener('click', () => drawer.show());
  closeButton.addEventListener('click', () => drawer.hide());
</script>
```

```jsx react
import { useState } from 'react';
import { SlButton, SlDrawer } from '@shoelace-style/shoelace/dist/react';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SlDrawer label="Drawer" open={open} onSlAfterHide={() => setOpen(false)} style={{ '--size': '50vw' }}>
        This drawer is always 50% of the viewport.
        <SlButton slot="footer" variant="primary" onClick={() => setOpen(false)}>
          Close
        </SlButton>
      </SlDrawer>

      <SlButton onClick={() => setOpen(true)}>Open Drawer</SlButton>
    </>
  );
};
```

### Scrolling

By design, a drawer's height will never exceed 100% of its container. As such, drawers will not scroll with the page to ensure the header and footer are always accessible to the user.

```html preview
<sl-drawer label="Drawer" class="drawer-scrolling">
  <div style="height: 150vh; border: dashed 2px var(--sl-color-neutral-200); padding: 0 1rem;">
    <p>Scroll down and give it a try! 👇</p>
  </div>
  <sl-button slot="footer" variant="primary">Close</sl-button>
</sl-drawer>

<sl-button>Open Drawer</sl-button>

<script>
  const drawer = document.querySelector('.drawer-scrolling');
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('sl-button[variant="primary"]');

  openButton.addEventListener('click', () => drawer.show());
  closeButton.addEventListener('click', () => drawer.hide());
</script>
```

```jsx react
import { useState } from 'react';
import { SlButton, SlDrawer } from '@shoelace-style/shoelace/dist/react';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SlDrawer label="Drawer" open={open} onSlAfterHide={() => setOpen(false)}>
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
      </SlDrawer>

      <SlButton onClick={() => setOpen(true)}>Open Drawer</SlButton>
    </>
  );
};
```

### Preventing the Drawer from Closing

By default, drawers will close when the user clicks the close button, clicks the overlay, or presses the <kbd>Escape</kbd> key. In most cases, the default behavior is the best behavior in terms of UX. However, there are situations where this may be undesirable, such as when data loss will occur.

To keep the drawer open in such cases, you can cancel the `sl-request-close` event. When canceled, the drawer will remain open and pulse briefly to draw the user's attention to it.

```html preview
<sl-drawer label="Drawer" class="drawer-deny-close">
  This drawer will not close unless you use the button below.
  <sl-button slot="footer" variant="primary">Save &amp; Close</sl-button>
</sl-drawer>

<sl-button>Open Drawer</sl-button>

<script>
  const drawer = document.querySelector('.drawer-deny-close');
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('sl-button[variant="primary"]');

  openButton.addEventListener('click', () => drawer.show());
  closeButton.addEventListener('click', () => drawer.hide());

  drawer.addEventListener('sl-request-close', event => event.preventDefault());
</script>
```

```jsx react
import { useState } from 'react';
import { SlButton, SlDrawer } from '@shoelace-style/shoelace/dist/react';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SlDrawer
        label="Drawer"
        open={open}
        onSlRequestClose={event => event.preventDefault()}
        onSlAfterHide={() => setOpen(false)}
      >
        This drawer will not close unless you use the button below.
        <SlButton slot="footer" variant="primary" onClick={() => setOpen(false)}>
          Save &amp; Close
        </SlButton>
      </SlDrawer>

      <SlButton onClick={() => setOpen(true)}>Open Drawer</SlButton>
    </>
  );
};
```

### Customizing Initial Focus

By default, the drawer's panel will gain focus when opened. This allows the first tab press to focus on the first tabbable element within the drawer. To set focus on a different element, listen for and cancel the `sl-initial-focus` event.

```html preview
<sl-drawer label="Drawer" class="drawer-focus">
  <sl-input placeholder="I will have focus when the drawer is opened"></sl-input>
  <sl-button slot="footer" variant="primary">Close</sl-button>
</sl-drawer>

<sl-button>Open Drawer</sl-button>

<script>
  const drawer = document.querySelector('.drawer-focus');
  const input = drawer.querySelector('sl-input');
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('sl-button[variant="primary"]');

  openButton.addEventListener('click', () => drawer.show());
  closeButton.addEventListener('click', () => drawer.hide());

  drawer.addEventListener('sl-initial-focus', event => {
    event.preventDefault();
    input.focus({ preventScroll: true });
  });
</script>
```

```jsx react
import { useRef, useState } from 'react';
import { SlButton, SlDrawer, SlInput } from '@shoelace-style/shoelace/dist/react';

const App = () => {
  const input = useRef(null);
  const [open, setOpen] = useState(false);

  function handleInitialFocus(event) {
    event.preventDefault();
    input.current.focus();
  }

  return (
    <>
      <SlDrawer label="Drawer" open={open} onSlInitialFocus={handleInitialFocus} onSlAfterHide={() => setOpen(false)}>
        <SlInput ref={input} placeholder="I will have focus when the drawer is opened" />
        <SlButton slot="footer" variant="primary" onClick={() => setOpen(false)}>
          Close
        </SlButton>
      </SlDrawer>

      <SlButton onClick={() => setOpen(true)}>Open Drawer</SlButton>
    </>
  );
};
```

[component-metadata:sl-drawer]
