---
layout: default.html
title: Tabs
description: Add tabs to your app with the tabs component.
---

## Tabs

Tab sets can be created using the markup below. By default, Shoelace renders tabs as pills because they respond better than traditional tabs when rendered on smaller screens.

Note the class names used for the main container, the tabs, and the tab panes. Also note that each tab links to its respective tab pane’s `id`.

For initial rendering, make sure the appropriate tab and tab pane have the `active` class.

```html
<div class="tabs">
  <nav class="tabs-nav">
    <a href="#tab-1" class="active">Tab 1</a>
    <a href="#tab-2">Tab 2</a>
    <a href="#tab-3">Tab 3</a>
    <a href="#" class="disabled">Disabled</a>
  </nav>

  <div class="tabs-pane active" id="tab-1">
    ...
  </div>

  <div class="tabs-pane" id="tab-2">
    ...
  </div>

  <div class="tabs-pane" id="tab-3">
    ...
  </div>
</div>
```

<div class="tabs">
  <nav class="tabs-nav">
    <a href="#tab-1-example-1" class="active">Tab 1</a>
    <a href="#tab-2-example-1">Tab 2</a>
    <a href="#tab-3-example-1">Tab 3</a>
    <a href="#" class="disabled">Disabled</a>
  </nav>

  <div class="tabs-pane active" id="tab-1-example-1">
    <h3>Tab 1</h3>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui repellat ea magni magnam
      assumenda voluptas accusantium nemo. Iusto beatae illum mollitia aut quasi odit facilis
      officiis, laudantium debitis! Excepturi, quis!
    </p>
  </div>

  <div class="tabs-pane" id="tab-2-example-1">
    <h3>Tab 2</h3>
    <p>
      Atque eius voluptatibus ipsa ex totam odit, quidem illo distinctio sit! Quod quae minus,
      aut itaque. Mollitia, dolore! Facere molestiae necessitatibus sint recusandae incidunt
      pariatur labore iste vel, velit odit.
    </p>
  </div>

  <div class="tabs-pane" id="tab-3-example-1">
    <h3>Tab 3</h3>
    <p>
      Aperiam asperiores optio iusto qui nisi, perspiciatis, ipsum, tenetur explicabo earum et
      laboriosam odit magni maxime quos molestias aspernatur laudantium harum placeat tempora
      quae necessitatibus, aut dignissimos totam non! Quod.
    </p>
  </div>
</div>

### Vertical Tabs

Tabs can be made vertical when used with the [grid system](grid-system.html) and `tabs-nav-block`.

```html
<div class="tabs">
  <div class="row">
    <div class="col-4">
      <nav class="tabs-nav tabs-nav-block">
        <a href="#tab-1-example-2" class="active">Tab 1</a>
        <a href="#tab-2-example-2">Tab 2</a>
        <a href="#tab-3-example-2">Tab 3</a>
        <a href="#" class="disabled">Disabled</a>
      </nav>
    </div>

    <div class="col-8">
      <div class="tabs-pane active" id="tab-1-example-2">...</div>
      <div class="tabs-pane" id="tab-2-example-2">...</div>
      <div class="tabs-pane" id="tab-3-example-2">...</div>
    </div>
  </div>
</div>
```

<div class="tabs">
  <div class="row">
    <div class="col-4">
      <nav class="tabs-nav tabs-nav-block">
        <a href="#tab-1-example-2" class="active">Tab 1</a>
        <a href="#tab-2-example-2">Tab 2</a>
        <a href="#tab-3-example-2">Tab 3</a>
        <a href="#" class="disabled">Disabled</a>
      </nav>
    </div>
    <div class="col-8">
      <div class="tabs-pane active" id="tab-1-example-2">
        <h3>Tab 1</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui repellat ea magni magnam
          assumenda voluptas accusantium nemo. Iusto beatae illum mollitia aut quasi odit facilis
          officiis, laudantium debitis! Excepturi, quis!
        </p>
      </div>
      <div class="tabs-pane" id="tab-2-example-2">
        <h3>Tab 2</h3>
        <p>
          Atque eius voluptatibus ipsa ex totam odit, quidem illo distinctio sit! Quod quae minus,
          aut itaque. Mollitia, dolore! Facere molestiae necessitatibus sint recusandae incidunt
          pariatur labore iste vel, velit odit.
        </p>
      </div>
      <div class="tabs-pane" id="tab-3-example-2">
        <h3>Tab 3</h3>
        <p>
          Aperiam asperiores optio iusto qui nisi, perspiciatis, ipsum, tenetur explicabo earum et
          laboriosam odit magni maxime quos molestias aspernatur laudantium harum placeat tempora
          quae necessitatibus, aut dignissimos totam non! Quod.
        </p>
      </div>
    </div>
  </div>
</div>

### Interactivity

Tabs require `shoelace.js` for interactivity. You don’t need to initialize anything. Just include the script and everything “just works.”

There is no JavaScript API. Shoelace’s philosophy believes that custom components should act like native components as much as possible. You can, however, listen for various events.

- `show` – Fires when a tab is shown. The second callback argument is a reference to the respective tab pane.
- `hide` – Fires when a tab is hidden. The second callback argument is a reference to the respective tab pane.

This example will log both events for the tab set with an id of `my-tabs`.

```javascript
$('#my-tabs')
  .on('show', function(event, tabPane) {
    console.log('show', event.target, tabPane);
  })
  .on('hide', function(event, tabPane) {
    console.log('hide', event.target, tabPane);
  });
```

To activate a tab programmatically, just add the `active` class to it. We use a [mutation observer](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) to remove the active class on other tabs and to show/hide the appropriate tab panes automatically.

```javascript
$('#tab-id').addClass('active');
```

To disable a tab, add the `disabled` class to the appropriate tab.
