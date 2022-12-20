# Select

[component-header:sl-select]

```html preview
<sl-select>
  <sl-option value="option-1">Option 1</sl-option>
  <sl-option value="option-2">Option 2</sl-option>
  <sl-option value="option-3">Option 3</sl-option>
  <sl-option value="option-4">Option 4</sl-option>
  <sl-option value="option-5">Option 5</sl-option>
  <sl-option value="option-6">Option 6</sl-option>
</sl-select>
```

```jsx react
import { SlOption, SlSelect } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlSelect>
    <SlOption value="option-1">Option 1</SlOption>
    <SlOption value="option-2">Option 2</SlOption>
    <SlOption value="option-3">Option 3</SlOption>
    <SlOption value="option-4">Option 4</SlOption>
    <SlOption value="option-5">Option 5</SlOption>
    <SlOption value="option-6">Option 6</SlOption>
  </SlSelect>
);
```

?> This component works with standard `<form>` elements. Please refer to the section on [form controls](/getting-started/form-controls) to learn more about form submission and client-side validation.

## Examples

### Labels

Use the `label` attribute to give the select an accessible label. For labels that contain HTML, use the `label` slot instead.

```html preview
<sl-select label="Select one">
  <sl-option value="option-1">Option 1</sl-option>
  <sl-option value="option-2">Option 2</sl-option>
  <sl-option value="option-3">Option 3</sl-option>
</sl-select>
```

```jsx react
import { SlOption, SlSelect } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlSelect label="Select one">
    <SlOption value="option-1">Option 1</SlOption>
    <SlOption value="option-2">Option 2</SlOption>
    <SlOption value="option-3">Option 3</SlOption>
  </SlSelect>
);
```

### Help Text

Add descriptive help text to a select with the `help-text` attribute. For help texts that contain HTML, use the `help-text` slot instead.

```html preview
<sl-select label="Experience" help-text="Please tell us your skill level.">
  <sl-option value="1">Novice</sl-option>
  <sl-option value="2">Intermediate</sl-option>
  <sl-option value="3">Advanced</sl-option>
</sl-select>
```

```jsx react
import { SlOption, SlSelect } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlSelect label="Experience" help-text="Please tell us your skill level.">
    <SlOption value="1">Novice</SlOption>
    <SlOption value="2">Intermediate</SlOption>
    <SlOption value="3">Advanced</SlOption>
  </SlSelect>
);
```

### Placeholders

Use the `placeholder` attribute to add a placeholder.

```html preview
<sl-select placeholder="Select one">
  <sl-option value="option-1">Option 1</sl-option>
  <sl-option value="option-2">Option 2</sl-option>
  <sl-option value="option-3">Option 3</sl-option>
</sl-select>
```

```jsx react
import { SlOption, SlSelect } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlSelect placeholder="Select one">
    <SlOption value="option-1">Option 1</SlOption>
    <SlOption value="option-2">Option 2</SlOption>
    <SlOption value="option-3">Option 3</SlOption>
  </SlSelect>
);
```

### Clearable

Use the `clearable` attribute to make the control clearable. The clear button only appears when an option is selected.

```html preview
<sl-select clearable value="option-1">
  <sl-option value="option-1">Option 1</sl-option>
  <sl-option value="option-2">Option 2</sl-option>
  <sl-option value="option-3">Option 3</sl-option>
</sl-select>
```

```jsx react
import { SlOption, SlSelect } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlSelect placeholder="Clearable" clearable>
    <SlOption value="option-1">Option 1</SlOption>
    <SlOption value="option-2">Option 2</SlOption>
    <SlOption value="option-3">Option 3</SlOption>
  </SlSelect>
);
```

### Filled Selects

Add the `filled` attribute to draw a filled select.

```html preview
<sl-select filled>
  <sl-option value="option-1">Option 1</sl-option>
  <sl-option value="option-2">Option 2</sl-option>
  <sl-option value="option-3">Option 3</sl-option>
</sl-select>
```

```jsx react
import { SlOption, SlSelect } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlSelect filled>
    <SlOption value="option-1">Option 1</SlOption>
    <SlOption value="option-2">Option 2</SlOption>
    <SlOption value="option-3">Option 3</SlOption>
  </SlSelect>
);
```

### Pill

Use the `pill` attribute to give selects rounded edges.

```html preview
<sl-select pill>
  <sl-option value="option-1">Option 1</sl-option>
  <sl-option value="option-2">Option 2</sl-option>
  <sl-option value="option-3">Option 3</sl-option>
</sl-select>
```

```jsx react
import { SlOption, SlSelect } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlSelect pill>
    <SlOption value="option-1">Option 1</SlOption>
    <SlOption value="option-2">Option 2</SlOption>
    <SlOption value="option-3">Option 3</SlOption>
  </SlSelect>
);
```

### Disabled

Use the `disabled` attribute to disable a select.

```html preview
<sl-select placeholder="Disabled" disabled>
  <sl-option value="option-1">Option 1</sl-option>
  <sl-option value="option-2">Option 2</sl-option>
  <sl-option value="option-3">Option 3</sl-option>
</sl-select>
```

```jsx react
import { SlOption, SlSelect } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlSelect placeholder="Disabled" disabled>
    <SlOption value="option-1">Option 1</SlOption>
    <SlOption value="option-2">Option 2</SlOption>
    <SlOption value="option-3">Option 3</SlOption>
  </SlSelect>
);
```

### Setting the Selection

Use the `value` attribute to set the current selection. When users interact with the control, its `value` will update to reflect the newly selected menu item's value.

```html preview
<sl-select value="option-2">
  <sl-option value="option-1">Option 1</sl-option>
  <sl-option value="option-2">Option 2</sl-option>
  <sl-option value="option-3">Option 3</sl-option>
</sl-select>
```

```jsx react
import { SlDivider, SlOption, SlSelect } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlSelect value="option-2">
    <SlOption value="option-1">Option 1</SlOption>
    <SlOption value="option-2">Option 2</SlOption>
    <SlOption value="option-3">Option 3</SlOption>
  </SlSelect>
);
```

### Setting the Selection Imperatively

To programmatically set the selection, update the `value` property as shown below.

```html preview
<div class="selecting-example">
  <sl-select>
    <sl-option value="option-1">Option 1</sl-option>
    <sl-option value="option-2">Option 2</sl-option>
    <sl-option value="option-3">Option 3</sl-option>
  </sl-select>

  <br />

  <sl-button data-option="option-1">Set 1</sl-button>
  <sl-button data-option="option-2">Set 2</sl-button>
  <sl-button data-option="option-3">Set 3</sl-button>
</div>

<script>
  const container = document.querySelector('.selecting-example');
  const select = container.querySelector('sl-select');

  [...container.querySelectorAll('sl-button')].map(button => {
    button.addEventListener('click', () => {
      select.value = button.dataset.option;
    });
  });
</script>
```

```jsx react
import { useState } from 'react';
import { SlButton, SlOption, SlSelect } from '@shoelace-style/shoelace/dist/react';

const App = () => {
  const [value, setValue] = useState('option-1');

  return (
    <>
      <SlSelect value={value} onSlChange={event => setValue(event.target.value)}>
        <SlOption value="option-1">Option 1</SlOption>
        <SlOption value="option-2">Option 2</SlOption>
        <SlOption value="option-3">Option 3</SlOption>
      </SlSelect>

      <br />

      <SlButton onClick={() => setValue('option-1')}>Set 1</SlButton>
      <SlButton onClick={() => setValue('option-2')}>Set 2</SlButton>
      <SlButton onClick={() => setValue('option-3')}>Set 3</SlButton>
    </>
  );
};
```

### Multiple

TODO

### Grouping Options

Use `<sl-divider>` to group listbox items visually. You can also use `<small>` to provide labels, but they won't be announced by most assistive devices.

```html preview
<sl-select>
  <small>Section 1</small>
  <sl-option value="option-1">Option 1</sl-option>
  <sl-option value="option-2">Option 2</sl-option>
  <sl-option value="option-3">Option 3</sl-option>
  <sl-divider></sl-divider>
  <small>Section 2</small>
  <sl-option value="option-4">Option 4</sl-option>
  <sl-option value="option-5">Option 5</sl-option>
  <sl-option value="option-6">Option 6</sl-option>
</sl-select>
```

```jsx react
import { SlOption, SlSelect } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlSelect>
    <SlOption value="option-1">Option 1</SlOption>
    <SlOption value="option-2">Option 2</SlOption>
    <SlOption value="option-3">Option 3</SlOption>
    <SlOption value="option-4">Option 4</SlOption>
    <SlOption value="option-5">Option 5</SlOption>
    <SlOption value="option-6">Option 6</SlOption>
  </SlSelect>
);
```

### Sizes

Use the `size` attribute to change a select's size. Note that size does not apply to listbox options.

```html preview
<sl-select placeholder="Small" size="small">
  <sl-option value="option-1">Option 1</sl-option>
  <sl-option value="option-2">Option 2</sl-option>
  <sl-option value="option-3">Option 3</sl-option>
</sl-select>

<br />

<sl-select placeholder="Medium" size="medium">
  <sl-option value="option-1">Option 1</sl-option>
  <sl-option value="option-2">Option 2</sl-option>
  <sl-option value="option-3">Option 3</sl-option>
</sl-select>

<br />

<sl-select placeholder="Large" size="large">
  <sl-option value="option-1">Option 1</sl-option>
  <sl-option value="option-2">Option 2</sl-option>
  <sl-option value="option-3">Option 3</sl-option>
</sl-select>
```

```jsx react
import { SlOption, SlSelect } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    <SlSelect placeholder="Small" size="small">
      <SlOption value="option-1">Option 1</SlOption>
      <SlOption value="option-2">Option 2</SlOption>
      <SlOption value="option-3">Option 3</SlOption>
    </SlSelect>

    <br />

    <SlSelect placeholder="Medium" size="medium">
      <SlOption value="option-1">Option 1</SlOption>
      <SlOption value="option-2">Option 2</SlOption>
      <SlOption value="option-3">Option 3</SlOption>
    </SlSelect>

    <br />

    <SlSelect placeholder="Large" size="large">
      <SlOption value="option-1">Option 1</SlOption>
      <SlOption value="option-2">Option 2</SlOption>
      <SlOption value="option-3">Option 3</SlOption>
    </SlSelect>
  </>
);
```

### Placement

The preferred placement of the select's menu can be set with the `placement` attribute. Note that the actual position may vary to ensure the panel remains in the viewport. Valid placements are `top` and `bottom`.

```html preview
<sl-select placement="top">
  <sl-option value="option-1">Option 1</sl-option>
  <sl-option value="option-2">Option 2</sl-option>
  <sl-option value="option-3">Option 3</sl-option>
</sl-select>
```

```jsx react
import {
  SlOption,
  SlSelect
} from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlSelect placement="top">
    <SlOption value="option-1">Option 1</SlOption>
    <SlOption value="option-2">Option 2</SlOption>
    <SlOption value="option-3">Option 3</SlOption>
  </SlDropdown>
);
```

### Prefix Icons

Use the `prefix` slot to add an icon.

```html preview
<sl-select placeholder="Small" size="small" clearable>
  <sl-icon name="house" slot="prefix"></sl-icon>
  <sl-option value="option-1">Option 1</sl-option>
  <sl-option value="option-2">Option 2</sl-option>
  <sl-option value="option-3">Option 3</sl-option>
</sl-select>
<br />
<sl-select placeholder="Medium" size="medium" clearable>
  <sl-icon name="house" slot="prefix"></sl-icon>
  <sl-option value="option-1">Option 1</sl-option>
  <sl-option value="option-2">Option 2</sl-option>
  <sl-option value="option-3">Option 3</sl-option>
</sl-select>
<br />
<sl-select placeholder="Large" size="large" clearable>
  <sl-icon name="house" slot="prefix"></sl-icon>
  <sl-option value="option-1">Option 1</sl-option>
  <sl-option value="option-2">Option 2</sl-option>
  <sl-option value="option-3">Option 3</sl-option>
</sl-select>
```

```jsx react
import { SlIcon, SlOption, SlSelect } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    <SlSelect placeholder="Small" size="small">
      <SlIcon name="house" slot="prefix"></SlIcon>
      <SlOption value="option-1">Option 1</SlOption>
      <SlOption value="option-2">Option 2</SlOption>
      <SlOption value="option-3">Option 3</SlOption>
    </SlSelect>
    <br />
    <SlSelect placeholder="Medium" size="medium">
      <SlIcon name="house" slot="prefix"></SlIcon>
      <SlOption value="option-1">Option 1</SlOption>
      <SlOption value="option-2">Option 2</SlOption>
      <SlOption value="option-3">Option 3</SlOption>
    </SlSelect>
    <br />
    <SlSelect placeholder="Large" size="large">
      <SlIcon name="house" slot="prefix"></SlIcon>
      <SlOption value="option-1">Option 1</SlOption>
      <SlOption value="option-2">Option 2</SlOption>
      <SlOption value="option-3">Option 3</SlOption>
    </SlSelect>
  </>
);
```

[component-metadata:sl-select]
