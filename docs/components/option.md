# Option

[component-header:sl-option]

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
  <SlSelect>
    <SlOption value="option-1">Option 1</SlOption>
    <SlOption value="option-2">Option 2</SlOption>
    <SlOption value="option-3">Option 3</SlOption>
  </SlSelect>
);
```

## Examples

### Disabled

Use the `disabled` attribute to disable an option and prevent it from being selected.

```html preview
<sl-select label="Select one">
  <sl-option value="option-1">Option 1</sl-option>
  <sl-option value="option-2" disabled>Option 2</sl-option>
  <sl-option value="option-3">Option 3</sl-option>
</sl-select>
```

```jsx react
import { SlOption, SlSelect } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlSelect>
    <SlOption value="option-1">Option 1</SlOption>
    <SlOption value="option-2" disabled>
      Option 2
    </SlOption>
    <SlOption value="option-3">Option 3</SlOption>
  </SlSelect>
);
```

### Prefix & Suffix

Add icons to the start and end of menu items using the `prefix` and `suffix` slots.

```html preview
<sl-select label="Select one">
  <sl-option value="option-1">
    <sl-icon slot="prefix" name="envelope"></sl-icon>
    Email
    <sl-icon slot="suffix" name="patch-check"></sl-icon>
  </sl-option>

  <sl-option value="option-2">
    <sl-icon slot="prefix" name="telephone"></sl-icon>
    Phone
    <sl-icon slot="suffix" name="patch-check"></sl-icon>
  </sl-option>

  <sl-option value="option-3">
    <sl-icon slot="prefix" name="chat-dots"></sl-icon>
    Chat
    <sl-icon slot="suffix" name="patch-check"></sl-icon>
  </sl-option>
</sl-select>
```

[component-metadata:sl-option]
