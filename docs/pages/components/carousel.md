---
meta:
  title: Carousel
  description: Carousels display an arbitrary number of content slides along a horizontal or vertical axis.
layout: component
---

```html:preview
<sl-carousel pagination navigation mouse-dragging loop>
  <sl-carousel-item>
    <img
      alt="The sun shines on the mountains and trees (by Adam Kool on Unsplash)"
      src="/assets/examples/carousel/mountains.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
      src="/assets/examples/carousel/waterfall.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="The sun is setting over a lavender field (by Leonard Cotte on Unsplash)"
      src="/assets/examples/carousel/sunset.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A field of grass with the sun setting in the background (by Sapan Patel on Unsplash)"
      src="/assets/examples/carousel/field.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A scenic view of a mountain with clouds rolling in (by V2osk on Unsplash)"
      src="/assets/examples/carousel/valley.jpg"
    />
  </sl-carousel-item>
</sl-carousel>
```

```jsx:react
import SlCarousel from '@shoelace-style/shoelace/dist/react/carousel';
import SlCarouselItem from '@shoelace-style/shoelace/dist/react/carousel-item';

const App = () => (
  <>
    <SlCarousel pagination mouse-dragging>
      <SlCarouselItem>
        <img
          alt="The sun shines on the mountains and trees (by Adam Kool on Unsplash)"
          src="/assets/examples/carousel/mountains.jpg"
        />
      </SlCarouselItem>
      <SlCarouselItem>
        <img
          alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
          src="/assets/examples/carousel/waterfall.jpg"
        />
      </SlCarouselItem>
      <SlCarouselItem>
        <img
          alt="The sun is setting over a lavender field (by Leonard Cotte on Unsplash)"
          src="/assets/examples/carousel/sunset.jpg"
        />
      </SlCarouselItem>
      <SlCarouselItem>
        <img
          alt="A field of grass with the sun setting in the background (by Sapan Patel on Unsplash)"
          src="/assets/examples/carousel/field.jpg"
        />
      </SlCarouselItem>
      <SlCarouselItem>
        <img
          alt="A scenic view of a mountain with clouds rolling in (by V2osk on Unsplash)"
          src="/assets/examples/carousel/valley.jpg"
        />
      </SlCarouselItem>
    </SlCarousel>
  </>
);
```

## Examples

### Pagination

Use the `pagination` attribute to show the total number of slides and the current slide as a set of interactive dots.

```html:preview
<sl-carousel pagination>
  <sl-carousel-item>
    <img
      alt="The sun shines on the mountains and trees (by Adam Kool on Unsplash)"
      src="/assets/examples/carousel/mountains.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
      src="/assets/examples/carousel/waterfall.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="The sun is setting over a lavender field (by Leonard Cotte on Unsplash)"
      src="/assets/examples/carousel/sunset.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A field of grass with the sun setting in the background (by Sapan Patel on Unsplash)"
      src="/assets/examples/carousel/field.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A scenic view of a mountain with clouds rolling in (by V2osk on Unsplash)"
      src="/assets/examples/carousel/valley.jpg"
    />
  </sl-carousel-item>
</sl-carousel>
```

```jsx:react
import SlCarousel from '@shoelace-style/shoelace/dist/react/carousel';
import SlCarouselItem from '@shoelace-style/shoelace/dist/react/carousel-item';

const App = () => (
  <SlCarousel pagination>
    <SlCarouselItem>
      <img
        alt="The sun shines on the mountains and trees (by Adam Kool on Unsplash)"
        src="/assets/examples/carousel/mountains.jpg"
      />
    </SlCarouselItem>
    <SlCarouselItem>
      <img
        alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
        src="/assets/examples/carousel/waterfall.jpg"
      />
    </SlCarouselItem>
    <SlCarouselItem>
      <img
        alt="The sun is setting over a lavender field (by Leonard Cotte on Unsplash)"
        src="/assets/examples/carousel/sunset.jpg"
      />
    </SlCarouselItem>
    <SlCarouselItem>
      <img
        alt="A field of grass with the sun setting in the background (by Sapan Patel on Unsplash)"
        src="/assets/examples/carousel/field.jpg"
      />
    </SlCarouselItem>
    <SlCarouselItem>
      <img
        alt="A scenic view of a mountain with clouds rolling in (by V2osk on Unsplash)"
        src="/assets/examples/carousel/valley.jpg"
      />
    </SlCarouselItem>
  </SlCarousel>
);
```

### Navigation

Use the `navigation` attribute to show previous and next buttons.

```html:preview
<sl-carousel navigation>
  <sl-carousel-item>
    <img
      alt="The sun shines on the mountains and trees (by Adam Kool on Unsplash)"
      src="/assets/examples/carousel/mountains.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
      src="/assets/examples/carousel/waterfall.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="The sun is setting over a lavender field (by Leonard Cotte on Unsplash)"
      src="/assets/examples/carousel/sunset.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A field of grass with the sun setting in the background (by Sapan Patel on Unsplash)"
      src="/assets/examples/carousel/field.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A scenic view of a mountain with clouds rolling in (by V2osk on Unsplash)"
      src="/assets/examples/carousel/valley.jpg"
    />
  </sl-carousel-item>
</sl-carousel>
```

```jsx:react
import SlCarousel from '@shoelace-style/shoelace/dist/react/carousel';
import SlCarouselItem from '@shoelace-style/shoelace/dist/react/carousel-item';

const App = () => (
  <SlCarousel navigation>
    <SlCarouselItem>
      <img
        alt="The sun shines on the mountains and trees (by Adam Kool on Unsplash)"
        src="/assets/examples/carousel/mountains.jpg"
      />
    </SlCarouselItem>
    <SlCarouselItem>
      <img
        alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
        src="/assets/examples/carousel/waterfall.jpg"
      />
    </SlCarouselItem>
    <SlCarouselItem>
      <img
        alt="The sun is setting over a lavender field (by Leonard Cotte on Unsplash)"
        src="/assets/examples/carousel/sunset.jpg"
      />
    </SlCarouselItem>
    <SlCarouselItem>
      <img
        alt="A field of grass with the sun setting in the background (by Sapan Patel on Unsplash)"
        src="/assets/examples/carousel/field.jpg"
      />
    </SlCarouselItem>
    <SlCarouselItem>
      <img
        alt="A scenic view of a mountain with clouds rolling in (by V2osk on Unsplash)"
        src="/assets/examples/carousel/valley.jpg"
      />
    </SlCarouselItem>
  </SlCarousel>
);
```

### Looping

By default, the carousel will not advanced beyond the first and last slides. You can change this behavior and force the carousel to "wrap" with the `loop` attribute.

```html:preview
<sl-carousel loop navigation pagination>
  <sl-carousel-item>
    <img
      alt="The sun shines on the mountains and trees (by Adam Kool on Unsplash)"
      src="/assets/examples/carousel/mountains.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
      src="/assets/examples/carousel/waterfall.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="The sun is setting over a lavender field (by Leonard Cotte on Unsplash)"
      src="/assets/examples/carousel/sunset.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A field of grass with the sun setting in the background (by Sapan Patel on Unsplash)"
      src="/assets/examples/carousel/field.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A scenic view of a mountain with clouds rolling in (by V2osk on Unsplash)"
      src="/assets/examples/carousel/valley.jpg"
    />
  </sl-carousel-item>
</sl-carousel>
```

```jsx:react
import SlCarousel from '@shoelace-style/shoelace/dist/react/carousel';
import SlCarouselItem from '@shoelace-style/shoelace/dist/react/carousel-item';

const App = () => (
  <SlCarousel loop navigation pagination>
    <SlCarouselItem>
      <img
        alt="The sun shines on the mountains and trees (by Adam Kool on Unsplash)"
        src="/assets/examples/carousel/mountains.jpg"
      />
    </SlCarouselItem>
    <SlCarouselItem>
      <img
        alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
        src="/assets/examples/carousel/waterfall.jpg"
      />
    </SlCarouselItem>
    <SlCarouselItem>
      <img
        alt="The sun is setting over a lavender field (by Leonard Cotte on Unsplash)"
        src="/assets/examples/carousel/sunset.jpg"
      />
    </SlCarouselItem>
    <SlCarouselItem>
      <img
        alt="A field of grass with the sun setting in the background (by Sapan Patel on Unsplash)"
        src="/assets/examples/carousel/field.jpg"
      />
    </SlCarouselItem>
    <SlCarouselItem>
      <img
        alt="A scenic view of a mountain with clouds rolling in (by V2osk on Unsplash)"
        src="/assets/examples/carousel/valley.jpg"
      />
    </SlCarouselItem>
  </SlCarousel>
);
```

### Autoplay

The carousel will automatically advance when the `autoplay` attribute is used. To change how long a slide is shown before advancing, set `autoplay-interval` to the desired number of milliseconds. For best results, use the `loop` attribute when autoplay is enabled. Note that autoplay will pause while the user interacts with the carousel.

```html:preview
<sl-carousel autoplay loop pagination>
  <sl-carousel-item>
    <img
      alt="The sun shines on the mountains and trees (by Adam Kool on Unsplash)"
      src="/assets/examples/carousel/mountains.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
      src="/assets/examples/carousel/waterfall.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="The sun is setting over a lavender field (by Leonard Cotte on Unsplash)"
      src="/assets/examples/carousel/sunset.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A field of grass with the sun setting in the background (by Sapan Patel on Unsplash)"
      src="/assets/examples/carousel/field.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A scenic view of a mountain with clouds rolling in (by V2osk on Unsplash)"
      src="/assets/examples/carousel/valley.jpg"
    />
  </sl-carousel-item>
</sl-carousel>
```

```jsx:react
import SlCarousel from '@shoelace-style/shoelace/dist/react/carousel';
import SlCarouselItem from '@shoelace-style/shoelace/dist/react/carousel-item';

const App = () => (
  <SlCarousel autoplay loop pagination>
    <SlCarouselItem>
      <img
        alt="The sun shines on the mountains and trees (by Adam Kool on Unsplash)"
        src="/assets/examples/carousel/mountains.jpg"
      />
    </SlCarouselItem>
    <SlCarouselItem>
      <img
        alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
        src="/assets/examples/carousel/waterfall.jpg"
      />
    </SlCarouselItem>
    <SlCarouselItem>
      <img
        alt="The sun is setting over a lavender field (by Leonard Cotte on Unsplash)"
        src="/assets/examples/carousel/sunset.jpg"
      />
    </SlCarouselItem>
    <SlCarouselItem>
      <img
        alt="A field of grass with the sun setting in the background (by Sapan Patel on Unsplash)"
        src="/assets/examples/carousel/field.jpg"
      />
    </SlCarouselItem>
    <SlCarouselItem>
      <img
        alt="A scenic view of a mountain with clouds rolling in (by V2osk on Unsplash)"
        src="/assets/examples/carousel/valley.jpg"
      />
    </SlCarouselItem>
  </SlCarousel>
);
```

### Mouse Dragging

The carousel uses [scroll snap](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scroll_Snap) to position slides at various snap positions. This allows users to scroll through the slides very naturally, especially on touch devices. Unfortunately, desktop users won't be able to click and drag with a mouse, which can feel unnatural. Adding the `mouse-dragging` attribute can help with this.

This example is best demonstrated using a mouse. Try clicking and dragging the slide to move it. Then toggle the switch and try again.

```html:preview
<div class="mouse-dragging">
  <sl-carousel pagination>
    <sl-carousel-item>
      <img
        alt="The sun shines on the mountains and trees (by Adam Kool on Unsplash)"
        src="/assets/examples/carousel/mountains.jpg"
      />
    </sl-carousel-item>
    <sl-carousel-item>
      <img
        alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
        src="/assets/examples/carousel/waterfall.jpg"
      />
    </sl-carousel-item>
    <sl-carousel-item>
      <img
        alt="The sun is setting over a lavender field (by Leonard Cotte on Unsplash)"
        src="/assets/examples/carousel/sunset.jpg"
      />
    </sl-carousel-item>
    <sl-carousel-item>
      <img
        alt="A field of grass with the sun setting in the background (by Sapan Patel on Unsplash)"
        src="/assets/examples/carousel/field.jpg"
      />
    </sl-carousel-item>
    <sl-carousel-item>
      <img
        alt="A scenic view of a mountain with clouds rolling in (by V2osk on Unsplash)"
        src="/assets/examples/carousel/valley.jpg"
      />
    </sl-carousel-item>
  </sl-carousel>

  <sl-divider></sl-divider>

  <sl-switch>Enable mouse dragging</sl-switch>
</div>

<script>
  const container = document.querySelector('.mouse-dragging');
  const carousel = container.querySelector('sl-carousel');
  const toggle = container.querySelector('sl-switch');

  toggle.addEventListener('sl-change', () => {
    carousel.toggleAttribute('mouse-dragging', toggle.checked);
  });
</script>
```

```jsx:react
import { useState } from 'react';
import SlCarousel from '@shoelace-style/shoelace/dist/react/carousel';
import SlCarouselItem from '@shoelace-style/shoelace/dist/react/carousel-item';
import SlDivider from '@shoelace-style/shoelace/dist/react/divider';
import SlSwitch from '@shoelace-style/shoelace/dist/react/switch';

const App = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <>
      <SlCarousel navigation mouseDragging={isEnabled}>
        <SlCarouselItem>
          <img
            alt="The sun shines on the mountains and trees (by Adam Kool on Unsplash)"
            src="/assets/examples/carousel/mountains.jpg"
          />
        </SlCarouselItem>
        <SlCarouselItem>
          <img
            alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
            src="/assets/examples/carousel/waterfall.jpg"
          />
        </SlCarouselItem>
        <SlCarouselItem>
          <img
            alt="The sun is setting over a lavender field (by Leonard Cotte on Unsplash)"
            src="/assets/examples/carousel/sunset.jpg"
          />
        </SlCarouselItem>
        <SlCarouselItem>
          <img
            alt="A field of grass with the sun setting in the background (by Sapan Patel on Unsplash)"
            src="/assets/examples/carousel/field.jpg"
          />
        </SlCarouselItem>
        <SlCarouselItem>
          <img
            alt="A scenic view of a mountain with clouds rolling in (by V2osk on Unsplash)"
            src="/assets/examples/carousel/valley.jpg"
          />
        </SlCarouselItem>
      </SlCarousel>

      <SlDivider></SlDivider>

      <SlSwitch checked={isEnabled} onSlInput={() => setIsEnabled(!isEnabled)}>
        Enable mouse dragging
      </SlSwitch>
    </>
  );
};
```

### Multiple Slides Per View

The `slides-per-page` attribute makes it possible to display multiple slides at a time. You can also use the `slides-per-move` attribute to advance more than once slide at a time, if desired.

```html:preview
<sl-carousel navigation pagination slides-per-page="2" slides-per-move="2">
  <sl-carousel-item style="background: var(--sl-color-red-200);">Slide 1</sl-carousel-item>
  <sl-carousel-item style="background: var(--sl-color-orange-200);">Slide 2</sl-carousel-item>
  <sl-carousel-item style="background: var(--sl-color-yellow-200);">Slide 3</sl-carousel-item>
  <sl-carousel-item style="background: var(--sl-color-green-200);">Slide 4</sl-carousel-item>
  <sl-carousel-item style="background: var(--sl-color-blue-200);">Slide 5</sl-carousel-item>
  <sl-carousel-item style="background: var(--sl-color-violet-200);">Slide 6</sl-carousel-item>
</sl-carousel>
```

{% raw %}

```jsx:react
import SlCarousel from '@shoelace-style/shoelace/dist/react/carousel';
import SlCarouselItem from '@shoelace-style/shoelace/dist/react/carousel-item';

const App = () => (
  <SlCarousel navigation pagination slidesPerPage={2} slidesPerMove={2}>
    <SlCarouselItem style={{ background: 'var(--sl-color-red-200)' }}>Slide 1</SlCarouselItem>
    <SlCarouselItem style={{ background: 'var(--sl-color-orange-200)' }}>Slide 2</SlCarouselItem>
    <SlCarouselItem style={{ background: 'var(--sl-color-yellow-200)' }}>Slide 3</SlCarouselItem>
    <SlCarouselItem style={{ background: 'var(--sl-color-green-200)' }}>Slide 4</SlCarouselItem>
    <SlCarouselItem style={{ background: 'var(--sl-color-blue-200)' }}>Slide 5</SlCarouselItem>
    <SlCarouselItem style={{ background: 'var(--sl-color-violet-200)' }}>Slide 6</SlCarouselItem>
  </SlCarousel>
);
```

{% endraw %}

### Adding and Removing Slides

The content of the carousel can be changed by adding or removing carousel items. The carousel will update itself automatically.

```html:preview
<sl-carousel class="dynamic-carousel" pagination navigation>
  <sl-carousel-item style="background: var(--sl-color-red-200)">Slide 1</sl-carousel-item>
  <sl-carousel-item style="background: var(--sl-color-orange-200)">Slide 2</sl-carousel-item>
  <sl-carousel-item style="background: var(--sl-color-yellow-200)">Slide 3</sl-carousel-item>
</sl-carousel>

<div class="carousel-options">
  <sl-button id="dynamic-add">Add slide</sl-button>
  <sl-button id="dynamic-remove">Remove slide</sl-button>
</div>

<style>
  .dynamic-carousel {
    --aspect-ratio: 3 / 2;
  }

  .dynamic-carousel ~ .carousel-options {
    display: flex;
    justify-content: center;
    gap: var(--sl-spacing-x-small);
    margin-top: var(--sl-spacing-large);
  }

  .dynamic-carousel sl-carousel-item {
    flex: 0 0 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--sl-font-size-2x-large);
  }
</style>

<script>
  (() => {
    const dynamicCarousel = document.querySelector('.dynamic-carousel');
    const dynamicAdd = document.querySelector('#dynamic-add');
    const dynamicRemove = document.querySelector('#dynamic-remove');
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'violet'];
    let colorIndex = 2;

    const addSlide = () => {
      const slide = document.createElement('sl-carousel-item');
      const color = colors[++colorIndex % colors.length];
      slide.innerText = `Slide ${dynamicCarousel.children.length + 1}`;
      slide.style.setProperty('background', `var(--sl-color-${color}-200)`);
      dynamicCarousel.appendChild(slide);
      dynamicRemove.disabled = false;
    };

    const removeSlide = () => {
      const slide = dynamicCarousel.children[dynamicCarousel.children.length - 1];
      const numSlides = dynamicCarousel.querySelectorAll('sl-carousel-item').length;

      if (numSlides > 1) {
        slide.remove();
        colorIndex--;
      }

      dynamicRemove.disabled = numSlides - 1 <= 1;
    };

    dynamicAdd.addEventListener('click', addSlide);
    dynamicRemove.addEventListener('click', removeSlide);
  })();
</script>
```

{% raw %}

```jsx:react
import { useState } from 'react';
import SlCarousel from '@shoelace-style/shoelace/dist/react/carousel';
import SlCarouselItem from '@shoelace-style/shoelace/dist/react/carousel-item';

const css = `
  .dynamic-carousel {
    --aspect-ratio: 3 / 2;
  }

  .dynamic-carousel ~ .carousel-options {
    display: flex;
    justify-content: center;
    margin-top: var(--sl-spacing-large);
  }

  .dynamic-carousel sl-carousel-item {
    flex: 0 0 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: var(--sl-font-size-2x-large);
  }
`;

const App = () => {
  const [slides, setSlides] = useState(['#204ed8', '#be133d', '#6e28d9']);
  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'violet'];

  const addSlide = () => {
    setSlides([...slides, getRandomColor()]);
  };

  const removeSlide = () => {
    setSlides(slides.slice(0, -1));
  };

  return (
    <>
      <SlCarousel className="dynamic-carousel" pagination navigation>
        {slides.map((color, i) => (
          <SlCarouselItem style={{ background: colors[i % colors.length }}>
            Slide {i}
          </SlCarouselItem>
        ))}
      </SlCarousel>

      <div className="carousel-options">
        <SlButton onClick={addSlide}>Add slide</SlButton>
        <SlButton onClick={removeSlide}>Remove slide</SlButton>
      </div>

      <style>{css}</style>
    </>
  );
};
```

{% endraw %}

### Vertical Scrolling

Setting the `orientation` attribute to `vertical` will render the carousel in a vertical layout. If the content of your slides vary in height, you will need to set amn explicit `height` or `max-height` on the carousel using CSS.

```html:preview
<sl-carousel class="vertical" pagination orientation="vertical">
  <sl-carousel-item>
    <img
      alt="The sun shines on the mountains and trees (by Adam Kool on Unsplash)"
      src="/assets/examples/carousel/mountains.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
      src="/assets/examples/carousel/waterfall.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="The sun is setting over a lavender field (by Leonard Cotte on Unsplash)"
      src="/assets/examples/carousel/sunset.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A field of grass with the sun setting in the background (by Sapan Patel on Unsplash)"
      src="/assets/examples/carousel/field.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A scenic view of a mountain with clouds rolling in (by V2osk on Unsplash)"
      src="/assets/examples/carousel/valley.jpg"
    />
  </sl-carousel-item>
</sl-carousel>
<style>
  .vertical {
    max-height: 400px;
  }

  .vertical::part(base) {
    grid-template-areas: 'slides slides pagination';
  }

  .vertical::part(pagination) {
    flex-direction: column;
  }

  .vertical::part(navigation) {
    transform: rotate(90deg);
    display: flex;
  }
</style>
```

```jsx:react
import SlCarousel from '@shoelace-style/shoelace/dist/react/carousel';
import SlCarouselItem from '@shoelace-style/shoelace/dist/react/carousel-item';

const css = `
  .vertical {
    max-height: 400px;
  }

  .vertical::part(base) {
    grid-template-areas: 'slides slides pagination';
  }

  .vertical::part(pagination) {
    flex-direction: column;
  }

  .vertical::part(navigation) {
    transform: rotate(90deg);
    display: flex;
  }
`;

const App = () => (
  <>
    <SlCarousel className="vertical" loop pagination orientation="vertical">
      <SlCarouselItem>
        <img
          alt="The sun shines on the mountains and trees (by Adam Kool on Unsplash)"
          src="/assets/examples/carousel/mountains.jpg"
        />
      </SlCarouselItem>
      <SlCarouselItem>
        <img
          alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
          src="/assets/examples/carousel/waterfall.jpg"
        />
      </SlCarouselItem>
      <SlCarouselItem>
        <img
          alt="The sun is setting over a lavender field (by Leonard Cotte on Unsplash)"
          src="/assets/examples/carousel/sunset.jpg"
        />
      </SlCarouselItem>
      <SlCarouselItem>
        <img
          alt="A field of grass with the sun setting in the background (by Sapan Patel on Unsplash)"
          src="/assets/examples/carousel/field.jpg"
        />
      </SlCarouselItem>
      <SlCarouselItem>
        <img
          alt="A scenic view of a mountain with clouds rolling in (by V2osk on Unsplash)"
          src="/assets/examples/carousel/valley.jpg"
        />
      </SlCarouselItem>
    </SlCarousel>
    <style>{css}</style>
  </>
);
```

### Aspect Ratio

Use the `--aspect-ratio` custom property to customize the size of the carousel's viewport from the default value of 16/9.

```html:preview
<sl-carousel class="aspect-ratio" navigation pagination style="--aspect-ratio: 3/2;">
  <sl-carousel-item>
    <img
      alt="The sun shines on the mountains and trees (by Adam Kool on Unsplash)"
      src="/assets/examples/carousel/mountains.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
      src="/assets/examples/carousel/waterfall.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="The sun is setting over a lavender field (by Leonard Cotte on Unsplash)"
      src="/assets/examples/carousel/sunset.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A field of grass with the sun setting in the background (by Sapan Patel on Unsplash)"
      src="/assets/examples/carousel/field.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A scenic view of a mountain with clouds rolling in (by V2osk on Unsplash)"
      src="/assets/examples/carousel/valley.jpg"
    />
  </sl-carousel-item>
</sl-carousel>

<sl-divider></sl-divider>

<sl-select label="Aspect ratio" name="aspect" value="3/2">
  <sl-option value="1/1">1/1</sl-option>
  <sl-option value="3/2">3/2</sl-option>
  <sl-option value="16/9">16/9</sl-option>
</sl-select>

<script>
  (() => {
    const carousel = document.querySelector('sl-carousel.aspect-ratio');
    const aspectRatio = document.querySelector('sl-select[name="aspect"]');

    aspectRatio.addEventListener('sl-change', () => {
      carousel.style.setProperty('--aspect-ratio', aspectRatio.value);
    });
  })();
</script>
```

{% raw %}

```jsx:react
import { useState } from 'react';
import SlCarousel from '@shoelace-style/shoelace/dist/react/carousel';
import SlCarouselItem from '@shoelace-style/shoelace/dist/react/carousel-item';
import SlDivider from '@shoelace-style/shoelace/dist/react/divider';
import SlSelect from '@shoelace-style/shoelace/dist/react/select';
import SlOption from '@shoelace-style/shoelace/dist/react/option';

const App = () => {
  const [aspectRatio, setAspectRatio] = useState('3/2');

  return (
    <>
      <SlCarousel className="aspect-ratio" navigation pagination style={{ '--aspect-ratio': aspectRatio }}>
        <SlCarouselItem>
          <img
            alt="The sun shines on the mountains and trees (by Adam Kool on Unsplash)"
            src="/assets/examples/carousel/mountains.jpg"
          />
        </SlCarouselItem>
        <SlCarouselItem>
          <img
            alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
            src="/assets/examples/carousel/waterfall.jpg"
          />
        </SlCarouselItem>
        <SlCarouselItem>
          <img
            alt="The sun is setting over a lavender field (by Leonard Cotte on Unsplash)"
            src="/assets/examples/carousel/sunset.jpg"
          />
        </SlCarouselItem>
        <SlCarouselItem>
          <img
            alt="A field of grass with the sun setting in the background (by Sapan Patel on Unsplash)"
            src="/assets/examples/carousel/field.jpg"
          />
        </SlCarouselItem>
        <SlCarouselItem>
          <img
            alt="A scenic view of a mountain with clouds rolling in (by V2osk on Unsplash)"
            src="/assets/examples/carousel/valley.jpg"
          />
        </SlCarouselItem>
      </SlCarousel>

      <SlDivider />

      <SlSelect
        label="Aspect ratio"
        name="aspect"
        value={aspectRatio}
        onSlChange={event => setAspectRatio(event.target.value)}
      >
        <SlOption value="1 / 1">1 / 1</SlOption>
        <SlOption value="3 / 2">3 / 2</SlOption>
        <SlOption value="16 / 9">16 / 9</SlOption>
      </SlSelect>

      <style>{css}</style>
    </>
  );
};
```

{% endraw %}

### Scroll Hint

Use the `--scroll-hint` custom property to add inline padding in horizontal carousels and block padding in vertical carousels. This will make the closest slides slightly visible, hinting that there are more items in the carousel.

```html:preview
<sl-carousel class="scroll-hint" pagination style="--scroll-hint: 10%;">
  <sl-carousel-item>
    <img
      alt="The sun shines on the mountains and trees (by Adam Kool on Unsplash)"
      src="/assets/examples/carousel/mountains.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
      src="/assets/examples/carousel/waterfall.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="The sun is setting over a lavender field (by Leonard Cotte on Unsplash)"
      src="/assets/examples/carousel/sunset.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A field of grass with the sun setting in the background (by Sapan Patel on Unsplash)"
      src="/assets/examples/carousel/field.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A scenic view of a mountain with clouds rolling in (by V2osk on Unsplash)"
      src="/assets/examples/carousel/valley.jpg"
    />
  </sl-carousel-item>
</sl-carousel>
```

{% raw %}

```jsx:react
import { useState } from 'react';
import SlCarousel from '@shoelace-style/shoelace/dist/react/carousel';
import SlCarouselItem from '@shoelace-style/shoelace/dist/react/carousel-item';
import SlDivider from '@shoelace-style/shoelace/dist/react/divider';
import SlRange from '@shoelace-style/shoelace/dist/react/range';

const App = () => (
  <>
    <SlCarousel className="scroll-hint" pagination style={{ '--scroll-hint': '10%' }}>
      <SlCarouselItem>
        <img
          alt="The sun shines on the mountains and trees (by Adam Kool on Unsplash)"
          src="/assets/examples/carousel/mountains.jpg"
        />
      </SlCarouselItem>
      <SlCarouselItem>
        <img
          alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
          src="/assets/examples/carousel/waterfall.jpg"
        />
      </SlCarouselItem>
      <SlCarouselItem>
        <img
          alt="The sun is setting over a lavender field (by Leonard Cotte on Unsplash)"
          src="/assets/examples/carousel/sunset.jpg"
        />
      </SlCarouselItem>
      <SlCarouselItem>
        <img
          alt="A field of grass with the sun setting in the background (by Sapan Patel on Unsplash)"
          src="/assets/examples/carousel/field.jpg"
        />
      </SlCarouselItem>
      <SlCarouselItem>
        <img
          alt="A scenic view of a mountain with clouds rolling in (by V2osk on Unsplash)"
          src="/assets/examples/carousel/valley.jpg"
        />
      </SlCarouselItem>
    </SlCarousel>
  </>
);
```

{% endraw %}

### Gallery Example

The carousel has a robust API that makes it possible to extend and customize. This example syncs the active slide with a set of thumbnails, effectively creating a gallery-style carousel.

```html:preview
<sl-carousel class="carousel-thumbnails" navigation loop>
  <sl-carousel-item>
    <img
      alt="The sun shines on the mountains and trees (by Adam Kool on Unsplash)"
      src="/assets/examples/carousel/mountains.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
      src="/assets/examples/carousel/waterfall.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="The sun is setting over a lavender field (by Leonard Cotte on Unsplash)"
      src="/assets/examples/carousel/sunset.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A field of grass with the sun setting in the background (by Sapan Patel on Unsplash)"
      src="/assets/examples/carousel/field.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A scenic view of a mountain with clouds rolling in (by V2osk on Unsplash)"
      src="/assets/examples/carousel/valley.jpg"
    />
  </sl-carousel-item>
</sl-carousel>

<div class="thumbnails">
  <div class="thumbnails__scroller">
    <img alt="Thumbnail by 1" class="thumbnails__image active" src="/assets/examples/carousel/mountains.jpg" />
    <img alt="Thumbnail by 2" class="thumbnails__image" src="/assets/examples/carousel/waterfall.jpg" />
    <img alt="Thumbnail by 3" class="thumbnails__image" src="/assets/examples/carousel/sunset.jpg" />
    <img alt="Thumbnail by 4" class="thumbnails__image" src="/assets/examples/carousel/field.jpg" />
    <img alt="Thumbnail by 5" class="thumbnails__image" src="/assets/examples/carousel/valley.jpg" />
  </div>
</div>

<style>
  .carousel-thumbnails {
    --slide-aspect-ratio: 3 / 2;
  }

  .thumbnails {
    display: flex;
    justify-content: center;
  }

  .thumbnails__scroller {
    display: flex;
    gap: var(--sl-spacing-small);
    overflow-x: auto;
    scrollbar-width: none;
    scroll-behavior: smooth;
    scroll-padding: var(--sl-spacing-small);
  }

  .thumbnails__scroller::-webkit-scrollbar {
    display: none;
  }

  .thumbnails__image {
    width: 64px;
    height: 64px;
    object-fit: cover;

    opacity: 0.3;
    will-change: opacity;
    transition: 250ms opacity;

    cursor: pointer;
  }

  .thumbnails__image.active {
    opacity: 1;
  }
</style>

<script>
  {
    const carousel = document.querySelector('.carousel-thumbnails');
    const scroller = document.querySelector('.thumbnails__scroller');
    const thumbnails = document.querySelectorAll('.thumbnails__image');

    scroller.addEventListener('click', e => {
      const target = e.target;

      if (target.matches('.thumbnails__image')) {
        const index = [...thumbnails].indexOf(target);
        carousel.goToSlide(index);
      }
    });

    carousel.addEventListener('sl-slide-change', e => {
      const slideIndex = e.detail.index;

      [...thumbnails].forEach((thumb, i) => {
        thumb.classList.toggle('active', i === slideIndex);
        if (i === slideIndex) {
          thumb.scrollIntoView({
            block: 'nearest'
          });
        }
      });
    });
  }
</script>
```

```jsx:react
import { useRef } from 'react';
import SlCarousel from '@shoelace-style/shoelace/dist/react/carousel';
import SlCarouselItem from '@shoelace-style/shoelace/dist/react/carousel-item';
import SlDivider from '@shoelace-style/shoelace/dist/react/divider';
import SlRange from '@shoelace-style/shoelace/dist/react/range';

const css = `
  .carousel-thumbnails {
    --slide-aspect-ratio: 3 / 2;
  }

  .thumbnails {
    display: flex;
    justify-content: center;
  }

  .thumbnails__scroller {
    display: flex;
    gap: var(--sl-spacing-small);
    overflow-x: auto;
    scrollbar-width: none;
    scroll-behavior: smooth;
    scroll-padding: var(--sl-spacing-small);
  }

  .thumbnails__scroller::-webkit-scrollbar {
    display: none;
  }

  .thumbnails__image {
    width: 64px;
    height: 64px;
    object-fit: cover;

    opacity: 0.3;
    will-change: opacity;
    transition: 250ms opacity;

    cursor: pointer;
  }

  .thumbnails__image.active {
    opacity: 1;
  }
`;

const images = [
  {
    src: '/assets/examples/carousel/mountains.jpg',
    alt: 'The sun shines on the mountains and trees (by Adam Kool on Unsplash'
  },
  {
    src: '/assets/examples/carousel/waterfall.jpg',
    alt: 'A waterfall in the middle of a forest (by Thomas Kelly on Unsplash'
  },
  {
    src: '/assets/examples/carousel/sunset.jpg',
    alt: 'The sun is setting over a lavender field (by Leonard Cotte on Unsplash'
  },
  {
    src: '/assets/examples/carousel/field.jpg',
    alt: 'A field of grass with the sun setting in the background (by Sapan Patel on Unsplash'
  },
  {
    src: '/assets/examples/carousel/valley.jpg',
    alt: 'A scenic view of a mountain with clouds rolling in (by V2osk on Unsplash'
  }
];

const App = () => {
  const carouselRef = useRef();
  const thumbnailsRef = useRef();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const thumbnails = Array.from(thumbnailsRef.current.querySelectorAll('.thumbnails__image'));

    thumbnails[currentSlide]..scrollIntoView({
      block: 'nearest'
    });
  }, [currentSlide]);

  const handleThumbnailClick = (index) => {
    carouselRef.current.goToSlide(index);
  }

  const handleSlideChange = (event) => {
    const slideIndex = e.detail.index;
    setCurrentSlide(slideIndex);
  }

  return (
    <>
      <SlCarousel className="carousel-thumbnails" navigation loop onSlSlideChange={handleSlideChange}>
        {images.map({ src, alt }) => (
          <SlCarouselItem>
            <img
              alt={alt}
              src={src}
            />
          </SlCarouselItem>
        )}
      </SlCarousel>

      <div class="thumbnails">
        <div class="thumbnails__scroller">
          {images.map({ src, alt }, i) => (
            <img
              alt={`Thumbnail by ${i + 1}`}
              className={`thumbnails__image ${i === currentSlide ? 'active' : ''}`}
              onClick={() => handleThumbnailClick(i)}
              src={src}
            />
          )}
        </div>
      </div>
      <style>{css}</style>
    </>
  );
};
```
