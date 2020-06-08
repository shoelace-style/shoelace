# Avatar

[component-header:sl-avatar]

Avatars are used to represent a person or object.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

```html preview
<sl-avatar></sl-avatar>

<sl-avatar initials="SL"></sl-avatar>

<sl-avatar image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" alt="Gray tabby kitten looking down"></sl-avatar>
```

[component-metadata:sl-avatar]

## Examples

### Shape

```html preview
<sl-avatar shape="square"></sl-avatar>

<sl-avatar shape="square" initials="SL"></sl-avatar>

<sl-avatar shape="square" image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" alt="Gray tabby kitten looking down"></sl-avatar>
```

### Custom Icon

```html preview
<sl-avatar>
  <sl-icon slot="icon" name="archive"></sl-icon>
</sl-avatar>

<sl-avatar>
  <sl-icon slot="icon" name="coffee"></sl-icon>
</sl-avatar>

<sl-avatar>
  <sl-icon slot="icon" name="feather"></sl-icon>
</sl-avatar>
```
