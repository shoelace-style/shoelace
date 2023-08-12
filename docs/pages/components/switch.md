---
meta:
  title: Switch
  description: Switches allow the user to toggle an option on or off.
layout: component
---

```html:preview
<sl-switch>Switch</sl-switch>
```

```jsx:react
import SlSwitch from '@shoelace-style/shoelace/dist/react/switch';

const App = () => <SlSwitch>Switch</SlSwitch>;
```

:::tip
This component works with standard `<form>` elements. Please refer to the section on [form controls](/getting-started/form-controls) to learn more about form submission and client-side validation.
:::

## Examples

### Checked

Use the `checked` attribute to activate the switch.

```html:preview
<sl-switch checked>Checked</sl-switch>
```

```jsx:react
import SlSwitch from '@shoelace-style/shoelace/dist/react/switch';

const App = () => <SlSwitch checked>Checked</SlSwitch>;
```

### Disabled

Use the `disabled` attribute to disable the switch.

```html:preview
<sl-switch disabled>Disabled</sl-switch>
```

```jsx:react
import SlSwitch from '@shoelace-style/shoelace/dist/react/switch';

const App = () => <SlSwitch disabled>Disabled</SlSwitch>;
```

### Sizes

Use the `size` attribute to change a switch's size.

```html:preview
<sl-switch size="small">Small</sl-switch>
<br />
<sl-switch size="medium">Medium</sl-switch>
<br />
<sl-switch size="large">Large</sl-switch>
```

```jsx:react
import SlSwitch from '@shoelace-style/shoelace/dist/react/switch';

const App = () => (
  <>
    <SlSwitch size="small">Small</SlSwitch>
    <br />
    <SlSwitch size="medium">Medium</SlSwitch>
    <br />
    <SlSwitch size="large">Large</SlSwitch>
  </>
);
```

### Custom Styles

Use the available custom properties to change how the switch is styled.

```html:preview
<sl-switch style="--width: 80px; --height: 40px; --thumb-size: 36px;">Really big</sl-switch>
```

{% raw %}

```jsx:react
import SlSwitch from '@shoelace-style/shoelace/dist/react/switch';

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

{% endraw %}
