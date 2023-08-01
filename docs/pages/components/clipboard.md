---
meta:
  title: Clipboard
  description: Enables you to save content into the clipboard providing visual feedback.
layout: component
---

```html:preview
<p>Clicking the clipboard button will put "shoelace rocks" into your clipboard</p>
<sl-clipboard value="shoelace rocks"></sl-clipboard>
```

```jsx:react
import { SlClipboard } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    <p>Clicking the clipboard button will put "shoelace rocks" into your clipboard</p>
    <SlClipboard value="shoelace rocks"></SlClipboard>
  </>
);
```

## Examples

### Use your own button

```html:preview
<sl-clipboard value="shoelace rocks">
  <button type="button">Copy to clipboard</button>
  <button slot="copied">Copied</button>
  <button slot="error">Error</button>
</sl-clipboard>
<br>
<sl-clipboard value="shoelace rocks">
  <sl-button>Copy</sl-button>
  <sl-button slot="copied">Copied</sl-button>
  <sl-button slot="error">Error</sl-button>
</sl-clipboard>
```

```jsx:react
import { SlClipboard } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    <SlClipboard value="shoelace rocks">
      <button type="button">Copy to clipboard</button>
      <div slot="copied">copied</div>
      <button slot="error">Error</button>
    </SlClipboard>
    <SlClipboard value="shoelace rocks">
      <sl-button>Copy</sl-button>
      <sl-button slot="copied">Copied</sl-button>
      <sl-button slot="error">Error</sl-button>
    </SlClipboard>
  </>
);
```

### Get the textValue from a different element

```html:preview
<div class="row">
  <dl>
    <dt>Phone Number</dt>
    <dd id="phone-value">+1 234 456789</dd>
  </dl>
  <sl-clipboard for="phone-value"></sl-clipboard>
</div>

<style>
  dl, .row {
    display: flex;
    margin: 0;
  }
</style>
```

```jsx:react
import { SlClipboard } from '@shoelace-style/shoelace/dist/react';

const css = `
  dl, .row {
    display: flex;
    margin: 0;
  }
`;

const App = () => (
  <>
    <div class="row">
      <dl>
        <dt>Phone Number</dt>
        <dd id="phone-value">+1 234 456789</dd>
      </dl>
      <SlClipboard for="phone-value"></SlClipboard>
    </div>

    <style>{css}</style>
  </>
);
```

### Error if copy fails

For example if a `for` target element is not found or if not using `https`.
An empty string value like `value=""` will also result in an error.

```html:preview
<sl-clipboard for="not-found"></sl-clipboard>
<br>
<sl-clipboard for="not-found">
  <sl-button>Copy</sl-button>
  <sl-button slot="copied">Copied</sl-button>
  <sl-button slot="error">Error</sl-button>
</sl-clipboard>
```

```jsx:react
import { SlClipboard } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    <SlClipboard for="not-found"></SlClipboard>
    <SlClipboard for="not-found">
      <sl-button>Copy</sl-button>
      <sl-button slot="copied">Copied</sl-button>
      <sl-button slot="error">Error</sl-button>
    </SlClipboard>
  </>
);
```

### Change duration of reset to copy button

```html:preview
<sl-clipboard value="shoelace rocks" reset-timeout="500"></sl-clipboard>
```

```jsx:react
import { SlClipboard } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    <SlClipboard value="shoelace rocks" reset-timeout="500"></SlClipboard>
  </>
);
```

## Disclaimer

The public API is partially inspired by https://github.com/github/clipboard-copy-element
