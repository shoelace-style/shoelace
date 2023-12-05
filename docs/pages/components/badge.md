---
meta:
  title: Badge
  description: Badges are used to draw attention and display counts.
layout: component
guidelines: |
  ### Usage notes
  - Only use badges for numbers to keep a count of items that the user needs to be aware of
  - To indicate status, use the [Tag](/components/tag) component
  - Values greater than 99 will be reformatted and displayed as `99+`
  - Use the badge variant `danger` (or `red`) to grab the user's attention
  - Use the variant `neutral` (or `gray`) for simple counts that don't require the user's immediate attention

unusedProperties: |
  - Variants `primary`, `success`, `warning`
  - Boolean   `square`
---

## Examples

### Basic Badge

The badge is designed to be used for displaying number counts. Pass a number to the badge using the `value` property. Numbers greater than 99 will be displayed as `99+`.

```html:preview
<sl-badge value=1999></sl-badge>
```

```pug:slim
sl-badge value=1999
```

```jsx:react
import SlBadge from '@teamshares/shoelace/dist/react/badge';

const App = () => <SlBadge value={1999}></SlBadge>;
```

### Variants

Set the `variant` attribute to change the badge's variant. We currently have just 2 variants in the Teamshares Design System: `red` (default) and `gray`. You can also use the semantic variants `danger` (same as `red`) and `neutral` (same as `gray`).

```html:preview
<sl-badge value=10></sl-badge>
<sl-badge variant="danger" value=4></sl-badge>
<sl-badge variant="gray" value=10></sl-badge>
<sl-badge variant="neutral" value=4></sl-badge>
```

```pug:slim
sl-badge value=10
sl-badge variant="danger" value=4
sl-badge variant="gray" value=10
sl-badge variant="neutral" value=4
```

```jsx:react
import SlBadge from '@teamshares/shoelace/dist/react/badge';

const App = () => (
  <>
    <SlBadge value={10} />
    <SlBadge variant="danger" value={4} />
    <SlBadge variant="gray" value={10} />
    <SlBadge variant="neutral" value={4} />
  </>
);
```

### Square Badges

Use the `square` attribute to give badges a rounded-rectangle shape.

:::warning
**Note:** Square badges are not the standard badge pattern in our Design System, and there is no Figma component for this option. Please check with the design team before using this option.
:::

```html:preview
<sl-badge square value=11></sl-badge>
<sl-badge variant="neutral" square value=11></sl-badge>
```

```pug:slim
sl-badge square="true" value=11
sl-badge variant="neutral" square="true" value=11
```

```jsx:react
import SlBadge from '@teamshares/shoelace/dist/react/badge';

const App = () => (
  <>
    <SlBadge square value={11} />
    <SlBadge variant="neutral" square value={11} />
  </>
);
```

### Text Badges

You can create a text badge by omitting the `value` attribute and inserting plain text within the default child slot of the `sl-badge` component.

:::warning
**Note:** Text badges are not the standard badge pattern in our Design System, and there is no Figma component for this option. Please check with the design team before using this option.
:::

```html:preview
<sl-badge>Overdue</sl-badge>
<sl-badge variant="neutral">Due Nov 11</sl-badge>
```

```pug:slim
sl-badge Overdue
sl-badge variant="neutral" Due Nov 11
```

```jsx:react
import SlBadge from '@teamshares/shoelace/dist/react/badge';

const App = () => (
  <>
    <SlBadge>Overdue<SlBadge>
    <SlBadge variant="neutral">Due Nov 11</SlBadge>
  </SlBadge>
);
```

### Pulsating Badges

Use the `pulse` attribute to draw attention to the badge with a subtle animation.

```html:preview
<div class="badge-pulse">
  <sl-badge pulse value=1></sl-badge>
  <sl-badge variant="neutral" pulse value=1></sl-badge>
</div>

<style>
  .badge-pulse sl-badge:not(:last-of-type) {
    margin-right: 1rem;
  }
</style>
```

```pug:slim
div.badge-pulse
  sl-badge pulse="true" value=1
  sl-badge variant="neutral" pulse="true" value=1

css:
  .badge-pulse sl-badge:not(:last-of-type) {
    margin-right: 1rem;
  }
```

```jsx:react
import SlBadge from '@teamshares/shoelace/dist/react/badge';

const css = `
  .badge-pulse sl-badge:not(:last-of-type) {
    margin-right: 1rem;
  }
`;

const App = () => (
  <>
    <div className="badge-pulse">
      <SlBadge pulse value={1} />
      <SlBadge variant="neutral" pulse value={1} />
    </div>

    <style>{css}</style>
  </>
);
```

### With Buttons

One of the most common use cases for badges is attaching them to buttons. To make this easier, badges will be automatically positioned at the top-right when they're a child of a button.

```html:preview
<sl-button>
  Requests
  <sl-badge variant="neutral" value=1920></sl-badge>
</sl-button>

<sl-button style="margin-inline-start: 1rem;">
  Errors
  <sl-badge value=6></sl-badge>
</sl-button>
```

```pug:slim
sl-button
  | Requests
  sl-badge variant="neutral" value=1920
sl-button style="margin-inline-start: 1rem;"
  | Errors
  sl-badge value=6
```

{% raw %}

```jsx:react
import SlBadge from '@teamshares/shoelace/dist/react/badge';
import SlButton from '@teamshares/shoelace/dist/react/button';

const App = () => (
  <>
    <SlButton>
      Requests
      <SlBadge variant="neutral" value={1920} />
    </SlButton>

    <SlButton style={{ marginInlineStart: '1rem' }}>
      Errors
      <SlBadge value={6} />
    </SlButton>
  </>
);
```

{% endraw %}

### With Tabs

Use badges in tabs to show counts of items.

```html:preview
<sl-tab-group>
  <sl-tab slot="nav" panel="emails">Emails
    <sl-badge value=1200>
  </sl-tab>
  <sl-tab slot="nav" panel="notes">Notes
    <sl-badge value=10>
  </sl-tab>

  <sl-tab-panel name="emails">You have 1,200 unread emails.</sl-tab-panel>
  <sl-tab-panel name="notes">You have 10 unread notes.</sl-tab-panel>
</sl-tab-group>
```

```pug:slim
sl-tab-group
  sl-tab slot="nav" panel="emails" Emails
    sl-badge value=1200
  sl-tab slot="nav" panel="notes" Notes
    sl-badge value=10
  sl-tab-panel name="emails" You have 1,200 unread emails.
  sl-tab-panel name="notes" You have 10 unread notes.
```

### With Menu Items

When including badges in menu items, use the `suffix` slot to make sure they're aligned correctly.

```html:preview
<sl-menu style="max-width: 240px;">
  <sl-menu-label>Messages</sl-menu-label>
  <sl-menu-item>Comments <sl-badge slot="suffix" variant="neutral" value=4></sl-badge></sl-menu-item>
  <sl-menu-item>Replies <sl-badge slot="suffix" variant="neutral" value=12></sl-badge></sl-menu-item>
</sl-menu>
```

```pug:slim
sl-menu style="max-width: 240px;"
  sl-menu-label Messages
  sl-menu-item Comments
    sl-badge slot="suffix" variant="neutral" value=4
  sl-menu-item Replies
    sl-badge slot="suffix" variant="neutral" value=12
```

{% raw %}

```jsx:react
import SlBadge from '@teamshares/shoelace/dist/react/badge';
import SlButton from '@teamshares/shoelace/dist/react/button';
import SlMenu from '@teamshares/shoelace/dist/react/menu';
import SlMenuItem from '@teamshares/shoelace/dist/react/menu-item';
import SlMenuLabel from '@teamshares/shoelace/dist/react/menu-label';

const App = () => (
  <SlMenu
    style={{
      maxWidth: '240px',
      border: 'solid 1px var(--sl-panel-border-color)',
      borderRadius: 'var(--sl-border-radius-medium)'
    }}
  >
    <SlMenuLabel>Messages</SlMenuLabel>
    <SlMenuItem>
      Comments
      <SlBadge slot="suffix" variant="neutral" value={4} />
    </SlMenuItem>
    <SlMenuItem>
      Replies
      <SlBadge slot="suffix" variant="neutral" value={12} />
    </SlMenuItem>
  </SlMenu>
);
```

{% endraw %}
