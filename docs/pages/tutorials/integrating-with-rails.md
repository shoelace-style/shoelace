---
meta:
  title: Integrating with Rails
  description: This page explains how to integrate Shoelace with a Rails app.
---

# Integrating with Rails

This page explains how to integrate Shoelace with a Rails app.

:::tip
This is a community-maintained document. Please [ask the community](/resources/community) if you have questions about this integration. You can also [suggest improvements](https://github.com/shoelace-style/shoelace/blob/next/docs/tutorials/integrating-with-rails.md) to make it better.
:::

## Requirements

This integration has been tested with the following:

- Rails >= 6
- Node >= 12.10
- Webpacker >= 5

## Instructions

To get started using Shoelace with Rails, the following packages must be installed.

```bash
yarn add @teamshares/shoelace copy-webpack-plugin
```

### Importing the Default Theme

The next step is to import Shoelace's default theme (stylesheet) in `app/javascript/stylesheets/application.scss`.

```css
@import '@teamshares/shoelace/dist/themes/light';
@import '@teamshares/shoelace/dist/themes/dark'; // Optional dark theme
```

Fore more details about themes, please refer to [Theme Basics](/getting-started/themes#theme-basics).

### Importing Required Scripts

After importing the theme, you'll need to import the JavaScript files for Shoelace. Add the following code to `app/javascript/packs/application.js`.

```js
import '../stylesheets/application.scss'
import { setBasePath, SlAlert, SlAnimation, SlButton, ... } from '@teamshares/shoelace'

// ...

const rootUrl = document.currentScript.src.replace(/\/packs.*$/, '')

// Path to the assets folder (should be independent from the current script source path
// to work correctly in different environments)
setBasePath(rootUrl + '/packs/js/')
```

### webpack Config

Next we need to add Shoelace's assets to the final build output. To do this, modify `config/webpack/environment.js` to look like this.

```js
const { environment } = require('@rails/webpacker');

// Shoelace config
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

// Add shoelace assets to webpack's build process
environment.plugins.append(
  'CopyPlugin',
  new CopyPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, '../../node_modules/@teamshares/shoelace/dist/assets'),
        to: path.resolve(__dirname, '../../public/packs/js/assets')
      }
    ]
  })
);

module.exports = environment;
```

### Adding Pack Tags

The final step is to add the corresponding `pack_tags` to the page. You should have the following `tags` in the `<head>` section of `app/views/layouts/application.html.erb`.

```html
<!doctype html>
<html>
  <head>
    <!-- ... -->

    <%= stylesheet_pack_tag 'application', media: 'all', 'data-turbolinks-track': 'reload' %> <%= javascript_pack_tag
    'application', 'data-turbolinks-track': 'reload' %>
  </head>
  <body>
    <%= yield %>
  </body>
</html>
```

Now you can start using Shoelace components with Rails!

## Additional Resources

- There is a third-party [example repo](https://github.com/ParamagicDev/rails-shoelace-example), courtesy of [ParamagicDev](https://github.com/ParamagicDev) available to help you get started.
- If you would like to avoid repeating this process, check out the associated [Railsbyte for Shoelace](https://railsbytes.com/templates/X8BsEb).
