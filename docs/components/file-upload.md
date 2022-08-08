# File Upload

[component-header:sl-file-upload]

File Dropzone provides an area where files can be dragged and dropped onto from the Operating System to be uploaded or to be used for other tasks. It also provides a button to open a file dialog and select files from the file system. Per default the File Dropzone shows a list of all selected files below the dropzone.

```html preview
<sl-file-upload closable max-files="5"></sl-file-upload>
```

```jsx react
import { SlFileUpload } from '@shoelace-style/shoelace/dist/react';

const App = () => <SlFileUpload closable max-files={5}></SlFileUpload>;
```

## Examples

### Disabled

Set the `disabled` attribute to disable the dropzone.

```html preview
<sl-file-upload disabled></sl-file-upload>
```

```jsx react
import { SlFileUpload } from '@shoelace-style/shoelace/dist/react';

const App = () => <SlFileUpload disabled></SlFileUpload>;
```

### Disabled Drag & Drop

Set the `no-drag` attribute to disable drag and drop.

```html preview
<sl-file-upload no-drag></sl-file-upload>
```

```jsx react
import { SlFileUpload } from '@shoelace-style/shoelace/dist/react';

const App = () => <SlFileUpload no-drag></SlFileUpload>;
```

### Closable

Set the `closable` attribute to enable closing/removing of a file.

```html preview
<sl-file-upload closable></sl-file-upload>
```

```jsx react
import { SlFileUpload } from '@shoelace-style/shoelace/dist/react';

const App = () => <SlFileUpload closable></SlFileUpload>;
```

### Hide Button

Set the `no-button` attribute to hide the button in the dropzone.

```html preview
<sl-file-upload no-button></sl-file-upload>
```

```jsx react
import { SlFileUpload } from '@shoelace-style/shoelace/dist/react';

const App = () => <SlFileUpload no-button></SlFileUpload>;
```

### Button Only

Set the `button-only` attribute to show only a file input button instead of a dropzone.

```html preview
<sl-file-upload button-only></sl-file-upload>
```

```jsx react
import { SlFileUpload } from '@shoelace-style/shoelace/dist/react';

const App = () => <SlFileUpload button-only></SlFileUpload>;
```

### Customizing Labels

Set the `label` and `button-label` attribute to override the default labels.

```html preview
<sl-file-upload
  label="Please combine all documents into one PDF file. The maximum file size is 3MB."
  button-label="Upload your CV or Resume"
></sl-file-upload>
```

```jsx react
import { SlFileUpload } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlFileUpload
    label="Please combine all documents into one PDF file. The maximum file size is 3MB."
    button-label="Upload your CV or Resume"
  ></SlFileUpload>
);
```

### Customizing Button

Use the `button` slot to customize the button appearance.

```html preview
<sl-file-upload>
  <sl-button variant="danger" slot="button">
    Custom Button
  </sl-button>
</sl-file-upload>
```

```jsx react
import { SlFileUpload } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlFileUpload
    label="Please combine all documents into one PDF file. The maximum file size is 3MB."
    button-label="Upload your CV or Resume"
  ></SlFileUpload>
);
```

### No File List

Set the `no-file-list` attribute to hide the file list.

```html preview
<sl-file-upload no-file-list></sl-file-upload>
```

```jsx react
import { SlFileUpload } from '@shoelace-style/shoelace/dist/react';

const App = () => <SlFileUpload no-file-list></SlFileUpload>;
```

### Maximum File Size

Set the `max-file-size` attribute to set a maximum file size limit. The user will receive a warning, when the selected file is too large.

```html preview
<sl-file-upload max-file-size="100"></sl-file-upload>
```

```jsx react
import { SlFileUpload } from '@shoelace-style/shoelace/dist/react';

const App = () => <SlFileUpload max-file-size={100}></SlFileUpload>;
```

### Maximum Number of Files

Set the `max-files` attribute to limit the number of files that can be added.

```html preview
<sl-file-upload max-files="2"></sl-file-upload>
```

```jsx react
import { SlFileUpload } from '@shoelace-style/shoelace/dist/react';

const App = () => <SlFileUpload max-files={2}></SlFileUpload>;
```

### Accepted File Types

Set the `accepted` attribute to set the accepted MIME-Type of the files. This attribute is consistent with the native file input. Visit the [MDN documentation for the accept attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept) for more information.

```html preview
<sl-file-upload accept="image/*"></sl-file-upload>
```

```jsx react
import { SlFileUpload } from '@shoelace-style/shoelace/dist/react';

const App = () => <SlFileUpload accept="image/*"></SlFileUpload>;
```

### Upload Files

Set the `url` attribute to upload the files to the specified URL.

```html preview
<sl-file-upload url="http://localhost:8080"></sl-file-upload>
```

```jsx react
import { SlFileUpload } from '@shoelace-style/shoelace/dist/react';
const App = () => <SlFileUpload url="http://localhost:8080"></SlFileUpload>;
```

### Upload method

Set the `method` attribute to set the transfer method.

```html preview
<sl-file-upload url="http://localhost:8080" method="PUT"></sl-file-upload>
```

```jsx react
import { SlFileUpload } from '@shoelace-style/shoelace/dist/react';

const App = () => <SlFileUpload url="http://localhost:8080" method="PUT"></SlFileUpload>;
```

### Upload headers

Set the `headers` property to define specific headers to be used for the file transfer.

```html preview
<sl-file-upload class="dropzone" url="http://localhost:8080"></sl-file-upload>

<script>
  const dropzone = document.querySelector('.dropzone');
  dropzone.headers = { 'My-Awesome-Header': 'header value' };
</script>
```

```jsx react
import { SlFileUpload } from '@shoelace-style/shoelace/dist/react';

const headers = { 'My-Awesome-Header': 'header value' };

const App = () => <SlFileUpload url="http://localhost:8080" headers={headers}></SlFileUpload>;
```

### Custom Icon

Set the `icon` slot to customize the appearance of the icon within the dropzone.

```html preview
<sl-file-upload>
  <sl-qr-code slot="icon" value="https://shoelace.style/"></sl-qr-code>
</sl-file-upload>
```

```jsx react
import { SlFileUpload, SlQrCode } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlFileUpload>
    <SlQrCode slot="icon" value="https://shoelace.style/" />;
  </SlFileUpload>
);
```

### Custom Content

Set the `content` slot to customize the appearance of the dropzone.

```html preview
<sl-file-upload>
  <sl-card slot="content" class="card-footer">
    This card is a dropzone. You can drag all sorts of things in it!
    <div slot="footer">
      <sl-rating></sl-rating>
    </div>
  </sl-card>
</sl-file-upload>

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
import { SlFileUpload, SlCard, SlRating } from '@sda-se/ocean-design-system/dist/react';

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
    <SlFileUpload>
      <SlCard slot="content" className="card-footer">
        This card is a dropzone. You can drag all sorts of things in it!
        <div slot="footer">
          <SlRating></SlRating>
        </div>
      </SlCard>
    </SlFileUpload>

    <style>{css}</style>
  </>
);
```

[component-metadata:sl-file-upload]
