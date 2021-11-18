# Resize Observer

[component-header:sl-resize-observer]

The Resize Observer component offers a thin, declarative interface to the [`ResizeObserver API`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).

The resize observer will report changes to the dimensions of the elements it wraps through the `sl-resize` event. When emitted, a collection of [`ResizeObserverEntry`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry) objects will be attached to `event.detail` that contains the target element and information about its dimensions.

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
    console.log(event.detail);
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

```jsx react
import { SlResizeObserver } from '@shoelace-style/shoelace/dist/react';

const css = `
  .resize-observer-overview div {
    display: flex; 
    border: solid 2px var(--sl-input-border-color); 
    align-items: center; 
    justify-content: center;
    text-align: center;
    padding: 4rem 2rem;
  }
`;

const App = () => (
  <>
    <div className="resize-observer-overview">
      <SlResizeObserver onSlResize={event => console.log(event.detail)}>
        <div>
          Resize this box and watch the console 👉
        </div>
      </SlResizeObserver>
    </div>

    <style>{css}</style>
  </>
);
```

[component-metadata:sl-resize-observer]
