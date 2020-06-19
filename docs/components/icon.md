# Icon

[component-header:sl-icon]

Icons are symbols that can be used to represent or provide context to various options and actions within an application.

Shoelace comes bundled with over 600 icons courtesy of the [Bootstrap Icons](https://icons.getbootstrap.com/) project. However, you can also use your own SVG icons with the `src` attribute.

Hover to see the respective icon's `name` or click to copy the HTML tag to the clipboard.

<div class="icon-search">
  <sl-input placeholder="Search Icons" clearable class="icon-search"></sl-input>
  <div class="icon-loader"><sl-spinner size="48"></sl-spinner></div>
  <div class="icon-list" hidden></div>
  <input type="text" class="icon-copy-input">
</div>

[component-metadata:sl-icon]

## Examples

### Sizes

Icon sizes are determined by the current font size.

```html preview
<div style="font-size: 32px;">
  <sl-icon name="exclamation-triangle"></sl-icon>
  <sl-icon name="archive"></sl-icon>
  <sl-icon name="battery-charging"></sl-icon>
  <sl-icon name="bell"></sl-icon>
  <sl-icon name="clock"></sl-icon>
  <sl-icon name="download"></sl-icon>
  <sl-icon name="file-earmark"></sl-icon>
  <sl-icon name="flag"></sl-icon>
  <sl-icon name="heart"></sl-icon>
  <sl-icon name="image"></sl-icon>
  <sl-icon name="lightning"></sl-icon>
  <sl-icon name="mic"></sl-icon>
  <sl-icon name="search"></sl-icon>
  <sl-icon name="star"></sl-icon>
  <sl-icon name="trash"></sl-icon>
  <sl-icon name="x-circle"></sl-icon>
</div>
```

<script>
  fetch('/dist/shoelace/icons/icons.json')
    .then(res => res.json())
    .then(icons => {
      const container = document.querySelector('.icon-search');
      const input = container.querySelector('sl-input');
      const copyInput = container.querySelector('.icon-copy-input');
      const loader = container.querySelector('.icon-loader');
      const list = container.querySelector('.icon-list');
      const queue = [];

      icons.map(i => {
        const icon = document.createElement('sl-icon');
        icon.setAttribute('data-name', i.name);
        icon.setAttribute('data-terms', [...i.tags || [], i.categories || [], i.title].join(' '));
        icon.name = i.name;

        const tooltip = document.createElement('sl-tooltip');
        tooltip.content = i.name;

        tooltip.appendChild(icon);        
        list.appendChild(tooltip);

        queue.push(new Promise((resolve, reject) => {
          icon.addEventListener('slLoad', () => resolve());
          icon.addEventListener('slError', () => reoslve());
        }));

        icon.addEventListener('click', () => {
          copyInput.value = `<sl-icon name="${i.name}"></sl-icon>`;
          copyInput.select();
          document.execCommand('copy');
          tooltip.content = 'Copied!';
          setTimeout(() => tooltip.content = i.name, 1000);
        });
      });

      Promise.all(queue).then(() => {
        list.hidden = false;
        loader.hidden = true;
      });

      input.addEventListener('slInput', () => {
        [...list.querySelectorAll('sl-icon')].map(slIcon => {
          if (input.value === '') {
            slIcon.hidden = false;
          } else {
            const terms = slIcon.getAttribute('data-terms').toLowerCase();
            const filter = input.value.toLowerCase();
            slIcon.hidden = terms.indexOf(filter) < 0;
          }
        });
      });
    });
</script>

<style>
  .icon-loader {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 30vh;
  }

  .icon-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 1rem;
  }

  .icon-loader[hidden],
  .icon-list[hidden] {
    display: none;
  }

  .icon-list sl-icon {
    font-size: 32px;
    border-radius: var(--sl-border-radius-medium);
    padding: .5em;
    transition: var(--sl-transition-medium) all;
    cursor: pointer;
  }

  .icon-list sl-icon:hover {
    background-color: var(--sl-color-primary-95);
    color: var(--sl-color-primary-50);
  }

  .icon-copy-input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }
</style>