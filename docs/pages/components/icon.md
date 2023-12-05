---
meta:
  title: Icon
  description: Icons are symbols that can be used to represent various options within an application.
layout: component
---

## Icon Sets

<!-- Teamshare's version of Shoelace comes bundled with 292 icons courtesy of [Heroicons](https://heroicons.com/). These icons are part of the `default` icon library. If you prefer, you can register [custom icon libraries](#icon-libraries) as well.

:::tip
Depending on how you're loading Shoelace, you may need to copy icon assets and/or [set the base path](/getting-started/installation/#setting-the-base-path) so Shoelace knows where to load them from. Otherwise, icons may not appear and you'll see 404 Not Found errors in the dev console.
::: -->

### Font Awesome

Our official Design System icon set is Font Awesome. Use Font Awesome icons in Shoelace by setting the `sl-icon`'s `library` attribute to `fa` and passing the icon's name to the `name` attribute.

This will display `Regular` style icons by default:

```html
sl-icon library="fa" name="user"
```

To display icons in one of the other Font Awesome styles (`solid`, `light`, `thin`, `duotone`, `brands`), add one of the following prefixes to the icon name:

- To display a `solid` icon -> add the `fas-` prefix
- To display a `light` icon -> add the `fal-` prefix
- To display a `thin` icon -> add the `fat-` prefix
- To display a `duotone` icon -> add the `fad-` prefix
- To display a `brand` icon (for social media icons, etc.) -> add the `fab-` prefix

Note that some icons only exist in one style.

```html:preview
<div style="font-size: 20px;">
  <p>Font Awesome icons</p>
  <ul>
    <li>Regular: <sl-icon library="fa" name="duck"></sl-icon></li>
    <li>Solid: <sl-icon library="fa" name="fas-duck"></sl-icon></li>
    <li>Light: <sl-icon library="fa" name="fal-duck"></sl-icon></li>
    <li>Thin: <sl-icon library="fa" name="fat-duck"></sl-icon></li>
    <li>Duotone: <sl-icon library="fa" name="fad-duck"></sl-icon></li>
    <li>Brands: <sl-icon library="fa" name="fab-apple"></sl-icon></li>
  </ul>
</div>
```

```pug:slim
div style="font-size: 20px;"
  p Font Awesome icons
  ul
    li Regular: sl-icon library="fa" name="duck"
    li Solid: sl-icon library="fa" name="fas-duck"
    li Light: sl-icon library="fa" name="fal-duck"
    li Thin: sl-icon library="fa" name="fat-duck"
    li Duotone: sl-icon library="fa" name="fad-duck"
    li Brands: sl-icon library="fa" name="fab-apple"
```

```jsx:react
import { SlIcon } from '@teamshares/shoelace/dist/react';

function FontAwesomeIcons() {
  const iconStyle = { fontSize: '20px' };

  return (
    <div style={iconStyle}>
      <p>Font Awesome icons</p>
      <ul>
        <li>Regular: <SlIcon library="fa" name="duck" /></li>
        <li>Solid: <SlIcon library="fa" name="fas-duck" /></li>
        <li>Light: <SlIcon library="fa" name="fal-duck" /></li>
        <li>Thin: <SlIcon library="fa" name="fat-duck" /></li>
        <li>Duotone: <SlIcon library="fa" name="fad-duck" /></li>
        <li>Brands: <SlIcon library="fa" name="fab-apple" /></li>
      </ul>
    </div>
  );
}
```

:::tip
**Not sure what the icon you want is called?** Search the Font Awesome site using the input below (will open a new tab):

<div class="fa-search">
  <sl-input class="fa-icon-search-input" placeholder="Search Font Awesome Icons" clearable>
    <sl-icon slot="prefix" name="magnifying-glass"></sl-icon>
  </sl-input>
  <sl-button class="fa-icon-search-button">
    Search
    <sl-icon name="arrow-top-right-on-square" slot="suffix">
  </sl-button>
</div>
:::

### Heroicons (Deprecated)

Not setting the `sl-icon`'s `library` attribute to `fa` will display an icon from our previous (now deprecated) icon set, Heroicons. Although Heroicons are still available to use, please use only Font Awesome icons in new designs!

```html:preview
<li>This is a Heroicon icon: <sl-icon name="hand-raised"></sl-icon></li>
<li>This is a Font Awesome icon: <sl-icon library="fa" name="thumbs-up"></sl-icon></li>
```

```pug:slim
li This is a Heroicon icon: sl-icon name="hand-raised"
li This is a Font Awesome icon: sl-icon library="fa" name="thumbs-up"

```

<!-- <div class="icon-search" style="display:none;">
  <div class="icon-search-controls">
    <sl-input placeholder="Search Icons" clearable>
      <sl-icon slot="prefix" name="magnifying-glass"></sl-icon>
    </sl-input>
    <sl-select value="outline">
      <sl-option value="outline">Outlined</sl-option>
      <sl-option value="fill">Filled</sl-option>
      <sl-option value="all">All icons</sl-option>
    </sl-select>
  </div>
  <br/>
  <sl-details open="true" summary="Icon results">
    <div class="icon-list"></div>
  </sl-details>
  <input type="text" class="icon-copy-input" aria-hidden="true" tabindex="-1">
</div> -->

## Examples

### Colors

Icons inherit their color from the current text color. Thus, you can set the `color` property on the `<sl-icon>` element or an ancestor to change the color, ideally using Tailwind's utility classes for text colors (e.g. `text-blue-700`). Only use colors from our [Colors page](/../tokens/ts-colors).

:::tip
<strong>Make sure icon meets AA contrast requirements.</strong><br/>

<ul>
  <li>Icon colors can vary depending on context, but make sure that there is enough contrast between the icon color and the background color to meet the <strong>WCAG AA</strong> minimum contrast requirements for icons (<strong>3:1</strong>).</li>
</ul>
:::

```html:preview
<div class="text-gray-600">
  <sl-icon library="fa" name="exclamation-triangle"></sl-icon>
  <sl-icon library="fa" name="box-archive"></sl-icon>
  <sl-icon library="fa" name="battery-three-quarters"></sl-icon>
  <sl-icon library="fa" name="bell"></sl-icon>
</div>
<div class="text-blue-600">
  <sl-icon library="fa" name="clock"></sl-icon>
  <sl-icon library="fa" name="cloud"></sl-icon>
  <sl-icon library="fa" name="arrow-down-to-bracket"></sl-icon>
  <sl-icon library="fa" name="folder"></sl-icon>
</div>
<div class="text-teal-600">
  <sl-icon library="fa" name="flag"></sl-icon>
  <sl-icon library="fa" name="heart"></sl-icon>
  <sl-icon library="fa" name="image"></sl-icon>
  <sl-icon library="fa" name="bolt"></sl-icon>
</div>
<div class="text-red-600">
  <sl-icon library="fa" name="microphone"></sl-icon>
  <sl-icon library="fa" name="magnifying-glass"></sl-icon>
  <sl-icon library="fa" name="star"></sl-icon>
  <sl-icon library="fa" name="trash"></sl-icon>
</div>

<style>
  .text-gray-600 {
    color: var(--sl-color-gray-600);
  }
  .text-blue-600 {
    color: var(--sl-color-blue-600);
  }
  .text-teal-600 {
    color: var(--sl-color-teal-600);
  }
  .text-red-600 {
    color: var(--sl-color-red-600);
  }
</style>
```

```pug:slim
div class="text-gray-600"
  sl-icon library="fa" name="exclamation-triangle"
  sl-icon library="fa" name="box-archive"
  sl-icon library="fa" name="battery-three-quarters"
  sl-icon library="fa" name="bell"
div class="text-blue-960000"
  sl-icon library="fa" name="clock"
  sl-icon library="fa" name="cloud"
  sl-icon library="fa" name="arrow-down-to-bracket"
  sl-icon library="fa" name="folder"
div class="text-teal-600"
  sl-icon library="fa" name="flag"
  sl-icon library="fa" name="heart"
  sl-icon library="fa" name="image"
  sl-icon library="fa" name="bolt"
div class="text-red-600"
  sl-icon library="fa" name="microphone"
  sl-icon library="fa" name="magnifying-glass"
  sl-icon library="fa" name="star"
  sl-icon library="fa" name="trash"

css:
  .text-gray-600 {
    color: var(--sl-color-gray-600);
  }
  .text-blue-600 {
    color: var(--sl-color-blue-600);
  }
  .text-teal-600 {
    color: var(--sl-color-teal-600);
  }
  .text-red-600 {
    color: var(--sl-color-red-600);
  }
```

{% raw %}

```jsx:react
import SlIcon from '@teamshares/shoelace/dist/react/icon';

const css = `
  .text-gray-600 {
    color: var(--sl-color-gray-600);
  }
  .text-blue-600 {
    color: var(--sl-color-blue-600);
  }
  .text-teal-600 {
    color: var(--sl-color-teal-600);
  }
  .text-red-600 {
    color: var(--sl-color-red-600);
  }
`;

const App = () => (
  <>
    <div class="text-gray-600">
      <SlIcon library="fa" name="exclamation-triangle"></SlIcon>
      <SlIcon library="fa" name="box-archive"></SlIcon>
      <SlIcon library="fa" name="battery-three-quarters"></SlIcon>
      <SlIcon library="fa" name="bell"></SlIcon>
    </div>
    <div class="text-blue-600">
      <SlIcon library="fa" name="clock"></SlIcon>
      <SlIcon library="fa" name="cloud"></SlIcon>
      <SlIcon library="fa" name="arrow-down-to-bracket"></SlIcon>
      <SlIcon library="fa" name="folder"></SlIcon>
    </div>
    <div class="text-teal-600">
      <SlIcon library="fa" name="flag"></SlIcon>
      <SlIcon library="fa" name="heart"></SlIcon>
      <SlIcon library="fa" name="image"></SlIcon>
      <SlIcon library="fa" name="bolt"></SlIcon>
    </div>
    <div class="text-red-600">
      <SlIcon library="fa" name="microphone"></SlIcon>
      <SlIcon library="fa" name="magnifying-glass"></SlIcon>
      <SlIcon library="fa" name="star"></SlIcon>
      <SlIcon library="fa" name="trash"></SlIcon>
    </div>

    <style>{css}</style>
  </>
);
```

{% endraw %}

### Sizing

Icons are sized relative to the current font size. To change their size, set the `font-size` property on the icon itself or on a parent element, ideally using Tailwind's utility classes for font size (e.g. `text-2xl`).

```html:preview
<div class="text-2xl">
  <sl-icon library="fa" name="exclamation-triangle"></sl-icon>
  <sl-icon library="fa" name="box-archive"></sl-icon>
  <sl-icon library="fa" name="battery-three-quarters"></sl-icon>
  <sl-icon library="fa" name="bell"></sl-icon>
  <sl-icon library="fa" name="clock"></sl-icon>
  <sl-icon library="fa" name="cloud"></sl-icon>
  <sl-icon library="fa" name="arrow-down-to-bracket"></sl-icon>
  <sl-icon library="fa" name="folder"></sl-icon>
  <sl-icon library="fa" name="flag"></sl-icon>
  <sl-icon library="fa" name="heart"></sl-icon>
  <sl-icon library="fa" name="image"></sl-icon>
  <sl-icon library="fa" name="bolt"></sl-icon>
  <sl-icon library="fa" name="microphone"></sl-icon>
  <sl-icon library="fa" name="magnifying-glass"></sl-icon>
  <sl-icon library="fa" name="star"></sl-icon>
  <sl-icon library="fa" name="trash"></sl-icon>
</div>

<style>
  .text-2xl {
    font-size: var(--sl-font-size-x-large);
  }
</style>
```

```pug:slim
div class="text-2xl"
  sl-icon library="fa" library="fa" name="exclamation-triangle"
  sl-icon library="fa" name="box-archive"
  sl-icon library="fa" name="battery-three-quarters"
  sl-icon library="fa" name="bell"
  sl-icon library="fa" name="clock"
  sl-icon library="fa" name="cloud"
  sl-icon library="fa" name="arrow-down-to-bracket"
  sl-icon library="fa" name="folder"
  sl-icon library="fa" name="flag"
  sl-icon library="fa" name="heart"
  sl-icon library="fa" name="image"
  sl-icon library="fa" name="bolt"
  sl-icon library="fa" name="microphone"
  sl-icon library="fa" name="magnifying-glass"
  sl-icon library="fa" name="star"
  sl-icon library="fa" name="trash"
css:
  .text-2xl {
    font-size: var(--sl-font-size-x-large);
  }
```

{% raw %}

```jsx:react
import SlIcon from '@teamshares/shoelace/dist/react/icon';

const css = `
  .text-2xl {
    font-size: var(--sl-font-size-x-large);
  }
`;

const App = () => (
  <div class="text-2xl">
    <SlIcon library="fa" library="fa" name="exclamation-triangle" />
    <SlIcon name="box-archive" />
    <SlIcon library="fa" name="battery-three-quarters" />
    <SlIcon library="fa" name="bell" />
    <SlIcon library="fa" name="clock" />
    <SlIcon library="fa" name="cloud" />
    <SlIcon library="fa" name="arrow-down-to-bracket" />
    <SlIcon library="fa" name="folder" />
    <SlIcon library="fa" name="flag" />
    <SlIcon library="fa" name="heart" />
    <SlIcon library="fa" name="iage" />
    <SlIcon library="fa" name="bolt" />
    <SlIcon library="fa" name="microphone" />
    <SlIcon library="fa" name="magnifying-glass" />
    <SlIcon library="fa" name="star" />
    <SlIcon library="fa" name="trash" />
  </div>

  <style>{css}</style>
);
```

{% endraw %}

### Labels

For non-decorative icons, use the `label` attribute to announce it to assistive devices.

```html:preview
<sl-icon library="fa" name="heart" label="Add to favorites"></sl-icon>
```

```pug:slim
sl-icon library="fa" name="heart" label="Add to favorites"
```

```jsx:react
import SlIcon from '@teamshares/shoelace/dist/react/icon';

const App = () => <SlIcon library="fa" name="heart" label="Add to favorites" />;
```

### Custom Icons

Custom icons can be loaded individually with the `src` attribute. Only SVGs on a local or CORS-enabled endpoint are supported. If you're using more than one custom icon, it might make sense to register a [custom icon library](#icon-libraries).

```html:preview
<sl-icon src="https://shoelace.style/assets/images/shoe.svg" style="font-size: 8rem;"></sl-icon>
```

```pug:slim
sl-icon src="https://shoelace.style/assets/images/shoe.svg" style="font-size: 8rem;"
```

{% raw %}

```jsx:react
import SlIcon from '@teamshares/shoelace/dist/react/icon';

const App = () => <SlIcon src="https://shoelace.style/assets/images/shoe.svg" style={{ fontSize: '8rem' }}></SlIcon>;
```

{% endraw %}

<!--
### Boxicons

This will register the [Boxicons](https://boxicons.com/) library using the jsDelivr CDN. This library has three variations: regular (`bx-*`), solid (`bxs-*`), and logos (`bxl-*`). A mutator function is required to set the SVG's `fill` to `currentColor`.

Icons in this library are licensed under the [Creative Commons 4.0 License](https://github.com/atisawd/boxicons#license).

```html:preview
<script type="module">
  import { registerIconLibrary } from '/dist/utilities/icon-library.js';

  registerIconLibrary('boxicons', {
    resolver: name => {
      let folder = 'regular';
      if (name.substring(0, 4) === 'bxs-') folder = 'solid';
      if (name.substring(0, 4) === 'bxl-') folder = 'logos';
      return `https://cdn.jsdelivr.net/npm/boxicons@2.0.5/svg/${folder}/${name}.svg`;
    },
    mutator: svg => svg.setAttribute('fill', 'currentColor')
  });
</script>

<div style="font-size: 24px;">
  <sl-icon library="boxicons" name="bx-bot"></sl-icon>
  <sl-icon library="boxicons" name="bx-cookie"></sl-icon>
  <sl-icon library="boxicons" name="bx-joystick"></sl-icon>
  <sl-icon library="boxicons" name="bx-save"></sl-icon>
  <sl-icon library="boxicons" name="bx-server"></sl-icon>
  <sl-icon library="boxicons" name="bx-wine"></sl-icon>
  <br />
  <sl-icon library="boxicons" name="bxs-bot"></sl-icon>
  <sl-icon library="boxicons" name="bxs-cookie"></sl-icon>
  <sl-icon library="boxicons" name="bxs-joystick"></sl-icon>
  <sl-icon library="boxicons" name="bxs-save"></sl-icon>
  <sl-icon library="boxicons" name="bxs-server"></sl-icon>
  <sl-icon library="boxicons" name="bxs-wine"></sl-icon>
  <br />
  <sl-icon library="boxicons" name="bxl-apple"></sl-icon>
  <sl-icon library="boxicons" name="bxl-chrome"></sl-icon>
  <sl-icon library="boxicons" name="bxl-edge"></sl-icon>
  <sl-icon library="boxicons" name="bxl-firefox"></sl-icon>
  <sl-icon library="boxicons" name="bxl-opera"></sl-icon>
  <sl-icon library="boxicons" name="bxl-microsoft"></sl-icon>
</div>
```

### Lucide

This will register the [Lucide](https://lucide.dev/) icon library using the jsDelivr CDN. This project is a community-maintained fork of the popular [Feather](https://feathericons.com/) icon library.

Icons in this library are licensed under the [MIT License](https://github.com/lucide-icons/lucide/blob/master/LICENSE).

```html:preview
<div style="font-size: 24px;">
  <sl-icon library="lucide" name="feather"></sl-icon>
  <sl-icon library="lucide" name="pie-chart"></sl-icon>
  <sl-icon library="lucide" name="settings"></sl-icon>
  <sl-icon library="lucide" name="map-pin"></sl-icon>
  <sl-icon library="lucide" name="printer"></sl-icon>
  <sl-icon library="lucide" name="shopping-cart"></sl-icon>
</div>

<script type="module">
  import { registerIconLibrary } from '/dist/utilities/icon-library.js';

  registerIconLibrary('lucide', {
    resolver: name => `https://cdn.jsdelivr.net/npm/lucide-static@0.16.29/icons/${name}.svg`
  });
</script>
```

### Font Awesome

This will register the [Font Awesome Free](https://fontawesome.com/) library using the jsDelivr CDN. This library has three variations: regular (`far-*`), solid (`fas-*`), and brands (`fab-*`). A mutator function is required to set the SVG's `fill` to `currentColor`.

Icons in this library are licensed under the [Font Awesome Free License](https://github.com/FortAwesome/Font-Awesome/blob/master/LICENSE.txt). Some of the icons that appear on the Font Awesome website require a license and are therefore not available in the CDN.

```html:preview
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
  <br />
  <sl-icon library="fa" name="fas-archive"></sl-icon>
  <sl-icon library="fa" name="fas-book"></sl-icon>
  <sl-icon library="fa" name="fas-chess-knight"></sl-icon>
  <sl-icon library="fa" name="fas-dice"></sl-icon>
  <sl-icon library="fa" name="fas-pizza-slice"></sl-icon>
  <sl-icon library="fa" name="fas-scroll"></sl-icon>
  <br />
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

```html:preview
<script type="module">
  import { registerIconLibrary } from '/dist/utilities/icon-library.js';

  registerIconLibrary('heroicons', {
    resolver: name => `https://cdn.jsdelivr.net/npm/heroicons@2.0.1/24/outline/${name}.svg`
  });
</script>

<div style="font-size: 24px;">
  <sl-icon library="heroicons" name="chat-bubble-left"></sl-icon>
  <sl-icon library="heroicons" name="cloud"></sl-icon>
  <sl-icon library="heroicons" name="cog"></sl-icon>
  <sl-icon library="heroicons" name="document-text"></sl-icon>
  <sl-icon library="heroicons" name="gift"></sl-icon>
  <sl-icon library="heroicons" name="speaker-wave"></sl-icon>
</div>
```

### Iconoir

This will register the [Iconoir](https://iconoir.com/) library using the jsDelivr CDN.

Icons in this library are licensed under the [MIT License](https://github.com/lucaburgio/iconoir/blob/master/LICENSE).

```html:preview
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

```html:preview
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
  <br />
  <sl-icon library="ionicons" name="alarm-outline"></sl-icon>
  <sl-icon library="ionicons" name="american-football-outline"></sl-icon>
  <sl-icon library="ionicons" name="bug-outline"></sl-icon>
  <sl-icon library="ionicons" name="chatbubble-outline"></sl-icon>
  <sl-icon library="ionicons" name="settings-outline"></sl-icon>
  <sl-icon library="ionicons" name="warning-outline"></sl-icon>
  <br />
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

```html:preview
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
  <br />
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

```html:preview
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
  <br />
  <sl-icon library="material" name="notifications_round"></sl-icon>
  <sl-icon library="material" name="email_round"></sl-icon>
  <sl-icon library="material" name="delete_round"></sl-icon>
  <sl-icon library="material" name="volume_up_round"></sl-icon>
  <sl-icon library="material" name="settings_round"></sl-icon>
  <sl-icon library="material" name="shopping_basket_round"></sl-icon>
  <br />
  <sl-icon library="material" name="notifications_sharp"></sl-icon>
  <sl-icon library="material" name="email_sharp"></sl-icon>
  <sl-icon library="material" name="delete_sharp"></sl-icon>
  <sl-icon library="material" name="volume_up_sharp"></sl-icon>
  <sl-icon library="material" name="settings_sharp"></sl-icon>
  <sl-icon library="material" name="shopping_basket_sharp"></sl-icon>
</div>
```


### Remix Icon

This will register the [Remix Icon](https://remixicon.com/) library using the jsDelivr CDN. This library groups icons by categories, so the name must include the category and icon separated by a slash, as well as the `-line` or `-fill` suffix as needed. A mutator function is required to set the SVG's `fill` to `currentColor`.

Icons in this library are licensed under the [Apache 2.0 License](https://github.com/Remix-Design/RemixIcon/blob/master/License).

```html:preview
<script type="module">
  import { registerIconLibrary } from '/dist/utilities/icon-library.js';

  registerIconLibrary('remixicon', {
    resolver: name => {
      const match = name.match(/^(.*?)\/(.*?)?$/);
      match[1] = match[1].charAt(0).toUpperCase() + match[1].slice(1);
      return `https://cdn.jsdelivr.net/npm/remixicon@2.5.0/icons/${match[1]}/${match[2]}.svg`;
    },
    mutator: svg => svg.setAttribute('fill', 'currentColor')
  });
</script>

<div style="font-size: 24px;">
  <sl-icon library="remixicon" name="business/cloud-line"></sl-icon>
  <sl-icon library="remixicon" name="design/brush-line"></sl-icon>
  <sl-icon library="remixicon" name="business/pie-chart-line"></sl-icon>
  <sl-icon library="remixicon" name="development/bug-line"></sl-icon>
  <sl-icon library="remixicon" name="media/image-line"></sl-icon>
  <sl-icon library="remixicon" name="system/alert-line"></sl-icon>
  <br />
  <sl-icon library="remixicon" name="business/cloud-fill"></sl-icon>
  <sl-icon library="remixicon" name="design/brush-fill"></sl-icon>
  <sl-icon library="remixicon" name="business/pie-chart-fill"></sl-icon>
  <sl-icon library="remixicon" name="development/bug-fill"></sl-icon>
  <sl-icon library="remixicon" name="media/image-fill"></sl-icon>
  <sl-icon library="remixicon" name="system/alert-fill"></sl-icon>
</div>
```

### Tabler Icons

This will register the [Tabler Icons](https://tabler-icons.io/) library using the jsDelivr CDN. This library features over 1,950 open source icons.

Icons in this library are licensed under the [MIT License](https://github.com/tabler/tabler-icons/blob/master/LICENSE).

```html:preview
<script type="module">
  import { registerIconLibrary } from '/dist/utilities/icon-library.js';

  registerIconLibrary('tabler', {
    resolver: name => `https://cdn.jsdelivr.net/npm/@tabler/icons@1.68.0/icons/${name}.svg`
  });
</script>

<div style="font-size: 24px;">
  <sl-icon library="tabler" name="alert-triangle"></sl-icon>
  <sl-icon library="tabler" name="arrow-back"></sl-icon>
  <sl-icon library="tabler" name="at"></sl-icon>
  <sl-icon library="tabler" name="ball-baseball"></sl-icon>
  <sl-icon library="tabler" name="cake"></sl-icon>
  <sl-icon library="tabler" name="files"></sl-icon>
  <br />
  <sl-icon library="tabler" name="keyboard"></sl-icon>
  <sl-icon library="tabler" name="moon"></sl-icon>
  <sl-icon library="tabler" name="pig"></sl-icon>
  <sl-icon library="tabler" name="printer"></sl-icon>
  <sl-icon library="tabler" name="ship"></sl-icon>
  <sl-icon library="tabler" name="toilet-paper"></sl-icon>
</div>
```

### Unicons

This will register the [Unicons](https://iconscout.com/unicons) library using the jsDelivr CDN. This library has two variations: line (default) and solid (`*-s`). A mutator function is required to set the SVG's `fill` to `currentColor`.

Icons in this library are licensed under the [Apache 2.0 License](https://github.com/Iconscout/unicons/blob/master/LICENSE). Some of the icons that appear on the Unicons website, particularly many of the solid variations, require a license and are therefore not available in the CDN.

```html:preview
<script type="module">
  import { registerIconLibrary } from '/dist/utilities/icon-library.js';

  registerIconLibrary('unicons', {
    resolver: name => {
      const match = name.match(/^(.*?)(-s)?$/);
      return `https://cdn.jsdelivr.net/npm/@iconscout/unicons@3.0.3/svg/${match[2] === '-s' ? 'solid' : 'line'}/${
        match[1]
      }.svg`;
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
  <br />
  <sl-icon library="unicons" name="clock-s"></sl-icon>
  <sl-icon library="unicons" name="graph-bar-s"></sl-icon>
  <sl-icon library="unicons" name="padlock-s"></sl-icon>
  <sl-icon library="unicons" name="polygon-s"></sl-icon>
  <sl-icon library="unicons" name="rocket-s"></sl-icon>
  <sl-icon library="unicons" name="star-s"></sl-icon>
</div>
``` -->

<!-- ### Customizing the Default Library

The default icon library contains over 1,300 icons courtesy of the [Bootstrap Icons](https://icons.getbootstrap.com/) project. These are the icons that display when you use `<sl-icon>` without the `library` attribute. If you prefer to have these icons resolve elsewhere or to a different icon library, register an icon library using the `default` name and a custom resolver.

This example will load the same set of icons from the jsDelivr CDN instead of your local assets folder.

```html
<script type="module">
  import { registerIconLibrary } from '/dist/utilities/icon-library.js';

  registerIconLibrary('default', {
    resolver: name => `https://cdn.jsdelivr.net/npm/bootstrap-icons@1.0.0/icons/${name}.svg`
  });
</script>
``` -->

<!-- #### Customize the default library to use SVG sprites

To improve performance you can use a SVG sprites to avoid multiple trips for each SVG. The browser will load the sprite sheet once and then you reference the particular SVG within the sprite sheet using hash selector.

As always, make sure to benchmark these changes. When using HTTP/2, it may in fact be more bandwidth-friendly to use multiple small requests instead of 1 large sprite sheet.

:::danger
When using sprite sheets, the `sl-load` and `sl-error` events will not fire.
:::

:::danger
For security reasons, browsers may apply the same-origin policy on `<use>` elements located in the `<sl-icon>` shadow DOM and may refuse to load a cross-origin URL. There is currently no defined way to set a cross-origin policy for `<use>` elements. For this reason, sprite sheets should only be used if you're self-hosting them.
:::

```html:preview
<script type="module">
  import { registerIconLibrary } from '/dist/utilities/icon-library.js';

  registerIconLibrary('sprite', {
    resolver: name => `/assets/images/sprite.svg#${name}`,
    mutator: svg => svg.setAttribute('fill', 'currentColor'),
    spriteSheet: true
  });
</script>

<div style="font-size: 24px;">
  <sl-icon library="sprite" name="clock"></sl-icon>
  <sl-icon library="sprite" name="speedometer"></sl-icon>
</div>
``` -->

<!-- ### Customizing the System Library

The system library contains only the icons used internally by Shoelace components. Unlike the default icon library, the system library does not rely on physical assets. Instead, its icons are hard-coded as data URIs into the resolver to ensure their availability.

If you want to change the icons Shoelace uses internally, you can register an icon library using the `system` name and a custom resolver. If you choose to do this, it's your responsibility to provide all of the icons that are required by components. You can reference `src/components/library.system.ts` for a complete list of system icons used by Shoelace. -->

<!-- ```html
<script type="module">
  import { registerIconLibrary } from '/dist/utilities/icon-library.js';

  registerIconLibrary('system', {
    resolver: name => `/path/to/custom/icons/${name}.svg`
  });
</script>
``` -->

<!-- Supporting scripts and styles for the search utility -->
<script>
  // function wrapWithTooltip(item) {
  //   const tooltip = document.createElement('sl-tooltip');
  //   tooltip.content = item.getAttribute('data-name');

  //   // Close open tooltips
  //   document.querySelectorAll('.icon-list sl-tooltip[open]').forEach(tooltip => tooltip.hide());

  //   // Wrap it with a tooltip and trick it into showing up
  //   item.parentNode.insertBefore(tooltip, item);
  //   tooltip.appendChild(item);
  //   requestAnimationFrame(() => tooltip.dispatchEvent(new MouseEvent('mouseover')));
  // }

  fetch('/dist/assets/icons/icons.json')
    .then(res => res.json())
    .then(icons => {
      // const container = document.querySelector('.icon-search');
      // const input = container.querySelector('sl-input');
      // const select = container.querySelector('sl-select');
      // const copyInput = container.querySelector('.icon-copy-input');
      // const loader = container.querySelector('.icon-loader');
      // const list = container.querySelector('.icon-list');
      // const queue = [];
      const faIconSearchInput = document.querySelector('.fa-icon-search-input');
      const faIconSearchButton = document.querySelector('.fa-icon-search-button');
      let inputTimeout;

      // Generate icons
      // icons.map(i => {
        // const item = document.createElement('div');
        // item.classList.add('icon-list-item');
        // item.setAttribute('data-name', i.name);
        // item.setAttribute('data-terms', [i.name, i.title, ...(i.tags || []), ...(i.categories || [])].join(' '));
        // item.innerHTML = `
        //   <svg width="1em" height="1em" fill="currentColor">
        //     <use href="/assets/images/sprite.svg#${i.name}"></use>
        //   </svg>
        // `;
        // list.appendChild(item);

        // Wrap it with a tooltip the first time the mouse lands on it. We do this instead of baking them into the DOM
        // to improve this page's performance. See: https://github.com/shoelace-style/shoelace/issues/1122
        // item.addEventListener('mouseover', () => wrapWithTooltip(item), { once: true });

        // Copy on click
        // item.addEventListener('click', () => {
        //   const tooltip = item.closest('sl-tooltip');
        //   copyInput.value = i.name;
        //   copyInput.select();
        //   document.execCommand('copy');

        //   if (tooltip) {
        //     tooltip.content = 'Copied!';
        //     setTimeout(() => tooltip.content = i.name, 1000);
        //   }
        // });
      // });

      // Filter as the user types
      // input.addEventListener('sl-input', () => {
      //   clearTimeout(inputTimeout);
      //   inputTimeout = setTimeout(() => {
      //     [...list.querySelectorAll('.icon-list-item')].map(item => {
      //       const filter = input.value.toLowerCase();
      //       if (filter === '') {
      //         item.hidden = false;
      //       } else {
      //         const terms = item.getAttribute('data-terms').toLowerCase();
      //         item.hidden = terms.indexOf(filter) < 0;
      //       }
      //     });
      //   }, 250);
      // });

      // Sort by type and remember preference
      // const iconType = sessionStorage.getItem('sl-icon:type') || 'outline';
      // select.value = iconType;
      // list.setAttribute('data-type', select.value);
      // select.addEventListener('sl-change', () => {
      //   list.setAttribute('data-type', select.value);
      //   sessionStorage.setItem('sl-icon:type', select.value);
      // });

      const onFaSearch = () => {
        const query = faIconSearchInput.value;
        if (query) {
          // Current params: classic (not sharp), solid, outline, duotone, light, ordered alphabetically
          const searchPopup = window.open(`https://fontawesome.com/search?q=${query}&o=a&s=solid%2Cregular%2Cduotone%2Clight&f=classic`, 'fontAwesomeSearch', 'popup');
          if (!searchPopup) {
            const alert = Object.assign(document.createElement('sl-alert'), {
              variant: 'warning',
              closable: true,
              duration: 5000,
              innerHTML: `
                <sl-icon name="exclamation-triangle-solid" slot="icon"></sl-icon>
                Please enable popups on this page to see the Font Awesome search results.
              `
              });
            document.body.append(alert);
          }
        }
      }

      // Search Font Awesome free
      faIconSearchButton.addEventListener('click', onFaSearch);
      faIconSearchInput.addEventListener('keyup', (e) => {
        if (e.key === "Enter") {
          onFaSearch();
        }
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
    border-radius: var(--sl-border-radius-medium);
    font-size: 24px;
    width: 2em;
    height: 2em;
    margin: 0 auto;
    cursor: copy;
    transition: var(--sl-transition-medium) all;
  } */

  /* REMOVE */
  /* .icon-list-item svg {
    fill: none;
    stroke: currentColor;
  } */

  .icon-list-item:hover {
    background-color: var(--sl-color-primary-50);
    color: var(--sl-color-primary-600);
  }

  .icon-list[data-type="outline"] .icon-list-item:where([data-name$="-solid"], [data-name$="-mini"]) {
    display: none;
  }

  .icon-list[data-type="fill"] .icon-list-item:not([data-name$="-solid"]):not([data-name$="-mini"]) {
    display: none;
  }

  .icon-list-item:where([data-name$="-solid"], [data-name$="-mini"]) svg {
    stroke: none;
    fill: currentColor;
  }

  .icon-list-item:not([data-name$="-solid"]):not([data-name$="-mini"]) svg {
    stroke: currentColor;
    fill: none;
  }

  .icon-list-item:where([data-name$="-mini"]) svg {
    width: 1rem;
    height: 1rem;
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

  .fa-search {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem !important;
  }

  .fa-icon-search-input {
    flex: 1;
  }
</style>
