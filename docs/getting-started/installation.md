# Installation

You can use Shoelace via CDN or by installing it locally.

## CDN Installation (Recommended)

The easiest way to install Shoelace is with the CDN. A lightweight loader will be added to your page that registers components asynchronously as you use them. It's like magic. ✨

Just add the following tags to your page.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@%VERSION%/dist/shoelace/shoelace.css">
<script type="module" src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@%VERSION%/dist/shoelace/shoelace.esm.js"></script>
```

Now you can [start using Shoelace!](/getting-started/usage.md)

## Local Installation

If you don't want to use the CDN, you can install Shoelace locally with the following command. 

```bash
npm install @shoelace-style/shoelace
```

It's up to you to make the source files available to your app. One way to do this is to create a route in your app called `/assets/shoelace` that serves static files from `node_modules/@shoelace-style/shoelace`. 

Once you've done that, add the following tags to your page. Make sure to update `href` and `src` so they point to the route you created.

```html
<link rel="stylesheet" href="/assets/shoelace/shoelace.css">
<script type="module" src="/assets/shoelace/shoelace.esm.js"></script>
```

## Importing Custom Elements

A [custom elements bundle](https://stenciljs.com/docs/custom-elements) is available so you can import components and register them individually. This is a more flexible alternative to the lazy loading approach, but it requires the use of a bundler such as [webpack](https://webpack.js.org/) or [Rollup](https://rollupjs.org/guide/en/). You'll also need to manage static assets on your own.

Instructions vary depending on the bundler you're using.

## Using webpack

To use the custom elements bundle with webpack, install Shoelace first.

```bash
npm install @shoelace-style/shoelace
```

Your `webpack.config.js` should look something like what's shown below. Note how assets such as icons are copied from `node_modules` to `dist/icons` via the `CopyPlugin` utility.

```js
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'node_modules/@shoelace-style/shoelace/dist/shoelace/icons'),
          to: path.resolve(__dirname, 'dist/icons')
        }
      ]
    })
  ]
};
```

Next, import the components you want to use and set the assets directory.

```js
import '@shoelace-style/shoelace/dist/shoelace/shoelace.css';
import { setAssetPath, SlButton, SlDropdown } from '@shoelace-style/shoelace';

setAssetPath(document.currentScript.src);
customElements.define('sl-button', SlButton);
customElements.define('sl-dropdown', SlDropdown);
```

For convenience, the bundle also exports a `defineCustomElements()` method. When this method is called, it will register all Shoelace components in the bundle.

```js
import '@shoelace-style/shoelace/dist/shoelace/shoelace.css';
import { defineCustomElements, setAssetPath } from '@shoelace-style/shoelace';

setAssetPath(document.currentScript.src);
defineCustomElements();
```

While convenient for prototyping, importing all components will make your bundle larger. For best results, only import the components you're actually using.

?> An [example webpack project](https://github.com/shoelace-style/webpack-example) is also available on GitHub for your convenience.

## Using Rollup

To use the custom elements bundle with Rollup, install Shoelace first.

```bash
npm install @shoelace-style/shoelace
```

Your `rollup.config.js` should look something like what's shown below. Note how assets such as icons are copied from `node_modules` to `dist/icons` via the `rollup-copy-plugin`.

```js
import path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.js',
  output: [{ dir: path.resolve('dist/'), format: 'es' }],
  plugins: [
    resolve(),
    commonjs(),
    postcss({
      extensions: ['.css']
    }),
    copy({
      targets: [
        {
          src: path.resolve(__dirname, 'node_modules/@shoelace-style/shoelace/dist/shoelace/icons'),
          dest: path.resolve(__dirname, 'dist')
        }
      ]
    })
  ]
};
```

Next, import the components you want to use and set the assets directory.

```js
import '@shoelace-style/shoelace/dist/shoelace/shoelace.css';
import { setAssetPath, SlButton, SlDropdown } from '@shoelace-style/shoelace';

setAssetPath(document.currentScript.src);
customElements.define('sl-button', SlButton);
customElements.define('sl-dropdown', SlDropdown);
```

For convenience, the bundle also exports a `defineCustomElements()` method. When this method is called, it will register all Shoelace components in the bundle.

```js
import '@shoelace-style/shoelace/dist/shoelace/shoelace.css';
import { defineCustomElements, setAssetPath } from '@shoelace-style/shoelace';

setAssetPath(document.currentScript.src);
defineCustomElements();
```

While convenient for prototyping, importing all components will make your bundle larger. For best results, only import the components you're actually using.

?> An [example Rollup project](https://github.com/shoelace-style/rollup-example) is also available on GitHub for your convenience.
