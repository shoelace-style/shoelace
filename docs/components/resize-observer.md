# Resize Observer

[component-header:sl-resize-observer]

Resize observers offer a thin, declarative interface to the [`ResizeObserver API`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).

The resize observer will report changes to the dimensions of the elements it wraps through the `sl-resize` event. When emitted, a collection of [`ResizeObserverEntry`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry) objects will be attached to `event.detail`, containing the target element and information about its dimensions.

```html preview
<div class="resize-observer-overview">
  <sl-resize-observer>
    <div>
      Resize this box and watch the console 👉
    </div>
  </sl-resize-observer>
</div>

<script>
  const container = document.querySelector('.resize-observer-overview');
  const resizeObserver = container.querySelector('sl-resize-observer');

  resizeObserver.addEventListener('sl-resize', event => {
    console.log(event);
  });
</script>

<style>
  .resize-observer-overview div {
    display: flex; 
    border: solid 2px var(--sl-input-border-color); 
    align-items: center; 
    justify-content: center;
    text-align: center;
    padding: 4rem 2rem;
  }
</style>
```

[component-metadata:sl-resize-observer]
