# Responsive Embed

[component-header:sl-responsive-embed]

Displays embedded media in a responsive manner based on its aspect ratio.

You can embed any element of the `<iframe>`, `<embed>`, or `<object>` type. The default aspect ratio is `16:9`.

```html preview
<sl-responsive-embed>
  <iframe src="https://player.vimeo.com/video/1053647?title=0&byline=0&portrait=0" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
</sl-responsive-embed>
```

## Examples

### Aspect Ratio

To set the aspect ratio, use the `aspect-ratio` attribute.

```html preview
<sl-responsive-embed aspect-ratio="4:3">
  <iframe src="https://www.youtube.com/embed/mM5_T-F1Yn4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</sl-responsive-embed>
```

[component-metadata:sl-responsive-embed]
