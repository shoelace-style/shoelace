# Icon

[component-header:sl-icon]

Icons are symbols that can be used to represent various options within an application.

Shoelace comes bundled with over 1,100 icons courtesy of the [Bootstrap Icons](https://icons.getbootstrap.com/) project. If you prefer, you can also [register custom libraries](#registering-custom-libraries).

Click or tap on an icon below to copy its name and use it like this.

```html
<sl-icon name="icon-name-here"></sl-icon>
```

<div class="icon-search">
  <div class="icon-search-controls">
    <sl-input placeholder="Search Icons" clearable>
      <sl-icon slot="prefix" name="search"></sl-icon>
    </sl-input>
    <sl-select value="outline">
      <sl-menu-item value="outline">Outlined</sl-menu-item>
      <sl-menu-item value="fill">Filled</sl-menu-item>
      <sl-menu-item value="all">All icons</sl-menu-item>
    </sl-select>
  </div>
  <div class="icon-list"></div>
  <input type="text" class="icon-copy-input">
</div>

## Examples

### Sizing

Icons are sized relative to the current font size. To change their size, set the `font-size` property on the icon itself or on a parent element as shown below.

```html preview
<div style="font-size: 32px;">
  <sl-icon name="exclamation-triangle"></sl-icon>
  <sl-icon name="archive"></sl-icon>
  <sl-icon name="battery-charging"></sl-icon>
  <sl-icon name="bell"></sl-icon>
  <sl-icon name="clock"></sl-icon>
  <sl-icon name="download"></sl-icon>
  <sl-icon name="file-earmark"></sl-icon>
  <sl-icon name="flag"></sl-icon>
  <sl-icon name="heart"></sl-icon>
  <sl-icon name="image"></sl-icon>
  <sl-icon name="lightning"></sl-icon>
  <sl-icon name="mic"></sl-icon>
  <sl-icon name="search"></sl-icon>
  <sl-icon name="star"></sl-icon>
  <sl-icon name="trash"></sl-icon>
  <sl-icon name="x-circle"></sl-icon>
</div>
```

### Custom Icons

Custom icons can be loaded individually with the `src` attribute. Only SVG icons are supported.

```html preview
<sl-icon src="/assets/images/shoe.svg" style="font-size: 8rem;"></sl-icon>
```

## Registering Custom Libraries

You can register custom SVG icon libraries with the `registerIconLibrary()` utility. The import syntax will vary depending on how you're consuming Shoelace.

If you're using the CDN, the import will look like this:

```html
<!-- The script type must be "module" -->
<script type="module">
  import { registerIconLibrary } from 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@%VERSION%';
</script>
```

If you're using a bundler such as webpack or Rollup, the import will look like this:

```js
import { registerIconLibrary } from '@shoelace-style/shoelace';
```

Icon libraries can be present locally or on a CORS-enabled CDN. There is no limit to how many libraries you can register and there is no cost associated with registering them, as individual icons are requested only when they're used.

The `registerIconLibrary()` method accepts three arguments: the name of the library, a function that resolves an icon name to a URL, and an optional function that can be used to mutate the SVG element.

Once registered, icons can be displayed using the `library` and `name` attributes.

```html
<script type="module">
  import { registerIconLibrary } from 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@%VERSION%';

  registerIconLibrary('my-icons', name => `/public/icons/${name}.svg`);
</script>

<!-- Shows the icon located at /public/icons/smile.svg -->
<sl-icon library="my-icons" name="smile"></sl-icon>
```

For your convenience, registration functions for a handful of open source icon libraries are demonstrated below.

### Feather Icons

This example registers the [Feather Icons](https://feathericons.com/) library. The registration function maps the name of the icon to its location on the CDN.

```html preview
<script type="module">
  // See above for the correct import to use in your application
  import { registerIconLibrary } from '/dist/shoelace/index.esm.js';

  registerIconLibrary('feather', name => `https://cdn.jsdelivr.net/npm/feather-icons@4.28.0/dist/icons/${name}.svg`); 
</script>

<div class="icon-custom-feather" style="font-size: 24px;">
  <sl-icon library="feather" name="feather"></sl-icon>
  <sl-icon library="feather" name="briefcase"></sl-icon>
  <sl-icon library="feather" name="pie-chart"></sl-icon>
  <sl-icon library="feather" name="cloud"></sl-icon>
  <sl-icon library="feather" name="settings"></sl-icon>
  <sl-icon library="feather" name="smile"></sl-icon>
  <sl-icon library="feather" name="map-pin"></sl-icon>
  <sl-icon library="feather" name="printer"></sl-icon>
  <sl-icon library="feather" name="search"></sl-icon>
  <sl-icon library="feather" name="shopping-cart"></sl-icon>
</div>
```

### Heroicons

This example registers the [Heroicons](https://heroicons.com/) library. The registration function maps the name of the icon to its location on the CDN.

```html preview
<script type="module">
  // See above for the correct import to use in your application
  import { registerIconLibrary } from '/dist/shoelace/index.esm.js';

  registerIconLibrary('heroicons', name => `https://cdn.jsdelivr.net/npm/heroicons@0.4.2/outline/${name}.svg`); 
</script>

<div class="icon-custom-heroicons" style="font-size: 24px;">
  <sl-icon library="heroicons" name="archive"></sl-icon>
  <sl-icon library="heroicons" name="badge-check"></sl-icon>
  <sl-icon library="heroicons" name="chat"></sl-icon>
  <sl-icon library="heroicons" name="cloud"></sl-icon>
  <sl-icon library="heroicons" name="cog"></sl-icon>
  <sl-icon library="heroicons" name="document-text"></sl-icon>
  <sl-icon library="heroicons" name="exclamation"></sl-icon>
  <sl-icon library="heroicons" name="gift"></sl-icon>
  <sl-icon library="heroicons" name="puzzle"></sl-icon>
  <sl-icon library="heroicons" name="volume-up"></sl-icon>
</div>
```


### Ionicons

This example registers the [Ionicons](https://ionicons.com/) library. The registration function maps the name of the icon to its location on the CDN. This library also requires some SVG mutations due to the way it uses a stylesheet that we're not importing.

```html preview
<script type="module">
  // See above for the correct import to use in your application
  import { registerIconLibrary } from '/dist/shoelace/index.esm.js';

  registerIconLibrary(
    'ionicons', 
    name => `https://cdn.jsdelivr.net/npm/ionicons@5.1.2/dist/ionicons/svg/${name}.svg`, 
    svg => {
      svg.setAttribute('fill', 'currentColor');
      svg.setAttribute('stroke', 'currentColor');
      [...svg.querySelectorAll('.ionicon-fill-none')].map(el => el.setAttribute('fill', 'none'));
      [...svg.querySelectorAll('.ionicon-stroke-width')].map(el => el.setAttribute('stroke-width', '32px'));
    }
  );  
</script>

<div class="icon-custom-ionicons" style="font-size: 24px;">
  <sl-icon library="ionicons" name="alarm-outline"></sl-icon>
  <sl-icon library="ionicons" name="american-football-outline"></sl-icon>
  <sl-icon library="ionicons" name="attach-outline"></sl-icon>
  <sl-icon library="ionicons" name="bug-outline"></sl-icon>
  <sl-icon library="ionicons" name="chatbubble-outline"></sl-icon>
  <sl-icon library="ionicons" name="flask-outline"></sl-icon>
  <sl-icon library="ionicons" name="key-outline"></sl-icon>
  <sl-icon library="ionicons" name="settings-outline"></sl-icon>
  <sl-icon library="ionicons" name="warning-outline"></sl-icon>
  <sl-icon library="ionicons" name="wine-outline"></sl-icon>
</div>
```

### Unicons

This example registers the [Unicons](https://iconscout.com/unicons) library. The registration function maps the name of the icon to its location on the CDN. This library also requires an SVG mutation to set the `fill` to `currentColor`.

```html preview
<script type="module">
  // See above for the correct import to use in your application
  import { registerIconLibrary } from '/dist/shoelace/index.esm.js';

  registerIconLibrary(
    'unicons', 
    name => `https://cdn.jsdelivr.net/npm/@iconscout/unicons@3.0.3/svg/line/${name}.svg`, 
    svg => svg.setAttribute('fill', 'currentColor')
  );
</script>

<div class="icon-custom-unicons" style="font-size: 24px;">
  <sl-icon library="unicons" name="bag"></sl-icon>
  <sl-icon library="unicons" name="book-alt"></sl-icon>
  <sl-icon library="unicons" name="clipboard"></sl-icon>
  <sl-icon library="unicons" name="smile"></sl-icon>
  <sl-icon library="unicons" name="envelope"></sl-icon>
  <sl-icon library="unicons" name="eye"></sl-icon>
  <sl-icon library="unicons" name="folder"></sl-icon>
  <sl-icon library="unicons" name="heart"></sl-icon>
  <sl-icon library="unicons" name="padlock"></sl-icon>
  <sl-icon library="unicons" name="rocket"></sl-icon>
</div>
```

<!-- Supporting scripts and styles for the search utility -->
<script>
  fetch('/dist/shoelace/icons/icons.json')
    .then(res => res.json())  
    .then(icons => {
      const container = document.querySelector('.icon-search');
      const input = container.querySelector('sl-input');
      const select = container.querySelector('sl-select');
      const copyInput = container.querySelector('.icon-copy-input');
      const loader = container.querySelector('.icon-loader');
      const list = container.querySelector('.icon-list');
      const queue = [];

      // Generate icons
      icons.map(i => {
        const item = document.createElement('div');
        item.classList.add('icon-list-item');
        item.setAttribute('data-name', i.name);
        item.setAttribute('data-terms', [i.name, i.title, ...(i.tags || []), ...(i.categories || [])].join(' '));
        item.innerHTML = `
          <svg width="1em" height="1em">
            <use xlink:href="/assets/icons/sprite.svg#${i.name}"></use>
          </svg>      
        `;

        const tooltip = document.createElement('sl-tooltip');
        tooltip.content = i.name;
        
        tooltip.appendChild(item);
        list.appendChild(tooltip);

        item.addEventListener('click', () => {
          copyInput.value = i.name;
          copyInput.select();
          document.execCommand('copy');
          tooltip.content = 'Copied!';
          setTimeout(() => tooltip.content = i.name, 1000);
        });
      });

      // Filter as the user types
      input.addEventListener('slInput', () => {
        [...list.querySelectorAll('.icon-list-item')].map(item => {
          const filter = input.value.toLowerCase();
          if (filter === '') {
            item.hidden = false;
          } else {
            const terms = item.getAttribute('data-terms').toLowerCase();
            item.hidden = terms.indexOf(filter) < 0;
          }
        });
      });

      // Sort by type and remember preference
      const iconType = localStorage.getItem('sl-icon:type') || 'outline';
      select.value = iconType;
      list.setAttribute('data-type', select.value);
      select.addEventListener('slChange', () => {
        list.setAttribute('data-type', select.value);
        localStorage.setItem('sl-icon:type', select.value);
      });
    });
</script>

<style>
  .icon-search {
    border: solid 1px var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    padding: var(--sl-spacing-medium);
  }

  .icon-search-controls {
    display: flex;
  }

  .icon-search-controls sl-input {
    flex: 1 1 auto;
  }

  .icon-search-controls sl-select {
    flex: 0 0 auto;
    margin-left: 1rem;
  }

  .icon-loader {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 30vh;
  }

  .icon-list {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    position: relative;
    margin-top: 1rem;
  }

  .icon-loader[hidden],
  .icon-list[hidden] {
    display: none;
  }

  .icon-list-item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--sl-border-radius-circle);
    font-size: 24px;
    width: 2em;
    height: 2em;
    margin: 0 auto;
    cursor: copy;
    transition: var(--sl-transition-medium) all;
  }

  .icon-list-item:hover {
    background-color: var(--sl-color-primary-95);
    color: var(--sl-color-primary-50);
  }

  .sl-theme-dark .icon-list-item:hover {
    background-color: var(--sl-color-primary-15);
  }

  .icon-list[data-type="outline"] .icon-list-item[data-name$="-fill"] {
    display: none;
  }

  .icon-list[data-type="fill"] .icon-list-item:not([data-name$="-fill"]) {
    display: none;
  }

  .icon-copy-input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  @media screen and (max-width: 1000px) {
    .icon-search-controls {
      display: block;
    }

    .icon-search-controls sl-select {
      margin-left: 0;
      margin-top: 1rem;
    }

    .icon-list {
      grid-template-columns: repeat(8, 1fr);
    }

    .icon-list-item {
      font-size: 20px;
    }    
  }

  @media screen and (max-width: 500px) {
    .icon-list {
      grid-template-columns: repeat(4, 1fr);
    }    
  }
</style>

[component-metadata:sl-icon]
