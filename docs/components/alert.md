# Alert

[component-header:sl-alert]

Alerts are used to display important messages inline or as toast notifications.

```html preview
<sl-alert open>
  <sl-icon slot="icon" name="info-circle"></sl-icon>
  This is a standard alert. You can customize its content and even the icon.
</sl-alert>
```

```jsx react
import { SlAlert, SlIcon } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlAlert open>
    <SlIcon slot="icon" name="info-circle" />
    This is a standard alert. You can customize its content and even the icon.
  </SlAlert>
);
```

?> Alerts will not be visible if the `open` attribute is not present.

## Examples

### Variants

Set the `variant` attribute to change the alert's variant.

```html preview
<sl-alert variant="primary" open>
  <sl-icon slot="icon" name="info-circle"></sl-icon>
  <strong>This is super informative</strong><br>
  You can tell by how pretty the alert is.
</sl-alert>

<br>

<sl-alert variant="success" open>
  <sl-icon slot="icon" name="check2-circle"></sl-icon>
  <strong>Your changes have been saved</strong><br>
  You can safely exit the app now.
</sl-alert>

<br>

<sl-alert variant="neutral" open>
  <sl-icon slot="icon" name="gear"></sl-icon>
  <strong>Your settings have been updated</strong><br>
  Settings will take affect on next login.
</sl-alert>

<br>

<sl-alert variant="warning" open>
  <sl-icon slot="icon" name="exclamation-triangle"></sl-icon>
  <strong>Your session has ended</strong><br>
  Please login again to continue.
</sl-alert>

<br>

<sl-alert variant="danger" open>
  <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
    <strong>Your account has been deleted</strong><br>
    We're very sorry to see you go!
</sl-alert>
```

```jsx react
import { SlAlert, SlIcon } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    <SlAlert variant="primary" open>
      <SlIcon slot="icon" name="info-circle" />
      <strong>This is super informative</strong><br />
      You can tell by how pretty the alert is.
    </SlAlert>

    <br />

    <SlAlert variant="success" open>
      <SlIcon slot="icon" name="check2-circle" />
      <strong>Your changes have been saved</strong><br />
      You can safely exit the app now.
    </SlAlert>

    <br />

    <SlAlert variant="neutral" open>
      <SlIcon slot="icon" name="gear" />
      <strong>Your settings have been updated</strong><br />
      Settings will take affect on next login.
    </SlAlert>

    <br />

    <SlAlert variant="warning" open>
      <SlIcon slot="icon" name="exclamation-triangle" />
      <strong>Your session has ended</strong><br />
      Please login again to continue.
    </SlAlert>

    <br />

    <SlAlert variant="danger" open>
      <SlIcon slot="icon" name="exclamation-octagon" />
        <strong>Your account has been deleted</strong><br />
        We're very sorry to see you go!
    </SlAlert>
  </>
);
```

### Closable

Add the `closable` attribute to show a close button that will hide the alert.

```html preview
<sl-alert variant="primary" open closable class="alert-closable">
  <sl-icon slot="icon" name="info-circle"></sl-icon>
  You can close this alert any time!
</sl-alert>

<script>
  const alert = document.querySelector('.alert-closable');
  alert.addEventListener('sl-after-hide', () => {
    setTimeout(() => alert.open = true, 2000);
  });
</script>
```

```jsx react
import { useState } from 'react';
import { SlAlert, SlIcon } from '@shoelace-style/shoelace/dist/react';

const App = () => {
  const [open, setOpen] = useState(true);

  function handleHide() {
    setOpen(false);
    setTimeout(() => setOpen(true), 2000);
  }

  return (
    <SlAlert 
      open={open}
      closable
      onSlAfterHide={handleHide}
    >
      <SlIcon slot="icon" name="info-circle" />
      You can close this alert any time!
    </SlAlert>
  );
};
```

### Without Icons

Icons are optional. Simply omit the `icon` slot if you don't want them.

```html preview
<sl-alert variant="primary" open>
  Nothing fancy here, just a simple alert.
</sl-alert>
```

```jsx react
import { SlAlert } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlAlert variant="primary" open>
    Nothing fancy here, just a simple alert.
  </SlAlert>
);
```

### Duration

Set the `duration` attribute to automatically hide an alert after a period of time. This is useful for alerts that don't require acknowledgement.

```html preview
<div class="alert-duration">
  <sl-button variant="primary">Show Alert</sl-button>

  <sl-alert variant="primary" duration="3000" closable>
    <sl-icon slot="icon" name="info-circle"></sl-icon>
    This alert will automatically hide itself after three seconds, unless you interact with it.
  </sl-alert>
</div>

<script>
  const container = document.querySelector('.alert-duration');
  const button = container.querySelector('sl-button');
  const alert = container.querySelector('sl-alert');

  button.addEventListener('click', () => alert.show());
</script>

<style>
  .alert-duration sl-alert {
    margin-top: var(--sl-spacing-medium);
  }
</style>
```

```jsx react
import { useState } from 'react';
import {
  SlAlert,
  SlButton,
  SlIcon
} from '@shoelace-style/shoelace/dist/react';

const css = `
  .alert-duration sl-alert {
    margin-top: var(--sl-spacing-medium);
  }
`;

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="alert-duration">
        <SlButton variant="primary" onClick={() => setOpen(true)}>Show Alert</SlButton>

        <SlAlert 
          variant="primary" 
          duration="3000" 
          open={open} 
          closable 
          onSlAfterHide={() => setOpen(false)}
        >
          <SlIcon slot="icon" name="info-circle" />
          This alert will automatically hide itself after three seconds, unless you interact with it.
        </SlAlert>
      </div>

      <style>{css}</style>
    </>
  );
};
```

### Toast Notifications

To display an alert as a toast notification, or "toast", create the alert and call its `toast()` method. This will move the alert out of its position in the DOM and into [the toast stack](#the-toast-stack) where it will be shown. Once dismissed, it will be removed from the DOM completely. To reuse a toast, store a reference to it and call `toast()` again later on.

You should always use the `closable` attribute so users can dismiss the notification. It's also common to set a reasonable `duration` when the notification doesn't require acknowledgement.

```html preview
<div class="alert-toast">
  <sl-button variant="primary">Primary</sl-button>
  <sl-button variant="success">Success</sl-button>
  <sl-button variant="neutral">Neutral</sl-button>
  <sl-button variant="warning">Warning</sl-button>
  <sl-button variant="danger">Danger</sl-button>
  
  <sl-alert variant="primary" duration="3000" closable>
    <sl-icon slot="icon" name="info-circle"></sl-icon>
    <strong>This is super informative</strong><br>
    You can tell by how pretty the alert is.
  </sl-alert>

  <sl-alert variant="success" duration="3000" closable>
    <sl-icon slot="icon" name="check2-circle"></sl-icon>
    <strong>Your changes have been saved</strong><br>
    You can safely exit the app now.
  </sl-alert>

  <sl-alert variant="neutral" duration="3000" closable>
    <sl-icon slot="icon" name="gear"></sl-icon>
    <strong>Your settings have been updated</strong><br>
    Settings will take affect on next login.
  </sl-alert>

  <sl-alert variant="warning" duration="3000" closable>
    <sl-icon slot="icon" name="exclamation-triangle"></sl-icon>
    <strong>Your session has ended</strong><br>
    Please login again to continue.
  </sl-alert>

  <sl-alert variant="danger" duration="3000" closable>
    <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
    <strong>Your account has been deleted</strong><br>
    We're very sorry to see you go!
  </sl-alert>
</div>

<script>
  const container = document.querySelector('.alert-toast');

  ['primary', 'success', 'neutral', 'warning', 'danger'].map(variant => {
    const button = container.querySelector(`sl-button[variant="${variant}"]`);
    const alert = container.querySelector(`sl-alert[variant="${variant}"]`);

    button.addEventListener('click', () => alert.toast());
  });
</script>
```

```jsx react
import { useRef } from 'react';
import {
  SlAlert,
  SlButton,
  SlIcon
} from '@shoelace-style/shoelace/dist/react';

function showToast(alert) {
  alert.toast();
}

const App = () => {
  const primary = useRef(null);
  const success = useRef(null);
  const neutral = useRef(null);
  const warning = useRef(null);
  const danger = useRef(null);

  return (
    <>
      <SlButton variant="primary" onClick={() => primary.current.toast()}>
        Primary
      </SlButton>

      <SlButton variant="success" onClick={() => success.current.toast()}>
        Success
      </SlButton>

      <SlButton variant="neutral" onClick={() => neutral.current.toast()}>
        Neutral
      </SlButton>

      <SlButton variant="warning" onClick={() => warning.current.toast()}>
        Warning
      </SlButton>

      <SlButton variant="danger" onClick={() => danger.current.toast()}>
        Danger
      </SlButton>

      <SlAlert ref={primary} variant="primary" duration="3000" closable>
        <SlIcon slot="icon" name="info-circle" />
        <strong>This is super informative</strong><br />
        You can tell by how pretty the alert is.
      </SlAlert>

      <SlAlert ref={success} variant="success" duration="3000" closable>
        <SlIcon slot="icon" name="check2-circle" />
        <strong>Your changes have been saved</strong><br />
        You can safely exit the app now.
      </SlAlert>

      <SlAlert ref={neutral} variant="neutral" duration="3000" closable>
        <SlIcon slot="icon" name="gear" />
        <strong>Your settings have been updated</strong><br />
        Settings will take affect on next login.
      </SlAlert>

      <SlAlert ref={warning} variant="warning" duration="3000" closable>
        <SlIcon slot="icon" name="exclamation-triangle" />
        <strong>Your session has ended</strong><br />
        Please login again to continue.
      </SlAlert>

      <SlAlert ref={danger} variant="danger" duration="3000" closable>
        <SlIcon slot="icon" name="exclamation-octagon" />
        <strong>Your account has been deleted</strong><br />
        We're very sorry to see you go!
      </SlAlert>
    </>
  );
};
```

### Creating Toasts Imperatively

For convenience, you can create a utility that emits toast notifications with a function call rather than composing them in your HTML. To do this, generate the alert with JavaScript, append it to the body, and call the `toast()` method as shown in the example below.

```html preview
<div class="alert-toast-wrapper">
  <sl-button variant="primary">Create Toast</sl-button>
</div>

<script>
  const container = document.querySelector('.alert-toast-wrapper');
  const button = container.querySelector('sl-button');
  let count = 0;

  // Always escape HTML for text arguments!
  function escapeHtml(html) {
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML;
  }  

  // Custom function to emit toast notifications
  function notify(message, variant = 'primary', icon = 'info-circle', duration = 3000) {
    const alert = Object.assign(document.createElement('sl-alert'), {
      variant,
      closable: true,
      duration: duration,
      innerHTML: `
        <sl-icon name="${icon}" slot="icon"></sl-icon>
        ${escapeHtml(message)}
      `
    });

    document.body.append(alert);
    return alert.toast();
  }

  button.addEventListener('click', () => {
    notify(`This is custom toast #${++count}`);
  });
</script>
```

### The Toast Stack

The toast stack is a fixed position singleton element created and managed internally by the alert component. It will be added and removed from the DOM as needed when toasts are shown. When more than one toast is visible, they will stack vertically in the toast stack.

By default, the toast stack is positioned at the top-right of the viewport. You can change its position by targeting `.sl-toast-stack` in your stylesheet. To make toasts appear at the top-left of the viewport, for example, use the following styles.

```css
.sl-toast-stack {
  left: 0;
  right: auto;
}
```

?> By design, it is not possible to show toasts in more than one stack simultaneously. Such behavior is confusing and makes for a poor user experience.

[component-metadata:sl-alert]
