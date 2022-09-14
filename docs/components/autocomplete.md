# Autocomplete

[component-header:sl-autocomplete]

```html preview
<sl-autocomplete autofilter class="language-autocomplete">
  <sl-input slot="trigger" class="language-input"></sl-input>

  <sl-menu-item value="english">English</sl-menu-item>
  <sl-menu-item value="mandarin">Mandarin</sl-menu-item>
  <sl-menu-item value="hindi">Hindi</sl-menu-item>
  <sl-menu-item value="spanish">Spanish</sl-menu-item>
  <sl-menu-item value="french">French</sl-menu-item>
</sl-autocomplete>

<script>
  const autocomplete = document.querySelector('.language-autocomplete');
  const input = document.querySelector('.language-input');

  autocomplete.addEventListener('sl-select', event => {
    input.value = event.detail.item.textContent;
  });
</script>
```

```jsx react
// WIP...
```

## Examples

### Async

```html preview
<sl-autocomplete class="async-autocomplete">
  <sl-input slot="trigger" class="async-input"></sl-input>
</sl-autocomplete>

<script>
  const autocomplete = document.querySelector('.async-autocomplete');
  const input = document.querySelector('.async-input');

  input.addEventListener('sl-input', event => {
    autocomplete.loading = true;

    setTimeout(() => {
      const menuItemTags = ['English', 'Mandarin', 'Spanish']
        .filter(option => new RegExp(event.target.value, 'ig').test(option))
        .map(option => `<sl-menu-item value="${option}">${option}</sl-menu-item>`)
        .join('');

      autocomplete.querySelectorAll('sl-menu-item').forEach(el => el.remove());
      autocomplete.insertAdjacentHTML('beforeend', menuItemTags);
      autocomplete.loading = false;
    }, 1000);
  });

  autocomplete.addEventListener('sl-select', event => {
    input.value = event.detail.item.textContent;
  });
</script>
```

```jsx react
// WIP...
```

### Loading State

```html preview
<sl-autocomplete class="loading-autocomplete">
  <sl-input slot="trigger" class="loading-input"></sl-input>

  <div slot="loading-text" style="margin: 1rem;">
    <sl-skeleton effect="pulse"></sl-skeleton>
    <sl-skeleton effect="pulse"></sl-skeleton>
    <sl-skeleton effect="pulse"></sl-skeleton>
  </div>
</sl-autocomplete>

<script>
  const autocomplete = document.querySelector('.loading-autocomplete');
  const input = document.querySelector('.loading-input');

  input.addEventListener('sl-input', event => {
    autocomplete.loading = true;

    setTimeout(() => {
      const menuItemTags = ['English', 'Mandarin', 'Spanish']
        .map(option => `<sl-menu-item value="${option}">${option}</sl-menu-item>`)
        .join('');

      autocomplete.querySelectorAll('sl-menu-item').forEach(el => el.remove());
      autocomplete.insertAdjacentHTML('beforeend', menuItemTags);
      autocomplete.loading = false;
    }, 1000);
  });

  autocomplete.addEventListener('sl-select', event => {
    input.value = event.detail.item.textContent;
  });
</script>

<style>
  sl-autocomplete sl-skeleton:not(:first-child) {
    margin-top: 1rem;
  }
</style>
```

### Empty State

```html preview
<sl-autocomplete autofilter>
  <sl-input slot="trigger""></sl-input>

  <sl-menu-item value="option-1">Option 1</sl-menu-item>
  <sl-menu-item value="option-2">Option 2</sl-menu-item>
  <sl-menu-item value="option-3">Option 3</sl-menu-item>

  <div slot="empty-text" style="text-align: center; margin: var(--sl-spacing-small); color: var(--sl-color-neutral-500);">
    We could not find any matches. Please try again.
  </div>
</sl-autocomplete>
```

[component-metadata:sl-autocomplete]
