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

### Copy an input/textarea or link

```html:preview
<input type="text" value="input rocks" id="input-rocks">
<sl-clipboard for="input-rocks"></sl-clipboard>
<br>

<textarea id="textarea-rocks">textarea
rocks</textarea>
<sl-clipboard for="textarea-rocks"></sl-clipboard>
<br>

<a href="https://shoelace.style/" id="link-rocks">Shoelace</a>
<sl-clipboard for="link-rocks"></sl-clipboard>
<br>

<sl-input value="sl-input rocks" id="sl-input-rocks"></sl-input>
<sl-clipboard for="sl-input-rocks"></sl-clipboard>
<br>

<sl-textarea value="sl-textarea rocks" id="sl-textarea-rocks"></sl-textarea>
<sl-clipboard for="sl-textarea-rocks"></sl-clipboard>
```

```jsx:react
import { SlClipboard } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    <input type="text" value="input rocks" id="input-rocks">
    <SlClipboard for="input-rocks"></SlClipboard>
    <br>
    <textarea id="textarea-rocks">textarea
rocks</textarea>
    <SlClipboard for="textarea-rocks"></SlClipboard>
    <br>
    <a href="https://shoelace.style/" id="link-rocks">Shoelace</a>
    <SlClipboard for="input-rocks"></SlClipboard>
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

### Supports Shadow Dom

```html:preview
<sl-copy-demo-el></sl-copy-demo-el>

<script>
  customElements.define('sl-copy-demo-el', class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
      this.shadowRoot.innerHTML = `
        <p id="copy-me">copy me (inside shadow root)</p>
        <sl-clipboard for="copy-me"></sl-clipboard>
      `;
    }
  });
</script>
```

```jsx:react
import { SlClipboard } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    <sl-copy-demo-el></sl-copy-demo-el>
  </>
);

customElements.define('sl-copy-demo-el', class extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <p id="copy-me">copy me (inside shadow root)</p>
      <sl-clipboard for="copy-me"></sl-clipboard>
    `;
  }
});
```

## Disclaimer

The public API is partially inspired by https://github.com/github/clipboard-copy-element
