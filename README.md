# Shoelace

A forward-thinking component library built with Web Components.

Objective:

1. Design a framework-agnostic component library 🧩
2. Be able to load it from a CDN ⚡️
3. Fully customize it with CSS variables — no need to build it yourself! 🎨

Designed and developed in New Hampshire by [Cory LaViska](https://twitter.com/claviska).

## Installation

TODO

## Usage

TODO

## Developers

TODO

## Bugs, Questions, & Support

TODO

## Themes & Customization

Shoelace makes extensive use of CSS Custom Properties, or "CSS variables." As a result, you can load the entire library via CDN and customize it by overriding the necessary variables in your own stylesheet. **You don't need to build Shoelace from source, nor do you need to use a preprocessor.**

Each theme defines what I like to call Shoelace's "base variables." Base variables aren't component-specific; rather they define a set of high-level design tokens that each component uses as a basis for its own styles.

For example, `--form-control-font-family` is a base variable that is used by a number of form controls, including `<sl-button>` and `<sl-input>`. Therefore, you can override `--form-control-font-family` to adjust the font for all buttons, inputs, et al. Alternatively, you can override `--button-font-family` to only adjust the font for buttons.

Consider this example:

```css
/* Customize base variables */
:root {
  --form-control-font-family: 'Open Sans', sans-serif;
  --form-control-color: black;
}

/* Customize button variables */
sl-button {
  --button-font-family: '', sans-serif;
  --button-color: white;
}
```

Astute readers might be wondering why the button variables aren't located in the same `:root` selector as the base variables. This is because base variables are defined at the `:root` level, whereas component variables are defined at the `:host` level (e.g. `<sl-button>`). This design decision provides us with a few helpful benefits:

- It's impossible to reuse component variables in other components. This is a good thing, as it prevents changes in one component's styles from inadvertently affecting another. (As a rule of thumb, if a style _really_ needs to be shared between components, it should be promoted to a base variable.)

- It's easier to document and manage component-specific variables when they live with their components, and customizing the library becomes easier as you don't have to sift through an exhaustive list of variables to find the ones you need (i.e. variable hell).

- Component-specific overrides become explicit in your stylesheet. There's no question as to which variables affect which components.

- Theme files remain small since they consist onlh of base variables and (potentially) a handful of component-specific overrides.

## Shadow DOM

Most Shoelace components use a Shadow DOM with the exception of form controls. This is for your convenience, since form controls inside a shadow DOM aren't submitted with standard HTML forms. In the future, when StencilJS and browsers add support for [Form-associated Custom Elements](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-face-example), it would be nice if all components can use a Shadow DOM.

## Attribution

- Theme colors and form controls inspired by [Element](element.eleme.io)
- Popover positioning is handled by [Popper.js](https://popper.js.org/)
- Tooltips are provided by [Tippy.js](https://atomiks.github.io/tippyjs/)
