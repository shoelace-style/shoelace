---
meta:
  title: Drawer
  description: Drawers slide in from a container to expose additional options and information.
layout: component
---

## Examples

### Basic Drawer

```html:preview
<sl-drawer label="Drawer" class="drawer-overview">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  <sl-button id="cancel" slot="footer" variant="default">Cancel</sl-button>
  <sl-button id="save" slot="footer" variant="primary">Save</sl-button>
</sl-drawer>

<sl-button>Open drawer</sl-button>

<script>
  const drawer = document.querySelector('.drawer-overview');
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('sl-button#cancel');
  const saveButton = drawer.querySelector('sl-button#save');

  openButton.addEventListener('click', () => drawer.show());
  closeButton.addEventListener('click', () => drawer.hide());
  saveButton.addEventListener('click', () => drawer.hide());

</script>
```

```pug:slim
sl-drawer.drawer-overview label="Drawer" class="drawer-overview"
  | Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  sl-button id="cancel" slot="footer" variant="default" Cancel
  sl-button id="save" slot="footer" variant="primary" Save
sl-button Open drawer

javascript:
  const drawer = document.querySelector('.drawer-overview');
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('sl-button#cancel');
  const saveButton = drawer.querySelector('sl-button#save');

  openButton.addEventListener(click, () => drawer.show());
  closeButton.addEventListener(click, () => drawer.hide());
  saveButton.addEventListener(click, () => drawer.hide());
```

```jsx:react
import { useState } from 'react';
import SlButton from '@teamshares/shoelace/dist/react/button';
import SlDrawer from '@teamshares/shoelace/dist/react/drawer';

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

      <SlButton onClick={() => setOpen(true)}>Open drawer</SlButton>
    </>
  );
};
```

<!-- ### Slide in From Start

By default, drawers slide in from the end. To make the drawer slide in from the start, set the `placement` attribute to `start`.

```html:preview
<sl-drawer label="Drawer" placement="start" class="drawer-placement-start">
  This drawer slides in from the start.
  <sl-button slot="footer" variant="primary">Close</sl-button>
</sl-drawer>

<sl-button>Open drawer</sl-button>

<script>
  const drawer = document.querySelector('.drawer-placement-start');
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('sl-button[variant="primary"]');

  openButton.addEventListener('click', () => drawer.show());
  closeButton.addEventListener('click', () => drawer.hide());
</script>
```

```pug:slim
sl-drawer.drawer-placement-start label="Drawer" placement="start"
  | This drawer slides in from the start.
  sl-button slot="footer" variant="primary" Close
sl-button Open drawer

javascript:
  const drawer = document.querySelector(.drawer-placement-start);
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector(sl-button[variant=primary]);

  openButton.addEventListener(click, () => drawer.show());
  closeButton.addEventListener(click, () => drawer.hide());
```

```jsx:react
import { useState } from 'react';
import SlButton from '@teamshares/shoelace/dist/react/button';
import SlDrawer from '@teamshares/shoelace/dist/react/drawer';

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

      <SlButton onClick={() => setOpen(true)}>Open drawer</SlButton>
    </>
  );
};
```

### Slide in From Top

To make the drawer slide in from the top, set the `placement` attribute to `top`.

```html:preview
<sl-drawer label="Drawer" placement="top" class="drawer-placement-top">
  This drawer slides in from the top.
  <sl-button slot="footer" variant="primary">Close</sl-button>
</sl-drawer>

<sl-button>Open drawer</sl-button>

<script>
  const drawer = document.querySelector('.drawer-placement-top');
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('sl-button[variant="primary"]');

  openButton.addEventListener('click', () => drawer.show());
  closeButton.addEventListener('click', () => drawer.hide());
</script>
```

```pug:slim
sl-drawer.drawer-placement-top label="Drawer" placement="top"
  | This drawer slides in from the top.
  sl-button slot="footer" variant="primary" Close
sl-button Open drawer

javascript:
  const drawer = document.querySelector(.drawer-placement-top);
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector(sl-button[variant=primary]);

  openButton.addEventListener(click, () => drawer.show());
  closeButton.addEventListener(click, () => drawer.hide());
```

```jsx:react
import { useState } from 'react';
import SlButton from '@teamshares/shoelace/dist/react/button';
import SlDrawer from '@teamshares/shoelace/dist/react/drawer';

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

      <SlButton onClick={() => setOpen(true)}>Open drawer</SlButton>
    </>
  );
};
```

### Slide in From Bottom

To make the drawer slide in from the bottom, set the `placement` attribute to `bottom`.

```html:preview
<sl-drawer label="Drawer" placement="bottom" class="drawer-placement-bottom">
  This drawer slides in from the bottom.
  <sl-button slot="footer" variant="primary">Close</sl-button>
</sl-drawer>

<sl-button>Open drawer</sl-button>

<script>
  const drawer = document.querySelector('.drawer-placement-bottom');
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('sl-button[variant="primary"]');

  openButton.addEventListener('click', () => drawer.show());
  closeButton.addEventListener('click', () => drawer.hide());
</script>
```

```pug:slim
sl-drawer.drawer-placement-bottom label="Drawer" placement="bottom"
  | This drawer slides in from the bottom.
  sl-button slot="footer" variant="primary" Close
sl-button Open drawer

javascript:
  const drawer = document.querySelector(.drawer-placement-bottom);
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector(sl-button[variant=primary]);

  openButton.addEventListener(click, () => drawer.show());
  closeButton.addEventListener(click, () => drawer.hide());
```

```jsx:react
import { useState } from 'react';
import SlButton from '@teamshares/shoelace/dist/react/button';
import SlDrawer from '@teamshares/shoelace/dist/react/drawer';

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

      <SlButton onClick={() => setOpen(true)}>Open drawer</SlButton>
    </>
  );
};
``` -->

### Using with UI Drawer Component and Stimulus

To open a [UI::Drawer::Component](https://os.teamshares.com/teamshares/lookbook/inspect/ui/drawer/default) (which wraps the `sl-drawer`):

```pug:slim
 div id="my-drawer-id"
    = render UI::Drawer::Component.new(title: "My drawer title") do |d|
      - d.with_trigger
        sl-button Open my drawer
```

Add `slot="footer"` to buttons to take advantage of the drawer's built-in placement for footer buttons.

Use the following Stimulus `data-action` attributes to close the drawer and also submit Simple Form/ts_form_for forms in the body of the drawer:

```pug:slim
 sl-button[
  slot="footer"
  type="button"
  data-action="click->components--ui--drawer#closeDrawer"
 ] Cancel
 sl-button[
  slot="footer"
  variant="primary"
  type="button"
  data-action="click->components--ui--drawer#submitForm"
 ] Submit
```

### Opening from Dropdown Menu

When opening a drawer from a `sl-dropdown` menu item triggered by a `sl-button`, wrap the button in a `div` and add `slot="trigger"` to the `div` rather than the button to prevent the drawer from skipping when opening.

```html:preview
<sl-drawer label="Drawer" class="drawer-dropdown">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  <sl-button slot="footer" variant="primary">Close</sl-button>
</sl-drawer>

<sl-dropdown>
  <div slot="trigger"><sl-button caret>Dropdown</sl-button></div>
  <sl-menu>
    <sl-menu-item class="open-link">Open drawer</sl-menu-item>
  </sl-menu>
</sl-dropdown>

<script>
  const drawer = document.querySelector('.drawer-dropdown');
  const openButton = document.querySelector('.open-link');
  const closeButton = drawer.querySelector('sl-button[variant="primary"]');

  openButton.addEventListener('click', (event) => drawer.show());
  closeButton.addEventListener('click', () => drawer.hide());

</script>
```

```pug:slim
sl-drawer.drawer-dropdown label="Drawer"
  | Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  sl-button slot="footer" variant="primary" Close

sl-dropdown
  div slot="trigger"
    sl-button caret=true Dropdown
    sl-menu
      sl-menu-item.open-link Open drawer

javascript:
  const drawer = document.querySelector(.drawer-dropdown);
  const openButton = drawer.querySelector(.open-link);
  const closeButton = drawer.querySelector(sl-button[variant=primary]);

  openButton.addEventListener(click, () => drawer.show());
  closeButton.addEventListener(click, () => drawer.hide());
```

```jsx:react
import { useState } from 'react';
import SlButton from '@teamshares/shoelace/dist/react/button';
import SlDrawer from '@teamshares/shoelace/dist/react/drawer';

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

      <SlButton onClick={() => setOpen(true)}>Open drawer</SlButton>
    </>
  );
};
```

### Custom Size

Use the `--size` custom property to set the drawer's size. This will be applied to the drawer's width or height depending on its `placement`.

```html:preview
<sl-drawer label="Drawer" class="drawer-custom-size" style="--size: 50vw;">
  This drawer is always 50% of the viewport.
  <sl-button slot="footer" variant="primary">Close</sl-button>
</sl-drawer>

<sl-button>Open drawer</sl-button>

<script>
  const drawer = document.querySelector('.drawer-custom-size');
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('sl-button[variant="primary"]');

  openButton.addEventListener('click', () => drawer.show());
  closeButton.addEventListener('click', () => drawer.hide());
</script>
```

```pug:slim
sl-drawer.drawer-custom-size label="Drawer" style="--size: 50vw;"
  | This drawer is always 50% of the viewport.
  sl-button slot="footer" variant="primary" Close
sl-button Open drawer

javascript:
  const drawer = document.querySelector(.drawer-custom-size);
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector(sl-button[variant=primary]);

  openButton.addEventListener(click, () => drawer.show());
  closeButton.addEventListener(click, () => drawer.hide());
```

{% raw %}

```jsx:react
import { useState } from 'react';
import SlButton from '@teamshares/shoelace/dist/react/button';
import SlDrawer from '@teamshares/shoelace/dist/react/drawer';

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

      <SlButton onClick={() => setOpen(true)}>Open drawer</SlButton>
    </>
  );
};
```

{% endraw %}

### Scrolling

By design, a drawer's height will never exceed 100% of its container. As such, drawers will not scroll with the page to ensure the header and footer are always accessible to the user.

```html:preview
<sl-drawer label="Drawer" class="drawer-scrolling">
  <div style="height: 150vh; border: dashed 2px var(--sl-color-neutral-200); padding: 0 1rem;">
    <p>Scroll down and give it a try! 👇</p>
  </div>
  <sl-button slot="footer" variant="primary">Close</sl-button>
</sl-drawer>

<sl-button>Open drawer</sl-button>

<script>
  const drawer = document.querySelector('.drawer-scrolling');
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('sl-button[variant="primary"]');

  openButton.addEventListener('click', () => drawer.show());
  closeButton.addEventListener('click', () => drawer.hide());
</script>
```

```pug:slim
sl-drawer.drawer-scrolling label="Drawer"
  div style="height: 150vh; border: dashed 2px var(--sl-color-neutral-200); padding: 0 1rem;"
    p Scroll down and give it a try! 👇
  sl-button slot="footer" variant="primary" Close
sl-button Open drawer

javascript:
  const drawer = document.querySelector(.drawer-scrolling);
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector(sl-button[variant=primary]);

  openButton.addEventListener(click, () => drawer.show());
  closeButton.addEventListener(click, () => drawer.hide());
```

{% raw %}

```jsx:react
import { useState } from 'react';
import SlButton from '@teamshares/shoelace/dist/react/button';
import SlDrawer from '@teamshares/shoelace/dist/react/drawer';

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

      <SlButton onClick={() => setOpen(true)}>Open drawer</SlButton>
    </>
  );
};
```

{% endraw %}

### Header Actions

The header shows a functional close button by default. You can use the `header-actions` slot to add additional [icon buttons](/components/icon-button) if needed.

```html:preview
<sl-drawer label="Drawer" class="drawer-header-actions">
  <sl-icon-button class="new-window" slot="header-actions" name="arrow-top-right-on-square"></sl-icon-button>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  <sl-button slot="footer" variant="primary">Close</sl-button>
</sl-drawer>

<sl-button>Open drawer</sl-button>

<script>
  const drawer = document.querySelector('.drawer-header-actions');
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('sl-button[variant="primary"]');
  const newWindowButton = drawer.querySelector('.new-window');

  openButton.addEventListener('click', () => drawer.show());
  closeButton.addEventListener('click', () => drawer.hide());
  newWindowButton.addEventListener('click', () => window.open(location.href));
</script>
```

```pug:slim
sl-drawer.drawer-header-actions label="Drawer"
  sl-icon-button.new-window slot="header-actions" name="arrow-top-right-on-square"
  | Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  sl-button slot="footer" variant="primary" Close
sl-button Open drawer

javascript:
  const drawer = document.querySelector(.drawer-header-actions);
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector(sl-button[variant=primary]);
  const newWindowButton = drawer.querySelector(.new-window);

  openButton.addEventListener(click, () => drawer.show());
  closeButton.addEventListener(click, () => drawer.hide());
  newWindowButton.addEventListener(click, () => window.open(location.href));
```

```jsx:react
import { useState } from 'react';
import SlButton from '@teamshares/shoelace/dist/react/button';
import SlDrawer from '@teamshares/shoelace/dist/react/drawer';
import SlIconButton from '@teamshares/shoelace/dist/react/icon-button';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SlDrawer label="Drawer" open={open} onSlAfterHide={() => setOpen(false)}>
        <SlIconButton
          slot="header-actions"
          name="arrow-top-right-on-square"
          onClick={() => window.open(location.href)}
        />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        <SlButton slot="footer" variant="primary" onClick={() => setOpen(false)}>
          Close
        </SlButton>
      </SlDrawer>

      <SlButton onClick={() => setOpen(true)}>Open drawer</SlButton>
    </>
  );
};
```

### Preventing the Drawer from Closing

By default, drawers will close when the user clicks the close button, clicks the overlay, or presses the [[Escape]] key. In most cases, the default behavior is the best behavior in terms of UX. However, there are situations where this may be undesirable, such as when data loss will occur.

To keep the drawer open in such cases, you can cancel the `sl-request-close` event. When canceled, the drawer will remain open and pulse briefly to draw the user's attention to it.

You can use `event.detail.source` to determine what triggered the request to close. This example prevents the drawer from closing when the overlay is clicked, but allows the close button or [[Escape]] to dismiss it.

```html:preview
<sl-drawer label="Drawer" class="drawer-deny-close">
  This drawer will not close when you click on the overlay.
  <sl-button slot="footer" variant="primary">Close</sl-button>
</sl-drawer>

<sl-button>Open drawer</sl-button>

<script>
  const drawer = document.querySelector('.drawer-deny-close');
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('sl-button[variant="primary"]');

  openButton.addEventListener('click', () => drawer.show());
  closeButton.addEventListener('click', () => drawer.hide());

  // Prevent the drawer from closing when the user clicks on the overlay
  drawer.addEventListener('sl-request-close', event => {
    if (event.detail.source === 'overlay') {
      event.preventDefault();
    }
  });
</script>
```

```pug:slim
sl-drawer.drawer-deny-close label="Drawer"
  | This drawer will not close when you click on the overlay.
  sl-button slot="footer" variant="primary" Close
sl-button Open drawer

javascript:
  const drawer = document.querySelector(.drawer-deny-close);
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector(sl-button[variant=primary]);

  openButton.addEventListener(click, () => drawer.show());
  closeButton.addEventListener(click, () => drawer.hide());

  // Prevent the drawer from closing when the user clicks on the overlay
  drawer.addEventListener(sl-request-close, event => {
  if (event.detail.source === overlay) {
  event.preventDefault();
  }
  });
```

```jsx:react
import { useState } from 'react';
import SlButton from '@teamshares/shoelace/dist/react/button';
import SlDrawer from '@teamshares/shoelace/dist/react/drawer';

const App = () => {
  const [open, setOpen] = useState(false);

  // Prevent the drawer from closing when the user clicks on the overlay
  function handleRequestClose(event) {
    if (event.detail.source === 'overlay') {
      event.preventDefault();
    }
  }

  return (
    <>
      <SlDrawer label="Drawer" open={open} onSlRequestClose={handleRequestClose} onSlAfterHide={() => setOpen(false)}>
        This drawer will not close when you click on the overlay.
        <SlButton slot="footer" variant="primary" onClick={() => setOpen(false)}>
          Save &amp; Close
        </SlButton>
      </SlDrawer>

      <SlButton onClick={() => setOpen(true)}>Open drawer</SlButton>
    </>
  );
};
```

### Customizing Initial Focus

By default, the drawer's panel will gain focus when opened. This allows a subsequent tab press to focus on the first tabbable element in the drawer. If you want a different element to have focus, add the `autofocus` attribute to it as shown below.

```html:preview
<sl-drawer label="Drawer" class="drawer-focus">
  <sl-input autofocus placeholder="I will have focus when the drawer is opened"></sl-input>
  <sl-button slot="footer" variant="primary">Close</sl-button>
</sl-drawer>

<sl-button>Open drawer</sl-button>

<script>
  const drawer = document.querySelector('.drawer-focus');
  const input = drawer.querySelector('sl-input');
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('sl-button[variant="primary"]');

  openButton.addEventListener('click', () => drawer.show());
  closeButton.addEventListener('click', () => drawer.hide());
</script>
```

```pug:slim
sl-drawer.drawer-focus label="Drawer"
  sl-input autofocus=true placeholder="I will have focus when the drawer is opened"
  sl-button slot="footer" variant="primary" Close
sl-button Open drawer

javascript:
  const drawer = document.querySelector(.drawer-focus);
  const input = drawer.querySelector(sl-input);
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector(sl-button[variant=primary]);

  openButton.addEventListener(click, () => drawer.show());
  closeButton.addEventListener(click, () => drawer.hide());
```

```jsx:react
import { useState } from 'react';
import SlButton from '@teamshares/shoelace/dist/react/button';
import SlDrawer from '@teamshares/shoelace/dist/react/drawer';
import SlInput from '@teamshares/shoelace/dist/react/input';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SlDrawer label="Drawer" open={open} onSlAfterHide={() => setOpen(false)}>
        <SlInput autofocus placeholder="I will have focus when the drawer is opened" />
        <SlButton slot="footer" variant="primary" onClick={() => setOpen(false)}>
          Close
        </SlButton>
      </SlDrawer>

      <SlButton onClick={() => setOpen(true)}>Open drawer</SlButton>
    </>
  );
};
```

:::tip
You can further customize initial focus behavior by canceling the `sl-initial-focus` event and setting focus yourself inside the event handler.
:::

### Contained to an Element

By default, drawers slide out of their [containing block](https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#Identifying_the_containing_block), which is usually the viewport. To make a drawer slide out of a parent element, add the `contained` attribute to the drawer and apply `position: relative` to its parent.

Unlike normal drawers, contained drawers are not modal. This means they do not show an overlay, they do not trap focus, and they are not dismissible with [[Escape]]. This is intentional to allow users to interact with elements outside of the drawer.

```html:preview
<div
  style="position: relative; border: solid 2px var(--sl-panel-border-color); height: 300px; padding: 1rem; margin-bottom: 1rem;"
>
  The drawer will be contained to this box. This content won't shift or be affected in any way when the drawer opens.

  <sl-drawer label="Drawer" contained class="drawer-contained" style="--size: 50%;">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    <sl-button slot="footer" variant="primary">Close</sl-button>
  </sl-drawer>
</div>

<sl-button>Toggle Drawer</sl-button>

<script>
  const drawer = document.querySelector('.drawer-contained');
  const openButton = drawer.parentElement.nextElementSibling;
  const closeButton = drawer.querySelector('sl-button[variant="primary"]');

  openButton.addEventListener('click', () => (drawer.open = !drawer.open));
  closeButton.addEventListener('click', () => drawer.hide());
</script>
```

```pug:slim
div style="position: relative; border: solid 2px var(--sl-panel-border-color); height: 300px; padding: 1rem; margin-bottom: 1rem;"
  | The drawer will be contained to this box. This content won't shift or be affected in any way when the drawer opens.
  sl-drawer.drawer-contained label="Drawer" contained=true style="--size: 50%;"
    | Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    sl-button slot="footer" variant="primary"
      | Close
sl-button
  | Toggle Drawer

javascript:
  const drawer = document.querySelector('.drawer-contained');
  const openButton = drawer.parentElement.nextElementSibling;
  const closeButton = drawer.querySelector('sl-button[variant="primary"]');

  openButton.addEventListener('click', () => (drawer.open = !drawer.open));
  closeButton.addEventListener('click', () => drawer.hide());
```

{% raw %}

```jsx:react
import { useState } from 'react';
import SlButton from '@teamshares/shoelace/dist/react/button';
import SlDrawer from '@teamshares/shoelace/dist/react/drawer';

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
        <SlDrawer
          label="Drawer"
          contained
          no-modal
          open={open}
          onSlAfterHide={() => setOpen(false)}
          style={{ '--size': '50%' }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          <SlButton slot="footer" variant="primary" onClick={() => setOpen(false)}>
            Close
          </SlButton>
        </SlDrawer>
      </div>

      <SlButton onClick={() => setOpen(true)}>Open drawer</SlButton>
    </>
  );
};
```

{% endraw %}
