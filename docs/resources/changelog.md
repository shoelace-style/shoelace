# Changelog

Shoelace follows [Semantic Versioning](https://semver.org/). Breaking changes in components with the <sl-badge type="primary" pill>Stable</sl-badge> badge will not be accepted until the next major version. As such, all contributions must consider the project's roadmap and take this into consideration. Features that are deemed no longer necessary will be deprecated but not removed.

Components with the <sl-badge type="warning" pill>Experimental</sl-badge> badge should not be used in production. They are made available as release candidates for development and testing purposes. As such, changes to experimental components will not be subject to semantic versioning.

_During the beta period, these restrictions may be relaxed in the event of a mission-critical bug._ 🐛

## Next

This release improves the developer experience of `<sl-animation>`. Previously, an animation was assumed to be playing unless the `pause` attribute was set. This behavior has been reversed and `pause` has been removed. Now, animations will not play until the new `play` attribute is applied.

This is a lot more intuitive and makes it easier to activate animations imperatively. In addition, the `play` attribute is automatically removed automatically when the animation finishes or cancels, making it easier to restart finite animations. Lastly, the animation's timing is now accessible through the new `currentTime` property instead of `getCurrentTime()` and `setCurrentTime()`.

- 🚨 BREAKING: removed the `pause` attribute from `sl-animation` (use `play` to start and stop the animation instead)
- 🚨 BREAKING: removed `getCurrentTime()` and `setCurrentTime()` from `sl-animation` (use the `currentTime` property instead)
- 🚨 BREAKING: removed the `close-on-select` attribute from `sl-dropdown` (use `stay-open-on-select` instead)
- Added the `currentTime` property to `sl-animation` to control the current time without methods
- Fixed a bug in `sl-range` where the tooltip wasn't showing in Safari [#477](https://github.com/shoelace-style/shoelace/issues/477)
- Fixed a bug in `sl-menu` where pressing <kbd>Enter</kbd> in a menu didn't work with click handlers
- Reworked `sl-menu` and `sl-menu-item` to use a roving tab index and improve keyboard accessibility
- Reworked tabbable logic to be more performant [#466](https://github.com/shoelace-style/shoelace/issues/466)

## 2.0.0-beta.45

This release changes the way component metadata is generated. Previously, the project used TypeDoc to analyze components and generate a very large file with type data. The data was then parsed and converted to an easier-to-consume file called `metadata.json`. Alas, TypeDoc is expensive to run and the metadata format wasn't standard.

Thanks to an amazing effort by [Pascal Schilp](https://twitter.com/passle_), the world has a simpler, faster way to gather metadata using the [Custom Elements Manifest Analyzer](https://github.com/open-wc/custom-elements-manifest). Not only is this tool faster, but the data follows the evolving `custom-elements.json` format. This is exciting because a standard format for custom elements opens the door for many potential uses, including documentation generation, framework adapters, IDE integrations, third-party uses, and more. [Check out Pascal's great article](https://dev.to/open-wc/introducing-custom-elements-manifest-gkk) for more info about `custom-elements.json` and the new analyzer.

The docs have been updated to use the new `custom-elements.json` file. If you're relying on the old `metadata.json` file for any purpose, this will be a breaking change for you.

- 🚨 BREAKING: removed the `sl-overlay-click` event from `sl-dialog` and `sl-drawer` (use `sl-request-close` instead) [#471](https://github.com/shoelace-style/shoelace/discussions/471)
- 🚨 BREAKING: removed `metadata.json` (use `custom-elements.json` instead)
- Added `custom-elements.json` for component metadata
- Added `sl-request-close` event to `sl-dialog` and `sl-drawer`
- Added `dialog.denyClose` and `drawer.denyClose` animations
- Fixed a bug in `sl-color-picker` where setting `value` immediately wouldn't trigger an update
- Fixed a bug in `sl-dialog` and `sl-drawer` where setting `open` intially didn't set a focus trap
- Fixed a bug that resulted in form controls having incorrect validity when `disabled` was initially set [#473](https://github.com/shoelace-style/shoelace/issues/473)
- Fixed a bug in the docs that caused the metadata file to be requested twice
- Fixed a bug where tabbing out of a modal would cause the browser to lag [#466](https://github.com/shoelace-style/shoelace/issues/466)
- Updated the docs to use the new `custom-elements.json` for component metadata

## 2.0.0-beta.44

- 🚨 BREAKING: all `invalid` props on form controls now reflect validity before interaction [#455](https://github.com/shoelace-style/shoelace/issues/455)
- Allow `null` to be passed to disable animations in `setDefaultAnimation()` and `setAnimation()`
- Converted build scripts to ESM
- Fixed a bug in `sl-checkbox` where `invalid` did not update properly
- Fixed a bug in `sl-dropdown` where a `keydown` listener wasn't cleaned up properly
- Fixed a bug in `sl-select` where `sl-blur` was emitted prematurely [#456](https://github.com/shoelace-style/shoelace/issues/456)
- Fixed a bug in `sl-select` where no selection with `multiple` resulted in an incorrect value [#457](https://github.com/shoelace-style/shoelace/issues/457)
- Fixed a bug in `sl-select` where `sl-change` was emitted immediately after connecting to the DOM [#458](https://github.com/shoelace-style/shoelace/issues/458)
- Fixed a bug in `sl-select` where non-printable keys would cause the menu to open
- Fixed a bug in `sl-select` where `invalid` was not always updated properly
- Reworked the `@watch` decorator to use `update` instead of `updated` resulting in better performance and flexibility

## 2.0.0-beta.43

- Added `?` to optional arguments in methods tables in the docs
- Added the `scrollPosition()` method to `sl-textarea` to get/set scroll position
- Added intial tests for `sl-dialog`, `sl-drawer`, `sl-dropdown`, and `sl-tooltip`
- Fixed a bug in `sl-tab-group` where scrollable tab icons were not displaying correctly
- Fixed a bug in `sl-dialog` and `sl-drawer` where preventing clicks on the overlay no longer worked as described [#452](https://github.com/shoelace-style/shoelace/issues/452)
- Fixed a bug in `sl-dialog` and `sl-drawer` where setting initial focus no longer worked as described [#453](https://github.com/shoelace-style/shoelace/issues/453)
- Fixed a bug in `sl-card` where the `slotchange` listener wasn't attached correctly [#454](https://github.com/shoelace-style/shoelace/issues/454)
- Fixed lifecycle bugs in a number of components [#451](https://github.com/shoelace-style/shoelace/issues/451)
- Removed `fill: both` from internal animate utility so styles won't "stick" by default [#450](https://github.com/shoelace-style/shoelace/issues/450)

## 2.0.0-beta.42

This release addresses an issue with the `open` attribute no longer working in a number of components, as a result of the changes in beta.41. It also removes a small but controversial feature that complicated show/hide logic and led to a poor experience for developers and end users.

There are two ways to show/hide affected components: by calling `show() | hide()` and by toggling the `open` prop. Previously, it was possible to call `event.preventDefault()` in an `sl-show | sl-hide ` handler to stop the component from showing/hiding. The problem becomes obvious when you set `el.open = false`, the event gets canceled, and in the next cycle `el.open` has reverted to `true`. Not only is this unexpected, but it also doesn't play nicely with frameworks. Additionally, this made it impossible to await `show() | hide()` since there was a chance they'd never resolve.

Technical reasons aside, canceling these events seldom led to a good user experience, so the decision was made to no longer allow `sl-show | sl-hide` to be cancelable.

- 🚨 BREAKING: `sl-show` and `sl-hide` events are no longer cancelable
- Added Iconoir example to the icon docs
- Added Web Test Runner
- Added intial tests for `sl-alert` and `sl-details`
- Changed the `cancelable` default to `false` for the internal `@event` decorator
- Fixed a bug where toggling `open` stopped working in `sl-alert`, `sl-dialog`, `sl-drawer`, `sl-dropdown`, and `sl-tooltip`
- Fixed a bug in `sl-range` where setting a value outside the default `min` or `max` would clamp the value [#448](https://github.com/shoelace-style/shoelace/issues/448)
- Fixed a bug in `sl-dropdown` where placement wouldn't adjust properly when shown [#447](https://github.com/shoelace-style/shoelace/issues/447)
- Fixed a bug in the internal `shimKeyframesHeightAuto` utility that caused `sl-details` to measure heights incorrectly [#445](https://github.com/shoelace-style/shoelace/issues/445)
- Fixed a number of imports that should have been type imports
- Updated Lit to 2.0.0-rc.2
- Updated esbuild to 0.12.4

## 2.0.0-beta.41

This release changes how components animate. In previous versions, CSS transitions were used for most show/hide animations. Transitions are problematic due to the way `transitionend` works. This event fires once _per transition_, and it's impossible to know which transition to look for when users can customize any possible CSS property. Because of this, components previously required the `opacity` property to transition. If a user were to prevent `opacity` from transitioning, the component wouldn't hide properly and the `sl-after-show|hide` events would never emit.

CSS animations, on the other hand, have a more reliable `animationend` event. Alas, `@keyframes` don't cascade and can't be injected into a shadow DOM via CSS, so there would be no good way to customize them.

The most elegant solution I found was to use the [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API), which offers more control over animations at the expense of customizations being done in JavaScript. Fortunately, through the [Animation Registry](/getting-started/customizing#animations), you can customize animations globally and/or per component with a minimal amount of code.

- 🚨 BREAKING: changed `left` and `right` placements to `start` and `end` in `sl-drawer`
- 🚨 BREAKING: changed `left` and `right` placements to `start` and `end` in `sl-tab-group`
- 🚨 BREAKING: removed `--hide-duration`, `--hide-timing-function`, `--show-duration`, and `--show-timing-function` custom properties from `sl-tooltip` (use the Animation Registry instead)
- Added the Animation Registry
- Fixed a bug where removing `sl-dropdown` from the DOM and adding it back destroyed the popover reference [#443](https://github.com/shoelace-style/shoelace/issues/443)
- Updated animations for `sl-alert`, `sl-dialog`, `sl-drawer`, `sl-dropdown`, and `sl-tooltip` to use the Animation Registry instead of CSS transitions
- Improved a11y by respecting `prefers-reduced-motion` for all show/hide animations
- Improved `--show-delay` and `--hide-delay` behavior in `sl-tooltip` so they only apply on hover
- Removed the internal popover utility

## 2.0.0-beta.40

- 🚨 BREAKING: renamed `sl-responsive-embed` to `sl-responsive-media` and added support for images and videos [#436](https://github.com/shoelace-style/shoelace/issues/436)
- Fixed a bug where setting properties before an element was defined would render incorrectly [#425](https://github.com/shoelace-style/shoelace/issues/425)
- Fixed a bug that caused all modules to be imported when cherry picking certain components [#439](https://github.com/shoelace-style/shoelace/issues/439)
- Fixed a bug where the scrollbar would reposition `sl-dialog` on hide causing it to jump [#424](https://github.com/shoelace-style/shoelace/issues/424)
- Fixed a bug that prevented the project from being built in a Windows environment
- Improved a11y in `sl-progress-ring`
- Removed `src/utilities/index.ts` to prevent tree-shaking confusion (please import utilities directly from their respective modules)
- Removed global `[hidden]` styles so they don't affect anything outside of components
- Updated to Bootstrap Icons 1.5.0
- Updated React docs to use [`@shoelace-style/react`](https://github.com/shoelace-style/react)
- Updated NextJS docs [#434](https://github.com/shoelace-style/shoelace/pull/434)
- Updated TypeScript to 4.2.4

## 2.0.0-beta.39

- Added experimental `sl-qr-code` component
- Added `system` icon library and updated all components to use this instead of the default icon library [#420](https://github.com/shoelace-style/shoelace/issues/420)
- Updated to esbuild 0.8.57
- Updated to Lit 2.0.0-rc.1 and lit-html 2.0.0-rc.2

## 2.0.0-beta.38

- 🚨 BREAKING: `sl-radio` components must be located inside an `sl-radio-group` for proper accessibility [#218](https://github.com/shoelace-style/shoelace/issues/218)
- Added `sl-radio-group` component [#218](https://github.com/shoelace-style/shoelace/issues/218)
- Added `--header-spacing`, `--body-spacing`, and `--footer-spacing` custom properties to `sl-drawer` and `sl-dialog` [#409](https://github.com/shoelace-style/shoelace/issues/409)
- Fixed a bug where `sl-menu-item` prefix and suffix slots wouldn't always receive the correct spacing
- Fixed a bug where `sl-badge` used `--sl-color-white` instead of the correct design tokens [#407](https://github.com/shoelace-style/shoelace/issues/407)
- Fixed a bug in `sl-dialog` and `sl-drawer` where the escape key would cause parent components to close
- Fixed a race condition bug in `sl-icon` [#410](https://github.com/shoelace-style/shoelace/issues/410)
- Improved focus trap behavior in `sl-dialog` and `sl-drawer`
- Improved a11y in `sl-dialog` and `sl-drawer` by restoring focus to trigger on close
- Improved a11y in `sl-radio` with Windows high contrast mode [#215](https://github.com/shoelace-style/shoelace/issues/215)
- Improved a11y in `sl-select` by preventing the chevron icon from being announced
- Internal: removed the `options` argument from the modal utility as focus trapping is now handled internally

## 2.0.0-beta.37

- Added `click()` method to `sl-checkbox`, `sl-radio`, and `sl-switch`
- Added the `activation` attribute to `sl-tab-group` to allow for automatic and manual tab activation
- Added `npm run create <tag>` script to scaffold new components faster
- Fixed a bug in `sl-tooltip` where events weren't properly cleaned up on disconnect
- Fixed a bug in `sl-tooltip` where they wouldn't display after toggling `disabled` off and on again [#391](https://github.com/shoelace-style/shoelace/issues/391)
- Fixed a bug in `sl-details` where `show()` and `hide()` would toggle the control when disabled
- Fixed a bug in `sl-color-picker` where setting `value` wouldn't update the control
- Fixed a bug in `sl-tab-group` where tabs that are initially disabled wouldn't receive the indicator on activation [#403](https://github.com/shoelace-style/shoelace/issues/403)
- Fixed incorrect event names for `sl-after-show` and `sl-after-hide` in `sl-details`
- Improved a11y for disabled buttons that are rendered as links
- Improved a11y for `sl-button-group` by adding the correct `role` attribute
- Improved a11y for `sl-input`, `sl-range`, `sl-select`, and `sl-textarea` so labels and helper text are read properly by screen readers
- Removed `sl-show`, `sl-hide`, `sl-after-show`, `sl-after-hide` events from `sl-color-picker` (the color picker's visibility cannot be controlled programmatically so these shouldn't have been exposed; the dropdown events now bubble up so you can listen for those instead)
- Reworked `sl-button-group` so it doesn't require light DOM styles

## 2.0.0-beta.36

- 🚨 BREAKING: renamed `setFocus()` to `focus()` in button, checkbox, input, menu item, radio, range, rating, select, switch, and tab
- 🚨 BREAKING: renamed `removeFocus()` to `blur()` in button, checkbox, input, menu item, radio, range, rating, select, switch, and tab
- Added `click()` method to `sl-button`
- Fixed a bug where toggling `open` on `sl-drawer` would skip the transition
- Fixed a bug where `sl-color-picker` could be opened when disabled
- Fixed a bug in `sl-color-picker` that caused erratic slider behaviors [#388](https://github.com/shoelace-style/shoelace/issues/388) [#389](https://github.com/shoelace-style/shoelace/issues/389)
- Fixed a bug where `sl-details` wouldn't always render the correct height when open initially [#357](https://github.com/shoelace-style/shoelace/issues/357)
- Renamed `components.json` to `metadata.json`
- Updated to the prerelease versions of LitElement and lit-html
- Updated to Bootstrap Icons 1.4.1

## 2.0.0-beta.35

- Fixed a bug in `sl-animation` where `sl-cancel` and `sl-finish` events would never fire
- Fixed a bug where `sl-alert` wouldn't always transition properly
- Fixed a bug where using `sl-menu` inside a shadow root would break keyboard selections [#382](https://github.com/shoelace-style/shoelace/issues/382)
- Fixed a bug where toggling `multiple` in `sl-select` would lead to a stale display label
- Fixed a bug in `sl-tab-group` where changing `placement` could result in the active tab indicator being drawn a few pixels off
- Fixed a bug in `sl-button` where link buttons threw an error on focus, blur, and click
- Improved `@watch` decorator to run after update instead of during
- Updated `sl-menu-item` checked icon to `check` instead of `check2`
- Upgraded the status of `sl-resize-observer` from experimental to stable

## 2.0.0-beta.34

This release changes the way components are registered if you're [cherry picking](/getting-started/installation?id=cherry-picking) or [using a bundler](/getting-started/installation?id=bundling). This recommendation came from the LitElement team and simplifies Shoelace's dependency graph. It also eliminates the need to call a `register()` function before using each component.

From now on, importing a component will register it automatically. The caveat is that bundlers may not tree shake the library properly if you import from `@shoelace-style/shoelace`, so the recommendation is to import components and utilities from their corresponding files instead.

- 🚨 BREAKING: removed `all.shoelace.js` (use `shoelace.js` instead)
- 🚨 BREAKING: component modules now have a side effect, so bundlers may not tree shake properly when importing from `@shoelace-style/shoelace` (see the [installation page](/getting-started/installation?id=bundling) for more details and how to update)
- Added `sl-clear` event to `sl-select`
- Fixed a bug where dynamically changing menu items in `sl-select` would cause the display label to be blank [#374](https://github.com/shoelace-style/shoelace/discussions/374)
- Fixed a bug where setting the `value` attribute or property on `sl-input` and `sl-textarea` would trigger validation too soon
- Fixed the margin in `sl-menu-label` to align with menu items
- Fixed `autofocus` attributes in `sl-input` and `sl-textarea`
- Improved types for `autocapitalize` in `sl-input` and `sl-textarea`
- Reverted the custom `@tag` decorator in favor of `@customElement` to enable auto-registration

## 2.0.0-beta.33

- Fixed a bug where link buttons could have incorrect `target`, `download`, and `rel` props
- Fixed `aria-label` and `aria-labelledby` props in `sl-dialog` and `sl-drawer`
- Fixed `tabindex` attribute in `sl-menu`
- Fixed a bug in `sl-select` where tags would always render as pills
- Fixed a bug in `sl-button` where calling `setFocus()` would throw an error

## 2.0.0-beta.32

- Added tag name maps so TypeScript can identify Shoelace elements [#371](https://github.com/shoelace-style/shoelace/pull/371)
- Fixed a bug where the active tab indicator wouldn't render properly on tabs styled with `flex-end` [#355](https://github.com/shoelace-style/shoelace/issues/355)
- Fixed a bug where `sl-change` wasn't emitted by `sl-checkbox` or `sl-switch` [#370](https://github.com/shoelace-style/shoelace/issues/370)
- Fixed a bug where some props weren't being watched correctly in `sl-alert` and `sl-color-picker`
- Improved `@watch` decorator so watch handlers don't run before the first render
- Removed guards that were added due to previous watch handler behavior

## 2.0.0-beta.31

- Add touch support to `sl-rating` [#362](https://github.com/shoelace-style/shoelace/pull/362)
- Fixed a bug where the `open` attribute on `sl-details` would prevent it from opening [#357](https://github.com/shoelace-style/shoelace/issues/357)
- Fixed event detail type parsing so component class names are shown instead of `default`

## 2.0.0-beta.30

- Fix default exports for all components so cherry picking works again [#365](https://github.com/shoelace-style/shoelace/issues/365)
- Revert FOUC base style because it interferes with some framework and custom element use cases

## 2.0.0-beta.29

**This release migrates component implementations from Shoemaker to LitElement.** Due to feedback from the community, Shoelace will rely on a more heavily tested library for component implementations. This gives you a more solid foundation and reduces my maintenance burden. Thank you for all your comments, concerns, and encouragement! Aside from that, everything else from beta.28 still applies plus the following.

- 🚨 BREAKING: removed the `symbol` property from `sl-rating` and reverted to `getSymbol` for optimal flexibility
- Added `vscode.html-custom-data.json` to the build to support IntelliSense (see [the usage section](/getting-started/usage#code-completion) for details)
- Added a base style to prevent FOUC before components are defined
- Fixed bug where TypeScript types weren't being generated [#364](https://github.com/shoelace-style/shoelace/pull/364)
- Improved vertical padding in `sl-tooltip`
- Moved chunk files into a separate folder
- Reverted menu item active styles
- Updated esbuild to 0.8.54

## 2.0.0-beta.28

**This release includes a major under the hood overhaul of the library and how it's distributed.** Until now, Shoelace was developed with Stencil. This release moves to a lightweight tool called Shoemaker, a homegrown utility that provides declarative templating and data binding while reducing the boilerplate required for said features.

This change in tooling addresses a number of longstanding bugs and limitations. It also gives us more control over the library and build process while streamlining development and maintenance. Instead of two different distributions, Shoelace now offers a single, standards-compliant collection of ES modules. This may affect how you install and use the library, so please refer to the [installation page](/getting-started/installation) for details.

!> Due to the large number of internal changes, I would consider this update to be less stable than previous ones. If you're using Shoelace in a production app, consider holding off until the next beta to allow for more exhaustive testing from the community. Please report any bugs you find on the [issue tracker](https://github.com/shoelace-style/shoelace/issues).

The component API remains the same except for the changes noted below. Thanks for your patience as I work diligently to make Shoelace more stable and future-proof. 🙌

- 🚨 BREAKING: removed the custom elements bundle (you can import ES modules directly)
- 🚨 BREAKING: removed `getAnimationNames()` and `getEasingNames()` methods from `sl-animation` (you can import them from `utilities/animation.js` instead)
- 🚨 BREAKING: removed the `sl-icon-library` component since it required imperative initialization (you can import the `registerIconLibrary()` function from `utilities/icon-library.js` instead)
- 🚨 BREAKING: removed the experimental `sl-theme` component due to limitations (you should set the `sl-theme-[name]` class on the `<body>` instead)
- 🚨 BREAKING: moved the base stylesheet from `dist/shoelace.css` to `dist/themes/base.css`
- 🚨 BREAKING: moved `icons` into `assets/icons` to make future assets easier to colocate
- 🚨 BREAKING: changed `getSymbol` property in `sl-rating` to `symbol` (it now accepts a string or a function that returns an icon name)
- 🚨 BREAKING: renamed `setAssetPath()` to `setBasePath()` and added the ability to set the library's base path with a `data-shoelace` attribute (`setBasePath()` is exported from `utilities/base-path.js`)
- Fixed `min` and `max` types in `sl-input` to allow numbers and strings [#330](https://github.com/shoelace-style/shoelace/issues/330)
- Fixed a bug where `sl-checkbox`, `sl-radio`, and `sl-switch` controls would shrink with long labels [#325](https://github.com/shoelace-style/shoelace/issues/325)
- Fixed a bug in `sl-select` where the dropdown menu wouldn't reposition when the box resized [#340](https://github.com/shoelace-style/shoelace/issues/340)
- Fixed a bug where ignoring clicks and clicking the overlay would prevent the escape key from closing the dialog/drawer [#344](https://github.com/shoelace-style/shoelace/pull/344)
- Removed the lazy loading dist (importing `shoelace.js` will load and register all components now)
- Switched from Stencil to Shoemaker
- Switched to a custom build powered by [esbuild](https://esbuild.github.io/)
- Updated to Bootstrap Icons 1.4.0

## 2.0.0-beta.27

- Added `handle-icon` slot to `sl-image-comparer` [#311](https://github.com/shoelace-style/shoelace/issues/311)
- Added `label` and `helpText` props and slots to `sl-range` [#318](https://github.com/shoelace-style/shoelace/issues/318)
- Added "Integrating with NextJS" tutorial to the docs, courtesy of [crutchcorn](https://github.com/crutchcorn)
- Added `content` slot to `sl-tooltip` [#322](https://github.com/shoelace-style/shoelace/pull/322)
- Fixed a bug in `sl-select` where removing a tag would toggle the dropdown
- Fixed a bug in `sl-input` and `sl-textarea` where the input might not exist when the value watcher is called [#313](https://github.com/shoelace-style/shoelace/issues/313)
- Fixed a bug in `sl-details` where hidden elements would receive focus when tabbing [#323](https://github.com/shoelace-style/shoelace/issues/323)
- Fixed a bug in `sl-icon` where `sl-error` would only be emitted for network failures [#326](https://github.com/shoelace-style/shoelace/pull/326)
- Reduced the default line-height for `sl-tooltip`
- Updated `sl-menu-item` focus styles
- Updated `sl-select` so tags will wrap when `multiple` is true
- Updated to Stencil 2.4.0

## 2.0.0-beta.26

- 🚨 BREAKING: Fixed animations bloat
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
- Updated `sl-tab-group` so the `active` property is reflected to its attribute
- Updated the docs to show dependencies instead of dependents which is much more useful when working with the custom elements bundle
- Updated to Bootstrap Icons 1.3.0

## 2.0.0-beta.25

- 🚨 BREAKING: Reworked color tokens
  - Theme colors are now inspired by Tailwind's professionally-designed color palette
  - Color token variations now range from 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950
  - Color token variations were inverted, e.g. 50 is lightest and 950 is darkest
  - All component styles were adapted to use the new color tokens, but visual changes are subtle
  - The dark theme was adapted use the new color tokens
  - HSL is no longer used because it is not perceptually uniform (this may be revisited when all browsers support [LCH colors](https://lea.verou.me/2020/04/lch-colors-in-css-what-why-and-how/))
- 🚨 BREAKING: Refactored `sl-select` to improve accessibility [#216](https://github.com/shoelace-style/shoelace/issues/216)
  - Removed the internal `sl-input` because it was causing problems with a11y and virtual keyboards
  - Removed `input`, `prefix` and `suffix` parts
- 🚨 BREAKING: Removed `copy-button` part from `sl-color-picker` since copying is now done by clicking the preview
- Added `getFormattedValue()` method to `sl-color-picker` so you can retrieve the current value in any format
- Added visual separators between solid buttons in `sl-button-group`
- Added `help-text` attribute to `sl-input`, `sl-textarea`, and `sl-select`
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
- Added `allow-scripts` attribute to `sl-include` [#280](https://github.com/shoelace-style/shoelace/issues/280)
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
- Added `closable` attribute to `sl-tab`
- Added experimental `sl-resize-observer` utility
- Added experimental `sl-theme` utility and updated theming documentation
- Fixed a bug where `sl-menu-item` wouldn't render properly in the dark theme
- Fixed a bug where `sl-select` would show an autocomplete menu
- Improved placeholder contrast in dark theme
- Updated to Boostrap Icons 1.1.0
- Updated to Stencil 2.3.0

## 2.0.0-beta.22

- 🚨 BREAKING: Refactored `sl-menu` and `sl-menu-item` to improve accessibility by using proper focus states [#217](https://github.com/shoelace-style/shoelace/issues/217)
  - Moved `tabindex` from `sl-menu` to `sl-menu-item`
  - Removed the `active` attribute from `sl-menu-item` because synthetic focus states are bad for accessibility
  - Removed the `sl-activate` and `sl-deactivate` events from `sl-menu-item` (listen for `focus` and `blur` instead)
  - Updated `sl-select` so keyboard navigation still works
- Added `no-scroll-controls` attribute to `sl-tab-group` [#253](https://github.com/shoelace-style/shoelace/issues/253)
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

- 🚨 BREAKING: Transformed all Shoelace events to lowercase ([details](#why-did-event-names-change))
- Added support for dropdowns and non-icon elements to `sl-input`
- Added `spellcheck` attribute to `sl-input`
- Added `sl-icon-library` to allow custom icon library registration
- Added `library` attribute to `sl-icon` and `sl-icon-button`
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

- Added `name` and `invalid` attribute to `sl-color-picker`
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

- The `invalid` attribute now reflects the control's validity as determined by the browser's constraint validation API
- Added `required` to `sl-checkbox`, `sl-select`, and `sl-switch`
- Added `reportValidity()` and `setCustomValidity()` methods to all form controls
- Added validation checking for custom and native form controls to `sl-form`
- Added `novalidate` attribute to `sl-form` to disable validation
- Removed the `valid` attribute from all form controls
- Removed valid and invalid design tokens and related styles (you can use your own custom styles to achieve this)

## 2.0.0-beta.16

- Added `hoist` attribute to `sl-color-picker`, `sl-dropdown`, and `sl-select` to work around panel clipping
- Added `sl-format-bytes` utility component
- Added `clearable` and `required` props to `sl-select`
- Added `slclear` event to `sl-input`
- Added keyboard support to the preview resizer in the docs
- Fixed a bug where the `aria-selected` state was incorrect in `sl-menu-item`
- Fixed a bug where custom properties applied to `sl-tooltip` didn't affect show/hide transitions
- Fixed a bug where `--sl-input-color-*` custom properties had no effect on `sl-input` and `sl-textarea`
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
- Added the `pulse` attribute to badge
- Fixed a bug where hovering over select showed the wrong cursor
- Fixed a bug where tabbing into a select control would highlight the label
- Fixed a bug where tabbing out of a select control wouldn't close it
- Fixed a bug where closing dropdowns wouldn't give focus back to the trigger
- Fixed a bug where type-to-select wasn't working after the first letter
- Fixed a bug where clicking on menu items and dividers would steal focus from the menu
- Fix a bug where the color picker wouldn't parse uppercase values
- Removed the `no-footer` attribute from dialog and drawer (slot detection is automatic, so the attribute is not required)
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
