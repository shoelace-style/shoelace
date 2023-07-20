# Breadcrumb

[component-header:sl-breadcrumb]

Breadcrumbs are usually placed before a page's main content with the current page shown last to indicate the user's position in the navigation.

```html preview
<sl-breadcrumb>
  <sl-breadcrumb-item>Catalog</sl-breadcrumb-item>
  <sl-breadcrumb-item>Clothing</sl-breadcrumb-item>
  <sl-breadcrumb-item>Women</sl-breadcrumb-item>
  <sl-breadcrumb-item>Shirts &amp; Tops</sl-breadcrumb-item>
</sl-breadcrumb>
```

```pug slim
sl-breadcrumb
  sl-breadcrumb-item Catalog
  sl-breadcrumb-item Clothing
  sl-breadcrumb-item Women
  sl-breadcrumb-item Shirts &amp; Tops
```

```jsx react
import { SlBreadcrumb, SlBreadcrumbItem } from '@teamshares/shoelace/dist/react';

const App = () => (
  <SlBreadcrumb>
    <SlBreadcrumbItem>Catalog</SlBreadcrumbItem>
    <SlBreadcrumbItem>Clothing</SlBreadcrumbItem>
    <SlBreadcrumbItem>Women</SlBreadcrumbItem>
    <SlBreadcrumbItem>Shirts &amp; Tops</SlBreadcrumbItem>
  </SlBreadcrumb>
);
```

## Examples

### Breadcrumb Links

By default, breadcrumb items are rendered as buttons so you can use them to navigate single-page applications. In this case, you'll need to add event listeners to handle clicks.

For websites, you'll probably want to use links instead. You can make any breadcrumb item a link by applying an `href` attribute to it. Now, when the user activates it, they'll be taken to the corresponding page — no event listeners required.

```html preview
<sl-breadcrumb>
  <sl-breadcrumb-item href="https://example.com/home">Homepage</sl-breadcrumb-item>

  <sl-breadcrumb-item href="https://example.com/home/services">Our Services</sl-breadcrumb-item>

  <sl-breadcrumb-item href="https://example.com/home/services/digital">Digital Media</sl-breadcrumb-item>

  <sl-breadcrumb-item href="https://example.com/home/services/digital/web-design">Web Design</sl-breadcrumb-item>
</sl-breadcrumb>
```

```pug slim
sl-breadcrumb
  sl-breadcrumb-item href="https://example.com/home" Homepage
  sl-breadcrumb-item href="https://example.com/home/services" Our Services
  sl-breadcrumb-item href="https://example.com/home/services/digital" Digital Media
  sl-breadcrumb-item href="https://example.com/home/services/digital/web-design" Web Design
```

```jsx react
import { SlBreadcrumb, SlBreadcrumbItem } from '@teamshares/shoelace/dist/react';

const App = () => (
  <SlBreadcrumb>
    <SlBreadcrumbItem href="https://example.com/home">Homepage</SlBreadcrumbItem>

    <SlBreadcrumbItem href="https://example.com/home/services">Our Services</SlBreadcrumbItem>

    <SlBreadcrumbItem href="https://example.com/home/services/digital">Digital Media</SlBreadcrumbItem>

    <SlBreadcrumbItem href="https://example.com/home/services/digital/web-design">Web Design</SlBreadcrumbItem>
  </SlBreadcrumb>
);
```

### Custom Separators

Use the `separator` slot to change the separator that goes between breadcrumb items. Icons work well, but you can also use text or an image.

```html preview
<sl-breadcrumb>
  <sl-icon name="arrow-small-right-mini" slot="separator"></sl-icon>
  <sl-breadcrumb-item>First</sl-breadcrumb-item>
  <sl-breadcrumb-item>Second</sl-breadcrumb-item>
  <sl-breadcrumb-item>Third</sl-breadcrumb-item>
</sl-breadcrumb>

<br />

<sl-breadcrumb>
  <sl-icon name="arrow-right" slot="separator"></sl-icon>
  <sl-breadcrumb-item>First</sl-breadcrumb-item>
  <sl-breadcrumb-item>Second</sl-breadcrumb-item>
  <sl-breadcrumb-item>Third</sl-breadcrumb-item>
</sl-breadcrumb>

<br />

<sl-breadcrumb>
  <span slot="separator">/</span>
  <sl-breadcrumb-item>First</sl-breadcrumb-item>
  <sl-breadcrumb-item>Second</sl-breadcrumb-item>
  <sl-breadcrumb-item>Third</sl-breadcrumb-item>
</sl-breadcrumb>
```

```pug slim
sl-breadcrumb
  sl-icon name="arrow-small-right-mini" slot="separator"
  sl-breadcrumb-item First
  sl-breadcrumb-item Second
  sl-breadcrumb-item Third
br
sl-breadcrumb
  sl-icon name="arrow-right" slot="separator"
  sl-breadcrumb-item First
  sl-breadcrumb-item Second
  sl-breadcrumb-item Third
br
sl-breadcrumb
  span slot="separator" /
  sl-breadcrumb-item First
  sl-breadcrumb-item Second
  sl-breadcrumb-item Third
```

```jsx react
import '@teamshares/shoelace/dist/components/icon/icon.js';
import { SlBreadcrumb, SlBreadcrumbItem } from '@teamshares/shoelace/dist/react';

const App = () => (
  <>
    <SlBreadcrumb>
      <sl-icon name="arrow-small-right-mini" slot="separator" />
      <SlBreadcrumbItem>First</SlBreadcrumbItem>
      <SlBreadcrumbItem>Second</SlBreadcrumbItem>
      <SlBreadcrumbItem>Third</SlBreadcrumbItem>
    </SlBreadcrumb>

    <br />

    <SlBreadcrumb>
      <sl-icon name="arrow-right" slot="separator" />
      <SlBreadcrumbItem>First</SlBreadcrumbItem>
      <SlBreadcrumbItem>Second</SlBreadcrumbItem>
      <SlBreadcrumbItem>Third</SlBreadcrumbItem>
    </SlBreadcrumb>

    <br />

    <SlBreadcrumb>
      <span slot="separator">/</span>
      <SlBreadcrumbItem>First</SlBreadcrumbItem>
      <SlBreadcrumbItem>Second</SlBreadcrumbItem>
      <SlBreadcrumbItem>Third</SlBreadcrumbItem>
    </SlBreadcrumb>
  </>
);
```

### Prefixes

Use the `prefix` slot to add content before any breadcrumb item.

```html preview
<sl-breadcrumb>
  <sl-breadcrumb-item>
    <sl-icon slot="prefix" name="home-mini"></sl-icon>
    Home
  </sl-breadcrumb-item>
  <sl-breadcrumb-item>Articles</sl-breadcrumb-item>
  <sl-breadcrumb-item>Traveling</sl-breadcrumb-item>
</sl-breadcrumb>
```

```pug slim
sl-breadcrumb
  sl-breadcrumb-item
    sl-icon slot="prefix" name="home-mini"
    | Home
  sl-breadcrumb-item Articles
  sl-breadcrumb-item Traveling
```

```jsx react
import { SlBreadcrumb, SlBreadcrumbItem, SlIcon } from '@teamshares/shoelace/dist/react';

const App = () => (
  <SlBreadcrumb>
    <SlBreadcrumbItem>
      <SlIcon slot="prefix" name="home-mini" />
      Home
    </SlBreadcrumbItem>
    <SlBreadcrumbItem>Articles</SlBreadcrumbItem>
    <SlBreadcrumbItem>Traveling</SlBreadcrumbItem>
  </SlBreadcrumb>
);
```

### Suffixes

Use the `suffix` slot to add content after any breadcrumb item.

```html preview
<sl-breadcrumb>
  <sl-breadcrumb-item>Documents</sl-breadcrumb-item>
  <sl-breadcrumb-item>Policies</sl-breadcrumb-item>
  <sl-breadcrumb-item>
    Security
    <sl-icon slot="suffix" name="shield-check"></sl-icon>
  </sl-breadcrumb-item>
</sl-breadcrumb>
```

```pug slim
sl-breadcrumb
  sl-breadcrumb-item Documents
  sl-breadcrumb-item Policies
  sl-breadcrumb-item
    | Security
    sl-icon slot="suffix" name="shield-check"
```

```jsx react
import { SlBreadcrumb, SlBreadcrumbItem, SlIcon } from '@teamshares/shoelace/dist/react';

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

```html preview
<sl-breadcrumb>
  <sl-breadcrumb-item>Homepage</sl-breadcrumb-item>
  <sl-breadcrumb-item>Our Services</sl-breadcrumb-item>
  <sl-breadcrumb-item>Digital Media</sl-breadcrumb-item>
  <sl-breadcrumb-item>
    Web Design
    <sl-dropdown slot="suffix">
      <sl-button slot="trigger" size="small" circle>
        <sl-icon label="More options" name="ellipsis-vertical"></sl-icon>
      </sl-button>
      <sl-menu>
        <sl-menu-item type="checkbox" checked>Web Design</sl-menu-item>
        <sl-menu-item type="checkbox">Web Development</sl-menu-item>
        <sl-menu-item type="checkbox">Marketing</sl-menu-item>
      </sl-menu>
    </sl-dropdown>
  </sl-breadcrumb-item>
</sl-breadcrumb>
```

```pug slim
sl-breadcrumb
  sl-breadcrumb-item Homepage
  sl-breadcrumb-item Our Services
  sl-breadcrumb-item Digital Media
  sl-breadcrumb-item
    | Web Design
    sl-dropdown slot="suffix"
      sl-button slot="trigger" size="small" circle="true"
        sl-icon label="More options" name="ellipsis-vertical"
      sl-menu
        sl-menu-item type="checkbox" checked="true" Web Design
        sl-menu-item type="checkbox" Web Development
        sl-menu-item type="checkbox" Marketing
```

```jsx react
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
        <SlButton slot="trigger" size="small" circle>
          <SlIcon label="More options" name="ellipsis-vertical"></SlIcon>
        </SlButton>
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

[component-metadata:sl-breadcrumb]
