---
meta:
  title: Progress Ring
  description: Progress rings are used to show the progress of a determinate operation in a circular fashion.
layout: component
---

## Examples

### Basic Progress Ring

```html:preview
<sl-progress-ring value="25"></sl-progress-ring>
```

```pug:slim
sl-progress-ring value="25"
```

```jsx:react
import SlProgressRing from '@teamshares/shoelace/dist/react/progress-ring';

const App = () => <SlProgressRing value="25" />;
```

### Size

Use the `--size` custom property to set the diameter of the progress ring.

```html:preview
<sl-progress-ring value="50" style="--size: 200px;"></sl-progress-ring>
```

```pug:slim
sl-progress-ring value="50" style="--size: 200px;"
```

{% raw %}

```jsx:react
import SlProgressRing from '@teamshares/shoelace/dist/react/progress-ring';

const App = () => <SlProgressRing value="50" style={{ '--size': '200px' }} />;
```

{% endraw %}

### Track and Indicator Width

Use the `--track-width` and `--indicator-width` custom properties to set the width of the progress ring's track and indicator.

```html:preview
<sl-progress-ring value="50" style="--track-width: 6px; --indicator-width: 12px;"></sl-progress-ring>
```

```pug:slim
sl-progress-ring value="50" style="--track-width: 6px; --indicator-width: 12px;"
```

{% raw %}

```jsx:react
import SlProgressRing from '@teamshares/shoelace/dist/react/progress-ring';

const App = () => <SlProgressRing value="50" style={{ '--track-width': '6px', '--indicator-width': '12px' }} />;
```

{% endraw %}

### Colors

To change the color, use the `--track-color` and `--indicator-color` custom properties.

```html:preview
<sl-progress-ring
  value="50"
  style="
    --track-color: pink;
    --indicator-color: deeppink;
  "
></sl-progress-ring>
```

```pug:slim
sl-progress-ring value="50" style="--track-color: pink; --indicator-color: deeppink;"
```

{% raw %}

```jsx:react
import SlProgressRing from '@teamshares/shoelace/dist/react/progress-ring';

const App = () => (
  <SlProgressRing
    value="50"
    style={{
      '--track-color': 'pink',
      '--indicator-color': 'deeppink'
    }}
  />
);
```

{% endraw %}

### Labels

Use the `label` attribute to label the progress ring and tell assistive devices how to announce it.

```html:preview
<sl-progress-ring value="50" label="Upload progress"></sl-progress-ring>
```

```pug:slim
sl-progress-ring value="50" label="Upload progress"
```

```jsx:react
import SlProgressRing from '@teamshares/shoelace/dist/react/progress-ring';

const App = () => <SlProgressRing value="50" label="Upload progress" />;
```

### Showing Values

Use the default slot to show a label inside the progress ring.

```html:preview
<sl-progress-ring value="50" class="progress-ring-values" style="margin-bottom: .5rem;">50%</sl-progress-ring>

<br />

<sl-button circle><sl-icon name="minus" label="Decrease"></sl-icon></sl-button>
<sl-button circle><sl-icon name="plus" label="Increase"></sl-icon></sl-button>

<script>
  const progressRing = document.querySelector('.progress-ring-values');
  const subtractButton = progressRing.nextElementSibling.nextElementSibling;
  const addButton = subtractButton.nextElementSibling;

  addButton.addEventListener('click', () => {
    const value = Math.min(100, progressRing.value + 10);
    progressRing.value = value;
    progressRing.textContent = `${value}%`;
  });

  subtractButton.addEventListener('click', () => {
    const value = Math.max(0, progressRing.value - 10);
    progressRing.value = value;
    progressRing.textContent = `${value}%`;
  });
</script>
```

```pug:slim
sl-progress-ring.progress-ring-values value="50" style="margin-bottom: .5rem;" 50%
br
sl-button circle="true"
  sl-icon name="minus" label="Decrease"
sl-button circle="true"
  sl-icon name="plus" label="Increase"

javascript:
  const progressRing = document.querySelector(.progress-ring-values);
  const subtractButton = progressRing.nextElementSibling.nextElementSibling;
  const addButton = subtractButton.nextElementSibling;

  addButton.addEventListener(click, () => {
    const value = Math.min(100, progressRing.value + 10);
    progressRing.value = value;
    progressRing.textContent = `${value}%`;
  });

  subtractButton.addEventListener(click, () => {
    const value = Math.max(0, progressRing.value - 10);
    progressRing.value = value;
    progressRing.textContent = `${value}%`;
  });
```

{% raw %}

```jsx:react
import { useState } from 'react';
import SlButton from '@teamshares/shoelace/dist/react/button';
import SlIcon from '@teamshares/shoelace/dist/react/icon';
import SlProgressRing from '@teamshares/shoelace/dist/react/progress-ring';

const App = () => {
  const [value, setValue] = useState(50);

  function adjustValue(amount) {
    let newValue = value + amount;
    if (newValue < 0) newValue = 0;
    if (newValue > 100) newValue = 100;
    setValue(newValue);
  }

  return (
    <>
      <SlProgressRing value={value} style={{ marginBottom: '.5rem' }}>
        {value}%
      </SlProgressRing>

      <br />

      <SlButton circle onClick={() => adjustValue(-10)}>
        <SlIcon name="minus" label="Decrease" />
      </SlButton>

      <SlButton circle onClick={() => adjustValue(10)}>
        <SlIcon name="plus" label="Increase" />
      </SlButton>
    </>
  );
};
```

{% endraw %}
