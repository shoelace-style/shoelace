# Button Playbook

# Types of buttons

## 1. Link buttons

<aside>
💡 Hint: these are buttons marked with external: true or marked with render_as_link: true

</aside>

### Before

```
= render SharedUI::ButtonComponent.new(\
  text: "Schedule prep session",
  link: "https://www.calendly.com/mickmoylan",
  icon: "calendar_icon",
  external: true,
  method: "get",
  size: "medium",
  type: "outlined")
```

### After

```
sl-button[size="large" pill href="https://www.calendly.com/mickmoylan" target="_blank"]
  sl-icon[slot="prefix" name="calendar"]
  | Schedule prep session
```

<aside>
💡 Hint: use target="_blank" to open the link in a new tab

</aside>

## 2. Submit button

<aside>
💡 Hint: these are commonly used with simpleform and have submit: true

</aside>

### Before

```
= render SharedUI::ButtonComponent.new(\
          text: "Accept",
          type: "primary",
          data:  { test_id: "accept-event-button" },
          submit: true,
          disabled: preview ? true : false,
          options: { classes: "ml-2", name: "accept", value: "Accept" })
```

### After

```jsx
sl-button[size="large" pill type="submit" data-test_id="accept-event-button" variant="primary" disabled="#{preview ? true : false}"]
	| Accept
```

## 3. Disabled button

### Before

```
render SharedUI::ButtonComponent.new(
  text: "Previous",
  link: nil,
  disabled: true,
  size: "small",
  type: "outlined",
)
```

### After

```jsx
sl-button[size="small" pill disabled="true"]
	| Previous
```

<aside>
💡 Hint: to render in a content_tag, this is how you would do so:

</aside>

```jsx

 content_tag("sl-button", "Previous", pill: true, disabled: true, size: "small")
```

## 4. Stimulus Button

### Before

```
render SharedUI::ButtonComponent.new(
  text: "Complete",
  link:complete_path,
  data: {
    "education--presentation-target" => "nextLink",
  },
  submit: true,
  size: "small",
  type: "primary",
)
```

### After (this example uses a content tag)

```jsx
content_tag("sl-button", "Complete", variant: "primary", href: complete_path, pill: true, size: "small", type: "submit", "data-education--presentation-target": "nextLink")
```

## 5. Modal button

### Before

```
render SharedUI::ButtonComponent.new(
  text: "Presentations",
  link:path,
  modal: true,
  method: "get",
  size: "medium",
  type: "outlined",
)
```

### After (this example uses a content tag)

<aside>
💡 For more information check out [our Rails UJS recipe page](https://design.teamshares.com/#/teamshares/recipes/rails-ujs)

</aside>

```jsx
content_tag("sl-button", "Presentations", size: "large", pill: true, href: *path*, "data-toggle": "modal",  "data-remote": true, "data-dismissible": true, "data-close-others": true, "data-method": "get")
```

<aside>
💡 Hint: you may need to run the following commands for modal buttons to work locally:

</aside>

```
yarn cache clean && rm -rf node_modules
```

```
yarn add https://github.com/teamshares/shared-ui.git#main
```

```
yarn build --watch
```

## 6. Internal link/path with no explicit associated form

<aside>
💡 Hint: for :get requests you can just use a link button above, for :delete, :post, :patch, etc. we now have a ButtonTo view component that behaves as rails’ [button_to](https://apidock.com/rails/ActionView/Helpers/UrlHelper/button_to)

</aside>

### Before

```
= render SharedUI::ButtonComponent.new(
        text: "Complete",
        link: complete_path,
        data: {
          "education--presentation-target" => "nextLink",
        },
        submit: true,
        size: "small",
        type: "primary",
      )
```

### After

```jsx
# the default method here is "post", can pass in a method field to change
= render SharedUI::ButtonToComponent.new(text: "Complete", path: complete_path, options: {"data-education--presentation-target": "nextLink"}
```

## 7. Icon buttons

<aside>
💡 Hint: move the icon before or after the text with “prefix” or “suffix”

</aside>

### Before

```jsx
= render SharedUI::ButtonComponent.new(\
  text: "Schedule prep session",
  link: "https://www.calendly.com/mickmoylan",
  icon: "calendar_icon",
  external: true,
  method: "get",
  size: "medium",
  type: "outlined")
```

### After

```jsx
sl-button[size="large" pill href="[https://www.calendly.com/mickmoylan](https://www.calendly.com/mickmoylan)" target="_blank"]
	sl-icon[slot="prefix" name="calendar"]
	| Schedule prep session
```
