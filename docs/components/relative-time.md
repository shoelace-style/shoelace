# Relative Time

[component-header:sl-relative-time]

Outputs a localized time phrase relative to the current time.

Localization is handled by the browser's [Intl.RelativeTimeFormat API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat) so there'e no need to load language packs.

```html preview
<sl-relative-time date="2011-11-11T16:56:20-04:00"></sl-relative-time><br>
```

The `date` prop must be a [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object or a string that [`Date.parse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse) can interpret. When using strings, avoid ambiguous dates such as `03/04/2020` which can be interpreted as March 4 or April 3 depending on the user's browser and locale. Instead, use a valid [ISO 8601 date time string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse#Date_Time_String_Format) to ensure proper parsing.

?> [The Intl.RelativeTimeFormat API is available in all major browsers](https://caniuse.com/mdn-javascript_builtins_intl_relativetimeformat), but it first became available to Safari in version 14. If you need to support Safari 13, you'll need to [use a polyfill](https://github.com/catamphetamine/relative-time-format).

## Examples

### Keeping Time in Sync

Use the `sync` attribute to update the displayed value as time passes.

```html preview
<div class="relative-time-sync">
  <sl-relative-time sync></sl-relative-time>
  <br><br>
  <sl-button>Reset</sl-button>
</div>

<script>
  const container = document.querySelector('.relative-time-sync');
  const button = container.querySelector('sl-button');
  const relativeTime = container.querySelector('sl-relative-time');

  relativeTime.date = new Date();
  button.addEventListener('click', () => relativeTime.date = new Date());
</script>
```

### Formatting Styles

You can change the way times are formatted with the `format` attribute. Note that some locales may show the same result for `narrow` and `short` formats.

```html preview
<sl-relative-time date="2020-07-15T09:17:00" format="narrow"></sl-relative-time><br>
<sl-relative-time date="2020-07-15T09:17:00" format="short"></sl-relative-time><br>
<sl-relative-time date="2020-07-15T09:17:00" format="long"></sl-relative-time>
```

### Localization

Use the `locale` attribute to set the desired locale.

```html preview
English: <sl-relative-time date="2020-07-15T09:17:00" locale="en-US"></sl-relative-time><br>
Chinese: <sl-relative-time date="2020-07-15T09:17:00" locale="zh-CN"></sl-relative-time><br>
German: <sl-relative-time date="2020-07-15T09:17:00" locale="de-DE"></sl-relative-time><br>
Russian: <sl-relative-time date="2020-07-15T09:17:00" locale="ru-RU"></sl-relative-time>
```

[component-metadata:sl-relative-time]
