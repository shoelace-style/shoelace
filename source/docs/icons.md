---
layout: default.html
title: Icons
description: Shoelace doesn’t ship with icons, but you can easily add your own!
stylesheets:
 - https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css
---

## Icons

To stay light and customizable, Shoelace doesn’t bundle its own icons. However, you can easily include your favorite library such as [Font Awesome](http://fontawesome.io/). They work superbly together.

### Font Awesome

Load Font Awesome icons locally or via CDN. To use the CDN version, add the following `<link>` to the `<head>` of your website or application:

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css">
```

Then add icons as you normally would with `<i class="fa fa-*" aria-hidden="true"></i>`:

<div class="input-field text-secondary" style="font-size: 2rem;">
  <i class="fa fa-magic" role="img" aria-label="Magic icon"></i>
  <i class="fa fa-briefcase" role="img" aria-label="Briefcase icon"></i>
  <i class="fa fa-cog" role="img" aria-label="Cog icon"></i>
  <i class="fa fa-database" role="img" aria-label="Database icon"></i>
  <i class="fa fa-bug" role="img" aria-label="Bug icon"></i>
  <i class="fa fa-beer" role="img" aria-label="Beer icon"></i>
  <i class="fa fa-arrows" role="img" aria-label="Arrows icon"></i>
  <i class="fa fa-rocket" role="img" aria-label="Rocket icon"></i>
  <i class="fa fa-tag" role="img" aria-label="Tag icon"></i>
  <i class="fa fa-plane" role="img" aria-label="Plane icon"></i>
  <i class="fa fa-soccer-ball-o" role="img" aria-label="Soccer ball icon"></i>
  <i class="fa fa-warning" role="img" aria-label="Warning icon"></i>
</div>

<div class="input-field">
  <button type="button">
    <i class="fa fa-star" aria-hidden="true"></i> Star
  </button>
  <button type="button" class="button-success">
    <i class="fa fa-check" aria-hidden="true"></i> Check
  </button>
  <button type="button" class="button-warning">
    <i class="fa fa-pencil" aria-hidden="true"></i> Edit
  </button>
  <button type="button" class="button-info">
    <i class="fa fa-comment" aria-hidden="true"></i> Comment
  </button>
</div>

For your convenience, [here’s a full list of Font Awesome icons](http://fontawesome.io/icons/).

