# Color Tokens

Color tokens are used to maintain consistent color use throughout your app.

## Theme Colors

Theme colors include primary, gray, success, info, warning, and danger. They are used extensively throughout the library to maintain a consistent appearance across components.

This will make all colors in the primary color palette various shades of purple.

```css
:root {
  /* Changes the primary color palette to purple */
  --sl-color-primary-50: #faf5ff;
  --sl-color-primary-100: #f3e8ff;
  --sl-color-primary-200: #e9d5ff;
  --sl-color-primary-300: #d8b4fe;
  --sl-color-primary-400: #c084fc;
  --sl-color-primary-500: #a855f7;
  --sl-color-primary-600: #9333ea;
  --sl-color-primary-700: #7e22ce;
  --sl-color-primary-800: #6b21a8;
  --sl-color-primary-900: #581c87;
}
```

?> Although CSS lets you override custom properties on specific elements, these values _must_ be scoped to the `:root` block for the entire palette to be recalculated. [See this page for details.](https://stackoverflow.com/questions/52015737/css-scoped-custom-property-ignored-when-used-to-calculate-variable-in-outer-scop)

## Primary

| Token                    | Example                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------- |
| `--sl-color-primary-50`  | <div class="color-demo" style="background-color: var(--sl-color-primary-50);"></div>  |
| `--sl-color-primary-100` | <div class="color-demo" style="background-color: var(--sl-color-primary-100);"></div> |
| `--sl-color-primary-200` | <div class="color-demo" style="background-color: var(--sl-color-primary-200);"></div> |
| `--sl-color-primary-300` | <div class="color-demo" style="background-color: var(--sl-color-primary-300);"></div> |
| `--sl-color-primary-400` | <div class="color-demo" style="background-color: var(--sl-color-primary-400);"></div> |
| `--sl-color-primary-500` | <div class="color-demo" style="background-color: var(--sl-color-primary-500);"></div> |
| `--sl-color-primary-600` | <div class="color-demo" style="background-color: var(--sl-color-primary-600);"></div> |
| `--sl-color-primary-700` | <div class="color-demo" style="background-color: var(--sl-color-primary-700);"></div> |
| `--sl-color-primary-800` | <div class="color-demo" style="background-color: var(--sl-color-primary-800);"></div> |
| `--sl-color-primary-900` | <div class="color-demo" style="background-color: var(--sl-color-primary-900);"></div> |
| `--sl-color-primary-950` | <div class="color-demo" style="background-color: var(--sl-color-primary-950);"></div> |

## Gray

| Token                    | Example                                                                         |
| ------------------------ | ------------------------------------------------------------------------------- |
| `--sl-color-white`    | <div class="color-demo" style="background-color: var(--sl-color-white);"></div>    |
| `--sl-color-gray-50`  | <div class="color-demo" style="background-color: var(--sl-color-gray-50);"></div>  |
| `--sl-color-gray-100` | <div class="color-demo" style="background-color: var(--sl-color-gray-100);"></div> |
| `--sl-color-gray-200` | <div class="color-demo" style="background-color: var(--sl-color-gray-200);"></div> |
| `--sl-color-gray-300` | <div class="color-demo" style="background-color: var(--sl-color-gray-300);"></div> |
| `--sl-color-gray-400` | <div class="color-demo" style="background-color: var(--sl-color-gray-400);"></div> |
| `--sl-color-gray-500` | <div class="color-demo" style="background-color: var(--sl-color-gray-500);"></div> |
| `--sl-color-gray-600` | <div class="color-demo" style="background-color: var(--sl-color-gray-600);"></div> |
| `--sl-color-gray-700` | <div class="color-demo" style="background-color: var(--sl-color-gray-700);"></div> |
| `--sl-color-gray-800` | <div class="color-demo" style="background-color: var(--sl-color-gray-800);"></div> |
| `--sl-color-gray-900` | <div class="color-demo" style="background-color: var(--sl-color-gray-900);"></div> |
| `--sl-color-gray-950` | <div class="color-demo" style="background-color: var(--sl-color-gray-950);"></div> |
| `--sl-color-black`    | <div class="color-demo" style="background-color: var(--sl-color-black);"></div>    |

## Success

| Token                    | Example                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------- |
| `--sl-color-success-50`  | <div class="color-demo" style="background-color: var(--sl-color-success-50);"></div>  |
| `--sl-color-success-100` | <div class="color-demo" style="background-color: var(--sl-color-success-100);"></div> |
| `--sl-color-success-200` | <div class="color-demo" style="background-color: var(--sl-color-success-200);"></div> |
| `--sl-color-success-300` | <div class="color-demo" style="background-color: var(--sl-color-success-300);"></div> |
| `--sl-color-success-400` | <div class="color-demo" style="background-color: var(--sl-color-success-400);"></div> |
| `--sl-color-success-500` | <div class="color-demo" style="background-color: var(--sl-color-success-500);"></div> |
| `--sl-color-success-600` | <div class="color-demo" style="background-color: var(--sl-color-success-600);"></div> |
| `--sl-color-success-700` | <div class="color-demo" style="background-color: var(--sl-color-success-700);"></div> |
| `--sl-color-success-800` | <div class="color-demo" style="background-color: var(--sl-color-success-800);"></div> |
| `--sl-color-success-900` | <div class="color-demo" style="background-color: var(--sl-color-success-900);"></div> |
| `--sl-color-success-950` | <div class="color-demo" style="background-color: var(--sl-color-success-950);"></div> |

## Info

| Token                    | Example                                                                         |
| ------------------------ | ------------------------------------------------------------------------------- |
| `--sl-color-info-50`  | <div class="color-demo" style="background-color: var(--sl-color-info-50);"></div>  |
| `--sl-color-info-100` | <div class="color-demo" style="background-color: var(--sl-color-info-100);"></div> |
| `--sl-color-info-200` | <div class="color-demo" style="background-color: var(--sl-color-info-200);"></div> |
| `--sl-color-info-300` | <div class="color-demo" style="background-color: var(--sl-color-info-300);"></div> |
| `--sl-color-info-400` | <div class="color-demo" style="background-color: var(--sl-color-info-400);"></div> |
| `--sl-color-info-500` | <div class="color-demo" style="background-color: var(--sl-color-info-500);"></div> |
| `--sl-color-info-600` | <div class="color-demo" style="background-color: var(--sl-color-info-600);"></div> |
| `--sl-color-info-700` | <div class="color-demo" style="background-color: var(--sl-color-info-700);"></div> |
| `--sl-color-info-800` | <div class="color-demo" style="background-color: var(--sl-color-info-800);"></div> |
| `--sl-color-info-900` | <div class="color-demo" style="background-color: var(--sl-color-info-900);"></div> |
| `--sl-color-info-950` | <div class="color-demo" style="background-color: var(--sl-color-info-950);"></div> |

## Warning

| Token                    | Example                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------- |
| `--sl-color-warning-50`  | <div class="color-demo" style="background-color: var(--sl-color-warning-50);"></div>  |
| `--sl-color-warning-100` | <div class="color-demo" style="background-color: var(--sl-color-warning-100);"></div> |
| `--sl-color-warning-200` | <div class="color-demo" style="background-color: var(--sl-color-warning-200);"></div> |
| `--sl-color-warning-300` | <div class="color-demo" style="background-color: var(--sl-color-warning-300);"></div> |
| `--sl-color-warning-400` | <div class="color-demo" style="background-color: var(--sl-color-warning-400);"></div> |
| `--sl-color-warning-500` | <div class="color-demo" style="background-color: var(--sl-color-warning-500);"></div> |
| `--sl-color-warning-600` | <div class="color-demo" style="background-color: var(--sl-color-warning-600);"></div> |
| `--sl-color-warning-700` | <div class="color-demo" style="background-color: var(--sl-color-warning-700);"></div> |
| `--sl-color-warning-800` | <div class="color-demo" style="background-color: var(--sl-color-warning-800);"></div> |
| `--sl-color-warning-900` | <div class="color-demo" style="background-color: var(--sl-color-warning-900);"></div> |
| `--sl-color-warning-950` | <div class="color-demo" style="background-color: var(--sl-color-warning-950);"></div> |

## Danger

| Token                    | Example                                                                             |
| ------------------------ | ----------------------------------------------------------------------------------- |
| `--sl-color-danger-50`  | <div class="color-demo" style="background-color: var(--sl-color-danger-50);"></div>  |
| `--sl-color-danger-100` | <div class="color-demo" style="background-color: var(--sl-color-danger-100);"></div> |
| `--sl-color-danger-200` | <div class="color-demo" style="background-color: var(--sl-color-danger-200);"></div> |
| `--sl-color-danger-300` | <div class="color-demo" style="background-color: var(--sl-color-danger-300);"></div> |
| `--sl-color-danger-400` | <div class="color-demo" style="background-color: var(--sl-color-danger-400);"></div> |
| `--sl-color-danger-500` | <div class="color-demo" style="background-color: var(--sl-color-danger-500);"></div> |
| `--sl-color-danger-600` | <div class="color-demo" style="background-color: var(--sl-color-danger-600);"></div> |
| `--sl-color-danger-700` | <div class="color-demo" style="background-color: var(--sl-color-danger-700);"></div> |
| `--sl-color-danger-800` | <div class="color-demo" style="background-color: var(--sl-color-danger-800);"></div> |
| `--sl-color-danger-900` | <div class="color-demo" style="background-color: var(--sl-color-danger-900);"></div> |
| `--sl-color-danger-950` | <div class="color-demo" style="background-color: var(--sl-color-danger-950);"></div> |