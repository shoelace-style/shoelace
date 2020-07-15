# Installation

There are two ways to install Shoelace. Most users will prefer the simplicity of the lazy loader, but there are advanced options as well.

## Lazy Loader (Recommended)

The easiest way to install Shoelace is with the lazy loader via CDN. A lightweight loader will be added to your page that registers components asynchronously as you use them. It's like magic. ✨

To install the lazy loader, add the following tags to your page.

```html
<link rel="stylesheet" href="https://unpkg.com/@shoelace-style/shoelace@%VERSION%/dist/shoelace/shoelace.css">
<script type="module" src="https://unpkg.com/@shoelace-style/shoelace@%VERSION%/dist/shoelace/shoelace.esm.js"></script>
```

Now you can [start using components!](/getting-started/usage.md)

## Custom Elements Bundle

Another way to consume the library is with the custom elements bundle. Compared to lazy loading, the initial load time will be slower, but all components will be available up front. This will prevent occasional display lags that can occur when using the lazy loader.

To install the custom elements bundle, add the following tags to your page.

```html
<link rel="stylesheet" href="https://unpkg.com/@shoelace-style/shoelace@%VERSION%/dist/shoelace/shoelace.css">
<script type="module">
  import { defineCustomElements } from 'https://unpkg.com/@shoelace-style/shoelace@%VERSION%/dist/custom-elements/index.mjs';
  defineCustomElements();
</script>
```

Now you can [start using components!](/getting-started/usage.md)

## Local Installation

If you don't want to use the CDN, you can install Shoelace locally using the following command. 

```sh
npm install @shoelace-style/shoelace
```

It's up to you to make the source files available to your app. One way to do this is to create a route in your app called `/assets/shoelace` that serves static files from `node_modules/@shoelace-style/shoelace`. 

Once you've done that, add the following tags to your page. Make sure to update `href` and `src` so they point to the route you created.

### Lazy Loader

```html
<link rel="stylesheet" href="/assets/shoelace/shoelace.css">
<script type="module" src="/assets/shoelace/shoelace.esm.js"></script>
```

### Custom Elements Bundle

```html
<link rel="stylesheet" href="/assets/shoelace/shoelace.css">
<script type="module">
  import { defineCustomElements } from '/assets/shoelace/dist/custom-elements/index.mjs';
  defineCustomElements();
</script>
```

Now you can [start using components!](/getting-started/usage.md)
