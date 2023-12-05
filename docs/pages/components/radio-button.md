---
meta:
  title: Radio Button
  description: Radios buttons allow the user to select a single option from a group using a button-like control.
layout: component
---

## Examples

### Basic Radio Button

Radio buttons are designed to be used with [radio groups](/components/radio-group). When a radio button has focus, the arrow keys can be used to change the selected option just like standard radio controls.

```html:preview
<sl-radio-group label="Select an option" name="a" value="1">
  <sl-radio-button value="1">Option 1</sl-radio-button>
  <sl-radio-button value="2">Option 2</sl-radio-button>
  <sl-radio-button value="3">Option 3</sl-radio-button>
</sl-radio-group>
```

```pug:slim
sl-radio-group label="Select an option" name="a" value="1"
  sl-radio-button value="1" Option 1
  sl-radio-button value="2" Option 2
  sl-radio-button value="3" Option 3
```

```pug:slim
sl-radio-group label="Select an option" name="a" value="1"
  sl-radio-button value="1" Option 1
  sl-radio-button value="2" Option 2
  sl-radio-button value="3" Option 3
```

```jsx:react
import SlRadioButton from '@teamshares/shoelace/dist/react/radio-button';
import SlRadioGroup from '@teamshares/shoelace/dist/react/radio-group';

const App = () => (
  <SlRadioGroup label="Select an option" name="a" value="1">
    <SlRadioButton value="1">Option 1</SlRadioButton>
    <SlRadioButton value="2">Option 2</SlRadioButton>
    <SlRadioButton value="3">Option 3</SlRadioButton>
  </SlRadioGroup>
);
```

### Checked States

To set the initial value and checked state, use the `value` attribute on the containing radio group.

```html:preview
<sl-radio-group label="Select an option" name="a" value="1">
  <sl-radio-button value="1">Option 1</sl-radio-button>
  <sl-radio-button value="2">Option 2</sl-radio-button>
  <sl-radio-button value="3">Option 3</sl-radio-button>
</sl-radio-group>
```

```jsx:react
import SlRadioButton from '@teamshares/shoelace/dist/react/radio-button';
import SlRadioGroup from '@teamshares/shoelace/dist/react/radio-group';

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

```html:preview
<sl-radio-group label="Select an option" name="a" value="1">
  <sl-radio-button value="1">Option 1</sl-radio-button>
  <sl-radio-button value="2" disabled>Option 2</sl-radio-button>
  <sl-radio-button value="3">Option 3</sl-radio-button>
</sl-radio-group>
```

```pug:slim
sl-radio-group label="Select an option" name="a" value="1"
  sl-radio-button value="1" Option 1
  sl-radio-button value="2" disabled="true" Option 2
  sl-radio-button value="3" Option 3
```

```jsx:react
import SlRadioButton from '@teamshares/shoelace/dist/react/radio-button';
import SlRadioGroup from '@teamshares/shoelace/dist/react/radio-group';

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

```html:preview
<sl-radio-group size="small" label="Select an option" name="a" value="1">
  <sl-radio-button value="1">Option 1</sl-radio-button>
  <sl-radio-button value="2">Option 2</sl-radio-button>
  <sl-radio-button value="3">Option 3</sl-radio-button>
</sl-radio-group>

<br />

<sl-radio-group size="medium" label="Select an option" name="a" value="1">
  <sl-radio-button value="1">Option 1</sl-radio-button>
  <sl-radio-button value="2">Option 2</sl-radio-button>
  <sl-radio-button value="3">Option 3</sl-radio-button>
</sl-radio-group>

<br />

<sl-radio-group size="large" label="Select an option" name="a" value="1">
  <sl-radio-button value="1">Option 1</sl-radio-button>
  <sl-radio-button value="2">Option 2</sl-radio-button>
  <sl-radio-button value="3">Option 3</sl-radio-button>
</sl-radio-group>
```

```pug:slim
sl-radio-group label="Select an option" name="a" value="1"
  sl-radio-button size="small" value="1" Option 1
  sl-radio-button size="small" value="2" Option 2
  sl-radio-button size="small" value="3" Option 3
br
sl-radio-group label="Select an option" name="a" value="1"
  sl-radio-button size="medium" value="1" Option 1
  sl-radio-button size="medium" value="2" Option 2
  sl-radio-button size="medium" value="3" Option 3
br
sl-radio-group label="Select an option" name="a" value="1"
  sl-radio-button size="large" value="1" Option 1
  sl-radio-button size="large" value="2" Option 2
  sl-radio-button size="large" value="3" Option 3
```

```jsx:react
import SlRadioButton from '@teamshares/shoelace/dist/react/radio-button';
import SlRadioGroup from '@teamshares/shoelace/dist/react/radio-group';

const App = () => (
  <SlRadioGroup size="small" label="Select an option" name="a" value="1">
    <SlRadioButton value="1">Option 1</SlRadioButton>
    <SlRadioButton value="2">Option 2</SlRadioButton>
    <SlRadioButton value="3">Option 3</SlRadioButton>
  </SlRadioGroup>

  <br />

  <SlRadioGroup size="medium" label="Select an option" name="a" value="1">
    <SlRadioButton value="1">Option 1</SlRadioButton>
    <SlRadioButton value="2">Option 2</SlRadioButton>
    <SlRadioButton value="3">Option 3</SlRadioButton>
  </SlRadioGroup>

  <br />

  <SlRadioGroup size="large" label="Select an option" name="a" value="1">
    <SlRadioButton value="1">Option 1</SlRadioButton>
    <SlRadioButton value="2">Option 2</SlRadioButton>
    <SlRadioButton value="3">Option 3</SlRadioButton>
  </SlRadioGroup>
);
```

### Pill Buttons

Use the `pill` attribute to give radio buttons rounded edges.

```html:preview
<sl-radio-group size="small" label="Select an option" name="a" value="1">
  <sl-radio-button pill value="1">Option 1</sl-radio-button>
  <sl-radio-button pill value="2">Option 2</sl-radio-button>
  <sl-radio-button pill value="3">Option 3</sl-radio-button>
</sl-radio-group>

<br />

<sl-radio-group size="medium" label="Select an option" name="a" value="1">
  <sl-radio-button pill value="1">Option 1</sl-radio-button>
  <sl-radio-button pill value="2">Option 2</sl-radio-button>
  <sl-radio-button pill value="3">Option 3</sl-radio-button>
</sl-radio-group>

<br />

<sl-radio-group size="large" label="Select an option" name="a" value="1">
  <sl-radio-button pill value="1">Option 1</sl-radio-button>
  <sl-radio-button pill value="2">Option 2</sl-radio-button>
  <sl-radio-button pill value="3">Option 3</sl-radio-button>
</sl-radio-group>
```

```pug:slim
sl-radio-group label="Select an option" name="a" value="1"
  sl-radio-button pill="true" size="small" value="1" Option 1
  sl-radio-button pill="true" size="small" value="2" Option 2
  sl-radio-button pill="true" size="small" value="3" Option 3
br
sl-radio-group label="Select an option" name="a" value="1"
  sl-radio-button pill="true" size="medium" value="1" Option 1
  sl-radio-button pill="true" size="medium" value="2" Option 2
  sl-radio-button pill="true" size="medium" value="3" Option 3
br
sl-radio-group label="Select an option" name="a" value="1"
  sl-radio-button pill="true" size="large" value="1" Option 1
  sl-radio-button pill="true" size="large" value="2" Option 2
  sl-radio-button pill="true" size="large" value="3" Option 3
```

```jsx:react
import SlRadioButton from '@teamshares/shoelace/dist/react/radio-button';
import SlRadioGroup from '@teamshares/shoelace/dist/react/radio-group';

const App = () => (
  <SlRadioGroup size="small" label="Select an option" name="a" value="1">
    <SlRadioButton pill value="1">Option 1</SlRadioButton>
    <SlRadioButton pill value="2">Option 2</SlRadioButton>
    <SlRadioButton pill value="3">Option 3</SlRadioButton>
  </SlRadioGroup>

  <br />

  <SlRadioGroup size="medium" label="Select an option" name="a" value="1">
    <SlRadioButton pill value="1">Option 1</SlRadioButton>
    <SlRadioButton pill value="2">Option 2</SlRadioButton>
    <SlRadioButton pill value="3">Option 3</SlRadioButton>
  </SlRadioGroup>

  <br />

  <SlRadioGroup size="large" label="Select an option" name="a" value="1">
    <SlRadioButton pill value="1">Option 1</SlRadioButton>
    <SlRadioButton pill value="2">Option 2</SlRadioButton>
    <SlRadioButton pill value="3">Option 3</SlRadioButton>
  </SlRadioGroup>
);
```

### Prefix and Suffix Icons

Use the `prefix` and `suffix` slots to add icons.

```html:preview
<sl-radio-group label="Select an option" name="a" value="1">
  <sl-radio-button value="1">
    <sl-icon slot="prefix" name="archive-box"></sl-icon>
    Option 1
  </sl-radio-button>

  <sl-radio-button value="2">
    <sl-icon slot="suffix" name="shopping-bag"></sl-icon>
    Option 2
  </sl-radio-button>

  <sl-radio-button value="3">
    <sl-icon slot="prefix" name="gift"></sl-icon>
    <sl-icon slot="suffix" name="shopping-cart"></sl-icon>
    Option 3
  </sl-radio-button>
</sl-radio-group>
```

```pug:slim
sl-radio-group label="Select an option" name="a" value="1"
  sl-radio-button value="1"
    sl-icon slot="prefix" name="archive-box"
    | Option 1
  sl-radio-button value="2"
    sl-icon slot="suffix" name="shopping-bag"
    | Option 2
  sl-radio-button value="3"
    sl-icon slot="prefix" name="gift"
    sl-icon slot="suffix" name="shopping-cart"
    | Option 3
```

```jsx:react
import SlIcon from '@teamshares/shoelace/dist/react/icon';
import SlRadioButton from '@teamshares/shoelace/dist/react/radio-button';
import SlRadioGroup from '@teamshares/shoelace/dist/react/radio-group';

const App = () => (
  <SlRadioGroup label="Select an option" name="a" value="1">
    <SlRadioButton value="1">
      <SlIcon slot="prefix" name="archive-box" />
      Option 1
    </SlRadioButton>

    <SlRadioButton value="2">
      <SlIcon slot="suffix" name="shopping-bag" />
      Option 2
    </SlRadioButton>

    <SlRadioButton value="3">
      <SlIcon slot="prefix" name="gift" />
      <SlIcon slot="suffix" name="shopping-cart" />
      Option 3
    </SlRadioButton>
  </SlRadioGroup>
);
```

### Buttons with Icons

You can omit button labels and use icons instead. Make sure to set a `label` attribute on each icon so screen readers will announce each option correctly.

```html:preview
<sl-radio-group label="Select an option" name="a" value="neutral">
  <sl-radio-button value="angry">
    <sl-icon library="fa" name="face-angry" label="Angry"></sl-icon>
  </sl-radio-button>

  <sl-radio-button value="sad">
    <sl-icon library="fa" name="face-frown" label="Sad"></sl-icon>
  </sl-radio-button>

  <sl-radio-button value="neutral">
    <sl-icon library="fa" name="face-meh" label="Neutral"></sl-icon>
  </sl-radio-button>

  <sl-radio-button value="happy">
    <sl-icon library="fa" name="face-smile" label="Happy"></sl-icon>
  </sl-radio-button>

  <sl-radio-button value="laughing">
    <sl-icon library="fa" name="face-laugh" label="Laughing"></sl-icon>
  </sl-radio-button>
</sl-radio-group>
```

```pug:slim
sl-radio-group label="Select an option" name="a" value="neutral"
  sl-radio-button value="angry"
    sl-icon library="fa" name="face-angry" label="Angry"
  sl-radio-button value="sad"
    sl-icon library="fa" name="face-frown" label="Sad"
  sl-radio-button value="neutral"
    sl-icon library="fa" name="face-meh" label="Neutral"
  sl-radio-button value="happy"
    sl-icon library="fa" name="face-smile" label="Happy"
  sl-radio-button value="laughing"
    sl-icon library="fa" name="face-laugh" label="Laughing"
```

```jsx:react
import SlIcon from '@teamshares/shoelace/dist/react/icon';
import SlRadioButton from '@teamshares/shoelace/dist/react/radio-button';
import SlRadioGroup from '@teamshares/shoelace/dist/react/radio-group';

const App = () => (
  <SlRadioGroup label="Select an option" name="a" value="neutral">
    <SlRadioButton value="angry">
      <SlIcon name="emoji-angry" label="Angry" library="bootstrap" />
    </SlRadioButton>

    <SlRadioButton value="sad">
      <SlIcon name="emoji-frown" label="Sad" library="bootstrap" />
    </SlRadioButton>

    <SlRadioButton value="neutral">
      <SlIcon name="emoji-neutral" label="Neutral" library="bootstrap" />
    </SlRadioButton>

    <SlRadioButton value="happy">
      <SlIcon name="emoji-smile" label="Happy" library="bootstrap" />
    </SlRadioButton>

    <SlRadioButton value="laughing">
      <SlIcon name="emoji-laughing" label="Laughing" library="bootstrap" />
    </SlRadioButton>
  </SlRadioGroup>
);
```
