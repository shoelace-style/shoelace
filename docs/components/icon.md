# Icon

[component-header:sl-icon]

Icons are symbols that can be used to represent various options within an application.

Shoelace comes bundled with over 1,300 icons courtesy of the [Bootstrap Icons](https://icons.getbootstrap.com/) project. These icons are part of the `default` icon library. If you prefer, you can register [custom icon libraries](#icon-libraries) as well.

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

Custom icons can be loaded individually with the `src` attribute. Only SVGs on a local or CORS-enabled endpoint are supported. If you're using more than one custom icon, it might make sense to register a [custom icon library](#icon-libraries).

```html preview
<sl-icon src="/assets/images/shoe.svg" style="font-size: 8rem;"></sl-icon>
```

## Icon Libraries

You can register additional icons to use with the `<sl-icon>` component through icon libraries. Icon files can exist locally or on a CORS-enabled endpoint (e.g. a CDN). There is no limit to how many icon libraries you can register and there is no cost associated with registering them, as individual icons are only requested when they're used.

Shoelace ships with two built-in icon libraries, `default` and `system`. The [default icon library](#customizing-the-default-library) contains all of the icons in the Bootstrap Icons project. The [system icon library](#customizing-the-system-library) contains only a small subset of icons that are used internally by Shoelace components.

To register an additional icon library, use the `registerIconLibrary()` function that's exported from `utilities/icon-library.js`. At a minimum, you must provide a name and a resolver function. The resolver function translates an icon name to a URL where the corresponding SVG file exists. Refer to the examples below to better understand how it works.

If necessary, a mutator function can be used to mutate the SVG element before rendering. This is necessary for some libraries due to the many possible ways SVGs are crafted. For example, icons should ideally inherit the current text color via `currentColor`, so you may need to apply `fill="currentColor` or `stroke="currentColor"` to the SVG element using this function.

Here's an example that registers an icon library located in the `/assets/icons` directory.

```html
<script type="module">
  import { registerIconLibrary } from '/dist/utilities/icon-library.js';

  registerIconLibrary('my-icons', {
    resolver: name => `/assets/icons/${name}.svg`,
    mutator: svg => svg.setAttribute('fill', 'currentColor')
  });
</script>
```

To display an icon, set the `library` and `name` attributes of an `<sl-icon>` element.

```html
<!-- This will show the icon located at /assets/icons/smile.svg -->
<sl-icon library="my-icons" name="smile"></sl-icon>
```

If an icon is used before registration occurs, it will be empty initially but shown when registered.

The following examples demonstrate how to register a number of popular, open source icon libraries via CDN. Feel free to adapt the code as you see fit to use your own origin or naming conventions.

### Boxicons

This will register the [Boxicons](https://boxicons.com/) library using the jsDelivr CDN. This library has three variations: regular (`bx-*`), solid (`bxs-*`), and logos (`bxl-*`). A mutator function is required to set the SVG's `fill` to `currentColor`.

Icons in this library are licensed under the [Creative Commons 4.0 License](https://github.com/atisawd/boxicons#license).

```html preview
<script type="module">
  import { registerIconLibrary } from '/dist/utilities/icon-library.js';

  registerIconLibrary('boxicons', {
    resolver: name => {
      let folder = 'regular';
      if (name.substring(0, 4) === 'bxs-') folder = 'solid';
      if (name.substring(0, 4) === 'bxl-') folder = 'logos';
      return `https://cdn.jsdelivr.net/npm/boxicons@2.0.5/svg/${folder}/${name}.svg`;
    },
    mutator:svg => svg.setAttribute('fill', 'currentColor')
  });
</script>

<div style="font-size: 24px;">
  <sl-icon library="boxicons" name="bx-bot"></sl-icon>
  <sl-icon library="boxicons" name="bx-cookie"></sl-icon>
  <sl-icon library="boxicons" name="bx-joystick"></sl-icon>
  <sl-icon library="boxicons" name="bx-save"></sl-icon>
  <sl-icon library="boxicons" name="bx-server"></sl-icon>
  <sl-icon library="boxicons" name="bx-wine"></sl-icon>
  <br>
  <sl-icon library="boxicons" name="bxs-bot"></sl-icon>
  <sl-icon library="boxicons" name="bxs-cookie"></sl-icon>
  <sl-icon library="boxicons" name="bxs-joystick"></sl-icon>
  <sl-icon library="boxicons" name="bxs-save"></sl-icon>
  <sl-icon library="boxicons" name="bxs-server"></sl-icon>
  <sl-icon library="boxicons" name="bxs-wine"></sl-icon>
  <br>
  <sl-icon library="boxicons" name="bxl-apple"></sl-icon>
  <sl-icon library="boxicons" name="bxl-chrome"></sl-icon>
  <sl-icon library="boxicons" name="bxl-edge"></sl-icon>
  <sl-icon library="boxicons" name="bxl-firefox"></sl-icon>
  <sl-icon library="boxicons" name="bxl-opera"></sl-icon>
  <sl-icon library="boxicons" name="bxl-microsoft"></sl-icon>
</div>
```

### Feather Icons

This will register the [Feather Icons](https://feathericons.com/) library using the jsDelivr CDN.

Icons in this library are licensed under the [MIT License](https://github.com/feathericons/feather/blob/master/LICENSE).

```html preview
<div style="font-size: 24px;">
  <sl-icon library="feather" name="feather"></sl-icon>
  <sl-icon library="feather" name="pie-chart"></sl-icon>
  <sl-icon library="feather" name="settings"></sl-icon>
  <sl-icon library="feather" name="map-pin"></sl-icon>
  <sl-icon library="feather" name="printer"></sl-icon>
  <sl-icon library="feather" name="shopping-cart"></sl-icon>
</div>

<script type="module">
  import { registerIconLibrary } from '/dist/utilities/icon-library.js';

  registerIconLibrary('feather', {
    resolver: name => `https://cdn.jsdelivr.net/npm/feather-icons@4.28.0/dist/icons/${name}.svg`
  });
</script>
```

### Font Awesome

This will register the [Font Awesome Free](https://fontawesome.com/) library using the jsDelivr CDN. This library has three variations: regular (`far-*`), solid (`fas-*`), and brands (`fab-*`). A mutator function is required to set the SVG's `fill` to `currentColor`.

Icons in this library are licensed under the [Font Awesome Free License](https://github.com/FortAwesome/Font-Awesome/blob/master/LICENSE.txt). Some of the icons that appear on the Font Awesome website require a license and are therefore not available in the CDN.

```html preview
<script type="module">
  import { registerIconLibrary } from '/dist/utilities/icon-library.js';

  registerIconLibrary('fa', {
    resolver: name => {
      const filename = name.replace(/^fa[rbs]-/, '');
      let folder = 'regular';
      if (name.substring(0, 4) === 'fas-') folder = 'solid';
      if (name.substring(0, 4) === 'fab-') folder = 'brands';
      return `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.1/svgs/${folder}/${filename}.svg`;
    },
    mutator: svg => svg.setAttribute('fill', 'currentColor')
  });
</script>

<div style="font-size: 24px;">
  <sl-icon library="fa" name="far-bell"></sl-icon>
  <sl-icon library="fa" name="far-comment"></sl-icon>
  <sl-icon library="fa" name="far-hand-point-right"></sl-icon>
  <sl-icon library="fa" name="far-hdd"></sl-icon>
  <sl-icon library="fa" name="far-heart"></sl-icon>
  <sl-icon library="fa" name="far-star"></sl-icon>
  <br>
  <sl-icon library="fa" name="fas-archive"></sl-icon>
  <sl-icon library="fa" name="fas-book"></sl-icon>
  <sl-icon library="fa" name="fas-chess-knight"></sl-icon>
  <sl-icon library="fa" name="fas-dice"></sl-icon>
  <sl-icon library="fa" name="fas-pizza-slice"></sl-icon>
  <sl-icon library="fa" name="fas-scroll"></sl-icon>
  <br>
  <sl-icon library="fa" name="fab-apple"></sl-icon>
  <sl-icon library="fa" name="fab-chrome"></sl-icon>
  <sl-icon library="fa" name="fab-edge"></sl-icon>
  <sl-icon library="fa" name="fab-firefox"></sl-icon>
  <sl-icon library="fa" name="fab-opera"></sl-icon>
  <sl-icon library="fa" name="fab-microsoft"></sl-icon>    
</div>
```

### Heroicons

This will register the [Heroicons](https://heroicons.com/) library using the jsDelivr CDN.

Icons in this library are licensed under the [MIT License](https://github.com/tailwindlabs/heroicons/blob/master/LICENSE).

```html preview
<script type="module">
  import { registerIconLibrary } from '/dist/utilities/icon-library.js';

  registerIconLibrary('heroicons', {
    resolver: name => `https://cdn.jsdelivr.net/npm/heroicons@0.4.2/outline/${name}.svg`
  });
</script>

<div style="font-size: 24px;">
  <sl-icon library="heroicons" name="chat"></sl-icon>
  <sl-icon library="heroicons" name="cloud"></sl-icon>
  <sl-icon library="heroicons" name="cog"></sl-icon>
  <sl-icon library="heroicons" name="document-text"></sl-icon>
  <sl-icon library="heroicons" name="gift"></sl-icon>
  <sl-icon library="heroicons" name="volume-up"></sl-icon>
</div>
```

### Iconoir

This will register the [Iconoir](https://iconoir.com/) library using the jsDelivr CDN.

Icons in this library are licensed under the [MIT License](https://github.com/lucaburgio/iconoir/blob/master/LICENSE).

```html preview
<script type="module">
  import { registerIconLibrary } from '/dist/utilities/icon-library.js';

  registerIconLibrary('iconoir', {
    resolver: name => `https://cdn.jsdelivr.net/gh/lucaburgio/iconoir@latest/icons/${name}.svg`
  });
</script>

<div style="font-size: 24px;">
  <sl-icon library="iconoir" name="check-circled-outline"></sl-icon>
  <sl-icon library="iconoir" name="drawer"></sl-icon>
  <sl-icon library="iconoir" name="keyframes"></sl-icon>
  <sl-icon library="iconoir" name="headset-help"></sl-icon>
  <sl-icon library="iconoir" name="color-picker"></sl-icon>
  <sl-icon library="iconoir" name="wifi"></sl-icon>
</div>
```

### Ionicons

This will register the [Ionicons](https://ionicons.com/) library using the jsDelivr CDN. This library has three variations: outline (default), filled (`*-filled`), and sharp (`*-sharp`). A mutator function is required to polyfill a handful of styles we're not including.

Icons in this library are licensed under the [MIT License](https://github.com/ionic-team/ionicons/blob/master/LICENSE).

```html preview
<script type="module">
  import { registerIconLibrary } from '/dist/utilities/icon-library.js';

  registerIconLibrary('ionicons', {
    resolver: name => `https://cdn.jsdelivr.net/npm/ionicons@5.1.2/dist/ionicons/svg/${name}.svg`,
    mutator: svg => {
      svg.setAttribute('fill', 'currentColor');
      svg.setAttribute('stroke', 'currentColor');
      [...svg.querySelectorAll('.ionicon-fill-none')].map(el => el.setAttribute('fill', 'none'));
      [...svg.querySelectorAll('.ionicon-stroke-width')].map(el => el.setAttribute('stroke-width', '32px'));
    }
  });
</script>

<div style="font-size: 24px;">
  <sl-icon library="ionicons" name="alarm"></sl-icon>
  <sl-icon library="ionicons" name="american-football"></sl-icon>
  <sl-icon library="ionicons" name="bug"></sl-icon>
  <sl-icon library="ionicons" name="chatbubble"></sl-icon>
  <sl-icon library="ionicons" name="settings"></sl-icon>
  <sl-icon library="ionicons" name="warning"></sl-icon>
  <br>
  <sl-icon library="ionicons" name="alarm-outline"></sl-icon>
  <sl-icon library="ionicons" name="american-football-outline"></sl-icon>
  <sl-icon library="ionicons" name="bug-outline"></sl-icon>
  <sl-icon library="ionicons" name="chatbubble-outline"></sl-icon>
  <sl-icon library="ionicons" name="settings-outline"></sl-icon>
  <sl-icon library="ionicons" name="warning-outline"></sl-icon>
  <br>
  <sl-icon library="ionicons" name="alarm-sharp"></sl-icon>
  <sl-icon library="ionicons" name="american-football-sharp"></sl-icon>
  <sl-icon library="ionicons" name="bug-sharp"></sl-icon>
  <sl-icon library="ionicons" name="chatbubble-sharp"></sl-icon>
  <sl-icon library="ionicons" name="settings-sharp"></sl-icon>
  <sl-icon library="ionicons" name="warning-sharp"></sl-icon>
</div>
```

### Jam Icons

This will register the [Jam Icons](https://jam-icons.com/) library using the jsDelivr CDN. This library has two variations: regular (default) and filled (`*-f`). A mutator function is required to set the SVG's `fill` to `currentColor`.

Icons in this library are licensed under the [MIT License](https://github.com/michaelampr/jam/blob/master/LICENSE).

```html preview
<script type="module">
  import { registerIconLibrary } from '/dist/utilities/icon-library.js';

  registerIconLibrary('jam', {
    resolver: name => `https://cdn.jsdelivr.net/npm/jam-icons@2.0.0/svg/${name}.svg`,
    mutator: svg => svg.setAttribute('fill', 'currentColor')
  });
</script>

<div style="font-size: 24px;">
  <sl-icon library="jam" name="calendar"></sl-icon>
  <sl-icon library="jam" name="camera"></sl-icon>
  <sl-icon library="jam" name="filter"></sl-icon>
  <sl-icon library="jam" name="leaf"></sl-icon>
  <sl-icon library="jam" name="picture"></sl-icon>
  <sl-icon library="jam" name="set-square"></sl-icon>
  <br>
  <sl-icon library="jam" name="calendar-f"></sl-icon>
  <sl-icon library="jam" name="camera-f"></sl-icon>
  <sl-icon library="jam" name="filter-f"></sl-icon>
  <sl-icon library="jam" name="leaf-f"></sl-icon>
  <sl-icon library="jam" name="picture-f"></sl-icon>
  <sl-icon library="jam" name="set-square-f"></sl-icon>
</div>
```

### Material Icons

This will register the [Material Icons](https://material.io/resources/icons/?style=baseline) library using the jsDelivr CDN. This library has three variations: outline (default), round (`*_round`), and sharp (`*_sharp`). A mutator function is required to set the SVG's `fill` to `currentColor`.

Icons in this library are licensed under the [Apache 2.0 License](https://github.com/google/material-design-icons/blob/master/LICENSE).

```html preview
<script type="module">
  import { registerIconLibrary } from '/dist/utilities/icon-library.js';

  registerIconLibrary('material', {
    resolver: name => {
      const match = name.match(/^(.*?)(_(round|sharp))?$/);
      return `https://cdn.jsdelivr.net/npm/@material-icons/svg@1.0.5/svg/${match[1]}/${match[3] || 'outline'}.svg`;
    },
    mutator: svg => svg.setAttribute('fill', 'currentColor')
  });
</script>

<div style="font-size: 24px;">
  <sl-icon library="material" name="notifications"></sl-icon>
  <sl-icon library="material" name="email"></sl-icon>
  <sl-icon library="material" name="delete"></sl-icon>
  <sl-icon library="material" name="volume_up"></sl-icon>
  <sl-icon library="material" name="settings"></sl-icon>
  <sl-icon library="material" name="shopping_basket"></sl-icon>
  <br>
  <sl-icon library="material" name="notifications_round"></sl-icon>
  <sl-icon library="material" name="email_round"></sl-icon>
  <sl-icon library="material" name="delete_round"></sl-icon>
  <sl-icon library="material" name="volume_up_round"></sl-icon>
  <sl-icon library="material" name="settings_round"></sl-icon>
  <sl-icon library="material" name="shopping_basket_round"></sl-icon>
  <br>
  <sl-icon library="material" name="notifications_sharp"></sl-icon>
  <sl-icon library="material" name="email_sharp"></sl-icon>
  <sl-icon library="material" name="delete_sharp"></sl-icon>
  <sl-icon library="material" name="volume_up_sharp"></sl-icon>
  <sl-icon library="material" name="settings_sharp"></sl-icon>
  <sl-icon library="material" name="shopping_basket_sharp"></sl-icon>
</div>
```

### Remix Icon

This will register the [Remix Icon](https://remixicon.com/) library using the jsDelivr CDN. This library has two variations: line (default) and fill (`*-fill`). It also groups icons by categories, so the name must include the category and icon separated by a slash. A mutator function is required to set the SVG's `fill` to `currentColor`.

Icons in this library are licensed under the [Apache 2.0 License](https://github.com/Remix-Design/RemixIcon/blob/master/License).

```html preview
<script type="module">
  import { registerIconLibrary } from '/dist/utilities/icon-library.js';

  registerIconLibrary('remixicon', {
    resolver: name => {
      const match = name.match(/^(.*?)\/(.*?)(-(fill))?$/);
      match[1] = match[1].charAt(0).toUpperCase() + match[1].slice(1);
      return `https://cdn.jsdelivr.net/npm/remixicon@2.5.0/icons/${match[1]}/${match[2]}${match[3] || '-line'}.svg`;
    },
    mutator: svg => svg.setAttribute('fill', 'currentColor')
  });
</script>

<div style="font-size: 24px;">
  <sl-icon library="remixicon" name="business/cloud"></sl-icon>
  <sl-icon library="remixicon" name="design/brush"></sl-icon>
  <sl-icon library="remixicon" name="business/pie-chart"></sl-icon>
  <sl-icon library="remixicon" name="development/bug"></sl-icon>
  <sl-icon library="remixicon" name="media/image"></sl-icon>
  <sl-icon library="remixicon" name="system/alert"></sl-icon>
  <br>
  <sl-icon library="remixicon" name="business/cloud-fill"></sl-icon>
  <sl-icon library="remixicon" name="design/brush-fill"></sl-icon>
  <sl-icon library="remixicon" name="business/pie-chart-fill"></sl-icon>
  <sl-icon library="remixicon" name="development/bug-fill"></sl-icon>
  <sl-icon library="remixicon" name="media/image-fill"></sl-icon>
  <sl-icon library="remixicon" name="system/alert-fill"></sl-icon>  
</div>
```

### Unicons

This will register the [Unicons](https://iconscout.com/unicons) library using the jsDelivr CDN. This library has two variations: line (default) and solid (`*-s`). A mutator function is required to set the SVG's `fill` to `currentColor`.

Icons in this library are licensed under the [Apache 2.0 License](https://github.com/Iconscout/unicons/blob/master/LICENSE). Some of the icons that appear on the Unicons website, particularly many of the solid variations, require a license and are therefore not available in the CDN.

```html preview
<script type="module">
  import { registerIconLibrary } from '/dist/utilities/icon-library.js';

  registerIconLibrary('unicons', {
    resolver: name => {
      const match = name.match(/^(.*?)(-s)?$/);
      return `https://cdn.jsdelivr.net/npm/@iconscout/unicons@3.0.3/svg/${match[2] === '-s' ? 'solid' : 'line'}/${match[1]}.svg`;
    },
    mutator: svg => svg.setAttribute('fill', 'currentColor')
  });
</script>

<div style="font-size: 24px;">
  <sl-icon library="unicons" name="clock"></sl-icon>
  <sl-icon library="unicons" name="graph-bar"></sl-icon>
  <sl-icon library="unicons" name="padlock"></sl-icon>
  <sl-icon library="unicons" name="polygon"></sl-icon>
  <sl-icon library="unicons" name="rocket"></sl-icon>
  <sl-icon library="unicons" name="star"></sl-icon>
  <br>
  <sl-icon library="unicons" name="clock-s"></sl-icon>
  <sl-icon library="unicons" name="graph-bar-s"></sl-icon>
  <sl-icon library="unicons" name="padlock-s"></sl-icon>
  <sl-icon library="unicons" name="polygon-s"></sl-icon>
  <sl-icon library="unicons" name="rocket-s"></sl-icon>  
  <sl-icon library="unicons" name="star-s"></sl-icon>
</div>
```

### Customizing the Default Library

The default icon library contains over 1,300 icons courtesy of the [Bootstrap Icons](https://icons.getbootstrap.com/) project. These are the icons that display when you use `<sl-icon>` without the `library` attribute. If you prefer to have these icons resolve elsewhere or to a different icon library, register an icon library using the `default` name and a custom resolver.

This example will load the same set of icons from the jsDelivr CDN instead of your local assets folder.

```html
<script type="module">
  import { registerIconLibrary } from '/dist/utilities/icon-library.js';

  registerIconLibrary('default', {
    resolver: name => `https://cdn.jsdelivr.net/npm/bootstrap-icons@1.0.0/icons/${name}.svg`
  });
</script>
```

### Customizing the System Library

The system library contains only the icons used internally by Shoelace components. Unlike the default icon library, the system library does not rely on physical assets. Instead, its icons are hard-coded as data URIs into the resolver to ensure their availability.

If you want to change the icons Shoelace uses internally, you can register an icon library using the `system` name and a custom resolver. If you choose to do this, it's your responsibility to provide all of the icons that are required by components. You can reference `src/components/library.system.ts` for a complete list of system icons used by Shoelace.

```html
<script type="module">
  import { registerIconLibrary } from '/dist/utilities/icon-library.js';

  registerIconLibrary('system', {
    resolver: name => `/path/to/custom/icons/${name}.svg`
  });
</script>
```

<!-- Supporting scripts and styles for the search utility -->
<script>
  fetch('/dist/assets/icons/icons.json')
    .then(res => res.json())  
    .then(icons => {
      const container = document.querySelector('.icon-search');
      const input = container.querySelector('sl-input');
      const select = container.querySelector('sl-select');
      const copyInput = container.querySelector('.icon-copy-input');
      const loader = container.querySelector('.icon-loader');
      const list = container.querySelector('.icon-list');
      const queue = [];
      let inputTimeout;

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
      input.addEventListener('sl-input', () => {
        clearTimeout(inputTimeout);
        inputTimeout = setTimeout(() => {
          [...list.querySelectorAll('.icon-list-item')].map(item => {
            const filter = input.value.toLowerCase();
            if (filter === '') {
              item.hidden = false;
            } else {
              const terms = item.getAttribute('data-terms').toLowerCase();
              item.hidden = terms.indexOf(filter) < 0;
            }
          });
        }, 250);
      });

      // Sort by type and remember preference
      const iconType = localStorage.getItem('sl-icon:type') || 'outline';
      select.value = iconType;
      list.setAttribute('data-type', select.value);
      select.addEventListener('sl-change', () => {
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

  .icon-search [hidden] {
    display: none;
  }

  .icon-search-controls {
    display: flex;
  }

  .icon-search-controls sl-input {
    flex: 1 1 auto;
  }

  .icon-search-controls sl-select {
    width: 10rem;
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
    background-color: var(--sl-color-primary-50);
    color: var(--sl-color-primary-500);
  }

  .sl-theme-dark .icon-list-item:hover {
    background-color: var(--sl-color-primary-900);
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
    .icon-list {
      grid-template-columns: repeat(8, 1fr);
    }

    .icon-list-item {
      font-size: 20px;
    }

    .icon-search-controls {
      display: block;
    }

    .icon-search-controls sl-select {
      width: auto;
      margin: 1rem 0 0 0;
    }
  }

  @media screen and (max-width: 500px) {
    .icon-list {
      grid-template-columns: repeat(4, 1fr);
    }    
  }
</style>

[component-metadata:sl-icon]
