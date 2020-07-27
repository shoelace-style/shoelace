# Skeleton

[component-header:sl-skeleton]

Skeletons are used to show where content will eventually be drawn.

```html preview
<div class="skeleton-overview">
  <sl-skeleton loading></sl-skeleton>
  <sl-skeleton loading></sl-skeleton>
  <sl-skeleton loading></sl-skeleton>
</div>

<style>
  .skeleton-overview sl-skeleton {
    margin-bottom: 1rem;
  }

  .skeleton-overview sl-skeleton:nth-child(2) {
    width: 95%;
  }

  .skeleton-overview sl-skeleton:last-child {
    width: 60%;
  }
</style>
```

[component-metadata:sl-skeleton]
