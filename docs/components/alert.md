# Alert

[component-header:sl-alert]

Alerts are used to display important messages either inline or as toast notifications.

```html preview
<sl-alert open>
  <sl-icon slot="icon" name="info-circle"></sl-icon>
  This is a standard alert. You can customize its content and even the icon.
</sl-alert>
```

?> Alerts will not be visible if the `open` attribute is not present.

## Examples

### Types

Set the `type` attribute to change the alert's type.

```html preview
<sl-alert type="primary" open>
  <sl-icon slot="icon" name="info-circle"></sl-icon>
  <strong>This is super informative</strong><br>
  You can tell by how pretty the alert is.
</sl-alert>

<br>

<sl-alert type="success" open>
  <sl-icon slot="icon" name="check2-circle"></sl-icon>
  <strong>Your changes have been saved</strong><br>
  You can safely exit the app now.
</sl-alert>

<br>

<sl-alert type="info" open>
  <sl-icon slot="icon" name="gear"></sl-icon>
  <strong>Your settings have been updated</strong><br>
  Settings will take affect on next login.
</sl-alert>

<br>

<sl-alert type="warning" open>
  <sl-icon slot="icon" name="exclamation-triangle"></sl-icon>
  <strong>Your session has ended</strong><br>
  Please login again to continue.
</sl-alert>

<br>

<sl-alert type="danger" open>
  <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
    <strong>Your account has been deleted</strong><br>
    We're very sorry to see you go!
</sl-alert>
```

### Closable

Add the `closable` attribute to show a close button that will hide the alert.

```html preview
<sl-alert type="primary" open closable class="alert-closable">
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

### Without Icons

Icons are optional. Simply omit the `icon` slot if you don't want them.

```html preview
<sl-alert type="primary" open>
  Nothing fancy here, just a simple alert.
</sl-alert>
```

### Duration

Set the `duration` attribute to automatically hide an alert after a period of time. This is useful for alerts that don't require acknowledgement.

```html preview
<div class="alert-duration">
  <sl-button type="primary">Show Alert</sl-button>

  <sl-alert type="primary" duration="3000" closable>
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

### Toast Notifications

To display an alert as a toast notification, or "toast", create the alert and call its `toast()` method. This will move the alert out of its position in the DOM and into [the toast stack](#the-toast-stack) where it will be shown. Once dismissed, it will be removed from the DOM completely. To reuse a toast, store a reference to it and call `toast()` again later on.

You should always use the `closable` attribute so users can dismiss the notification. It's also common to set a reasonable `duration` when the notification doesn't require acknowledgement.

```html preview
<div class="alert-toast">
  <sl-button type="primary">Primary</sl-button>
  <sl-button type="success">Success</sl-button>
  <sl-button type="info">Info</sl-button>
  <sl-button type="warning">Warning</sl-button>
  <sl-button type="danger">Danger</sl-button>
  
  <sl-alert type="primary" duration="3000" closable>
    <sl-icon slot="icon" name="info-circle"></sl-icon>
    <strong>This is super informative</strong><br>
    You can tell by how pretty the alert is.
  </sl-alert>

  <sl-alert type="success" duration="3000" closable>
    <sl-icon slot="icon" name="check2-circle"></sl-icon>
    <strong>Your changes have been saved</strong><br>
    You can safely exit the app now.
  </sl-alert>

  <sl-alert type="info" duration="3000" closable>
    <sl-icon slot="icon" name="gear"></sl-icon>
    <strong>Your settings have been updated</strong><br>
    Settings will take affect on next login.
  </sl-alert>

  <sl-alert type="warning" duration="3000" closable>
    <sl-icon slot="icon" name="exclamation-triangle"></sl-icon>
    <strong>Your session has ended</strong><br>
    Please login again to continue.
  </sl-alert>

  <sl-alert type="danger" duration="3000" closable>
    <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
    <strong>Your account has been deleted</strong><br>
    We're very sorry to see you go!
  </sl-alert>
</div>

<script>
  const container = document.querySelector('.alert-toast');

  ['primary', 'success', 'info', 'warning', 'danger'].map(type => {
    const button = container.querySelector(`sl-button[type="${type}"]`);
    const alert = container.querySelector(`sl-alert[type="${type}"]`);

    button.addEventListener('click', () => alert.toast());
  });
</script>
```

### Creating Toasts Imperatively

For convenience, you can create a utility that emits toast notifications with a function call rather than composing them in your HTML. To do this, generate the alert with JavaScript, append it to the body, and call the `toast()` method as shown in the example below.

```html preview
<div class="alert-toast-wrapper">
  <sl-button type="primary">Create Toast</sl-button>
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
  function notify(message, type = 'primary', icon = 'info-circle', duration = 3000) {
    const alert = Object.assign(document.createElement('sl-alert'), {
      type: type,
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
