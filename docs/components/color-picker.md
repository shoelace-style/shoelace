# Color Picker

[component-header:sl-color-picker]

Color pickers allow the user to select a color.

```html preview
<sl-color-picker></sl-color-picker>
```

```jsx react
import { SlColorPicker } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlColorPicker />
);
```

## Examples

### Opacity

Use the `opacity` attribute to enable the opacity slider. When this is enabled, the value will be displayed as HEXA, RGBA, or HSLA based on `format`.

```html preview
<sl-color-picker opacity></sl-color-picker>
```

```jsx react
import { SlColorPicker } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlColorPicker opacity />
);
```

### Formats

Set the color picker's format with the `format` attribute. Valid options include `hex`, `rgb`, and `hsl`. Note that the color picker's input will accept any parsable format (including CSS color names) regardless of this option.

To prevent users from toggling the format themselves, add the `no-format-toggle` attribute.

```html preview
<sl-color-picker format="hex" value="#4a90e2"></sl-color-picker>
<sl-color-picker format="rgb" value="rgb(80, 227, 194)"></sl-color-picker>
<sl-color-picker format="hsl" value="hsl(290, 87%, 47%)"></sl-color-picker>
```

```jsx react
import { SlColorPicker } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    <SlColorPicker format="hex" value="#4a90e2" />
    <SlColorPicker format="rgb" value="rgb(80, 227, 194)" />
    <SlColorPicker format="hsl" value="hsl(290, 87%, 47%)" />
  </>
);
```

### Sizes

Use the `size` attribute to change the color picker's trigger size.

```html preview
<sl-color-picker size="small"></sl-color-picker>
<sl-color-picker size="medium"></sl-color-picker>
<sl-color-picker size="large"></sl-color-picker>
```

```jsx react
import { SlColorPicker } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    <SlColorPicker size="small" />
    <SlColorPicker size="medium" />
    <SlColorPicker size="large" />
  </>
);
```

### Inline

The color picker can be rendered inline instead of in a dropdown using the `inline` attribute.

```html preview
<sl-color-picker inline></sl-color-picker>
```

```jsx react
import { SlColorPicker } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlColorPicker inline />
);
```

[component-metadata:sl-color-picker]
