# Menu Item

[component-header:sl-menu-item]

```html preview
<sl-menu style="max-width: 200px;">
  <sl-menu-item>Option 1</sl-menu-item>
  <sl-menu-item>Option 2</sl-menu-item>
  <sl-menu-item>Option 3</sl-menu-item>
  <sl-divider></sl-divider>
  <sl-menu-item type="checkbox" checked>Checkbox</sl-menu-item>
  <sl-menu-item disabled>Disabled</sl-menu-item>
  <sl-divider></sl-divider>
  <sl-menu-item>
    Prefix Icon
    <sl-icon slot="prefix" name="gift"></sl-icon>
  </sl-menu-item>
  <sl-menu-item>
    Suffix Icon
    <sl-icon slot="suffix" name="heart"></sl-icon>
  </sl-menu-item>
</sl-menu>
```

```jsx react
import { SlDivider, SlIcon, SlMenu, SlMenuItem } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlMenu style={{ maxWidth: '200px' }}>
    <SlMenuItem>Option 1</SlMenuItem>
    <SlMenuItem>Option 2</SlMenuItem>
    <SlMenuItem>Option 3</SlMenuItem>
    <SlDivider />
    <SlMenuItem type="checkbox" checked>
      Checkbox
    </SlMenuItem>
    <SlMenuItem disabled>Disabled</SlMenuItem>
    <SlDivider />
    <SlMenuItem>
      Prefix Icon
      <SlIcon slot="prefix" name="gift" />
    </SlMenuItem>
    <SlMenuItem>
      Suffix Icon
      <SlIcon slot="suffix" name="heart" />
    </SlMenuItem>
  </SlMenu>
);
```

## Examples

### Disabled

Add the `disabled` attribute to disable the menu item so it cannot be selected.

```html preview
<sl-menu style="max-width: 200px;">
  <sl-menu-item>Option 1</sl-menu-item>
  <sl-menu-item disabled>Option 2</sl-menu-item>
  <sl-menu-item>Option 3</sl-menu-item>
</sl-menu>
```

```jsx react
import { SlMenu, SlMenuItem } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlMenu style={{ maxWidth: '200px' }}>
    <SlMenuItem>Option 1</SlMenuItem>
    <SlMenuItem disabled>Option 2</SlMenuItem>
    <SlMenuItem>Option 3</SlMenuItem>
  </SlMenu>
);
```

### Prefix & Suffix

Add content to the start and end of menu items using the `prefix` and `suffix` slots.

```html preview
<sl-menu style="max-width: 200px;">
  <sl-menu-item>
    <sl-icon slot="prefix" name="house"></sl-icon>
    Home
  </sl-menu-item>

  <sl-menu-item>
    <sl-icon slot="prefix" name="envelope"></sl-icon>
    Messages
    <sl-badge slot="suffix" variant="primary" pill>12</sl-badge>
  </sl-menu-item>

  <sl-divider></sl-divider>

  <sl-menu-item>
    <sl-icon slot="prefix" name="gear"></sl-icon>
    Settings
  </sl-menu-item>
</sl-menu>
```

```jsx react
import { SlBadge, SlDivider, SlIcon, SlMenu, SlMenuItem } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlMenu style={{ maxWidth: '200px' }}>
    <SlMenuItem>
      <SlIcon slot="prefix" name="house" />
      Home
    </SlMenuItem>

    <SlMenuItem>
      <SlIcon slot="prefix" name="envelope" />
      Messages
      <SlBadge slot="suffix" variant="primary" pill>
        12
      </SlBadge>
    </SlMenuItem>

    <SlDivider />

    <SlMenuItem>
      <SlIcon slot="prefix" name="gear" />
      Settings
    </SlMenuItem>
  </SlMenu>
);
```

### Checkbox Menu Items

Set the `type` attribute to `checkbox` to create a menu item that will toggle on and off when selected. You can use the `checked` attribute to set the initial state.

Checkbox menu items are visually indistinguishable from regular menu items. Their ability to be toggled is primarily inferred from context, much like you'd find in the menu of a native app.

```html preview
<sl-menu style="max-width: 200px;">
  <sl-menu-item type="checkbox">Autosave</sl-menu-item>
  <sl-menu-item type="checkbox" checked>Check Spelling</sl-menu-item>
  <sl-menu-item type="checkbox">Word Wrap</sl-menu-item>
</sl-menu>
```

```jsx react
import { SlMenu, SlMenuItem } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlMenu style={{ maxWidth: '200px' }}>
    <SlMenuItem type="checkbox">Autosave</SlMenuItem>
    <SlMenuItem type="checkbox" checked>
      Check Spelling
    </SlMenuItem>
    <SlMenuItem type="checkbox">Word Wrap</SlMenuItem>
  </SlMenu>
);
```

### Value & Selection

The `value` attribute can be used to assign a hidden value, such as a unique identifier, to a menu item. When an item is selected, the `sl-select` event will be emitted and a reference to the item will be available at `event.detail.item`. You can use this reference to access the selected item's value, its checked state, and more.

```html preview
<sl-menu class="menu-value" style="max-width: 200px;">
  <sl-menu-item value="opt-1">Option 1</sl-menu-item>
  <sl-menu-item value="opt-2">Option 2</sl-menu-item>
  <sl-menu-item value="opt-3">Option 3</sl-menu-item>
  <sl-divider></sl-divider>
  <sl-menu-item type="checkbox" value="opt-4">Checkbox 4</sl-menu-item>
  <sl-menu-item type="checkbox" value="opt-5">Checkbox 5</sl-menu-item>
  <sl-menu-item type="checkbox" value="opt-6">Checkbox 6</sl-menu-item>
</sl-menu>

<script>
  const menu = document.querySelector('.menu-value');

  menu.addEventListener('sl-select', event => {
    const item = event.detail.item;

    // Log value
    if (item.type === 'checkbox') {
      console.log(`Selected value: ${item.value} (${item.checked ? 'checked' : 'unchecked'})`);
    } else {
      console.log(`Selected value: ${item.value}`);
    }
  });
</script>
```

```jsx react
import { SlMenu, SlMenuItem } from '@shoelace-style/shoelace/dist/react';

const App = () => {
  function handleSelect(event) {
    const item = event.detail.item;

    // Toggle checked state
    item.checked = !item.checked;

    // Log value
    console.log(`Selected value: ${item.value}`);
  }

  return (
    <SlMenu style={{ maxWidth: '200px' }} onSlSelect={handleSelect}>
      <SlMenuItem value="opt-1">Option 1</SlMenuItem>
      <SlMenuItem value="opt-2">Option 2</SlMenuItem>
      <SlMenuItem value="opt-3">Option 3</SlMenuItem>
    </SlMenu>
  );
};
```

[component-metadata:sl-menu-item]
