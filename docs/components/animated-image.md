# Animated Image

[component-header:sl-animated-image]

A component for displaying animated GIFs and WEBPs that play and pause on interaction.

```html preview
<sl-animated-image 
  src="/assets/images/walk.gif" 
  alt="Animation of untied shoes walking on pavement"
></sl-animated-image>
```

## Examples

### WEBP Images

Both GIF and WEBP images are supported.

```html preview
<sl-animated-image 
  src="/assets/images/tie.webp" 
  alt="Animation of a shoe being tied"
></sl-animated-image>
```

### Setting a Width and Height

To set a custom size, apply a width and/or height to the host element.

```html preview
<sl-animated-image 
  src="/assets/images/walk.gif" 
  alt="Animation of untied shoes walking on pavement"
  style="width: 150px; height: 200px;"
>
</sl-animated-image>
```

### Customizing the Control Box

You can change the appearance and location of the control box by targeting the `control-box` part in your styles.

```html preview
<sl-animated-image 
  src="/assets/images/walk.gif" 
  alt="Animation of untied shoes walking on pavement"
  class="animated-image-custom-control-box"
></sl-animated-image>

<style>
  .animated-image-custom-control-box::part(control-box) {
    top: auto;
    right: auto;
    bottom: 1rem;
    left: 1rem;
    background-color: deeppink;
    color: white;
  }
</style>
```

[component-metadata:sl-animated-image]
