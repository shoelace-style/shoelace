---
layout: default.html
title: Grid System
description: Shoelace doesn’t ship with a grid system because you don’t need one!
---

## Grid System

Shoelace features a 12-column grid system based heavily on [Bootstrap 4’s grid](https://getbootstrap.com/docs/4.0/layout/grid/). It’s flexible, easy to use, and fully responsive.

### Structure

The grid consists of containers, rows, and columns. A basic, two-column grid looks like this:

```html
<div class="container">
  <div class="row">
    <div class="col">1st column</div>
    <div class="col">2nd column</div>
  </div>
</div>
```

<div class="container grid-example">
  <div class="row">
    <div class="col">1st column</div>
    <div class="col">2nd column</div>
  </div>
</div>

Containers can be used to wrap sections of your page. Use the `container` class to create a responsive, fixed-width container or the `container-fluid` class to create a fluid container.

Rows are used to group columns horizontally. Rows can only contain columns as child elements.

Columns are where your content will go. To create a complete row, use any combination of columns that adds up to 12 wide.

### Creating Columns

Columns are equal width by default. The grid will automatically determine the appropriate size for columns with the `col` class.

```html
<div class="row">
  <div class="col">1</div>
</div>

<div class="row">
  <div class="col">1</div>
  <div class="col">2</div>
</div>

<div class="row">
  <div class="col">1</div>
  <div class="col">2</div>
  <div class="col">3</div>
</div>
```

<div class="container grid-example">
  <div class="row">
    <div class="col">col</div>
  </div>
  <div class="row">
    <div class="col">col</div>
    <div class="col">col</div>
  </div>
  <div class="row">
    <div class="col">col</div>
    <div class="col">col</div>
    <div class="col">col</div>
  </div>
</div>

To set the width of column, use the `col-*` modifier with a value of 1–12. Widths are calculated based on a total of 12 possible columns. Additional columns will wrap to a new line.

```html
<div class="row">
  <div class="col-2">col-2</div>
  <div class="col-4">col-4</div>
  <div class="col-6">col-6</div>
</div>
```

<div class="container grid-example">
  <div class="row">
    <div class="col-2">col-2</div>
    <div class="col-4">col-4</div>
    <div class="col-6">col-6</div>
  </div>
</div>

You can mix and match sized columns with unsized columns for flexibility. Unsized columns will take up equal widths of the remaining space.

```html
<div class="row">
  <div class="col">col</div>
  <div class="col-6">col-6</div>
  <div class="col">col</div>
</div>
```

<div class="container grid-example">
  <div class="row">
    <div class="col">col</div>
    <div class="col-6">col-6</div>
    <div class="col">col</div>
  </div>
</div>

### Making Columns Responsive

There are five responsive tiers in Shoelace: `xs`, `sm`, `md`, `lg`, and `xl`. You can use these tiers to change the way the grid responds at various breakpoints.

Use the `col-[xs|sm|md|lg|xl]-*` modifier to target a specific tier. Note that tiers are based on minimum widths, so using `col-sm-6` will target `sm`, `md`, `lg`, and `xl`. However, you can target multiple tiers on the same column as needed.

For example, the following columns will stack on `xs` screens, take up 50% each (6 out of 12 columns) on `sm` screens, and 75% and 25% respectively on `md`, `lg`, and `xl` screens.

```html
<div class="row">
  <div class="col-12 col-sm-6 col-md-8">1st column</div>
  <div class="col-12 col-sm-6 col-md-4">2nd column</div>
</div>
```

<div class="container grid-example">
  <div class="row">
    <div class="col-12 col-sm-6 col-md-8">1st column</div>
    <div class="col-12 col-sm-6 col-md-4">2nd column</div>
  </div>
</div>

### Offsetting Columns

You can offset columns using `offset-*` and `offset-[xs|sm|md|lg|xl]-*` modifiers. To reset an offset at a specific tier, use `offset-[xs|sm|md|lg|xl]-0`.

```html
<div class="row">
  <div class="col-2">left</div>
  <div class="col-2 offset-2">center</div>
  <div class="col-2 offset-2">right</div>
</div>
```

<div class="container grid-example">
  <div class="row">
    <div class="col-2">left</div>
    <div class="col-2 offset-3">center</div>
    <div class="col-2 offset-3">right</div>
  </div>
</div>

### Reordering Columns

You can control the visual order of columns using the `order-*` and `order-[xs|sm|md|lg|xl]-*` modifiers. Note that columns without an order modifier will not be affected.

```html
<div class="row">
  <div class="col-4">1st (no order)</div>
  <div class="col-4 order-3">2nd (shown 3rd)</div>
  <div class="col-4 order-2">3rd (shown 2nd)</div>
</div>
```

<div class="container grid-example">
  <div class="row">
    <div class="col-4">1st (unordered)</div>
    <div class="col-4 order-3">2nd</div>
    <div class="col-4 order-2">3rd</div>
  </div>
</div>

### Hiding Columns

You can hide columns based on breakpoints using [display utilities](utilities.html#display-utilities).

```html
<div class="row">
  <div class="col-2 hide-xs">hide-xs</div>
  <div class="col-2 hide-sm">hide-sm</div>
  <div class="col-2 hide-md">hide-md</div>
  <div class="col-2 hide-lg">hide-lg</div>
  <div class="col-2 hide-xl">hide-xl</div>
</div>
```

<div class="container grid-example">
  <div class="row">
    <div class="col-2 hide-xs">hide-xs</div>
    <div class="col-2 hide-sm">hide-sm</div>
    <div class="col-2 hide-md">hide-md</div>
    <div class="col-2 hide-lg">hide-lg</div>
    <div class="col-2 hide-xl">hide-xl</div>
  </div>
</div>

### Removing Gutters

By default, columns have horizontal spacing around them to create “gutters.” You can remove this spacing by applying the `no-gutters` class to the parent row.

```html
<div class="row no-gutters">
  ...
</div>
```

For an edge-to-edge design, refrain from using `container` and `container-fluid`.

### Nesting Grids

Grids can be nested. Simply add a new row inside of a column.

```html
<div class="row">
  <div class="col-8">
    outer, col-8
    <div class="row">
      <div class="col-3">inner, col-3</div>
      <div class="col-9">inner, col-9</div>
    </div>
  </div>
</div>
```

<div class="container grid-example">
  <div class="row">
    <div class="col-8">
      outer, col-8
      <div class="row">
        <div class="col-3">inner, col-3</div>
        <div class="col-9">inner, col-9</div>
      </div>
    </div>
  </div>
</div>
