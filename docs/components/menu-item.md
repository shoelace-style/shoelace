# Menu Item

[component-header:sl-menu-item]

Menu items provide options for the user to pick from in a menu.

```html preview
<sl-menu
  style="max-width: 200px; border: solid 1px var(--sl-panel-border-color); border-radius: var(--sl-border-radius-medium);"
>
  <sl-menu-item>Option 1</sl-menu-item>
  <sl-menu-item>Option 2</sl-menu-item>
  <sl-menu-item>Option 3</sl-menu-item>
  <sl-menu-divider></sl-menu-divider>
  <sl-menu-item checked>Checked</sl-menu-item>
  <sl-menu-item disabled>Disabled</sl-menu-item>
  <sl-menu-divider></sl-menu-divider>
  <sl-menu-item>
    Prefix Icon
    <sl-icon slot="prefix" name="gift"></sl-icon>
  </sl-menu-item>
  <sl-menu-item>
    Suffix Icon
    <sl-icon slot="suffix" name="heart"></sl-icon>
  </sl-menu-item>
</sl-menu>
```

[component-metadata:sl-menu-item]
