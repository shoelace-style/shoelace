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


### Avatar Groups

You can group avatars with a few lines of CSS.

```html preview
<div class="avatar-group">
  <sl-avatar image="https://images.unsplash.com/photo-1490150028299-bf57d78394e0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80&crop=right"></sl-avatar>
  <sl-avatar image="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&crop=left&q=80"></sl-avatar>
  <sl-avatar image="https://images.unsplash.com/photo-1456439663599-95b042d50252?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&crop=left&q=80"></sl-avatar>
  <sl-avatar image="https://images.unsplash.com/flagged/photo-1554078875-e37cb8b0e27d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&crop=top&q=80"></sl-avatar>
</div>

<style>
  .avatar-group sl-avatar:not(:first-of-type) {
    margin-left: -1rem;
  }

  .avatar-group sl-avatar::part(base) {
    border: solid 2px white;
  }
</style>
```

[component-metadata:sl-avatar]
