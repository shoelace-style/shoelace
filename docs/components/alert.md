# Alert

[component-header:sl-alert]

Alerts are used to display important messages either inline or as toast notifications.

```html preview
<sl-alert open>
  <sl-icon slot="icon" name="info-circle"></sl-icon>
  This is a standard alert. You can customize its content and even the icon.
</sl-alert>
```

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
  alert.addEventListener('slAfterHide', () => {
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

### Toast Notifications

When the `toast` prop is used, the alert will be displayed as a toast notification. To facilitate this, the alert is appended to the toast stack the first time it is shown and removed from the DOM when dismissed. By storing a reference to the alert, you can use it again later as shown in this example.

```html preview
<div class="alert-toast">
  <sl-button type="primary">Primary</sl-button>
  <sl-button type="success">Success</sl-button>
  <sl-button type="info">Info</sl-button>
  <sl-button type="warning">Warning</sl-button>
  <sl-button type="danger">Danger</sl-button>
  
  <sl-alert type="primary" toast duration="3000" closable>
    <sl-icon slot="icon" name="info-circle"></sl-icon>
    <strong>This is super informative</strong><br>
    You can tell by how pretty the alert is.
  </sl-alert>

  <sl-alert type="success" toast duration="3000" closable>
    <sl-icon slot="icon" name="check2-circle"></sl-icon>
    <strong>Your changes have been saved</strong><br>
    You can safely exit the app now.
  </sl-alert>

  <sl-alert type="info" toast duration="3000" closable>
    <sl-icon slot="icon" name="gear"></sl-icon>
    <strong>Your settings have been updated</strong><br>
    Settings will take affect on next login.
  </sl-alert>

  <sl-alert type="warning" toast duration="3000" closable>
    <sl-icon slot="icon" name="exclamation-triangle"></sl-icon>
    <strong>Your session has ended</strong><br>
    Please login again to continue.
  </sl-alert>

  <sl-alert type="danger" toast duration="3000" closable>
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

    button.addEventListener('click', () => alert.show());
  });
</script>
```

The toast stack is a fixed position singleton element created and managed internally by the alert component. It will be added and removed from the DOM as needed when toast alerts are shown. By default, the toast stack is positioned at the top-right of the viewport. When more than one alert is visible, they will stack vertically.

You can change the toast stack's position and behavior in your stylesheet. To make toasts appear at the top-left of the viewport, for example, add the following to your stylesheet.

```css
.sl-toast-stack {
  left: 0;
  right: auto;
}
```

?> By design, toasts cannot be shown in more than one stack. That would be distracting and confusing to users, which makes for a poor experience.

### Creating Toasts Dynamically

Toast alerts can be created declaratively, but you can create them imperatively as well. Just make sure to append them to the DOM before calling `show()`.

```html preview
<div class="alert-toast-dynamic">
  <sl-button type="primary">Create New Toast</sl-button>
</div>

<script>
  const container = document.querySelector('.alert-toast-dynamic');
  const button = container.querySelector('sl-button');
  let count = 0;

  function createAlert(message, duration) {
    return Object.assign(document.createElement('sl-alert'), {
      type: 'primary',
      toast: true,
      duration: duration,
      closable: true,
      innerHTML: `
        <sl-icon slot="icon" name="info-circle"></sl-icon>
        ${message}
      `
    });
  }

  button.addEventListener('click', () => {
    const alert = createAlert(`This is alert #${++count}`, 3000);
    document.body.append(alert);
    alert.show();
  });
</script>
```

### Duration

Set the `duration` prop to automatically hide an alert after a period of time. This is useful for alerts that don't require user acknowledgement and works especially well with the `toast` prop.

```html preview
<div class="alert-duration">
  <sl-button type="primary">Show Alert</sl-button>

  <sl-alert type="primary" toast duration="3000" closable>
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
```

[component-metadata:sl-alert]
