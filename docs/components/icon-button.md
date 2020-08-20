# Icon Button

[component-header:sl-icon-button]

Icons buttons are simple, icon-only buttons that can be used for actions and in toolbars.

For a full list of icons that come bundled with Shoelace, refer to the [icon component](/components/icon).

```html preview
<sl-icon-button name="gear"></sl-icon-button>
<sl-icon-button name="sliders"></sl-icon-button>
<sl-icon-button name="x"></sl-icon-button>
```

## Examples

### Sizes

Icon buttons inherit their parent element's `font-size`.

```html preview
<sl-icon-button name="pencil" style="font-size: 1.5rem;"></sl-icon-button>
<sl-icon-button name="pencil" style="font-size: 2rem;"></sl-icon-button>
<sl-icon-button name="pencil" style="font-size: 2.5rem;"></sl-icon-button>
```

### Icon Button with Tooltip

Wrap a tooltip around an icon button to provide contextual information to the user.

```html preview
<sl-tooltip content="Settings">
  <sl-icon-button name="gear"></sl-icon-button>
</sl-tooltip>
```

### Disabled
```html preview
<sl-icon-button name="gear" disabled></sl-icon-button>
```

[component-metadata:sl-icon-button]
