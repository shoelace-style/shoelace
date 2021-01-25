# Changelog

Shoelace follows [Semantic Versioning](https://semver.org/). Breaking changes in components with the <sl-badge type="primary" pill>Stable</sl-badge> badge will not be accepted until the next major version. As such, all contributions must consider the project's roadmap and take this into consideration. Features that are deemed no longer necessary will be deprecated but not removed.

Components with the <sl-badge type="warning" pill>Experimental</sl-badge> badge should not be used in production. They are made available as release candidates for development and testing purposes. As such, changes to experimental components will not be subject to semantic versioning.

_During the beta period, these restrictions may be relaxed in the event of a mission-critical bug._ 🐛

## Next

- Added `handle-icon` slot to `sl-image-comparer` [#311](https://github.com/shoelace-style/shoelace/issues/311)
- Fixed a bug in `sl-select` where removing a tag would toggle the dropdown
- Fixed a bug in `sl-input` and `sl-textarea` where the input might not exist when the value watcher is called [#313](https://github.com/shoelace-style/shoelace/issues/313)
- Updated `sl-menu-item` focus styles
- Updated `sl-select` so tags will wrap when `multiple` is true

## 2.0.0-beta.26

- 🚨 BREAKING CHANGE: Fixed animations bloat
  - Removed ~400 baked-in Animista animations because they were causing ~200KB of bloat (they can still be used with custom keyframes)
  - Reworked animations into a separate module ([`@shoelace-style/animations`](https://github.com/shoelace-style/animations)) so it's more maintainable and animations are sync with the latest version of animate.css
  - Animation and easing names are now camelcase (e.g. `easeInOut` instead of `ease-in-out`)
- Added initial E2E tests [#169](https://github.com/shoelace-style/shoelace/pull/169)
- Added the `FocusOptions` argument to all components that have a `setFocus()` method
- Added `sl-initial-focus` event to `sl-dialog` and `sl-drawer` so focus can be customized to a specific element
- Added `close-button` part to `sl-tab` so the close button can be customized
- Added `scroll-button` part to `sl-tab-group` so the scroll buttons can be customized
- Fixed a bug where `sl-hide` would be emitted twice when closing an alert with `hide()`
- Fixed a bug in `sl-color-picker` where the toggle button was smaller than the preview button in Safari
- Fixed a bug in `sl-tab-group` where activating a nested tab group didn't work properly [#299](https://github.com/shoelace-style/shoelace/issues/299)
- Fixed a bug in `sl-tab-group` where removing tabs would throw an error
- Fixed a bug in `sl-alert`, `sl-dialog`, `sl-drawer`, `sl-select`, and `sl-tag` where the close button's base wasn't exported so it couldn't be styled
- Removed `text` type from `sl-badge` as it was erroneously copied and never had styles
- Updated `sl-tab-group` so the `active` prop is reflected to the attribute
- Updated the docs to show dependencies instead of dependents which is much more useful when working with the custom elements bundle
- Updated to Bootstrap Icons 1.3.0

## 2.0.0-beta.25

- 🚨 BREAKING CHANGE: Reworked color tokens
  - Theme colors are now inspired by Tailwind's professionally-designed color palette
  - Color token variations now range from 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950
  - Color token variations were inverted, e.g. 50 is lightest and 950 is darkest
  - All component styles were adapted to use the new color tokens, but visual changes are subtle
  - The dark theme was adapted use the new color tokens
  - HSL is no longer used because it is not perceptually uniform (this may be revisited when all browsers support [LCH colors](https://lea.verou.me/2020/04/lch-colors-in-css-what-why-and-how/))
- 🚨 BREAKING CHANGE: Refactored `sl-select` to improve accessibility [#216](https://github.com/shoelace-style/shoelace/issues/216)
  - Removed the internal `sl-input` because it was causing problems with a11y and virtual keyboards
  - Removed `input`, `prefix` and `suffix` parts
- 🚨 BREAKING CHANGE: Removed `copy-button` part from `sl-color-picker` since copying is now done by clicking the preview
- Added `getFormattedValue()` method to `sl-color-picker` so you can retrieve the current value in any format
- Added visual separators between solid buttons in `sl-button-group`
- Added `help-text` prop to `sl-input`, `sl-textarea`, and `sl-select`
- Fixed a bug where moving the mouse while `sl-dropdown` is closing would remove focus from the trigger
- Fixed a bug where `sl-menu-item` didn't set a default color in the dark theme
- Fixed a bug where `sl-color-picker` preview wouldn't update in Safari
- Fixed a bug where removing an icon's `name` or `src` wouldn't remove the previously rendered SVG [#285](https://github.com/shoelace-style/shoelace/issues/285)
- Fixed a bug where disabled link buttons didn't appear disabled
- Improved button spacings and added split button example
- Improved elevation tokens in dark theme
- Improved accessibility in `sl-tooltip` by allowing escape to dismiss it [#219](https://github.com/shoelace-style/shoelace/issues/219)
- Improved slot detection in `sl-card`, `sl-dialog`, and `sl-drawer`
- Made `@types/resize-observer-browser` a dependency so users don't have to install it manually
- Refactored internal label + help text logic into a functional component used by `sl-input`, `sl-textarea`, and `sl-select`
- Removed `sl-blur` and `sl-focus` events from `sl-menu` since menus can't have focus as of 2.0.0-beta.22
- Updated `sl-spinner` so the indicator is more obvious
- Updated to Bootstrap Icons 1.2.2

## 2.0.0-beta.24

- Added `sl-format-date` component
- Added `indeterminate` state to `sl-progress-bar` [#274](https://github.com/shoelace-style/shoelace/issues/274)
- Added `--track-color`, `--indicator-color`, and `--label-color` to `sl-progress-bar` [#276](https://github.com/shoelace-style/shoelace/issues/276)
- Added `allow-scripts` prop to `sl-include` [#280](https://github.com/shoelace-style/shoelace/issues/280)
- Fixed a bug where `sl-menu-item` color variable was incorrect [#272](https://github.com/shoelace-style/shoelace/issues/272)
- Fixed a bug where `sl-dialog` and `sl-drawer` would emit the `sl-hide` event twice [#275](https://github.com/shoelace-style/shoelace/issues/275)
- Fixed a bug where calling `event.preventDefault()` on certain form elements wouldn't prevent `sl-form` from submitting [#277](https://github.com/shoelace-style/shoelace/issues/277)
- Fixed drag handle orientation in `sl-image-comparer`
- Restyled `sl-spinner` so the track is visible and the indicator is smaller.
- Removed `resize-observer-polyfill` in favor of `@types/resize-observer-browser` since all target browsers support `ResizeObserver`
- Upgraded the status of `sl-form`, `sl-image-comparer`, and `sl-include` from experimental to stable

## 2.0.0-beta.23

- Added `sl-format-number` component
- Added `sl-relative-time` component
- Added `closable` prop to `sl-tab`
- Added experimental `sl-resize-observer` utility
- Added experimental `sl-theme` utility and updated theming documentation
- Fixed a bug where `sl-menu-item` wouldn't render properly in the dark theme
- Fixed a bug where `sl-select` would show an autocomplete menu
- Improved placeholder contrast in dark theme
- Updated to Boostrap Icons 1.1.0
- Updated to Stencil 2.3.0

## 2.0.0-beta.22

- 🚨 BREAKING CHANGE: Refactored `sl-menu` and `sl-menu-item` to improve accessibility by using proper focus states [#217](https://github.com/shoelace-style/shoelace/issues/217)
  - Moved `tabindex` from `sl-menu` to `sl-menu-item`
  - Removed the `active` prop from `sl-menu-item` because synthetic focus states are bad for accessibility
  - Removed the `sl-activate` and `sl-deactivate` events from `sl-menu-item` (listen for `focus` and `blur` instead)
  - Updated `sl-select` so keyboard navigation still works
- Added `no-scroll-controls` prop to `sl-tab-group` [#253](https://github.com/shoelace-style/shoelace/issues/253)
- Fixed a bug where setting `open` initially wouldn't show `sl-dialog` or `sl-drawer` [#255](https://github.com/shoelace-style/shoelace/issues/255)
- Fixed a bug where `disabled` could be set when buttons are rendered as links
- Fixed a bug where hoisted dropdowns would render in the wrong position when placed inside `sl-dialog` [#252](https://github.com/shoelace-style/shoelace/issues/252)
- Fixed a bug where boolean aria attributes didn't explicitly set `true|false` string values in the DOM
- Fixed a bug where `aria-describedby` was never set on tooltip targets in `sl-tooltip`
- Fixed a bug where setting `position` on `sl-image-comparer` wouldn't update the divider's position
- Fixed a bug where the check icon was announced to screen readers in `sl-menu-item`
- Improved `sl-icon-button` accessibility by encouraging proper use of `label` and hiding the internal icon from screen readers [#220](https://github.com/shoelace-style/shoelace/issues/220)
- Improved `sl-dropdown` accessibility by attaching `aria-haspopup` and `aria-expanded` to the slotted trigger
- Refactored position logic to remove an unnecessary state variable in `sl-image-comparer`
- Refactored design tokens to use `rem` instead of `px` for input height and spacing [#221](https://github.com/shoelace-style/shoelace/issues/221)
- Removed `console.log` from modal utility
- Updated to Stencil 2.2.0

## 2.0.0-beta.21

- Added `label` slot to `sl-input`, `sl-select`, and `sl-textarea` [#248](https://github.com/shoelace-style/shoelace/issues/248)
- Added `label` slot to `sl-dialog` and `sl-drawer`
- Added experimental `sl-include` component
- Added status code to the `sl-error` event in `sl-icon`
- Fixed a bug where initial transitions didn't show in `sl-dialog` and `sl-drawer` [#247](https://github.com/shoelace-style/shoelace/issues/247)
- Fixed a bug where indeterminate checkboxes would maintain the indeterminate state when toggled
- Fixed a bug where concurrent active modals (i.e. dialog, drawer) would try to steal focus from each other
- Improved `sl-color-picker` grid and slider handles [#246](https://github.com/shoelace-style/shoelace/issues/246)
- Refactored `sl-icon` request logic and removed unused cache map
- Reworked show/hide logic in `sl-alert`, `sl-dialog`, and `sl-drawer` to not use reflow hacks and the `hidden` attribute
- Reworked slot logic in `sl-card`, `sl-dialog`, and `sl-drawer`
- Updated to Popper 2.5.3 to address a fixed position bug in Firefox 

## 2.0.0-beta.20

- 🚨 BREAKING CHANGE: Transformed all Shoelace events to lowercase ([details](#why-did-event-names-change))
- Added support for dropdowns and non-icon elements to `sl-input`
- Added `spellcheck` prop to `sl-input`
- Added `sl-icon-library` to allow custom icon library registration
- Added `library` prop to `sl-icon` and `sl-icon-button`
- Added "Integrating with Rails" tutorial to the docs, courtesy of [ParamagicDev](https://github.com/ParamagicDev)
- Fixed a bug where `sl-progress-ring` rendered incorrectly when zoomed in Safari [#227](https://github.com/shoelace-style/shoelace/issues/227)
- Fixed a bug where tabbing into slotted elements closes `sl-dropdown` when used in a shadow root [#223](https://github.com/shoelace-style/shoelace/issues/223)
- Fixed a bug where scroll anchoring caused undesirable scrolling when `sl-details` are grouped

### Why did event names change?

Shoelace events were updated to use a lowercase, kebab-style naming convention. Instead of event names such as `slChange` and `slAfterShow`, you'll need to use `sl-change` and `sl-after-show` now.

This change was necessary to address a critical issue in frameworks that use DOM templates with declarative event bindings such as `<sl-button @slChange="handler">`. Due to HTML's case-insensitivity, browsers translate attribute names to lowercase, turning `@slChange` into `@slchange`, making it impossible to listen to `slChange`.

While declarative event binding is a non-standard feature, not supporting it would make Shoelace much harder to use in popular frameworks. To accommodate those users and provide a better developer experience, we decided to change the naming convention while Shoelace is still in beta.

The following pages demonstrate why this change was necessary.

- [This Polymer FAQ from Custom Elements Everywhere](https://custom-elements-everywhere.com/#faq-polymer)
- [Vue's Event Names documentation](https://vuejs.org/v2/guide/components-custom-events.html#Event-Names)

## 2.0.0-beta.19

- Added `input`, `label`, `prefix`, `clear-button`, `suffix`, `help-text` exported parts to `sl-select` to make the input customizable
- Added toast notifications through the `toast()` method on `sl-alert`
- Fixed a bug where mouse events would bubble up when `sl-button` was disabled, causing tooltips to erroneously appear
- Fixed a bug where pressing space would open and immediately close `sl-dropdown` panels in Firefox
- Fixed a bug where `sl-tooltip` would throw an error on init
- Fixed a bug in custom keyframes animation example
- Refactored clear logic in `sl-input`

## 2.0.0-beta.18

- Added `name` and `invalid` prop to `sl-color-picker`
- Added support for form submission and validation to `sl-color-picker`
- Added touch support to demo resizers in the docs
- Added `sl-responsive-embed` component
- Fixed a bug where swapping an animated element wouldn't restart the animation in `sl-animation`
- Fixed a bug where the cursor was incorrect when `sl-select` was disabled
- Fixed a bug where `slblur` and `slfocus` were emitted twice in `sl-select`
- Fixed a bug where clicking on `sl-menu` wouldn't focus it
- Fixed a bug in the popover utility where `onAfterShow` would fire too soon
- Fixed a bug where `bottom` and `right` placements didn't render properly in `sl-tab-group`
- Improved keyboard logic in `sl-dropdown`, `sl-menu`, and `sl-select`
- Updated `sl-animation` to stable
- Updated to Stencil 2.0 (you may need to purge `node_modules` and run `npm install` after pulling)
- Updated entry points in `package.json` to reflect new filenames generated by Stencil 2

## 2.0.0-beta.17

- Added `minlength` and `spellcheck` attributes to `sl-textarea`
- Fixed a bug where clicking a tag in `sl-select` wouldn't toggle the menu
- Fixed a bug where options where `sl-select` options weren't always visible or scrollable
- Fixed a bug where setting `null` on `sl-input`, `sl-textarea`, or `sl-select` would throw an error
- Fixed a bug where `role` was on the wrong element and aria attribute weren't explicit in `sl-checkbox`, `sl-switch`, and `sl-radio`
- Fixed a bug where dynamically adding/removing a slot wouldn't work as expected in `sl-card`, `sl-dialog`, and `sl-drawer`
- Fixed a bug where the value wasn't updated and events weren't emitted when using `setRangeText` in `sl-input` and `sl-textarea`
- Optimized `hasSlot` utility by using a simpler selector
- Updated Bootstrap Icons to 1.0.0 with many icons redrawn and improved
- Updated contribution guidelines

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
- Add `slclear` event to `sl-input`
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
- Fixed a bug where `slshow` and `slhide` would be emitted twice in some components
- Fixed a bug where `custom-elements/index.d.ts` was broken due to an unclosed comment (fixed in Stencil 1.17.3)
- Fixed bug where inputs were not using border radius tokens
- Fixed a bug where the text color was being erroneously set in `sl-progress-ring`
- Fixed a bug where `sl-progress-bar` used the wrong part name internally for `indicator`
- Removed background color from `sl-menu`
- Updated to Stencil 1.17.3

## 2.0.0-beta.13

- Added `slactivate` and `sldeactivate` events to `sl-menu-item`
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
