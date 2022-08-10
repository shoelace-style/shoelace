# File Upload

[component-header:sl-file-upload]

File Upload provides an area where files can be dragged and dropped onto from the Operating System to be uploaded or to be used for other tasks. It also provides a button to open a file dialog and select files from the file system. Per default the File Dropzone shows a list of all selected files below the dropzone.

```html preview
<sl-file-upload closable multiple></sl-file-upload>
```

```jsx react
import { SlFileUpload } from '@shoelace-style/shoelace/dist/react';

const App = () => <SlFileUpload closable multiple></SlFileUpload>;
```

## Examples

### Disabled

Set the `disabled` attribute to disable the element.

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
<sl-file-upload max-files="2" multiple></sl-file-upload>
```

```jsx react
import { SlFileUpload } from '@shoelace-style/shoelace/dist/react';

const App = () => <SlFileUpload max-files={2} multiple></SlFileUpload>;
```

### Accepted File Types

Set the `accept` attribute to set the accepted MIME-Type of the files. This attribute is consistent with the native file input. Visit the [MDN documentation for the accept attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept) for more information.

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

To upload a file, listen to the `sl-change` event and handle the received file. This example uses [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest), but the same could be achieved with axios or the fetch API.

```html preview
<sl-file-upload class="upload-file" multiple></sl-file-upload>

<script type="module">
  const fileUpload = document.querySelector('.upload-file');
  
  fileUpload.addEventListener('sl-change', event => {
    event.preventDefault();
    const fileInfo = event.detail;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080');
    xhr.setRequestHeader('Content-Type', fileInfo.file.type);
    xhr.send(fileInfo.file);
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
    const fileInfo = event.detail;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080');
    xhr.setRequestHeader('Content-Type', fileInfo.file.type);
    xhr.send(fileInfo.file);
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

### Upload Files and indicate loading

Set `loading` to `true` on the FileInfo object to add a loading indicator to the FileUploadItem.

```html preview
<sl-file-upload class="upload-file-loading" multiple></sl-file-upload>

<script type="module">
  const fileUpload = document.querySelector('.upload-file-loading');
  
  fileUpload.addEventListener('sl-change', async (event) => {
    event.preventDefault();
    const fileInfo = event.detail;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080/upload/');
    xhr.setRequestHeader('Content-Type', fileInfo.file.type);
    xhr.send(fileInfo.file);
    
    fileInfo.loading = true;
    
    setTimeout(() => {
        fileInfo.loading = false;
        fileUpload.requestUpdate();
    }, 3000)
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
    const fileInfo = event.detail;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080');
    xhr.setRequestHeader('Content-Type', fileInfo.file.type);
    xhr.send(fileInfo.file);

    fileInfo.loading = true;

    setTimeout(() => {
      fileInfo.loading = false;
      fileUpload.requestUpdate();
    }, 3000)
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

### Upload Files and handling Errors

To handle errors in a [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) the `upload.onerror` callback can be used.

```html preview
<sl-file-upload class="upload-file-errors" multiple></sl-file-upload>

<script type="module">
  const fileUpload = document.querySelector('.upload-file-errors');
  
  fileUpload.addEventListener('sl-change', async (event) => {
    event.preventDefault();
    const fileInfo = event.detail;
    const xhr = new XMLHttpRequest();
    
    xhr.upload.onerror = event => {
      console.error('error:', event)
      fileInfo.loading = false;
      fileInfo.warning = "Upload Failed";
      fileInfo.accepted = false;
      
      fileUpload.requestUpdate()
    };
    
    xhr.open('POST', 'http://localhost');
    xhr.setRequestHeader('Content-Type', fileInfo.file.type);
    xhr.send(fileInfo.file);

    fileInfo.loading = true;
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
    const fileInfo = event.detail;
    const xhr = new XMLHttpRequest();

    xhr.upload.onerror = event => {
      console.error('error:', event)
      fileInfo.loading = false;
      fileInfo.warning = "Upload Failed";
      fileInfo.accepted = false;

      fileUpload.requestUpdate()
    };

    xhr.open('POST', 'http://localhost');
    xhr.setRequestHeader('Content-Type', fileInfo.file.type);
    xhr.send(fileInfo.file);

    fileInfo.loading = true;
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

### Upload Files and update progress

The [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) provides an `upload.onprogress` callback that can be used to change the `progress` attribute on the FileInfo object.

```html preview
<sl-file-upload class="upload-file-progress" multiple></sl-file-upload>

<script type="module">
  const fileUpload = document.querySelector('.upload-file-progress');
  
  fileUpload.addEventListener('sl-change', async (event) => {
    event.preventDefault();
    const fileInfo = event.detail;
    const xhr = new XMLHttpRequest();
    
    xhr.upload.onprogress = event => {
      if (event.lengthComputable) {
        console.log('progress: ', (event.loaded / event.total) * 100);
        fileInfo.progress = (event.loaded / event.total) * 100;
        fileUpload.requestUpdate();
      }
    };
    
    xhr.upload.onload = event => {
      console.log('complete: ',event);
      fileInfo.loading = false;
      fileUpload.requestUpdate();
    };
    
    xhr.open('POST', 'http://localhost:8080/upload');
    var formData = new FormData();
    formData.append("file", fileInfo.file);
    xhr.send(formData);

    fileInfo.loading = true;
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
    const fileInfo = event.detail;
    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = event => {
      if (event.lengthComputable) {
        console.log('progress: ', (event.loaded / event.total) * 100);
        fileInfo.progress = (event.loaded / event.total) * 100;
        fileUpload.requestUpdate();
      }
    };

    xhr.upload.onload = event => {
      console.log('complete: ',event);
      fileInfo.loading = false;
      fileUpload.requestUpdate();
    };

    xhr.open('POST', 'http://localhost:8080/upload');
    var formData = new FormData();
    formData.append("file", fileInfo.file);
    xhr.send(formData);

    fileInfo.loading = true;
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

### Custom Image

Set the `image` slot to customize the appearance of the image within the dropzone.

```html preview
<sl-file-upload>
  <sl-qr-code slot="image" value="https://shoelace.style/"></sl-qr-code>
</sl-file-upload>
```

```jsx react
import { SlFileUpload, SlQrCode } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlFileUpload>
    <SlQrCode slot="image" value="https://shoelace.style/" />;
  </SlFileUpload>
);
```

### Custom Content

Set the `content` slot to customize the appearance of the dropzone.

```html preview
<sl-file-upload>
  <sl-card slot="label" class="card-footer">
    This card is a dropzone. You can drag all sorts of things in it!
    <div slot="footer">
      Footer
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
