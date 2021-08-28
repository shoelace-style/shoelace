# Date Picker

[component-header:sl-date-picker]

The `sl-date-picker` component acts as a container for the `sl-calendar` component to display an awesome dropdown calendar.

```html preview
<style>
  sl-icon.arrow {
    position: absolute;
    z-index: 1;
    color: var(--sl-color-primary-500);
    font-size: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    right: 55%;
  }

  sl-input::part(base) {
    width: 125px;
    height: 38.5px;
    --sl-input-border-color-focus: var(--sl-input-border-color);
    --focus-ring: 0 0 0 0 transparent;
  }

  sl-input::part(base):hover,
  sl-input::part(base):focus,
  sl-input::part(base):active {
    border-color: var(--sl-input-border-color)
  }

  sl-input.start-date::part(base) {
    border-right: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    height: 100%;
  }

  sl-input.end-date::part(base) {
    border-left: none;
    border-right: none;
    border-radius: 0;
    height: 100%;
  }

  sl-input.end-date::part(input) {
    text-align: left;
    padding-left: 15px
  }

  sl-date-picker::part(trigger-button) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    height: 100%;
  }
</style>

<sl-date-picker
  class="datepicker"
  start="2021-08-11"
  first-day-of-week="1"
  today
  range>
  <sl-input class="start-date" size="medium" readonly placeholder="from"></sl-input>
  <sl-icon class="arrow" name="arrow-right"></sl-icon>
  <sl-input class="end-date" size="medium" readonly placeholder="to"></sl-input>
</sl-date-picker>


<script>
  const datepicker = document.querySelector('.datepicker');
  const startDateInput = datepicker.querySelector('.start-date');
  const endDateInput = datepicker.querySelector('.end-date');

  datepicker.addEventListener('sl-calendar-date-selected', event => {
    const data = event.detail;
    startDateInput.value = format(data);

    console.log(data);
  });

  datepicker.addEventListener('sl-calendar-range-selected', event => {
    const data = event.detail;

    startDateInput.value = format(data.start);
    endDateInput.value = format(data.end);

    console.log(data);
  });

  function format(value) {
    var d = value.getDate();
    var m = value.getMonth() + 1;
    var y = value.getFullYear();
    return (d <= 9 ? '0' + d : d) + '.' + (m <= 9 ? '0' + m : m) + '.' + y;
  }
</script>
```

## Examples

[component-metadata:sl-date-picker]
