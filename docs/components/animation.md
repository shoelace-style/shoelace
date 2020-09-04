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

?> The animation will be applied only to the first child element found in `<sl-animation>`.

## Examples

### Animations & Easings

This example demonstrates all of the baked-in animations and easings. All animations were generated based on the popular [Animate.css](https://animate.style/) and [Animista](https://animista.net/) projects.

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

### Using Intersection Observer

Use an [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to control the animation when an element enters or exits the viewport. For example, scroll the box below in and out of your screen. The animation stops when the box exits the viewport and restarts each time it enters the viewport.

```html preview
<div class="animation-scroll">
  <sl-animation name="scale-in-center" duration="3000" iterations="1"><div class="box"></div></sl-animation>
</div>

<script>
  const container = document.querySelector('.animation-scroll');
  const animation = container.querySelector('sl-animation');
  const box = animation.querySelector('.box');

  // Watch for the box to enter and exit the viewport. Note that we're observing the box, not the animation element!
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      // Start the animation when the box enters the viewport
      animation.pause = null;
    } else {
      // Reset the animation when the box leaves the viewport
      animation.pause = true;
      animation.setCurrentTime(0);
    }
  });
  observer.observe(box);
</script>

<style>
  .animation-scroll .box {
    display: inline-block;
    width: 100px;
    height: 100px;
    background-color: var(--sl-color-primary-50);
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
    { transform: 'translateY(0) rotateX(0)', transformOrigin: '50% 50%' }, 
    { transform: 'translateY(-100%) rotateX(-180deg)', transformOrigin: '50% 100%' },
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
