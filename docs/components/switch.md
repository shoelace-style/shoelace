# Switch

[component-header:sl-switch]

Switches allow the user to toggle an option on or off. 

```html preview
<sl-switch>Switch</sl-switch>
```

```jsx react
import { SlSwitch } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlSwitch>Switch</SlSwitch>
);
```

?> This component doesn't work with standard forms. Use [`<sl-form>`](/components/form) instead.

## Examples

### Checked

Use the `checked` attribute to activate the switch.

```html preview
<sl-switch checked>Checked</sl-switch>
```

```jsx react
import { SlSwitch } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlSwitch checked>Checked</SlSwitch>
);
```

### Disabled

Use the `disabled` attribute to disable the switch.

```html preview
<sl-switch disabled>Disabled</sl-switch>
```

```jsx react
import { SlSwitch } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlSwitch disabled>Disabled</SlSwitch>
);
```

### Custom Size

Use the available custom properties to make the switch a different size.

```html preview
<sl-switch style="--width: 80px; --height: 32px; --thumb-size: 26px;"></sl-switch>
```

```jsx react
import { SlSwitch } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlSwitch 
    style={{
      '--width': '80px',
      '--height': '32px',
      '--thumb-size': '26px'
    }} 
  />
);
```

[component-metadata:sl-switch]
