# Date Picker

[component-header:sl-date-picker]

The `sl-date-picker` represents a calendar by displaying the days of a month of a given year. The component allow users to enter dates easily and visually.

```html preview
<sl-date-picker
  year="2021"
  month="6"
  start-date="2021-06-12"
></sl-date-picker>
```

## Examples

### Inline

Display the `sl-date-picker` using the inline mode with today highlighted .

```html preview
<sl-date-picker
  year="2021"
  month="6"
  start-date="2021-06-12"
  display="inline"
  today
></sl-date-picker>
```

### Dropdown

Display the `sl-date-picker` using the dropdown mode and enable multiple selection dates.

```html preview
<style>
    sl-icon.calendar {
      position: absolute;
      z-index: 1;
      color: var(--sl-color-primary-500);
      font-size: 1.5rem;
      top: 50%;
      transform: translateY(-50%);
      right: 55%;
    }

    sl-input::part(base) {
      width: 160px;
      height: 38.5px;
      --sl-input-border-color-focus: var(--sl-input-border-color);
      --focus-ring: 0 0 0 0 transparent;
    }

    sl-input::part(base):hover,
    sl-input::part(base):focus,
    sl-input::part(base):active {
      border-color: var(--sl-input-border-color)
    }

    sl-input.start::part(base) {
      border-right: none;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    sl-input.end::part(base) {
      border-left: none;
      border-right: none;
      border-radius: 0;
    }

    sl-input.end::part(input) {
      text-align: left;
      padding-left: 15px
    }

    sl-date-picker::part(trigger-button) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
</style>

<sl-date-picker
  year="2021"
  month="6"
  start-date="2021-06-12"
  display="dropdown"
  class="datepicker"
  range>
  <sl-input class="start" size="medium" readonly placeholder="from"></sl-input>
  <sl-icon class="calendar" name="arrow-right"></sl-icon>
  <sl-input class="end" size="medium" readonly placeholder="to"></sl-input>
</sl-date-picker>


<script>
  const datepicker = document.querySelector('.datepicker');
  const startDateInput = datepicker.querySelector('.start');
  const endDateInput = datepicker.querySelector('.end');

  datepicker.addEventListener('sl-date-selected', event => {
    const date = event.detail;
    startDateInput.value = format(date);
  });

  datepicker.addEventListener('sl-range-selected', event => {
    const date = event.detail;

    startDateInput.value = format(date.start);
    endDateInput.value = format(date.end);
  });

  function format(value) {
    var d = value.getDate();
    var m = value.getMonth() + 1;
    var y = value.getFullYear();
    return (d <= 9 ? '0' + d : d) + '.' + (m <= 9 ? '0' + m : m) + '.' + y;
  }
</script>
```

### Minimum and maximum dates

Configuring minimum and maximum selectable dates is great for limiting the user selections. Setting the values will disable dates earlier than min-date and dates that come after max-date.

```html preview
<sl-date-picker
  year="2021"
  month="6"
  start-date="2021-06-12"
  display="inline"
  min-date="2021-05-06"
  max-date="2021-06-25"
></sl-date-picker>
```

### Disabled dates

Disabled dates can be defined using the property `disabledDates`. These date are not selectable in calendar.

```html preview
<sl-date-picker
  class="datepicker-disabled-dates"
  year="2021"
  month="5"
  start-date="2021-05-12"
  display="inline"
></sl-date-picker>

<script>
  const datepicker = document.querySelector('.datepicker-disabled-dates');
  datepicker.disabledDates = [new Date(2021, 04, 06), new Date(2021, 04, 23)];
</script>
```

### Multiple dates selection

To enable multiple selection set the `range` attribute, in this way it is possible to select multiple dates.

```html preview
<sl-date-picker
  year="2021"
  month="6"
  start-date="2021-06-12"
  range
></sl-date-picker>
```

### Limit dates selection

Limit date range selection to a number of specified days.

```html preview
<sl-date-picker
  year="2021"
  month="6"
  start-date="2021-06-12"
  range-max-days="3"
  range
></sl-date-picker>
```

### Readonly

The `sl-date-picker` component can be displayed as read-only. This mode does not allow date selection.

```html preview
<sl-date-picker
  year="2021"
  month="6"
  start-date="2021-06-12"
  readonly
></sl-date-picker>
```

### Localization

The `sl-date-picker` component is fully localized. This covers date, time, days names and months names. The first day of the week can also be set using the `first-day-of-week` attribute.

```html preview
<sl-date-picker
  year="2021"
  month="6"
  start-date="2021-06-12"
  first-day-of-week="1"
  lang="it"
></sl-date-picker>
```

[component-metadata:sl-date-picker]
