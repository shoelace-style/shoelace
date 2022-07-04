# File Dropzone

[component-header:sl-file-dropzone]

File Dropzone provides an area where files can be dragged and dropped onto from the Operating System to be uploaded or to be used for other tasks. It also provides a button to open a file dialog and select files from the file system. Per default the File Dropzone shows a list of all selected files below the dropzone.

```html preview
<sl-file-dropzone closable max-files="5"></sl-file-dropzone>
```

```jsx react
import { SlFileDropzone } from '@shoelace-style/shoelace/dist/react';

const App = () => <SlFileDropzone closable max-files={5}></SlFileDropzone>;
```

## Examples

### Disabled

Set the `disabled` attribute to disable the dropzone.

```html preview
<sl-file-dropzone disabled></sl-file-dropzone>
```

```jsx react
import { SlFileDropzone } from '@shoelace-style/shoelace/dist/react';

const App = () => <SlFileDropzone disabled></SlFileDropzone>;
```

### Disabled Drag & Drop

Set the `no-drag` attribute to disable drag and drop.

```html preview
<sl-file-dropzone no-drag></sl-file-dropzone>
```

```jsx react
import { SlFileDropzone } from '@shoelace-style/shoelace/dist/react';

const App = () => <SlFileDropzone no-drag></SlFileDropzone>;
```

### Closable

Set the `closable` attribute to enable closing/removing of a file.

```html preview
<sl-file-dropzone closable></sl-file-dropzone>
```

```jsx react
import { SlFileDropzone } from '@shoelace-style/shoelace/dist/react';

const App = () => <SlFileDropzone closable></SlFileDropzone>;
```

### Hide Button

Set the `no-button` attribute to hide the button in the dropzone.

```html preview
<sl-file-dropzone no-button></sl-file-dropzone>
```

```jsx react
import { SlFileDropzone } from '@shoelace-style/shoelace/dist/react';

const App = () => <SlFileDropzone no-button></SlFileDropzone>;
```

### Button Only

Set the `button-only` attribute to show only a file input button instead of a dropzone.

```html preview
<sl-file-dropzone button-only></sl-file-dropzone>
```

```jsx react
import { SlFileDropzone } from '@shoelace-style/shoelace/dist/react';

const App = () => <SlFileDropzone button-only></SlFileDropzone>;
```

### Customizing Labels

Set the `label` and `button-label` attribute to override the default labels.

```html preview
<sl-file-dropzone
  label="Please combine all documents into one PDF file. The maximum file size is 3MB."
  button-label="Upload your CV or Resume"
></sl-file-dropzone>
```

```jsx react
import { SlFileDropzone } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlFileDropzone
    label="Please combine all documents into one PDF file. The maximum file size is 3MB."
    button-label="Upload your CV or Resume"
  ></SlFileDropzone>
);
```

### No File List

Set the `no-file-list` attribute to hide the file list.

```html preview
<sl-file-dropzone no-file-list></sl-file-dropzone>
```

```jsx react
import { SlDropzone } from '@shoelace-style/shoelace/dist/react';

const App = () => <SlDropzone no-file-list></SlDropzone>;
```

### Maximum File Size

Set the `max-file-size` attribute to set a maximum file size limit. The user will receive a warning, when the selected file is too large.

```html preview
<sl-file-dropzone max-file-size="100"></sl-file-dropzone>
```

```jsx react
import { SlDropzone } from '@shoelace-style/shoelace/dist/react';

const App = () => <SlDropzone max-file-size={100}></SlDropzone>;
```

### Maximum Number of Files

Set the `max-files` attribute to limit the number of files that can be added.

```html preview
<sl-file-dropzone max-files="2"></sl-file-dropzone>
```

```jsx react
import { SlDropzone } from '@shoelace-style/shoelace/dist/react';

const App = () => <SlDropzone max-files={2}></SlDropzone>;
```

### Accepted File Types

Set the `accepted` attribute to set the accepted MIME-Type of the files. This attribute is consistent with the native file input. Visit the [MDN documentation for the accept attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept) for more information.

```html preview
<sl-file-dropzone accept="image/*"></sl-file-dropzone>
```

```jsx react
import { SlDropzone } from '@shoelace-style/shoelace/dist/react';

const App = () => <SlDropzone accept="image/*"></SlDropzone>;
```

### Upload Files

Set the `url` attribute to upload the files to the specified URL.

```html preview
<sl-file-dropzone url="http://localhost:8080"></sl-file-dropzone>
```

```jsx react
import { SlDropzone } from '@shoelace-style/shoelace/dist/react';
const App = () => <SlDropzone url="http://localhost:8080"></SlDropzone>;
```

### Upload method

Set the `method` attribute to set the transfer method.

```html preview
<sl-file-dropzone url="http://localhost:8080" method="PUT"></sl-file-dropzone>
```

```jsx react
import { SlDropzone } from '@shoelace-style/shoelace/dist/react';

const App = () => <SlDropzone url="http://localhost:8080" method="PUT"></SlDropzone>;
```

### Upload headers

Set the `headers` property to define specific headers to be used for the file transfer.

```html preview
<sl-file-dropzone class="dropzone" url="http://localhost:8080"></sl-file-dropzone>

<script>
  const dropzone = document.querySelector('.dropzone');
  dropzone.headers = { 'My-Awesome-Header': 'header value' };
</script>
```

```jsx react
import { SlDropzone } from '@shoelace-style/shoelace/dist/react';

const headers = { 'My-Awesome-Header': 'header value' };

const App = () => <SlDropzone url="http://localhost:8080" headers={headers}></SlDropzone>;
```

### Custom Icon

Set the `icon` slot to customize the appearance of the icon within the dropzone.

```html preview
<sl-file-dropzone>
  <sl-qr-code slot="icon" value="https://shoelace.style/"></sl-qr-code>
</sl-file-dropzone>
```

```jsx react
import { SlDropzone, SlQrCode } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlDropzone>
    <SlQrCode slot="icon" value="https://shoelace.style/" />;
  </SlDropzone>
);
```

### Custom Content

Set the `content` slot to customize the appearance of the dropzone.

```html preview
<sl-file-dropzone>
  <sl-card slot="content" class="card-footer">
    This card is a dropzone. You can drag all sorts of things in it!
    <div slot="footer">
      <sl-rating></sl-rating>
    </div>
  </sl-card>
</sl-file-dropzone>

<style>
  .card-footer {
    max-width: 300px;
  }

  .card-footer [slot='footer'] {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
```

```jsx react
import { SlDropzone, SlCard, SlRating } from '@sda-se/ocean-design-system/dist/react';

const css = `
  .card-footer {
    max-width: 300px;
  }

  .card-footer [slot="footer"] {
    display: flex; 
    justify-content: space-between; 
    align-items: center;
  }
`;

const App = () => (
  <>
    <SlDropzone>
      <SlCard slot="content" className="card-footer">
        This card is a dropzone. You can drag all sorts of things in it!
        <div slot="footer">
          <SlRating></SlRating>
        </div>
      </SlCard>
    </SlDropzone>

    <style>{css}</style>
  </>
);
```

[component-metadata:sl-file-dropzone]
