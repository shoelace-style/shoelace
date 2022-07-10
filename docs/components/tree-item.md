# Tree Item

[component-header:sl-tree-item]

A tree item is a hierarchical node of a tree.

```html preview
<sl-tree-item> Tree node </sl-tree-item>
```

## Examples

### Nested tree items

A tree item can contain other items, this allow the user to expand or collapse nested nodes accordingly.

```html preview
<sl-tree-item>
  Parent Node
  <sl-tree-item> Child 1 </sl-tree-item>
  <sl-tree-item> Child 2 </sl-tree-item>
  <sl-tree-item> Child 3 </sl-tree-item>
</sl-tree-item>
```

### Expanded

Use the `expanded` attribute to display the nested items.

```html preview
<sl-tree-item expanded>
  Parent Node
  <sl-tree-item> Child 1 </sl-tree-item>
  <sl-tree-item> Child 2 </sl-tree-item>
  <sl-tree-item> Child 3 </sl-tree-item>
</sl-tree-item>
```

### Selected

Use the `selected` attribute to the mark the item as selected.

```html preview
<sl-tree-item expanded>
  Parent Node
  <sl-tree-item> Child 1 </sl-tree-item>
  <sl-tree-item selected> Child 2 </sl-tree-item>
  <sl-tree-item> Child 3 </sl-tree-item>
</sl-tree-item>
```

### Selectable

Use the `selectable` attribute to display the checkbox.

```html preview
<sl-tree-item class="selectable" selectable>
  Parent Node
  <sl-tree-item selectable> Child 1 </sl-tree-item>
  <sl-tree-item selectable> Child 2 </sl-tree-item>
  <sl-tree-item selectable> Child 3 </sl-tree-item>
</sl-tree-item>

<script>
  document.querySelector('sl-tree-item.selectable').addEventListener('click', ({ target }) => {
    if (target.hasAttribute('selectable')) {
      target.selected = !target.selected;
    }
  });
</script>
```

### Lazy

Use the `lazy` to specify that the content is not yet loaded. When the user tries to expand the node,
a `sl-lazy-load` event is emitted.

```html preview
<sl-tree-item lazy> Parent Node </sl-tree-item>
```

[component-metadata:sl-tree-item]
