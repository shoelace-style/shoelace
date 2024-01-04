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

Use the `size` property to display the spinner in a pre-defined size.

:::warning
**Note:** If the pre-defined sizes don't work for your use case, you have the option to set a custom size for the spinner using the `customSize` property (also shown in the example below). Please check with the design team before using this option, so that the team can review the pattern and determine whether the existing size set should be updated.
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

### Track Width

The width of the spinner's track can be changed by setting the `--track-width` custom property.

:::warning
**Note:** Please check with the design team before using this option, so that the team can review the pattern and determine whether the spinner's default styling should be updated.
:::

```html:preview
<sl-spinner style="--track-width: 8px;" size="x-large"></sl-spinner>
```

```pug:slim
sl-spinner style="--track-width: 8px;" size="x-large"
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

### Color

The spinner's colors can be changed by setting the `--indicator-color` and `--track-color` custom properties.

:::warning
**Note:** Please check with the design team before using this option, so that the team can review the pattern and determine whether the spinner's default styling should be updated.
:::

```html:preview
<sl-spinner style="font-size: 3rem; --indicator-color: deeppink; --track-color: pink;"></sl-spinner>
```

```pug:slim
sl-spinner style="font-size: 3rem; --indicator-color: deeppink; --track-color: pink;"
```

{% raw %}

```jsx:react
import SlSpinner from '@teamshares/shoelace/dist/react/spinner';

const App = () => (
  <SlSpinner
    style={{
      fontSize: '3rem',
      '--indicator-color': 'deeppink',
      '--track-color': 'pink'
    }}
  />
);
```

{% endraw %}
