# Tooltip

[component-header:sl-tooltip]

Tooltips...

A tooltip's target is its _first child element_, so you should only wrap one element inside of a tooltip. If you need the tooltip to show up for multiple elements, nest them inside a container first.

```html preview
<sl-tooltip content="This is a tooltip">
  <sl-button>Hover Me</sl-button>
</sl-tooltip>
```

[component-metadata:sl-tooltip]

## Examples

### Placement

```html preview
<div class="tooltip-grid">
  <sl-tooltip content="This is a tooltip" placement="top-start">
    <div class="tooltip-target">top-start</div>
  </sl-tooltip>

  <sl-tooltip content="This is a tooltip" placement="top">
    <div class="tooltip-target">top</div>
  </sl-tooltip>

  <sl-tooltip content="This is a tooltip" placement="top-end">
    <div class="tooltip-target">top-end</div>
  </sl-tooltip>

  <sl-tooltip content="This is a tooltip" placement="bottom-start">
    <div class="tooltip-target">bottom-start</div>
  </sl-tooltip>

  <sl-tooltip content="This is a tooltip" placement="bottom">
    <div class="tooltip-target">bottom</div>
  </sl-tooltip>

  <sl-tooltip content="This is a tooltip" placement="bottom-end">
    <div class="tooltip-target">bottom-end</div>
  </sl-tooltip>

  <sl-tooltip content="This is a tooltip" placement="left-start">
    <div class="tooltip-target">left-start</div>
  </sl-tooltip>

  <sl-tooltip content="This is a tooltip" placement="left">
    <div class="tooltip-target">left</div>
  </sl-tooltip>

  <sl-tooltip content="This is a tooltip" placement="left-end">
    <div class="tooltip-target">left-end</div>
  </sl-tooltip>

  <sl-tooltip content="This is a tooltip" placement="right-start">
    <div class="tooltip-target">right-start</div>
  </sl-tooltip>

  <sl-tooltip content="This is a tooltip" placement="right">
    <div class="tooltip-target">right</div>
  </sl-tooltip>

  <sl-tooltip content="This is a tooltip" placement="right-end">
    <div class="tooltip-target">right-end</div>
  </sl-tooltip>
</div>

<style>
  .tooltip-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    gap: 1rem 1rem;
  }

  .tooltip-target {
    display: flex;
    min-height: 8em;

    border: dashed 1px var(--sl-color-primary-80);
    background-color: var(--sl-color-primary-95);
    font-size: var(--sl-font-size-x-small);
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }
</style>
```

### Manual Trigger

```html preview
<sl-tooltip content="I am shown and hidden programmatically" trigger="manual">
  <sl-button>Click to Toggle</sl-button>
</sl-tooltip>

<script>
  const tooltip = document.querySelector('sl-tooltip[trigger="manual"]');
  const button = tooltip.querySelector('sl-button');

  button.addEventListener('click', () => tooltip.open = !tooltip.open);
</script>
```
