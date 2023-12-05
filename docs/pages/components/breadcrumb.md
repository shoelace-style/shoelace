---
meta:
  title: Breadcrumb
  description: Breadcrumbs provide a group of links so users can easily navigate a website's hierarchy.
layout: component
---

## Examples

### Basic Breadcrumb

Breadcrumbs are usually placed before a page's main content with the current page shown last to indicate the user's position in the navigation.

```html:preview
<sl-breadcrumb>
  <sl-breadcrumb-item>Projects</sl-breadcrumb-item>
  <sl-breadcrumb-item>Accounting</sl-breadcrumb-item>
  <sl-breadcrumb-item>Finance integration</sl-breadcrumb-item>
  <sl-breadcrumb-item>Tasks</sl-breadcrumb-item>
</sl-breadcrumb>
```

```pug:slim
sl-breadcrumb
  sl-breadcrumb-item Projects
  sl-breadcrumb-item Accounting
  sl-breadcrumb-item Finance integration
  sl-breadcrumb-item Tasks
```

```jsx:react
import SlBreadcrumb from '@teamshares/shoelace/dist/react/breadcrumb';
import SlBreadcrumbItem from '@teamshares/shoelace/dist/react/breadcrumb-item';

const App = () => (
  <SlBreadcrumb>
    <SlBreadcrumbItem>Projects</SlBreadcrumbItem>
    <SlBreadcrumbItem>Accounting</SlBreadcrumbItem>
    <SlBreadcrumbItem>Finance integration</SlBreadcrumbItem>
    <SlBreadcrumbItem>Tasks</SlBreadcrumbItem>
  </SlBreadcrumb>
);
```

### Breadcrumb Links

By default, breadcrumb items are rendered as buttons so you can use them to navigate single-page applications. In this case, you'll need to add event listeners to handle clicks.

For websites, you'll probably want to use links instead. You can make any breadcrumb item a link by applying an `href` attribute to it. Now, when the user activates it, they'll be taken to the corresponding page — no event listeners required.

```html:preview
<sl-breadcrumb>
  <sl-breadcrumb-item href="https://example.com/cash">Cash account</sl-breadcrumb-item>

  <sl-breadcrumb-item href="https://example.com/cash/checking">Checking</sl-breadcrumb-item>

  <sl-breadcrumb-item href="https://example.com/cash/checking/statements">Statements</sl-breadcrumb-item>

  <sl-breadcrumb-item href="https://example.com/cash/checking/statements/downloads">Downloads</sl-breadcrumb-item>
</sl-breadcrumb>
```

```pug:slim
sl-breadcrumb
  sl-breadcrumb-item href="https://example.com/cash" Cash account
  sl-breadcrumb-item href="https://example.com/cash/checking" Checking
  sl-breadcrumb-item href="https://example.com/cash/checking/statements" Statements
  sl-breadcrumb-item href="https://example.com/cash/checking/statements/downloads" Downloads
```

```jsx:react
import SlBreadcrumb from '@teamshares/shoelace/dist/react/breadcrumb';
import SlBreadcrumbItem from '@teamshares/shoelace/dist/react/breadcrumb-item';

const App = () => (
  <SlBreadcrumb>
    <SlBreadcrumbItem href="https://example.com/cash">Cash account</SlBreadcrumbItem>

    <SlBreadcrumbItem href="https://example.com/cash/checking">Checking</SlBreadcrumbItem>

    <SlBreadcrumbItem href="https://example.com/cash/checking/statements">Statements</SlBreadcrumbItem>

    <SlBreadcrumbItem href="https://example.com/cash/checking/statements/downloads">Downloads</SlBreadcrumbItem>
  </SlBreadcrumb>
);
```

### Custom Separators

Use the `separator` slot to change the separator that goes between breadcrumb items. Icons work well, but you can also use text or an image.

:::warning
**Note:** Custom separators are not a standard pattern in our Design System, and there is no Figma component for this option. Please check with the design team before using this option.
:::

```html:preview
<sl-breadcrumb>
  <sl-icon library="fa" name="arrow-right" slot="separator"></sl-icon>
  <sl-breadcrumb-item>First</sl-breadcrumb-item>
  <sl-breadcrumb-item>Second</sl-breadcrumb-item>
  <sl-breadcrumb-item>Third</sl-breadcrumb-item>
</sl-breadcrumb>

<br />

<sl-breadcrumb>
  <sl-icon library="fa" name="chevron-right" slot="separator"></sl-icon>
  <sl-breadcrumb-item>First</sl-breadcrumb-item>
  <sl-breadcrumb-item>Second</sl-breadcrumb-item>
  <sl-breadcrumb-item>Third</sl-breadcrumb-item>
</sl-breadcrumb>

<br />

<sl-breadcrumb>
  <span slot="separator">•</span>
  <sl-breadcrumb-item>First</sl-breadcrumb-item>
  <sl-breadcrumb-item>Second</sl-breadcrumb-item>
  <sl-breadcrumb-item>Third</sl-breadcrumb-item>
</sl-breadcrumb>
```

```pug:slim
sl-breadcrumb
  sl-icon library="fa" name="arrow-right" slot="separator"
  sl-breadcrumb-item First
  sl-breadcrumb-item Second
  sl-breadcrumb-item Third
br
sl-breadcrumb
  sl-icon library="fa" name="chevron-right" slot="separator"
  sl-breadcrumb-item First
  sl-breadcrumb-item Second
  sl-breadcrumb-item Third
br
sl-breadcrumb
  span slot="separator" •
  sl-breadcrumb-item First
  sl-breadcrumb-item Second
  sl-breadcrumb-item Third
```

```jsx:react
import '@teamshares/shoelace/dist/components/icon/icon.js';
import SlBreadcrumb from '@teamshares/shoelace/dist/react/breadcrumb';
import SlBreadcrumbItem from '@teamshares/shoelace/dist/react/breadcrumb-item';

const App = () => (
  <>
    <SlBreadcrumb>
      <sl-icon library="fa" name="arrow-right" slot="separator" />
      <SlBreadcrumbItem>First</SlBreadcrumbItem>
      <SlBreadcrumbItem>Second</SlBreadcrumbItem>
      <SlBreadcrumbItem>Third</SlBreadcrumbItem>
    </SlBreadcrumb>

    <br />

    <SlBreadcrumb>
      <sl-icon library="fa" name="chevron-right" slot="separator" />
      <SlBreadcrumbItem>First</SlBreadcrumbItem>
      <SlBreadcrumbItem>Second</SlBreadcrumbItem>
      <SlBreadcrumbItem>Third</SlBreadcrumbItem>
    </SlBreadcrumb>

    <br />

    <SlBreadcrumb>
      <span slot="separator">•</span>
      <SlBreadcrumbItem>First</SlBreadcrumbItem>
      <SlBreadcrumbItem>Second</SlBreadcrumbItem>
      <SlBreadcrumbItem>Third</SlBreadcrumbItem>
    </SlBreadcrumb>
  </>
);
```

### Prefixes

Use the `prefix` slot to add content before any breadcrumb item.

:::warning
**Note:** The design system pattern for prefixes currently only allows a back arrow (`arrow-left`) to be shown to the left of the first breadcrumb item. The Figma component is locked to this option. Please check with the design team before using a different prefix.
:::

```html:preview
<sl-breadcrumb>
  <sl-breadcrumb-item>
    <sl-icon slot="prefix" library="fa" name="fas-arrow-left"></sl-icon>
    Cap table requests
  </sl-breadcrumb-item>
  <sl-breadcrumb-item>New request</sl-breadcrumb-item>
</sl-breadcrumb>
```

```pug:slim
sl-breadcrumb
  sl-breadcrumb-item
    sl-icon slot="prefix" library="fa" name="fas-arrow-left"
    | Cap table requests
  sl-breadcrumb-item New request
```

```jsx:react
import SlBreadcrumb from '@teamshares/shoelace/dist/react/breadcrumb';
import SlBreadcrumbItem from '@teamshares/shoelace/dist/react/breadcrumb-item';
import SlIcon from '@teamshares/shoelace/dist/react/icon';

const App = () => (
  <SlBreadcrumb>
    <SlBreadcrumbItem>
      <SlIcon slot="prefix" library="fa" name="fas-arrow-left" />
      Cap table requests
    </SlBreadcrumbItem>
    <SlBreadcrumbItem>New request</SlBreadcrumbItem>
  </SlBreadcrumb>
);
```

### Suffixes

Use the `suffix` slot to add content after any breadcrumb item.

:::warning
**Note:** There's currently no use case for displaying suffix icons in breadcrumbs in our apps, and there is no Figma component for this option. Please check with the design team before using this option.
:::

```html:preview
<sl-breadcrumb>
  <sl-breadcrumb-item>Documents</sl-breadcrumb-item>
  <sl-breadcrumb-item>Policies</sl-breadcrumb-item>
  <sl-breadcrumb-item>
    Security
    <sl-icon slot="suffix" name="shield-check"></sl-icon>
  </sl-breadcrumb-item>
</sl-breadcrumb>
```

```pug:slim
sl-breadcrumb
  sl-breadcrumb-item Documents
  sl-breadcrumb-item Policies
  sl-breadcrumb-item
    | Security
    sl-icon slot="suffix" name="shield-check"
```

```jsx:react
import SlBreadcrumb from '@teamshares/shoelace/dist/react/breadcrumb';
import SlBreadcrumbItem from '@teamshares/shoelace/dist/react/breadcrumb-item';
import SlIcon from '@teamshares/shoelace/dist/react/icon';

const App = () => (
  <SlBreadcrumb>
    <SlBreadcrumbItem>Documents</SlBreadcrumbItem>
    <SlBreadcrumbItem>Policies</SlBreadcrumbItem>
    <SlBreadcrumbItem>
      Security
      <SlIcon slot="suffix" name="shield-check"></SlIcon>
    </SlBreadcrumbItem>
  </SlBreadcrumb>
);
```

### With Dropdowns

Dropdown menus can be placed in a prefix or suffix slot to provide additional options.

:::warning
**Note:** There's currently no use case for displaying dropdowns in breadcrumbs in our apps, and there is no Figma component for this option. Please check with the design team before using this option.
:::

```html:preview
<sl-breadcrumb>
  <sl-breadcrumb-item>Homepage</sl-breadcrumb-item>
  <sl-breadcrumb-item>Our Services</sl-breadcrumb-item>
  <sl-breadcrumb-item>Digital Media</sl-breadcrumb-item>
  <sl-breadcrumb-item>
    Web Design
    <sl-dropdown slot="suffix">
      <sl-icon-button slot="trigger" library="fa" label="More options" name="ellipsis"></sl-icon-button>
      <sl-menu>
        <sl-menu-item type="checkbox" checked>Web Design</sl-menu-item>
        <sl-menu-item type="checkbox">Web Development</sl-menu-item>
        <sl-menu-item type="checkbox">Marketing</sl-menu-item>
      </sl-menu>
    </sl-dropdown>
  </sl-breadcrumb-item>
</sl-breadcrumb>
```

```pug:slim
sl-breadcrumb
  sl-breadcrumb-item Homepage
  sl-breadcrumb-item Our Services
  sl-breadcrumb-item Digital Media
  sl-breadcrumb-item
    | Web Design
    sl-dropdown slot="suffix"
      sl-icon-button slot="trigger" library="fa" label="More options" name="ellipsis"
      sl-menu
        sl-menu-item type="checkbox" checked="true" Web Design
        sl-menu-item type="checkbox" Web Development
        sl-menu-item type="checkbox" Marketing
```

```jsx:react
import {
  SlBreadcrumb,
  SlBreadcrumbItem,
  SlButton,
  SlDropdown,
  SlIcon,
  SlMenu,
  SlMenuItem
} from '@teamshares/shoelace/dist/react';

const App = () => (
  <SlBreadcrumb>
    <SlBreadcrumbItem>Homepage</SlBreadcrumbItem>
    <SlBreadcrumbItem>Our Services</SlBreadcrumbItem>
    <SlBreadcrumbItem>Digital Media</SlBreadcrumbItem>
    <SlBreadcrumbItem>
      Web Design
      <SlDropdown slot="suffix">
        <SlIconButton slot="trigger" library="fa" label="More options" name="ellipsis"></SlIconButton>
        <SlMenu>
          <SlMenuItem type="checkbox" checked>
            Web Design
          </SlMenuItem>
          <SlMenuItem type="checkbox">Web Development</SlMenuItem>
          <SlMenuItem type="checkbox">Marketing</SlMenuItem>
        </SlMenu>
      </SlDropdown>
    </SlBreadcrumbItem>
  </SlBreadcrumb>
);
```
