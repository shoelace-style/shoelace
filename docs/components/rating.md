# Rating

[component-header:sl-rating]

```html preview
<sl-rating label="Rating"></sl-rating>
```

```jsx react
import { SlRating } from '@teamshares/shoelace/dist/react';

const App = () => <SlRating label="Rating" />;
```

## Examples

### Labels

Ratings are commonly identified contextually, so labels aren't displayed. However, you should always provide one for assistive devices using the `label` attribute.

```html preview
<sl-rating label="Rate this component"></sl-rating>
```

```jsx react
import { SlRating } from '@teamshares/shoelace/dist/react';

const App = () => <SlRating label="Rate this component" />;
```

### Maximum Value

Ratings are 0-5 by default. To change the maximum possible value, use the `max` attribute.

```html preview
<sl-rating label="Rating" max="3"></sl-rating>
```

```jsx react
import { SlRating } from '@teamshares/shoelace/dist/react';

const App = () => <SlRating label="Rating" max={3} />;
```

### Precision

Use the `precision` attribute to let users select fractional ratings.

```html preview
<sl-rating label="Rating" precision="0.5" value="2.5"></sl-rating>
```

```jsx react
import { SlRating } from '@teamshares/shoelace/dist/react';

const App = () => <SlRating label="Rating" precision={0.5} value={2.5} />;
```

## Symbol Sizes

Set the `--symbol-size` custom property to adjust the size.

```html preview
<sl-rating label="Rating" style="--symbol-size: 2rem;"></sl-rating>
```

```jsx react
import { SlRating } from '@teamshares/shoelace/dist/react';

const App = () => <SlRating label="Rating" style={{ '--symbol-size': '2rem' }} />;
```

### Readonly

Use the `readonly` attribute to display a rating that users can't change.

```html preview
<sl-rating label="Rating" readonly value="3"></sl-rating>
```

```jsx react
import { SlRating } from '@teamshares/shoelace/dist/react';

const App = () => <SlRating label="Rating" readonly value={3} />;
```

### Disabled

Use the `disable` attribute to disable the rating.

```html preview
<sl-rating label="Rating" disabled value="3"></sl-rating>
```

```jsx react
import { SlRating } from '@teamshares/shoelace/dist/react';

const App = () => <SlRating label="Rating" disabled value={3} />;
```

### Custom Icons

You can provide custom icons by passing a function to the `getSymbol` property.

```html preview
<sl-rating label="Rating" class="rating-hearts" style="--symbol-color-active: #ff4136;"></sl-rating>

<script>
  const rating = document.querySelector('.rating-hearts');
  rating.getSymbol = () => '<sl-icon name="heart-solid"></sl-icon>';
</script>
```

```jsx react
import '@teamshares/shoelace/dist/components/icon/icon';
import { SlRating } from '@teamshares/shoelace/dist/react';

const App = () => (
  <SlRating
    label="Rating"
    getSymbol={() => '<sl-icon name="heart-solid"></sl-icon>'}
    style={{ '--symbol-color-active': '#ff4136' }}
  />
);
```

### Value-based Icons

You can also use the `getSymbol` property to render different icons based on value.

```html preview
<sl-rating label="Rating" class="rating-emojis"></sl-rating>

<script>
  const rating = document.querySelector('.rating-emojis');

  rating.getSymbol = value => {
    const icons = ['emoji-angry', 'emoji-frown', 'emoji-expressionless', 'emoji-smile', 'emoji-laughing'];
    return `<sl-icon name="${icons[value - 1]}" library="bootstrap"></sl-icon>`;
  };
</script>
```

```jsx react
import '@teamshares/shoelace/dist/components/icon/icon';
import { SlRating } from '@teamshares/shoelace/dist/react';

function getSymbol(value) {
  const icons = ['emoji-angry', 'emoji-frown', 'emoji-expressionless', 'emoji-smile', 'emoji-laughing'];
  return `<sl-icon name="${icons[value - 1]}" library="bootstrap"></sl-icon>`;
}

const App = () => <SlRating label="Rating" getSymbol={getSymbol} />;
```

[component-metadata:sl-rating]
