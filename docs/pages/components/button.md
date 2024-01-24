---
meta:
  title: Button
  description: Buttons represent actions that are available to the user.
layout: component
unusedProperties: |
  - Variants `neutral`, `success`
  - Boolean `square`
---

## Examples

### Basic Button

```html:preview
<sl-button>Button</sl-button>
```

```pug:slim
sl-button Button
```

```jsx:react
import SlButton from '@teamshares/shoelace/dist/react/button';

const App = () => <SlButton>Button</SlButton>;
```

### Variants

Use the `variant` attribute to set the button's variant.

```html:preview
<sl-button variant="default">Default</sl-button>
<sl-button variant="primary">Primary</sl-button>
<sl-button variant="warning">Warning</sl-button>
<sl-button variant="danger">Danger</sl-button>
```

```pug:slim
sl-button variant="default" Default
sl-button variant="primary" Primary
sl-button variant="warning" Warning
sl-button variant="danger" Danger
```

```jsx:react
import SlButton from '@teamshares/shoelace/dist/react/button';

const App = () => (
  <>
    <SlButton variant="default">Default</SlButton>
    <SlButton variant="primary">Primary</SlButton>
    <SlButton variant="warning">Warning</SlButton>
    <SlButton variant="danger">Danger</SlButton>
  </>
);
```

### Sizes

Use the `size` attribute to change a button's size.

```html:preview
<sl-button size="small">Small</sl-button>
<sl-button size="medium">Medium</sl-button>
<sl-button size="large">Large</sl-button>
<sl-button size="x-large">Extra Large</sl-button>
```

```pug:slim
sl-button size="small" Small
sl-button size="medium" Medium
sl-button size="large" Large
sl-button size="x-large" Extra Large
```

```jsx:react
import SlButton from '@teamshares/shoelace/dist/react/button';

const App = () => (
  <>
    <SlButton size="small">Small</SlButton>
    <SlButton size="medium">Medium</SlButton>
    <SlButton size="large">Large</SlButton>
    <SlButton size="x-large">Extra Large</SlButton>
  </>
);
```

### Outline Buttons

Use the `outline` attribute to draw outlined buttons with transparent backgrounds.

```html:preview
<sl-button variant="default" outline>Default</sl-button>
<sl-button variant="primary" outline>Primary</sl-button>
<sl-button variant="warning" outline>Warning</sl-button>
<sl-button variant="danger" outline>Danger</sl-button>
```

```pug:slim
sl-button variant="default" outline="true" Default
sl-button variant="primary" outline="true" Primary
sl-button variant="warning" outline="true" Warning
sl-button variant="danger" outline="true" Danger
```

```jsx:react
import SlButton from '@teamshares/shoelace/dist/react/button';

const App = () => (
  <>
    <SlButton variant="default" outline>
      Default
    </SlButton>
    <SlButton variant="primary" outline>
      Primary
    </SlButton>
    <SlButton variant="warning" outline>
      Warning
    </SlButton>
    <SlButton variant="danger" outline>
      Danger
    </SlButton>
  </>
);
```

### Square Buttons

Use the `square` attribute to give buttons a rounded-rectangle shape.

:::warning
**Note:** Square buttons are not the standard button pattern in our Design System, and there is no Figma component for this option. Please check with the design team before using this option.
:::

```html:preview
<sl-button size="small" square>Small</sl-button>
<sl-button size="medium" square>Medium</sl-button>
<sl-button size="large" square>Large</sl-button>
<sl-button size="x-large" square>Extra Large</sl-button>
```

```pug:slim
sl-button size="small" square="true" Small
sl-button size="medium" square="true" Medium
sl-button size="large" square="true" Large
sl-button size="x-large" square="true" Extra Large
```

```jsx:react
import SlButton from '@teamshares/shoelace/dist/react/button';

const App = () => (
  <>
    <SlButton size="small" square>
      Small
    </SlButton>
    <SlButton size="medium" square>
      Medium
    </SlButton>
    <SlButton size="large" square>
      Large
    </SlButton>
    <SlButton size="x-large" square>
      Extra Large
    </SlButton>
  </>
);
```

### Circle Buttons

Use the `circle` attribute to create circular icon buttons. When this attribute is set, the button expects a single `<sl-icon>` in the default slot.

```html:preview
<sl-button variant="default" size="small" circle>
  <sl-icon library="fa" name="fas-ellipsis-vertical" label="More options"></sl-icon>
</sl-button>

<sl-button variant="default" size="medium" circle>
  <sl-icon library="fa" name="fas-ellipsis-vertical" label="More options"></sl-icon>
</sl-button>

<sl-button variant="default" size="large" circle>
  <sl-icon library="fa" name="fas-ellipsis-vertical" label="More options"></sl-icon>
</sl-button>

<sl-button variant="default" size="x-large" circle>
  <sl-icon library="fa" name="fas-ellipsis-vertical" label="More options"></sl-icon>
</sl-button>
```

```pug:slim
sl-button variant="default" size="small" circle="true"
  sl-icon library="fa" name="fas-ellipsis-vertical" label="More options"
sl-button variant="default" size="medium" circle="true"
  sl-icon library="fa" name="fas-ellipsis-vertical" label="More options"
sl-button variant="default" size="large" circle="true"
  sl-icon library="fa" name="fas-ellipsis-vertical" label="More options"
sl-button variant="default" size="x-large" circle="true"
  sl-icon library="fa" name="fas-ellipsis-vertical" label="More options"
```

```jsx:react
import SlButton from '@teamshares/shoelace/dist/react/button';
import SlIcon from '@teamshares/shoelace/dist/react/icon';

const App = () => (
  <>
    <SlButton variant="default" size="small" circle>
      <SlIcon library="fa" name="fas-ellipsis-vertical" />
    </SlButton>
    <SlButton variant="default" size="medium" circle>
      <SlIcon library="fa" name="fas-ellipsis-vertical" />
    </SlButton>
    <SlButton variant="default" size="large" circle>
      <SlIcon library="fa" name="fas-ellipsis-vertical" />
    </SlButton>
    <SlButton variant="default" size="x-large" circle>
      <SlIcon library="fa" name="fas-ellipsis-vertical" />
    </SlButton>
  </>
);
```

### Text Buttons

Use the `text` variant to create text buttons that share the same size as regular buttons but don't have backgrounds or borders.

```html:preview
<sl-button variant="text" size="small">Text</sl-button>
<sl-button variant="text" size="medium">Text</sl-button>
<sl-button variant="text" size="large">Text</sl-button>
<sl-button variant="text" size="x-large">Text</sl-button>
```

```pug:slim
sl-button variant="text" size="small" Text
sl-button variant="text" size="medium" Text
sl-button variant="text" size="large" Text
```

```jsx:react
import SlButton from '@teamshares/shoelace/dist/react/button';

const App = () => (
  <>
    <SlButton variant="text" size="small">
      Text
    </SlButton>
    <SlButton variant="text" size="medium">
      Text
    </SlButton>
    <SlButton variant="text" size="large">
      Text
    </SlButton>
  </>
);
```

### Link Buttons

It's often helpful to have a button that works like a link. This is possible by setting the `href` attribute, which will make the component render an `<a>` under the hood. This gives you all the default link behavior the browser provides (e.g. [[CMD/CTRL/SHIFT]] + [[CLICK]]) and exposes the `target` and `download` attributes.

```html:preview
<sl-button href="https://example.com/">Link</sl-button>
<sl-button href="https://example.com/" target="_blank">New Window</sl-button>
<sl-button href="/assets/images/wordmark.svg" download="shoelace.svg">Download</sl-button>
<sl-button href="https://example.com/" disabled>Disabled</sl-button>
```

```pug:slim
sl-button href="https://example.com/" Link
sl-button href="https://example.com/" target="_blank" New Window
sl-button href="/assets/images/wordmark.svg" download="shoelace.svg" Download
sl-button href="https://example.com/" disabled="true" Disabled
```

```jsx:react
import SlButton from '@teamshares/shoelace/dist/react/button';

const App = () => (
  <>
    <SlButton href="https://example.com/">Link</SlButton>
    <SlButton href="https://example.com/" target="_blank">
      New Window
    </SlButton>
    <SlButton href="/assets/images/wordmark.svg" download="shoelace.svg">
      Download
    </SlButton>
    <SlButton href="https://example.com/" disabled>
      Disabled
    </SlButton>
  </>
);
```

:::tip
When a `target` is set, the link will receive `rel="noreferrer noopener"` for [security reasons](https://mathiasbynens.github.io/rel-noopener/).
:::

### Setting a Custom Width

As expected, buttons can be given a custom width by setting the `width` attribute. This is useful for making buttons span the full width of their container on smaller screens.

```html:preview
<sl-button variant="default" size="small" style="width: 100%; margin-bottom: 1rem;">Small</sl-button>
<sl-button variant="default" size="medium" style="width: 100%; margin-bottom: 1rem;">Medium</sl-button>
<sl-button variant="default" size="large" style="width: 100%; margin-bottom: 1rem;">Large</sl-button>
<sl-button variant="default" size="x-large" style="width: 100%;">Extra Large</sl-button>
```

```pug:slim
sl-button variant="default" size="small" style="width: 100%; margin-bottom: 1rem;" Small
sl-button variant="default" size="medium" style="width: 100%; margin-bottom: 1rem;" Medium
sl-button variant="default" size="large" style="width: 100%; margin-bottom: 1rem;" Large
sl-button variant="default" size="x-large" style="width: 100%;" Extra Large
```

{% raw %}

```jsx:react
import SlButton from '@teamshares/shoelace/dist/react/button';

const App = () => (
  <>
    <SlButton variant="default" size="small" style={{ width: '100%', marginBottom: '1rem' }}>
      Small
    </SlButton>
    <SlButton variant="default" size="medium" style={{ width: '100%', marginBottom: '1rem' }}>
      Medium
    </SlButton>
    <SlButton variant="default" size="large" style={{ width: '100%', marginBottom: '1rem' }}>
      Large
    </SlButton>
    <SlButton variant="default" size="x-large" style={{ width: '100%' }}>
      Extra Large
    </SlButton>
  </>
);
```

{% endraw %}

### Prefix and Suffix Icons

Use the `prefix` and `suffix` slots to add icons.

```html:preview
<sl-button variant="default" size="small">
  <sl-icon slot="prefix" library="fa" name="fas-pencil"></sl-icon>
  Edit
</sl-button>

<sl-button variant="default" size="small">
  <sl-icon slot="suffix" library="fa" name="fas-gear"></sl-icon>
  Settings
</sl-button>

<sl-button variant="default" size="small">
  <sl-icon slot="prefix" library="fa" name="fas-link-horizontal"></sl-icon>
  Open link
  <sl-icon slot="suffix" library="fa" name="fas-arrow-up-right-from-square"></sl-icon>
</sl-button>


<br /><br />

<sl-button variant="default">
  <sl-icon slot="prefix" library="fa" name="fas-pencil"></sl-icon>
  Edit
</sl-button>

<sl-button variant="default">
  <sl-icon slot="suffix" library="fa" name="fas-gear"></sl-icon>
  Settings
</sl-button>

<sl-button variant="default">
  <sl-icon slot="prefix" library="fa" name="fas-link-horizontal"></sl-icon>
  Open link
  <sl-icon slot="suffix" library="fa" name="fas-arrow-up-right-from-square"></sl-icon>
</sl-button>


<br /><br />

<sl-button variant="default" size="large">
  <sl-icon slot="prefix" library="fa" name="fas-pencil"></sl-icon>
  Edit
</sl-button>

<sl-button variant="default" size="large">
  <sl-icon slot="suffix" library="fa" name="fas-gear"></sl-icon>
  Settings
</sl-button>

<sl-button variant="default" size="large">
  <sl-icon slot="prefix" library="fa" name="fas-link-horizontal"></sl-icon>
  Open link
  <sl-icon slot="suffix" library="fa" name="fas-arrow-up-right-from-square"></sl-icon>
</sl-button>


<br /><br />

<sl-button variant="default" size="x-large">
  <sl-icon slot="prefix" library="fa" name="fas-pencil"></sl-icon>
 Edit
</sl-button>

<sl-button variant="default" size="x-large">
  <sl-icon slot="suffix" library="fa" name="fas-gear"></sl-icon>
  Settings
</sl-button>

<sl-button variant="default" size="x-large">
  <sl-icon slot="prefix" library="fa" name="fas-link-horizontal"></sl-icon>
  Open link
  <sl-icon slot="suffix" library="fa" name="fas-arrow-up-right-from-square"></sl-icon>
</sl-button>


```

```pug:slim
sl-button variant="default" size="small"
  sl-icon slot="prefix" library="fa" name="fas-pencil"
  | Edit
sl-button variant="default" size="small"
  sl-icon slot="suffix" library="fa" name="fas-gear"
  | Settings
br
br
sl-button variant="default"
  sl-icon slot="prefix" library="fa" name="fas-pencil"
  | Edit
sl-button variant="default"
  sl-icon slot="suffix" library="fa" name="fas-gear"
  | Settings
br
br
sl-button variant="default" size="large"
  sl-icon slot="prefix" library="fa" name="fas-pencil"
  | Edit
sl-button variant="default" size="large"
  sl-icon slot="suffix" library="fa" name="fas-gear"
  | Settings
br
br
sl-button variant="default" size="x-large"
  sl-icon slot="prefix" library="fa" name="fas-pencil"
  | Edit
sl-button variant="default" size="x-large"
  sl-icon slot="suffix" library="fa" name="fas-gear"
  | Settings
```

```jsx:react
import SlButton from '@teamshares/shoelace/dist/react/button';
import SlIcon from '@teamshares/shoelace/dist/react/icon';

const App = () => (
  <>
    <SlButton variant="default" size="small">
      <SlIcon slot="prefix" library="fa" name="fas-pencil"></SlIcon>
      Edit
    </SlButton>

    <SlButton variant="default" size="small">
      <SlIcon slot="suffix" library="fa" name="fas-gear"></SlIcon>
      Settings
    </SlButton>

    <br />
    <br />

    <SlButton variant="default">
      <SlIcon slot="prefix" library="fa" name="fas-pencil"></SlIcon>
      Edit
    </SlButton>

    <SlButton variant="default">
      <SlIcon slot="suffix" library="fa" name="fas-gear"></SlIcon>
      Settings
    </SlButton>

    <br />
    <br />

    <SlButton variant="default" size="large">
      <SlIcon slot="prefix" library="fa" name="fas-pencil"></SlIcon>
      Edit
    </SlButton>

    <SlButton variant="default" size="large">
      <SlIcon slot="suffix" library="fa" name="fas-gear"></SlIcon>
      Settings
    </SlButton>

    <br />
    <br />

    <SlButton variant="default" size="x-large">
      <SlIcon slot="prefix" library="fa" name="fas-pencil"></SlIcon>
      Edit
    </SlButton>

    <SlButton variant="default" size="x-large">
      <SlIcon slot="suffix" library="fa" name="fas-gear"></SlIcon>
      Settings
    </SlButton>

  </>
);
```

### Caret

Use the `caret` attribute to add a dropdown indicator when a button will trigger a dropdown, menu, or popover.

```html:preview
<sl-button size="small" caret>Small</sl-button>
<sl-button size="medium" caret>Medium</sl-button>
<sl-button size="large" caret>Large</sl-button>
<sl-button size="x-large" caret>Extra Large</sl-button>
```

```pug:slim
sl-button size="small" caret="true" Small
sl-button size="medium" caret="true" Medium
sl-button size="large" caret="true" Large
sl-button size="x-large" caret="true" Extra Large
```

```jsx:react
import SlButton from '@teamshares/shoelace/dist/react/button';

const App = () => (
  <>
    <SlButton size="small" caret>
      Small
    </SlButton>
    <SlButton size="medium" caret>
      Medium
    </SlButton>
    <SlButton size="large" caret>
      Large
    </SlButton>
    <SlButton size="x-large" caret>
      Large
    </SlButton>
  </>
);
```

### Loading

Use the `loading` attribute to make a button busy. The width will remain the same as before, preventing adjacent elements from moving around. Clicks will be suppressed until the loading state is removed.

```html:preview
<sl-button variant="default" size="small" loading>Default</sl-button>
<sl-button variant="primary" size="medium" loading>Primary</sl-button>
<sl-button variant="warning" size="large" loading>Warning</sl-button>
<sl-button variant="danger" size="x-large" loading>Danger</sl-button>
```

```pug:slim
sl-button variant="default" loading="true" Default
sl-button variant="primary" loading="true" Primary
sl-button variant="warning" loading="true" Warning
sl-button variant="danger" loading="true" Danger
```

```jsx:react
import SlButton from '@teamshares/shoelace/dist/react/button';

const App = () => (
  <>
    <SlButton variant="default" loading>
      Default
    </SlButton>
    <SlButton variant="primary" loading>
      Primary
    </SlButton>
    <SlButton variant="warning" loading>
      Warning
    </SlButton>
    <SlButton variant="danger" loading>
      Danger
    </SlButton>
  </>
);
```

### Disabled

Use the `disabled` attribute to disable a button.

```html:preview
<sl-button variant="default" disabled>Default</sl-button>
<sl-button variant="primary" disabled>Primary</sl-button>
<sl-button variant="warning" disabled>Warning</sl-button>
<sl-button variant="danger" disabled>Danger</sl-button>
```

```pug:slim
sl-button variant="default" disabled="true" Default
sl-button variant="primary" disabled="true" Primary
sl-button variant="warning" disabled="true" Warning
sl-button variant="danger" disabled="true" Danger
```

```jsx:react
import SlButton from '@teamshares/shoelace/dist/react/button';

const App = () => (
  <>
    <SlButton variant="default" disabled>
      Default
    </SlButton>
    <SlButton variant="primary" disabled>
      Primary
    </SlButton>
    <SlButton variant="warning" disabled>
      Warning
    </SlButton>
    <SlButton variant="danger" disabled>
      Danger
    </SlButton>
  </>
);
```

### Styling Buttons

This example demonstrates how to style buttons using a custom class. This is the recommended approach if you need to add additional variations. To customize an existing variation, modify the selector to target the button's `variant` attribute instead of a class (e.g. `sl-button[variant="primary"]`).

:::warning
**Note:** In general, you shouldn't need to do this. If you are working on a design that requires custom styling, please ensure that there's not a standard button in the design system that would work instead.
:::

```html:preview
<sl-button class="pink">Pink Button</sl-button>

<style>
  sl-button.pink::part(base) {
    /* Set design tokens for height and border width */
    --sl-input-height-medium: 48px;
    --sl-input-border-width: 4px;

    border-radius: 0;
    background-color: #ff1493;
    border-top-color: #ff7ac1;
    border-left-color: #ff7ac1;
    border-bottom-color: #ad005c;
    border-right-color: #ad005c;
    color: white;
    font-size: 1.125rem;
    box-shadow: 0 2px 10px #0002;
    transition: var(--sl-transition-medium) transform ease, var(--sl-transition-medium) border ease;
  }

  sl-button.pink::part(base):hover {
    transform: scale(1.05) rotate(-1deg);
  }

  sl-button.pink::part(base):active {
    border-top-color: #ad005c;
    border-right-color: #ff7ac1;
    border-bottom-color: #ff7ac1;
    border-left-color: #ad005c;
    transform: scale(1.05) rotate(-1deg) translateY(2px);
  }

  sl-button.pink::part(base):focus-visible {
    outline: dashed 2px deeppink;
    outline-offset: 4px;
  }
</style>
```

```pug:slim
sl-button.pink Pink Button

css:
  sl-button.pink::part(base) {
    /* Set design tokens for height and border width */
    --sl-input-height-medium: 48px;
    --sl-input-border-width: 4px;

    border-radius: 0;
    background-color: #ff1493;
    border-top-color: #ff7ac1;
    border-left-color: #ff7ac1;
    border-bottom-color: #ad005c;
    border-right-color: #ad005c;
    color: white;
    font-size: 1.125rem;
    box-shadow: 0 2px 10px #0002;
    transition: var(--sl-transition-medium) transform ease, var(--sl-transition-medium) border ease;
  }

  sl-button.pink::part(base):hover {
    transform: scale(1.05) rotate(-1deg);
  }

  sl-button.pink::part(base):active {
    border-top-color: #ad005c;
    border-right-color: #ff7ac1;
    border-bottom-color: #ff7ac1;
    border-left-color: #ad005c;
    transform: scale(1.05) rotate(-1deg) translateY(2px);
  }

  sl-button.pink::part(base):focus-visible {
    outline: dashed 2px deeppink;
    outline-offset: 4px;
  }
```
