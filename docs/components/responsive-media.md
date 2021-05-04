# Responsive Media

[component-header:sl-responsive-media]

Displays media in the desired aspect ratio.

You can slot in any [replaced element](https://developer.mozilla.org/en-US/docs/Web/CSS/Replaced_element), including `<iframe>`, `<img>`, and `<video>`. As the element's width changes, its height will resize proportionally. Only one element should be slotted into the container. The default aspect ratio is `16:9`.

```html preview
<sl-responsive-media>
  <img src="https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1800&q=80" alt="A train riding through autumn foliage with mountains in the distance.">
</sl-responsive-media>
```

## Examples

### Responsive Images

The following image maintains a `4:3` aspect ratio as its container is resized.

```html preview
<sl-responsive-media aspect-ratio="4:3">
  <img src="https://images.unsplash.com/photo-1473186578172-c141e6798cf4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1800&q=80" alt="Two blue chairs on a sandy beach.">
</sl-responsive-media>
```

### Responsive Videos

The following video is embedded using an `iframe` and maintains a `16:9` aspect ratio as its container is resized.

```html preview
<sl-responsive-media aspect-ratio="16:9">
  <iframe src="https://player.vimeo.com/video/1053647?title=0&byline=0&portrait=0" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
</sl-responsive-media>
```

[component-metadata:sl-responsive-media]
