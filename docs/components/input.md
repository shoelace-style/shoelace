# Input

[component-header:sl-input]

Inputs...

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

```html preview
<sl-input type="text" placeholder="Input"></sl-input>
```

[component-metadata:sl-input]

## Examples

### Size

```html preview
<sl-input type="text" placeholder="Small" size="small"></sl-input>
<br>
<sl-input type="text" placeholder="Medium" size="medium"></sl-input>
<br>
<sl-input type="text" placeholder="Large" size="large"></sl-input>
```

### Prefix & Suffix Icons
```html preview
<sl-input type="text" placeholder="Small" size="small">
  <sl-icon name="tag" slot="prefix"></sl-icon>
  <sl-icon name="gear" slot="suffix"></sl-icon>
</sl-input>
<br>
<sl-input type="text" placeholder="Medium" size="medium">
  <sl-icon name="tag" slot="prefix"></sl-icon>
  <sl-icon name="gear" slot="suffix"></sl-icon>
</sl-input>
<br>
<sl-input type="text" placeholder="Large" size="large">
  <sl-icon name="tag" slot="prefix"></sl-icon>
  <sl-icon name="gear" slot="suffix"></sl-icon>
</sl-input>
```

### Clearable

```html preview
<sl-input type="text" placeholder="Clearable" size="small" clearable></sl-input>
<br>
<sl-input type="text" placeholder="Clearable" size="medium" clearable></sl-input>
<br>
<sl-input type="text" placeholder="Clearable" size="large" clearable></sl-input>
```

### Toggle Password

```html preview
<sl-input type="password" placeholder="Password Toggle" size="small" toggle-password></sl-input>
<br>
<sl-input type="password" placeholder="Password Toggle" size="medium" toggle-password></sl-input>
<br>
<sl-input type="password" placeholder="Password Toggle" size="large" toggle-password></sl-input>
```

### Number

```html preview
<sl-input type="number" placeholder="Number"></sl-input>
```

### Disabled

```html preview
<sl-input type="text" placeholder="Disabled" size="small" disabled></sl-input>
<br>
<sl-input type="text" placeholder="Disabled" size="medium" disabled></sl-input>
<br>
<sl-input type="text" placeholder="Disabled" size="large" disabled></sl-input>
```
