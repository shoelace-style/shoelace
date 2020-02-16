Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## Browser Support

TODO

## Tips

TODO

### Self-closing Tags

In HTML, some elements don't have a closing tag.

```html
<input type="text" />
```

With Custom Elements, a closing tag **must always** be included.

```html
<sl-input type="text"></sl-input>
```

### Slots

Slots are used to insert custom content into specific parts of a Custom Element. For example, Shoelace buttons expose a `prefix` slot you can use to prepend an icon to the label. Use the `slot` attribute to reference the appropriate slot. (Available slots are listed in each component's documentation).

```html
<sl-button>
  <img slot="prefix" src="settings.svg" />
  Settings
</sl-button>
```

Sometimes you might need to put multiple elements into the same slot. This can be achieved by using the same `slot` on each element.

```html
<sl-tabset>
  <sl-tab slot="nav" panel="general">General</sl-tab>
  <sl-tab slot="nav" panel="custom">Custom</sl-tab>
  <sl-tab slot="nav" panel="advanced">Advanced</sl-tab>
  ...
</sl-tabset>
```