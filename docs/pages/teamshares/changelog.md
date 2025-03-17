---
meta:
  title: Changelog
---

# Changelog

## 2.4.0

- Add `percentage` type to `sl-input` to make it easier to add a `%` suffix for inputs rendered with `ts_form_for`
- Add documentation for `UI::Drawer::Component` to the Drawer component docs
- Fix small UI bug for Drawer component close icon
- Move `sl-icon-button` styles from the overrides stylesheet into the `sl-dialog` and `sl-drawer` stylesheets
- Update styles for `sl-button variant="success" outline` to match other variants

## 2.3.2

- Dependency update (Figma Code Connect to 1.3.1)

## 2.3.1

- Dependency update for package security patch

## 2.3.0

- Documentation and Figma Code Connect updates (no visible changes to components)
  - Set up Figma Code Connect for some components
  - Add Cypress testing docs to several form-related components
  - Add separate `TS Form` code example panel for components that can be rendered with `ts_form_for`
  - Update string syntax in Slim code examples to use boolean (e.g. `open=true` instead of `open='true'`)
  - Add code example for `sl-drawer` opened from `sl-dropdown` with button trigger
- Minor component styling updates
  - Update `sl-divider` default color
  - Update size of close icon (x) in `sl-alert`
  - Update `sl-tag` font weight to medium
  - Update spacing and hover state for `sl-tab-group` and `sl-tab` to match ViewComponent Tab

## 2.2.1

- Bump to update `package-lock.json` file + update docs to make sure this step isn't forgotten next time

## 2.2.0

- Update `text` variant of `sl-button` to strip all padding so that it aligns better with other elements on the screen
- Add Link page for documentation of default link style and link button options
- Fix `sl-checkbox` and `sl-radio` bug where a `contained` checkbox or radio had a hover state even when disabled
- Fix padding cascade bug for `sl-dialog` body for `announcement` variant
- Fix `sl-button` bug where a disabled link (`a`) button still opens the `href` link
- Misc doc site improvements
  - Update props tables to be more readable with no scrolling
  - Add "no footer" and default width examples to `sl-dialog` docs
  - Fix bug where Event names are hidden when `SLIM` preview is selected
  - Fix bug where icon doesn't display for component properties where `reflect` is `true`
  - Fix bug where some pages don't have a page title showing in the sidebar

## 2.1.2

- Fix to fix spacing for `sl-checkbox` when nested in `sl-checkbox-group` with Simple Form (`ts_form_for`)

## 2.1.1

- Minor updates to `sl-checkbox-group`
  - Update how checkbox group value is stored, to match how the Simple Form checkboxes collection stores values
  - Update `sl-checkbox` styling so that if the parent Checkbox Group is `data-user-invalid`, all slotted checkboxes in the group are styled as `data-user-invalid`
- Misc bug fixes 🐞
  - Remove margin-top from `sl-checkbox` when not nested in a `sl-checkbox-group`
  - Remove unnecessary padding from `sl-dialog` with header icon for mobile screens
  - Fix wrong class reference for `sl-checkbox-group` (was using `sl-radio-group` class)
- Minor doc site example updates to `Checkbox Group` and `Checkbox`
- Update doc site sidebar link to Github to always point to `teamshares/shoelace` rather than a (wrong) tag

## 2.1.0

- Upstream merge, going from 2.11.2 -> 2.14.0. Most of the changes are pretty minor. See the [upstream changelog](https://shoelace.style/resources/changelog) for details.
- Also the following component and documentation page updates:
  - Alert
    - Change default `sl-toast-stack` placement from top right to bottom right
    - Update examples to better align with our pattern usage
  - Checkbox and Checkbox Group
    - Add new `sl-checkbox-group` component with form component decorators (help text, label with tooltip, context note) and `contained` and `horizontal` options
    - Update `sl-checkbox` to make it work with new `sl-checkbox-group`
  - Dialog
    - Add more examples
    - Fix bottom spacing for no-footer dialog
    - Fix body spacing for dialog with header icon
    - Make body style consistent (`body-1`) across all dialog sizes
    - Update body text color to `ts-text-default` (from `ts-text-subdued`)
  - Input
    - Add `label-tooltip` and `context-note` slots and attributes
    - Add new type `currency` with default prefix and suffix elements
    - Add default prefix icon options to types `email`, `tel`, and `search`
    - Update documentation examples to call out or hide unused patterns (`pill`, `filled`, size `small`)
    - Add icon & usage guidelines
    - Moved styles from `overrides.css` into component `styles.ts` file
    - Minor styling updates
  - Menu, Menu Item, Menu Label
    - Update documentation examples
    - Add icon guidelines
    - Moved styles from `overrides.css` into component `styles.ts` file
    - Minor styling updates
  - Option
    - Update documentation examples
    - Add icon guidelines
    - Moved styles from `overrides.css` into component `styles.ts` file
    - Minor styling updates
  - Radio and Radio Group
    - Add `horizontal` layout option to Radio Group
    - Add new form component decorators help text, label with tooltip, context note)
  - Select
    - Add `label-tooltip` and `context-note` slots and attributes
    - Update documentation examples to call out or hide unused patterns (`pill`, `filled`, size `small`)
    - Add icon & usage guidelines
    - Moved styles from `overrides.css` into component `styles.ts` file
    - Minor styling updates
  - Switch
    - Add new `label-position` options: `left` and `left-justified`
    - Update examples
  - Textarea
    - Add `label-tooltip` and `context-note` slots and attributes
    - Update documentation examples to call out or hide unused patterns (`filled`, sizes `small`, `large`)
    - Moved styles from `overrides.css` into component `styles.ts` file
    - Minor styling updates
  - Misc
    - Bump Font Awesome registry to v6.5.0
    - Replace system icons with Font Awesome svgs
      - `eye`, `eye-slash` (used in `password` Input)
      - `x-circle-fill` (used in `clearable` Input)
      - `chevron-down` (used in Select)
      - `checked` (used in Checkbox)
      - `x-lg` (used in Alert, Dialog, Drawer, Tab, and Tag)
    - Add new system icon `checked-option` for use in Option and Menu to show selected options and menu items

## 2.0.2

- Fix: `sl-spinner` not rendering correctly in Safari

## 2.0.1

- Fix: Support for clickable links and buttons in the `summary` slot of `sl-details`.
- Improved design for `sl-spinner`
- Added CODEOWNERS to automatically tag reviewers

## 2.0.0

- **MASSIVE** set of changes from upstream (jumping from 2.5.0 > 2.11.2). This included a big restructuring of the codebase in upstream 2.6.0, which moved the component code into separate `name.component.ts` files. Lots of other files got moved around, the build process changed, and the docs site is now using eleventy. Please see the upstream change logs for more details.
- Also the following component and documentation page updates:
  - Badge
    - Update styling
    - Add new color theme variants: red (default) and gray
    - Map existing semantic variants to newly added colors (neutral = gray, danger = red)
    - Make `pill` option the default; add `square` boolean to display a square badge
      - If you were previously using the `pill` boolean to display a pill badge, you can now delete that boolean from your `sl-badge`.
      - If you were previously using the default square badge, you’ll need to add a `square` boolean to get the square badge back. (Note: The square badge is not a standard Teamshares Design System pattern, so please check with the designer on your team about this usage).
    - Add new value attribute to auto-format numbers > 99
  - Button
    - Move styles from overrides.css into main component styles file
    - Update styling for default outline button so that it can be used for the Radio Button (segmented radio)
  - Card
    - Update styling (increase header padding)
  - Dialog
    - Move styles from overrides.css into main component styles file
    - Add new sizes: small, medium (default), large
    - Add new type variants: default (default), warning, announcement
    - Add optional header-icon slot to display an icon to the left of the dialog title
  - Tooltip
    - Update styling
  - Docs
    - Add new usage guidelines to Alert, Badge, and Tag
    - Update examples / hide irrelevant examples from doc pages for Badge, Breadcrumb, Breadcrumb Item,Card, Details (Collapsible card), Dialog (Modal), Icon
    - Add helper tips and warning alerts above examples to highlight patterns that are available with Shoelace but aren’t standard options for the Teamshares Design System
    - Show alert above Properties table when component has unused properties (to discourage use of properties that still work but aren’t part of the Teamshares Design System)

## 1.3.1

- Button
  - Remove default icon size increase for small buttons

## 1.3.0

- Alert
  - Update styling
  - Add optional `header` slot
- Breadcrumb
  - Update styling
  - Change default separator to `/`
- Card
  - Add `noShadow` boolean
- Details
  - Add `shadow` boolean
- Tab
  - Update styling
- Tag
  - Update styling
  - Add new color variants: `blue`, `green`, `gray`, `yellow`, `red`, `teal`, `fuchsia`, `purple`
  - Map existing semantic variants to new colors (`primary` = `blue`, `success` = `green`, `neutral` = `gray`, `warning` = `yellow`, `danger` = `red`)
- Docs
  - Add new Styles pages for Spacing, Elevation, Border Radius
  - Add design pattern and Figma component status badges to all components
  - Force site to always display light theme

## 1.2.3

- Fix for missing generated CSS tokens
- Minor docs quotation fix

## 1.2.2

- Utilities now export a method to automatically register FontAwesome icon libraries
- Slim template formatting for CodePen examples
- Tokens and overrides included in CodePen examples
- New export of tokens.json to be consumed by shared-ui as part of config
- CSS tokens generated automatically from the tokens.json

## 1.2.1

- Fix focus issue on inputs caused by Tailwind
- Use Font Awesome in doc sites

## 1.2.0

- Updated to upstream [2.4.0](/resources/changelog)
- Docs redesign (courtesy of Sara H)
- Improved Font Awesome documentation
- A couple additional commits from upstream/next including:
  - Buttons allow variable height children
  - Documentation of radio button sizing

## 1.1.1

- Increase padding for details
- Fix details example for alternate icons

## 1.1.0

- Checkbox
  - Added `contained` modifier to wrap the checkbox in a container
  - Added `description` slot to appear in smaller text below the `label`
- Radio
  - Added `contained` modifier to wrap the radio in a container
  - Added `description` slot to appear in smaller text below the `label`

## 1.0.7

- Increase icon size for small buttons

## 1.0.6

- Another fix for exports / imports in shared-ui

## 1.0.5

- Minor, attempting to fix imports in `shared-ui`

## 1.0.4

- Updated to upstream [2.1.0](/resources/changelog)
- Added teal color tokens
- Modified exports to allow pulling in tokens more easily
- Added Slim code to all docs

## 1.0.3

- Pulled in upstream fixes on `next` branch, including fixes for `dropdown` and `select`
- Hide shoelace elements until they are defined (FOUCE)
- Fixes for Tailwind resets that broke menu styling

## 1.0.2

- Updated to upstream [release 2.0.0](/resources/changelog)
  - First stable release
  - Some fixes for selects and form elements
- Migrated tokens and overrides from `shared-ui`
  - This repo is now the source of truth for tokens and override styles
- Updated Heroicons to 2.0.14
  - No significant changes, just keeping up with upstream

## 1.0.1-alpha.4

- Updated to upstream [version 2.0.0-beta.88](/resources/changelog)
  - Includes breaking change to `sl-select`
- Button
  - Pill button is now default
  - Added `square` modifier to get rounded-rectangle shape
  - Added `x-large` size
- Docs
  - Removed unused button styles
  - Added Teamshares section
  - Updated style overrides
