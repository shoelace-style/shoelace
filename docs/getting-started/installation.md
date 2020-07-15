# Installation

You can use Shoelace via CDN or by installing it locally.

## CDN Installation (Recommended)

The easiest way to install Shoelace is with the CDN. A lightweight loader will be added to your page that registers components asynchronously as you use them. It's like magic. ✨

Just add the following tags to your page.

```html
<link rel="stylesheet" href="https://unpkg.com/@shoelace-style/shoelace@%VERSION%/dist/shoelace/shoelace.css">
<script type="module" src="https://unpkg.com/@shoelace-style/shoelace@%VERSION%/dist/shoelace/shoelace.esm.js"></script>
```

Now you can [start using Shoelace components!](/getting-started/usage.md)

## Local Installation

If you don't want to use the CDN, you can install Shoelace locally with the following command. 

```sh
npm install @shoelace-style/shoelace
```

It's up to you to make the source files available to your app. One way to do this is to create a route in your app called `/assets/shoelace` that serves static files from `node_modules/@shoelace-style/shoelace`. 

Once you've done that, add the following tags to your page. Make sure to update `href` and `src` so they point to the route you created.

```html
<link rel="stylesheet" href="/assets/shoelace/shoelace.css">
<script type="module" src="/assets/shoelace/shoelace.esm.js"></script>
```

Now you can [start using Shoelace components!](/getting-started/usage.md)
