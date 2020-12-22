# Theme

[component-header:sl-theme]

Themes change the visual appearance of components.

This component will activate a theme and apply its styles to everything inside. All themes must adhere to [theming guidelines](/getting-started/themes) and expose a class that follows the `sl-theme-{name}` convention.

To activate a theme, include the necessary stylesheet(s) and wrap your content in an `<sl-theme>` element. The theme to use is specified by the `name` prop.

```html
<link rel="stylesheet" href="your-theme.css">

<sl-theme name="dark">
  <!-- Everything inside will use the dark theme -->
</sl-theme>
```

?> It's important to note that the default "light" theme isn't actually a theme — it's a set of design tokens and base styles that themes can use as a foundation to build upon. As such, it's not possible to opt in to the default theme using this component.

## Examples

### Dark Theme

To use the official dark theme, include its stylesheet per the instructions on the [themes page](/getting-started/themes) and activate it as shown in the example below. All design tokens and components will render accordingly.

```html preview
<div class="theme-overview">
  <sl-theme name="dark">

    <!-- Design tokens used inside <sl-theme> will reflect the theme's colors -->
    <div style="background-color: var(--sl-color-gray-900); padding: var(--sl-spacing-xx-large);">
      <!-- These are just some sample components to demonstrate -->
      <sl-dropdown>
        <sl-button slot="trigger" caret>Dropdown</sl-button>
        <sl-menu>
          <sl-menu-item>Item 1</sl-menu-item>
          <sl-menu-item>Item 2</sl-menu-item>
          <sl-menu-item>Item 3</sl-menu-item>
        </sl-menu>
      </sl-dropdown>

      <sl-dialog label="Dialog">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        <sl-button slot="footer" type="primary">Close</sl-button>
      </sl-dialog>
      <sl-button>Open Dialog</sl-button>

      <sl-checkbox>Check me</sl-checkbox>
    </div>
  </sl-theme>
</div>

<script>
  (() => {
    const container = document.querySelector('.theme-overview');
    const dialog = container.querySelector('sl-dialog');
    const openButton = dialog.nextElementSibling;
    const closeButton = dialog.querySelector('sl-button[slot="footer"]');

    openButton.addEventListener('click', () => dialog.show());
    closeButton.addEventListener('click', () => dialog.hide());
  })();
</script>
```

[component-metadata:sl-theme]
