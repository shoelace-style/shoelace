# File Upload

[component-header:sl-file-upload]

File Dropzone provides an area where files can be dragged and dropped onto from the Operating System to be uploaded or to be used for other tasks. It also provides a button to open a file dialog and select files from the file system. Per default the File Dropzone shows a list of all selected files below the dropzone.

```html preview
<sl-file-upload closable multiple></sl-file-upload>
```

```jsx react
import { SlFileUpload } from '@shoelace-style/shoelace/dist/react';

const App = () => <SlFileUpload closable multiple></SlFileUpload>;
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

Set the `max-files` attribute to limit the number of files that can be added. Only works together with the `multiple` attribute.

```html preview
<sl-file-upload max-files="2"></sl-file-upload>
```

```jsx react
import { SlFileUpload } from '@shoelace-style/shoelace/dist/react';

const App = () => <SlFileUpload max-files={2} multiple></SlFileUpload>;
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

### Form Usage with FormData

The FileUpload component can be used inside a form as a replacement for `<input type="file">`. The files can be accessed using FormData. See [Form Control documentation](../getting-started/form-controls.md) for more details. 

```html preview
<form class="file-upload">
  <sl-file-upload name="sl-file-upload" multiple></sl-file-upload>
  <br />
  <input type="file" name="native-input" multiple></input>
  <br />
  <sl-button type="reset" variant="default">Reset</sl-button>
  <sl-button type="submit" variant="primary">Submit</sl-button>
</form>

<script type="module">
  const form = document.querySelector('.file-upload');
  
  form.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(form);
    console.log(formData.getAll('native-input'), formData.getAll('sl-file-upload'));
  });
</script>
```

```jsx react
import { useRef } from 'react';
import { SlFileUpload, SlButton } from '@shoelace-style/shoelace/dist/react';

const App = () => {
  const form = useRef(null);
  
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);
    console.log(formData.getAll('native-input'), formData.getAll('sl-file-upload'));
  }

  return (
    <form onSubmit={handleSubmit} ref={form}>
      <SlFileUpload name="sl-file-upload" multiple></SlFileUpload>
      <br />
      <input type="file" name="native-input" multiple></input>
      <br />
      <SlButton type="reset" variant="default">Reset</SlButton>
      <SlButton type="submit" variant="primary">Submit</SlButton>
    </form>
  );
};
```

### Form Usage with JSON

The FileUpload component can be used inside a form as a replacement for `<input type="file">`. The files can be serialized using JSON. See [Form Control documentation](../getting-started/form-controls.md) for more details. 

```html preview
<form class="file-upload-json">
  <sl-file-upload name="sl-file-upload" multiple></sl-file-upload>
  <br />
  <input type="file" name="native-input" multiple></input>
  <br />
  <sl-button type="reset" variant="default">Reset</sl-button>
  <sl-button type="submit" variant="primary">Submit</sl-button>
</form>

<script type="module">
  import { serialize } from '../dist/utilities/form.js';

  const form = document.querySelector('.file-upload-json');
  
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = serialize(form);
    console.log(data);
  });
</script>
```

```jsx react
import { useRef } from 'react';
import { SlFileUpload, SlButton } from '@shoelace-style/shoelace/dist/react';
import { serialize } from '../dist/utilities/form.js';

const App = () => {
  const form = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();
    const data = serialize(form);
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit} ref={form}>
      <SlFileUpload name="sl-file-upload" multiple></SlFileUpload>
      <br />
      <input type="file" name="native-input" multiple></input>
      <br />
      <SlButton type="reset" variant="default">Reset</SlButton>
      <SlButton type="submit" variant="primary">Submit</SlButton>
    </form>
  );
};
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
