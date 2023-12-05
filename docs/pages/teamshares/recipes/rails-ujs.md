---
meta:
  title: Shoelace and Rails UJS
---

# Shoelace and Rails UJS

<sl-breadcrumb>
  <sl-breadcrumb-item href="/teamshares/recipes/">
    <sl-icon slot="prefix" library="fa" name="square-list"></sl-icon>
    Recipes
  </sl-breadcrumb-item>
  <sl-breadcrumb-item>Rails UJS</sl-breadcrumb-item>
</sl-breadcrumb>

## TL;DR:

For usage with `data-remote`, like for launching modals, use `data-url` to set the path. For regular link buttons, use the `href` attribute.

```html:preview
<sl-button data-url="some_path" data-remote="true" data-toggle="modal" data-dismissible="true" data-close-others="true">Modal launcher</sl-button>

<sl-button href="some_path">Regular link button</sl-button>
```

```pug:slim
sl-button[
  data-url="some_path"
  data-remote="true"
  data-toggle="modal"
  data-dismissible="true"
  data-close-others="true"
]
  | Modal launcher

sl-button href="some_path" Regular link button
```

### Detailed explanation

For the most part, Shoelace components function like regular html elements, including tha ability to add the `data-` attributes used by Rails to inject functionality. Where that breaks down is when Rails expects only a certain subset of elements to have those attributes. One example of this is UJS's handling of button clicks, which, by default, only detects HTML `<button>` elements. `<sl-button>` does contain a `<button>` element (or an `<a>` tag if it's a link button), but those are hidden in the shadow dom, where UJS can't find them.

Fortunately, Rails UJS is in JavaScript, which means the query selectors it uses to find elements on the page is writeable. All we have to do is directly modify that selector, and UJS will treat `<sl-button>` elements like other `<button>`s. We have to do that before Rails is initialized so that UJS has a chance to run.

Here's the code that overrides the UJS selectors. (It's already in `shared-ui`, this is just for posterity.)

```js
import Rails from '@rails/ujs';

Rails.buttonClickSelector = {
  selector:
    Rails.buttonClickSelector.selector + ', sl-button[data-remote]:not([form]), sl-button[data-confirm]:not([form])',
  exclude: 'form button, form sl-button'
};
Rails.linkClickSelector +=
  ', sl-button[href][data-confirm], sl-button[href][data-method], sl-button[href][data-remote]:not([disabled]), sl-button[href][data-disable-with], sl-button[href][data-disable]';
Rails.inputChangeSelector += ', sl-select[data-remote], sl-input[data-remote], sl-textarea[data-remote]';
Rails.formInputClickSelector +=
  ', form:not([data-turbo=true]) sl-input[type=submit], form:not([data-turbo=true]) sl-input[type=image], form:not([data-turbo=true]) sl-button[type=submit], form:not([data-turbo=true]) sl-button:not([type]), sl-input[type=submit][form], sl-input[type=image][form], sl-button[type=submit][form], sl-button[form]:not([type])';
Rails.formDisableSelector +=
  ', sl-input[data-disable-with]:enabled, sl-button[data-disable-with]:enabled, sl-textarea[data-disable-with]:enabled, sl-input[data-disable]:enabled, sl-button[data-disable]:enabled, sl-textarea[data-disable]:enabled';
Rails.formEnableSelector +=
  ', sl-input[data-disable-with]:disabled, sl-button[data-disable-with]:disabled, sl-textarea[data-disable-with]:disabled, sl-input[data-disable]:disabled, sl-button[data-disable]:disabled, sl-textarea[data-disable]:disabled';
Rails.fileInputSelector += ', sl-input[name][type=file]:not([disabled])';
Rails.linkDisableSelector += ', sl-button[href][data-disable-with], sl-button[href][data-disable]';
Rails.buttonDisableSelector += ', sl-button[data-remote][data-disable-with], sl-button[data-remote][data-disable]';

Rails.start();
```

Because we've modified the selectors, you can now use an `<sl-button>` like so:

```ruby
content_tag("sl-button",
  "Button label",
  data: {
    "remote" => true,
    "url" => some_path,
    "toggle" => "modal",
    "dismissible" => true,
    "close-others" => true,
  })
```

Or, in Slim:

```pug:slim
sl-button[
  data-url="some_path"
  data-remote="true"
  data-toggle="modal"
  data-dismissible="true"
  data-close-others="true"
]
  | Button label
```

Note that UJS expects the URL for a button with `data-remote` to be set in the `data` attributes rather than the `href` we would normally use. (You can still set the `href`, but it won't do anything.) For regular link buttons

### A useful way to debug

Rails provides a `delegate` method that allows you to intercept events emitted by elements matching a selector. This is very useful for seeing which elements are dispatching which events.

```js
import Rails from '@rails/ujs';

Rails.delegate(document, 'sl-button[href]', 'click', e => {
  console.log('sl-button[href]:e.target.href', e.target.href, e.target.dataset);
});

Rails.delegate(document, '[data-remote]', 'click', e => {
  console.log('[data-remote]:e.target.href', e.target.href);
});
```
