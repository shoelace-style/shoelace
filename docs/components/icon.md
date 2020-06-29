# Icon

[component-header:sl-icon]

Icons are symbols that can be used to represent or provide context to various options and actions within an application.

Shoelace comes bundled with over 1,000 icons courtesy of the [Bootstrap Icons](https://icons.getbootstrap.com/) project. Click or tap on an icon below to copy the name and use it like this.

```html
<sl-icon name="icon-name-here"></sl-icon>
```

<div class="icon-search">
  <div class="icon-search-controls">
    <sl-input placeholder="Search Icons" clearable>
      <sl-icon slot="prefix" name="search"></sl-icon>
    </sl-input>
    <sl-select value="outline">
      <sl-menu-item value="outline">Outlined</sl-menu-item>
      <sl-menu-item value="fill">Filled</sl-menu-item>
      <sl-menu-item value="all">All icons</sl-menu-item>
    </sl-select>
  </div>
  <div class="icon-loader"><sl-spinner size="48"></sl-spinner></div>
  <div class="icon-list" hidden></div>
  <div class="icon-no-results" hidden>No Results</div>
  <input type="text" class="icon-copy-input">
</div>

[component-metadata:sl-icon]

## Examples

### Sizes

Icons are sized relative to the current font size. To change their size, set the `font-size` property on the icon itself or on a parent element as shown below.

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

### Custom Icons

Custom icons can be loaded by setting the `src` attribute. Only SVG images are supported

```html preview
<sl-icon src="/assets/images/boot.svg" style="font-size: 8rem;"></sl-icon>
```

<script>
  fetch('/dist/shoelace/icons/icons.json')
    .then(res => res.json())
    .then(icons => {
      const container = document.querySelector('.icon-search');
      const input = container.querySelector('sl-input');
      const select = container.querySelector('sl-select');
      const copyInput = container.querySelector('.icon-copy-input');
      const loader = container.querySelector('.icon-loader');
      const list = container.querySelector('.icon-list');
      const queue = [];

      // Generate icons
      icons.map(i => {
        const icon = document.createElement('sl-icon');
        icon.setAttribute('data-name', i.name);
        icon.setAttribute('data-terms', [i.name, i.title, ...(i.tags || []), ...(i.categories || [])].join(' '));
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
          copyInput.value = i.name;
          copyInput.select();
          document.execCommand('copy');
          tooltip.content = 'Copied!';
          setTimeout(() => tooltip.content = i.name, 1000);
        });
      });

      // Wait for all icons to load
      Promise.all(queue).then(() => {
        list.hidden = false;
        loader.hidden = true;
      });

      // Filter as the user types
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

      // Sort by type and remember preference
      const iconType = localStorage.getItem('sl-icon:type') || 'outline';
      select.value = iconType;
      list.setAttribute('data-type', select.value);
      select.addEventListener('slChange', () => {
        list.setAttribute('data-type', select.value);
        localStorage.setItem('sl-icon:type', select.value);
      });
    });
</script>

<style>
  .icon-search {
    border: solid 1px var(--sl-color-gray-90);
    border-radius: var(--sl-border-radius-medium);
    padding: var(--sl-spacing-medium);
  }

  .icon-search-controls {
    display: flex;
  }

  .icon-search-controls sl-input {
    flex: 1 1 auto;
  }

  .icon-search-controls sl-select {
    flex: 0 0 auto;
    margin-left: 1rem;
  }

  .icon-loader {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 30vh;
  }

  .icon-list {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    position: relative;
    margin-top: 1rem;
  }

  .icon-loader[hidden],
  .icon-list[hidden] {
    display: none;
  }

  .icon-list sl-icon {
    font-size: 24px;
    border-radius: var(--sl-border-radius-circle);
    padding: .5em;
    margin: 0 auto;
    transition: var(--sl-transition-medium) all;
    cursor: pointer;
  }

  .icon-list sl-icon:hover {
    background-color: var(--sl-color-primary-95);
    color: var(--sl-color-primary-50);
  }

  .icon-list[data-type="outline"] sl-icon[data-name$="-fill"] {
    display: none;
  }

  .icon-list[data-type="fill"] sl-icon:not([data-name$="-fill"]) {
    display: none;
  }

  .icon-copy-input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  @media screen and (max-width: 1000px) {
    .icon-search-controls {
      display: block;
    }

    .icon-search-controls sl-select {
      margin-left: 0;
      margin-top: 1rem;
    }

    .icon-list {
      grid-template-columns: repeat(8, 1fr);
    }

    .icon-list sl-icon {
      font-size: 20px;
    }    
  }  
</style>