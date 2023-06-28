# Changelog

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
