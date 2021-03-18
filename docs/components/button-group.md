# Button Group

[component-header:sl-button-group]

Button groups can be used to group related buttons into sections.

```html preview
<sl-button-group>
  <sl-button>Left</sl-button>
  <sl-button>Center</sl-button>
  <sl-button>Right</sl-button>
</sl-button-group>
```

## Examples

### Button Sizes

All button sizes are supported, but avoid mixing sizes within the same button group.

```html preview
<sl-button-group>
  <sl-button size="small">Left</sl-button>
  <sl-button size="small">Center</sl-button>
  <sl-button size="small">Right</sl-button>
</sl-button-group>

<br><br>

<sl-button-group>
  <sl-button size="medium">Left</sl-button>
  <sl-button size="medium">Center</sl-button>
  <sl-button size="medium">Right</sl-button>
</sl-button-group>

<br><br>

<sl-button-group>
  <sl-button size="large">Left</sl-button>
  <sl-button size="large">Center</sl-button>
  <sl-button size="large">Right</sl-button>
</sl-button-group>
```

### Theme Buttons

Theme buttons are supported through the button's `type` attribute.

```html preview
<sl-button-group>
  <sl-button type="primary">Left</sl-button>
  <sl-button type="primary">Center</sl-button>
  <sl-button type="primary">Right</sl-button>
</sl-button-group>

<br><br>

<sl-button-group>
  <sl-button type="success">Left</sl-button>
  <sl-button type="success">Center</sl-button>
  <sl-button type="success">Right</sl-button>
</sl-button-group>

<br><br>

<sl-button-group>
  <sl-button type="info">Left</sl-button>
  <sl-button type="info">Center</sl-button>
  <sl-button type="info">Right</sl-button>
</sl-button-group>

<br><br>

<sl-button-group>
  <sl-button type="warning">Left</sl-button>
  <sl-button type="warning">Center</sl-button>
  <sl-button type="warning">Right</sl-button>
</sl-button-group>

<br><br>

<sl-button-group>
  <sl-button type="danger">Left</sl-button>
  <sl-button type="danger">Center</sl-button>
  <sl-button type="danger">Right</sl-button>
</sl-button-group>
```

### Pill Buttons

Pill buttons are supported through the button's `pill` attribute.

```html preview
<sl-button-group>
  <sl-button size="small" pill>Left</sl-button>
  <sl-button size="small" pill>Center</sl-button>
  <sl-button size="small" pill>Right</sl-button>
</sl-button-group>

<br><br>

<sl-button-group>
  <sl-button size="medium" pill>Left</sl-button>
  <sl-button size="medium" pill>Center</sl-button>
  <sl-button size="medium" pill>Right</sl-button>
</sl-button-group>

<br><br>

<sl-button-group>
  <sl-button size="large" pill>Left</sl-button>
  <sl-button size="large" pill>Center</sl-button>
  <sl-button size="large" pill>Right</sl-button>
</sl-button-group>
```

### Dropdowns in Button Groups

Dropdowns can be placed inside button groups as long as the trigger is a `<sl-button>` element.

```html preview
<sl-button-group> 
  <sl-button>Button</sl-button>
  <sl-button>Button</sl-button>
  <sl-dropdown>
    <sl-button slot="trigger" caret>Dropdown</sl-button>
    <sl-menu>
      <sl-menu-item>Item 1</sl-menu-item>
      <sl-menu-item>Item 2</sl-menu-item>
      <sl-menu-item>Item 3</sl-menu-item>
    </sl-menu>
  </sl-dropdown>
</sl-button-group>
```

### Split Buttons

Create a split button using a button and a dropdown.

```html preview
<sl-button-group> 
  <sl-button type="primary">Save</sl-button>
  <sl-dropdown placement="bottom-end">
    <sl-button slot="trigger" type="primary" caret></sl-button>
    <sl-menu>
      <sl-menu-item>Save</sl-menu-item>
      <sl-menu-item>Save as&hellip;</sl-menu-item>
      <sl-menu-item>Save all</sl-menu-item>
    </sl-menu>
  </sl-dropdown>
</sl-button-group>
```

### Tooltips in Button Groups

Buttons can be wrapped in tooltips to provide more detail when the user interacts with them.

```html preview
<sl-button-group>
  <sl-tooltip content="I'm on the left">
    <sl-button>Left</sl-button>
  </sl-tooltip>

  <sl-tooltip content="I'm in the middle">
    <sl-button>Center</sl-button>
  </sl-tooltip>

  <sl-tooltip content="I'm on the right">
    <sl-button>Right</sl-button>
  </sl-tooltip>
</sl-button-group>
```

### Toolbar Example

Create interactive toolbars with button groups.

```html preview
<div class="button-group-toolbar">
  <sl-button-group label="History">
    <sl-tooltip content="Undo">
      <sl-button><sl-icon name="arrow-counterclockwise"></sl-icon></sl-button>
    </sl-tooltip>
    <sl-tooltip content="Redo">
      <sl-button><sl-icon name="arrow-clockwise"></sl-icon></sl-button>
    </sl-tooltip>
  </sl-button-group>

  <sl-button-group label="Formatting">
    <sl-tooltip content="Bold">
      <sl-button><sl-icon name="type-bold"></sl-icon></sl-button>
    </sl-tooltip>
    <sl-tooltip content="Italic">
      <sl-button><sl-icon name="type-italic"></sl-icon></sl-button>
    </sl-tooltip>
    <sl-tooltip content="Underline">
      <sl-button><sl-icon name="type-underline"></sl-icon></sl-button>
    </sl-tooltip>
  </sl-button-group>

  <sl-button-group label="Alignment">
    <sl-tooltip content="Align Left">
      <sl-button><sl-icon name="justify-left"></sl-icon></sl-button>
    </sl-tooltip>
    <sl-tooltip content="Align Center">
      <sl-button><sl-icon name="justify"></sl-icon></sl-button>
    </sl-tooltip>
    <sl-tooltip content="Align Right">
      <sl-button><sl-icon name="justify-right"></sl-icon></sl-button>
    </sl-tooltip>
  </sl-button-group>
</div>

<style>
  .button-group-toolbar sl-button-group:not(:last-of-type) {
    margin-right: var(--sl-spacing-x-small);
  }
</style>
```

[component-metadata:sl-button-group]
