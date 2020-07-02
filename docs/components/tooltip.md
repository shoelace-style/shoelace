# Tooltip

[component-header:sl-tooltip]

Tooltips...

A tooltip's target is its _first child element_, so you should only wrap one element inside of a tooltip. If you need the tooltip to show up for multiple elements, nest them inside a container first.

```html preview
<sl-tooltip content="This is a tooltip">
  <sl-button>Hover Me</sl-button>
</sl-tooltip>
```

## Examples

### Placement

```html preview
<div class="tooltip-placement-example">
  <div class="tooltip-placement-example-row">
    <sl-tooltip content="top-start" placement="top-start">
      <sl-button></sl-button>
    </sl-tooltip>

    <sl-tooltip content="top" placement="top">
      <sl-button></sl-button>
    </sl-tooltip>

    <sl-tooltip content="top-end" placement="top-end">
      <sl-button></sl-button>
    </sl-tooltip>
  </div>

  <div class="tooltip-placement-example-row">
    <sl-tooltip content="left-start" placement="left-start">
      <sl-button></sl-button>
    </sl-tooltip>

    <sl-tooltip content="right-start" placement="right-start" style="margin-left: 400px;">
      <sl-button></sl-button>
    </sl-tooltip>
  </div>

  <div class="tooltip-placement-example-row">
    <sl-tooltip content="left" placement="left">
      <sl-button></sl-button>
    </sl-tooltip>

    <sl-tooltip content="right" placement="right">
      <sl-button></sl-button>
    </sl-tooltip>
  </div>

  <div class="tooltip-placement-example-row">
    <sl-tooltip content="left-end" placement="left-end">
      <sl-button></sl-button>
    </sl-tooltip>    

    <sl-tooltip content="right-end" placement="right-end">
      <sl-button></sl-button>
    </sl-tooltip>
  </div>

  <div class="tooltip-placement-example-row">
    <sl-tooltip content="bottom-start" placement="bottom-start">
      <sl-button></sl-button>
    </sl-tooltip>

    <sl-tooltip content="bottom" placement="bottom">
      <sl-button></sl-button>
    </sl-tooltip>

    <sl-tooltip content="bottom-end" placement="bottom-end">
      <sl-button></sl-button>
    </sl-tooltip>
  </div>  
</div>

<style>
  .tooltip-placement-example {
    width: 250px;
  }

  .tooltip-placement-example-row::after {
    content: '';
    display: table;
    clear: both;
  }

  .tooltip-placement-example sl-button {
    float: left;
    margin-right: .25rem;
    margin-bottom: .25rem;
  }

  .tooltip-placement-example [placement="top-start"] sl-button,
  .tooltip-placement-example [placement="bottom-start"] sl-button {
    margin-left: calc(40px + .25rem);
  }

  .tooltip-placement-example [placement^="right"] sl-button {
    margin-left: calc((40px * 3) + (.25rem * 3));
  }
</style>
```

### Click Trigger

```html preview
<sl-tooltip content="Click again to dismiss" trigger="click">
  <sl-button>Click to Toggle</sl-button>
</sl-tooltip>
```

### Manual Trigger

```html preview
<sl-button style="margin-right: 4rem;">Toggle Manually</sl-button>

<sl-tooltip content="This is an avatar" class="manual-tooltip">
  <sl-avatar></sl-avatar>
</sl-tooltip>


<script>
  const tooltip = document.querySelector('.manual-tooltip');
  const toggle = tooltip.previousElementSibling;

  toggle.addEventListener('click', () => tooltip.open = !tooltip.open);
</script>
```

### No Arrows

```html preview
<div style="--sl-tooltip-arrow-size: 0">
  <sl-tooltip content="This is a tooltip">
    <sl-button>Above</sl-button>
  </sl-tooltip>


  <sl-tooltip content="This is a tooltip" placement="bottom">
    <sl-button>Below</sl-button>
  </sl-tooltip>
</div>
```

[component-metadata:sl-tooltip]
