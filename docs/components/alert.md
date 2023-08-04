# Alert

[component-header:sl-alert]

<sl-tab-group>
  <sl-tab slot="nav" panel="examples">Examples</sl-tab>
  <sl-tab slot="nav" panel="guidelines">Guidelines</sl-tab>

  <sl-tab-panel name="examples">

```html preview
<sl-alert open>
  <sl-icon slot="icon" library="fa" name="fas-circle-info"></sl-icon>
  <div slot="header">This is super informative</div>
  This is a standard informational alert.
</sl-alert>
```

```pug slim
sl-alert open="true"
  sl-icon slot="icon" library="fa" name="fas-circle-info"
  div slot="header" This is super informative
  | This is a standard informational alert.
```

```jsx react
import { SlAlert, SlIcon } from '@teamshares/shoelace/dist/react';

const App = () => (
  <SlAlert open>
    <SlIcon slot="icon" library="fa" name="fas-circle-info" />
    <div slot="header">This is super informative</div>
    This is a standard standard informational alert.
  </SlAlert>
);
```

?> Alerts will not be visible if the `open` attribute is not present.

### Variants

Set the `variant` attribute to change the alert's variant.

```html preview
<sl-alert variant="primary" open>
  <sl-icon slot="icon" library="fa" name="fas-circle-info"></sl-icon>
  <div slot="header">This is super informative</div>
  You can tell by how pretty the alert is.
</sl-alert>

<br />

<sl-alert variant="success" open>
  <sl-icon slot="icon" library="fa" name="fas-circle-check"></sl-icon>
  <div slot="header">You can safely exit the app now</div>
  Your changes have been saved.
</sl-alert>

<br />

<sl-alert variant="warning" open>
  <sl-icon slot="icon" library="fa" name="fas-triangle-exclamation"></sl-icon>
  <div slot="header">Your session has ended</div>
  Please login again to continue.
</sl-alert>

<br />

<sl-alert variant="danger" open>
  <sl-icon slot="icon" library="fa" name="fas-circle-exclamation"></sl-icon>
  <div slot="header">Your account has been deleted</div>
  We are very sorry to see you go!
</sl-alert>
```

```pug slim
sl-alert variant="primary" open="true"
  sl-icon slot="icon" library="fa" name="fas-circle-info"
  div slot="header" This is super informative
  | You can tell by how pretty the alert is.
br
sl-alert variant="success" open="true"
  sl-icon slot="icon" library="fa" name="fas-circle-check"
  div slot="header" Your changes have been saved
  | You can safely exit the app now.
br
sl-alert variant="warning" open="true"
  sl-icon slot="icon" library="fa" name="fas-triangle-exclamation"
  div slot="header" Your session has ended
  | Please login again to continue.
br
sl-alert variant="danger" open="true"
  sl-icon slot="icon" library="fa" name="fas-circle-exclamation"
  div slot="header" Your account has been deleted
  | We are very sorry to see you go!
```

```jsx react
import { SlAlert, SlIcon } from '@teamshares/shoelace/dist/react';

const App = () => (
  <>
    <SlAlert variant="primary" open>
      <SlIcon slot="icon" library="fa" name="fas-circle-info" />
      <div slot="header">This is super informative</div>
      You can tell by how pretty the alert is.
    </SlAlert>

    <br />

    <SlAlert variant="success" open>
      <SlIcon slot="icon" library="fa" name="fas-circle-check" />
      <div slot="header">Your changes have been saved</div>
      You can safely exit the app now.
    </SlAlert>

    <br />

    <SlAlert variant="warning" open>
      <SlIcon slot="icon" library="fa" name="fas-triangle-exclamation" />
      <div slot="header">Your session has ended</div>
      Please login again to continue.
    </SlAlert>

    <br />

    <SlAlert variant="danger" open>
      <SlIcon slot="icon" library="fa" name="fas-circle-exclamation" />
      <div slot="header">Your account has been deleted</div>
      We are very sorry to see you go!
    </SlAlert>
  </>
);
```

### Closable

Add the `closable` attribute to show a close button that will hide the alert.

```html preview
<sl-alert variant="primary" open closable class="alert-closable">
  <sl-icon slot="icon" library="fa" name="fas-circle-info"></sl-icon>
  You can close this alert any time!
</sl-alert>

<script>
  const alert = document.querySelector('.alert-closable');
  alert.addEventListener('sl-after-hide', () => {
    setTimeout(() => (alert.open = true), 2000);
  });
</script>
```

```pug slim
sl-alert.alert-closable variant="primary" open="true" closable="true"
  sl-icon slot="icon" library="fa" name="fas-circle-info"
  | You can close this alert any time!

javascript:
  const alert = document.querySelector(.alert-closable);
  alert.addEventListener(sl-after-hide, () => {
    setTimeout(() => (alert.open = true), 2000);
  });
```

```jsx react
import { useState } from 'react';
import { SlAlert, SlIcon } from '@teamshares/shoelace/dist/react';

const App = () => {
  const [open, setOpen] = useState(true);

  function handleHide() {
    setOpen(false);
    setTimeout(() => setOpen(true), 2000);
  }

  return (
    <SlAlert open={open} closable onSlAfterHide={handleHide}>
      <SlIcon slot="icon" library="fa" name="fas-circle-info" />
      You can close this alert any time!
    </SlAlert>
  );
};
```

<!-- ### Without Icons

Icons are optional. Simply omit the `icon` slot if you don't want them.

```html preview
<sl-alert variant="primary" open> Nothing fancy here, just a simple alert. </sl-alert>
```

```pug slim
sl-alert variant="primary" open="true"  Nothing fancy here, just a simple alert.
```

```jsx react
import { SlAlert } from '@teamshares/shoelace/dist/react';

const App = () => (
  <SlAlert variant="primary" open>
    Nothing fancy here, just a simple alert.
  </SlAlert>
);
``` -->

### Duration

Set the `duration` attribute to automatically hide an alert after a period of time. This is useful for alerts that don't require acknowledgement.

```html preview
<div class="alert-duration">
  <sl-button variant="primary">Show Alert</sl-button>

  <sl-alert variant="primary" duration="3000" closable>
    <sl-icon slot="icon" library="fa" name="fas-circle-info"></sl-icon>
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

```pug slim
div.alert-duration
  sl-button variant="primary" Show Alert
  sl-alert variant="primary" duration="3000" closable="true"
    sl-icon slot="icon" library="fa" name="fas-circle-info"
    | This alert will automatically hide itself after three seconds, unless you interact with it.

javascript:
  const container = document.querySelector(.alert-duration);
  const button = container.querySelector(sl-button);
  const alert = container.querySelector(sl-alert);

  button.addEventListener(click, () => alert.show());

css:
  .alert-duration sl-alert {
    margin-top: var(--sl-spacing-medium);
  }
```

```jsx react
import { useState } from 'react';
import { SlAlert, SlButton, SlIcon } from '@teamshares/shoelace/dist/react';

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
        <SlButton variant="primary" onClick={() => setOpen(true)}>
          Show Alert
        </SlButton>

        <SlAlert variant="primary" duration="3000" open={open} closable onSlAfterHide={() => setOpen(false)}>
          <SlIcon slot="icon" library="fa" name="fas-circle-info" />
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
  <sl-button variant="warning">Warning</sl-button>
  <sl-button variant="danger">Danger</sl-button>

  <sl-alert variant="primary" duration="3000" closable>
    <sl-icon slot="icon" library="fa" name="fas-circle-info"></sl-icon>
    <div slot="header">This is super informative</div>
    You can tell by how pretty the alert is.
  </sl-alert>

  <sl-alert variant="success" duration="3000" closable>
    <sl-icon slot="icon" library="fa" name="fas-circle-check"></sl-icon>
    <div slot="header">Your changes have been saved</div>
    You can safely exit the app now.
  </sl-alert>

  <sl-alert variant="warning" duration="3000" closable>
    <sl-icon slot="icon" library="fa" name="fas-triangle-exclamation"></sl-icon>
    <div slot="header">Your session has ended</div>
    Please login again to continue.
  </sl-alert>

  <sl-alert variant="danger" duration="3000" closable>
    <sl-icon slot="icon" library="fa" name="fas-circle-exclamation"></sl-icon>
    <div slot="header">Your account has been deleted</div>
    We are very sorry to see you go!
  </sl-alert>
</div>

<script>
  const container = document.querySelector('.alert-toast');

  ['primary', 'success', 'warning', 'danger'].map(variant => {
    const button = container.querySelector(`sl-button[variant="${variant}"]`);
    const alert = container.querySelector(`sl-alert[variant="${variant}"]`);

    button.addEventListener('click', () => alert.toast());
  });
</script>
```

```pug slim
div.alert-toast
  sl-button variant="primary" Primary
  sl-button variant="success" Success
  sl-button variant="warning" Warning
  sl-button variant="danger" Danger
  sl-alert variant="primary" duration="3000" closable="true"
    sl-icon slot="icon" library="fa" name="fas-circle-info"
    div slot="header" This is super informative
    | You can tell by how pretty the alert is.
  sl-alert variant="success" duration="3000" closable="true"
    sl-icon slot="icon" library="fa" name="fas-circle-check"
    div slot="header" Your changes have been saved
    | You can safely exit the app now.
  sl-alert variant="warning" duration="3000" closable="true"
    sl-icon slot="icon" library="fa" name="fas-triangle-exclamation"
    div slot="header" Your session has ended
    | Please login again to continue.
  sl-alert variant="danger" duration="3000" closable="true"
    sl-icon slot="icon" library="fa" name="fas-circle-exclamation"
    div slot="header" Your account has been deleted
    | We are very sorry to see you go!

javascript:
  const container = document.querySelector(.alert-toast);

  [primary, success, warning, danger].map(variant => {
    const button = container.querySelector(`sl-button[variant="${variant}"]`);
    const alert = container.querySelector(`sl-alert[variant="${variant}"]`);

    button.addEventListener(click, () => alert.toast());
  });
```

```jsx react
import { useRef } from 'react';
import { SlAlert, SlButton, SlIcon } from '@teamshares/shoelace/dist/react';

function showToast(alert) {
  alert.toast();
}

const App = () => {
  const primary = useRef(null);
  const success = useRef(null);
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

      <SlButton variant="warning" onClick={() => warning.current.toast()}>
        Warning
      </SlButton>

      <SlButton variant="danger" onClick={() => danger.current.toast()}>
        Danger
      </SlButton>

      <SlAlert ref={primary} variant="primary" duration="3000" closable>
        <SlIcon slot="icon" library="fa" name="fas-circle-info" />
        <div slot="header">This is super informative</div>
        You can tell by how pretty the alert is.
      </SlAlert>

      <SlAlert ref={success} variant="success" duration="3000" closable>
        <SlIcon slot="icon" library="fa" name="fas-circle-check" />
        <div slot="header">Your changes have been saved</div>
        You can safely exit the app now.
      </SlAlert>

      <SlAlert ref={warning} variant="warning" duration="3000" closable>
        <SlIcon slot="icon" library="fa" name="fas-triangle-exclamation" />
        <div slot="header">Your session has ended</div>
        Please login again to continue.
      </SlAlert>

      <SlAlert ref={danger} variant="danger" duration="3000" closable>
        <SlIcon slot="icon" library="fa" name="fas-circle-exclamation" />
        <div slot="header">Your account has been deleted</div>
        We are very sorry to see you go!
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
  function notify(message, variant = 'primary', icon = 'fas-circle-info', duration = 3000) {
    const alert = Object.assign(document.createElement('sl-alert'), {
      variant,
      closable: true,
      duration: duration,
      innerHTML: `
        <sl-icon name="${icon}" library="fa" slot="icon"></sl-icon>
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

```pug slim
.alert-toast-wrapper
  sl-button[variant="primary"]
    | Create Toast

javascript:
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
  function notify(message, variant = 'primary', icon = 'fas-circle-info', duration = 3000) {
    const alert = Object.assign(document.createElement('sl-alert'), {
      variant,
      closable: true,
      duration: duration,
      innerHTML: `
        <sl-icon name="${icon}" library="fa" slot="icon"></sl-icon>
        ${escapeHtml(message)}
      `
    });

    document.body.append(alert);
    return alert.toast();
  }

  button.addEventListener('click', () => {
    notify(`This is custom toast #${++count}`);
  });
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
</sl-tab-panel>

<!--- ************************************ --->
<!--- Guidelines panel content --->
<!--- ************************************ --->
<sl-tab-panel name="guidelines">

### Alert icon

<ul>
  <li>Always use an icon in the alert.</li>
  <li>Default to using the icons shown in the code examples that go with each alert variant.</li>
  <li>If you feel you really have a good use case for using a different icon with an existing variant, bring it up to the design team for further discussion.</li>
</ul>

### Alert header

<ul>
<li>Opt to always include a header (using <code>slot="header"</code>) in the alert.</li>
<li>Keep the header short and scannable.</li>
<li>The header doesn&rsquo;t need a period.</li>
<li>Use sentence case.</li>
</ul>

### Alert message

<ul>
<li>The alert message could contain plain text or a bulleted list, or even a button.</li>
<li>Keep the message as short as possible.</li>
</ul>

</sl-tab-panel>
</sl-tab-group>
