---
meta:
  title: Menu Label
  description: Menu labels are used to describe a group of menu items.
layout: component
---

## Examples

### Basic Menu Label

```html:preview
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

```pug:slim
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

{% raw %}

```jsx:react
import SlDivider from '@teamshares/shoelace/dist/react/divider';
import SlMenu from '@teamshares/shoelace/dist/react/menu';
import SlMenuLabel from '@teamshares/shoelace/dist/react/menu-label';
import SlMenuItem from '@teamshares/shoelace/dist/react/menu-item';

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

{% endraw %}
