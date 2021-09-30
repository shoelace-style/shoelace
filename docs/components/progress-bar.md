# Progress Bar

[component-header:sl-progress-bar]

Progress bars are used to show the status of an ongoing operation.

```html preview
<sl-progress-bar value="50"></sl-progress-bar>
```

## Examples

### Custom Height

Use the `--height` custom property to set the progress bar's height.

```html preview
<sl-progress-bar value="50" style="--height: 6px;"></sl-progress-bar>
```

### Labels

Use the default slot to show a label.

```html preview
<sl-progress-bar value="50" class="progress-bar-labels">50%</sl-progress-bar>

<br>

<sl-button circle><sl-icon name="dash"></sl-icon></sl-button>
<sl-button circle><sl-icon name="plus"></sl-icon></sl-button>

<script>
  const progressBar = document.querySelector('.progress-bar-labels');
  const subtractButton = progressBar.nextElementSibling.nextElementSibling;
  const addButton = subtractButton.nextElementSibling;

  addButton.addEventListener('click', () => {
    const value = Math.min(100, progressBar.value + 10);
    progressBar.value = value;
    progressBar.textContent = `${value}%`;
  });

  subtractButton.addEventListener('click', () => {
    const value = Math.max(0, progressBar.value - 10)
    progressBar.value = value;
    progressBar.textContent = `${value}%`;
  });
</script>
```

### Indeterminate

The `indeterminate` attribute can be used to inform the user that the operation is pending, but its status cannot currently be determined. In this state, `value` is ignored and the label, if present, will not be shown.

```html preview
<sl-progress-bar indeterminate></sl-progress-bar>
```

[component-metadata:sl-progress-bar]
