# Input

[component-header:sl-input]

Inputs collect data from the user.

```html preview
<sl-input></sl-input>
```

```jsx react
import { SlInput } from '@shoelace-style/shoelace/dist/react';

const App = () => <SlInput />;
```

?> This component works with standard `<form>` elements. Please refer to the section on [form controls](/getting-started/form-controls) to learn more about form submission and client-side validation.

## Examples

### Labels

Use the `label` attribute to give the input an accessible label. For labels that contain HTML, use the `label` slot instead.

```html preview
<sl-input label="What is your name?"></sl-input>
```

```jsx react
import { SlIcon, SlInput } from '@shoelace-style/shoelace/dist/react';

const App = () => <SlInput label="What is your name?" />;
```

### Hidden Labels

Use the `hidden-label` attribute to hide label from user in a screen reader friendly way.

```html preview
<sl-input label="What is your name?" hidden-label></sl-input>
```

```jsx react
import { SlIcon, SlInput } from '@shoelace-style/shoelace/dist/react';

const App = () => <SlInput label="What is your name?" hidden-label />;
```

### Help Text

Add descriptive help text to an input with the `help-text` attribute. For help texts that contain HTML, use the `help-text` slot instead.

```html preview
<sl-input label="Nickname" help-text="What would you like people to call you?"></sl-input>
```

```jsx react
import { SlIcon, SlInput } from '@shoelace-style/shoelace/dist/react';

const App = () => <SlInput label="Nickname" help-text="What would you like people to call you?" />;
```

### Placeholders

Use the `placeholder` attribute to add a placeholder.

```html preview
<sl-input placeholder="Type something"></sl-input>
```

```jsx react
import { SlInput } from '@shoelace-style/shoelace/dist/react';

const App = () => <SlInput placeholder="Type something" />;
```

### Clearable

Add the `clearable` attribute to add a clear button when the input has content.

```html preview
<sl-input placeholder="Clearable" clearable></sl-input>
```

```jsx react
import { SlInput } from '@shoelace-style/shoelace/dist/react';

const App = () => <SlInput placeholder="Clearable" clearable />;
```

### Toggle Password

Add the `password-toggle` attribute to add a toggle button that will show the password when activated.

```html preview
<sl-input type="password" placeholder="Password Toggle" size="small" password-toggle></sl-input>
<br />
<sl-input type="password" placeholder="Password Toggle" size="medium" password-toggle></sl-input>
<br />
<sl-input type="password" placeholder="Password Toggle" size="large" password-toggle></sl-input>
```

```jsx react
import { SlInput } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    <SlInput type="password" placeholder="Password Toggle" size="small" password-toggle />
    <br />
    <SlInput type="password" placeholder="Password Toggle" size="medium" password-toggle />
    <br />
    <SlInput type="password" placeholder="Password Toggle" size="large" password-toggle />
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

const App = () => <SlInput placeholder="Type something" filled />;
```

### Pill

Use the `pill` attribute to give inputs rounded edges.

```html preview
<sl-input placeholder="Small" size="small" pill></sl-input>
<br />
<sl-input placeholder="Medium" size="medium" pill></sl-input>
<br />
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
<sl-input type="email" placeholder="Email"></sl-input>
<br />
<sl-input type="number" placeholder="Number"></sl-input>
<br />
<sl-input type="date" placeholder="Date"></sl-input>
```

```jsx react
import { SlInput } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    <SlInput type="email" placeholder="Email" />
    <br />
    <SlInput type="number" placeholder="Number" />
    <br />
    <SlInput type="date" placeholder="Date" />
  </>
);
```

### Disabled

Use the `disabled` attribute to disable an input.

```html preview
<sl-input placeholder="Disabled" size="small" disabled></sl-input>
<br />
<sl-input placeholder="Disabled" size="medium" disabled></sl-input>
<br />
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
<br />
<sl-input placeholder="Medium" size="medium"></sl-input>
<br />
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
<br />
<sl-input placeholder="Medium" size="medium">
  <sl-icon name="house" slot="prefix"></sl-icon>
  <sl-icon name="chat" slot="suffix"></sl-icon>
</sl-input>
<br />
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

### Customizing Label Position

Use parts to customize the label's position.

```html preview
<sl-input class="label-on-left" label="Name"></sl-input><br />
<sl-input class="label-on-left" label="Email" type="email"></sl-input>

<style>
  .label-on-left::part(form-control) {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .label-on-left::part(form-control-label) {
    flex: 0 0 auto;
    width: 60px;
    text-align: right;
  }

  .label-on-left::part(form-control-input) {
    flex: 1 1 auto;
  }
</style>
```

[component-metadata:sl-input]
