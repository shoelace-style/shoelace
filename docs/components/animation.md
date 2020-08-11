# Animation

[component-header:sl-animation]

Animate elements declaratively using the [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API). Select from over 500 baked-in presets or roll your own with custom [keyframe formats](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Keyframe_Formats).

```html preview
<div class="animation-overview">
  <sl-animation
    name="bounce"
    easing="ease-in-out"
    duration="2000"
    delay="0"
  >
    <div style="width: 100px; height: 100px; background-color: var(--sl-color-primary-50);"></div>
  </sl-animation>

  <br>

  <sl-select value="bounce"></sl-select>

  <sl-range min="0" max="2" step=".5" value="1"></sl-range>

  <sl-button circle><sl-icon name="pause"></sl-icon></sl-button>
</div>

<script>
  const animation = document.querySelector('.animation-overview sl-animation');
  const select = document.querySelector('.animation-overview sl-select');
  const range = document.querySelector('.animation-overview sl-range');
  const pauseButton = document.querySelector('.animation-overview sl-icon[name="pause"]').parentElement;
  const pauseButtonIcon = pauseButton.querySelector('sl-icon');

  animation.getAnimationNames().then(names => {
    names.map(name => {
      const menuItem = Object.assign(document.createElement('sl-menu-item'), {
        textContent: name,
        value: name
      });
      select.appendChild(menuItem);
    });
  });

  select.addEventListener('slChange', () => animation.name = select.value);

  range.addEventListener('slChange', () => animation.playbackRate = range.value);

  animation.addEventListener('slCancel', event => console.log(event));
  animation.addEventListener('slFinish', event => console.log(event));

  pauseButton.addEventListener('click', () => {
    animation.pause = !animation.pause;
    pauseButtonIcon.name = animation.pause ? 'play' : 'pause';
  });
</script>
```

## Examples

[component-metadata:sl-animation]
