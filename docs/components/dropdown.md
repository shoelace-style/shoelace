# Dropdown

[component-header:sl-dropdown]

Dropdowns expose additional content that "drops down" in a panel.

Dropdowns consist of a trigger and a panel. By default, activating the trigger will expose the panel and interacting outside of the panel will close it.

Dropdowns are designed to work well with [menus](/components/menu.md) to provide a list of options the user can select from. However, dropdowns can also be used in lower-level applications (e.g. [color picker](/components/color-picker.md) and [select](/components/select.md)). The API gives you complete control over showing, hiding, and positioning the panel.

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

[component-metadata:sl-dropdown]
