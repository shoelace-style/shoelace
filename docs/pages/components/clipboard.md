---
meta:
  title: Clipboard
  description: Enables you to save content into the clipboard providing visual feedback.
layout: component
---

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

## Examples

### Providing directly a text value

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

## Disclaimer

The public API is partially inspired by https://github.com/github/clipboard-copy-element
