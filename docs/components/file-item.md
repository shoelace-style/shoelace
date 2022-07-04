# File Item

[component-header:sl-file-item]

File items represent an uploaded file and provides information about file type, file size etc.

```html preview
<sl-file-item>
  filename_lorem_ipsum.jpg
  <sl-icon name="file-earmark" slot="icon"></sl-icon>
</sl-file-item>
```

```jsx react
import { SlFileItem } from '@sda-se/ocean-design-system/dist/react';
const App = () => <SlFileItem></SlFileItem>;
```

## Examples

### Closable

Add the `closable` attribute to show a close button that will hide the element.

```html preview
<sl-file-item closable>
  filename_lorem_ipsum.jpg
  <sl-icon name="file-earmark" slot="icon"></sl-icon>
</sl-file-item>
```

### Filesize

Set the `size` attribute to display the filesize of the item. The [Format Byte Component](/components/format-bytes) is used to convert the given bytes to a human-readable format.

```html preview
<sl-file-item size="120000">
  filename_lorem_ipsum.jpg
  <sl-icon name="file-earmark" slot="icon"></sl-icon>
</sl-file-item>
```

### Custom close button

The close button can be customized by using the `close-button` slot and by styling the `base` part.

```html preview
<sl-file-item closable>
  filename_lorem_ipsum.jpg
  <sl-icon-button name="trash" slot="close-button" class="icon-button-color"></sl-icon-button>
  <sl-icon name="file-earmark" slot="icon"></sl-icon>
</sl-file-item>

<style>
  .icon-button-color::part(base) {
    color: var(--sl-color-danger-500);
  }

  .icon-button-color::part(base):hover,
  .icon-button-color::part(base):focus {
    color: var(--sl-color-danger-600);
  }

  .icon-button-color::part(base):active {
    color: var(--sl-color-danger-400);
  }
</style>
```

### Loading

Show a loading bar by setting the `loading` attribute. Per default this will display a loading bar in an indeterminate state. The height of the element will be determined by whether the `size` attributes is set. This will ensure that the height of the item does not change when the file has finished loading.

```html preview
<sl-file-item loading closable size="120000">
  filename_lorem_ipsum.jpg
  <sl-icon name="file-earmark" slot="icon"></sl-icon>
</sl-file-item>
```

### Loading progress

Set the `progress` attribute to show the loading progress between `0` and `100`.

```html preview
<sl-file-item loading progress="40" closable size="120000" class="file-item">
  filename_lorem_ipsum.jpg
  <sl-icon name="file-earmark" slot="icon"></sl-icon>
</sl-file-item>

<br />

<sl-button circle class="subtract-button"><sl-icon name="dash" label="Decrease"></sl-icon></sl-button>
<sl-button circle class="add-button"><sl-icon name="plus" label="Increase"></sl-icon></sl-button>

<script>
  const fileItem = document.querySelector('.file-item');
  const subtractButton = document.querySelector('.subtract-button');
  const addButton = document.querySelector('.add-button');

  addButton.addEventListener('click', () => {
    const value = Math.min(100, fileItem.progress + 10);
    fileItem.progress = value;

    if (fileItem.progress === 100) {
      fileItem.loading = false;
    }
  });

  subtractButton.addEventListener('click', () => {
    const value = Math.max(0, fileItem.progress - 10);
    fileItem.progress = value;

    if (fileItem.progress < 100) {
      fileItem.loading = true;
    }
  });
</script>
```

### Loading label

Use the `label` attribute to label the loading bar and tell assistive devices how to announce it.

```html preview
<sl-file-item loading progress="20" label="Uploading File" closable>
  filename_lorem_ipsum.jpg
  <sl-icon name="file-earmark" slot="icon"></sl-icon>
</sl-file-item>
```

### Warning

Set the `warning` attribute to change the color of the element.

```html preview
<sl-file-item warning closable>
  File size exceeds 5MB limit
  <sl-icon name="exclamation-triangle" slot="icon"></sl-icon>
</sl-file-item>
```

[component-metadata:sl-file-item]
