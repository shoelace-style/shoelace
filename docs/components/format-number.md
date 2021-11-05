# Format Number

[component-header:sl-format-number]

Formats a number using the specified locale and options.

Localization is handled by the browser's [`Intl.NumberFormat` API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat). No language packs are required.

```html preview
<div class="format-number-overview">
  <sl-format-number value="1000"></sl-format-number> 
  <br><br>
  <sl-input type="number" value="1000" label="Number to Format" style="max-width: 180px;"></sl-input>  
</div>

<script>
  const container = document.querySelector('.format-number-overview');
  const formatter = container.querySelector('sl-format-number');
  const input = container.querySelector('sl-input');

  input.addEventListener('sl-input', () => formatter.value = input.value || 0);
</script>
```

```jsx react
import { useState } from 'react';
import { SlFormatNumber, SlInput } from '@shoelace-style/shoelace/dist/react';

const App = () => {
  const [value, setValue] = useState(1000);

  return (
    <>
      <SlFormatNumber value={value} />
      <br /><br />
      <SlInput 
        type="number" 
        value={value} 
        label="Number to Format" 
        style={{ maxWidth: '180px' }}
        onSlInput={event => setValue(event.target.value)}
      />
    </>
  );
};
```

## Examples

### Percentages

To get the value as a percent, set the `type` attribute to `percent`.

```html preview
<sl-format-number type="percent" value="0"></sl-format-number><br>
<sl-format-number type="percent" value="0.25"></sl-format-number><br>
<sl-format-number type="percent" value="0.50"></sl-format-number><br>
<sl-format-number type="percent" value="0.75"></sl-format-number><br>
<sl-format-number type="percent" value="1"></sl-format-number>
```

```jsx react
import { SlFormatNumber } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    <SlFormatNumber type="percent" value={0} /><br />
    <SlFormatNumber type="percent" value={0.25} /><br />
    <SlFormatNumber type="percent" value={0.50} /><br />
    <SlFormatNumber type="percent" value={0.75} /><br />
    <SlFormatNumber type="percent" value={1} />  
  </>
);
```

### Localization

Use the `locale` attribute to set the number formatting locale.

```html preview
English: <sl-format-number value="2000" locale="en" minimum-fraction-digits="2"></sl-format-number><br>
German: <sl-format-number value="2000" locale="de" minimum-fraction-digits="2"></sl-format-number><br>
Russian: <sl-format-number value="2000" locale="ru" minimum-fraction-digits="2"></sl-format-number>
```

```jsx react
import { SlFormatNumber } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    English: <SlFormatNumber value="2000" locale="en" minimum-fraction-digits="2" /><br />
    German: <SlFormatNumber value="2000" locale="de" minimum-fraction-digits="2" /><br />
    Russian: <SlFormatNumber value="2000" locale="ru" minimum-fraction-digits="2" />
  </>
);
```

### Currency

To format a number as a monetary value, set the `type` attribute to `currency` and set the `currency` attribute to the desired ISO 4217 currency code. You should also specify `locale` to ensure the the number is formatted correctly for the target locale.

```html preview
<sl-format-number type="currency" currency="USD" value="2000" locale="en-US"></sl-format-number><br>
<sl-format-number type="currency" currency="GBP" value="2000" locale="en-GB"></sl-format-number><br>
<sl-format-number type="currency" currency="EUR" value="2000" locale="de"></sl-format-number><br>
<sl-format-number type="currency" currency="RUB" value="2000" locale="ru"></sl-format-number><br>
<sl-format-number type="currency" currency="CNY" value="2000" locale="zh-cn"></sl-format-number>
```

```jsx react
import { SlFormatNumber } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    <SlFormatNumber type="currency" currency="USD" value="2000" locale="en-US" /><br />
    <SlFormatNumber type="currency" currency="GBP" value="2000" locale="en-GB" /><br />
    <SlFormatNumber type="currency" currency="EUR" value="2000" locale="de" /><br />
    <SlFormatNumber type="currency" currency="RUB" value="2000" locale="ru" /><br />
    <SlFormatNumber type="currency" currency="CNY" value="2000" locale="zh-cn" />
  </>
);
```

[component-metadata:sl-format-number]
