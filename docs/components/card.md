# Card

[component-header:sl-card]

Cards can be used to group related subjects in a container.

```html preview
<sl-card class="card-overview">
  <img 
    slot="image" 
    src="https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" 
    alt="A kitten sits patiently between a terracotta pot and decorative grasses."
  >

  <strong>Mittens</strong><br>
  This kitten is as cute as he is playful. Bring him home today!<br>
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
    color: var(--sl-color-neutral-500);
  }

  .card-overview [slot="footer"] {
    display: flex; 
    justify-content: space-between; 
    align-items: center;
  }
</style>
```

```jsx react
import { 
  SlButton, 
  SlCard, 
  SlRating 
} from '@shoelace-style/shoelace/dist/react';

const css = `
  .card-overview {
    max-width: 300px;
  }

  .card-overview small {
    color: var(--sl-color-neutral-500);
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

      <strong>Mittens</strong><br />
      This kitten is as cute as he is playful. Bring him home today!<br />
      <small>6 weeks old</small>

      <div slot="footer">
        <SlButton variant="primary" pill>More Info</SlButton>
        <SlRating></SlRating>
      </div>
    </SlCard>

    <style>{css}</style>
  </>
);
```

## Examples

## Basic Card

Basic cards aren't very exciting, but they can display any content you want them to.

```html preview
<sl-card class="card-basic">
  This is just a basic card. No image, no header, and no footer. Just your content.
</sl-card>

<style>
  .card-basic {
    max-width: 300px;
  }
</style>
```

```jsx react
import { SlCard } from '@shoelace-style/shoelace/dist/react';

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

## Card with Header

Headers can be used to display titles and more.

```html preview
<sl-card class="card-header">
  <div slot="header">
    Header Title

    <sl-icon-button name="gear"></sl-icon-button>
  </div>

  This card has a header. You can put all sorts of things in it!
</sl-card>

<style>
  .card-header {
    max-width: 300px;
  }

  .card-header [slot="header"] {
    display: flex; 
    align-items: center; 
    justify-content: space-between;
  }

  .card-header h3 {
    margin: 0;
  }

  .card-header sl-icon-button {
    font-size: var(--sl-font-size-medium);
  }
</style>
```

```jsx react
import { SlCard, SlIconButton } from '@shoelace-style/shoelace/dist/react';

const css = `
  .card-header {
    max-width: 300px;
  }

  .card-header [slot="header"] {
    display: flex; 
    align-items: center; 
    justify-content: space-between;
  }

  .card-header h3 {
    margin: 0;
  }

  .card-header sl-icon-button {
    font-size: var(--sl-font-size-medium);
  }
`;

const App = () => (
  <>
    <SlCard className="card-header">
      <div slot="header">
        Header Title

        <SlIconButton name="gear"></SlIconButton>
      </div>

      This card has a header. You can put all sorts of things in it!
    </SlCard>

    <style>{css}</style>
  </>
);
```

## Card with Footer

Footers can be used to display actions, summaries, or other relevant content.

```html preview
<sl-card class="card-footer">
  This card has a footer. You can put all sorts of things in it!

  <div slot="footer">
    <sl-rating></sl-rating>
    <sl-button slot="footer" variant="primary">Preview</sl-button>
  </div>
</sl-card>

<style>
  .card-footer {
    max-width: 300px;
  }

  .card-footer [slot="footer"] {
    display: flex; 
    justify-content: space-between; 
    align-items: center;
  }
</style>
```

```jsx react
import { 
  SlButton, 
  SlCard, 
  SlRating 
} from '@shoelace-style/shoelace/dist/react';

const css = `
  .card-footer {
    max-width: 300px;
  }

  .card-footer [slot="footer"] {
    display: flex; 
    justify-content: space-between; 
    align-items: center;
  }
`;

const App = () => (
  <>
    <SlCard className="card-footer">
      This card has a footer. You can put all sorts of things in it!

      <div slot="footer">
        <SlRating></SlRating>
        <SlButton slot="footer" variant="primary">Preview</SlButton>
      </div>
    </SlCard>

    <style>{css}</style>
  </>
);
```

## Images

Cards accept an `image` slot. The image is displayed atop the card and stretches to fit.

```html preview
<sl-card class="card-image">
  <img 
    slot="image" 
    src="https://images.unsplash.com/photo-1547191783-94d5f8f6d8b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80" 
    alt="A kitten walks towards camera on top of pallet."
  >
  This is a kitten, but not just any kitten. This kitten likes walking along pallets.
</sl-card>

<style>
  .card-image {
    max-width: 300px;
  }
</style>
```

```jsx react
import { SlCard } from '@shoelace-style/shoelace/dist/react';

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

[component-metadata:sl-card]
