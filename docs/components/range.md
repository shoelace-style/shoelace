# Range

```html preview
<sl-range min="0" max="100" step="1"></sl-range>

<br><br>

<sl-range min="0" max="100" step="1" tooltip="bottom"></sl-range>

<br><br>

<sl-range id="range-with-custom-formatter" min="0" max="100" step="1"></sl-range>
<script>
(() => {
  document.querySelector('#range-with-custom-formatter').tooltipFormatter = value => `Total - ${value}%`;
})();
</script>

<br><br>

<sl-range min="1" max="10" step=".25"></sl-range>

<br><br>

<sl-range min="0" max="100" step="1" disabled></sl-range>

<br><br>

<sl-range min="0" max="100" step="1" tooltip="off"></sl-range>
```

[component-metadata:sl-range]