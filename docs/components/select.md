# Select

[component-header:sl-select]

```html preview
<sl-select>
  <sl-menu-item value="option-1">Option 1</sl-menu-item>
  <sl-menu-item value="option-2">Option 2</sl-menu-item>
  <sl-menu-item value="option-3">Option 3</sl-menu-item>
  <sl-divider></sl-divider>
  <sl-menu-item value="option-4">Option 4</sl-menu-item>
  <sl-menu-item value="option-5">Option 5</sl-menu-item>
  <sl-menu-item value="option-6">Option 6</sl-menu-item>
</sl-select>
```

```jsx react
import { SlDivider, SlMenuItem, SlSelect } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlSelect>
    <SlMenuItem value="option-1">Option 1</SlMenuItem>
    <SlMenuItem value="option-2">Option 2</SlMenuItem>
    <SlMenuItem value="option-3">Option 3</SlMenuItem>
    <SlDivider />
    <SlMenuItem value="option-4">Option 4</SlMenuItem>
    <SlMenuItem value="option-5">Option 5</SlMenuItem>
    <SlMenuItem value="option-6">Option 6</SlMenuItem>
  </SlSelect>
);
```

?> This component works with standard `<form>` elements. Please refer to the section on [form controls](/getting-started/form-controls) to learn more about form submission and client-side validation.

## Examples

### Labels

Use the `label` attribute to give the select an accessible label. For labels that contain HTML, use the `label` slot instead.

```html preview
<sl-select label="Select one">
  <sl-menu-item value="option-1">Option 1</sl-menu-item>
  <sl-menu-item value="option-2">Option 2</sl-menu-item>
  <sl-menu-item value="option-3">Option 3</sl-menu-item>
</sl-select>
```

```jsx react
import { SlMenuItem, SlSelect } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlSelect label="Select one">
    <SlMenuItem value="option-1">Option 1</SlMenuItem>
    <SlMenuItem value="option-2">Option 2</SlMenuItem>
    <SlMenuItem value="option-3">Option 3</SlMenuItem>
  </SlSelect>
);
```

### Help Text

Add descriptive help text to a select with the `help-text` attribute. For help texts that contain HTML, use the `help-text` slot instead.

```html preview
<sl-select label="Experience" help-text="Please tell us your skill level.">
  <sl-menu-item value="1">Novice</sl-menu-item>
  <sl-menu-item value="2">Intermediate</sl-menu-item>
  <sl-menu-item value="3">Advanced</sl-menu-item>
</sl-select>
```

```jsx react
import { SlMenuItem, SlSelect } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlSelect label="Experience" help-text="Please tell us your skill level.">
    <SlMenuItem value="1">Novice</SlMenuItem>
    <SlMenuItem value="2">Intermediate</SlMenuItem>
    <SlMenuItem value="3">Advanced</SlMenuItem>
  </SlSelect>
);
```

### Placeholders

Use the `placeholder` attribute to add a placeholder.

```html preview
<sl-select placeholder="Select one">
  <sl-menu-item value="option-1">Option 1</sl-menu-item>
  <sl-menu-item value="option-2">Option 2</sl-menu-item>
  <sl-menu-item value="option-3">Option 3</sl-menu-item>
</sl-select>
```

```jsx react
import { SlMenuItem, SlSelect } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlSelect placeholder="Select one">
    <SlMenuItem value="option-1">Option 1</SlMenuItem>
    <SlMenuItem value="option-2">Option 2</SlMenuItem>
    <SlMenuItem value="option-3">Option 3</SlMenuItem>
  </SlSelect>
);
```

### Clearable

Use the `clearable` attribute to make the control clearable.

```html preview
<sl-select placeholder="Clearable" clearable>
  <sl-menu-item value="option-1">Option 1</sl-menu-item>
  <sl-menu-item value="option-2">Option 2</sl-menu-item>
  <sl-menu-item value="option-3">Option 3</sl-menu-item>
</sl-select>
```

```jsx react
import { SlMenuItem, SlSelect } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlSelect placeholder="Clearable" clearable>
    <SlMenuItem value="option-1">Option 1</SlMenuItem>
    <SlMenuItem value="option-2">Option 2</SlMenuItem>
    <SlMenuItem value="option-3">Option 3</SlMenuItem>
  </SlSelect>
);
```

### Filled Selects

Add the `filled` attribute to draw a filled select.

```html preview
<sl-select filled>
  <sl-menu-item value="option-1">Option 1</sl-menu-item>
  <sl-menu-item value="option-2">Option 2</sl-menu-item>
  <sl-menu-item value="option-3">Option 3</sl-menu-item>
</sl-select>
```

```jsx react
import { SlMenuItem, SlSelect } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlSelect filled>
    <SlMenuItem value="option-1">Option 1</SlMenuItem>
    <SlMenuItem value="option-2">Option 2</SlMenuItem>
    <SlMenuItem value="option-3">Option 3</SlMenuItem>
  </SlSelect>
);
```

### Pill

Use the `pill` attribute to give selects rounded edges.

```html preview
<sl-select pill>
  <sl-menu-item value="option-1">Option 1</sl-menu-item>
  <sl-menu-item value="option-2">Option 2</sl-menu-item>
  <sl-menu-item value="option-3">Option 3</sl-menu-item>
</sl-select>
```

```jsx react
import { SlMenuItem, SlSelect } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlSelect pill>
    <SlMenuItem value="option-1">Option 1</SlMenuItem>
    <SlMenuItem value="option-2">Option 2</SlMenuItem>
    <SlMenuItem value="option-3">Option 3</SlMenuItem>
  </SlSelect>
);
```

### Disabled

Use the `disabled` attribute to disable a select.

```html preview
<sl-select placeholder="Disabled" disabled>
  <sl-menu-item value="option-1">Option 1</sl-menu-item>
  <sl-menu-item value="option-2">Option 2</sl-menu-item>
  <sl-menu-item value="option-3">Option 3</sl-menu-item>
</sl-select>
```

```jsx react
import { SlMenuItem, SlSelect } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlSelect placeholder="Disabled" disabled>
    <SlMenuItem value="option-1">Option 1</SlMenuItem>
    <SlMenuItem value="option-2">Option 2</SlMenuItem>
    <SlMenuItem value="option-3">Option 3</SlMenuItem>
  </SlSelect>
);
```

### Setting the Selection

Use the `value` attribute to set the current selection. When users interact with the control, its `value` will update to reflect the newly selected menu item's value. Note that the value must be an array when using the [`multiple`](#multiple) option.

```html preview
<sl-select value="option-2">
  <sl-menu-item value="option-1">Option 1</sl-menu-item>
  <sl-menu-item value="option-2">Option 2</sl-menu-item>
  <sl-menu-item value="option-3">Option 3</sl-menu-item>
</sl-select>
```

```jsx react
import { SlDivider, SlMenuItem, SlSelect } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlSelect value="option-2">
    <SlMenuItem value="option-1">Option 1</SlMenuItem>
    <SlMenuItem value="option-2">Option 2</SlMenuItem>
    <SlMenuItem value="option-3">Option 3</SlMenuItem>
  </SlSelect>
);
```

### Setting the Selection Imperatively

To programmatically set the selection, update the `value` property as shown below. Note that the value must be an array when using the [`multiple`](#multiple) option.

```html preview
<div class="selecting-example">
  <sl-select>
    <sl-menu-item value="option-1">Option 1</sl-menu-item>
    <sl-menu-item value="option-2">Option 2</sl-menu-item>
    <sl-menu-item value="option-3">Option 3</sl-menu-item>
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
import { SlButton, SlMenuItem, SlSelect } from '@shoelace-style/shoelace/dist/react';

const App = () => {
  const [value, setValue] = useState('option-1');

  return (
    <>
      <SlSelect value={value} onSlChange={event => setValue(event.target.value)}>
        <SlMenuItem value="option-1">Option 1</SlMenuItem>
        <SlMenuItem value="option-2">Option 2</SlMenuItem>
        <SlMenuItem value="option-3">Option 3</SlMenuItem>
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

To allow multiple options to be selected, use the `multiple` attribute. With this option, `value` will be an array of strings instead of a string. It's a good practice to use `clearable` when this option is enabled.

```html preview
<sl-select placeholder="Select a few" multiple clearable>
  <sl-menu-item value="option-1">Option 1</sl-menu-item>
  <sl-menu-item value="option-2">Option 2</sl-menu-item>
  <sl-menu-item value="option-3">Option 3</sl-menu-item>
  <sl-divider></sl-divider>
  <sl-menu-item value="option-4">Option 4</sl-menu-item>
  <sl-menu-item value="option-5">Option 5</sl-menu-item>
  <sl-menu-item value="option-6">Option 6</sl-menu-item>
</sl-select>
```

```jsx react
import { SlDivider, SlMenuItem, SlSelect } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlSelect placeholder="Select a few" multiple clearable>
    <SlMenuItem value="option-1">Option 1</SlMenuItem>
    <SlMenuItem value="option-2">Option 2</SlMenuItem>
    <SlMenuItem value="option-3">Option 3</SlMenuItem>
    <SlDivider />
    <SlMenuItem value="option-4">Option 4</SlMenuItem>
    <SlMenuItem value="option-5">Option 5</SlMenuItem>
    <SlMenuItem value="option-6">Option 6</SlMenuItem>
  </SlSelect>
);
```

?> When using the `multiple` option, the value will be an array instead of a string. You may need to [set the selection imperatively](#setting-the-selection-imperatively) unless you're using a framework that supports binding properties declaratively.

### Grouping Options

Options can be grouped visually using menu labels and dividers.

```html preview
<sl-select placeholder="Select one">
  <sl-menu-label>Group 1</sl-menu-label>
  <sl-menu-item value="option-1">Option 1</sl-menu-item>
  <sl-menu-item value="option-2">Option 2</sl-menu-item>
  <sl-menu-item value="option-3">Option 3</sl-menu-item>
  <sl-divider></sl-divider>
  <sl-menu-label>Group 2</sl-menu-label>
  <sl-menu-item value="option-4">Option 4</sl-menu-item>
  <sl-menu-item value="option-5">Option 5</sl-menu-item>
  <sl-menu-item value="option-6">Option 6</sl-menu-item>
</sl-select>
```

```jsx react
import { SlDivider, SlMenuItem, SlMenuLabel, SlSelect } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlSelect placeholder="Select one">
    <SlMenuLabel>Group 1</SlMenuLabel>
    <SlMenuItem value="option-1">Option 1</SlMenuItem>
    <SlMenuItem value="option-2">Option 2</SlMenuItem>
    <SlMenuItem value="option-3">Option 3</SlMenuItem>
    <SlDivider></SlDivider>
    <SlMenuLabel>Group 2</SlMenuLabel>
    <SlMenuItem value="option-4">Option 4</SlMenuItem>
    <SlMenuItem value="option-5">Option 5</SlMenuItem>
    <SlMenuItem value="option-6">Option 6</SlMenuItem>
  </SlSelect>
);
```

### Sizes

Use the `size` attribute to change a select's size.

```html preview
<sl-select placeholder="Small" size="small" multiple>
  <sl-menu-item value="option-1">Option 1</sl-menu-item>
  <sl-menu-item value="option-2">Option 2</sl-menu-item>
  <sl-menu-item value="option-3">Option 3</sl-menu-item>
</sl-select>

<br />

<sl-select placeholder="Medium" size="medium" multiple>
  <sl-menu-item value="option-1">Option 1</sl-menu-item>
  <sl-menu-item value="option-2">Option 2</sl-menu-item>
  <sl-menu-item value="option-3">Option 3</sl-menu-item>
</sl-select>

<br />

<sl-select placeholder="Large" size="large" multiple>
  <sl-menu-item value="option-1">Option 1</sl-menu-item>
  <sl-menu-item value="option-2">Option 2</sl-menu-item>
  <sl-menu-item value="option-3">Option 3</sl-menu-item>
</sl-select>
```

```jsx react
import { SlMenuItem, SlSelect } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    <SlSelect placeholder="Small" size="small" multiple>
      <SlMenuItem value="option-1">Option 1</SlMenuItem>
      <SlMenuItem value="option-2">Option 2</SlMenuItem>
      <SlMenuItem value="option-3">Option 3</SlMenuItem>
    </SlSelect>

    <br />

    <SlSelect placeholder="Medium" size="medium" multiple>
      <SlMenuItem value="option-1">Option 1</SlMenuItem>
      <SlMenuItem value="option-2">Option 2</SlMenuItem>
      <SlMenuItem value="option-3">Option 3</SlMenuItem>
    </SlSelect>

    <br />

    <SlSelect placeholder="Large" size="large" multiple>
      <SlMenuItem value="option-1">Option 1</SlMenuItem>
      <SlMenuItem value="option-2">Option 2</SlMenuItem>
      <SlMenuItem value="option-3">Option 3</SlMenuItem>
    </SlSelect>
  </>
);
```

### Placement

The preferred placement of the select's menu can be set with the `placement` attribute. Note that the actual position may vary to ensure the panel remains in the viewport. Valid placements are `top` and `bottom`.

```html preview
<sl-select placement="top">
  <sl-menu-item value="option-1">Option 1</sl-menu-item>
  <sl-menu-item value="option-2">Option 2</sl-menu-item>
  <sl-menu-item value="option-3">Option 3</sl-menu-item>
</sl-select>
```

```jsx react
import {
  SlMenuItem,
  SlSelect
} from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlSelect placement="top">
    <SlMenuItem value="option-1">Option 1</SlMenuItem>
    <SlMenuItem value="option-2">Option 2</SlMenuItem>
    <SlMenuItem value="option-3">Option 3</SlMenuItem>
  </SlDropdown>
);
```

### Prefix & Suffix Icons

Use the `prefix` and `suffix` slots to add icons.

```html preview
<sl-select placeholder="Small" size="small">
  <sl-icon name="house" slot="prefix"></sl-icon>
  <sl-menu-item value="option-1">Option 1</sl-menu-item>
  <sl-menu-item value="option-2">Option 2</sl-menu-item>
  <sl-menu-item value="option-3">Option 3</sl-menu-item>
  <sl-icon name="chat" slot="suffix"></sl-icon>
</sl-select>
<br />
<sl-select placeholder="Medium" size="medium">
  <sl-icon name="house" slot="prefix"></sl-icon>
  <sl-menu-item value="option-1">Option 1</sl-menu-item>
  <sl-menu-item value="option-2">Option 2</sl-menu-item>
  <sl-menu-item value="option-3">Option 3</sl-menu-item>
  <sl-icon name="chat" slot="suffix"></sl-icon>
</sl-select>
<br />
<sl-select placeholder="Large" size="large">
  <sl-icon name="house" slot="prefix"></sl-icon>
  <sl-menu-item value="option-1">Option 1</sl-menu-item>
  <sl-menu-item value="option-2">Option 2</sl-menu-item>
  <sl-menu-item value="option-3">Option 3</sl-menu-item>
  <sl-icon name="chat" slot="suffix"></sl-icon>
</sl-select>
```

```jsx react
import { SlIcon, SlMenuItem, SlSelect } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    <SlSelect placeholder="Small" size="small">
      <SlIcon name="house" slot="prefix"></SlIcon>
      <SlMenuItem value="option-1">Option 1</SlMenuItem>
      <SlMenuItem value="option-2">Option 2</SlMenuItem>
      <SlMenuItem value="option-3">Option 3</SlMenuItem>
      <SlIcon name="chat" slot="suffix"></SlIcon>
    </SlSelect>
    <br />
    <SlSelect placeholder="Medium" size="medium">
      <SlIcon name="house" slot="prefix"></SlIcon>
      <SlMenuItem value="option-1">Option 1</SlMenuItem>
      <SlMenuItem value="option-2">Option 2</SlMenuItem>
      <SlMenuItem value="option-3">Option 3</SlMenuItem>
      <SlIcon name="chat" slot="suffix"></SlIcon>
    </SlSelect>
    <br />
    <SlSelect placeholder="Large" size="large">
      <SlIcon name="house" slot="prefix"></SlIcon>
      <SlMenuItem value="option-1">Option 1</SlMenuItem>
      <SlMenuItem value="option-2">Option 2</SlMenuItem>
      <SlMenuItem value="option-3">Option 3</SlMenuItem>
      <SlIcon name="chat" slot="suffix"></SlIcon>
    </SlSelect>
  </>
);
```

[component-metadata:sl-select]
