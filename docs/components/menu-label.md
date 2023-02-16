# Menu Label

[component-header:sl-menu-label]

```html preview
<sl-menu style="max-width: 200px;">
  <sl-menu-label>Fruits</sl-menu-label>
  <sl-menu-item value="apple">Apple</sl-menu-item>
  <sl-menu-item value="banana">Banana</sl-menu-item>
  <sl-menu-item value="orange">Orange</sl-menu-item>
  <sl-divider></sl-divider>
  <sl-menu-label>Vegetables</sl-menu-label>
  <sl-menu-item value="broccoli">Broccoli</sl-menu-item>
  <sl-menu-item value="carrot">Carrot</sl-menu-item>
  <sl-menu-item value="zucchini">Zucchini</sl-menu-item>
</sl-menu>
```

```pug slim
sl-menu style="max-width: 200px;"
  sl-menu-label Fruits
  sl-menu-item value="apple" Apple
  sl-menu-item value="banana" Banana
  sl-menu-item value="orange" Orange
  sl-divider
  sl-menu-label Vegetables
  sl-menu-item value="broccoli" Broccoli
  sl-menu-item value="carrot" Carrot
  sl-menu-item value="zucchini" Zucchini
```

```jsx react
import { SlDivider, SlMenu, SlMenuLabel, SlMenuItem } from '@teamshares/shoelace/dist/react';

const App = () => (
  <SlMenu style={{ maxWidth: '200px' }}>
    <SlMenuLabel>Fruits</SlMenuLabel>
    <SlMenuItem value="apple">Apple</SlMenuItem>
    <SlMenuItem value="banana">Banana</SlMenuItem>
    <SlMenuItem value="orange">Orange</SlMenuItem>
    <SlDivider />
    <SlMenuLabel>Vegetables</SlMenuLabel>
    <SlMenuItem value="broccoli">Broccoli</SlMenuItem>
    <SlMenuItem value="carrot">Carrot</SlMenuItem>
    <SlMenuItem value="zucchini">Zucchini</SlMenuItem>
  </SlMenu>
);
```

[component-metadata:sl-menu-label]
