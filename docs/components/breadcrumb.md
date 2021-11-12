# Breadcrumb

[component-header:sl-breadcrumb]

Breadcrumbs provide a group of links so users can easily navigate a website's hierarchy.

Breadcrumbs are usually placed before a page's main content with the current page shown last to indicate the user's position in the navigation.

```html preview
<sl-breadcrumb>
  <sl-breadcrumb-item>Catalog</sl-breadcrumb-item>
  <sl-breadcrumb-item>Clothing</sl-breadcrumb-item>
  <sl-breadcrumb-item>Women's</sl-breadcrumb-item>
  <sl-breadcrumb-item>Shirts &amp; Tops</sl-breadcrumb-item>
</sl-breadcrumb>
```

```jsx react
import { SlBreadcrumb, SlBreadcrumbItem } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlBreadcrumb>
    <SlBreadcrumbItem>Catalog</SlBreadcrumbItem>
    <SlBreadcrumbItem>Clothing</SlBreadcrumbItem>
    <SlBreadcrumbItem>Women's</SlBreadcrumbItem>
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
  <sl-breadcrumb-item href="https://example.com/home">
    Homepage
  </sl-breadcrumb-item>

  <sl-breadcrumb-item href="https://example.com/home/services">
    Our Services
  </sl-breadcrumb-item>

  <sl-breadcrumb-item href="https://example.com/home/services/digital">
    Digital Media
  </sl-breadcrumb-item>

  <sl-breadcrumb-item href="https://example.com/home/services/digital/web-design">
    Web Design
  </sl-breadcrumb-item>
</sl-breadcrumb>
```

```jsx react
import { SlBreadcrumb, SlBreadcrumbItem } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlBreadcrumb>
    <SlBreadcrumbItem href="https://example.com/home">
      Homepage
    </SlBreadcrumbItem>

    <SlBreadcrumbItem href="https://example.com/home/services">
      Our Services
    </SlBreadcrumbItem>

    <SlBreadcrumbItem href="https://example.com/home/services/digital">
      Digital Media
    </SlBreadcrumbItem>

    <SlBreadcrumbItem href="https://example.com/home/services/digital/web-design">
      Web Design
    </SlBreadcrumbItem>
  </SlBreadcrumb>
);
```

### Custom Separators

Use the `separator` slot to change the separator that goes between breadcrumb items. Icons work well, but you can also use text or an image.

```html preview
<sl-breadcrumb>
  <sl-icon name="dot" slot="separator"></sl-icon>
  <sl-breadcrumb-item>First</sl-breadcrumb-item>
  <sl-breadcrumb-item>Second</sl-breadcrumb-item>
  <sl-breadcrumb-item>Third</sl-breadcrumb-item> 
</sl-breadcrumb>

<br>

<sl-breadcrumb>
  <sl-icon name="arrow-right" slot="separator"></sl-icon>
  <sl-breadcrumb-item>First</sl-breadcrumb-item>
  <sl-breadcrumb-item>Second</sl-breadcrumb-item>
  <sl-breadcrumb-item>Third</sl-breadcrumb-item> 
</sl-breadcrumb>

<br>

<sl-breadcrumb>
  <span slot="separator">/</span>
  <sl-breadcrumb-item>First</sl-breadcrumb-item>
  <sl-breadcrumb-item>Second</sl-breadcrumb-item>
  <sl-breadcrumb-item>Third</sl-breadcrumb-item> 
</sl-breadcrumb>
```

```jsx react
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import { SlBreadcrumb, SlBreadcrumbItem } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    <SlBreadcrumb>
      <sl-icon name="dot" slot="separator" />
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
    <sl-icon slot="prefix" name="house"></sl-icon>
    Home
  </sl-breadcrumb-item>
  <sl-breadcrumb-item>Articles</sl-breadcrumb-item>
  <sl-breadcrumb-item>Traveling</sl-breadcrumb-item>
</sl-breadcrumb>
```

```jsx react
import { SlBreadcrumb, SlBreadcrumbItem, SlIcon } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlBreadcrumb>
    <SlBreadcrumbItem>
      <SlIcon slot="prefix" name="house" />
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
    <sl-icon slot="suffix" name="shield-lock"></sl-icon>
  </sl-breadcrumb-item>
</sl-breadcrumb>
```

```jsx react
import { SlBreadcrumb, SlBreadcrumbItem, SlIcon } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlBreadcrumb>
    <SlBreadcrumbItem>Documents</SlBreadcrumbItem>
    <SlBreadcrumbItem>Policies</SlBreadcrumbItem>
    <SlBreadcrumbItem>
      Security
      <SlIcon slot="suffix" name="shield-lock"></SlIcon>
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
        <sl-icon label="More options" name="three-dots"></sl-icon>
      </sl-button>
      <sl-menu>
        <sl-menu-item checked>Web Design</sl-menu-item>
        <sl-menu-item>Web Development</sl-menu-item>
        <sl-menu-item>Marketing</sl-menu-item>
      </sl-menu>
    </sl-dropdown>    
  </sl-breadcrumb-item>
</sl-breadcrumb>
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
} from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlBreadcrumb>
    <SlBreadcrumbItem>Homepage</SlBreadcrumbItem>
    <SlBreadcrumbItem>Our Services</SlBreadcrumbItem>
    <SlBreadcrumbItem>Digital Media</SlBreadcrumbItem>
    <SlBreadcrumbItem>
      Web Design
      <SlDropdown slot="suffix">
        <SlButton slot="trigger" size="small" circle>
          <SlIcon label="More options" name="three-dots"></SlIcon>
        </SlButton>
        <SlMenu>
          <SlMenuItem checked>Web Design</SlMenuItem>
          <SlMenuItem>Web Development</SlMenuItem>
          <SlMenuItem>Marketing</SlMenuItem>
        </SlMenu>
      </SlDropdown>    
    </SlBreadcrumbItem>
  </SlBreadcrumb>
);
```

[component-metadata:sl-breadcrumb]
