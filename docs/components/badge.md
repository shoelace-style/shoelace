# Badge

[component-header:sl-badge]

Badges are used to draw attention and display statuses or counts.

```html preview
<sl-badge>Badge</sl-badge>
```

```jsx react
import { SlBadge } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlBadge>Badge</SlBadge>
);
```

## Examples

### Variants

Set the `variant` attribute to change the badge's variant.

```html preview
<sl-badge variant="primary">Primary</sl-badge>
<sl-badge variant="success">Success</sl-badge>
<sl-badge variant="neutral">Neutral</sl-badge>
<sl-badge variant="warning">Warning</sl-badge>
<sl-badge variant="danger">Danger</sl-badge>
```

```jsx react
import { SlBadge } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    <SlBadge variant="primary">Primary</SlBadge>
    <SlBadge variant="success">Success</SlBadge>
    <SlBadge variant="neutral">Neutral</SlBadge>
    <SlBadge variant="warning">Warning</SlBadge>
    <SlBadge variant="danger">Danger</SlBadge>  
  </>
);
```

### Pill Badges

Use the `pill` attribute to give badges rounded edges.

```html preview
<sl-badge variant="primary" pill>Primary</sl-badge>
<sl-badge variant="success" pill>Success</sl-badge>
<sl-badge variant="neutral" pill>Neutral</sl-badge>
<sl-badge variant="warning" pill>Warning</sl-badge>
<sl-badge variant="danger" pill>Danger</sl-badge>
```

```jsx react
import { SlBadge } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    <SlBadge variant="primary" pill>Primary</SlBadge>
    <SlBadge variant="success" pill>Success</SlBadge>
    <SlBadge variant="neutral" pill>Neutral</SlBadge>
    <SlBadge variant="warning" pill>Warning</SlBadge>
    <SlBadge variant="danger" pill>Danger</SlBadge>  
  </>
);
```

### Pulsating Badges

Use the `pulse` attribute to draw attention to the badge with a subtle animation.

```html preview
<div class="badge-pulse">
  <sl-badge variant="primary" pill pulse>1</sl-badge>
  <sl-badge variant="success" pill pulse>1</sl-badge>
  <sl-badge variant="neutral" pill pulse>1</sl-badge>
  <sl-badge variant="warning" pill pulse>1</sl-badge>
  <sl-badge variant="danger" pill pulse>1</sl-badge>
</div>

<style>
  .badge-pulse sl-badge:not(:last-of-type) {
    margin-right: 1rem;
  }
</style>
```

```jsx react
import { SlBadge } from '@shoelace-style/shoelace/dist/react';

const css = `
  .badge-pulse sl-badge:not(:last-of-type) {
    margin-right: 1rem;
  }
`;

const App = () => (
  <>
    <div className="badge-pulse">
      <SlBadge variant="primary" pill pulse>1</SlBadge>
      <SlBadge variant="success" pill pulse>1</SlBadge>
      <SlBadge variant="neutral" pill pulse>1</SlBadge>
      <SlBadge variant="warning" pill pulse>1</SlBadge>
      <SlBadge variant="danger" pill pulse>1</SlBadge>
    </div>

    <style>{css}</style>
  </>
);
```

### With Buttons

One of the most common use cases for badges is attaching them to buttons. To make this easier, badges will be automatically positioned at the top-right when they're a child of a button.

```html preview
<sl-button>
  Requests
  <sl-badge pill>30</sl-badge>
</sl-button>

<sl-button style="margin-left: 1rem;">
  Warnings
  <sl-badge variant="warning" pill>8</sl-badge>
</sl-button>

<sl-button style="margin-left: 1rem;">
  Errors
  <sl-badge variant="danger" pill>6</sl-badge>
</sl-button>
```

```jsx react
import { SlBadge, SlButton } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    <SlButton>
      Requests
      <SlBadge pill>30</SlBadge>
    </SlButton>

    <SlButton style={{ marginLeft: '1rem' }}>
      Warnings
      <SlBadge variant="warning" pill>8</SlBadge>
    </SlButton>

    <SlButton style={{ marginLeft: '1rem' }}>
      Errors
      <SlBadge variant="danger" pill>6</SlBadge>
    </SlButton>
  </>
);
```

### With Menu Items

When including badges in menu items, use the `suffix` slot to make sure they're aligned correctly.

```html preview
<sl-menu style="max-width: 240px; border: solid 1px var(--sl-panel-border-color); border-radius: var(--sl-border-radius-medium);">
  <sl-menu-label>Messages</sl-menu-label>
  <sl-menu-item>Comments <sl-badge slot="suffix" variant="neutral" pill>4</sl-badge></sl-menu-item>
  <sl-menu-item>Replies <sl-badge slot="suffix" variant="neutral" pill>12</sl-badge></sl-menu-item>
</sl-menu>
```

```jsx react
import { SlBadge, SlButton, SlMenu, SlMenuItem, SlMenuLabel } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlMenu 
    style={{
      maxWidth: '240px',
      border: 'solid 1px var(--sl-panel-border-color)',
      borderRadius: 'var(--sl-border-radius-medium)'
    }}
  >
    <SlMenuLabel>Messages</SlMenuLabel>
    <SlMenuItem>Comments <SlBadge slot="suffix" variant="neutral" pill>4</SlBadge></SlMenuItem>
    <SlMenuItem>Replies <SlBadge slot="suffix" variant="neutral" pill>12</SlBadge></SlMenuItem>
  </SlMenu>
);
```

[component-metadata:sl-badge]
