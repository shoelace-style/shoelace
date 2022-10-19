# Switch

[component-header:sl-switch]

```html preview
<sl-switch>Switch</sl-switch>
```

```jsx react
import { SlSwitch } from '@shoelace-style/shoelace/dist/react';

const App = () => <SlSwitch>Switch</SlSwitch>;
```

?> This component works with standard `<form>` elements. Please refer to the section on [form controls](/getting-started/form-controls) to learn more about form submission and client-side validation.

## Examples

### Checked

Use the `checked` attribute to activate the switch.

```html preview
<sl-switch checked>Checked</sl-switch>
```

```jsx react
import { SlSwitch } from '@shoelace-style/shoelace/dist/react';

const App = () => <SlSwitch checked>Checked</SlSwitch>;
```

### Disabled

Use the `disabled` attribute to disable the switch.

```html preview
<sl-switch disabled>Disabled</sl-switch>
```

```jsx react
import { SlSwitch } from '@shoelace-style/shoelace/dist/react';

const App = () => <SlSwitch disabled>Disabled</SlSwitch>;
```

### Custom Size

Use the available custom properties to make the switch a different size.

```html preview
<sl-switch style="--width: 80px; --height: 32px; --thumb-size: 26px;">Really big</sl-switch>
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
