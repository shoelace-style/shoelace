# Avatar

[component-header:sl-avatar]

Avatars are used to represent a person or object.

```html preview
<sl-avatar></sl-avatar>
```

## Examples

### Images

To use an image for the avatar, set the `image` and `alt` attributes. This will take priority and be shown over initials and icons.

```html preview
<sl-avatar
  image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  alt="Gray tabby kitten looking down"
></sl-avatar>
```

### Initials

When you don't have an image to use, you can set the `initials` attribute to show something more personalized than an icon.

```html preview
<sl-avatar initials="SL"></sl-avatar>
```

### Custom Icons

When no image or initials are set, an icon will be shown. The default avatar shows a generic "user" icon, but you can customize this with the `icon` slot.

```html preview
<sl-avatar>
  <sl-icon slot="icon" name="image"></sl-icon>
</sl-avatar>

<sl-avatar>
  <sl-icon slot="icon" name="archive"></sl-icon>
</sl-avatar>

<sl-avatar>
  <sl-icon slot="icon" name="briefcase"></sl-icon>
</sl-avatar>
```

### Shapes

Avatars can be shaped using the `shape` attribute.

```html preview
<sl-avatar shape="square"></sl-avatar>

<sl-avatar shape="rounded"></sl-avatar>

<sl-avatar shape="circle"></sl-avatar>
```

[component-metadata:sl-avatar]
