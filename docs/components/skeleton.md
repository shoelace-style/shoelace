# Skeleton

[component-header:sl-skeleton]

Skeletons are used to show where content will eventually be drawn.

These are simple containers for scaffolding layouts that mimic what users will see when content has finished loading. This prevents large areas of empty space during asynchronous operations.

Skeletons try not to be opinionated, as there are endless possibilities for designing layouts. Therefore, you'll likely use more than one skeleton to create the effect you want. If you find yourself using them frequently, consider creating a template that renders them with the desired arrangement and styles.

```html preview
<div class="skeleton-overview">
  <header>
    <sl-skeleton></sl-skeleton>
    <sl-skeleton></sl-skeleton>
  </header>

  <sl-skeleton></sl-skeleton>
  <sl-skeleton></sl-skeleton>
  <sl-skeleton></sl-skeleton>
</div>

<style>
  .skeleton-overview header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  .skeleton-overview header sl-skeleton:last-child {
    flex: 0 0 auto;
    width: 30%;
  }

  .skeleton-overview sl-skeleton {
    margin-bottom: 1rem;
  }

  .skeleton-overview sl-skeleton:nth-child(1) {
    float: left;
    width: 3rem;
    height: 3rem;
    margin-right: 1rem;
    vertical-align: middle;
  }

  .skeleton-overview sl-skeleton:nth-child(3) {
    width: 95%;
  }

  .skeleton-overview sl-skeleton:nth-child(4) {
    width: 80%;
  }
</style>
```

## Examples

### Effects

The default effect is `sheen`, which animates a sheen horizontally across the skeleton. There's also `pulse`, which fades the skeleton in and out. To disable animations, use `none`. Effects are intentionally subtle, as they can be distracting otherwise.

```html preview
<div class="skeleton-effects">
  <sl-skeleton effect="sheen"></sl-skeleton>
  Sheen

  <sl-skeleton effect="pulse"></sl-skeleton>
  Pulse

  <sl-skeleton effect="none"></sl-skeleton>
  None
</div>

<style>
  .skeleton-effects {
    font-size: var(--sl-font-size-small);
  }

  .skeleton-effects sl-skeleton:not(:first-child) {
    margin-top: 1rem;
  }
</style>
```

### Paragraphs

Use multiple skeletons and some clever styles to simulate paragraphs.

```html preview
<div class="skeleton-paragraphs">
  <sl-skeleton></sl-skeleton>
  <sl-skeleton></sl-skeleton>
  <sl-skeleton></sl-skeleton>
  <sl-skeleton></sl-skeleton>
  <sl-skeleton></sl-skeleton>
</div>

<style>
  .skeleton-paragraphs sl-skeleton {
    margin-bottom: 1rem;
  }

  .skeleton-paragraphs sl-skeleton:nth-child(2) {
    width: 95%;
  }

  .skeleton-paragraphs sl-skeleton:nth-child(4) {
    width: 90%;
  }

  .skeleton-paragraphs sl-skeleton:last-child {
    width: 50%;
  }
</style>
```

### Avatars

Set a matching width and height to make a circle, square, or rounded avatar skeleton.

```html preview
<div class="skeleton-avatars">
  <sl-skeleton></sl-skeleton>
  <sl-skeleton></sl-skeleton>
  <sl-skeleton></sl-skeleton>
</div>

<style>
  .skeleton-avatars sl-skeleton {
    display: inline-block;
    width: 3rem;
    height: 3rem;
    margin-right: .5rem;
  }

  .skeleton-avatars sl-skeleton:nth-child(1) {
    --border-radius: 0;
  }
  
  .skeleton-avatars sl-skeleton:nth-child(2) {
    --border-radius: var(--sl-border-radius-medium);
  }
</style>
```

### Custom Shapes

Use the `--border-radius` custom property to make circles, squares, and rectangles. For more complex shapes, you can apply `clip-path` to the `indicator` part. [Try Clippy](https://bennettfeely.com/clippy/) if you need help generating custom shapes.

```html preview
<div class="skeleton-shapes">
  <sl-skeleton class="square"></sl-skeleton>
  <sl-skeleton class="circle"></sl-skeleton>
  <sl-skeleton class="triangle"></sl-skeleton>
  <sl-skeleton class="cross"></sl-skeleton>
  <sl-skeleton class="comment"></sl-skeleton>
</div>

<style>
  .skeleton-shapes sl-skeleton {
    display: inline-flex;
    width: 50px;
    height: 50px;
  }

  .skeleton-shapes .square::part(indicator) {
    --border-radius: var(--sl-border-radius-medium);
  }

  .skeleton-shapes .circle::part(indicator) {
    --border-radius: var(--sl-border-radius-circle);
  }

  .skeleton-shapes .triangle::part(indicator) {
    --border-radius: 0;
    clip-path: polygon(50% 0, 0 100%, 100% 100%);
  }

  .skeleton-shapes .cross::part(indicator) {
    --border-radius: 0;
    clip-path: polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%);
  }

  .skeleton-shapes .comment::part(indicator) {
    --border-radius: 0;
    clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%);
  }

  .skeleton-shapes sl-skeleton:not(:last-child) {
    margin-right: .5rem;
  }
</style>
```

### Custom Colors

Set the `--color` and `--sheen-color` custom properties to adjust the skeleton's color.

```html preview
<sl-skeleton style="--color: tomato; --sheen-color: #ffb094;"></sl-skeleton>
```

[component-metadata:sl-skeleton]
