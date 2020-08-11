# Animation

[component-header:sl-animation]

Animate elements declaratively with over 500 baked-in presets, or roll your own with custom keyframes. Powered by the [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API).

To animate an element, wrap it in `<sl-animation>` and set a `name` and `duration`.

```html preview
<div class="animation-overview">
  <sl-animation name="bounce" duration="2000"><div class="box"></div></sl-animation>
  <sl-animation name="jello" duration="2000"><div class="box"></div></sl-animation>
  <sl-animation name="heart-beat" duration="2000"><div class="box"></div></sl-animation>
  <sl-animation name="flip" duration="2000"><div class="box"></div></sl-animation>
</div>

<style>
  .animation-overview .box {
    display: inline-block;
    width: 100px;
    height: 100px;
    background-color: var(--sl-color-primary-50);
    margin: 1.5rem;
  }
</style>
```

?> The animation will only be applied to the first child element found in `<sl-animation>`.

## Examples

### Sandbox

This example shows all of the built-in animations and easings. You can also adjust the playback rate.

```html preview
<div class="animation-sandbox">
  <sl-animation name="bounce" easing="ease-in-out" duration="2000">
    <div class="box"></div>
  </sl-animation>

  <div class="controls">
    <sl-select label="Animation" value="bounce"></sl-select>
    <sl-select label="Easing" value="linear"></sl-select>
    <sl-range min="0" max="2" step=".5" value="1"></sl-range>
  </div>
</div>

<script>
  const container = document.querySelector('.animation-sandbox');
  const animation = container.querySelector('sl-animation');
  const animationName = container.querySelector('.controls sl-select:nth-child(1)');
  const easingName = container.querySelector('.controls sl-select:nth-child(2)');
  const playbackRate = container.querySelector('sl-range');

  animation.getAnimationNames().then(names => {
    names.map(name => {
      const menuItem = Object.assign(document.createElement('sl-menu-item'), {
        textContent: name,
        value: name
      });
      animationName.appendChild(menuItem);
    });
  });

  animation.getEasingNames().then(names => {
    names.map(name => {
      const menuItem = Object.assign(document.createElement('sl-menu-item'), {
        textContent: name,
        value: name
      });
      easingName.appendChild(menuItem);
    });
  });  

  animationName.addEventListener('slChange', () => animation.name = animationName.value);
  easingName.addEventListener('slChange', () => animation.easing = easingName.value);
  playbackRate.addEventListener('slChange', () => animation.playbackRate = playbackRate.value);
  playbackRate.tooltipFormatter = val => `Playback Rate = ${val}`;
</script>

<style>
  .animation-sandbox .box {
    width: 100px;
    height: 100px;
    background-color: var(--sl-color-primary-50);
  }

  .animation-sandbox .controls {
    max-width: 300px;
    margin-top: 2rem;
  }

  .animation-sandbox .controls sl-select {
    margin-bottom: 1rem;
  }
</style>
```

### Custom Keyframe Formats

Supply your own [keyframe formats](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Keyframe_Formats) to build custom animations.

```html preview
<div class="animation-keyframes">
  <sl-animation easing="ease-in-out" duration="2000">
    <div class="box"></div>
  </sl-animation>
</div>

<script>
  const animation = document.querySelector('.animation-keyframes sl-animation');
  animation.keyframes = [
    { opacity: 1, easing: 'ease-out' }, 
    { opacity: 0.1, easing: 'ease-in' }, 
    { opacity: 0 }
  ];
</script>

<style>
  .animation-keyframes .box {
    width: 100px;
    height: 100px;
    background-color: var(--sl-color-primary-50);
  }
</style>
```

[component-metadata:sl-animation]
