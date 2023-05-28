# Integrating with Rails

This page explains how to integrate Shoelace with a Rails app.

?> This is a community-maintained document. Please [ask the community](/resources/community) if you have questions about this integration. You can also [suggest improvements](https://github.com/shoelace-style/shoelace/blob/next/docs/tutorials/integrating-with-rails.md) to make it better.

## Requirements

This integration has been tested with the following:

- Rails >= 6
- Node >= 12.10
- Yarn >= 1.22

## Instructions

When using Shoelace, there are mostly three things that need to be served to the client browser:

- Javascript files for the Web Components
- CSS files for light and dark themes (they can co-exist, but one of them is required)
- Shoelace Icons

Depending on the JS bundler you are using, you may need to do some additional configuration. However, the basic steps
should be just about the same. Also, it is recommended to read to the [Bundling section in the Installation](/getting-started/installation?id=bundling)
to understand how Shoelace can be set up with a JS bundler in general. In this tutorial, we will assume that your Rails app
is already set up with a JS bundler that supports importing CSS files directly (e.g. Turbopack, esbuild, Vite).

To get started using Shoelace with Rails, the following package must be installed.

```bash
yarn add @shoelace-style/shoelace
```

This is required regardless of the JS bundler you are using.

### Javascript & CSS

The next step is to import the JavaScript files and default theme for Shoelace. Add the following code to your
entrypoint JS file (generally `application.js`).

```js
// application.js
import '@shoelace-style/shoelace';

// You can also add these two if the JS bundler of your choice supports importing CSS files.
import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/themes/dark.css'; // Optional dark mode
```

!> In this example, all Shoelace components are imported for simplicity. However, importing directly from
`@shoelace-style/shoelace` may result in a larger bundle size than necessary. Consider importing only the components
you actually need in the actual application.

You can also import the CSS inside of a `.css` file if you prefer to maintain a separate CSS entrypoint.
Such as with CssBundling-Rails.

```css
// application.css
@import '@shoelace-style/shoelace/dist/themes/light.css';
```

For more details about themes, please refer to [Theme Basics](/getting-started/themes?id=theme-basics).

### Serving up Shoelace Icons

#### Using the `shoelace-rails` gem

You do not have to do anything else if you are using [the `shoelace-rails` gem](https://github.com/yuki24/shoelace-rails).
Here are how it works in different environments:

- In development and test, the icons are served by the `ActionDispatch::Static` middleware, directly from the
  `node_modules/@shoelace-style/shoelace/dist/assets/icons` directory.
- In production, the icon files are automatically copied into the `public/assets` directory as part of the
  `assets:precompile` rake task.

#### Copying Icon files with a Rake task

If you are not using the `shoelace-rails` gem, you can manually copy the icon files to the `public/assets` directory.
One way to do this is to use a rake task and add it as a dependency to the `assets:precompile` task. Most rails
deployment processes run the `rake assets:precompile` task as of part deply, which means that the icon files will be
copied automatically.

```ruby
# Rakefile
namespace :shoelace do
  namespace :icons do
    desc "Copy Shoelace icons to the assets path"
    task copy: :environment do
      cp_r "node_modules/@shoelace-style/shoelace/dist/assets", Rails.public_path
    end
  end
end

Rake::Task["assets:precompile"].enhance(["shoelace:icons:copy"])
```

Now you can start using Shoelace components with Rails!

## Using Rails View Helpers

[the `shoelace-rails` gem](https://github.com/yuki24/shoelace-rails) is a community-maintained library that provides useful Rake tasks and Rails view helpers for
Shoelace components. In order to use it, add the gem by running the following command:

```bash
bundle add shoelace-rails
```

Once it is installed, you should be able to use the following view helpers to render Shoelace components:

```erb
<%= sl_form_for @user do |form| %>
  <%  # Text input: https://shoelace.style/components/input %>
  <%= form.text_field :name %>
  <%= form.password_field :password, placeholder: "Password Toggle", 'toggle-password': true %>

  <%  # Radio buttons: https://shoelace.style/components/color-picker %>
  <%= form.color_field :color %>

  <%  # Radio buttons: https://shoelace.style/components/radio %>
  <%= form.collection_radio_buttons :status, { id_1: "Option 1", id_2: "Option 2", id_3: "Option 3" }, :first, :last %>

  <%  # Select: https://shoelace.style/components/select %>
  <%= form.collection_select :tag, { id_1: "Option 1", id_2: "Option 2", id_3: "Option 3" }, :first, :last, {}, { placeholder: "Select one" } %>

  <%= form.submit %>
<% end %>
```

And this code will produce:

```html
<form class="new_user" id="new_user" data-remote="true" action="/" accept-charset="UTF-8" method="post">
  <sl-input label="Name" type="text" name="user[name]" id="user_name"></sl-input>
  <sl-input label="Password" type="password" name="user[password]" id="user_password"></sl-input>
  <sl-color-picker value="#ffffff" name="user[color]" id="user_color"></sl-color-picker>

  <sl-radio-group no-fieldset="true">
    <sl-radio value="id_1" name="user[status]" id="user_status_id_1">Option 1</sl-radio>
    <sl-radio value="id_2" name="user[status]" id="user_status_id_2">Option 2</sl-radio>
    <sl-radio value="id_3" name="user[status]" id="user_status_id_3">Option 3</sl-radio>
  </sl-radio-group>

  <sl-select placeholder="Select one" name="user[tag]" id="user_tag">
    <sl-menu-item value="id_1">Option 1</sl-menu-item>
    <sl-menu-item value="id_2">Option 2</sl-menu-item>
    <sl-menu-item value="id_3">Option 3</sl-menu-item>
  </sl-select>

  <sl-button submit="true" type="primary" data-disable-with="Create User">Create User</sl-button>
</form>
```

For more details about the gem, please refer to [the official README](https://github.com/yuki24/shoelace-rails).

## Additional Resources

- There is a third-party [example repo](https://github.com/ParamagicDev/rails-shoelace-example), courtesy of [ParamagicDev](https://github.com/ParamagicDev) available to help you get started.
- If you would like to avoid repeating this process, check out the associated [Railsbyte for Shoelace](https://railsbytes.com/templates/X8BsEb).
