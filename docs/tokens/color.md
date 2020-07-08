# Color Tokens

Color tokens are used to maintain consistent color use throughout your app.

## Theme Colors

Theme colors are based on HSL values rather than hex or RGB. This technique lets us generate more consistent palettes for every theme color, ranging from 5% to 95% lightness. There are no 0% nor 100% values for theme colors. Use `--sl-color-black` and `--sl-color-white` instead.

Theme colors include primary, gray, success, info, warning, and danger. They are used extensively throughout the library to maintain a consistent appearance across components.

To customize a theme color, change its respective hue, saturation, and text tokens. This will update all colors in the palette — there's no need to update individual palette colors. In fact, doing so is strongly discouraged.

```css
--sl-color-primary-hue: 203;
--sl-color-primary-saturation: 100%;
--sl-color-primary-text: var(--sl-color-white);
```

?> Palettes are comprised of CSS custom properties ("CSS variables"), so you can update them live in your app and see the changes reflect instantly.

## Primary

| Token                   | Example                                                                              |
| ----------------------- | ------------------------------------------------------------------------------------ |
| `--sl-color-primary-5` | <div class="color-demo" style="background-color: var(--sl-color-primary-5);"></div> |
| `--sl-color-primary-10` | <div class="color-demo" style="background-color: var(--sl-color-primary-10);"></div> |
| `--sl-color-primary-15` | <div class="color-demo" style="background-color: var(--sl-color-primary-15);"></div> |
| `--sl-color-primary-20` | <div class="color-demo" style="background-color: var(--sl-color-primary-20);"></div> |
| `--sl-color-primary-25` | <div class="color-demo" style="background-color: var(--sl-color-primary-25);"></div> |
| `--sl-color-primary-30` | <div class="color-demo" style="background-color: var(--sl-color-primary-30);"></div> |
| `--sl-color-primary-35` | <div class="color-demo" style="background-color: var(--sl-color-primary-35);"></div> |
| `--sl-color-primary-40` | <div class="color-demo" style="background-color: var(--sl-color-primary-40);"></div> |
| `--sl-color-primary-45` | <div class="color-demo" style="background-color: var(--sl-color-primary-45);"></div> |
| `--sl-color-primary-50` | <div class="color-demo" style="background-color: var(--sl-color-primary-50);"></div> |
| `--sl-color-primary-55` | <div class="color-demo" style="background-color: var(--sl-color-primary-55);"></div> |
| `--sl-color-primary-60` | <div class="color-demo" style="background-color: var(--sl-color-primary-60);"></div> |
| `--sl-color-primary-65` | <div class="color-demo" style="background-color: var(--sl-color-primary-65);"></div> |
| `--sl-color-primary-70` | <div class="color-demo" style="background-color: var(--sl-color-primary-70);"></div> |
| `--sl-color-primary-75` | <div class="color-demo" style="background-color: var(--sl-color-primary-75);"></div> |
| `--sl-color-primary-80` | <div class="color-demo" style="background-color: var(--sl-color-primary-80);"></div> |
| `--sl-color-primary-85` | <div class="color-demo" style="background-color: var(--sl-color-primary-85);"></div> |
| `--sl-color-primary-90` | <div class="color-demo" style="background-color: var(--sl-color-primary-90);"></div> |
| `--sl-color-primary-95` | <div class="color-demo" style="background-color: var(--sl-color-primary-95);"></div> |

## Gray

| Token                | Example                                                                           |
| -------------------- | --------------------------------------------------------------------------------- |
| `--sl-color-black`   | <div class="color-demo" style="background-color: var(--sl-color-black);"></div>   |
| `--sl-color-gray-5` | <div class="color-demo" style="background-color: var(--sl-color-gray-5);"></div> |
| `--sl-color-gray-10` | <div class="color-demo" style="background-color: var(--sl-color-gray-10);"></div> |
| `--sl-color-gray-15` | <div class="color-demo" style="background-color: var(--sl-color-gray-15);"></div> |
| `--sl-color-gray-20` | <div class="color-demo" style="background-color: var(--sl-color-gray-20);"></div> |
| `--sl-color-gray-25` | <div class="color-demo" style="background-color: var(--sl-color-gray-25);"></div> |
| `--sl-color-gray-30` | <div class="color-demo" style="background-color: var(--sl-color-gray-30);"></div> |
| `--sl-color-gray-35` | <div class="color-demo" style="background-color: var(--sl-color-gray-35);"></div> |
| `--sl-color-gray-40` | <div class="color-demo" style="background-color: var(--sl-color-gray-40);"></div> |
| `--sl-color-gray-45` | <div class="color-demo" style="background-color: var(--sl-color-gray-45);"></div> |
| `--sl-color-gray-50` | <div class="color-demo" style="background-color: var(--sl-color-gray-50);"></div> |
| `--sl-color-gray-55` | <div class="color-demo" style="background-color: var(--sl-color-gray-55);"></div> |
| `--sl-color-gray-60` | <div class="color-demo" style="background-color: var(--sl-color-gray-60);"></div> |
| `--sl-color-gray-65` | <div class="color-demo" style="background-color: var(--sl-color-gray-65);"></div> |
| `--sl-color-gray-70` | <div class="color-demo" style="background-color: var(--sl-color-gray-70);"></div> |
| `--sl-color-gray-75` | <div class="color-demo" style="background-color: var(--sl-color-gray-75);"></div> |
| `--sl-color-gray-80` | <div class="color-demo" style="background-color: var(--sl-color-gray-80);"></div> |
| `--sl-color-gray-85` | <div class="color-demo" style="background-color: var(--sl-color-gray-85);"></div> |
| `--sl-color-gray-90` | <div class="color-demo" style="background-color: var(--sl-color-gray-90);"></div> |
| `--sl-color-gray-95` | <div class="color-demo" style="background-color: var(--sl-color-gray-95);"></div> |
| `--sl-color-white`   | <div class="color-demo" style="background-color: var(--sl-color-white);"></div>   |

## Success

| Token                   | Example                                                                              |
| ----------------------- | ------------------------------------------------------------------------------------ |
| `--sl-color-success-5` | <div class="color-demo" style="background-color: var(--sl-color-success-5);"></div> |
| `--sl-color-success-10` | <div class="color-demo" style="background-color: var(--sl-color-success-10);"></div> |
| `--sl-color-success-15` | <div class="color-demo" style="background-color: var(--sl-color-success-15);"></div> |
| `--sl-color-success-20` | <div class="color-demo" style="background-color: var(--sl-color-success-20);"></div> |
| `--sl-color-success-25` | <div class="color-demo" style="background-color: var(--sl-color-success-25);"></div> |
| `--sl-color-success-30` | <div class="color-demo" style="background-color: var(--sl-color-success-30);"></div> |
| `--sl-color-success-35` | <div class="color-demo" style="background-color: var(--sl-color-success-35);"></div> |
| `--sl-color-success-40` | <div class="color-demo" style="background-color: var(--sl-color-success-40);"></div> |
| `--sl-color-success-45` | <div class="color-demo" style="background-color: var(--sl-color-success-45);"></div> |
| `--sl-color-success-50` | <div class="color-demo" style="background-color: var(--sl-color-success-50);"></div> |
| `--sl-color-success-55` | <div class="color-demo" style="background-color: var(--sl-color-success-55);"></div> |
| `--sl-color-success-60` | <div class="color-demo" style="background-color: var(--sl-color-success-60);"></div> |
| `--sl-color-success-65` | <div class="color-demo" style="background-color: var(--sl-color-success-65);"></div> |
| `--sl-color-success-70` | <div class="color-demo" style="background-color: var(--sl-color-success-70);"></div> |
| `--sl-color-success-75` | <div class="color-demo" style="background-color: var(--sl-color-success-75);"></div> |
| `--sl-color-success-80` | <div class="color-demo" style="background-color: var(--sl-color-success-80);"></div> |
| `--sl-color-success-85` | <div class="color-demo" style="background-color: var(--sl-color-success-85);"></div> |
| `--sl-color-success-90` | <div class="color-demo" style="background-color: var(--sl-color-success-90);"></div> |
| `--sl-color-success-95` | <div class="color-demo" style="background-color: var(--sl-color-success-95);"></div> |

## Info

| Token                | Example                                                                           |
| -------------------- | --------------------------------------------------------------------------------- |
| `--sl-color-info-5` | <div class="color-demo" style="background-color: var(--sl-color-info-5);"></div> |
| `--sl-color-info-10` | <div class="color-demo" style="background-color: var(--sl-color-info-10);"></div> |
| `--sl-color-info-15` | <div class="color-demo" style="background-color: var(--sl-color-info-15);"></div> |
| `--sl-color-info-20` | <div class="color-demo" style="background-color: var(--sl-color-info-20);"></div> |
| `--sl-color-info-25` | <div class="color-demo" style="background-color: var(--sl-color-info-25);"></div> |
| `--sl-color-info-30` | <div class="color-demo" style="background-color: var(--sl-color-info-30);"></div> |
| `--sl-color-info-35` | <div class="color-demo" style="background-color: var(--sl-color-info-35);"></div> |
| `--sl-color-info-40` | <div class="color-demo" style="background-color: var(--sl-color-info-40);"></div> |
| `--sl-color-info-45` | <div class="color-demo" style="background-color: var(--sl-color-info-45);"></div> |
| `--sl-color-info-50` | <div class="color-demo" style="background-color: var(--sl-color-info-50);"></div> |
| `--sl-color-info-55` | <div class="color-demo" style="background-color: var(--sl-color-info-55);"></div> |
| `--sl-color-info-60` | <div class="color-demo" style="background-color: var(--sl-color-info-60);"></div> |
| `--sl-color-info-65` | <div class="color-demo" style="background-color: var(--sl-color-info-65);"></div> |
| `--sl-color-info-70` | <div class="color-demo" style="background-color: var(--sl-color-info-70);"></div> |
| `--sl-color-info-75` | <div class="color-demo" style="background-color: var(--sl-color-info-75);"></div> |
| `--sl-color-info-80` | <div class="color-demo" style="background-color: var(--sl-color-info-80);"></div> |
| `--sl-color-info-85` | <div class="color-demo" style="background-color: var(--sl-color-info-85);"></div> |
| `--sl-color-info-90` | <div class="color-demo" style="background-color: var(--sl-color-info-90);"></div> |
| `--sl-color-info-95` | <div class="color-demo" style="background-color: var(--sl-color-info-95);"></div> |

## Warning

| Token                   | Example                                                                              |
| ----------------------- | ------------------------------------------------------------------------------------ |
| `--sl-color-warning-5` | <div class="color-demo" style="background-color: var(--sl-color-warning-5);"></div> |
| `--sl-color-warning-10` | <div class="color-demo" style="background-color: var(--sl-color-warning-10);"></div> |
| `--sl-color-warning-15` | <div class="color-demo" style="background-color: var(--sl-color-warning-15);"></div> |
| `--sl-color-warning-20` | <div class="color-demo" style="background-color: var(--sl-color-warning-20);"></div> |
| `--sl-color-warning-25` | <div class="color-demo" style="background-color: var(--sl-color-warning-25);"></div> |
| `--sl-color-warning-30` | <div class="color-demo" style="background-color: var(--sl-color-warning-30);"></div> |
| `--sl-color-warning-35` | <div class="color-demo" style="background-color: var(--sl-color-warning-35);"></div> |
| `--sl-color-warning-40` | <div class="color-demo" style="background-color: var(--sl-color-warning-40);"></div> |
| `--sl-color-warning-45` | <div class="color-demo" style="background-color: var(--sl-color-warning-45);"></div> |
| `--sl-color-warning-50` | <div class="color-demo" style="background-color: var(--sl-color-warning-50);"></div> |
| `--sl-color-warning-55` | <div class="color-demo" style="background-color: var(--sl-color-warning-55);"></div> |
| `--sl-color-warning-60` | <div class="color-demo" style="background-color: var(--sl-color-warning-60);"></div> |
| `--sl-color-warning-65` | <div class="color-demo" style="background-color: var(--sl-color-warning-65);"></div> |
| `--sl-color-warning-70` | <div class="color-demo" style="background-color: var(--sl-color-warning-70);"></div> |
| `--sl-color-warning-75` | <div class="color-demo" style="background-color: var(--sl-color-warning-75);"></div> |
| `--sl-color-warning-80` | <div class="color-demo" style="background-color: var(--sl-color-warning-80);"></div> |
| `--sl-color-warning-85` | <div class="color-demo" style="background-color: var(--sl-color-warning-85);"></div> |
| `--sl-color-warning-90` | <div class="color-demo" style="background-color: var(--sl-color-warning-90);"></div> |
| `--sl-color-warning-95` | <div class="color-demo" style="background-color: var(--sl-color-warning-95);"></div> |

## Danger

| Token                  | Example                                                                             |
| ---------------------- | ----------------------------------------------------------------------------------- |
| `--sl-color-danger-5` | <div class="color-demo" style="background-color: var(--sl-color-danger-5);"></div> |
| `--sl-color-danger-10` | <div class="color-demo" style="background-color: var(--sl-color-danger-10);"></div> |
| `--sl-color-danger-15` | <div class="color-demo" style="background-color: var(--sl-color-danger-15);"></div> |
| `--sl-color-danger-20` | <div class="color-demo" style="background-color: var(--sl-color-danger-20);"></div> |
| `--sl-color-danger-25` | <div class="color-demo" style="background-color: var(--sl-color-danger-25);"></div> |
| `--sl-color-danger-30` | <div class="color-demo" style="background-color: var(--sl-color-danger-30);"></div> |
| `--sl-color-danger-35` | <div class="color-demo" style="background-color: var(--sl-color-danger-35);"></div> |
| `--sl-color-danger-40` | <div class="color-demo" style="background-color: var(--sl-color-danger-40);"></div> |
| `--sl-color-danger-45` | <div class="color-demo" style="background-color: var(--sl-color-danger-45);"></div> |
| `--sl-color-danger-50` | <div class="color-demo" style="background-color: var(--sl-color-danger-50);"></div> |
| `--sl-color-danger-55` | <div class="color-demo" style="background-color: var(--sl-color-danger-55);"></div> |
| `--sl-color-danger-60` | <div class="color-demo" style="background-color: var(--sl-color-danger-60);"></div> |
| `--sl-color-danger-65` | <div class="color-demo" style="background-color: var(--sl-color-danger-65);"></div> |
| `--sl-color-danger-70` | <div class="color-demo" style="background-color: var(--sl-color-danger-70);"></div> |
| `--sl-color-danger-75` | <div class="color-demo" style="background-color: var(--sl-color-danger-75);"></div> |
| `--sl-color-danger-80` | <div class="color-demo" style="background-color: var(--sl-color-danger-80);"></div> |
| `--sl-color-danger-85` | <div class="color-demo" style="background-color: var(--sl-color-danger-85);"></div> |
| `--sl-color-danger-90` | <div class="color-demo" style="background-color: var(--sl-color-danger-90);"></div> |
| `--sl-color-danger-95` | <div class="color-demo" style="background-color: var(--sl-color-danger-95);"></div> |
