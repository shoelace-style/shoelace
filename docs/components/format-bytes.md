# Format Bytes

[component-header:sl-format-bytes]

Formats a number as a human readable bytes value.

```html preview
<div class="format-bytes-overview">
  The file is <sl-format-bytes value="1000"></sl-format-bytes> in size.
  <br><br>
  <sl-input type="number" value="1000" label="Number to Format" style="max-width: 180px;"></sl-input>  
</div>

<script>
  const container = document.querySelector('.format-bytes-overview');
  const formatter = container.querySelector('sl-format-bytes');
  const input = container.querySelector('sl-input');

  input.addEventListener('sl-input', () => formatter.value = input.value || 0);
</script>
```


```jsx react
import { useState } from 'react';
import { 
  SlButton, 
  SlFormatBytes, 
  SlInput 
} from '@shoelace-style/shoelace/dist/react';

const App = () => {
  const [value, setValue] = useState(1000);

  return (
    <>
      The file is <SlFormatBytes value={value} /> in size.
      <br /><br />
      <SlInput 
        type="number" 
        value={value}
        label="Number to Format" 
        style={{ maxWidth: '180px' }}
        onSlInput={event => setValue(event.target.value)}
      />
    </>
  );
};
```

## Examples

### Formatting Bytes

Set the `value` attribute to a number to get the value in bytes.

```html preview
<sl-format-bytes value="12"></sl-format-bytes><br>
<sl-format-bytes value="1200"></sl-format-bytes><br>
<sl-format-bytes value="1200000"></sl-format-bytes><br>
<sl-format-bytes value="1200000000"></sl-format-bytes>
```


```jsx react
import { SlFormatBytes } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    <SlFormatBytes value="12" /><br />
    <SlFormatBytes value="1200" /><br />
    <SlFormatBytes value="1200000" /><br />
    <SlFormatBytes value="1200000000" />
  </>
);
```

### Formatting Bits

To get the value in bits, set the `unit` attribute to `bits`.

```html preview
<sl-format-bytes value="12" unit="bits"></sl-format-bytes><br>
<sl-format-bytes value="1200" unit="bits"></sl-format-bytes><br>
<sl-format-bytes value="1200000" unit="bits"></sl-format-bytes><br>
<sl-format-bytes value="1200000000" unit="bits"></sl-format-bytes>
```

```jsx react
import { SlFormatBytes } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    <SlFormatBytes value="12" unit="bits" /><br />
    <SlFormatBytes value="1200" unit="bits" /><br />
    <SlFormatBytes value="1200000" unit="bits" /><br />
    <SlFormatBytes value="1200000000" unit="bits" />
  </>
);
```

### Localization

Use the `lang` attribute to set the number formatting locale.

```html preview
<sl-format-bytes value="12" lang="de"></sl-format-bytes><br>
<sl-format-bytes value="1200" lang="de"></sl-format-bytes><br>
<sl-format-bytes value="1200000" lang="de"></sl-format-bytes><br>
<sl-format-bytes value="1200000000" lang="de"></sl-format-bytes>
```

```jsx react
import { SlFormatBytes } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    <SlFormatBytes value="12" lang="de" /><br />
    <SlFormatBytes value="1200" lang="de" /><br />
    <SlFormatBytes value="1200000" lang="de" /><br />
    <SlFormatBytes value="1200000000" lang="de" />
  </>
);
```

[component-metadata:sl-format-bytes]
