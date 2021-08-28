# Calendar

[component-header:sl-calendar]

The `sl-calendar` represents a calendar by displaying the days of a month of a given year. The component allow users to enter dates easily and visually.

```html preview
<sl-calendar
  start="2021-08-12"
></sl-calendar>
```

## Examples

### Today highlighted

Display the `sl-calendar` with today highlighted.

```html preview
<sl-calendar
  start="2021-08-12"
  today
></sl-calendar>
```

### Minimum and maximum dates

Configuring minimum and maximum selectable dates is great for limiting the user selections. Setting the values will disable dates earlier than min-date and dates that come after max-date.

```html preview
<sl-calendar
  start="2021-08-12"
  min="2021-08-01"
  max="2021-08-24"
></sl-calendar>
```

### Disabled dates

Disabled dates can be defined using the property `disabledDates`. These date are not selectable in calendar.

```html preview
<sl-calendar
  class="calendar-disabled-dates"
  start="2021-08-12"
></sl-calendar>

<script>
  const calendar = document.querySelector('.calendar-disabled-dates');
  calendar.disabledDates = [new Date(2021, 07, 06), new Date(2021, 07, 23)];
</script>
```

### Multiple dates selection

To enable multiple selection set the `range` attribute, in this way it is possible to select multiple dates.

```html preview
<sl-calendar
  start="2021-08-12"
  range
></sl-calendar>
```

### Calendar events

The `sl-calendar` component emit different type of events during the user interaction.

```html preview
<sl-calendar
  class="calendar-events"
  start="2021-08-12"
  range
></sl-calendar>

<script>
  const calendar = document.querySelector('.calendar-events');
  calendar.disabledDates = [new Date(2021, 07, 06), new Date(2021, 07, 23)];

  [
    'sl-calendar-range-selected',
    'sl-calendar-date-selected',
    'sl-calendar-month-changed',
    'sl-calendar-year-changed'
  ].forEach(name => calendar.addEventListener(name, e => console.log(name, e.detail)));
</script>
```

### Limit dates selection

Limit date range selection to a number of specified days.

```html preview
<sl-calendar
  start="2021-08-12"
  limit-range="3"
  range
></sl-calendar>
```

### Localization

The `sl-calendar` component is fully localized. This covers date, time, days names and months names. The first day of the week can also be set using the `first-day-of-week` attribute.

```html preview
<sl-calendar
  start-date="2021-08-12"
  first-day-of-week="1"
  lang="it"
></sl-calendar>
```

[component-metadata:sl-calendar]
