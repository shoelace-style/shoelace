---
layout: default.html
title: Tabs
description: Add tabs to your app with the tabs component.
---

## Tabs

Tab sets can be created using the markup below. By default, Shoelace renders tabs as pills because they respond better than traditional tabs when rendered on smaller screens.

Note the class names used for the main container, the tab navs, and the tab panes. Also note that each tab links to its respective tab pane’s `id`.

To disable a tab, add `disabled` to the appropriate tab nav.

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

Tabs can be made vertical by adding custom CSS rules. Shoelace doesn’t include these styles by default because of the many ways tabs can be positioned, customized, and made responsive.

Here’s an example of vertical tabs that uses the CSS grid. The markup is exactly the same as the previous example, except the tabs container has a custom class and the following custom styles.

```css
.tabs-vertical-example {
  display: grid;
  grid-template-columns: 30% 70%;
}

.tabs-vertical-example .tabs-nav {
  padding-right: 2rem;
}

.tabs-vertical-example .tabs-nav a {
  display: block;
}
```

<div class="tabs tabs-vertical-example">
  <nav class="tabs-nav tabs-nav-block">
    <a href="#tab-1-example-2" class="active">Tab 1</a>
    <a href="#tab-2-example-2">Tab 2</a>
    <a href="#tab-3-example-2">Tab 3</a>
    <a href="#" class="disabled">Disabled</a>
  </nav>

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

### Events

Tabs require `shoelace.js` to make them interactive. You don’t need to initialize them. Simply include the script and everything “just works.”

There is no JavaScript API. Shoelace’s philosophy believes that custom components should act like native components as much as possible. You can, however, listen for various events:

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
