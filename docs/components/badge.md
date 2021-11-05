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

### Types

Set the `type` attribute to change the badge's type.

```html preview
<sl-badge type="primary">Primary</sl-badge>
<sl-badge type="success">Success</sl-badge>
<sl-badge type="neutral">Neutral</sl-badge>
<sl-badge type="warning">Warning</sl-badge>
<sl-badge type="danger">Danger</sl-badge>
```

```jsx react
import { SlBadge } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    <SlBadge type="primary">Primary</SlBadge>
    <SlBadge type="success">Success</SlBadge>
    <SlBadge type="neutral">Neutral</SlBadge>
    <SlBadge type="warning">Warning</SlBadge>
    <SlBadge type="danger">Danger</SlBadge>  
  </>
);
```

### Pill Badges

Use the `pill` attribute to give badges rounded edges.

```html preview
<sl-badge type="primary" pill>Primary</sl-badge>
<sl-badge type="success" pill>Success</sl-badge>
<sl-badge type="neutral" pill>Neutral</sl-badge>
<sl-badge type="warning" pill>Warning</sl-badge>
<sl-badge type="danger" pill>Danger</sl-badge>
```

```jsx react
import { SlBadge } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    <SlBadge type="primary" pill>Primary</SlBadge>
    <SlBadge type="success" pill>Success</SlBadge>
    <SlBadge type="neutral" pill>Neutral</SlBadge>
    <SlBadge type="warning" pill>Warning</SlBadge>
    <SlBadge type="danger" pill>Danger</SlBadge>  
  </>
);
```

### Pulsating Badges

Use the `pulse` attribute to draw attention to the badge with a subtle animation.

```html preview
<div class="badge-pulse">
  <sl-badge type="primary" pill pulse>1</sl-badge>
  <sl-badge type="success" pill pulse>1</sl-badge>
  <sl-badge type="neutral" pill pulse>1</sl-badge>
  <sl-badge type="warning" pill pulse>1</sl-badge>
  <sl-badge type="danger" pill pulse>1</sl-badge>
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
      <SlBadge type="primary" pill pulse>1</SlBadge>
      <SlBadge type="success" pill pulse>1</SlBadge>
      <SlBadge type="neutral" pill pulse>1</SlBadge>
      <SlBadge type="warning" pill pulse>1</SlBadge>
      <SlBadge type="danger" pill pulse>1</SlBadge>
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
  <sl-badge type="warning" pill>8</sl-badge>
</sl-button>

<sl-button style="margin-left: 1rem;">
  Errors
  <sl-badge type="danger" pill>6</sl-badge>
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
      <SlBadge type="warning" pill>8</SlBadge>
    </SlButton>

    <SlButton style={{ marginLeft: '1rem' }}>
      Errors
      <SlBadge type="danger" pill>6</SlBadge>
    </SlButton>
  </>
);
```

### With Menu Items

When including badges in menu items, use the `suffix` slot to make sure they're aligned correctly.

```html preview
<sl-menu style="max-width: 240px; border: solid 1px rgb(var(--sl-panel-border-color)); border-radius: var(--sl-border-radius-medium);">
  <sl-menu-label>Messages</sl-menu-label>
  <sl-menu-item>Comments <sl-badge slot="suffix" type="neutral" pill>4</sl-badge></sl-menu-item>
  <sl-menu-item>Replies <sl-badge slot="suffix" type="neutral" pill>12</sl-badge></sl-menu-item>
</sl-menu>
```

```jsx react
import { SlBadge, SlButton, SlMenu, SlMenuItem, SlMenuLabel } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlMenu 
    style={{
      maxWidth: '240px',
      border: 'solid 1px rgb(var(--sl-panel-border-color))',
      borderRadius: 'var(--sl-border-radius-medium)'
    }}
  >
    <SlMenuLabel>Messages</SlMenuLabel>
    <SlMenuItem>Comments <SlBadge slot="suffix" type="neutral" pill>4</SlBadge></SlMenuItem>
    <SlMenuItem>Replies <SlBadge slot="suffix" type="neutral" pill>12</SlBadge></SlMenuItem>
  </SlMenu>
);
```

[component-metadata:sl-badge]
