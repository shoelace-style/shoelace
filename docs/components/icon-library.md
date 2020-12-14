# Icon Library

[component-header:sl-icon-library]

Icon libraries let you register additional icons to use with the `<sl-icon>` component.

An icon library is a renderless component that registers a custom set of SVG icons. The icon files can exist locally or on a CORS-enabled endpoint (i.e. a CDN). There is no limit to how many icon libraries you can register and there is no cost associated with registering them, as individual icons are only requested when they're used.

To register an icon library, create an `<sl-icon-library>` element with a name and resolver function. The resolver function translates an icon name to a URL where its corresponding SVG file exists. Refer to the examples below to better understand how it works.

If necessary, a mutator function can be used to mutate the SVG element before rendering. This is necessary for some libraries due to the many possible ways SVGs are crafted. For example, icons should inherit the current text color via `currentColor`, so you may need to apply `fill="currentColor` or `stroke="currentColor"` to the SVG element using this function.

Here's an example that registers an icon library located in the `/assets/icons` directory.

```html
<!-- Create a library named "my-icons" -->
<sl-icon-library name="my-icons"></sl-icon>

<script>
  // Get a reference to the library element
  const library = document.querySelector('sl-icon-library[name="my-icons"]');

  // Add a resolver function to translate icon names to URLs
  library.resolver = name => `/assets/icons/${name}.svg`;

  // Apply an optional mutator function to modify the SVG before it renders
  library.mutator = svg => svg.setAttribute('fill', 'currentColor');
</script>
```

To display an icon, set the `library` and `name` attributes of an `<sl-icon>` element.

```html
<!-- This will show the icon located at /assets/icons/smile.svg -->
<sl-icon library="my-icons" name="smile"></sl-icon>
```

The location of the icon library in the DOM doesn't matter as long as it's within the `<body>` element. If an icon is used before registration, it will be empty until registration has completed. It's perfectly acceptable to place all `<sl-icon-library>` elements before the `</body>` tag if you prefer to organize them that way.

## Examples

The following examples demonstrate how to register a number of popular, open source icon libraries via CDN. Feel free to adapt the code as you see fit to use your own origin or naming conventions.

### Boxicons

This will register the [Boxicons](https://boxicons.com/) library using the jsDelivr CDN. This library has three variations: regular (`bx-*`), solid (`bxs-*`), and logos (`bxl-*`). A mutator function is required to set the SVG's `fill` to `currentColor`.

Icons in this library are licensed under the [Creative Commons 4.0 License](https://github.com/atisawd/boxicons#license).

```html preview
<sl-icon-library name="boxicons"></sl-icon-library>

<script>
  const library = document.querySelector('sl-icon-library[name="boxicons"]');
  library.resolver = name => {
    let folder = 'regular';
    if (name.substring(0, 4) === 'bxs-') folder = 'solid';
    if (name.substring(0, 4) === 'bxl-') folder = 'logos';
    return `https://cdn.jsdelivr.net/npm/boxicons@2.0.5/svg/${folder}/${name}.svg`;
  };
  library.mutator = svg => svg.setAttribute('fill', 'currentColor');
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
<sl-icon-library name="feather"></sl-icon-library>

<script>
  const library = document.querySelector('sl-icon-library[name="feather"]');
  library.resolver = name => `https://cdn.jsdelivr.net/npm/feather-icons@4.28.0/dist/icons/${name}.svg`;
</script>

<div style="font-size: 24px;">
  <sl-icon library="feather" name="feather"></sl-icon>
  <sl-icon library="feather" name="pie-chart"></sl-icon>
  <sl-icon library="feather" name="settings"></sl-icon>
  <sl-icon library="feather" name="map-pin"></sl-icon>
  <sl-icon library="feather" name="printer"></sl-icon>
  <sl-icon library="feather" name="shopping-cart"></sl-icon>
</div>
```

### Font Awesome

This will register the [Font Awesome Free](https://fontawesome.com/) library using the jsDelivr CDN. This library has three variations: regular (`far-*`), solid (`fas-*`), and brands (`fab-*`). A mutator function is required to set the SVG's `fill` to `currentColor`.

Icons in this library are licensed under the [Font Awesome Free License](https://github.com/FortAwesome/Font-Awesome/blob/master/LICENSE.txt). Some of the icons that appear on the Font Awesome website require a license and are therefore not available in the CDN.

```html preview
<sl-icon-library name="fa"></sl-icon-library>

<script>
  const library = document.querySelector('sl-icon-library[name="fa"]');
  library.resolver = name => {
    const filename = name.replace(/^fa[rbs]-/, '');
    let folder = 'regular';
    if (name.substring(0, 4) === 'fas-') folder = 'solid';
    if (name.substring(0, 4) === 'fab-') folder = 'brands';
    return `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.1/svgs/${folder}/${filename}.svg`;
  };
  library.mutator = svg => svg.setAttribute('fill', 'currentColor');
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
<sl-icon-library name="heroicons"></sl-icon-library>

<script>
  const library = document.querySelector('sl-icon-library[name="heroicons"]');
  library.resolver = name => `https://cdn.jsdelivr.net/npm/heroicons@0.4.2/outline/${name}.svg`;
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

### Ionicons

This will register the [Ionicons](https://ionicons.com/) library using the jsDelivr CDN. This library has three variations: outline (default), filled (`*-filled`), and sharp (`*-sharp`). A mutator function is required to polyfill a handful of styles we're not including.

Icons in this library are licensed under the [MIT License](https://github.com/ionic-team/ionicons/blob/master/LICENSE).

```html preview
<sl-icon-library name="ionicons"></sl-icon-library>

<script>
  const library = document.querySelector('sl-icon-library[name="ionicons"]');
  library.resolver = name => `https://cdn.jsdelivr.net/npm/ionicons@5.1.2/dist/ionicons/svg/${name}.svg`;
  library.mutator = svg => {
    svg.setAttribute('fill', 'currentColor');
    svg.setAttribute('stroke', 'currentColor');
    [...svg.querySelectorAll('.ionicon-fill-none')].map(el => el.setAttribute('fill', 'none'));
    [...svg.querySelectorAll('.ionicon-stroke-width')].map(el => el.setAttribute('stroke-width', '32px'));
  };
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
<sl-icon-library name="jam"></sl-icon-library>

<script>
  const library = document.querySelector('sl-icon-library[name="jam"]');
  library.resolver = name => `https://cdn.jsdelivr.net/npm/jam-icons@2.0.0/svg/${name}.svg`;
  library.mutator = svg => svg.setAttribute('fill', 'currentColor');
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
<sl-icon-library name="material"></sl-icon-library>

<script>
  const library = document.querySelector('sl-icon-library[name="material"]');
  library.resolver = name => {
    const match = name.match(/^(.*?)(_(round|sharp))?$/);
    return `https://cdn.jsdelivr.net/npm/@material-icons/svg@1.0.5/svg/${match[1]}/${match[3] || 'outline'}.svg`;
  };
  library.mutator = svg => svg.setAttribute('fill', 'currentColor');
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
<sl-icon-library name="remixicon"></sl-icon-library>

<script>
  const library = document.querySelector('sl-icon-library[name="remixicon"]');
  library.resolver = name => {
    const match = name.match(/^(.*?)\/(.*?)(-(fill))?$/);
    match[1] = match[1].charAt(0).toUpperCase() + match[1].slice(1);
    return `https://cdn.jsdelivr.net/npm/remixicon@2.5.0/icons/${match[1]}/${match[2]}${match[3] || '-line'}.svg`;
  };
  library.mutator = svg => svg.setAttribute('fill', 'currentColor');
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
<sl-icon-library name="unicons"></sl-icon-library>

<script>
  const library = document.querySelector('sl-icon-library[name="unicons"]');
  library.resolver = name => {
    const match = name.match(/^(.*?)(-s)?$/);
    return `https://cdn.jsdelivr.net/npm/@iconscout/unicons@3.0.3/svg/${match[2] === '-s' ? 'solid' : 'line'}/${match[1]}.svg`;
  };
  library.mutator = svg => svg.setAttribute('fill', 'currentColor');
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

Shoelace comes bundled with over 1,200 icons courtesy of the [Bootstrap Icons](https://icons.getbootstrap.com/) project. These are the default icons that display when you use `<sl-icon>` without a `name` attribute. If you prefer to have these icons resolve elsewhere, you can register an icon library with the `default` name and a custom resolver.

This example will load the same set of icons from the jsDelivr CDN instead of your local assets folder.

```html
<sl-icon-library name="default"></sl-icon-library>

<script>
  const library = document.querySelector('sl-icon-library[name="default"]');
  library.resolver = name => `https://cdn.jsdelivr.net/npm/bootstrap-icons@1.0.0/icons/${name}.svg`;
</script>
```

Alternatively, you can replace the default icons with a completely different icon set.

```html
<sl-icon-library name="default"></sl-icon-library>

<script>
  const library = document.querySelector('sl-icon-library[name="default"]');
  library.resolver = name => `/my/custom/icons/${name}.svg`;
</script>
```

[component-metadata:sl-icon-library]
