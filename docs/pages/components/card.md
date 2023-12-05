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
    sl-button variant="primary" pill="true" More Info
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

Basic cards aren't very exciting, but they can display any content you want them to.

```html:preview
<sl-card class="card-basic">
  This is just a basic card. No image, no header, and no footer. Just your content.
</sl-card>

<style>
  .card-basic {
    max-width: 300px;
  }
</style>
```

```pug:slim
sl-card.card-basic
  | This is just a basic card. No image, no header, and no footer. Just your content.

css:
  .card-basic {
    max-width: 300px;
  }
```

```jsx:react
import SlCard from '@teamshares/shoelace/dist/react/card';

const css = `
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

Use the `noShadow` property to remove a card's default box shadow.

```html:preview
<sl-card class="card-basic" noShadow> This is just a basic card with no shadow. </sl-card>

<style>
  .card-basic {
    max-width: 300px;
  }
</style>
```

```pug:slim
sl-card.card-basic noShadow=true
  |   This is just a basic card with no shadow.

css:
  .card-basic {
    max-width: 300px;
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

### Card with Header

Headers can be used to display titles, actions, and more. Other than padding and a bottom border, headers have no styling applied by default.

```html:preview
<sl-card class="card-header">
  <div slot="header">
    Card header
    <sl-icon-button library="fa" name="fas-pencil" label="Edit settings"></sl-icon-button>
  </div>

  This card has a header. You can put all sorts of things in it!
</sl-card>

<style>
  .card-header {
    max-width: 300px;
  }

  .card-header [slot='header'] {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

.card-header sl-icon-button {
    font-size: var(--sl-font-size-medium);
  }
</style>
```

```pug:slim
sl-card.card-header
  div slot="header"
    | Card header
    sl-icon-button library="fa" name="fas-pencil" label="Edit settings"
  | This card has a header. You can put all sorts of things in it!

css:
  .card-header {
    max-width: 300px;
  }

  .card-header [slot=header] {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .card-header sl-icon-button {
    font-size: var(--sl-font-size-medium);
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

Footers can be used to display actions, summaries, or other relevant content. Similar to the header, footers have no styling applied by default other than padding and a top border.

```html:preview
<sl-card class="card-footer">
  This card has a footer. You can put all sorts of things in it!

  <div slot="footer">
    <sl-button variant="default">Previous</sl-button>
    <sl-button variant="primary">Next</sl-button>
  </div>
</sl-card>

<style>
  .card-footer {
    max-width: 300px;
  }

  .card-footer [slot='footer'] {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .card-footer [slot='footer'] > * {
    margin-inline-start: 0.5rem;
  }
</style>
```

```pug:slim
sl-card.card-footer
  | This card has a footer. You can put all sorts of things in it!
  div slot="footer"
    sl-rating
    sl-button variant="primary" Preview

css:
  .card-footer {
    max-width: 300px;
  }

  .card-footer [slot=footer] {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-footer [slot='footer'] > * {
    margin-inline-start: 0.5rem;
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
