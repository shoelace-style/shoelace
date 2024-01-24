---
meta:
  title: Spinner
  description: Spinners are used to show the progress of an indeterminate operation.
layout: component
---

## Examples

### Basic Spinner

By default a spinner inherits its parent element's font size.

```html:preview
<sl-spinner></sl-spinner>
<div style="font-size: 32px;">
  <sl-spinner></sl-spinner>
</div>
```

```pug:slim
sl-spinner
div style="font-size: 32px;"
  sl-spinner
```

```jsx:react
import SlSpinner from '@teamshares/shoelace/dist/react/spinner';

const App = () => <SlSpinner />;
```

### Size

Use the `size` property to display the spinner in one of 4 pre-defined sizes: `small` (16px), `medium` (32px), `large` (48px), and `x-large` (64px).

:::warning
**Note:** If the pre-defined sizes don't work for your use case, you can set a custom size using the `customSize` property (as shown in the example below). Please consult the design team before using this option, so that the team can review the pattern and determine whether the existing size set should be updated.
:::

```html:preview
<sl-spinner size="small"></sl-spinner>
<sl-spinner size="medium"></sl-spinner>
<sl-spinner size="large"></sl-spinner>
<sl-spinner size="x-large"></sl-spinner>
<sl-spinner customSize="88px"></sl-spinner>
```

```pug:slim
sl-spinner size="small"
sl-spinner size="medium"
sl-spinner size="large"
sl-spinner size="x-large"
sl-spinner customSize="88px"
```

{% raw %}

```jsx:react
import SlSpinner from '@teamshares/shoelace/dist/react/spinner';

const App = () => (
  <>
    <SlSpinner />
    <SlSpinner style={{ fontSize: '2rem' }} />
    <SlSpinner style={{ fontSize: '3rem' }} />
  </>
);
```

{% endraw %}

### Styling the Spinner

The spinner's track width, track color, and indicator color can be customized with the `--track-width`, `--track-color`, and `--indicator-color` custom properties.

:::warning
**Note:** In general, you shouldn’t need to do this. If you are working on a design that requires custom styling, please ensure that there’s not a standard spinner in the design system that would work instead. If you really do need a non-standard spinner, please consult the design team before implementing a custom spinner, so that the team can determine whether the existing pattern should be updated.
:::

```html:preview
<sl-spinner style="--track-width: 8px; --indicator-color: teal; --track-color: paleturquoise;" size="x-large"></sl-spinner>
```

```pug:slim
sl-spinner style="--track-width: 8px; --indicator-color: teal; --track-color: paleturquoise;" size="x-large"
```

{% raw %}

```jsx:react
import SlSpinner from '@teamshares/shoelace/dist/react/spinner';

const App = () => (
  <SlSpinner
    style={{
      fontSize: '3rem',
      '--track-width': '6px'
    }}
  />
);
```

{% endraw %}
