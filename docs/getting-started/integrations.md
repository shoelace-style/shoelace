# Integrations

## Rails

### Requirements

Currently, this integration has been tested and working with the
following:

- Rails >= 6
- Node >= 12.10
- Webpacker >= 5

### Getting Started

#### NPM packages

To get started using [Shoelace](https://shoelace.style) with Rails you must first
install the following packages:

```bash
yarn add @shoelace-style/shoelace copy-webpack-plugin
```

#### Importing Stylesheets

The next step is to import the Shoelace stylesheets in a file located at
`app/javascript/stylesheets/application.scss` like so:

```scss
/* app/javascript/stylesheets/application.scss */

@import '~@shoelace-style/shoelace/dist/shoelace/shoelace';
```

#### Importing Javascript

After importing the stylesheet, you must now import the Javascript files
for Shoelace.

To do so, navigate to the `app/javascript/packs/application.js` file and
add the following code:

```js
import '../stylesheets/application.scss'
import { defineCustomElements, setAssetPath } from '@shoelace-style/shoelace'

// ...

// This enables all web components for the current page
setAssetPath(document.currentScript.src)
defineCustomElements()
```

**NOTE** The above code will import all shoelace web components for convenience. If you would like to selectively import components check out the [Using Webpack](https://shoelace.style/getting-started/installation?id=using-webpack) section of the docs.

#### Webpack Config

Now that we have our stylesheets and javascript setup, we have to add
Shoelace's icons to the final build output. To do so, we must modify the
`config/webpack/environment.js` file like so:

```js
const { environment } = require('@rails/webpacker')

// Shoelace config
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

environment.plugins.append(
  'CopyPlugin',
  new CopyPlugin({
    patterns: [
      {
        from: path.resolve(
          __dirname,
          '../../node_modules/@shoelace-style/shoelace/dist/shoelace/icons'
        ),
        to: path.resolve(__dirname, '../../public/packs/js/icons')
      }
    ]
  })
)
```

#### Adding pack tags

The final step to this process is to add the corresponding `pack_tags` to your `app/views/layouts/application.html.erb` file.

You should have the following `tags` in your
`app/views/layouts/application.html.erb` in the `<head>` of the
document, like so:

```html
<html>
  <head>
    <!-- above tags omitted -->

    <%= javascript_pack_tag 'application', 'data-turbolinks-track': 'reload' %>
    <%= stylesheet_pack_tag 'application', media: 'all', 'data-turbolinks-track': 'reload' %>
  </head>
  <body><%= yield %></body>
</html>
```

And that's it! You can start using Shoelace Web Components with Rails.

Check out the [Shoelace Documentation](https://shoelace.style/getting-started/usage) for how to use Shoelace.

### Additional Resources

There is an example repo available to help you get started.

Example Repo:
[https://github.com/ParamagicDev/rails-shoelace-example](https://github.com/ParamagicDev/rails-shoelace-example)

And if you would like to avoid repeating this process, check out the
associated Railsbyte for adding Shoelace.

Railsbyte - Shoelace:
[https://railsbytes.com/templates/X8BsEb](https://railsbytes.com/templates/X8BsEb)


