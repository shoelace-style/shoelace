# Installation

There are two ways to use Shoelace. Most users will be fine with lazy loading, but there's a more advanced option if you need to load everything up front.

## Lazy Loader (Recommended)

The easiest way to install Shoelace is via CDN with the lazy loader. A lightweight loader will be added to the page that registers Shoelace components asynchronously as you need them.

To install the lazy loader, add the following tags to your page.

```html
<link rel="stylesheet" href="https://unpkg.com/@claviska/shoelace@%VERSION%/shoelace.css" />
<script type="module" src="https://unpkg.com/@claviska/shoelace@%VERSION%/shoelace.esm.js"></script>
```

Now you can [start using components!](/getting-started/usage.md)

## Custom Elements Bundle

Another way to consume the library is with the custom elements bundle. Compared to lazy loading, the initial load time will be slower, but you'll instantly have access to all of Shoelace components. This can prevent the occasional display lag that can occur with the lazy loader.

To install the custom elements bundle, add the following tags to your page.

```html
<link rel="stylesheet" href="https://unpkg.com/@claviska/shoelace@%VERSION%/shoelace.css" />
<script type="module">
  import { defineCustomElements } from 'https://unpkg.com/@claviska/shoelace@%VERSION%/custom-elements-bundle';
  defineCustomElements();
</script>
```

Now you can [start using components!](/getting-started/usage.md)

## Installing Locally

If you don't want to use the CDN version, you can install Shoelace locally using the following command.

```sh
npm install @claviska/shoelace
```

It's up to you to make the files available to your app. One way to do this is to create a route in your app called `/assets/shoelace` that serves static files from `node_modules/@claviska/shoelace`.

Once you've done that, add the following tags to your page.

### Lazy Loader

```html
<link rel="stylesheet" href="/assets/shoelace/shoelace.css" />
<script type="module" src="/assets/shoelace/shoelace.esm.js"></script>
```

### Custom Elements Bundle

```html
<link rel="stylesheet" href="/assets/shoelace/shoelace.css" />
<script type="module">
  import { defineCustomElements } from '/assets/shoelace/custom-elements-bundle';
  defineCustomElements();
</script>
```

Now you can [start using components!](/getting-started/usage.md)
