# Split Panel

[component-header:sl-split-panel]

Split panels display two panels alongside each other, often allowing the user to resize them.

```html preview
<sl-split-panel>
  <div slot="start">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat, suscipit animi. Exercitationem, modi tenetur, voluptatibus magnam qui excepturi quasi autem et odit, recusandae obcaecati! Quaerat possimus facilis tempora consequatur officia?
  </div>
  <div slot="end">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat, suscipit animi. Exercitationem, modi tenetur, voluptatibus magnam qui excepturi quasi autem et odit, recusandae obcaecati! Quaerat possimus facilis tempora consequatur officia?
  </div>
</sl-split-panel>
```

## Examples

### Initial Position

To set the initial position of the split in pixels, use the `position` attribute. The value must be in pixels, but if you need to set it as a percentage, use the `setPositionPercentage()` method instead.

```html preview
<sl-split-panel position="150">
  <div slot="start">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat, suscipit animi. Exercitationem, modi tenetur, voluptatibus magnam qui excepturi quasi autem et odit, recusandae obcaecati! Quaerat possimus facilis tempora consequatur officia?
  </div>
  <div slot="end">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat, suscipit animi. Exercitationem, modi tenetur, voluptatibus magnam qui excepturi quasi autem et odit, recusandae obcaecati! Quaerat possimus facilis tempora consequatur officia?
  </div>
</sl-split-panel>
```

### Vertical

Add the `vertical` attribute to render the split panel in a vertical orientation where the start and end panels are stacked.

```html preview
<sl-split-panel vertical style="height: 400px;">
  <div slot="start">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat, suscipit animi. Exercitationem, modi tenetur, voluptatibus magnam qui excepturi quasi autem et odit, recusandae obcaecati! Quaerat possimus facilis tempora consequatur officia?
  </div>
  <div slot="end">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat, suscipit animi. Exercitationem, modi tenetur, voluptatibus magnam qui excepturi quasi autem et odit, recusandae obcaecati! Quaerat possimus facilis tempora consequatur officia?
  </div>
</sl-split-panel>
```

### Snapping

To snap panels at specific locations, add the `snap` attribute with one or more space-separated values. Values can be in pixels or percentages. For example, to snap the panel at `100px` and `50%`, use `snap="100px 50%"`. To customize how close the divider must be before snapping, use the `snap-threshold` attribute.

```html preview
<div class="split-panel-snapping">
  <sl-split-panel snap="100px 50%">
    <div slot="start">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat, suscipit animi. Exercitationem, modi tenetur, voluptatibus magnam qui excepturi quasi autem et odit, recusandae obcaecati! Quaerat possimus facilis tempora consequatur officia?
    </div>
    <div slot="end">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat, suscipit animi. Exercitationem, modi tenetur, voluptatibus magnam qui excepturi quasi autem et odit, recusandae obcaecati! Quaerat possimus facilis tempora consequatur officia?
    </div>
  </sl-split-panel>

  <div class="split-panel-snapping-dots"></div>
</div>

<style>
  .split-panel-snapping {
    position: relative;
  }

  .split-panel-snapping-dots::before,
  .split-panel-snapping-dots::after {
    content: '';
    position: absolute;
    bottom: -12px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--sl-color-neutral-400);
    transform: translateX(-3px);
  }

  .split-panel-snapping-dots::before {
    left: 100px;
  }

  .split-panel-snapping-dots::after {
    left: 50%;
  }
</style>
```

### Disabled

Add the `disabled` attribute to prevent the split panel from being resized.

```html preview
<sl-split-panel disabled>
  <div slot="start">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat, suscipit animi. Exercitationem, modi tenetur, voluptatibus magnam qui excepturi quasi autem et odit, recusandae obcaecati! Quaerat possimus facilis tempora consequatur officia?
  </div>
  <div slot="end">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat, suscipit animi. Exercitationem, modi tenetur, voluptatibus magnam qui excepturi quasi autem et odit, recusandae obcaecati! Quaerat possimus facilis tempora consequatur officia?
  </div>
</sl-split-panel>
```

### Setting the Fixed Panel

When the host element is resized, the fixed panel will maintain its size and the other panel will grow or shrink to fit the remaining space. Try resizing the example below with each option and notice how panels respond.

```html preview
<div class="split-panel-fixed">
  <sl-split-panel fixed="start">
    <div slot="start">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat, suscipit animi. Exercitationem, modi tenetur, voluptatibus magnam qui excepturi quasi autem et odit, recusandae obcaecati! Quaerat possimus facilis tempora consequatur officia?
    </div>
    <div slot="end">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat, suscipit animi. Exercitationem, modi tenetur, voluptatibus magnam qui excepturi quasi autem et odit, recusandae obcaecati! Quaerat possimus facilis tempora consequatur officia?
    </div>
  </sl-split-panel>

  <sl-select value="start" style="max-width: 200px; margin-top: 1rem;">
    <sl-menu-item value="start">Start</sl-menu-item>
    <sl-menu-item value="end">End</sl-menu-item>
  </sl-select>
</div>

<script>
  const container = document.querySelector('.split-panel-fixed');
  const splitPanel = container.querySelector('sl-split-panel');
  const select = container.querySelector('sl-select');

  select.addEventListener('sl-change', () => splitPanel.fixed = select.value);
</script>
```

### Nested Split Panels

Create complex layouts that can be resized independently by nesting split panels.

```html preview
<sl-split-panel>
  <div slot="start">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat, suscipit animi. Exercitationem, modi tenetur, voluptatibus magnam qui excepturi quasi autem et odit, recusandae obcaecati! Quaerat possimus facilis tempora consequatur officia?
  </div>
  <div slot="end">
    <sl-split-panel vertical style="height: 400px;">
      <div slot="start">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat, suscipit animi. Exercitationem, modi tenetur, voluptatibus magnam qui excepturi quasi autem et odit, recusandae obcaecati! Quaerat possimus facilis tempora consequatur officia?
      </div>
      <div slot="end">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat, suscipit animi. Exercitationem, modi tenetur, voluptatibus magnam qui excepturi quasi autem et odit, recusandae obcaecati! Quaerat possimus facilis tempora consequatur officia?
      </div>
    </sl-split-panel>    
  </div>
</sl-split-panel>
```

### Customizing the Divider

You can target the `divider` part to apply CSS properties to the divider. Optionally, you can slot an element into the `handle` slot to show a handle.

```html preview
<div class="split-panel-custom-divider">
  <sl-split-panel>
    <sl-icon slot="handle" name="grip-vertical"></sl-icon>
    <div slot="start">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat, suscipit animi. Exercitationem, modi tenetur, voluptatibus magnam qui excepturi quasi autem et odit, recusandae obcaecati! Quaerat possimus facilis tempora consequatur officia?
    </div>
    <div slot="end">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat, suscipit animi. Exercitationem, modi tenetur, voluptatibus magnam qui excepturi quasi autem et odit, recusandae obcaecati! Quaerat possimus facilis tempora consequatur officia?
    </div>
  </sl-split-panel>
</div>

<style>
  .split-panel-custom-divider sl-split-panel::part(divider) {
    background-color: var(--sl-color-pink-600);
  }

  .split-panel-custom-divider sl-icon {
    position: absolute;
    border-radius: var(--sl-border-radius-small);
    background: var(--sl-color-pink-600);
    color: var(--sl-color-neutral-0);
    padding: .5rem .125rem;
  }

  .split-panel-custom-divider sl-split-panel::part(divider):focus-visible {
    background-color: var(--sl-color-primary-600);
  }

  .split-panel-custom-divider sl-split-panel:focus-within sl-icon {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }
</style>
```

[component-metadata:sl-split-panel]
