# Tag

[component-header:sl-tag]

```html preview
<sl-tag variant="blue">Blue</sl-tag>
<sl-tag variant="green">Green</sl-tag>
<sl-tag variant="gray">Gray</sl-tag>
<sl-tag variant="yellow">Yellow</sl-tag>
<sl-tag variant="red">Red</sl-tag>
<sl-tag variant="teal">Teal</sl-tag>
<sl-tag variant="fuchsia">Fuchsia</sl-tag>
<sl-tag variant="purple">Purple</sl-tag>
```

```pug slim
sl-tag variant="blue" Blue
sl-tag variant="green" Green
sl-tag variant="gray" Gray
sl-tag variant="yellow" Yellow
sl-tag variant="red" Red
sl-tag variant="teal" Teal
sl-tag variant="fuchsia" Fuchsia
sl-tag variant="purple" Purple
```

```jsx react
import { SlTag } from '@teamshares/shoelace/dist/react';

const App = () => (
  <>
    <SlTag variant="blue">Blue</SlTag>
    <SlTag variant="green">Green</SlTag>
    <SlTag variant="gray">Gray</SlTag>
    <SlTag variant="yellow">Yellow</SlTag>
    <SlTag variant="red">Red</SlTag>
    <SlTag variant="teal">Teal</SlTag>
    <SlTag variant="fuchsia">Fuchsia</SlTag>
    <SlTag variant="purple">Purple</SlTag>
  </>
);
```

## Examples

### Sizes

Use the `size` attribute to change a tag's size.

```html preview
<sl-tag size="small">Small</sl-tag>
<sl-tag size="medium">Medium</sl-tag>
<sl-tag size="large">Large</sl-tag>
```

```pug slim
sl-tag size="small" Small
sl-tag size="medium" Medium
sl-tag size="large" Large
```

```jsx react
import { SlTag } from '@teamshares/shoelace/dist/react';

const App = () => (
  <>
    <SlTag size="small">Small</SlTag>
    <SlTag size="medium">Medium</SlTag>
    <SlTag size="large">Large</SlTag>
  </>
);
```

### Semantic variants

A selection of tag colors also map to semantic variants: `primary` (blue), `success` (green), `neutral` (gray), `warning` (yellow), `danger` (red).

```html preview
<sl-tag variant="primary">Primary</sl-tag>
<sl-tag variant="success">Success</sl-tag>
<sl-tag variant="neutral">Neutral</sl-tag>
<sl-tag variant="warning">Warning</sl-tag>
<sl-tag variant="danger">Danger</sl-tag>
```

```pug slim
sl-tag variant="primary" Primary
sl-tag variant="success" Success
sl-tag variant="neutral" Neutral
sl-tag variant="warning" Warning
sl-tag variant="danger" Danger
```

```jsx react
import { SlTag } from '@teamshares/shoelace/dist/react';

const App = () => (
  <>
    <SlTag variant="primary">Primary</SlTag>
    <SlTag variant="success">Success</SlTag>
    <SlTag variant="neutral">Neutral</SlTag>
    <SlTag variant="warning">Warning</SlTag>
    <SlTag variant="danger">Danger</SlTag>
  </>
);
```

### Pill

Use the `pill` attribute to give tags rounded edges. This variant is very similar to the pill button. Use only when there's little risk of it being confused with a button.

```html preview
<sl-tag size="small" pill>Small</sl-tag>
<sl-tag size="medium" pill>Medium</sl-tag>
<sl-tag size="large" pill>Large</sl-tag>
```

```pug slim
sl-tag size="small" pill="true" Small
sl-tag size="medium" pill="true" Medium
sl-tag size="large" pill="true" Large
```

```jsx react
import { SlTag } from '@teamshares/shoelace/dist/react';

const App = () => (
  <>
    <SlTag size="small" pill>
      Small
    </SlTag>
    <SlTag size="medium" pill>
      Medium
    </SlTag>
    <SlTag size="large" pill>
      Large
    </SlTag>
  </>
);
```

### Removable

Use the `removable` attribute to add a remove button to the tag.

```html preview
<div class="tags-removable">
  <sl-tag size="small" removable>Small</sl-tag>
  <sl-tag size="medium" removable>Medium</sl-tag>
  <sl-tag size="large" removable>Large</sl-tag>
</div>

<script>
  const div = document.querySelector('.tags-removable');

  div.addEventListener('sl-remove', event => {
    const tag = event.target;
    tag.style.opacity = '0';
    setTimeout(() => (tag.style.opacity = '1'), 2000);
  });
</script>

<style>
  .tags-removable sl-tag {
    transition: var(--sl-transition-medium) opacity;
  }
</style>
```

```pug slim
div.tags-removable
  sl-tag size="small" removable="true" Small
  sl-tag size="medium" removable="true" Medium
  sl-tag size="large" removable="true" Large

javascript:
  const div = document.querySelector(.tags-removable);

  div.addEventListener(sl-remove, event => {
    const tag = event.target;
    tag.style.opacity = 0;
    setTimeout(() => (tag.style.opacity = 1), 2000);
  });

css:
  .tags-removable sl-tag {
    transition: var(--sl-transition-medium) opacity;
  }
```

```jsx react
import { SlTag } from '@teamshares/shoelace/dist/react';

const css = `
  .tags-removable sl-tag {
    transition: var(--sl-transition-medium) opacity;
  }
`;

const App = () => {
  function handleRemove(event) {
    const tag = event.target;
    tag.style.opacity = '0';
    setTimeout(() => (tag.style.opacity = '1'), 2000);
  }

  return (
    <>
      <div className="tags-removable">
        <SlTag size="small" removable onSlRemove={handleRemove}>
          Small
        </SlTag>

        <SlTag size="medium" removable onSlRemove={handleRemove}>
          Medium
        </SlTag>

        <SlTag size="large" removable onSlRemove={handleRemove}>
          Large
        </SlTag>
      </div>

      <style>{css}</style>
    </>
  );
};
```

[component-metadata:sl-tag]
