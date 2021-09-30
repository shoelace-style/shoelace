# Progress Ring

[component-header:sl-progress-ring]

Progress rings are used to show the progress of a determinate operation in a circular fashion.

```html preview
<sl-progress-ring value="25"></sl-progress-ring>
```

## Examples

### Size

Use the `--size` custom property to set the diameter of the progress ring.

```html preview
<sl-progress-ring value="50" style="--size: 200px;"></sl-progress-ring>
```

### Track Width

Use the `track-width` attribute to set the width of the progress ring's track.

```html preview
<sl-progress-ring value="50" stroke-width="10"></sl-progress-ring>
```

### Colors

To change the color, use the `--track-color` and `--indicator-color` custom properties.

```html preview
<sl-progress-ring 
  value="50" 
  style="
    --track-color: pink; 
    --indicator-color: deeppink;
  "
></sl-progress-ring>
```

### Labels

Use the default slot to show a label.

```html preview
<sl-progress-ring value="50" class="progress-ring-labels" style="margin-bottom: .5rem;">50%</sl-progress-ring>

<br>

<sl-button circle><sl-icon name="dash"></sl-icon></sl-button>
<sl-button circle><sl-icon name="plus"></sl-icon></sl-button>

<script>
  const progressRing = document.querySelector('.progress-ring-labels');
  const subtractButton = progressRing.nextElementSibling.nextElementSibling;
  const addButton = subtractButton.nextElementSibling;

  addButton.addEventListener('click', () => {
    const value = Math.min(100, progressRing.value + 10);
    progressRing.value = value;
    progressRing.textContent = `${value}%`;
  });

  subtractButton.addEventListener('click', () => {
    const value = Math.max(0, progressRing.value - 10)
    progressRing.value = value;
    progressRing.textContent = `${value}%`;
  });
</script>
```

[component-metadata:sl-progress-ring]
