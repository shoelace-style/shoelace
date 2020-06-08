# Alert

[component-header:sl-alert]

Alerts...

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

```html preview
<sl-alert type="primary" open>
  Nothing fancy here, just a simple alert.
</sl-alert>
<br>
<sl-alert type="primary" open closable>
  <sl-icon slot="icon" name="info-circle"></sl-icon>
  This one is a bit fancier because now it has an icon and is closable.
</sl-alert>
```

## Examples

### Types

```html preview
<sl-alert type="primary" open closable>
  <sl-icon slot="icon" name="info-circle"></sl-icon>
  <strong>Your changes have been saved</strong><br>
  You can continue working or safely leave the app now.
</sl-alert>
<br>
<sl-alert type="success" open closable>
  <sl-icon slot="icon" name="check2-circle"></sl-icon>
  <strong>Your changes have been saved</strong><br>
  You can continue working or safely leave the app now.
</sl-alert>
<br>
<sl-alert type="info" open closable>
  <sl-icon slot="icon" name="gear"></sl-icon>
  <strong>Your changes have been saved</strong><br>
  You can continue working or safely leave the app now.
</sl-alert>
<br>
<sl-alert type="warning" open closable>
  <sl-icon slot="icon" name="exclamation-triangle"></sl-icon>
  <strong>Your changes have been saved</strong><br>
  You can continue working or safely leave the app now.
</sl-alert>
<br>
<sl-alert type="danger" open closable>
  <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
  <strong>Your changes have been saved</strong><br>
  You can continue working or safely leave the app now.
</sl-alert>
```

[component-metadata:sl-alert]