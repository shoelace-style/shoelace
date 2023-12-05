---
meta:
  title: Tree Item
  description: A tree item serves as a hierarchical node that lives inside a tree.
layout: component
---

## Examples

### Basic Tree Items

```html:preview
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

```pug:slim
sl-tree
  sl-tree-item
    | Item 1
    sl-tree-item Item A
    sl-tree-item Item B
    sl-tree-item Item C
  sl-tree-item Item 2
  sl-tree-item Item 3
```

<!-- prettier-ignore -->
```jsx:react
import SlTree from '@teamshares/shoelace/dist/react/tree';
import SlTreeItem from '@teamshares/shoelace/dist/react/tree-item';

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

### Nested Tree Items

A tree item can contain other tree items. This allows the node to be expanded or collapsed by the user.

```html:preview
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

```pug:slim
sl-tree
  sl-tree-item
    | Item 1
    sl-tree-item
      | Item A
      sl-tree-item Item Z
      sl-tree-item Item Y
      sl-tree-item Item X
    sl-tree-item Item B
    sl-tree-item Item C
  sl-tree-item Item 2
  sl-tree-item Item 3
```

<!-- prettier-ignore -->
```jsx:react
import SlTree from '@teamshares/shoelace/dist/react/tree';
import SlTreeItem from '@teamshares/shoelace/dist/react/tree-item';

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

```html:preview
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

```pug:slim
sl-tree
  sl-tree-item selected="true"
    | Item 1
    sl-tree-item Item A
    sl-tree-item Item B
    sl-tree-item Item C
  sl-tree-item Item 2
  sl-tree-item Item 3
```

<!-- prettier-ignore -->
```jsx:react
import SlTree from '@teamshares/shoelace/dist/react/tree';
import SlTreeItem from '@teamshares/shoelace/dist/react/tree-item';

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

```html:preview
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

```pug:slim
sl-tree
  sl-tree-item expanded="true"
    | Item 1
    sl-tree-item expanded="true"
      | Item A
      sl-tree-item Item Z
      sl-tree-item Item Y
      sl-tree-item Item X
    sl-tree-item Item B
    sl-tree-item Item C
  sl-tree-item Item 2
  sl-tree-item Item 3
```

<!-- prettier-ignore -->
```jsx:react
import SlTree from '@teamshares/shoelace/dist/react/tree';
import SlTreeItem from '@teamshares/shoelace/dist/react/tree-item';

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
