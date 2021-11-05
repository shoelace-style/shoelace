# Tag

[component-header:sl-tag]

Tags are used as labels to organize things or to indicate a selection.

```html preview
<sl-tag type="primary">Primary</sl-tag>
<sl-tag type="success">Success</sl-tag>
<sl-tag type="neutral">Neutral</sl-tag>
<sl-tag type="warning">Warning</sl-tag>
<sl-tag type="danger">Danger</sl-tag>
```


```jsx react
import { SlTag } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    <SlTag type="primary">Primary</SlTag>
    <SlTag type="success">Success</SlTag>
    <SlTag type="neutral">Neutral</SlTag>
    <SlTag type="warning">Warning</SlTag>
    <SlTag type="danger">Danger</SlTag> 
  </>
);
```

## Examples

### Sizes

Use the `size` attribute to change a tab's size.

```html preview
<sl-tag size="small">Small</sl-tag>
<sl-tag size="medium">Medium</sl-tag>
<sl-tag size="large">Large</sl-tag>
```

```jsx react
import { SlTag } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    <SlTag size="small">Small</SlTag>
    <SlTag size="medium">Medium</SlTag>
    <SlTag size="large">Large</SlTag>
  </>
);
```

### Pill

Use the `pill` attribute to give tabs rounded edges.

```html preview
<sl-tag size="small" pill>Small</sl-tag>
<sl-tag size="medium" pill>Medium</sl-tag>
<sl-tag size="large" pill>Large</sl-tag>
```

```jsx react
import { SlTag } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    <SlTag size="small" pill>Small</SlTag>
    <SlTag size="medium" pill>Medium</SlTag>
    <SlTag size="large" pill>Large</SlTag>
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
    setTimeout(() => tag.style.opacity = '1', 2000);
  });
</script>

<style>
  .tags-removable sl-tag {
    transition: var(--sl-transition-medium) opacity;
  }
</style>
```

```jsx react
import { SlTag } from '@shoelace-style/shoelace/dist/react';

const css = `
  .tags-removable sl-tag {
    transition: var(--sl-transition-medium) opacity;
  }
`;

const App = () => {
  function handleRemove(event) {
    const tag = event.target;
    tag.style.opacity = '0';
    setTimeout(() => tag.style.opacity = '1', 2000);
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
  )
};
```

[component-metadata:sl-tag]
