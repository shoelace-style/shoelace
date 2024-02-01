# View Component wrapping

> TL;DR: If you want to use the auto-generated Stimulus controllers and encapsulated styling for your View Components, you need to:
>
> 1. Call `enable_wrapper` within your `component.rb` class
> 1. Have a single top-level element in your view (if not, a top-level `<div>` will be created automatically)
> 1. Put your top-level styling within a `._base {}` block in your `component.scss`

---

The Platform team recently released changes to `teamshares-rails` that allowed almost all the assets for a component to live in the same folder: the Ruby class, Slim template view, Stimulus controller, preview, and stylesheet. In order to do that, we were previously wrapping every component in a `<ts-wrapper>` tag, which served as a top-level wrapper element for the Stimulus controller and a generated CSS class that would encapsulate the component's style rules. However, this wrapper element caused some problems in terms of styling, since it added a new level of hierarchy to the DOM. (More details [here](https://github.com/teamshares/architecture-decision-record/pull/31).)

Our new pattern (as of late January, 2024) is twofold:

### 1. Opt-in wrapping via `enable_wrapper`

View Components no longer get wrapped by default. Wrapping is now opt-in via the `enable_wrapper` class method, called within the component's class definition:

```ruby
class SharedUI::Demo::Component < SharedUI::ApplicationComponent
  enable_wrapper

  def initialize(title:)
    super
    @title = title
  end
end
```

If you don't include `enable_wrapper`, the component will not receive the auto-generated Stimulus controller and CSS class from their folder. We plan to eventually enable this for all components again, making it opt-out rather than opt-in, but this is the intermediate step.

### 2. Automatic application of styles and controller

If you _do_ enable the wrapper, the component will get wrapped with the `<ts-wrapper>` tag, which will have the generated controller and scoped CSS class applied to it.

---

#### Coming soon (once the latest PR into `design-system is merged`):

Using the magic of the `connectedCallback()` method of web components, the `<ts-wrapper>` tag will be removed as soon as the component hits the DOM, after first applying its properties to the component itself. Effectively, it will appear as though the controller and CSS were applied directly to the top-level element of the View Component.

> Caveat: If your component doesn't have a single top-level element, the code will automatically create a new `<div>` and wrap the contents of your view in it. This is so that it can apply the controller and CSS parent class.

In order to make this work, we now include a `._base {}` class definition in the `component.scss` that's created when you run `rails generate view_component`. Styles that appear within the `._base` block will be applied directly to the generated CSS class for the component. For example, if your component is called `Foo`, and your `._base` class contained a style rule `background: red;`, the compiled CSS that ends up in `application.css` would be:

```
c-foo {
  background: red;
}
```

What does this look like in practice? Check out the example code below.

## Example Code

A component with this file structure and code:

```
/Foo/
  - component.html.slim
  - component.rb
  - controller.js
  - preview.rb
  - style.scss
```

`component.html.slim`

```
.cursor-pointer data-controller="some-controller"
  .bar Some text
```

`component.rb`

```
class Foo::Component < ApplicationComponent
  enable_wrapper

  def some_method
    ...
  end
end
```

`style.scss`

```
._base {
  @apply flex items-center;
}

.bar {
  @apply m-8;
}
```

Will yield the following raw HTML:

```
<ts-wrapper class="c-foo" data-controller="components--foo">
  <div class="center" data-controller="some-controller">
    <div class="bar">Some text content</div>
  </div>
</ts-wrapper>
```

...which, once it's been added to the DOM and `connectedCallback` has been called on the `ts-wrapper`, will become this final HTML:

```
<div class="c-foo center" data-controller="components--foo some-controller">
  <div class="bar">Some text content</div>
</div>
```

...along with the following compiled stylesheet within `application.css`:

```
.c-foo {
  display: flex;
  align-items: center;
}
.c-foo .bar {
  margin: 2rem;
}
```
