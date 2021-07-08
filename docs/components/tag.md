# Tag

[component-header:sl-tag]

Tags are used as labels to organize things or to indicate a selection.

```html preview
<sl-tag type="primary">Primary</sl-tag>
<sl-tag type="success">Success</sl-tag>
<sl-tag type="info">Info</sl-tag>
<sl-tag type="warning">Warning</sl-tag>
<sl-tag type="danger">Danger</sl-tag>
```

## Examples

### Sizes

Use the `size` attribute to change a tab's size.

```html preview
<sl-tag size="small">Small</sl-tag>
<sl-tag size="medium">Medium</sl-tag>
<sl-tag size="large">Large</sl-tag>
```

### Pill

Use the `pill` attribute to give tabs rounded edges.

```html preview
<sl-tag size="small" pill>Small</sl-tag>
<sl-tag size="medium" pill>Medium</sl-tag>
<sl-tag size="large" pill>Large</sl-tag>
```

### Clearable

Use the `clearable` attribute to add a clear button to the tag.

```html preview
<div class="tags-clearable">
  <sl-tag size="small" clearable>Small</sl-tag>
  <sl-tag size="medium" clearable>Medium</sl-tag>
  <sl-tag size="large" clearable>Large</sl-tag>
</div>

<script>
  const div = document.querySelector('.tags-clearable');

  div.addEventListener('sl-clear', event => {
    const tag = event.target;
    tag.style.opacity = '0';
    setTimeout(() => tag.style.opacity = '1', 2000);
  });
</script>

<style>
  .tags-clearable sl-tag {
    transition: var(--sl-transition-medium) opacity;
  }
</style>
```

[component-metadata:sl-tag]
