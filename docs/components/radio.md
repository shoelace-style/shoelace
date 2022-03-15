# Radio

[component-header:sl-radio]

Radios allow the user to select a single option from a group.

Radios are designed to be used with [radio groups](/components/radio-group).

```html preview
<sl-radio-group label="Select an option">
  <sl-radio name="option" value="1" checked>Option 1</sl-radio>
  <sl-radio name="option" value="2">Option 2</sl-radio>
  <sl-radio name="option" value="3">Option 3</sl-radio>
</sl-radio-group>
```

```jsx react
import { SlRadio, SlRadioGroup } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlRadioGroup label="Select an option">
    <SlRadio name="option" value="1" checked>
      Option 1
    </SlRadio>
    <SlRadio name="option" value="2">
      Option 2
    </SlRadio>
    <SlRadio name="option" value="3">
      Option 3
    </SlRadio>
  </SlRadioGroup>
);
```

?> This component works with standard `<form>` elements. Please refer to the section on [form controls](/getting-started/form-controls) to learn more about form submission and client-side validation.

## Examples

### Checked

To set the initial checked state, use the `checked` attribute.

```html preview
<sl-radio-group label="Select an option">
  <sl-radio name="option" value="1" checked>Option 1</sl-radio>
  <sl-radio name="option" value="2">Option 2</sl-radio>
  <sl-radio name="option" value="3">Option 3</sl-radio>
</sl-radio-group>
```

```jsx react
import { SlRadio, SlRadioGroup } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlRadioGroup label="Select an option">
    <SlRadio name="option" value="1" checked>
      Option 1
    </SlRadio>
    <SlRadio name="option" value="2">
      Option 2
    </SlRadio>
    <SlRadio name="option" value="3">
      Option 3
    </SlRadio>
  </SlRadioGroup>
);
```

### Disabled

Use the `disabled` attribute to disable a radio.

```html preview
<sl-radio-group label="Select an option">
  <sl-radio name="option" value="1" checked>Option 1</sl-radio>
  <sl-radio name="option" value="2">Option 2</sl-radio>
  <sl-radio name="option" value="3" disabled>Option 3</sl-radio>
</sl-radio-group>
```

```jsx react
import { SlRadio, SlRadioGroup } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlRadioGroup label="Select an option">
    <SlRadio name="option" value="1" checked>
      Option 1
    </SlRadio>
    <SlRadio name="option" value="2">
      Option 2
    </SlRadio>
    <SlRadio name="option" value="3" disabled>
      Option 3
    </SlRadio>
  </SlRadioGroup>
);
```

[component-metadata:sl-radio]
