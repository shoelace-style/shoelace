# Dropdown

[component-header:sl-dropdown]

Dropdowns expose additional content that "drops down" in a panel.

Dropdowns consist of a trigger and a panel. By default, activating the trigger will expose the panel and interacting outside of the panel will close it.

Dropdowns are designed to work well with [menus](/components/menu) to provide a list of options the user can select from. However, dropdowns can also be used in lower-level applications (e.g. [color picker](/components/color-picker) and [select](/components/select)). The API gives you complete control over showing, hiding, and positioning the panel.

```html preview
<sl-dropdown>
  <sl-button slot="trigger" caret>Dropdown</sl-button>
  <sl-menu>
    <sl-menu-item>Dropdown Item 1</sl-menu-item>
    <sl-menu-item>Dropdown Item 2</sl-menu-item>
    <sl-menu-item>Dropdown Item 3</sl-menu-item>
    <sl-menu-divider></sl-menu-divider>
    <sl-menu-item checked>Checked</sl-menu-item>
    <sl-menu-item disabled>Disabled</sl-menu-item>
    <sl-menu-divider></sl-menu-divider>
    <sl-menu-item>
      Prefix
      <sl-icon slot="prefix" name="gift"></sl-icon>
    </sl-menu-item>
    <sl-menu-item>
      Suffix Icon
      <sl-icon slot="suffix" name="heart"></sl-icon>
    </sl-menu-item>
  </sl-menu>
</sl-dropdown>
```

## Examples

### Placement

The preferred placement of the dropdown can be set with the `placement` attribute. Note that the actual position may vary to ensure the panel remains in the viewport.

```html preview
<sl-dropdown placement="top-start">
  <sl-button slot="trigger" caret>Edit</sl-button>
  <sl-menu>
    <sl-menu-item>Cut</sl-menu-item>
    <sl-menu-item>Copy</sl-menu-item>
    <sl-menu-item>Paste</sl-menu-item>
    <sl-menu-divider></sl-menu-divider>
    <sl-menu-item>Find</sl-menu-item>
    <sl-menu-item>Replace</sl-menu-item>
  </sl-menu>
</sl-dropdown>
```

### Distance

The distance from the panel to the trigger can be customized using the `distance` attribute. This value is specified in pixels.

```html preview
<sl-dropdown distance="30">
  <sl-button slot="trigger" caret>Edit</sl-button>
  <sl-menu>
    <sl-menu-item>Cut</sl-menu-item>
    <sl-menu-item>Copy</sl-menu-item>
    <sl-menu-item>Paste</sl-menu-item>
    <sl-menu-divider></sl-menu-divider>
    <sl-menu-item>Find</sl-menu-item>
    <sl-menu-item>Replace</sl-menu-item>
  </sl-menu>
</sl-dropdown>
```

### Skidding

The offset of the panel along the trigger can be customized using the `skidding` attribute. This value is specified in pixels.

```html preview
<sl-dropdown skidding="30">
  <sl-button slot="trigger" caret>Edit</sl-button>
  <sl-menu>
    <sl-menu-item>Cut</sl-menu-item>
    <sl-menu-item>Copy</sl-menu-item>
    <sl-menu-item>Paste</sl-menu-item>
    <sl-menu-divider></sl-menu-divider>
    <sl-menu-item>Find</sl-menu-item>
    <sl-menu-item>Replace</sl-menu-item>
  </sl-menu>
</sl-dropdown>
```

### Hoisting

Dropdown panels will be clipped if they're inside a container that has `overflow: auto|hidden`. The `hoist` attribute forces the panel to use a fixed positioning strategy, allowing it to break out of the container. In this case, the panel will be positioned relative to its containing block, which is usually the viewport unless an ancestor uses a `transform`, `perspective`, or `filter`. [Refer to this page](https://developer.mozilla.org/en-US/docs/Web/CSS/position#fixed) for more details.

```html preview
<div class="dropdown-hoist">
  <sl-dropdown>
    <sl-button slot="trigger" caret>No Hoist</sl-button>
    <sl-menu>
      <sl-menu-item>Item 1</sl-menu-item>
      <sl-menu-item>Item 2</sl-menu-item>
      <sl-menu-item>Item 3</sl-menu-item>
    </sl-menu>
  </sl-dropdown>

  <sl-dropdown hoist>
    <sl-button slot="trigger" caret>Hoist</sl-button>
    <sl-menu>
      <sl-menu-item>Item 1</sl-menu-item>
      <sl-menu-item>Item 2</sl-menu-item>
      <sl-menu-item>Item 3</sl-menu-item>
    </sl-menu>
  </sl-dropdown>
</div>

<style>
  .dropdown-hoist {
    border: solid 2px var(--sl-panel-border-color);
    padding: var(--sl-spacing-medium);
    overflow: hidden;
  }
</style>
```

### Getting the Selected Item

When dropdowns are used with [menus](/components/menu), you can listen for the `sl-select` event to determine which menu item was selected. The menu item element will be exposed in `event.detail.item`. You can set `value` props to make it easier to identify commands.

```html preview
<div class="dropdown-selection">
  <sl-dropdown>
    <sl-button slot="trigger" caret>Edit</sl-button>
    <sl-menu>
      <sl-menu-item value="cut">Cut</sl-menu-item>
      <sl-menu-item value="copy">Copy</sl-menu-item>
      <sl-menu-item value="paste">Paste</sl-menu-item>
    </sl-menu>
  </sl-dropdown>
</div>

<script>
  const container = document.querySelector('.dropdown-selection');
  const dropdown = container.querySelector('sl-dropdown');

  dropdown.addEventListener('sl-select', event => {
    const selectedItem = event.detail.item;
    console.log(selectedItem.value);
  });
</script>
```

Alternatively, you can listen for the `click` event on individual menu items. Note that, using this approach, disabled menu items will still emit a `click` event.

```html preview
<div class="dropdown-selection-alt">
  <sl-dropdown>
    <sl-button slot="trigger" caret>Edit</sl-button>
    <sl-menu>
      <sl-menu-item value="cut">Cut</sl-menu-item>
      <sl-menu-item value="copy">Copy</sl-menu-item>
      <sl-menu-item value="paste">Paste</sl-menu-item>
    </sl-menu>
  </sl-dropdown>
</div>

<script>
  const container = document.querySelector('.dropdown-selection-alt');
  const cut = container.querySelector('sl-menu-item[value="cut"]');
  const copy = container.querySelector('sl-menu-item[value="copy"]');
  const paste = container.querySelector('sl-menu-item[value="paste"]');

  cut.addEventListener('click', () => console.log('cut'));
  copy.addEventListener('click', () => console.log('copy'));
  paste.addEventListener('click', () => console.log('paste'));
</script>
```

[component-metadata:sl-dropdown]
