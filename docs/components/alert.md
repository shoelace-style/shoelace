# Alert

[component-header:sl-alert]

Alerts...

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

```html preview
<sl-alert type="primary" open>
  <sl-icon slot="icon" name="info-circle"></sl-icon>
  This is a standard alert. You can customize its content and even the icon.
</sl-alert>
```

[component-metadata:sl-alert]

## Examples

### Types

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
  Some settings will take affect the next time you log in.
</sl-alert>

<br>

<sl-alert type="warning" open>
  <sl-icon slot="icon" name="exclamation-triangle"></sl-icon>
  <strong>This will end your session</strong><br>
  You will be logged out until you log in again.
</sl-alert>

<br>

<sl-alert type="danger" open>
  <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
  <strong>Delete this file?</strong><br>
  This is permanent, which means forever!
</sl-alert>
```

### Closable

```html preview
<sl-alert type="primary" open closable>
  <sl-icon slot="icon" name="info-circle"></sl-icon>
  You can close this alert any time!
</sl-alert>
```

### Without Icon

```html preview
<sl-alert type="primary" open>
  Nothing fancy here, just a simple alert.
</sl-alert>
```
