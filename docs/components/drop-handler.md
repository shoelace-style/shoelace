# Drop Handler

[component-header:sl-drop-handler]

A Drop Handler is an area into which items can be dragged and dropped to accomplish a task by using the HTML Drag and
Drop API. The component itself provides no visual indication, but any content placed within will be interactive.

```html preview
<sl-drop-handler>
  <div class="drop-handler">Place your content here</div>
</sl-drop-handler>
<style>
  .drop-handler {
    padding: 1rem 1.5rem;
    border: 1px dashed gray;
    border-radius: 16px;
  }
  sl-drop-handler[dragged] .drop-handler {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-50);
  }
</style>
```

```jsx react
const css = `
  .drop-handler {
    padding: 1rem 1.5rem;
    border: 1px dashed gray;
    border-radius: 16px;
  }
  sl-drop-handler[dragged] .drop-handler {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-50);
  }
`;
const App = () => {
  return (
    <>
      <SLDropHandler>
        <div>Place your content here</div>
      </SLDropHandler>

      <style>{css}</style>
    </>
  );
};
```

## Examples

### Dragged

Use the `dragged` attribute to change the appearance of the content placed within the drop-handler when items are dragged
over the interactive area.

```html preview
<sl-drop-handler dragged>
  <div class="drop-handler">Place your content here</div>
</sl-drop-handler>
<style>
  .drop-handler {
    padding: 1rem 1.5rem;
    border: 1px dashed gray;
    border-radius: 16px;
  }
  sl-drop-handler[dragged] .drop-handler {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-50);
  }
</style>
```

```jsx react
const css = `
  .drop-handler {
    padding: 1rem 1.5rem;
    border: 1px dashed gray;
    border-radius: 16px;
  }
  sl-drop-handler[dragged] .drop-handler {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-50);
  }
`;
const App = () => {
  return (
    <>
      <SLDropHandler dragged>
        <div>Place your content here</div>
      </SLDropHandler>

      <style>{css}</style>
    </>
  );
};
```

### Event Handling

The drop-handler provides a set of events that the consuming component can respond to in order to upload files, provide
visual feedback and validate the elements dragged and dropped over the interactive area.

```html preview
<sl-drop-handler class="drop-handler-events">
  <div class="drop-handler drop-handler-message">No event dispatched</div>
</sl-drop-handler>
<style>
  .drop-handler {
    padding: 1rem 1.5rem;
    border: 1px dashed gray;
    border-radius: 16px;
  }
  sl-drop-handler[dragged] .drop-handler {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-50);
  }
</style>
<script>
  const dropHandler = document.querySelector('.drop-handler-events');
  const message = document.querySelector('.drop-handler-message');
  let currentEvent = null;

  function escapeHtml(html) {
    const div = document.createElement('span');
    div.textContent = html;
    return div.innerHTML;
  }

  function notify(event) {
    if (currentEvent !== event) {
      message.innerHTML = escapeHtml(`Dispatched event of type: ${event}`);
      currentEvent = event;
    }
  }

  dropHandler.addEventListener('sl-drag', () => notify('sl-drag'));
  dropHandler.addEventListener('sl-drag-leave', () => notify('sl-drag-leave'));
  dropHandler.addEventListener('sl-drag-over', () => notify('sl-drag-over'));
  dropHandler.addEventListener('sl-drop', () => notify('sl-drop'));
  dropHandler.addEventListener('sl-drop-end', () => notify('sl-drop-end'));
  dropHandler.addEventListener('sl-drop-enter', () => notify('sl-drop-enter'));
  dropHandler.addEventListener('sl-drop-start', () => notify('sl-drop-start'));
</script>
```

```jsx react
import { SLDropHandler } from '@sda-se/ocean-design-system/dist/react';

const css = `
  .drop-handler {
    padding: 1rem 1.5rem;
    border: 1px dashed gray;
    border-radius: 16px;
  }
  sl-drop-handler[dragged] .drop-handler {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-50);
  }
`;
const App = () => {
  const [currentEvent, setCurrentEvent] = useState('No event dispatched');

  function notify(event) {
    setTimeout(() => setCurrentEvent(event), 200);
  }

  return (
    <>
      <SLDropHandler
        onSlDrag={notify}
        onSlDragLeave={notify}
        onSlDragOver={notify}
        onSlDrop={notify}
        onSlDropEnd={notify}
        onSlDropEnter={notify}
        onSlDropStart={notify}
      >
        <div class="drop-handler drop-handler-message">Dispatched event of type: {currentEvent}</div>
      </SLDropHandler>

      <style>{css}</style>
    </>
  );
};
```

[component-metadata:sl-drop-handler]
