# Input

[component-header:sl-input]

Inputs collect data from the user.

```html preview
<sl-input></sl-input>
```

```jsx react
import { SlInput } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlInput />
);
```

?> This component works with standard `<form>` elements. Please refer to the section on [form controls](/getting-started/form-controls) to learn more about form submission and client-side validation.

## Examples

### Placeholders

Use the `placeholder` attribute to add a placeholder.

```html preview
<sl-input placeholder="Type something"></sl-input>
```

```jsx react
import { SlInput } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlInput placeholder="Type something" />
);
```

### Clearable

Add the `clearable` attribute to add a clear button when the input has content.

```html preview
<sl-input placeholder="Clearable" clearable></sl-input>
```

```jsx react
import { SlInput } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlInput placeholder="Clearable" clearable />
);
```

### Toggle Password

Add the `toggle-password` attribute to add a toggle button that will show the password when activated.

```html preview
<sl-input type="password" placeholder="Password Toggle" size="small" toggle-password></sl-input>
<br>
<sl-input type="password" placeholder="Password Toggle" size="medium" toggle-password></sl-input>
<br>
<sl-input type="password" placeholder="Password Toggle" size="large" toggle-password></sl-input>
```

```jsx react
import { SlInput } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    <SlInput type="password" placeholder="Password Toggle" size="small" toggle-password />
    <br />
    <SlInput type="password" placeholder="Password Toggle" size="medium" toggle-password />
    <br />
    <SlInput type="password" placeholder="Password Toggle" size="large" toggle-password />  
  </>
);
```

### Filled Inputs

Add the `filled` attribute to draw a filled input.

```html preview
<sl-input placeholder="Type something" filled></sl-input>
```

```jsx react
import { SlInput } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlInput placeholder="Type something" filled />
);
```

### Pill

Use the `pill` attribute to give inputs rounded edges.

```html preview
<sl-input placeholder="Small" size="small" pill></sl-input>
<br>
<sl-input placeholder="Medium" size="medium" pill></sl-input>
<br>
<sl-input placeholder="Large" size="large" pill></sl-input>
```

```jsx react
import { SlInput } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    <SlInput placeholder="Small" size="small" pill />
    <br />
    <SlInput placeholder="Medium" size="medium" pill />
    <br />
    <SlInput placeholder="Large" size="large" pill />
  </>
);
```

### Input Types

The `type` attribute controls the type of input the browser renders.

```html preview
<sl-input type="email" Placeholder="Email"></sl-input>
<br>
<sl-input type="number" Placeholder="Number"></sl-input>
<br>
<sl-input type="date" Placeholder="Date"></sl-input>
```

```jsx react
import { SlInput } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    <SlInput type="email" Placeholder="Email" />
    <br />
    <SlInput type="number" Placeholder="Number" />
    <br />
    <SlInput type="date" Placeholder="Date" />
  </>
);
```

### Disabled

Use the `disabled` attribute to disable an input.

```html preview
<sl-input placeholder="Disabled" size="small" disabled></sl-input>
<br>
<sl-input placeholder="Disabled" size="medium" disabled></sl-input>
<br>
<sl-input placeholder="Disabled" size="large" disabled></sl-input>
```

```jsx react
import { SlInput } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    <SlInput placeholder="Disabled" size="small" disabled />
    <br />
    <SlInput placeholder="Disabled" size="medium" disabled />
    <br />
    <SlInput placeholder="Disabled" size="large" disabled />
  </>
);
```

### Sizes

Use the `size` attribute to change an input's size.

```html preview
<sl-input placeholder="Small" size="small"></sl-input>
<br>
<sl-input placeholder="Medium" size="medium"></sl-input>
<br>
<sl-input placeholder="Large" size="large"></sl-input>
```

```jsx react
import { SlInput } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    <SlInput placeholder="Small" size="small" />
    <br />
    <SlInput placeholder="Medium" size="medium" />
    <br />
    <SlInput placeholder="Large" size="large" />
  </>
);
```

### Prefix & Suffix Icons

Use the `prefix` and `suffix` slots to add icons.

```html preview
<sl-input placeholder="Small" size="small">
  <sl-icon name="house" slot="prefix"></sl-icon>
  <sl-icon name="chat" slot="suffix"></sl-icon>
</sl-input>
<br>
<sl-input placeholder="Medium" size="medium">
  <sl-icon name="house" slot="prefix"></sl-icon>
  <sl-icon name="chat" slot="suffix"></sl-icon>
</sl-input>
<br>
<sl-input placeholder="Large" size="large">
  <sl-icon name="house" slot="prefix"></sl-icon>
  <sl-icon name="chat" slot="suffix"></sl-icon>
</sl-input>
```

```jsx react
import { SlIcon, SlInput } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    <SlInput placeholder="Small" size="small">
      <SlIcon name="house" slot="prefix"></SlIcon>
      <SlIcon name="chat" slot="suffix"></SlIcon>
    </SlInput>
    <br />
    <SlInput placeholder="Medium" size="medium">
      <SlIcon name="house" slot="prefix"></SlIcon>
      <SlIcon name="chat" slot="suffix"></SlIcon>
    </SlInput>
    <br />
    <SlInput placeholder="Large" size="large">
      <SlIcon name="house" slot="prefix"></SlIcon>
      <SlIcon name="chat" slot="suffix"></SlIcon>
    </SlInput>
  </>
);
```

### Labels

Use the `label` attribute to give the input an accessible label. For labels that contain HTML, use the `label` slot instead.

```html preview
<sl-input label="What is your name?"></sl-input>
```

```jsx react
import { SlIcon, SlInput } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlInput label="What is your name?" />
);
```

### Help Text

Add descriptive help text to an input with the `help-text` attribute. For help texts that contain HTML, use the `help-text` slot instead.

```html preview
<sl-input 
  label="Nickname" 
  help-text="What would you like people to call you?"
></sl-input>
```

```jsx react
import { SlIcon, SlInput } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlInput 
    label="Nickname" 
    help-text="What would you like people to call you?" 
  />
);
```

[component-metadata:sl-input]
