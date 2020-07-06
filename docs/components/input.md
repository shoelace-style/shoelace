# Input

[component-header:sl-input]

Inputs...

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

```html preview
<sl-input type="text" placeholder="Input"></sl-input>
```

## Examples

### Labels

```html preview
<sl-input type="text" label="Name"></sl-input>
<br />
<sl-input type="email" label="Email" placeholder="bob@example.com"></sl-input>
```

### Size

```html preview
<sl-input placeholder="Small" size="small"></sl-input>
<br />
<sl-input placeholder="Medium" size="medium"></sl-input>
<br />
<sl-input placeholder="Large" size="large"></sl-input>
```

### Pill

```html preview
<sl-input placeholder="Small" size="small" pill></sl-input>
<br />
<sl-input placeholder="Medium" size="medium" pill></sl-input>
<br />
<sl-input placeholder="Large" size="large" pill></sl-input>
```

### Prefix & Suffix Icons

```html preview
<sl-input type="text" placeholder="Small" size="small">
  <sl-icon name="tag" slot="prefix"></sl-icon>
  <sl-icon name="gear" slot="suffix"></sl-icon>
</sl-input>
<br />
<sl-input type="text" placeholder="Medium" size="medium">
  <sl-icon name="tag" slot="prefix"></sl-icon>
  <sl-icon name="gear" slot="suffix"></sl-icon>
</sl-input>
<br />
<sl-input type="text" placeholder="Large" size="large">
  <sl-icon name="tag" slot="prefix"></sl-icon>
  <sl-icon name="gear" slot="suffix"></sl-icon>
</sl-input>
```

### Clearable

```html preview
<sl-input type="text" placeholder="Clearable" size="small" clearable></sl-input>
<br />
<sl-input type="text" placeholder="Clearable" size="medium" clearable></sl-input>
<br />
<sl-input type="text" placeholder="Clearable" size="large" clearable></sl-input>
```

### Toggle Password

```html preview
<sl-input type="password" placeholder="Password Toggle" size="small" toggle-password></sl-input>
<br />
<sl-input type="password" placeholder="Password Toggle" size="medium" toggle-password></sl-input>
<br />
<sl-input type="password" placeholder="Password Toggle" size="large" toggle-password></sl-input>
```

### Disabled

```html preview
<sl-input type="text" placeholder="Disabled" size="small" disabled></sl-input>
<br />
<sl-input type="text" placeholder="Disabled" size="medium" disabled></sl-input>
<br />
<sl-input type="text" placeholder="Disabled" size="large" disabled></sl-input>
```

[component-metadata:sl-input]
