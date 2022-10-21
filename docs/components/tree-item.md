# Tree Item

[component-header:sl-tree-item]

```html preview
<sl-tree>
  <sl-tree-item>
    Item 1
    <sl-tree-item>Item A</sl-tree-item>
    <sl-tree-item>Item B</sl-tree-item>
    <sl-tree-item>Item C</sl-tree-item>
  </sl-tree-item>
  <sl-tree-item>Item 2</sl-tree-item>
  <sl-tree-item>Item 3</sl-tree-item>
</sl-tree>
```

<!-- prettier-ignore -->
```jsx react
import { SlTree, SlTreeItem } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlTree>
    <SlTreeItem>
      Item 1
      <SlTreeItem>Item A</SlTreeItem>
      <SlTreeItem>Item B</SlTreeItem>
      <SlTreeItem>Item C</SlTreeItem>
    </SlTreeItem>
    <SlTreeItem>Item 2</SlTreeItem>
    <SlTreeItem>Item 3</SlTreeItem>
  </SlTree>
);
```

## Examples

### Nested tree items

A tree item can contain other tree items. This allows the node to be expanded or collapsed by the user.

```html preview
<sl-tree>
  <sl-tree-item>
    Item 1
    <sl-tree-item>
      Item A
      <sl-tree-item>Item Z</sl-tree-item>
      <sl-tree-item>Item Y</sl-tree-item>
      <sl-tree-item>Item X</sl-tree-item>
    </sl-tree-item>
    <sl-tree-item>Item B</sl-tree-item>
    <sl-tree-item>Item C</sl-tree-item>
  </sl-tree-item>
  <sl-tree-item>Item 2</sl-tree-item>
  <sl-tree-item>Item 3</sl-tree-item>
</sl-tree>
```

<!-- prettier-ignore -->
```jsx react
import { SlTree, SlTreeItem } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlTree>
    <SlTreeItem>
      Item 1
      <SlTreeItem>
        Item A
        <SlTreeItem>Item Z</SlTreeItem>
        <SlTreeItem>Item Y</SlTreeItem>
        <SlTreeItem>Item X</SlTreeItem>
      </SlTreeItem>
      <SlTreeItem>Item B</SlTreeItem>
      <SlTreeItem>Item C</SlTreeItem>
    </SlTreeItem>
    <SlTreeItem>Item 2</SlTreeItem>
    <SlTreeItem>Item 3</SlTreeItem>
  </SlTree>
);
```

### Selected

Use the `selected` attribute to select a tree item initially.

```html preview
<sl-tree>
  <sl-tree-item selected>
    Item 1
    <sl-tree-item>Item A</sl-tree-item>
    <sl-tree-item>Item B</sl-tree-item>
    <sl-tree-item>Item C</sl-tree-item>
  </sl-tree-item>
  <sl-tree-item>Item 2</sl-tree-item>
  <sl-tree-item>Item 3</sl-tree-item>
</sl-tree>
```

<!-- prettier-ignore -->
```jsx react
import { SlTree, SlTreeItem } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlTree>
    <SlTreeItem selected>
      Item 1
      <SlTreeItem>Item A</SlTreeItem>
      <SlTreeItem>Item B</SlTreeItem>
      <SlTreeItem>Item C</SlTreeItem>
    </SlTreeItem>
    <SlTreeItem>Item 2</SlTreeItem>
    <SlTreeItem>Item 3</SlTreeItem>
  </SlTree>
);
```

### Expanded

Use the `expanded` attribute to expand a tree item initially.

```html preview
<sl-tree>
  <sl-tree-item expanded>
    Item 1
    <sl-tree-item expanded>
      Item A
      <sl-tree-item>Item Z</sl-tree-item>
      <sl-tree-item>Item Y</sl-tree-item>
      <sl-tree-item>Item X</sl-tree-item>
    </sl-tree-item>
    <sl-tree-item>Item B</sl-tree-item>
    <sl-tree-item>Item C</sl-tree-item>
  </sl-tree-item>
  <sl-tree-item>Item 2</sl-tree-item>
  <sl-tree-item>Item 3</sl-tree-item>
</sl-tree>
```

<!-- prettier-ignore -->
```jsx react
import { SlTree, SlTreeItem } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlTree>
    <SlTreeItem expanded>
      Item 1
      <SlTreeItem expanded>
        Item A
        <SlTreeItem>Item Z</SlTreeItem>
        <SlTreeItem>Item Y</SlTreeItem>
        <SlTreeItem>Item X</SlTreeItem>
      </SlTreeItem>
      <SlTreeItem>Item B</SlTreeItem>
      <SlTreeItem>Item C</SlTreeItem>
    </SlTreeItem>
    <SlTreeItem>Item 2</SlTreeItem>
    <SlTreeItem>Item 3</SlTreeItem>
  </SlTree>
);
```

[component-metadata:sl-tree-item]
