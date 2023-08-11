---
meta:
  title: Menu Label
  description: Menu labels are used to describe a group of menu items.
layout: component
---

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

{% raw %}

```jsx:react
import SlDivider from '@shoelace-style/shoelace/dist/react/divider';
import SlMenu from '@shoelace-style/shoelace/dist/react/menu';
import SlMenuLabel from '@shoelace-style/shoelace/dist/react/menu-label';
import SlMenuItem from '@shoelace-style/shoelace/dist/react/menu-item';

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
