---
meta:
  title: Divider
  description: Dividers are used to visually separate or group elements.
layout: component
---

```html:preview
<sl-divider></sl-divider>
```

```jsx:react
import SlDivider from '@shoelace-style/shoelace/dist/react/divider';

const App = () => <SlDivider />;
```

## Examples

### Width

Use the `--width` custom property to change the width of the divider.

```html:preview
<sl-divider style="--width: 4px;"></sl-divider>
```

{% raw %}

```jsx:react
import SlDivider from '@shoelace-style/shoelace/dist/react/divider';

const App = () => <SlDivider style={{ '--width': '4px' }} />;
```

{% endraw %}

### Color

Use the `--color` custom property to change the color of the divider.

```html:preview
<sl-divider style="--color: tomato;"></sl-divider>
```

{% raw %}

```jsx:react
import SlDivider from '@shoelace-style/shoelace/dist/react/divider';

const App = () => <SlDivider style={{ '--color': 'tomato' }} />;
```

{% endraw %}

### Spacing

Use the `--spacing` custom property to change the amount of space between the divider and it's neighboring elements.

```html:preview
<div style="text-align: center;">
  Above
  <sl-divider style="--spacing: 2rem;"></sl-divider>
  Below
</div>
```

{% raw %}

```jsx:react
import SlDivider from '@shoelace-style/shoelace/dist/react/divider';

const App = () => (
  <>
    Above
    <SlDivider style={{ '--spacing': '2rem' }} />
    Below
  </>
);
```

{% endraw %}

### Vertical

Add the `vertical` attribute to draw the divider in a vertical orientation. The divider will span the full height of its container. Vertical dividers work especially well inside of a flex container.

```html:preview
<div style="display: flex; align-items: center; height: 2rem;">
  First
  <sl-divider vertical></sl-divider>
  Middle
  <sl-divider vertical></sl-divider>
  Last
</div>
```

{% raw %}

```jsx:react
import SlDivider from '@shoelace-style/shoelace/dist/react/divider';

const App = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      height: '2rem'
    }}
  >
    First
    <SlDivider vertical />
    Middle
    <SlDivider vertical />
    Last
  </div>
);
```

{% endraw %}

### Menu Dividers

Use dividers in [menus](/components/menu) to visually group menu items.

```html:preview
<sl-menu style="max-width: 200px;">
  <sl-menu-item value="1">Option 1</sl-menu-item>
  <sl-menu-item value="2">Option 2</sl-menu-item>
  <sl-menu-item value="3">Option 3</sl-menu-item>
  <sl-divider></sl-divider>
  <sl-menu-item value="4">Option 4</sl-menu-item>
  <sl-menu-item value="5">Option 5</sl-menu-item>
  <sl-menu-item value="6">Option 6</sl-menu-item>
</sl-menu>
```

{% raw %}

```jsx:react
import SlDivider from '@shoelace-style/shoelace/dist/react/divider';
import SlMenu from '@shoelace-style/shoelace/dist/react/menu';
import SlMenuItem from '@shoelace-style/shoelace/dist/react/menu-item';

const App = () => (
  <SlMenu style={{ maxWidth: '200px' }}>
    <SlMenuItem value="1">Option 1</SlMenuItem>
    <SlMenuItem value="2">Option 2</SlMenuItem>
    <SlMenuItem value="3">Option 3</SlMenuItem>
    <sl-divider />
    <SlMenuItem value="4">Option 4</SlMenuItem>
    <SlMenuItem value="5">Option 5</SlMenuItem>
    <SlMenuItem value="6">Option 6</SlMenuItem>
  </SlMenu>
);
```

{% endraw %}
