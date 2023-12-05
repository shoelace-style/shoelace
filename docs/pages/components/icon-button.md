---
meta:
  title: Icon Button
  description: Icons buttons are simple, icon-only buttons that can be used for actions and in toolbars.
layout: component
---

## Examples

### Basic Icon Button

For a full list of icons that come bundled with Shoelace, refer to the [icon component](/components/icon).

```html:preview
<sl-icon-button name="cog-6-tooth" label="Settings"></sl-icon-button>
```

```pug:slim
sl-icon-button name="cog-6-tooth" label="Settings"
```

```jsx:react
import SlIconButton from '@teamshares/shoelace/dist/react/icon-button';

const App = () => <SlIconButton name="cog-6-tooth" label="Settings" />;
```

### Sizes

Icon buttons inherit their parent element's `font-size`.

```html:preview
<sl-icon-button name="pencil" label="Edit" style="font-size: 1.5rem;"></sl-icon-button>
<sl-icon-button name="pencil" label="Edit" style="font-size: 2rem;"></sl-icon-button>
<sl-icon-button name="pencil" label="Edit" style="font-size: 2.5rem;"></sl-icon-button>
```

```pug:slim
sl-icon-button name="pencil" label="Edit" style="font-size: 1.5rem;"
sl-icon-button name="pencil" label="Edit" style="font-size: 2rem;"
sl-icon-button name="pencil" label="Edit" style="font-size: 2.5rem;"
```

{% raw %}

```jsx:react
import SlIconButton from '@teamshares/shoelace/dist/react/icon-button';

const App = () => (
  <>
    <SlIconButton name="pencil" label="Edit" style={{ fontSize: '1.5rem' }} />
    <SlIconButton name="pencil" label="Edit" style={{ fontSize: '2rem' }} />
    <SlIconButton name="pencil" label="Edit" style={{ fontSize: '2.5rem' }} />
  </>
);
```

{% endraw %}

### Colors

Icon buttons are designed to have a uniform appearance, so their color is not inherited. However, you can still customize them by styling the `base` part.

```html:preview
<div class="icon-button-color">
  <sl-icon-button name="at-symbol" label="Bold"></sl-icon-button>
  <sl-icon-button name="bolt" label="Italic"></sl-icon-button>
  <sl-icon-button name="no-symbol" label="Underline"></sl-icon-button>
</div>

<style>
  .icon-button-color sl-icon-button::part(base) {
    color: #b00091;
  }

  .icon-button-color sl-icon-button::part(base):hover,
  .icon-button-color sl-icon-button::part(base):focus {
    color: #c913aa;
  }

  .icon-button-color sl-icon-button::part(base):active {
    color: #960077;
  }
</style>
```

```pug:slim
div.icon-button-color
  sl-icon-button name="at-symbol" label="Bold"
  sl-icon-button name="bolt" label="Italic"
  sl-icon-button name="no-symbol" label="Underline"

css:
  .icon-button-color sl-icon-button::part(base) {
    color: #b00091;
  }

  .icon-button-color sl-icon-button::part(base):hover,
  .icon-button-color sl-icon-button::part(base):focus {
    color: #c913aa;
  }

  .icon-button-color sl-icon-button::part(base):active {
    color: #960077;
  }
```

```jsx:react
import SlIconButton from '@teamshares/shoelace/dist/react/icon-button';

const css = `
  .icon-button-color sl-icon-button::part(base) {
    color: #b00091;
  }

  .icon-button-color sl-icon-button::part(base):hover,
  .icon-button-color sl-icon-button::part(base):focus {
    color: #c913aa;
  }

  .icon-button-color sl-icon-button::part(base):active {
    color: #960077;
  }
`;

const App = () => (
  <>
    <div className="icon-button-color">
      <SlIconButton name="at-symbol" label="Bold" />
      <SlIconButton name="bolt" label="Italic" />
      <SlIconButton name="no-symbol" label="Underline" />
    </div>

    <style>{css}</style>
  </>
);
```

### Link Buttons

Use the `href` attribute to convert the button to a link.

```html:preview
<sl-icon-button name="cog-6-tooth" label="Settings" href="https://example.com" target="_blank"></sl-icon-button>
```

```pug:slim
sl-icon-button name="cog-6-tooth" label="Settings" href="https://example.com" target="_blank"
```

```jsx:react
import SlIconButton from '@teamshares/shoelace/dist/react/icon-button';

const App = () => <SlIconButton name="cog-6-tooth" label="Settings" href="https://example.com" target="_blank" />;
```

### Icon Button with Tooltip

Wrap a tooltip around an icon button to provide contextual information to the user.

```html:preview
<sl-tooltip content="Settings">
  <sl-icon-button name="cog-6-tooth" label="Settings"></sl-icon-button>
</sl-tooltip>
```

```pug:slim
sl-tooltip content="Settings"
  sl-icon-button name="cog-6-tooth" label="Settings"
```

```jsx:react
import SlIconButton from '@teamshares/shoelace/dist/react/icon-button';
import SlTooltip from '@teamshares/shoelace/dist/react/tooltip';

const App = () => (
  <SlTooltip content="Settings">
    <SlIconButton name="cog-6-tooth" label="Settings" />
  </SlTooltip>
);
```

### Disabled

Use the `disabled` attribute to disable the icon button.

```html:preview
<sl-icon-button name="cog-6-tooth" label="Settings" disabled></sl-icon-button>
```

```pug:slim
sl-icon-button name="cog-6-tooth" label="Settings" disabled="true"
```

```jsx:react
import SlIconButton from '@teamshares/shoelace/dist/react/icon-button';

const App = () => <SlIconButton name="cog-6-tooth" label="Settings" disabled />;
```
