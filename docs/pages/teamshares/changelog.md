# Changelog

## 2.0.1

- Fix: Support for clickable links and buttons in the `summary` slot of `sl-details`.
- Improved design for `sl-spinner`
- Added CODEOWNERS to automatically tag reviewers

## 2.0.0

- **MASSIVE** set of changes from upstream (jumping from 2.5.0 > 2.11.2). This included a big restructuring of the codebase in upstream 2.6.0, which moved the component code into separate `name.component.ts` files. Lots of other files got moved around, the build process changed, and the docs site is now using eleventy. Please see the upstream change logs for more details.

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
