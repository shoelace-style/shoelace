# Popup

[component-header:sl-popup]

A description of the component goes here.

```html preview
<div class="popup-overview">
  <sl-popup placement="top" active>
    <span slot="anchor"></span>
    <div class="box"></div>
  </sl-popup>

  <div class="popup-overview-options">
    <sl-select label="Placement" name="placement" value="top" class="popup-overview-select">
      <sl-menu-item value="top">top</sl-menu-item>
      <sl-menu-item value="top-start">top-start</sl-menu-item>
      <sl-menu-item value="top-end">top-end</sl-menu-item>
      <sl-menu-item value="bottom">bottom</sl-menu-item>
      <sl-menu-item value="bottom-start">bottom-start</sl-menu-item>
      <sl-menu-item value="bottom-end">bottom-end</sl-menu-item>
      <sl-menu-item value="right">right</sl-menu-item>
      <sl-menu-item value="right-start">right-start</sl-menu-item>
      <sl-menu-item value="right-end">right-end</sl-menu-item>
      <sl-menu-item value="left">left</sl-menu-item>
      <sl-menu-item value="left-start">left-start</sl-menu-item>
      <sl-menu-item value="left-end">left-end</sl-menu-item>
    </sl-select>
    <sl-input type="number" name="distance" label="distance" value="0"></sl-input>
    <sl-input type="number" name="skidding" label="Skidding" value="0"></sl-input>
  </div>

  <div class="popup-overview-options">
    <sl-switch name="active" checked>Active</sl-switch>
    <sl-switch name="flip">Flip</sl-switch>
    <sl-switch name="arrow">Arrow</sl-switch>
    <sl-switch name="fixed">Fixed</sl-switch>
  </div>
</div>

<script>
  const container = document.querySelector('.popup-overview');
  const popup = container.querySelector('sl-popup');
  const select = container.querySelector('sl-select[name="placement"]');
  const distance = container.querySelector('sl-input[name="distance"]');
  const skidding = container.querySelector('sl-input[name="skidding"]');
  const active = container.querySelector('sl-switch[name="active"]');
  const flip = container.querySelector('sl-switch[name="flip"]');
  const arrow = container.querySelector('sl-switch[name="arrow"]');
  const fixed = container.querySelector('sl-switch[name="fixed"]');

  select.addEventListener('sl-change', () => (popup.placement = select.value));
  distance.addEventListener('sl-input', () => (popup.distance = distance.value));
  skidding.addEventListener('sl-input', () => (popup.skidding = skidding.value));
  active.addEventListener('sl-change', () => (popup.active = active.checked));
  flip.addEventListener('sl-change', () => (popup.flip = flip.checked));
  arrow.addEventListener('sl-change', () => (popup.arrow = arrow.checked));
  fixed.addEventListener('sl-change', () => (popup.strategy = fixed.checked ? 'fixed' : 'absolute'));
</script>

<style>
  .popup-overview sl-popup {
    --arrow-color: var(--sl-color-primary-600);
  }

  .popup-overview span[slot='anchor'] {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: dashed 2px var(--sl-color-neutral-200);
    margin: 50px;
  }

  .popup-overview .box {
    width: 50px;
    height: 50px;
    max-width: 100%;
    max-height: 100%;
    background: var(--sl-color-primary-600);
  }

  .popup-overview-options {
    display: flex;
    flex-wrap: wrap;
    align-items: end;
    gap: 1rem;
  }

  .popup-overview-options sl-select {
    width: 160px;
  }

  .popup-overview-options sl-input {
    width: 100px;
  }

  .popup-overview-options + .popup-overview-options {
    margin-top: 1rem;
  }
</style>
```

## Examples

### Placement

TODO

### Distance

TODO

### Skidding

TODO

### Positioning Strategy

By default, an absolute positioning strategy is used. However, if your content is fixed or within a container that has `overflow: auto|hidden`, the popup will be clipped. To work around this, you can switch to the fixed positioning strategy by setting the `strategy` attribute to `fixed`.

The fixed positioning reduces jumpiness when the anchor is fixed and allows the content to break out containers that clip them. When using this strategy, it's important to note that the content will be positioned _relative to its containing block_, which is usually the viewport unless an ancestor uses a `transform`, `perspective`, or `filter`. [Refer to this page](https://developer.mozilla.org/en-US/docs/Web/CSS/position#fixed) for more details.

TODO

### Flip

TODO

### Shift

TODO

### Resize

TODO

### Arrows

TODO

[component-metadata:sl-popup]
