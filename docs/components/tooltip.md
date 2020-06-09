# Tooltip

[component-header:sl-tooltip]

Tooltips...

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

```html preview
<sl-tooltip content="This is a tooltip">
  <sl-button>Tooltip</sl-button>
</sl-tooltip>
```

## TODO 🧪 

- [ ] Disabled state
- [ ] Show/hide delay
- [ ] Show/hide duration
- [ ] Customizable animations (?)
- [ ] Show on focus
- [ ] Show via method
- [ ] Accessibility
- [ ] Emit events and make show/hide preventable

[component-metadata:sl-tooltip]

## Examples

### Placement

```html preview
<div class="tooltip-grid">
  <sl-tooltip content="This is a tooltip" placement="top">
    <div class="tooltip-target">top</div>
  </sl-tooltip>

  <sl-tooltip content="This is a tooltip" placement="top-start">
    <div class="tooltip-target">top-start</div>
  </sl-tooltip>

  <sl-tooltip content="This is a tooltip" placement="top-end">
    <div class="tooltip-target">top-end</div>
  </sl-tooltip>

  <sl-tooltip content="This is a tooltip" placement="bottom">
    <div class="tooltip-target">bottom</div>
  </sl-tooltip>

  <sl-tooltip content="This is a tooltip" placement="bottom-start">
    <div class="tooltip-target">bottom-start</div>
  </sl-tooltip>

  <sl-tooltip content="This is a tooltip" placement="bottom-end">
    <div class="tooltip-target">bottom-end</div>
  </sl-tooltip>

  <sl-tooltip content="This is a tooltip" placement="left">
    <div class="tooltip-target">left</div>
  </sl-tooltip>

  <sl-tooltip content="This is a tooltip" placement="left-start">
    <div class="tooltip-target">left-start</div>
  </sl-tooltip>

  <sl-tooltip content="This is a tooltip" placement="left-end">
    <div class="tooltip-target">left-end</div>
  </sl-tooltip>

  <sl-tooltip content="This is a tooltip" placement="right">
    <div class="tooltip-target">right</div>
  </sl-tooltip>

  <sl-tooltip content="This is a tooltip" placement="right-start">
    <div class="tooltip-target">right-start</div>
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
    min-height: 10em;

    border: solid 1px var(--sl-color-primary-80);
    background: var(--sl-color-primary-95);
    font-size: var(--sl-font-size-x-small);
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }
</style>
```
