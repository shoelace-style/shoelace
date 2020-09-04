# Changelog

## 2.0.0-beta.17

- Added `minlength` and `spellcheck` attributes to `sl-textarea`
- Fixed a bug where clicking a tag in `sl-select` wouldn't toggle the menu
- Fixed a bug where options where `sl-select` options weren't always visible or scrollable
- Fixed a bug where setting `null` on `sl-input`, `sl-textarea`, or `sl-select` would throw an error
- Fixed a bug where `role` was on the wrong element and aria attribute weren't explicit in `sl-checkbox`, `sl-switch`, and `sl-radio`
- Fixed a bug where dynamically adding/removing a slot wouldn't work as expected in `sl-card`, `sl-dialog`, and `sl-drawer`
- Fixed a bug where the value wasn't updated and events weren't emitted when using `setRangeText` in `sl-input` and `sl-textarea`
- Updated `bootstrap-icons` to 1.0.0 with many icons redrawn and improved
- Optimized `hasSlot` utility by using a simpler selector

**Form validation has been reworked and is much more powerful now!**

- The `invalid` prop now reflects the control's validity as determined by the browser's constraint validation API
- Added `required` to `sl-checkbox`, `sl-select`, and `sl-switch`
- Added `reportValidity()` and `setCustomValidity()` methods to all form controls
- Added validation checking for custom and native form controls to `sl-form`
- Added `novalidate` prop to `sl-form` to disable validation
- Removed the `valid` prop from all form controls
- Removed valid and invalid design tokens and related styles (you can use your own custom styles to achieve this)

## 2.0.0-beta.16

- Add `hoist` prop to `sl-color-picker`, `sl-dropdown`, and `sl-select` to work around panel clipping
- Add `sl-format-bytes` utility component
- Add `clearable` and `required` props to `sl-select`
- Add `slClear` event to `sl-input`
- Added keyboard support to the preview resizer in the docs
- Fixed a bug where the `aria-selected` state was incorrect in `sl-menu-item`
- Fixed a bug where custom properties applied to `sl-tooltip` didn't affect show/hide transitions
- Fixed a bug where `--sl-input-color-*` custom properties had no affect on `sl-input` and `sl-textarea`
- Refactored `sl-dropdown` and `sl-tooltip` to use positioner elements so panels/tooltips can be customized easier

## 2.0.0-beta.15

- Added `image-comparer` component
- Added `--width`, `--height`, and `--thumb-size` custom props to `sl-switch`
- Fixed an `aria-labelledby` attribute typo in a number of components
- Fixed a bug where the `change` event wasn't updating the value in `sl-input`
- Fixed a bug where `sl-color-picker` had the wrong border color in the dark theme
- Fixed a bug where `sl-menu-item` had the wrong color in dark mode when disabled
- Fixed a bug where WebKit's autocomplete styles made inputs looks broken
- Fixed a bug where aria labels were wrong in `sl-select`
- Fixed a bug where clicking the label wouldn't focus the control in `sl-select`

## 2.0.0-beta.14

- Added dark theme
- Added `--sl-panel-background-color` and `--sl-panel-border-color` tokens
- Added `--tabs-border-color` custom property to `sl-tab-group`
- Added `--track-color` custom property to `sl-range`
- Added `tag` part to `sl-select`
- Updated `package.json` so custom elements imports can be consumed from the root
- Fixed a bug where scrolling dialogs didn't resize properly in Safari
- Fixed a bug where `slShow` and `slHide` would be emitted twice in some components
- Fixed a bug where `custom-elements/index.d.ts` was broken due to an unclosed comment (fixed in Stencil 1.17.3)
- Fixed bug where inputs were not using border radius tokens
- Fixed a bug where the text color was being erroneously set in `sl-progress-ring`
- Fixed a bug where `sl-progress-bar` used the wrong part name internally for `indicator`
- Removed background color from `sl-menu`
- Updated to Stencil 1.17.3

## 2.0.0-beta.13

- Added `slActivate` and `slDeactivate` events to `sl-menu-item`
- Added experimental `sl-animation` component
- Added shields to documentation
- Fixed a bug where link buttons would have `type="button"`
- Fixed a bug where button groups with tooltips experienced an odd spacing issue in Safari
- Fixed a bug where scrolling in dropdowns/selects didn't work properly on Windows (special thanks to [Trendy](http://github.com/trendy) for helping troubleshoot!)
- Fixed a bug where selecting a menu item in a dropdown would cause Safari to scroll
- Fixed a bug where type to select wouldn't accept symbols
- Moved scrolling logic from `sl-menu` to `sl-dropdown`

## 2.0.0-beta.12

- Added support for `href`, `target`, and `download` to buttons
- Fixed a bug where buttons would have horizontal spacing in Safari
- Fixed a bug that caused an import resolution error when using Shoelace in a Stencil app

## 2.0.0-beta.11

- Added button group component
- Fixed icon button alignment
- Fixed a bug where focus visible observer wasn't removed from `sl-details`
- Replaced the deprecated `componentDidUnload` lifecycle method with `disconnectedCallback` to prevent issues with frameworks

## 2.0.0-beta.10

- Added community page to the docs
- Fixed a bug where many components would erroneously receive an `id` when using the custom elements bundle
- Fixed a bug where tab groups weren't scrollable with the mouse

## 2.0.0-beta.9

- Added the icon button component
- Added the skeleton component
- Added the `typeToSelect` method to menu so type-to-select behavior can be controlled externally
- Added the `pulse` prop to badge
- Fixed a bug where hovering over select showed the wrong cursor
- Fixed a bug where tabbing into a select control would highlight the label
- Fixed a bug where tabbing out of a select control wouldn't close it
- Fixed a bug where closing dropdowns wouldn't give focus back to the trigger
- Fixed a bug where type-to-select wasn't working after the first letter
- Fixed a bug where clicking on menu items and dividers would steal focus from the menu
- Fix a bug where the color picker wouldn't parse uppercase values
- Removed `noFooter` prop from dialog and drawer (slot detection is automatic, so the prop is not required)
- Removed `close-icon` slot from alert
- Replaced make-shift icon buttons with `sl-icon-button` in alert, dialog, drawer, and tag
- Updated Stencil to 1.17.1
- Switched to jsDelivr for better CDN performance

## 2.0.0-beta.8

- Added the card component
- Added `--focus-ring` custom property to tab
- Fixed a bug where range tooltips didn't appear on iOS
- Fixed constructor bindings so they don't break the custom elements bundle
- Fixed tag color contrast to be AA compliant
- Fixed a bug that made it difficult to vertically align rating
- Fixed a bug where dropdowns would always close on mousedown when inside a shadow root
- Made tag text colors AA compliant
- Promoted badge to stable
- Refactored `:host` variables and moved non-display props to base elements
- Refactored event handler bindings to occur in `connectedCallback` instead of the constructor
- Refactored scroll locking logic to use `Set` instead of an array
- Updated the custom elements bundle documentation and added bundler examples
- Upgraded Stencil to 1.17.0-0 (next) to fix custom elements bundle

## 2.0.0-beta.7

- Added links to version 1 resources to the docs
- Added rating component
- Fixed a bug where some build files were missing
- Fixed clearable tags demo
- Fixed touch icon size in docs

## 2.0.0-beta.6

- Enabled the `dist-custom-elements-bundle` output target
- Fixed a bug where nested form controls were ignored in `<sl-form>`

## 2.0.0-beta.5

- Fixed bug where `npm install` would fail due to postinstall script
- Removed unused dependency

## 2.0.0-beta.4

- Added `pill` variation to badges
- Fixed a bug where all badges had `pointer-events: none`
- Fixed `@since` props to show 2.0 instead of 1.0
- Fixed giant cursors in inputs in Safari
- Fixed color picker input width in Safari
- Fixed initial transitions for drawer, dialog, and popover consumers
- Fixed a bug where dialog, dropdown, and drawer would sometimes not transition in on the first open
- Fixed various documentation typos

## 2.0.0-beta.3

- Fix version in docs
- Remove custom elements bundle

## 2.0.0-beta.2

- Fix quick start and installation URLs
- Switch Docsify theme
- Update line heights tokens

## 2.0.0-beta.1

- Initial release
