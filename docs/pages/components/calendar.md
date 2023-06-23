---
meta:
  title: Calendar
  description: Calendar shows a monthly view of the Gregorian calendar, optionally allowing users to interact with dates.
layout: component
---

```html:preview
<sl-calendar></sl-calendar>
```

## Examples

### Month & Day Labels

Month and day labels can be customized using the `month-labels` and `day-labels` attributes. Note that month names are localized automatically based on the component's `lang` attribute, falling back to the document language.

```html:preview
<sl-calendar month-labels="short" day-labels="narrow"></sl-calendar>
```

### Showing Adjacent Dates

By default, only dates in the target month are shown. You can fill the grid with adjacent dates using the `show-adjacent-dates` attribute.

```html:preview
<sl-calendar show-adjacent-dates></sl-calendar>
```

### Date Selection

One or more dates can be selected by setting the `selectedDates` property. An array of dates is accepted and the selection does not have to be continuous.

```html:preview
<sl-calendar class="calendar-selection"></sl-calendar>

<script>
  const calendar = document.querySelector('.calendar-selection');
  const today = new Date();

  // Set the selected date range from the 12-15 of the current month
  calendar.selectedDates = [
    new Date(today.getFullYear(), today.getMonth(), 12),
    new Date(today.getFullYear(), today.getMonth(), 13),
    new Date(today.getFullYear(), today.getMonth(), 14),
    new Date(today.getFullYear(), today.getMonth(), 15)
  ];
</script>
```

### With Borders

To add a border, set the `--border-width` custom property. You can further customize the border with `--border-color` and `--border-radius`.

```html:preview
<sl-calendar style="--border-width: 1px;"></sl-calendar>
```

### Localizing the Calendar

By default, the calendar will use the document's locale. You can use the `lang` attribute to change this.

```html:preview
<sl-calendar lang="es"></sl-calendar>
```

[component-metadata:sl-calendar]
