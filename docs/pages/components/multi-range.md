---
meta:
  title: Multi-Range
  description: Multi-Ranges allow the user to select multiple values within a given range using a slider with multiple handles.
layout: component
---

```html:preview
<sl-multi-range></sl-multi-range>
```

```jsx:react
import SlRange from '@shoelace-style/shoelace/dist/react/multi-range';

const App = () => <SlRange />;
```

## Examples

### Custom Track Colors

You can customize the active and inactive portions of the track using the `--track-color-active` and `--track-color-inactive` custom properties.

```html:preview
<sl-multi-range
	value="[25,75]"
	style="
		--track-color-active: var(--sl-color-primary-300);
		--track-color-inactive: var(--sl-color-neutral-200);
	"
></sl-multi-range>
```

{% raw %}

```jsx:react
import SlRange from '@shoelace-style/shoelace/dist/react/multi-range';

const App = () => <SlRange value={[25,75]} style={{
	'--track-color-active': 'var(--sl-color-primary-300)',
	'--track-color-inactive': 'var(--sl-color-neutral-200)'
}}/>;
```

{% endraw %}

### Min, Max, and Step

Use the `min` and `max` attributes to set the range's minimum and maximum values, respectively. The `step` attribute determines the value's interval when increasing and decreasing.

```html:preview
<sl-multi-range min="1" max="10" step="1" value="[0,10]"></sl-multi-range>
```

{% raw %}

```jsx:react
import SlRange from '@shoelace-style/shoelace/dist/react/multi-range';

const App = () => <SlRange min={1} max={10} step={1} value={[0,10]}/>;
```

{% endraw %}

### Disabled

Use the `disabled` attribute to disable a slider.

```html:preview
<sl-multi-range disabled></sl-multi-range>
```

```jsx:react
import SlRange from '@shoelace-style/shoelace/dist/react/multi-range';

const App = () => <SlRange disabled />;
```

### Arbitrary Number of Handles

You can use any number of handles on the slider. The slider will have one handle for every element in the value array.

```html:preview
<sl-multi-range
	value="[25,50,75]"
	style="
		--track-color-active: var(--sl-color-primary-300);
		--track-color-inactive: var(--sl-color-neutral-200);
	"
></sl-multi-range>
```

{% raw %}

```jsx:react
import SlRange from '@shoelace-style/shoelace/dist/react/multi-range';

const App = () => <SlRange value={[25,50,75]} style={{
	'--track-color-active': 'var(--sl-color-primary-300)',
	'--track-color-inactive': 'var(--sl-color-neutral-200)'
}}/>;
```

{% endraw %}

### Label and Help Text

You can add an accessible label and/or descriptive help text using the `label` and `help-text` attributes or slots.

```html:preview
<sl-multi-range label="Difficulty Range" help-text="Search for challenges within the desired difficulty range"></sl-multi-range>
```

```jsx:react
import SlRange from '@shoelace-style/shoelace/dist/react/multi-range';

const App = () => <SlRange label="Difficulty Range" help-text"Search for challenges within the desired difficulty range" />;
```
