# Color Tokens

Color tokens help maintain consistent use of color throughout your app. Shoelace provides palettes for theme colors and primitives that you can use as a foundation for your design system.

## Usage

Color tokens are referenced using the `--sl-color-{name}-{n}` CSS custom property, where `{name}` is the name of the palette and `{n}` is the numeric value of the desired swatch.

All color tokens are defined as a set of RGB integers, eg. `113 113 122`. CSS doesn't understand this format, however, so you need wrap them in the `rgb()` function.

```css
.example {
  color: rgb(var(--sl-color-neutral-500));
}
```

This may seem a bit verbose, but it gives us a super power — we can adjust the alpha channel of any color token!

## Adjusting Alpha Channels

By default, color tokens produce an opaque color. With this syntax, you can easily adjust alpha channels.

```css
.example-with-alpha {
  color: rgb(var(--sl-color-neutral-500) / 50%);
}
```

The browser evaluates this to `rgb(113 113 122 / 50%)`, where 50% is the alpha value. Note the required `/` delimiter after the color token. Alternatively, you can use a decimal such as 0.5 in lieu of a percentage.

This syntax may not look familiar, but it's perfectly valid per the [CSS Color Module Level 4](https://www.w3.org/TR/css-color-4/#typedef-color) and [well-supported](https://caniuse.com/mdn-css_types_color_space_separated_functional_notation) by modern browsers.

## Theme Tokens

Theme tokens give you a semantic way to reference colors in your app. The primary palette is typically based on a brand color, whereas success, neutral, warning, and danger are used to visualize actions that correspond to their respective meanings.

<div class="color-palette">
  <div class="color-palette__name">
    Primary<br>
    <code>--sl-color-primary-<em>{n}</em></code>
  </div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-primary-50));"></div>50</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-primary-100));"></div>100</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-primary-200));"></div>200</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-primary-300));"></div>300</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-primary-400));"></div>400</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-primary-500));"></div>500</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-primary-600));"></div>600</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-primary-700));"></div>700</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-primary-800));"></div>800</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-primary-900));"></div>900</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-primary-950));"></div>950</div>
</div>

<div class="color-palette">
  <div class="color-palette__name">
    Success<br>
    <code>--sl-color-success-<em>{n}</em></code>
  </div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-success-50));"></div>50</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-success-100));"></div>100</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-success-200));"></div>200</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-success-300));"></div>300</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-success-400));"></div>400</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-success-500));"></div>500</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-success-600));"></div>600</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-success-700));"></div>700</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-success-800));"></div>800</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-success-900));"></div>900</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-success-950));"></div>950</div>
</div>

<div class="color-palette">
  <div class="color-palette__name">
    Warning<br>
    <code>--sl-color-warning-<em>{n}</em></code>
  </div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-warning-50));"></div>50</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-warning-100));"></div>100</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-warning-200));"></div>200</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-warning-300));"></div>300</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-warning-400));"></div>400</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-warning-500));"></div>500</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-warning-600));"></div>600</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-warning-700));"></div>700</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-warning-800));"></div>800</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-warning-900));"></div>900</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-warning-950));"></div>950</div>
</div>

<div class="color-palette">
  <div class="color-palette__name">
    Danger<br>
    <code>--sl-color-danger-<em>{n}</em></code>
  </div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-danger-50));"></div>50</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-danger-100));"></div>100</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-danger-200));"></div>200</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-danger-300));"></div>300</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-danger-400));"></div>400</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-danger-500));"></div>500</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-danger-600));"></div>600</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-danger-700));"></div>700</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-danger-800));"></div>800</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-danger-900));"></div>900</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-danger-950));"></div>950</div>
</div>

<div class="color-palette">
  <div class="color-palette__name">
    Neutral<br>
    <code>--sl-color-neutral-<em>{n}</em></code>
  </div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-neutral-50));"></div>50</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-neutral-100));"></div>100</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-neutral-200));"></div>200</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-neutral-300));"></div>300</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-neutral-400));"></div>400</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-neutral-500));"></div>500</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-neutral-600));"></div>600</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-neutral-700));"></div>700</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-neutral-800));"></div>800</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-neutral-900));"></div>900</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-neutral-950));"></div>950</div>
</div>

<div class="color-palette">
  <div class="color-palette__name">
    Black & White<br>
    <code>--sl-color-neutral-<em>{n}</em></code>
  </div>
  <div class="color-palette__example"><div class="color-palette__swatch color-palette__swatch--border" style="background-color: rgb(var(--sl-color-neutral-0));"></div>0</div>
  <div class="color-palette__example"><div class="color-palette__swatch " style="background-color: rgb(var(--sl-color-neutral-1000));"></div>1000</div>
</div>

?> Looking for an easy way to customize your theme? [Try the color token generator!](https://codepen.io/claviska/full/QWveRgL)


## Primitives

Additional palettes are provided in the form of color primitives. Use these when you need arbitrary colors that don't have semantic meaning. Color primitives are derived from the fantastic [Tailwind color palette](https://tailwindcss.com/docs/customizing-colors).

<div class="color-palette">
  <div class="color-palette__name">
    Blue Gray<br>
    <code>--sl-color-blue-gray-<em>{n}</em></code>
  </div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-blue-gray-50));"></div>50</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-blue-gray-100));"></div>100</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-blue-gray-200));"></div>200</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-blue-gray-300));"></div>300</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-blue-gray-400));"></div>400</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-blue-gray-500));"></div>500</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-blue-gray-600));"></div>600</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-blue-gray-700));"></div>700</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-blue-gray-800));"></div>800</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-blue-gray-900));"></div>900</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-blue-gray-950));"></div>950</div>
</div>

<div class="color-palette">
  <div class="color-palette__name">
    Cool Gray<br>
    <code>--sl-color-cool-gray-<em>{n}</em></code>
  </div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-cool-gray-50));"></div>50</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-cool-gray-100));"></div>100</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-cool-gray-200));"></div>200</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-cool-gray-300));"></div>300</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-cool-gray-400));"></div>400</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-cool-gray-500));"></div>500</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-cool-gray-600));"></div>600</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-cool-gray-700));"></div>700</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-cool-gray-800));"></div>800</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-cool-gray-900));"></div>900</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-cool-gray-950));"></div>950</div>
</div>

<div class="color-palette">
  <div class="color-palette__name">
    Gray<br>
    <code>--sl-color-gray-<em>{n}</em></code>
  </div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-gray-50));"></div>50</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-gray-100));"></div>100</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-gray-200));"></div>200</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-gray-300));"></div>300</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-gray-400));"></div>400</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-gray-500));"></div>500</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-gray-600));"></div>600</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-gray-700));"></div>700</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-gray-800));"></div>800</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-gray-900));"></div>900</div>  
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-gray-950));"></div>950</div>  
</div>

<div class="color-palette">
  <div class="color-palette__name">
    True Gray<br>
    <code>--sl-color-true-gray-<em>{n}</em></code>
  </div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-true-gray-50));"></div>50</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-true-gray-100));"></div>100</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-true-gray-200));"></div>200</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-true-gray-300));"></div>300</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-true-gray-400));"></div>400</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-true-gray-500));"></div>500</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-true-gray-600));"></div>600</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-true-gray-700));"></div>700</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-true-gray-800));"></div>800</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-true-gray-900));"></div>900</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-true-gray-950));"></div>950</div>
</div>

<div class="color-palette">
  <div class="color-palette__name">
    Warm Gray<br>
    <code>--sl-color-warm-gray-<em>{n}</em></code>
  </div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-warm-gray-50));"></div>50</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-warm-gray-100));"></div>100</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-warm-gray-200));"></div>200</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-warm-gray-300));"></div>300</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-warm-gray-400));"></div>400</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-warm-gray-500));"></div>500</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-warm-gray-600));"></div>600</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-warm-gray-700));"></div>700</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-warm-gray-800));"></div>800</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-warm-gray-900));"></div>900</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-warm-gray-950));"></div>950</div>
</div>

<div class="color-palette">
  <div class="color-palette__name">
    Red<br>
    <code>--sl-color-red-<em>{n}</em></code>
  </div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-red-50));"></div>50</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-red-100));"></div>100</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-red-200));"></div>200</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-red-300));"></div>300</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-red-400));"></div>400</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-red-500));"></div>500</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-red-600));"></div>600</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-red-700));"></div>700</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-red-800));"></div>800</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-red-900));"></div>900</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-red-950));"></div>950</div>
</div>

<div class="color-palette">
  <div class="color-palette__name">
    Orange<br>
    <code>--sl-color-orange-<em>{n}</em></code>
  </div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-orange-50));"></div>50</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-orange-100));"></div>100</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-orange-200));"></div>200</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-orange-300));"></div>300</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-orange-400));"></div>400</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-orange-500));"></div>500</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-orange-600));"></div>600</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-orange-700));"></div>700</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-orange-800));"></div>800</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-orange-900));"></div>900</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-orange-950));"></div>950</div>
</div>

<div class="color-palette">
  <div class="color-palette__name">
    Amber<br>
    <code>--sl-color-amber-<em>{n}</em></code>
  </div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-amber-50));"></div>50</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-amber-100));"></div>100</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-amber-200));"></div>200</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-amber-300));"></div>300</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-amber-400));"></div>400</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-amber-500));"></div>500</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-amber-600));"></div>600</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-amber-700));"></div>700</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-amber-800));"></div>800</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-amber-900));"></div>900</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-amber-950));"></div>950</div>
</div>

<div class="color-palette">
  <div class="color-palette__name">
    Yellow<br>
    <code>--sl-color-yellow-<em>{n}</em></code>
  </div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-yellow-50));"></div>50</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-yellow-100));"></div>100</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-yellow-200));"></div>200</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-yellow-300));"></div>300</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-yellow-400));"></div>400</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-yellow-500));"></div>500</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-yellow-600));"></div>600</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-yellow-700));"></div>700</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-yellow-800));"></div>800</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-yellow-900));"></div>900</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-yellow-950));"></div>950</div>
</div>

<div class="color-palette">
  <div class="color-palette__name">
    Lime<br>
    <code>--sl-color-lime-<em>{n}</em></code>
  </div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-lime-50));"></div>50</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-lime-100));"></div>100</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-lime-200));"></div>200</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-lime-300));"></div>300</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-lime-400));"></div>400</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-lime-500));"></div>500</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-lime-600));"></div>600</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-lime-700));"></div>700</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-lime-800));"></div>800</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-lime-900));"></div>900</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-lime-950));"></div>950</div>
</div>

<div class="color-palette">
  <div class="color-palette__name">
    Green<br>
    <code>--sl-color-green-<em>{n}</em></code>
  </div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-green-50));"></div>50</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-green-100));"></div>100</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-green-200));"></div>200</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-green-300));"></div>300</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-green-400));"></div>400</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-green-500));"></div>500</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-green-600));"></div>600</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-green-700));"></div>700</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-green-800));"></div>800</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-green-900));"></div>900</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-green-950));"></div>950</div>
</div>

<div class="color-palette">
  <div class="color-palette__name">
    Emerald<br>
    <code>--sl-color-emerald-<em>{n}</em></code>
  </div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-emerald-50));"></div>50</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-emerald-100));"></div>100</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-emerald-200));"></div>200</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-emerald-300));"></div>300</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-emerald-400));"></div>400</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-emerald-500));"></div>500</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-emerald-600));"></div>600</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-emerald-700));"></div>700</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-emerald-800));"></div>800</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-emerald-900));"></div>900</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-emerald-950));"></div>950</div>
</div>

<div class="color-palette">
  <div class="color-palette__name">
    Teal<br>
    <code>--sl-color-teal-<em>{n}</em></code>
  </div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-teal-50));"></div>50</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-teal-100));"></div>100</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-teal-200));"></div>200</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-teal-300));"></div>300</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-teal-400));"></div>400</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-teal-500));"></div>500</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-teal-600));"></div>600</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-teal-700));"></div>700</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-teal-800));"></div>800</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-teal-900));"></div>900</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-teal-950));"></div>950</div>
</div>

<div class="color-palette">
  <div class="color-palette__name">
    Cyan<br>
    <code>--sl-color-cyan-<em>{n}</em></code>
  </div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-cyan-50));"></div>50</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-cyan-100));"></div>100</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-cyan-200));"></div>200</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-cyan-300));"></div>300</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-cyan-400));"></div>400</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-cyan-500));"></div>500</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-cyan-600));"></div>600</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-cyan-700));"></div>700</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-cyan-800));"></div>800</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-cyan-900));"></div>900</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-cyan-950));"></div>950</div>
</div>

<div class="color-palette">
  <div class="color-palette__name">
    Sky<br>
    <code>--sl-color-sky-<em>{n}</em></code>
  </div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-sky-50));"></div>50</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-sky-100));"></div>100</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-sky-200));"></div>200</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-sky-300));"></div>300</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-sky-400));"></div>400</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-sky-500));"></div>500</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-sky-600));"></div>600</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-sky-700));"></div>700</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-sky-800));"></div>800</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-sky-900));"></div>900</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-sky-950));"></div>950</div>
</div>

<div class="color-palette">
  <div class="color-palette__name">
    Blue<br>
    <code>--sl-color-blue-<em>{n}</em></code>
  </div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-blue-50));"></div>50</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-blue-100));"></div>100</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-blue-200));"></div>200</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-blue-300));"></div>300</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-blue-400));"></div>400</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-blue-500));"></div>500</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-blue-600));"></div>600</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-blue-700));"></div>700</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-blue-800));"></div>800</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-blue-900));"></div>900</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-blue-950));"></div>950</div>
</div>

<div class="color-palette">
  <div class="color-palette__name">
    Indigo<br>
    <code>--sl-color-indigo-<em>{n}</em></code>
  </div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-indigo-50));"></div>50</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-indigo-100));"></div>100</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-indigo-200));"></div>200</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-indigo-300));"></div>300</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-indigo-400));"></div>400</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-indigo-500));"></div>500</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-indigo-600));"></div>600</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-indigo-700));"></div>700</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-indigo-800));"></div>800</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-indigo-900));"></div>900</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-indigo-950));"></div>950</div>
</div>

<div class="color-palette">
  <div class="color-palette__name">
    Violet<br>
    <code>--sl-color-violet-<em>{n}</em></code>
  </div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-violet-50));"></div>50</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-violet-100));"></div>100</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-violet-200));"></div>200</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-violet-300));"></div>300</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-violet-400));"></div>400</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-violet-500));"></div>500</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-violet-600));"></div>600</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-violet-700));"></div>700</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-violet-800));"></div>800</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-violet-900));"></div>900</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-violet-950));"></div>950</div>
</div>

<div class="color-palette">
  <div class="color-palette__name">
    Purple<br>
    <code>--sl-color-purple-<em>{n}</em></code>
  </div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-purple-50));"></div>50</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-purple-100));"></div>100</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-purple-200));"></div>200</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-purple-300));"></div>300</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-purple-400));"></div>400</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-purple-500));"></div>500</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-purple-600));"></div>600</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-purple-700));"></div>700</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-purple-800));"></div>800</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-purple-900));"></div>900</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-purple-950));"></div>950</div>
</div>

<div class="color-palette">
  <div class="color-palette__name">
    Fuchsia<br>
    <code>--sl-color-fuchsia-<em>{n}</em></code>
  </div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-fuchsia-50));"></div>50</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-fuchsia-100));"></div>100</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-fuchsia-200));"></div>200</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-fuchsia-300));"></div>300</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-fuchsia-400));"></div>400</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-fuchsia-500));"></div>500</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-fuchsia-600));"></div>600</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-fuchsia-700));"></div>700</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-fuchsia-800));"></div>800</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-fuchsia-900));"></div>900</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-fuchsia-950));"></div>950</div>
</div>

<div class="color-palette">
  <div class="color-palette__name">
    Pink<br>
    <code>--sl-color-pink-<em>{n}</em></code>
  </div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-pink-50));"></div>50</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-pink-100));"></div>100</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-pink-200));"></div>200</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-pink-300));"></div>300</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-pink-400));"></div>400</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-pink-500));"></div>500</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-pink-600));"></div>600</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-pink-700));"></div>700</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-pink-800));"></div>800</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-pink-900));"></div>900</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-pink-950));"></div>950</div>
</div>

<div class="color-palette">
  <div class="color-palette__name">
    Rose<br>
    <code>--sl-color-rose-<em>{n}</em></code>
  </div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-rose-50));"></div>50</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-rose-100));"></div>100</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-rose-200));"></div>200</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-rose-300));"></div>300</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-rose-400));"></div>400</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-rose-500));"></div>500</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-rose-600));"></div>600</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-rose-700));"></div>700</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-rose-800));"></div>800</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-rose-900));"></div>900</div>
  <div class="color-palette__example"><div class="color-palette__swatch" style="background-color: rgb(var(--sl-color-rose-950));"></div>950</div>
</div>
