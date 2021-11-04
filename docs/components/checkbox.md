# Checkbox

[component-header:sl-checkbox]

Checkboxes allow the user to toggle an option on or off.

```html preview
<sl-checkbox>Checkbox</sl-checkbox>
```

```jsx react
import { SlCheckbox } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlCheckbox>Checkbox</SlCheckbox>
);
```

?> This component doesn't work with standard forms. Use [`<sl-form>`](/components/form) instead.

## Examples

### Checked

Use the `checked` attribute to activate the checkbox.

```html preview
<sl-checkbox checked>Checked</sl-checkbox>
```

```jsx react
import { SlCheckbox } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlCheckbox checked>Checked</SlCheckbox>
);
```

### Indeterminate

Use the `indeterminate` attribute to make the checkbox indeterminate.

```html preview
<sl-checkbox indeterminate>Indeterminate</sl-checkbox>
```

```jsx react
import { SlCheckbox } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlCheckbox indeterminate>Indeterminate</SlCheckbox>
);
```

### Disabled

Use the `disabled` attribute to disable the checkbox.

```html preview
<sl-checkbox disabled>Disabled</sl-checkbox>
```

```jsx react
import { SlCheckbox } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlCheckbox disabled>Disabled</SlCheckbox>
);
```

[component-metadata:sl-checkbox]
