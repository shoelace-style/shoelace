# More Design Tokens

All of the design tokens described herein are considered relatively stable. However, some changes might occur in future versions to address mission critical bugs or improvements. If such changes occur, they _will not_ be considered breaking changes and will be clearly documented in the [changelog](/resources/changelog).

Most design tokens are consistent across the light and dark theme. Those that vary will show both values.

?> Currently, the source of design tokens is considered to be [`light.css`](https://github.com/shoelace-style/shoelace/blob/next/src/themes/light.css). The dark theme, [dark.css](https://github.com/shoelace-style/shoelace/blob/next/src/themes/dark.css), mirrors all of the same tokens with dark mode-specific values where appropriate. Work is planned to move all design tokens to a single file, perhaps JSON or YAML, in the near future.

## Focus Rings

Focus ring tokens control the appearance of focus rings. Note that form inputs use `--sl-input-focus-ring-*` tokens instead.

| Token                    | Value                                                                                 |
| ------------------------ | ------------------------------------------------------------------------------------- |
| `--sl-focus-ring-color`  | var(--sl-color-primary-600) (light theme)<br>var(--sl-color-primary-700) (dark theme) |
| `--sl-focus-ring-style`  | solid                                                                                 |
| `--sl-focus-ring-width`  | 3px                                                                                   |
| `--sl-focus-ring`        | var(--sl-focus-ring-style) var(--sl-focus-ring-width) var(--sl-focus-ring-color)      |
| `--sl-focus-ring-offset` | 1px                                                                                   |

## Buttons

Button tokens control the appearance of buttons. In addition, buttons also currently use some form input tokens such as `--sl-input-height-*` and `--sl-input-border-*`. More button tokens may be added in the future to make it easier to style them more independently.

| Token                          | Value                       |
| ------------------------------ | --------------------------- |
| `--sl-button-font-size-small`  | var(--sl-font-size-x-small) |
| `--sl-button-font-size-medium` | var(--sl-font-size-small)   |
| `--sl-button-font-size-large`  | var(--sl-font-size-medium)  |

## Form Inputs

Form input tokens control the appearance of form controls such as [input](/components/input), [select](/components/select), [textarea](/components/textarea), etc.

| Token                                   | Value                            |
| --------------------------------------- | -------------------------------- |
| `--sl-input-height-small`               | 1.875rem; (30px @ 16px base)     |
| `--sl-input-height-medium`              | 2.5rem; (40px @ 16px base)       |
| `--sl-input-height-large`               | 3.125rem; (50px @ 16px base)     |
| `--sl-input-background-color`           | var(--sl-color-neutral-0)        |
| `--sl-input-background-color-hover`     | var(--sl-input-background-color) |
| `--sl-input-background-color-focus`     | var(--sl-input-background-color) |
| `--sl-input-background-color-disabled`  | var(--sl-color-neutral-100)      |
| `--sl-input-border-color`               | var(--sl-color-neutral-300)      |
| `--sl-input-border-color-hover`         | var(--sl-color-neutral-400)      |
| `--sl-input-border-color-focus`         | var(--sl-color-primary-500)      |
| `--sl-input-border-color-disabled`      | var(--sl-color-neutral-300)      |
| `--sl-input-border-width`               | 1px                              |
| `--sl-input-required-content`           | "\*"                             |
| `--sl-input-required-content-offset`    | -2px                             |
| `--sl-input-required-content-color`     | var(--sl-input-label-color)      |
| `--sl-input-border-radius-small`        | var(--sl-border-radius-medium)   |
| `--sl-input-border-radius-medium`       | var(--sl-border-radius-medium)   |
| `--sl-input-border-radius-large`        | var(--sl-border-radius-medium)   |
| `--sl-input-font-family`                | var(--sl-font-sans)              |
| `--sl-input-font-weight`                | var(--sl-font-weight-normal)     |
| `--sl-input-font-size-small`            | var(--sl-font-size-small)        |
| `--sl-input-font-size-medium`           | var(--sl-font-size-medium)       |
| `--sl-input-font-size-large`            | var(--sl-font-size-large)        |
| `--sl-input-letter-spacing`             | var(--sl-letter-spacing-normal)  |
| `--sl-input-color`                      | var(--sl-color-neutral-700)      |
| `--sl-input-color-hover`                | var(--sl-color-neutral-700)      |
| `--sl-input-color-focus`                | var(--sl-color-neutral-700)      |
| `--sl-input-color-disabled`             | var(--sl-color-neutral-900)      |
| `--sl-input-icon-color`                 | var(--sl-color-neutral-500)      |
| `--sl-input-icon-color-hover`           | var(--sl-color-neutral-600)      |
| `--sl-input-icon-color-focus`           | var(--sl-color-neutral-600)      |
| `--sl-input-placeholder-color`          | var(--sl-color-neutral-500)      |
| `--sl-input-placeholder-color-disabled` | var(--sl-color-neutral-600)      |
| `--sl-input-spacing-small`              | var(--sl-spacing-small)          |
| `--sl-input-spacing-medium`             | var(--sl-spacing-medium)         |
| `--sl-input-spacing-large`              | var(--sl-spacing-large)          |
| `--sl-input-focus-ring-color`           | hsl(198.6 88.7% 48.4% / 40%)     |
| `--sl-input-focus-ring-offset`          | 0                                |

## Filled Form Inputs

Filled form input tokens control the appearance of form controls using the `filled` variant.

| Token                                         | Value                       |
| --------------------------------------------- | --------------------------- |
| `--sl-input-filled-background-color`          | var(--sl-color-neutral-100) |
| `--sl-input-filled-background-color-hover`    | var(--sl-color-neutral-100) |
| `--sl-input-filled-background-color-focus`    | var(--sl-color-neutral-100) |
| `--sl-input-filled-background-color-disabled` | var(--sl-color-neutral-100) |
| `--sl-input-filled-color`                     | var(--sl-color-neutral-800) |
| `--sl-input-filled-color-hover`               | var(--sl-color-neutral-800) |
| `--sl-input-filled-color-focus`               | var(--sl-color-neutral-700) |
| `--sl-input-filled-color-disabled`            | var(--sl-color-neutral-800) |

## Form Labels

Form label tokens control the appearance of labels in form controls.

| Token                               | Value                      |
| ----------------------------------- | -------------------------- |
| `--sl-input-label-font-size-small`  | var(--sl-font-size-small)  |
| `--sl-input-label-font-size-medium` | var(--sl-font-size-medium) |
| `--sl-input-label-font-size-large`  | var(--sl-font-size-large)  |
| `--sl-input-label-color`            | inherit                    |

## Help Text

Help text tokens control the appearance of help text in form controls.

| Token                                   | Value                       |
| --------------------------------------- | --------------------------- |
| `--sl-input-help-text-font-size-small`  | var(--sl-font-size-x-small) |
| `--sl-input-help-text-font-size-medium` | var(--sl-font-size-small)   |
| `--sl-input-help-text-font-size-large`  | var(--sl-font-size-medium)  |
| `--sl-input-help-text-color`            | var(--sl-color-neutral-500) |

## Toggles

Toggle tokens control the appearance of toggles such as [checkbox](/components/checkbox), [radio](/components/radio), [switch](/components/switch), etc.

| Token                     | Value                       |
| ------------------------- | --------------------------- |
| `--sl-toggle-size-small`  | 0.875rem (14px @ 16px base) |
| `--sl-toggle-size-medium` | 1.125rem (18px @ 16px base) |
| `--sl-toggle-size-large`  | 1.375rem (22px @ 16px base) |

## Overlays

Overlay tokens control the appearance of overlays as used in [dialog](/components/dialog), [drawer](/components/drawer), etc.

| Token                           | Value                     |
| ------------------------------- | ------------------------- |
| `--sl-overlay-background-color` | hsl(240 3.8% 46.1% / 33%) |

## Panels

Panel tokens control the appearance of panels such as those used in [dialog](/components/dialog), [drawer](/components/drawer), [menu](/components/menu), etc.

| Token                         | Value                       |
| ----------------------------- | --------------------------- |
| `--sl-panel-background-color` | var(--sl-color-neutral-0)   |
| `--sl-panel-border-color`     | var(--sl-color-neutral-200) |
| `--sl-panel-border-width`     | 1px                         |

## Tooltips

Tooltip tokens control the appearance of tooltips. This includes the [tooltip](/components/tooltip) component as well as other implementations, such [range tooltips](/components/range).

| Token                           | Value                                                |
| ------------------------------- | ---------------------------------------------------- |
| `--sl-tooltip-border-radius`    | var(--sl-border-radius-medium)                       |
| `--sl-tooltip-background-color` | var(--sl-color-neutral-800)                          |
| `--sl-tooltip-color`            | var(--sl-color-neutral-0)                            |
| `--sl-tooltip-font-family`      | var(--sl-font-sans)                                  |
| `--sl-tooltip-font-weight`      | var(--sl-font-weight-normal)                         |
| `--sl-tooltip-font-size`        | var(--sl-font-size-small)                            |
| `--sl-tooltip-line-height`      | var(--sl-line-height-dense)                          |
| `--sl-tooltip-padding`          | var(--sl-spacing-2x-small) var(--sl-spacing-x-small) |
| `--sl-tooltip-arrow-size`       | 6px                                                  |
