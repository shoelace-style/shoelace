# Relative Time

[component-header:sl-relative-time]

Outputs a localized time phrase relative to the current date and time.

Localization is handled by the browser's [`Intl.RelativeTimeFormat` API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat). No language packs are required.

```html preview
<!-- Shoelace 2 release date 🎉 -->
<sl-relative-time date="2020-07-15T09:17:00-04:00"></sl-relative-time>
```

```jsx react
import { SlRelativeTime } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlRelativeTime date="2020-07-15T09:17:00-04:00" />
);
```

The `date` attribute determines when the date/time is calculated from. It must be a string that [`Date.parse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse) can interpret or a [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object set via JavaScript.

?> When using strings, avoid ambiguous dates such as `03/04/2020` which can be interpreted as March 4 or April 3 depending on the user's browser and locale. Instead, always use a valid [ISO 8601 date time string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse#Date_Time_String_Format) to ensure the date will be parsed properly by all clients.

!> The `Intl.RelativeTimeFormat` API is available [in all major browsers](https://caniuse.com/mdn-javascript_builtins_intl_relativetimeformat), but it only became available to Safari in version 14. If you need to support Safari 13, you'll need to [use a polyfill](https://github.com/catamphetamine/relative-time-format).

## Examples

### Keeping Time in Sync

Use the `sync` attribute to update the displayed value automatically as time passes.

```html preview
<div class="relative-time-sync">
  <sl-relative-time sync></sl-relative-time>
</div>

<script>
  const container = document.querySelector('.relative-time-sync');
  const relativeTime = container.querySelector('sl-relative-time');

  relativeTime.date = new Date(new Date().getTime() - 60000);
</script>
```

```jsx react
import { SlRelativeTime } from '@shoelace-style/shoelace/dist/react';

const date = new Date(new Date().getTime() - 60000);

const App = () => (
  <SlRelativeTime date={date} sync />
);
```

### Formatting Styles

You can change how the time is displayed using the `format` attribute. Note that some locales may display the same values for `narrow` and `short` formats.

```html preview
<sl-relative-time date="2020-07-15T09:17:00-04:00" format="narrow"></sl-relative-time><br>
<sl-relative-time date="2020-07-15T09:17:00-04:00" format="short"></sl-relative-time><br>
<sl-relative-time date="2020-07-15T09:17:00-04:00" format="long"></sl-relative-time>
```

```jsx react
import { SlRelativeTime } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    <SlRelativeTime date="2020-07-15T09:17:00-04:00" format="narrow" /><br />
    <SlRelativeTime date="2020-07-15T09:17:00-04:00" format="short" /><br />
    <SlRelativeTime date="2020-07-15T09:17:00-04:00" format="long" />
  </>
);
```

### Localization

Use the `lang` attribute to set the desired locale.

```html preview
English: <sl-relative-time date="2020-07-15T09:17:00-04:00" lang="en-US"></sl-relative-time><br>
Chinese: <sl-relative-time date="2020-07-15T09:17:00-04:00" lang="zh-CN"></sl-relative-time><br>
German: <sl-relative-time date="2020-07-15T09:17:00-04:00" lang="de"></sl-relative-time><br>
Greek: <sl-relative-time date="2020-07-15T09:17:00-04:00" lang="el"></sl-relative-time><br>
Russian: <sl-relative-time date="2020-07-15T09:17:00-04:00" lang="ru"></sl-relative-time>
```

```jsx react
import { SlRelativeTime } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    English: <SlRelativeTime date="2020-07-15T09:17:00-04:00" lang="en-US" /><br />
    Chinese: <SlRelativeTime date="2020-07-15T09:17:00-04:00" lang="zh-CN" /><br />
    German: <SlRelativeTime date="2020-07-15T09:17:00-04:00" lang="de" /><br />
    Greek: <SlRelativeTime date="2020-07-15T09:17:00-04:00" lang="el" /><br />
    Russian: <SlRelativeTime date="2020-07-15T09:17:00-04:00" lang="ru" />
  </>
);
```

[component-metadata:sl-relative-time]
