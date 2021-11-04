# Rating

[component-header:sl-rating]

Ratings give users a way to quickly view and provide feedback.

```html preview
<sl-rating></sl-rating>
```

```jsx react
import { SlRating } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlRating />
);
```

## Examples

### Maximum Value

Ratings are 0-5 by default. To change the maximum possible value, use the `max` attribute.

```html preview
<sl-rating max="3"></sl-rating>
```

```jsx react
import { SlRating } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlRating max={3} />
);
```

### Precision

Use the `precision` attribute to let users select fractional ratings.

```html preview
<sl-rating precision="0.5" value="2.5"></sl-rating>
```

```jsx react
import { SlRating } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlRating precision={0.5} value={2.5} />
);
```

## Symbol Sizes

Set the `--symbol-size` custom property to adjust the size.

```html preview
<sl-rating style="--symbol-size: 2rem;"></sl-rating>
```

```jsx react
import { SlRating } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlRating style={{ '--symbol-size': '2rem' }} />
);
```

### Readonly

Use the `readonly` attribute to display a rating that users can't change.

```html preview
<sl-rating readonly value="3"></sl-rating>
```

```jsx react
import { SlRating } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlRating readonly value={3} />
);
```

### Disabled

Use the `disable` attribute to disable the rating.

```html preview
<sl-rating disabled value="3"></sl-rating>
```

```jsx react
import { SlRating } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlRating disabled value={3} />
);
```

### Custom Icons

```html preview
<sl-rating class="rating-hearts" style="--symbol-color-active: #ff4136;"></sl-rating>

<script>
  const rating = document.querySelector('.rating-hearts');
  rating.getSymbol = () => '<sl-icon name="heart-fill"></sl-icon>'; 
</script>
```

```jsx react
import '@shoelace-style/shoelace/dist/components/icon/icon';
import { SlRating } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlRating 
    getSymbol={() => '<sl-icon name="heart-fill"></sl-icon>'}
    style={{ '--symbol-color-active': '#ff4136' }} 
  />
);
```

### Value-based Icons

```html preview
<sl-rating class="rating-emojis"></sl-rating>

<script>
  const rating = document.querySelector('.rating-emojis');

  rating.getSymbol = (value) => {
    const icons = ['emoji-angry', 'emoji-frown', 'emoji-expressionless', 'emoji-smile', 'emoji-laughing'];
    return `<sl-icon name="${icons[value - 1]}"></sl-icon>`;
  };
</script>
```

```jsx react
import '@shoelace-style/shoelace/dist/components/icon/icon';
import { SlRating } from '@shoelace-style/shoelace/dist/react';

function getSymbol(value) {
  const icons = ['emoji-angry', 'emoji-frown', 'emoji-expressionless', 'emoji-smile', 'emoji-laughing'];
  return `<sl-icon name="${icons[value - 1]}"></sl-icon>`;
}

const App = () => (
  <SlRating getSymbol={getSymbol} />
);
```

[component-metadata:sl-rating]
