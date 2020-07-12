# Progress Bar

[component-header:sl-progress-bar]

Progress bars are used to show the progress of a determinate operation.

```html preview
<sl-progress-bar percentage="50"></sl-progress-bar>
```

## Examples

### Custom Height

Use the `--height` custom property to set the progress bar's height.

```html preview
<sl-progress-bar percentage="50" style="--height: 6px;"></sl-progress-bar>
```

### Labels

Use the default slot to show a label.

```html preview
<sl-progress-bar percentage="50" class="progress-bar-labels">50%</sl-progress-bar>

<br>

<sl-button circle><sl-icon name="dash"></sl-icon></sl-button>
<sl-button circle><sl-icon name="plus"></sl-icon></sl-button>

<script>
  const progressBar = document.querySelector('.progress-bar-labels');
  const subtractButton = progressBar.nextElementSibling.nextElementSibling;
  const addButton = subtractButton.nextElementSibling;

  addButton.addEventListener('click', () => {
    const percentage = Math.min(100, progressBar.percentage + 10);
    progressBar.percentage = percentage;
    progressBar.textContent = `${percentage}%`;
  });

  subtractButton.addEventListener('click', () => {
    const percentage = Math.max(0, progressBar.percentage - 10)
    progressBar.percentage = percentage;
    progressBar.textContent = `${percentage}%`;
  });
</script>
```

[component-metadata:sl-progress-bar]
