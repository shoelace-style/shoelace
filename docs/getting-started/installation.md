# Installation

There are two ways to use Shoelace. Most users will be fine with lazy loading, but there's a more advanced option if you need to load everything up front.

## Lazy Loader (Recommended)

The easiest way to load Shoelace is via CDN with the lazy loader. A lightweight loader will be added to the page that registers Shoelace components asynchronously as you use them.

To install the lazy loader, add the following tags to your page.

```html
<link rel="stylesheet" src="https://unpkg.com/@claviska/shoelace@%VERSION%/shoelace.css" />
<script type="module" src="https://unpkg.com/@claviska/shoelace@%VERSION%/shoelace.esm.js"></script>
```

Now you're ready to [start using components!](/getting-started/usage.md)

## Custom Elements Bundle (Advanced)

Another way to consume the library is with the custom elements bundle. Compared to lazy loading, the initial load time will be slower, but you'll instantly have access to all of Shoelace components. This can prevent the occasional display lag that can occur with the lazy loader.

To install the custom elements bundle, add the following tags to your page.

```html
<link rel="stylesheet" src="https://unpkg.com/@claviska/shoelace@%VERSION%/shoelace.css" />
<script type="module">
  import { defineCustomElements } from 'https://unpkg.com/@claviska/shoelace@%VERSION%/custom-elements-bundle';
  defineCustomElements();
</script>
```

Now you're ready to [start using components!](/getting-started/usage.md)
