---
meta:
  title: Card
  description: Cards can be used to group related subjects in a container.
layout: component
---

## Examples

<!-- ### Complex Card

```html:preview
<sl-card class="card-overview">
  <img
    slot="image"
    src="https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
    alt="A kitten sits patiently between a terracotta pot and decorative grasses."
  />

  <strong>Mittens</strong><br />
  This kitten is as cute as he is playful. Bring him home today!<br />
  <small>6 weeks old</small>

  <div slot="footer">
    <sl-button variant="primary" pill>More Info</sl-button>
    <sl-rating></sl-rating>
  </div>
</sl-card>

<style>
  .card-overview {
    max-width: 300px;
  }

  .card-overview small {
    color: var(--sl-color-neutral-700);
  }

  .card-overview [slot='footer'] {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
```

```pug:slim
sl-card.card-overview
  img slot="image" src="https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" alt="A kitten sits patiently between a terracotta pot and decorative grasses."
  strong Mittens
  br
  | This kitten is as cute as he is playful. Bring him home today!
  br
  small 6 weeks old
  div slot="footer"
    sl-button variant="primary" pill=true More Info
    sl-rating

css:
  .card-overview {
    max-width: 300px;
  }

  .card-overview small {
    color: var(--sl-color-neutral-700);
  }

  .card-overview [slot=footer] {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
```

```jsx:react
import SlButton from '@teamshares/shoelace/dist/react/button';
import SlCard from '@teamshares/shoelace/dist/react/card';
import SlRating from '@teamshares/shoelace/dist/react/rating';

const css = `
  .card-overview {
    max-width: 300px;
  }

  .card-overview small {
    color: var(--sl-color-neutral-700);
  }

  .card-overview [slot="footer"] {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const App = () => (
  <>
    <SlCard className="card-overview">
      <img
        slot="image"
        src="https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
        alt="A kitten sits patiently between a terracotta pot and decorative grasses."
      />
      <strong>Mittens</strong>
      <br />
      This kitten is as cute as he is playful. Bring him home today!
      <br />
      <small>6 weeks old</small>
      <div slot="footer">
        <SlButton variant="primary" pill>
          More Info
        </SlButton>
        <SlRating></SlRating>
      </div>
    </SlCard>

    <style>{css}</style>
  </>
);
``` -->

### Basic Card

Basic cards aren't very exciting, but they can display any content you want them to. This is the standard container to use when displaying content on a standard page with a `gray-100` background.

```html:preview
<div class="page-basic">
  <sl-card class="card-basic">
    This is just a basic card. No image, no header, and no footer. Just your content.
  </sl-card>
</div>

<style>
  .page-basic {
    background: var(--sl-color-neutral-100);
    padding: var(--ts-spacing-large);
  }
  .card-basic {
    max-width: 300px;
  }
</style>
```

```pug:slim
.page-basic
  sl-card.card-basic
    | This is just a basic card. No image, no header, and no footer. Just your content.

css:
  .page-basic {
    @apply bg-gray-100 p-6;
  }

  .card-basic {
    @apply max-w-[300px];
  }
```

```jsx:react
import SlCard from '@teamshares/shoelace/dist/react/card';

const css = `
  .page-basic {
    background: var(--sl-color-neutral-100);
    padding: var(--ts-spacing-large);
  }
  .card-basic {
    max-width: 300px;
  }
`;

const App = () => (
  <>
    <SlCard className="card-basic">
      This is just a basic card. No image, no header, and no footer. Just your content.
    </SlCard>

    <style>{css}</style>
  </>
);
```

### Card with No Shadow

Use the `noShadow` property to remove a card's default box shadow. This is useful when nesting cards inside another card.

```html:preview
<div class="page-basic">
  <sl-card>
    <div slot="header">Card with nested cards</div>
    <div class="nested-cards">
      <sl-card noShadow> This is a basic card with no shadow, nested inside a standard card with shadow.</sl-card>
      <sl-card noShadow> This is a basic card with no shadow, nested inside a standard card with shadow.</sl-card>
      <sl-card noShadow> This is a basic card with no shadow, nested inside a standard card with shadow.</sl-card>
    </div>
  </sl-card>
</div>

<style>
  .page-basic {
    background: var(--sl-color-neutral-100);
    padding: var(--ts-spacing-large);
  }
  .nested-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    gap: var(--sl-spacing-medium);
}
</style>
```

```pug:slim
.page-basic
  sl-card
    div slot="header" Card with nested cards
    .nested-cards
      sl-card noShadow=true
        |  This is a basic card with no shadow, nested inside a standard card with shadow.
      sl-card noShadow=true
        |  This is a basic card with no shadow, nested inside a standard card with shadow.
      sl-card noShadow=true
        |  This is a basic card with no shadow, nested inside a standard card with shadow.

css:
  .page-basic {
    @apply bg-gray-100 p-6;
  }
  .nested-cards {
    @apply grid grid-cols-2 w-full gap-4;
  }
```

```jsx:react
import { SlCard } from '@teamshares/shoelace/dist/react';

const css = `
  .card-basic {
    max-width: 300px;
  }
`;

const App = () => (
  <>
    <SlCard className="card-basic" noShadow>
      This is just a basic card with no shadow.
    </SlCard>

    <style>{css}</style>
  </>
);
```

### Loading Card

Use the `loading` property to indicate that a process related to a card is in progress. An overlay will cover the entire card and an `sl-spinner` component will be displayed on top of the overlay.

```html:preview
<div class="page-basic">
  <sl-card class="card-loading" loading>
    This is a basic card in a loading state.
  </sl-card>
</div>

<style>
  .page-basic {
    background: var(--sl-color-neutral-100);
    padding: var(--ts-spacing-large);
  }
  .card-loading {
    max-width: 300px;
  }
</style>
```

```pug:slim
.page-basic
  sl-card.card-loading loading=true
    |   This is a basic card in a loading state.

css:
  .page-basic {
    @apply bg-gray-100 p-6;
  }
  .card-loading {
    @apply max-w-[300px];
  }
```

```jsx:react
import { SlCard } from '@teamshares/shoelace/dist/react';

const css = `
  .card-basic {
    max-width: 300px;
  }
`;

const App = () => (
  <>
    <SlCard className="card-basic" loading>
      This is a basic card in a loading state.
    </SlCard>

    <style>{css}</style>
  </>
);
```

### Empty State Card

Use the `emptyState` property to style the card for an empty state. This will make the card less prominent by setting the background color to transparent (showing the `gray-100` page behind it) and darken the border slightly.

```html:preview
<div class="page-basic">
    <sl-card class="card-empty" emptyState>
      This is a basic card styled as an empty state container.
      <br/><br/>
      Fill it with content using the Empty State View Component!
    </sl-card>
</div>
<style>
  .page-basic {
    background: var(--sl-color-neutral-100);
    padding: var(--ts-spacing-large);
  }
  .card-empty {
    max-width: 300px;
  }
</style>
```

```pug:slim
.page-basic
  sl-card.card-empty emptyState=true
    |  This is a basic card styled as an empty state container.
    br
    br
    |  Fill it with content using the Empty State View Component!

css:
  .page-basic {
    @apply bg-gray-100 p-6;
  }
  .card-empty {
    @apply max-w-[300px];
  }
```

```jsx:react
import { SlCard } from '@teamshares/shoelace/dist/react';

const css = `
  .card-basic {
    max-width: 300px;
  }
`;

const App = () => (
  <>
    <SlCard className="card-basic" loading>
      This is a basic card in a loading state.
    </SlCard>

    <style>{css}</style>
  </>
);
```

### Card with Header

Use `slot="header"` to display header content in the card. Other than padding and a bottom border, headers have no styling applied by default.

To optionally apply a <code>flex/space-between</code> layout to a header with a title and one or more button actions (or other content to display on the right), use the `actionHeader` property on `sl-card`.

```html:preview
<div class="page-basic">
  <sl-card class="card-header">
    <div slot="header">
      <div class="ts-heading-7">Card title</div>
      <div class="ts-body-2">Description</div>
    </div>
    This card has a header with no additional styling applied by default.
  </sl-card>
    <sl-card class="card-header" actionHeader >
    <div slot="header">
      <div class="ts-heading-7">Card title</div>
      <div class="header-actions">
        <sl-tooltip content="Edit">
          <sl-icon-button library="fa" name="pencil"></sl-icon-button>
        </sl-tooltip>
        <sl-tooltip content="Delete">
          <sl-icon-button library="fa" name="trash"></sl-icon-button>
        </sl-tooltip>
      </div>
    </div>
    This card is using the <code>actionHeader</code> property, which applies a <code>flex/space-between</code> layout to the header.
    <br/><br/>
    To display more than one action button, wrap the buttons in a container.
  </sl-card>
</div>
<style>
  .page-basic {
    background: var(--sl-color-neutral-100);
    padding: var(--ts-spacing-large);
  }
  .card-header {
    margin: var(--sl-spacing-x-small) 0;
    width: 100%;
  }
  .header-actions * {
    margin-inline-start: var(--sl-spacing-x-small);
  }
</style>
```

```pug:slim
.page-basic
  sl-card.card-header
    div slot="header"
      .ts-heading-7 Card title
      .ts-body-2 Description
    | This card has a header with no additional styling applied by default.
  sl-card.card-header actionHeader=true
    div slot="header"
      .ts-heading-7 Card title
      .header-actions
        sl-tooltip content="Edit"
          sl-icon-button library="fa" name="pencil"
        sl-tooltip content="Delete"
          sl-icon-button library="fa" name="trash"
    | This card is using the
    code actionHeader
    |  property, which applies a
    code flex/space-between
    |  layout to the header.
    br
    br
    | To display more than one action button, wrap the buttons in a container.

css:
  .page-basic {
    @apply bg-gray-100 p-6;
  }

  .card-header {
    @apply my-2 w-full;
  }

  .header-actions * {
    @apply ms-2;
  }
```

```jsx:react
import SlCard from '@teamshares/shoelace/dist/react/card';
import SlIconButton from '@teamshares/shoelace/dist/react/icon-button';

const css = `
  .card-header {
    max-width: 300px;
  }

  .card-header [slot="header"] {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .card-header sl-icon-button {
    font-size: var(--sl-font-size-medium);
  }
`;

const App = () => (
  <>
    <SlCard className="card-header">
      <div slot="header">
        Card header
        <SlIconButton library="fa" name="fas-pencil"></SlIconButton>
      </div>
      This card has a header. You can put all sorts of things in it!
    </SlCard>

    <style>{css}</style>
  </>
);
```

### Card with Footer

Use `slot="footer"` to display footer content in the card. Similar to the header, footers have no styling applied by default other than padding and a top border.

To optionally apply a `flex/flex-end` layout to a footer with one or more buttons, use the `buttonFooter` property on `sl-card`.

```html:preview
<div class="page-basic">
  <sl-card class="card-footer">
    This card has a footer with no additional styling applied by default.
    <div slot="footer">
      <a href="#" class="ts-body-2 ts-text-link">Use for links or whatever!</a>
    </div>
  </sl-card>
  <sl-card class="card-footer" buttonFooter>
    This card is using the <code>buttonFooter</code> property, which applies a <code>flex/flex-end</code> layout and <code>8 px gap</code>to footer elements.
    <div slot="footer">
      <sl-button variant="default">Default</sl-button>
      <sl-button variant="primary">Primary</sl-button>
    </div>
  </sl-card>
</div>

<style>
  .page-basic {
    background: var(--sl-color-neutral-100);
    padding: var(--ts-spacing-large);
  }
  .card-footer {
    margin: var(--sl-spacing-x-small) 0;
    width: 100%;
  }
</style>
```

```pug:slim
.page-basic
  sl-card.card-footer
    | This card has a footer with no additional styling applied by default.
    div slot="footer"
      a href="#" class="ts-body-2 ts-text-link" Use for links or whatever!
  sl-card.card-footer buttonFooter=true
    | Thi s card is using the
    code buttonFooter
    |  property, which applies a
    code flex/flex-end
    |  layout and
    code 8 px gap
    |  to footer elements.
    div slot="footer"
      sl-button variant="default" Default
      sl-button variant="primary" Primary
css:
  .page-basic {
    @apply bg-gray-100 p-6;
  }
  .card-footer {
    @apply my-2 w-full;
  }
```

```jsx:react
import SlButton from '@teamshares/shoelace/dist/react/button';
import SlCard from '@teamshares/shoelace/dist/react/card';
import SlRating from '@teamshares/shoelace/dist/react/rating';

const css = `
  .card-footer {
    max-width: 300px;
  }

  .card-footer [slot="footer"] {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-footer [slot='footer'] > * {
  margin-inline-start: 0.5rem;
  }
`;

const App = () => (
  <>
    <SlCard className="card-footer">
      This card has a footer. You can put all sorts of things in it!
      <div slot="footer">
        <SlRating></SlRating>
        <SlButton slot="footer" variant="primary">
          Preview
        </SlButton>
      </div>
    </SlCard>

    <style>{css}</style>
  </>
);
```

### Compact Card

Use the `compact` property to reduce spacing and remove the borders between the header, body, and footer.

```html:preview
<div class="page-basic">
  <sl-card class="card-compact" compact buttonFooter>
    <div slot="header">
      <div class="ts-heading-8">Compact card header</div>
    </div>
    This card is using the <code>compact</code> property, which reduces spacing and removes the borders between the header, body, and footer.
    <div slot="footer">
      <sl-button variant="default" size="small">Default</sl-button>
      <sl-button variant="primary" size="small">Primary</sl-button>
    </div>
  </sl-card>
</div>

<style>
  .card-compact {
    width: 400px;
  }
</style>
```

```pug:slim
.page-basic
  sl-card.card-compact compact=true buttonFooter=true
    div slot="header
      .ts-heading-8 Compact card header
    | This card is using the
    code compact
    | property, which reduces spacing and removes the borders between the header, body, and footer.
    div slot="footer"
      sl-button variant="default" size="small" Default
      sl-button variant="primary" size="small" Primary

css:
  .card-footer {
    @apply w-[400px];
  }
```

```jsx:react
import SlButton from '@teamshares/shoelace/dist/react/button';
import SlCard from '@teamshares/shoelace/dist/react/card';
import SlRating from '@teamshares/shoelace/dist/react/rating';

const css = `
  .card-footer {
    max-width: 300px;
  }

  .card-footer [slot="footer"] {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-footer [slot='footer'] > * {
  margin-inline-start: 0.5rem;
  }
`;

const App = () => (
  <>
    <SlCard className="card-footer">
      This card has a footer. You can put all sorts of things in it!
      <div slot="footer">
        <SlRating></SlRating>
        <SlButton slot="footer" variant="primary">
          Preview
        </SlButton>
      </div>
    </SlCard>

    <style>{css}</style>
  </>
);
```

### Images

Cards accept an `image` slot. The image is displayed atop the card and stretches to fit.

:::warning
**Note:** There's currently no use case for displaying images in cards in our apps, and there is no Figma component for this option. Please check with the design team before using this option.
:::

```html:preview
<sl-card class="card-image">
  <img
    slot="image"
    src="https://images.unsplash.com/photo-1547191783-94d5f8f6d8b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80"
    alt="A kitten walks towards camera on top of pallet."
  />
  This is a kitten, but not just any kitten. This kitten likes walking along pallets.
</sl-card>

<style>
  .card-image {
    max-width: 300px;
  }
</style>
```

```pug:slim
sl-card.card-image
  img slot="image" src="https://images.unsplash.com/photo-1547191783-94d5f8f6d8b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80" alt="A kitten walks towards camera on top of pallet."
  | This is a kitten, but not just any kitten. This kitten likes walking along pallets.

css:
  .card-image {
    max-width: 300px;
  }
```

```jsx:react
import SlCard from '@teamshares/shoelace/dist/react/card';

const css = `
  .card-image {
    max-width: 300px;
  }
`;

const App = () => (
  <>
    <SlCard className="card-image">
      <img
        slot="image"
        src="https://images.unsplash.com/photo-1547191783-94d5f8f6d8b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80"
        alt="A kitten walks towards camera on top of pallet."
      />
      This is a kitten, but not just any kitten. This kitten likes walking along pallets.
    </SlCard>

    <style>{css}</style>
  </>
);
```
