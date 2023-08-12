---
meta:
  title: Button Group
  description: Button groups can be used to group related buttons into sections.
layout: component
---

```html:preview
<sl-button-group label="Alignment">
  <sl-button>Left</sl-button>
  <sl-button>Center</sl-button>
  <sl-button>Right</sl-button>
</sl-button-group>
```

```jsx:react
import SlButton from '@shoelace-style/shoelace/dist/react/button';
import SlButtonGroup from '@shoelace-style/shoelace/dist/react/button-group';

const App = () => (
  <SlButtonGroup label="Alignment">
    <SlButton>Left</SlButton>
    <SlButton>Center</SlButton>
    <SlButton>Right</SlButton>
  </SlButtonGroup>
);
```

## Examples

### Button Sizes

All button sizes are supported, but avoid mixing sizes within the same button group.

```html:preview
<sl-button-group label="Alignment">
  <sl-button size="small">Left</sl-button>
  <sl-button size="small">Center</sl-button>
  <sl-button size="small">Right</sl-button>
</sl-button-group>

<br /><br />

<sl-button-group label="Alignment">
  <sl-button size="medium">Left</sl-button>
  <sl-button size="medium">Center</sl-button>
  <sl-button size="medium">Right</sl-button>
</sl-button-group>

<br /><br />

<sl-button-group label="Alignment">
  <sl-button size="large">Left</sl-button>
  <sl-button size="large">Center</sl-button>
  <sl-button size="large">Right</sl-button>
</sl-button-group>
```

```jsx:react
import SlButton from '@shoelace-style/shoelace/dist/react/button';
import SlButtonGroup from '@shoelace-style/shoelace/dist/react/button-group';

const App = () => (
  <>
    <SlButtonGroup label="Alignment">
      <SlButton size="small">Left</SlButton>
      <SlButton size="small">Center</SlButton>
      <SlButton size="small">Right</SlButton>
    </SlButtonGroup>

    <br />
    <br />

    <SlButtonGroup label="Alignment">
      <SlButton size="medium">Left</SlButton>
      <SlButton size="medium">Center</SlButton>
      <SlButton size="medium">Right</SlButton>
    </SlButtonGroup>

    <br />
    <br />

    <SlButtonGroup label="Alignment">
      <SlButton size="large">Left</SlButton>
      <SlButton size="large">Center</SlButton>
      <SlButton size="large">Right</SlButton>
    </SlButtonGroup>
  </>
);
```

### Theme Buttons

Theme buttons are supported through the button's `variant` attribute.

```html:preview
<sl-button-group label="Alignment">
  <sl-button variant="primary">Left</sl-button>
  <sl-button variant="primary">Center</sl-button>
  <sl-button variant="primary">Right</sl-button>
</sl-button-group>

<br /><br />

<sl-button-group label="Alignment">
  <sl-button variant="success">Left</sl-button>
  <sl-button variant="success">Center</sl-button>
  <sl-button variant="success">Right</sl-button>
</sl-button-group>

<br /><br />

<sl-button-group label="Alignment">
  <sl-button variant="neutral">Left</sl-button>
  <sl-button variant="neutral">Center</sl-button>
  <sl-button variant="neutral">Right</sl-button>
</sl-button-group>

<br /><br />

<sl-button-group label="Alignment">
  <sl-button variant="warning">Left</sl-button>
  <sl-button variant="warning">Center</sl-button>
  <sl-button variant="warning">Right</sl-button>
</sl-button-group>

<br /><br />

<sl-button-group label="Alignment">
  <sl-button variant="danger">Left</sl-button>
  <sl-button variant="danger">Center</sl-button>
  <sl-button variant="danger">Right</sl-button>
</sl-button-group>
```

```jsx:react
import SlButton from '@shoelace-style/shoelace/dist/react/button';
import SlButtonGroup from '@shoelace-style/shoelace/dist/react/button-group';

const App = () => (
  <>
    <SlButtonGroup label="Alignment">
      <SlButton variant="primary">Left</SlButton>
      <SlButton variant="primary">Center</SlButton>
      <SlButton variant="primary">Right</SlButton>
    </SlButtonGroup>

    <br />
    <br />

    <SlButtonGroup label="Alignment">
      <SlButton variant="success">Left</SlButton>
      <SlButton variant="success">Center</SlButton>
      <SlButton variant="success">Right</SlButton>
    </SlButtonGroup>

    <br />
    <br />

    <SlButtonGroup label="Alignment">
      <SlButton variant="neutral">Left</SlButton>
      <SlButton variant="neutral">Center</SlButton>
      <SlButton variant="neutral">Right</SlButton>
    </SlButtonGroup>

    <br />
    <br />

    <SlButtonGroup label="Alignment">
      <SlButton variant="warning">Left</SlButton>
      <SlButton variant="warning">Center</SlButton>
      <SlButton variant="warning">Right</SlButton>
    </SlButtonGroup>

    <br />
    <br />

    <SlButtonGroup label="Alignment">
      <SlButton variant="danger">Left</SlButton>
      <SlButton variant="danger">Center</SlButton>
      <SlButton variant="danger">Right</SlButton>
    </SlButtonGroup>
  </>
);
```

### Pill Buttons

Pill buttons are supported through the button's `pill` attribute.

```html:preview
<sl-button-group label="Alignment">
  <sl-button size="small" pill>Left</sl-button>
  <sl-button size="small" pill>Center</sl-button>
  <sl-button size="small" pill>Right</sl-button>
</sl-button-group>

<br /><br />

<sl-button-group label="Alignment">
  <sl-button size="medium" pill>Left</sl-button>
  <sl-button size="medium" pill>Center</sl-button>
  <sl-button size="medium" pill>Right</sl-button>
</sl-button-group>

<br /><br />

<sl-button-group label="Alignment">
  <sl-button size="large" pill>Left</sl-button>
  <sl-button size="large" pill>Center</sl-button>
  <sl-button size="large" pill>Right</sl-button>
</sl-button-group>
```

```jsx:react
import SlButton from '@shoelace-style/shoelace/dist/react/button';
import SlButtonGroup from '@shoelace-style/shoelace/dist/react/button-group';

const App = () => (
  <>
    <SlButtonGroup label="Alignment">
      <SlButton size="small" pill>
        Left
      </SlButton>
      <SlButton size="small" pill>
        Center
      </SlButton>
      <SlButton size="small" pill>
        Right
      </SlButton>
    </SlButtonGroup>

    <br />
    <br />

    <SlButtonGroup label="Alignment">
      <SlButton size="medium" pill>
        Left
      </SlButton>
      <SlButton size="medium" pill>
        Center
      </SlButton>
      <SlButton size="medium" pill>
        Right
      </SlButton>
    </SlButtonGroup>

    <br />
    <br />

    <SlButtonGroup label="Alignment">
      <SlButton size="large" pill>
        Left
      </SlButton>
      <SlButton size="large" pill>
        Center
      </SlButton>
      <SlButton size="large" pill>
        Right
      </SlButton>
    </SlButtonGroup>
  </>
);
```

### Dropdowns in Button Groups

Dropdowns can be placed inside button groups as long as the trigger is an `<sl-button>` element.

```html:preview
<sl-button-group label="Example Button Group">
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

```jsx:react
import SlButton from '@shoelace-style/shoelace/dist/react/button';
import SlButtonGroup from '@shoelace-style/shoelace/dist/react/button-group';
import SlDropdown from '@shoelace-style/shoelace/dist/react/dropdown';
import SlMenu from '@shoelace-style/shoelace/dist/react/menu';
import SlMenuItem from '@shoelace-style/shoelace/dist/react/menu-item';

const App = () => (
  <SlButtonGroup label="Example Button Group">
    <SlButton>Button</SlButton>
    <SlButton>Button</SlButton>
    <SlDropdown>
      <SlButton slot="trigger" caret>
        Dropdown
      </SlButton>
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

Create a split button using a button and a dropdown. Use a [visually hidden](/components/visually-hidden) label to ensure the dropdown is accessible to users with assistive devices.

```html:preview
<sl-button-group label="Example Button Group">
  <sl-button variant="primary">Save</sl-button>
  <sl-dropdown placement="bottom-end">
    <sl-button slot="trigger" variant="primary" caret>
      <sl-visually-hidden>More options</sl-visually-hidden>
    </sl-button>
    <sl-menu>
      <sl-menu-item>Save</sl-menu-item>
      <sl-menu-item>Save as&hellip;</sl-menu-item>
      <sl-menu-item>Save all</sl-menu-item>
    </sl-menu>
  </sl-dropdown>
</sl-button-group>
```

```jsx:react
import SlButton from '@shoelace-style/shoelace/dist/react/button';
import SlButtonGroup from '@shoelace-style/shoelace/dist/react/button-group';
import SlDropdown from '@shoelace-style/shoelace/dist/react/dropdown';
import SlMenu from '@shoelace-style/shoelace/dist/react/menu';
import SlMenuItem from '@shoelace-style/shoelace/dist/react/menu-item';

const App = () => (
  <SlButtonGroup label="Example Button Group">
    <SlButton variant="primary">Save</SlButton>
    <SlDropdown placement="bottom-end">
      <SlButton slot="trigger" variant="primary" caret></SlButton>
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

```html:preview
<sl-button-group label="Alignment">
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

```jsx:react
import SlButton from '@shoelace-style/shoelace/dist/react/button';
import SlButtonGroup from '@shoelace-style/shoelace/dist/react/button-group';
import SlTooltip from '@shoelace-style/shoelace/dist/react/tooltip';

const App = () => (
  <>
    <SlButtonGroup label="Alignment">
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

```html:preview
<div class="button-group-toolbar">
  <sl-button-group label="History">
    <sl-tooltip content="Undo">
      <sl-button><sl-icon name="arrow-counterclockwise" label="Undo"></sl-icon></sl-button>
    </sl-tooltip>
    <sl-tooltip content="Redo">
      <sl-button><sl-icon name="arrow-clockwise" label="Redo"></sl-icon></sl-button>
    </sl-tooltip>
  </sl-button-group>

  <sl-button-group label="Formatting">
    <sl-tooltip content="Bold">
      <sl-button><sl-icon name="type-bold" label="Bold"></sl-icon></sl-button>
    </sl-tooltip>
    <sl-tooltip content="Italic">
      <sl-button><sl-icon name="type-italic" label="Italic"></sl-icon></sl-button>
    </sl-tooltip>
    <sl-tooltip content="Underline">
      <sl-button><sl-icon name="type-underline" label="Underline"></sl-icon></sl-button>
    </sl-tooltip>
  </sl-button-group>

  <sl-button-group label="Alignment">
    <sl-tooltip content="Align Left">
      <sl-button><sl-icon name="justify-left" label="Align Left"></sl-icon></sl-button>
    </sl-tooltip>
    <sl-tooltip content="Align Center">
      <sl-button><sl-icon name="justify" label="Align Center"></sl-icon></sl-button>
    </sl-tooltip>
    <sl-tooltip content="Align Right">
      <sl-button><sl-icon name="justify-right" label="Align Right"></sl-icon></sl-button>
    </sl-tooltip>
  </sl-button-group>
</div>

<style>
  .button-group-toolbar sl-button-group:not(:last-of-type) {
    margin-right: var(--sl-spacing-x-small);
  }
</style>
```

```jsx:react
import SlButton from '@shoelace-style/shoelace/dist/react/button';
import SlButtonGroup from '@shoelace-style/shoelace/dist/react/button-group';
import SlIcon from '@shoelace-style/shoelace/dist/react/icon';
import SlTooltip from '@shoelace-style/shoelace/dist/react/tooltip';

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
          <SlButton>
            <SlIcon name="arrow-counterclockwise"></SlIcon>
          </SlButton>
        </SlTooltip>
        <SlTooltip content="Redo">
          <SlButton>
            <SlIcon name="arrow-clockwise"></SlIcon>
          </SlButton>
        </SlTooltip>
      </SlButtonGroup>

      <SlButtonGroup label="Formatting">
        <SlTooltip content="Bold">
          <SlButton>
            <SlIcon name="type-bold"></SlIcon>
          </SlButton>
        </SlTooltip>
        <SlTooltip content="Italic">
          <SlButton>
            <SlIcon name="type-italic"></SlIcon>
          </SlButton>
        </SlTooltip>
        <SlTooltip content="Underline">
          <SlButton>
            <SlIcon name="type-underline"></SlIcon>
          </SlButton>
        </SlTooltip>
      </SlButtonGroup>

      <SlButtonGroup label="Alignment">
        <SlTooltip content="Align Left">
          <SlButton>
            <SlIcon name="justify-left"></SlIcon>
          </SlButton>
        </SlTooltip>
        <SlTooltip content="Align Center">
          <SlButton>
            <SlIcon name="justify"></SlIcon>
          </SlButton>
        </SlTooltip>
        <SlTooltip content="Align Right">
          <SlButton>
            <SlIcon name="justify-right"></SlIcon>
          </SlButton>
        </SlTooltip>
      </SlButtonGroup>
    </div>

    <style>{css}</style>
  </>
);
```
