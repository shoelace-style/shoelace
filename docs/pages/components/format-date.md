---
meta:
  title: Format Date
  description: Formats a date/time using the specified locale and options.
layout: component
---

Localization is handled by the browser's [`Intl.DateTimeFormat` API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat). No language packs are required.

```html:preview
<!-- Shoelace 2 release date 🎉 -->
<sl-format-date date="2020-07-15T09:17:00-04:00"></sl-format-date>
```

```jsx:react
import SlFormatDate from '@shoelace-style/shoelace/dist/react/format-date';

const App = () => <SlFormatDate date="2020-07-15T09:17:00-04:00" />;
```

The `date` attribute determines the date/time to use when formatting. It must be a string that [`Date.parse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse) can interpret or a [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object set via JavaScript. If omitted, the current date/time will be assumed.

:::tip
When using strings, avoid ambiguous dates such as `03/04/2020` which can be interpreted as March 4 or April 3 depending on the user's browser and locale. Instead, always use a valid [ISO 8601 date time string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse#Date_Time_String_Format) to ensure the date will be parsed properly by all clients.
:::

## Examples

### Date & Time Formatting

Formatting options are based on those found in the [`Intl.DateTimeFormat` API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat). When formatting options are provided, the date/time will be formatted according to those values. When no formatting options are provided, a localized, numeric date will be displayed instead.

```html:preview
<!-- Human-readable date -->
<sl-format-date month="long" day="numeric" year="numeric"></sl-format-date><br />

<!-- Time -->
<sl-format-date hour="numeric" minute="numeric"></sl-format-date><br />

<!-- Weekday -->
<sl-format-date weekday="long"></sl-format-date><br />

<!-- Month -->
<sl-format-date month="long"></sl-format-date><br />

<!-- Year -->
<sl-format-date year="numeric"></sl-format-date><br />

<!-- No formatting options -->
<sl-format-date></sl-format-date>
```

```jsx:react
import SlFormatDate from '@shoelace-style/shoelace/dist/react/format-date';

const App = () => (
  <>
    {/* Human-readable date */}
    <SlFormatDate month="long" day="numeric" year="numeric" />
    <br />

    {/* Time */}
    <SlFormatDate hour="numeric" minute="numeric" />
    <br />

    {/* Weekday */}
    <SlFormatDate weekday="long" />
    <br />

    {/* Month */}
    <SlFormatDate month="long" />
    <br />

    {/* Year */}
    <SlFormatDate year="numeric" />
    <br />

    {/* No formatting options */}
    <SlFormatDate />
  </>
);
```

### Hour Formatting

By default, the browser will determine whether to use 12-hour or 24-hour time. To force one or the other, set the `hour-format` attribute to `12` or `24`.

```html:preview
<sl-format-date hour="numeric" minute="numeric" hour-format="12"></sl-format-date><br />
<sl-format-date hour="numeric" minute="numeric" hour-format="24"></sl-format-date>
```

```jsx:react
import SlFormatDate from '@shoelace-style/shoelace/dist/react/format-date';

const App = () => (
  <>
    <SlFormatDate hour="numeric" minute="numeric" hour-format="12" />
    <br />
    <SlFormatDate hour="numeric" minute="numeric" hour-format="24" />
  </>
);
```

### Localization

Use the `lang` attribute to set the date/time formatting locale.

```html:preview
English: <sl-format-date lang="en"></sl-format-date><br />
French: <sl-format-date lang="fr"></sl-format-date><br />
Russian: <sl-format-date lang="ru"></sl-format-date>
```

```jsx:react
import SlFormatDate from '@shoelace-style/shoelace/dist/react/format-date';

const App = () => (
  <>
    English: <SlFormatDate lang="en" />
    <br />
    French: <SlFormatDate lang="fr" />
    <br />
    Russian: <SlFormatDate lang="ru" />
  </>
);
```
