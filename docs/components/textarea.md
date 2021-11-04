# Textarea

[component-header:sl-textarea]

Textareas collect data from the user and allow multiple lines of text.

```html preview
<sl-textarea></sl-textarea>
```

```jsx react
import { SlTextarea } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlTextarea />
);
```

?> This component doesn't work with standard forms. Use [`<sl-form>`](/components/form) instead.

?> Please refer to the section on [form control validation](/components/form?id=form-control-validation) to learn how to do client-side validation.

## Examples

### Rows

Use the `rows` attribute to change the number of text rows that get shown.

```html preview
<sl-textarea rows="2"></sl-textarea>
```

```jsx react
import { SlTextarea } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlTextarea rows={2} />
);
```

### Placeholders

Use the `placeholder` attribute to add a placeholder.

```html preview
<sl-textarea placeholder="Type something"></sl-textarea>
```

```jsx react
import { SlTextarea } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlTextarea placeholder="Type something" />
);
```

### Filled Textareas

Add the `filled` attribute to draw a filled textarea.

```html preview
<sl-textarea placeholder="Type something" filled></sl-textarea>
```

```jsx react
import { SlTextarea } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlTextarea placeholder="Type something" filled />
);
```

### Disabled

Use the `disabled` attribute to disable a textarea.

```html preview
<sl-textarea placeholder="Textarea" disabled></sl-textarea>
```

```jsx react
import { SlTextarea } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlTextarea placeholder="Textarea" disabled />
);
```

### Sizes

Use the `size` attribute to change a textarea's size.

```html preview
<sl-textarea placeholder="Small" size="small"></sl-textarea>
<br>
<sl-textarea placeholder="Medium" size="medium"></sl-textarea>
<br>
<sl-textarea placeholder="Large" size="large"></sl-textarea>
```

```jsx react
import { SlTextarea } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <>
    <SlTextarea placeholder="Small" size="small"></SlTextarea>
    <br />
    <SlTextarea placeholder="Medium" size="medium"></SlTextarea>
    <br />
    <SlTextarea placeholder="Large" size="large"></SlTextarea>
  </>
);
```

### Labels

Use the `label` attribute to give the textarea an accessible label. For labels that contain HTML, use the `label` slot instead.

```html preview
<sl-textarea label="Comments"></sl-textarea>
```

```jsx react
import { SlTextarea } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlTextarea label="Comments" />
);
```

### Help Text

Add descriptive help text to a textarea with the `help-text` attribute. For help texts that contain HTML, use the `help-text` slot instead.

```html preview
<sl-textarea 
  label="Feedback" 
  help-text="Please tell us what you think."
>
</sl-textarea>
```

```jsx react
import { SlTextarea } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlTextarea
    label="Feedback"
    help-text="Please tell us what you think."
  />
);
```

### Prevent Resizing

By default, textareas can be resized vertically by the user. To prevent resizing, set the `resize` attribute to `none`.

```html preview
<sl-textarea resize="none"></sl-textarea>
```

```jsx react
import { SlTextarea } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlTextarea resize="none" />
);
```

### Expand with Content

Textareas will automatically resize to expand to fit their content when `resize` is set to `auto`.

```html preview
<sl-textarea resize="auto"></sl-textarea>
```

```jsx react
import { SlTextarea } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlTextarea resize="auto" />
);
```

[component-metadata:sl-textarea]
