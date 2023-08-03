---
meta:
  title: Copy
  description: Copies data to the clipboard when the user clicks or taps the trigger.
layout: component
---

```html:preview
<sl-copy value="Shoelace rocks!"></sl-copy>
```

```jsx:react
import { SlCopy } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlCopy value="Shoelace rocks!"></SlCopy>
);
```

## Examples

### Custom Buttons

Use the default slot to customize the copy trigger. You can also customize the success and error messages using the respective slots.

```html:preview
<sl-copy value="Copied from a custom button" class="custom-buttons">
  <sl-button>Copy</sl-button>
  <sl-button slot="success">Copied!</sl-button>
  <sl-button slot="error">Error</sl-button>
</sl-copy>
```

```jsx:react
import { SlButton, SlCopy } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    <SlCopy value="Copied from a custom button">
      <SlButton>Copy</SlButton>
      <SlButton slot="success">Copied!</SlButton>
      <SlButton slot="error">Error</SlButton>
    </SlCopy>
  </>
);
```

### Copying the Value From Other Elements

By default, the data to copy will come from the `value` attribute. You

```html:preview
<span id="phone-number">+1 (234) 456-7890</span>
<sl-copy from="phone-number"></sl-copy>

<br><br>

<sl-input type="text" value="Just an input" id="my-input" style="display: inline-block; max-width: 300px;"></sl-input>
<sl-copy from="my-input"></sl-copy>

<br><br>

<a href="https://shoelace.style/" id="my-link">Shoelace Website</a>
<sl-copy from="my-link"></sl-copy>
```

```jsx:react
import { SlCopy, SlInput } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    <span id="phone-number">+1 (234) 456-7890</span>
    <SlCopy from="phone-number" />

    <br /><br />

    <SlInput type="text" value="Just an input" id="my-input" style="display: inline-block; max-width: 300px;" />
    <SlCopy from="my-input" />

    <br /><br />

    <a href="https://shoelace.style/" id="my-link">Shoelace Website</a>
    <SlCopy from="my-link" />
  </>
);
```

### Displaying Copy Errors

Copy errors can occur if the value is an empty string, if the `from` attribute points to an id that doesn't exist, or if the browser rejects the operation. You can customize the error that's shown by populating the `error` slot with your own content.

```html:preview
<sl-copy from="not-found"></sl-copy>

<br><br>

<sl-copy from="not-found">
  <sl-button>Copy</sl-button>
  <sl-button slot="success">Copied</sl-button>
  <sl-button slot="error">Error</sl-button>
</sl-copy>
```

```jsx:react
import { SlCopy } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    <SlCopy from="not-found"></SlCopy>

    <br /><br />

    <SlCopy from="not-found">
      <sl-button>Copy</sl-button>
      <sl-button slot="success">Copied</sl-button>
      <sl-button slot="error">Error</sl-button>
    </SlCopy>
  </>
);
```

### Showing Tooltips

You can wrap a tooltip around `<sl-copy>` to provide a hint to users.

```html:preview
<sl-tooltip content="Copy to clipboard">
  <sl-copy value="Shoelace rocks!"></sl-copy>
</sl-tooltip>
```

```jsx:react
import { SlCopy, SlTooltip } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlTooltip content="Copy to clipboard">
    <SlCopy value="Shoelace rocks!" />
  </SlTooltip>
);
```

### Changing Feedback Duration

A success indicator is briefly shown after copying. You can customize the length of time the indicator is shown using the `feedback-duration` attribute.

```html:preview
<sl-copy value="Shoelace rocks!" feedback-duration="250"></sl-copy>
```

```jsx:react
import { SlCopy } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlCopy value="Shoelace rocks!" feedback-duration={250} />
);
```
