# Radio Button

[component-header:sl-radio-button]

Radio buttons are designed to be used with [radio groups](/components/radio-group). When a radio button has focus, the arrow keys can be used to change the selected option just like standard radio controls.

```html preview
<sl-radio-group label="Select an option" name="a" value="1">
  <sl-radio-button value="1">Option 1</sl-radio-button>
  <sl-radio-button value="2">Option 2</sl-radio-button>
  <sl-radio-button value="3">Option 3</sl-radio-button>
</sl-radio-group>
```

```jsx react
import { SlRadioButton, SlRadioGroup } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlRadioGroup label="Select an option" name="a" value="1">
    <SlRadioButton value="1">Option 1</SlRadioButton>
    <SlRadioButton value="2">Option 2</SlRadioButton>
    <SlRadioButton value="3">Option 3</SlRadioButton>
  </SlRadioGroup>
);
```

## Examples

### Checked States

To set the initial value and checked state, use the `value` attribute on the containing radio group.

```html preview
<sl-radio-group label="Select an option" name="a" value="1">
  <sl-radio-button value="1">Option 1</sl-radio-button>
  <sl-radio-button value="2">Option 2</sl-radio-button>
  <sl-radio-button value="3">Option 3</sl-radio-button>
</sl-radio-group>
```

```jsx react
import { SlRadioButton, SlRadioGroup } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlRadioGroup label="Select an option" name="a" value="1">
    <SlRadioButton value="1">Option 1</SlRadioButton>
    <SlRadioButton value="2">Option 2</SlRadioButton>
    <SlRadioButton value="3">Option 3</SlRadioButton>
  </SlRadioGroup>
);
```

### Disabled

Use the `disabled` attribute to disable a radio button.

```html preview
<sl-radio-group label="Select an option" name="a" value="1">
  <sl-radio-button value="1">Option 1</sl-radio-button>
  <sl-radio-button value="2" disabled>Option 2</sl-radio-button>
  <sl-radio-button value="3">Option 3</sl-radio-button>
</sl-radio-group>
```

```jsx react
import { SlRadioButton, SlRadioGroup } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlRadioGroup label="Select an option" name="a" value="1">
    <SlRadioButton value="1">Option 1</SlRadioButton>
    <SlRadioButton value="2" disabled>
      Option 2
    </SlRadioButton>
    <SlRadioButton value="3">Option 3</SlRadioButton>
  </SlRadioGroup>
);
```

### Sizes

Use the `size` attribute to change a radio button's size.

```html preview
<sl-radio-group label="Select an option" name="a" value="1">
  <sl-radio-button size="small" value="1">Option 1</sl-radio-button>
  <sl-radio-button size="small" value="2">Option 2</sl-radio-button>
  <sl-radio-button size="small" value="3">Option 3</sl-radio-button>
</sl-radio-group>

<br />

<sl-radio-group label="Select an option" name="a" value="1">
  <sl-radio-button size="medium" value="1">Option 1</sl-radio-button>
  <sl-radio-button size="medium" value="2">Option 2</sl-radio-button>
  <sl-radio-button size="medium" value="3">Option 3</sl-radio-button>
</sl-radio-group>

<br />

<sl-radio-group label="Select an option" name="a" value="1">
  <sl-radio-button size="large" value="1">Option 1</sl-radio-button>
  <sl-radio-button size="large" value="2">Option 2</sl-radio-button>
  <sl-radio-button size="large" value="3">Option 3</sl-radio-button>
</sl-radio-group>
```

```jsx react
import { SlRadioButton, SlRadioGroup } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlRadioGroup label="Select an option" name="a" value="1">
    <SlRadioButton size="small" value="1">Option 1</SlRadioButton>
    <SlRadioButton size="small" value="2">Option 2</SlRadioButton>
    <SlRadioButton size="small" value="3">Option 3</SlRadioButton>
  </SlRadioGroup>

  <br />

  <SlRadioGroup label="Select an option" name="a" value="1">
    <SlRadioButton size="medium" value="1">Option 1</SlRadioButton>
    <SlRadioButton size="medium" value="2">Option 2</SlRadioButton>
    <SlRadioButton size="medium" value="3">Option 3</SlRadioButton>
  </SlRadioGroup>

  <br />

  <SlRadioGroup label="Select an option" name="a" value="1">
    <SlRadioButton size="large" value="1">Option 1</SlRadioButton>
    <SlRadioButton size="large" value="2">Option 2</SlRadioButton>
    <SlRadioButton size="large" value="3">Option 3</SlRadioButton>
  </SlRadioGroup>
);
```

### Pill Buttons

Use the `pill` attribute to give radio buttons rounded edges.

```html preview
<sl-radio-group label="Select an option" name="a" value="1">
  <sl-radio-button pill size="small" value="1">Option 1</sl-radio-button>
  <sl-radio-button pill size="small" value="2">Option 2</sl-radio-button>
  <sl-radio-button pill size="small" value="3">Option 3</sl-radio-button>
</sl-radio-group>

<br />

<sl-radio-group label="Select an option" name="a" value="1">
  <sl-radio-button pill size="medium" value="1">Option 1</sl-radio-button>
  <sl-radio-button pill size="medium" value="2">Option 2</sl-radio-button>
  <sl-radio-button pill size="medium" value="3">Option 3</sl-radio-button>
</sl-radio-group>

<br />

<sl-radio-group label="Select an option" name="a" value="1">
  <sl-radio-button pill size="large" value="1">Option 1</sl-radio-button>
  <sl-radio-button pill size="large" value="2">Option 2</sl-radio-button>
  <sl-radio-button pill size="large" value="3">Option 3</sl-radio-button>
</sl-radio-group>
```

```jsx react
import { SlRadioButton, SlRadioGroup } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlRadioGroup label="Select an option" name="a" value="1">
    <SlRadioButton pill size="small" value="1">Option 1</SlRadioButton>
    <SlRadioButton pill size="small" value="2">Option 2</SlRadioButton>
    <SlRadioButton pill size="small" value="3">Option 3</SlRadioButton>
  </SlRadioGroup>

  <br />

  <SlRadioGroup label="Select an option" name="a" value="1">
    <SlRadioButton pill size="medium" value="1">Option 1</SlRadioButton>
    <SlRadioButton pill size="medium" value="2">Option 2</SlRadioButton>
    <SlRadioButton pill size="medium" value="3">Option 3</SlRadioButton>
  </SlRadioGroup>

  <br />

  <SlRadioGroup label="Select an option" name="a" value="1">
    <SlRadioButton pill size="large" value="1">Option 1</SlRadioButton>
    <SlRadioButton pill size="large" value="2">Option 2</SlRadioButton>
    <SlRadioButton pill size="large" value="3">Option 3</SlRadioButton>
  </SlRadioGroup>
);
```

### Prefix and Suffix Icons

Use the `prefix` and `suffix` slots to add icons.

```html preview
<sl-radio-group label="Select an option" name="a" value="1">
  <sl-radio-button value="1">
    <sl-icon slot="prefix" name="archive"></sl-icon>
    Option 1
  </sl-radio-button>

  <sl-radio-button value="2">
    <sl-icon slot="suffix" name="bag"></sl-icon>
    Option 2
  </sl-radio-button>

  <sl-radio-button value="3">
    <sl-icon slot="prefix" name="gift"></sl-icon>
    <sl-icon slot="suffix" name="cart"></sl-icon>
    Option 3
  </sl-radio-button>
</sl-radio-group>
```

```jsx react
import { SlIcon, SlRadioButton, SlRadioGroup } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlRadioGroup label="Select an option" name="a" value="1">
    <SlRadioButton value="1">
      <SlIcon slot="prefix" name="archive" />
      Option 1
    </SlRadioButton>

    <SlRadioButton value="2">
      <SlIcon slot="suffix" name="bag" />
      Option 2
    </SlRadioButton>

    <SlRadioButton value="3">
      <SlIcon slot="prefix" name="gift" />
      <SlIcon slot="suffix" name="cart" />
      Option 3
    </SlRadioButton>
  </SlRadioGroup>
);
```

### Buttons with Icons

You can omit button labels and use icons instead. Make sure to set a `label` attribute on each icon so screen readers will announce each option correctly.

```html preview
<sl-radio-group label="Select an option" name="a" value="neutral">
  <sl-radio-button value="angry">
    <sl-icon name="emoji-angry" label="Angry"></sl-icon>
  </sl-radio-button>

  <sl-radio-button value="sad">
    <sl-icon name="emoji-frown" label="Sad"></sl-icon>
  </sl-radio-button>

  <sl-radio-button value="neutral">
    <sl-icon name="emoji-neutral" label="Neutral"></sl-icon>
  </sl-radio-button>

  <sl-radio-button value="happy">
    <sl-icon name="emoji-smile" label="Happy"></sl-icon>
  </sl-radio-button>

  <sl-radio-button value="laughing">
    <sl-icon name="emoji-laughing" label="Laughing"></sl-icon>
  </sl-radio-button>
</sl-radio-group>
```

```jsx react
import { SlIcon, SlRadioButton, SlRadioGroup } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlRadioGroup label="Select an option" name="a" value="neutral">
    <SlRadioButton value="angry">
      <SlIcon name="emoji-angry" label="Angry" />
    </SlRadioButton>

    <SlRadioButton value="sad">
      <SlIcon name="emoji-frown" label="Sad" />
    </SlRadioButton>

    <SlRadioButton value="neutral">
      <SlIcon name="emoji-neutral" label="Neutral" />
    </SlRadioButton>

    <SlRadioButton value="happy">
      <SlIcon name="emoji-smile" label="Happy" />
    </SlRadioButton>

    <SlRadioButton value="laughing">
      <SlIcon name="emoji-laughing" label="Laughing" />
    </SlRadioButton>
  </SlRadioGroup>
);
```

[component-metadata:sl-radio-button]
