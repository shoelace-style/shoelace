# Spinner

[component-header:sl-spinner]

Spinners are used to show the progress of an indeterminate operation.

```html preview
<sl-spinner></sl-spinner>
```

## Examples

### Size

Spinners are sized based on the current font size. To change their size, set the `font-size` property on the spinner itself or on a parent element as shown below.

```html preview
<sl-spinner></sl-spinner>
<sl-spinner style="font-size: 2rem;"></sl-spinner>
<sl-spinner style="font-size: 3rem;"></sl-spinner>
```

### Track Width

The width of the spinner's track can be changed by setting the `--track-width` custom property.

```html preview
<sl-spinner style="font-size: 3rem; --track-width: 6px;"></sl-spinner>
```

### Color

The spinner's colors can be changed by setting the `--indicator-color` and `--track-color` custom properties.

```html preview
<sl-spinner style="font-size: 3rem; --indicator-color: deeppink; --track-color: pink;"></sl-spinner>
```

[component-metadata:sl-spinner]
