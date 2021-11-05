# Button Group

[component-header:sl-button-group]

Button groups can be used to group related buttons into sections.

```html preview
<sl-button-group>
  <sl-button>Left</sl-button>
  <sl-button>Center</sl-button>
  <sl-button>Right</sl-button>
</sl-button-group>
```

```jsx react
import { SlButton, SlButtonGroup } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlButtonGroup>
    <SlButton>Left</SlButton>
    <SlButton>Center</SlButton>
    <SlButton>Right</SlButton>
  </SlButtonGroup>
);
```

## Examples

### Button Sizes

All button sizes are supported, but avoid mixing sizes within the same button group.

```html preview
<sl-button-group>
  <sl-button size="small">Left</sl-button>
  <sl-button size="small">Center</sl-button>
  <sl-button size="small">Right</sl-button>
</sl-button-group>

<br><br>

<sl-button-group>
  <sl-button size="medium">Left</sl-button>
  <sl-button size="medium">Center</sl-button>
  <sl-button size="medium">Right</sl-button>
</sl-button-group>

<br><br>

<sl-button-group>
  <sl-button size="large">Left</sl-button>
  <sl-button size="large">Center</sl-button>
  <sl-button size="large">Right</sl-button>
</sl-button-group>
```

```jsx react
import { SlButton, SlButtonGroup } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    <SlButtonGroup>
      <SlButton size="small">Left</SlButton>
      <SlButton size="small">Center</SlButton>
      <SlButton size="small">Right</SlButton>
    </SlButtonGroup>

    <br /><br />

    <SlButtonGroup>
      <SlButton size="medium">Left</SlButton>
      <SlButton size="medium">Center</SlButton>
      <SlButton size="medium">Right</SlButton>
    </SlButtonGroup>

    <br /><br />

    <SlButtonGroup>
      <SlButton size="large">Left</SlButton>
      <SlButton size="large">Center</SlButton>
      <SlButton size="large">Right</SlButton>
    </SlButtonGroup>
  </>
);
```

### Theme Buttons

Theme buttons are supported through the button's `type` attribute.

```html preview
<sl-button-group>
  <sl-button type="primary">Left</sl-button>
  <sl-button type="primary">Center</sl-button>
  <sl-button type="primary">Right</sl-button>
</sl-button-group>

<br><br>

<sl-button-group>
  <sl-button type="success">Left</sl-button>
  <sl-button type="success">Center</sl-button>
  <sl-button type="success">Right</sl-button>
</sl-button-group>

<br><br>

<sl-button-group>
  <sl-button type="neutral">Left</sl-button>
  <sl-button type="neutral">Center</sl-button>
  <sl-button type="neutral">Right</sl-button>
</sl-button-group>

<br><br>

<sl-button-group>
  <sl-button type="warning">Left</sl-button>
  <sl-button type="warning">Center</sl-button>
  <sl-button type="warning">Right</sl-button>
</sl-button-group>

<br><br>

<sl-button-group>
  <sl-button type="danger">Left</sl-button>
  <sl-button type="danger">Center</sl-button>
  <sl-button type="danger">Right</sl-button>
</sl-button-group>
```

```jsx react
import { SlButton, SlButtonGroup } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    <SlButtonGroup>
      <SlButton type="primary">Left</SlButton>
      <SlButton type="primary">Center</SlButton>
      <SlButton type="primary">Right</SlButton>
    </SlButtonGroup>

    <br /><br />

    <SlButtonGroup>
      <SlButton type="success">Left</SlButton>
      <SlButton type="success">Center</SlButton>
      <SlButton type="success">Right</SlButton>
    </SlButtonGroup>

    <br /><br />

    <SlButtonGroup>
      <SlButton type="neutral">Left</SlButton>
      <SlButton type="neutral">Center</SlButton>
      <SlButton type="neutral">Right</SlButton>
    </SlButtonGroup>

    <br /><br />

    <SlButtonGroup>
      <SlButton type="warning">Left</SlButton>
      <SlButton type="warning">Center</SlButton>
      <SlButton type="warning">Right</SlButton>
    </SlButtonGroup>

    <br /><br />

    <SlButtonGroup>
      <SlButton type="danger">Left</SlButton>
      <SlButton type="danger">Center</SlButton>
      <SlButton type="danger">Right</SlButton>
    </SlButtonGroup>
  </>
);
```

### Pill Buttons

Pill buttons are supported through the button's `pill` attribute.

```html preview
<sl-button-group>
  <sl-button size="small" pill>Left</sl-button>
  <sl-button size="small" pill>Center</sl-button>
  <sl-button size="small" pill>Right</sl-button>
</sl-button-group>

<br><br>

<sl-button-group>
  <sl-button size="medium" pill>Left</sl-button>
  <sl-button size="medium" pill>Center</sl-button>
  <sl-button size="medium" pill>Right</sl-button>
</sl-button-group>

<br><br>

<sl-button-group>
  <sl-button size="large" pill>Left</sl-button>
  <sl-button size="large" pill>Center</sl-button>
  <sl-button size="large" pill>Right</sl-button>
</sl-button-group>
```

```jsx react
import { SlButton, SlButtonGroup } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    <SlButtonGroup>
      <SlButton size="small" pill>Left</SlButton>
      <SlButton size="small" pill>Center</SlButton>
      <SlButton size="small" pill>Right</SlButton>
    </SlButtonGroup>

    <br /><br />

    <SlButtonGroup>
      <SlButton size="medium" pill>Left</SlButton>
      <SlButton size="medium" pill>Center</SlButton>
      <SlButton size="medium" pill>Right</SlButton>
    </SlButtonGroup>

    <br /><br />

    <SlButtonGroup>
      <SlButton size="large" pill>Left</SlButton>
      <SlButton size="large" pill>Center</SlButton>
      <SlButton size="large" pill>Right</SlButton>
    </SlButtonGroup>
  </>
);
```

### Dropdowns in Button Groups

Dropdowns can be placed inside button groups as long as the trigger is an `<sl-button>` element.

```html preview
<sl-button-group> 
  <sl-button>Button</sl-button>
  <sl-button>Button</sl-button>
  <sl-dropdown>
    <sl-button slot="trigger" caret>Dropdown</sl-button>
    <sl-menu>
      <sl-menu-item>Item 1</sl-menu-item>
      <sl-menu-item>Item 2</sl-menu-item>
      <sl-menu-item>Item 3</sl-menu-item>
    </sl-menu>
  </sl-dropdown>
</sl-button-group>
```

```jsx react
import { 
  SlButton, 
  SlButtonGroup,
  SlDropdown,
  SlMenu,
  SlMenuItem,
} from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlButtonGroup> 
    <SlButton>Button</SlButton>
    <SlButton>Button</SlButton>
    <SlDropdown>
      <SlButton slot="trigger" caret>Dropdown</SlButton>
      <SlMenu>
        <SlMenuItem>Item 1</SlMenuItem>
        <SlMenuItem>Item 2</SlMenuItem>
        <SlMenuItem>Item 3</SlMenuItem>
      </SlMenu>
    </SlDropdown>
  </SlButtonGroup>
);
```

### Split Buttons

Create a split button using a button and a dropdown.

```html preview
<sl-button-group> 
  <sl-button type="primary">Save</sl-button>
  <sl-dropdown placement="bottom-end">
    <sl-button slot="trigger" type="primary" caret></sl-button>
    <sl-menu>
      <sl-menu-item>Save</sl-menu-item>
      <sl-menu-item>Save as&hellip;</sl-menu-item>
      <sl-menu-item>Save all</sl-menu-item>
    </sl-menu>
  </sl-dropdown>
</sl-button-group>
```

```jsx react
import { 
  SlButton, 
  SlButtonGroup,
  SlDropdown,
  SlMenu,
  SlMenuItem,
} from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlButtonGroup> 
    <SlButton type="primary">Save</SlButton>
    <SlDropdown placement="bottom-end">
      <SlButton slot="trigger" type="primary" caret></SlButton>
      <SlMenu>
        <SlMenuItem>Save</SlMenuItem>
        <SlMenuItem>Save as&hellip;</SlMenuItem>
        <SlMenuItem>Save all</SlMenuItem>
      </SlMenu>
    </SlDropdown>
  </SlButtonGroup>
);
```

### Tooltips in Button Groups

Buttons can be wrapped in tooltips to provide more detail when the user interacts with them.

```html preview
<sl-button-group>
  <sl-tooltip content="I'm on the left">
    <sl-button>Left</sl-button>
  </sl-tooltip>

  <sl-tooltip content="I'm in the middle">
    <sl-button>Center</sl-button>
  </sl-tooltip>

  <sl-tooltip content="I'm on the right">
    <sl-button>Right</sl-button>
  </sl-tooltip>
</sl-button-group>
```

```jsx react
import { 
  SlButton, 
  SlButtonGroup,
  SlTooltip
} from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    <SlButtonGroup>
      <SlTooltip content="I'm on the left">
        <SlButton>Left</SlButton>
      </SlTooltip>

      <SlTooltip content="I'm in the middle">
        <SlButton>Center</SlButton>
      </SlTooltip>

      <SlTooltip content="I'm on the right">
        <SlButton>Right</SlButton>
      </SlTooltip>
    </SlButtonGroup>
  </>
);
```

### Toolbar Example

Create interactive toolbars with button groups.

```html preview
<div class="button-group-toolbar">
  <sl-button-group label="History">
    <sl-tooltip content="Undo">
      <sl-button><sl-icon name="arrow-counterclockwise"></sl-icon></sl-button>
    </sl-tooltip>
    <sl-tooltip content="Redo">
      <sl-button><sl-icon name="arrow-clockwise"></sl-icon></sl-button>
    </sl-tooltip>
  </sl-button-group>

  <sl-button-group label="Formatting">
    <sl-tooltip content="Bold">
      <sl-button><sl-icon name="type-bold"></sl-icon></sl-button>
    </sl-tooltip>
    <sl-tooltip content="Italic">
      <sl-button><sl-icon name="type-italic"></sl-icon></sl-button>
    </sl-tooltip>
    <sl-tooltip content="Underline">
      <sl-button><sl-icon name="type-underline"></sl-icon></sl-button>
    </sl-tooltip>
  </sl-button-group>

  <sl-button-group label="Alignment">
    <sl-tooltip content="Align Left">
      <sl-button><sl-icon name="justify-left"></sl-icon></sl-button>
    </sl-tooltip>
    <sl-tooltip content="Align Center">
      <sl-button><sl-icon name="justify"></sl-icon></sl-button>
    </sl-tooltip>
    <sl-tooltip content="Align Right">
      <sl-button><sl-icon name="justify-right"></sl-icon></sl-button>
    </sl-tooltip>
  </sl-button-group>
</div>

<style>
  .button-group-toolbar sl-button-group:not(:last-of-type) {
    margin-right: var(--sl-spacing-x-small);
  }
</style>
```

```jsx react
import { 
  SlButton, 
  SlButtonGroup,
  SlIcon,
  SlTooltip
} from '@shoelace-style/shoelace/dist/react';

const css = `
  .button-group-toolbar sl-button-group:not(:last-of-type) {
    margin-right: var(--sl-spacing-x-small);
  }
`;

const App = () => (
  <>
    <div className="button-group-toolbar">
      <SlButtonGroup label="History">
        <SlTooltip content="Undo">
          <SlButton><SlIcon name="arrow-counterclockwise"></SlIcon></SlButton>
        </SlTooltip>
        <SlTooltip content="Redo">
          <SlButton><SlIcon name="arrow-clockwise"></SlIcon></SlButton>
        </SlTooltip>
      </SlButtonGroup>

      <SlButtonGroup label="Formatting">
        <SlTooltip content="Bold">
          <SlButton><SlIcon name="type-bold"></SlIcon></SlButton>
        </SlTooltip>
        <SlTooltip content="Italic">
          <SlButton><SlIcon name="type-italic"></SlIcon></SlButton>
        </SlTooltip>
        <SlTooltip content="Underline">
          <SlButton><SlIcon name="type-underline"></SlIcon></SlButton>
        </SlTooltip>
      </SlButtonGroup>

      <SlButtonGroup label="Alignment">
        <SlTooltip content="Align Left">
          <SlButton><SlIcon name="justify-left"></SlIcon></SlButton>
        </SlTooltip>
        <SlTooltip content="Align Center">
          <SlButton><SlIcon name="justify"></SlIcon></SlButton>
        </SlTooltip>
        <SlTooltip content="Align Right">
          <SlButton><SlIcon name="justify-right"></SlIcon></SlButton>
        </SlTooltip>
      </SlButtonGroup>
    </div>

    <style>{css}</style>
  </>
);
```

[component-metadata:sl-button-group]
