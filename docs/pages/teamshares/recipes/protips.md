---
meta:
  title: Protips
---

# Shoelace Protips

<sl-breadcrumb>
  <sl-breadcrumb-item href="/teamshares/recipes/">
    <sl-icon slot="prefix" library="fa" name="square-list"></sl-icon>
    Recipes
  </sl-breadcrumb-item>
  <sl-breadcrumb-item>Protips</sl-breadcrumb-item>
</sl-breadcrumb>

## Conditional attributes

When setting an attribute flag, some flags need an actual value like “true” or “false”, but some — like `checked` within `sl-menu-item` — just need to be present. In that case, setting `checked=“false”` will still evaluate as true because the mere presence of the attribute is truthy. An empty string, eg `checked=""` , will also evaluate as true, so you don’t want to interpolate your conditional inside of quotes like `checked="#{some conditional}"`.

For these attributes, you should instead evaluate the value in inline Ruby code so that, if it’s false, the attribute isn’t attached to the dom at all:

```pug:slim
sl-checkbox[
  checked = (@variable == value)
]
```

This will render as `<sl-checkbox checked></sl-checkbox>` if true and simply `<sl-checkbox></sl-checkbox>` if false.

---

## Nested rendering

Shoelace rendering is more flexible than it looks: in many cases, the child of a Shoelace wrapper component such as `sl-menu` or `sl-button-group` doesn’t actually have to be a Shoelace component. And if the child is a Shoelace element, it doesn't have to be the direct descendant of the wrapper. For example, within an `sl-dropdown`, which composes an `sl-menu` as the popover, you can nest the `sl-menu-item` components inside of Rails helpers like `link_to`:

```pug:slim
sl-menu
  = link_to user_info_path
    sl-menu-item
      sl-icon name="cog-8-tooth" slot="prefix"
      | Profile settings
  = link_to destroy_user_session_path
    sl-menu-item
      sl-icon name="arrow-right-on-rectangle" slot="prefix"
      | Sign out
```

Likewise, you can use a Rails ViewComponent that wraps an `sl-button` within an `sl-button-group`, and it will still render the group correctly:

```pug:slim
sl-button-group
  sl-button variant="primary"
    | Shoelace button
  = render SharedUI::ButtonToComponent.new(\
    text: "Second button inside a VC",
    path: complete_path,
    options: {\
      "data-test-id" => "test-button",
    })
  sl-button
    | Another button
```
