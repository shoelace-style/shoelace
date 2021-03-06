# Rating

[component-header:sl-rating]

Ratings give users a way to quickly view and provide feedback.

```html preview
<sl-rating></sl-rating>
```

## Examples

### Maximum Value

Ratings are 0-5 by default. To change the maximum possible value, use the `max` attribute.

```html preview
<sl-rating max="3"></sl-rating>
```

### Precision

Use the `precision` attribute to let users select fractional ratings.

```html preview
<sl-rating precision=".5" value="2.5"></sl-rating>
```

## Symbol Sizes

Set the `--symbol-size` custom property to adjust the size.

```html preview
<sl-rating style="--symbol-size: 2rem;"></sl-rating>
```

### Readonly

Use the `readonly` attribute to display a rating that users can't change.

```html preview
<sl-rating readonly value="3"></sl-rating>
```

### Disabled

Use the `disable` attribute to disable the rating.

```html preview
<sl-rating disabled value="3"></sl-rating>
```

### Custom Icons

```html preview
<sl-rating class="rating-hearts" style="--symbol-color-active: #ff4136;"></sl-rating>

<script>
  const rating = document.querySelector('.rating-hearts');
  rating.getSymbol = () => '<sl-icon name="heart-fill"></sl-icon>'; 
</script>
```

### Value-based Icons

```html preview
<sl-rating class="rating-emojis"></sl-rating>

<script>
  const rating = document.querySelector('.rating-emojis');

  rating.symbol = (value) => {
    const icons = ['emoji-angry', 'emoji-frown', 'emoji-expressionless', 'emoji-smile', 'emoji-laughing'];
    return icons[value - 1];
  };
</script>
```

[component-metadata:sl-rating]
