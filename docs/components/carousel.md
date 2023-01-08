# Carousel

[component-header:sl-carousel]

Carousels consist of optional navigation arrows to go backwards and forwards, as well as optional pagination indicators.

```html preview
<sl-carousel loop pagination navigation autoplay mouse-dragging>
  <sl-carousel-item>
    <img
      alt="The sun shines on the mountains and trees - Photo by Adam Kool on Unsplash"
      src="/assets/examples/carousel/adam-kool-ndN00KmbJ1c-unsplash.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A waterfall in the middle of a forest - Photo by Thomas Kelly on Unsplash"
      src="/assets/examples/carousel/thomas-kelley-JoH60FhTp50-unsplash.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="The sun is setting over a lavender field - Photo by Leonard Cotte on Unsplash"
      src="/assets/examples/carousel/leonard-cotte-c1Jp-fo53U8-unsplash.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A field of grass with the sun setting in the background - Photo by Sapan Patel on Unsplash"
      src="/assets/examples/carousel/sapan-patel-i9Q9bc-WgfE-unsplash.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A scenic view of a mountain with clouds rolling in - Photo by V2osk on Unsplash"
      src="/assets/examples/carousel/v2osk-1Z2niiBPg5A-unsplash.jpg"
    />
  </sl-carousel-item>
</sl-carousel>
<sl-divider></sl-divider>
<div class="carousel-options">
  <div class="carousel-options">
    <sl-switch checked name="loop"> Loop </sl-switch>
    <sl-switch checked name="navigation"> Show navigation </sl-switch>
    <sl-switch checked name="pagination"> Show pagination </sl-switch>
    <sl-switch checked name="autoplay"> Autoplay (3s) </sl-switch>
    <sl-switch checked name="mouseDragging"> Mouse dragging </sl-switch>
  </div>
  <div class="carousel-options">
    <sl-input type="number" label="Slides per page" name="slidesPerPage" value="1"></sl-input>
    <sl-input type="number" label="Slides per move" name="slidesPerMove" value="1"></sl-input>
    <sl-select label="Orientation" name="orientation" value="horizontal">
      <sl-menu-item value="horizontal">Horizontal</sl-menu-item>
      <sl-menu-item value="vertical">Vertical</sl-menu-item>
    </sl-select>
  </div>
</div>

<style>
  sl-carousel {
    --aspect-ratio: 3 / 2;
  }

  .carousel-options {
    display: flex;
    flex-wrap: wrap;
    align-items: end;
    gap: 1rem;
  }
</style>
<script>
  (() => {
    const options = document.querySelector('.carousel-options');
    const carousel = document.querySelector('sl-carousel');
    const loop = options.querySelector('sl-switch[name="loop"]');
    const navigation = options.querySelector('sl-switch[name="navigation"]');
    const pagination = options.querySelector('sl-switch[name="pagination"]');
    const autoplay = options.querySelector('sl-switch[name="autoplay"]');
    const mouseDragging = options.querySelector('sl-switch[name="mouseDragging"]');
    const slidesPerMove = options.querySelector('sl-input[name="slidesPerMove"]');
    const slidesPerPage = options.querySelector('sl-input[name="slidesPerPage"]');
    const orientation = options.querySelector('sl-select[name="orientation"]');

    loop.addEventListener('sl-change', () => (carousel.loop = loop.checked));
    navigation.addEventListener('sl-change', () => (carousel.navigation = navigation.checked));
    pagination.addEventListener('sl-change', () => (carousel.pagination = pagination.checked));
    autoplay.addEventListener('sl-change', () => (carousel.autoplay = autoplay.checked));
    slidesPerMove.addEventListener('sl-change', () => (carousel.slidesPerMove = slidesPerMove.valueAsNumber));
    slidesPerPage.addEventListener('sl-change', () => (carousel.slidesPerPage = slidesPerPage.valueAsNumber));
    orientation.addEventListener('sl-change', () => (carousel.orientation = orientation.value));
    mouseDragging.addEventListener('sl-change', () => (carousel.mouseDragging = mouseDragging.checked));

    document.addEventListener('sl-slide-change', e => {
      console.log('Slide changed:', e.detail);
    });
  })();
</script>
```

```jsx react
import { useReducer } from 'react';
import {
  SlCarousel,
  SlCarouselItem,
  SlSwitch,
  SlInput,
  SlSelect,
  SlMenuItem
} from '@shoelace-style/shoelace/dist/react';

const css = `
  sl-carousel {
    --aspect-ratio: 3 / 2;
  }

  .carousel-options {
    display: flex;
    flex-wrap: wrap;
    align-items: end;
    gap: 1rem;
  }
`;

const App = () => {
  const [state, updateState] = useReducer(
    (state, event) => {
      console.log(event);
    },
    {
      loop: true,
      pagination: true,
      navigation: true,
      autoplay: true,
      mouseDragging: true,
      slidesPerPage: 1,
      slidesPerMove: 1,
      orientation: 'horizontal'
    }
  );
  return (
    <>
      <SlCarousel
        loop={state.loop}
        pagination={state.pagination}
        navigation={state.navigation}
        autoplay={state.autoplay}
        mouseDragging={state.mouseDragging}
      >
        <SlCarouselItem>
          <img
            alt="The sun shines on the mountains and trees - Photo by Adam Kool on Unsplash"
            src="/assets/examples/carousel/adam-kool-ndN00KmbJ1c-unsplash.jpg"
          />
        </SlCarouselItem>
        <SlCarouselItem>
          <img
            alt="A waterfall in the middle of a forest - Photo by Thomas Kelly on Unsplash"
            src="/assets/examples/carousel/thomas-kelley-JoH60FhTp50-unsplash.jpg"
          />
        </SlCarouselItem>
        <SlCarouselItem>
          <img
            alt="The sun is setting over a lavender field - Photo by Leonard Cotte on Unsplash"
            src="/assets/examples/carousel/leonard-cotte-c1Jp-fo53U8-unsplash.jpg"
          />
        </SlCarouselItem>
        <SlCarouselItem>
          <img
            alt="A field of grass with the sun setting in the background - Photo by Sapan Patel on Unsplash"
            src="/assets/examples/carousel/sapan-patel-i9Q9bc-WgfE-unsplash.jpg"
          />
        </SlCarouselItem>
        <SlCarouselItem>
          <img
            alt="A scenic view of a mountain with clouds rolling in - Photo by V2osk on Unsplash"
            src="/assets/examples/carousel/v2osk-1Z2niiBPg5A-unsplash.jpg"
          />
        </SlCarouselItem>
      </SlCarousel>
      <SlDivider></SlDivider>
      <div className="carousel-options">
        <div className="carousel-options">
          <SlSwitch checked name="loop" value={state.loop} onSlChange={updateState}>
            Loop
          </SlSwitch>
          <SlSwitch checked name="navigation" value={state.navigation} onSlChange={updateState}>
            Show navigation
          </SlSwitch>
          <SlSwitch checked name="pagination" value={state.pagination} onSlChange={updateState}>
            Show pagination
          </SlSwitch>
          <SlSwitch checked name="autoplay" value={state.autoplay} onSlChange={updateState}>
            Autoplay (3s)
          </SlSwitch>
          <SlSwitch checked name="mouseDragging" value={state.mouseDragging} onSlChange={updateState}>
            Mouse dragging
          </SlSwitch>
        </div>
        <div className="carousel-options">
          <SlInput
            type="number"
            label="Slides per page"
            name="slidesPerPage"
            value={state.slidesPerPage}
            onSlChange={updateState}
          />
          <SlInput
            type="number"
            label="Slides per move"
            name="slidesPerMove"
            value={state.slidesPerMove}
            onSlChange={updateState}
          />
          <SlSelect
            label="Orientation"
            name="orientation"
            value="horizontal"
            value={state.orientation}
            onSlChange={updateState}
          >
            <SlMenuItem value="horizontal">Horizontal</SlMenuItem>
            <SlMenuItem value="vertical">Vertical</SlMenuItem>
          </SlSelect>
        </div>
      </div>
      <style>{css}</style>
    </>
  );
};
```

<script>
  (() => {
    const options = document.querySelector('.carousel-options');
    const carousel = document.querySelector('sl-carousel');
    const loop = options.querySelector('sl-switch[name="loop"]');
    const navigation = options.querySelector('sl-switch[name="navigation"]');
    const pagination = options.querySelector('sl-switch[name="pagination"]');
    const autoplay = options.querySelector('sl-switch[name="autoplay"]');
    const mouseDragging = options.querySelector('sl-switch[name="mouseDragging"]');
    const slidesPerMove = options.querySelector('sl-input[name="slidesPerMove"]');
    const slidesPerPage = options.querySelector('sl-input[name="slidesPerPage"]');
    const orientation = options.querySelector('sl-select[name="orientation"]');

    loop.addEventListener('sl-change', () => (carousel.loop = loop.checked));
    navigation.addEventListener('sl-change', () => (carousel.navigation = navigation.checked));
    pagination.addEventListener('sl-change', () => (carousel.pagination = pagination.checked));
    autoplay.addEventListener('sl-change', () => (carousel.autoplay = autoplay.checked));
    slidesPerMove.addEventListener('sl-change', () => (carousel.slidesPerMove = slidesPerMove.valueAsNumber));
    slidesPerPage.addEventListener('sl-change', () => (carousel.slidesPerPage = slidesPerPage.valueAsNumber));
    orientation.addEventListener('sl-change', () => (carousel.orientation = orientation.value));
    mouseDragging.addEventListener('sl-change', () => (carousel.mouseDragging = mouseDragging.checked));

    document.addEventListener('sl-slide-change', e => {
      console.log('Slide changed:', e.detail);
    });
  })();
</script>

## Examples

### Multiple slides per view

Setting the attribute `slides-per-view` is it possible to specify how many items are shown at a given time.
Using this feature, it may be also useful to advance multiple slides at once, even though not strictly necessary.
This can be done by using the `slides-per-move` attribute.

```html preview
<sl-carousel class="multi-carousel" loop navigation pagination slides-per-page="3" slides-per-move="3">
  <sl-carousel-item style="background: #204ed8;">Slide 1</sl-carousel-item>
  <sl-carousel-item style="background: #be133d;">Slide 2</sl-carousel-item>
  <sl-carousel-item style="background: #6e28d9;">Slide 3</sl-carousel-item>
  <sl-carousel-item style="background: #c2420d;">Slide 4</sl-carousel-item>
  <sl-carousel-item style="background: #4d7c0f;">Slide 5</sl-carousel-item>
  <sl-carousel-item style="background: #4338cb;">Slide 6</sl-carousel-item>
</sl-carousel>
```

```jsx react
import { SlCarousel, SlCarouselItem } from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <SlCarousel class="multi-carousel" loop navigation pagination slides-per-page="3" slides-per-move="3">
    <SlCarouselItem style="background: #204ed8;">Slide 1</SlCarouselItem>
    <SlCarouselItem style="background: #be133d;">Slide 2</SlCarouselItem>
    <SlCarouselItem style="background: #6e28d9;">Slide 3</SlCarouselItem>
    <SlCarouselItem style="background: #c2420d;">Slide 4</SlCarouselItem>
    <SlCarouselItem style="background: #4d7c0f;">Slide 5</SlCarouselItem>
    <SlCarouselItem style="background: #4338cb;">Slide 6</SlCarouselItem>
  </SlCarousel>
);
```

### Adding/removing slides

The content of the carousel can be changed by either appending or removing items, the carousel will update itself automatically.

```html preview
<sl-carousel class="dynamic-carousel" pagination navigation>
  <sl-carousel-item style="background: #204ed8;">Slide 1</sl-carousel-item>
  <sl-carousel-item style="background: #be133d;">Slide 2</sl-carousel-item>
  <sl-carousel-item style="background: #6e28d9;">Slide 3</sl-carousel-item>
</sl-carousel>
<sl-divider></sl-divider>
<div class="carousel-options">
  <sl-button id="dynamic-add">Add slide</sl-button>
  <sl-button id="dynamic-remove">Remove slide</sl-button>
</div>
<style>
  .dynamic-carousel {
    --aspect-ratio: 3 / 2;
  }

  .dynamic-carousel sl-carousel-item {
    flex: 0 0 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: var(--sl-font-size-2x-large);
  }
</style>
<script>
  (() => {
    const dynamicCarousel = document.querySelector('.dynamic-carousel');
    const dynamicAdd = document.querySelector('#dynamic-add');
    const dynamicRemove = document.querySelector('#dynamic-remove');

    const rnd = (min, max) => Math.round(Math.random() * (max - min)) + min;

    const getRandomColor = () => `rgb(${rnd(50, 150)}, ${rnd(50, 150)}, ${rnd(50, 150)})`;

    const addSlide = () => {
      const slide = document.createElement('sl-carousel-item');
      slide.innerText = `Slide ${dynamicCarousel.children.length + 1}`;
      slide.style.setProperty('background', getRandomColor());

      dynamicCarousel.appendChild(slide);
    };

    const removeSlide = () => {
      const slide = dynamicCarousel.children[dynamicCarousel.children.length - 1];
      slide.remove();
    };

    dynamicAdd.addEventListener('click', addSlide);
    dynamicRemove.addEventListener('click', removeSlide);
  })();
</script>
```

```jsx react
import { useState } from 'react';
import { SlCarousel, SlCarouselItem } from '@shoelace-style/shoelace/dist/react';

const css = `
  .dynamic-carousel {
    --aspect-ratio: 3 / 2;
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

  const rnd = (min, max) => Math.round(Math.random() * (max - min)) + min;
  const getRandomColor = () => `rgb(${rnd(50, 150)}, ${rnd(50, 150)}, ${rnd(50, 150)})`;

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
          <SlCarouselItem style={{ background: color }}>Slide {i}</SlCarouselItem>
        ))}
      </SlCarousel>
      <SlDivider />
      <div className="carousel-options">
        <SlButton onClick={addSlide}>Add slide</SlButton>
        <SlButton onClick={removeSlide}>Remove slide</SlButton>
      </div>
      <style>{css}</style>
    </>
  );
};
```

### Vertical scrolling

Setting the `orientation` attribute to `vertical`, will make the carousel laying out vertically, making it
possible for the user to scroll it up and down. In case of heterogeneous content, for example images of different sizes,
it's important to specify a predefined height to the carousel through CSS.

```html preview
<sl-carousel class="vertical" loop pagination orientation="vertical">
  <sl-carousel-item>
    <img
      alt="The sun shines on the mountains and trees - Photo by Adam Kool on Unsplash"
      src="/assets/examples/carousel/adam-kool-ndN00KmbJ1c-unsplash.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A waterfall in the middle of a forest - Photo by Thomas Kelly on Unsplash"
      src="/assets/examples/carousel/thomas-kelley-JoH60FhTp50-unsplash.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="The sun is setting over a lavender field - Photo by Leonard Cotte on Unsplash"
      src="/assets/examples/carousel/leonard-cotte-c1Jp-fo53U8-unsplash.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A field of grass with the sun setting in the background - Photo by Sapan Patel on Unsplash"
      src="/assets/examples/carousel/sapan-patel-i9Q9bc-WgfE-unsplash.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A scenic view of a mountain with clouds rolling in - Photo by V2osk on Unsplash"
      src="/assets/examples/carousel/v2osk-1Z2niiBPg5A-unsplash.jpg"
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

```jsx react
import { SlCarousel, SlCarouselItem } from '@shoelace-style/shoelace/dist/react';

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
          alt="The sun shines on the mountains and trees - Photo by Adam Kool on Unsplash"
          src="/assets/examples/carousel/adam-kool-ndN00KmbJ1c-unsplash.jpg"
        />
      </SlCarouselItem>
      <SlCarouselItem>
        <img
          alt="A waterfall in the middle of a forest - Photo by Thomas Kelly on Unsplash"
          src="/assets/examples/carousel/thomas-kelley-JoH60FhTp50-unsplash.jpg"
        />
      </SlCarouselItem>
      <SlCarouselItem>
        <img
          alt="The sun is setting over a lavender field - Photo by Leonard Cotte on Unsplash"
          src="/assets/examples/carousel/leonard-cotte-c1Jp-fo53U8-unsplash.jpg"
        />
      </SlCarouselItem>
      <SlCarouselItem>
        <img
          alt="A field of grass with the sun setting in the background - Photo by Sapan Patel on Unsplash"
          src="/assets/examples/carousel/sapan-patel-i9Q9bc-WgfE-unsplash.jpg"
        />
      </SlCarouselItem>
      <SlCarouselItem>
        <img
          alt="A scenic view of a mountain with clouds rolling in - Photo by V2osk on Unsplash"
          src="/assets/examples/carousel/v2osk-1Z2niiBPg5A-unsplash.jpg"
        />
      </SlCarouselItem>
    </SlCarousel>
    <style>{css}</style>
  </>
);
```

### Aspect ratio

Use the `--aspect-ratio` custom property to customize the size of viewport in order to make it match a particular aspect ratio.

```html preview
<sl-carousel class="aspect-ratio" navigation pagination style="--aspect-ratio: 3 / 2">
  <sl-carousel-item>
    <img
      alt="The sun shines on the mountains and trees - Photo by Adam Kool on Unsplash"
      src="/assets/examples/carousel/adam-kool-ndN00KmbJ1c-unsplash.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A waterfall in the middle of a forest - Photo by Thomas Kelly on Unsplash"
      src="/assets/examples/carousel/thomas-kelley-JoH60FhTp50-unsplash.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="The sun is setting over a lavender field - Photo by Leonard Cotte on Unsplash"
      src="/assets/examples/carousel/leonard-cotte-c1Jp-fo53U8-unsplash.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A field of grass with the sun setting in the background - Photo by Sapan Patel on Unsplash"
      src="/assets/examples/carousel/sapan-patel-i9Q9bc-WgfE-unsplash.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A scenic view of a mountain with clouds rolling in - Photo by V2osk on Unsplash"
      src="/assets/examples/carousel/v2osk-1Z2niiBPg5A-unsplash.jpg"
    />
  </sl-carousel-item>
</sl-carousel>

<sl-divider></sl-divider>
<sl-select label="Aspect ratio" name="aspect" value="3 / 2">
  <sl-menu-item value="1 / 1">1 / 1</sl-menu-item>
  <sl-menu-item value="3 / 2">3 / 2</sl-menu-item>
  <sl-menu-item value="16 / 9">16 / 9</sl-menu-item>
</sl-select>

<script>
  (() => {
    const carousel = document.querySelector('sl-carousel.aspect-ratio');
    const aspect = document.querySelector('sl-select[name="aspect"]');

    aspect.addEventListener('sl-change', () => {
      carousel.style.setProperty('--aspect-ratio', aspect.value);
    });
  })();
</script>
```

```jsx react
import { useState } from 'react';
import { SlCarousel, SlCarouselItem, SlDivider, SlSelect, SlMenuItem } from '@shoelace-style/shoelace/dist/react';

const App = () => {
  const [aspectRatio, setAspectRatio] = useState('3/2');

  return (
    <>
      <SlCarousel className="aspect-ratio" navigation pagination style={{ '--aspect-ratio': aspectRatio }}>
        <SlCarouselItem>
          <img
            alt="The sun shines on the mountains and trees - Photo by Adam Kool on Unsplash"
            src="/assets/examples/carousel/adam-kool-ndN00KmbJ1c-unsplash.jpg"
          />
        </SlCarouselItem>
        <SlCarouselItem>
          <img
            alt="A waterfall in the middle of a forest - Photo by Thomas Kelly on Unsplash"
            src="/assets/examples/carousel/thomas-kelley-JoH60FhTp50-unsplash.jpg"
          />
        </SlCarouselItem>
        <SlCarouselItem>
          <img
            alt="The sun is setting over a lavender field - Photo by Leonard Cotte on Unsplash"
            src="/assets/examples/carousel/leonard-cotte-c1Jp-fo53U8-unsplash.jpg"
          />
        </SlCarouselItem>
        <SlCarouselItem>
          <img
            alt="A field of grass with the sun setting in the background - Photo by Sapan Patel on Unsplash"
            src="/assets/examples/carousel/sapan-patel-i9Q9bc-WgfE-unsplash.jpg"
          />
        </SlCarouselItem>
        <SlCarouselItem>
          <img
            alt="A scenic view of a mountain with clouds rolling in - Photo by V2osk on Unsplash"
            src="/assets/examples/carousel/v2osk-1Z2niiBPg5A-unsplash.jpg"
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
        <SlMenuItem value="1 / 1">1 / 1</SlMenuItem>
        <SlMenuItem value="3 / 2">3 / 2</SlMenuItem>
        <SlMenuItem value="16 / 9">16 / 9</SlMenuItem>
      </SlSelect>

      <style>{css}</style>
    </>
  );
};
```

### Scroll hint

Use `--scroll-padding` to add inline padding in horizontal carousels and block padding in vertical carousels.
Setting a padding, will make the closest slides visible, suggesting to the user that there are items that can
be scrolled.

```html preview
<sl-carousel class="scroll-hint" navigation pagination style="--scroll-padding: calc(var(--slide-gap) + 10%);">
  <sl-carousel-item>
    <img
      alt="The sun shines on the mountains and trees - Photo by Adam Kool on Unsplash"
      src="/assets/examples/carousel/adam-kool-ndN00KmbJ1c-unsplash.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A waterfall in the middle of a forest - Photo by Thomas Kelly on Unsplash"
      src="/assets/examples/carousel/thomas-kelley-JoH60FhTp50-unsplash.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="The sun is setting over a lavender field - Photo by Leonard Cotte on Unsplash"
      src="/assets/examples/carousel/leonard-cotte-c1Jp-fo53U8-unsplash.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A field of grass with the sun setting in the background - Photo by Sapan Patel on Unsplash"
      src="/assets/examples/carousel/sapan-patel-i9Q9bc-WgfE-unsplash.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A scenic view of a mountain with clouds rolling in - Photo by V2osk on Unsplash"
      src="/assets/examples/carousel/v2osk-1Z2niiBPg5A-unsplash.jpg"
    />
  </sl-carousel-item>
</sl-carousel>

<sl-divider></sl-divider>
<sl-range label="Size (%)" name="scroll-hint" value="5" min="0" max="15"></sl-range>

<script>
  (() => {
    const carousel = document.querySelector('sl-carousel.scroll-hint');
    const scrollHint = document.querySelector('sl-range[name="scroll-hint"]');

    scrollHint.addEventListener('sl-input', () => {
      carousel.style.setProperty('--scroll-padding', `calc(var(--slide-gap) + ${scrollHint.value}%)`);
    });
  })();
</script>
```

```jsx react
import { useState } from 'react';
import { SlCarousel, SlCarouselItem, SlDivider, SlRange } from '@shoelace-style/shoelace/dist/react';

const App = () => {
  const [scrollPadding, setScrollPadding] = useState(10);

  return (
    <>
      <SlCarousel
        className="scroll-hint"
        navigation
        pagination
        style={{ '--aspect-ratio': `calc(var(--slide-gap) + ${scrollPadding}%)` }}
      >
        <SlCarouselItem>
          <img
            alt="The sun shines on the mountains and trees - Photo by Adam Kool on Unsplash"
            src="/assets/examples/carousel/adam-kool-ndN00KmbJ1c-unsplash.jpg"
          />
        </SlCarouselItem>
        <SlCarouselItem>
          <img
            alt="A waterfall in the middle of a forest - Photo by Thomas Kelly on Unsplash"
            src="/assets/examples/carousel/thomas-kelley-JoH60FhTp50-unsplash.jpg"
          />
        </SlCarouselItem>
        <SlCarouselItem>
          <img
            alt="The sun is setting over a lavender field - Photo by Leonard Cotte on Unsplash"
            src="/assets/examples/carousel/leonard-cotte-c1Jp-fo53U8-unsplash.jpg"
          />
        </SlCarouselItem>
        <SlCarouselItem>
          <img
            alt="A field of grass with the sun setting in the background - Photo by Sapan Patel on Unsplash"
            src="/assets/examples/carousel/sapan-patel-i9Q9bc-WgfE-unsplash.jpg"
          />
        </SlCarouselItem>
        <SlCarouselItem>
          <img
            alt="A scenic view of a mountain with clouds rolling in - Photo by V2osk on Unsplash"
            src="/assets/examples/carousel/v2osk-1Z2niiBPg5A-unsplash.jpg"
          />
        </SlCarouselItem>
      </SlCarousel>

      <SlDivider />

      <SlRange
        label="Size (%)"
        value="5"
        min="0"
        max="15"
        onSlChange={event => setScrollPadding(event.target.valueAsNumber)}
      />
      <style>{css}</style>
    </>
  );
};
```

### Custom layout

The appereance of the carousel can be easly customized through its slots or `part` attributes.

```html preview
<sl-carousel class="custom-layout" navigation pagination>
  <sl-carousel-item>
    <img
      alt="The sun shines on the mountains and trees - Photo by Adam Kool on Unsplash"
      src="/assets/examples/carousel/adam-kool-ndN00KmbJ1c-unsplash.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A waterfall in the middle of a forest - Photo by Thomas Kelly on Unsplash"
      src="/assets/examples/carousel/thomas-kelley-JoH60FhTp50-unsplash.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="The sun is setting over a lavender field - Photo by Leonard Cotte on Unsplash"
      src="/assets/examples/carousel/leonard-cotte-c1Jp-fo53U8-unsplash.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A field of grass with the sun setting in the background - Photo by Sapan Patel on Unsplash"
      src="/assets/examples/carousel/sapan-patel-i9Q9bc-WgfE-unsplash.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A scenic view of a mountain with clouds rolling in - Photo by V2osk on Unsplash"
      src="/assets/examples/carousel/v2osk-1Z2niiBPg5A-unsplash.jpg"
    />
  </sl-carousel-item>

  <sl-icon name="arrow-right" slot="next-icon"></sl-icon>
  <sl-icon name="arrow-left" slot="previous-icon"></sl-icon>
</sl-carousel>

<style>
  .custom-layout::part(base) {
    grid-template-areas:
      'slides slides slides'
      'slides slides slides';
  }

  .custom-layout::part(pagination) {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: var(--sl-spacing-large);
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.8) 5%, rgba(0, 0, 0, 0.2) 75%, rgba(0, 0, 0, 0) 100%);
  }

  .custom-layout::part(pagination-item) {
    height: 5px;
    width: var(--sl-spacing-large);
    border-radius: var(--sl-border-radius-pill);
    background-color: #fff;
  }

  .custom-layout::part(pagination-item--active) {
    background-color: var(--sl-color-primary-400);
    width: var(--sl-spacing-x-large);
  }

  .custom-layout::part(navigation-button) {
    margin: var(--sl-spacing-large);
    border-radius: var(--sl-border-radius-circle);
    font-weight: var(--sl-font-weight-bold);
    color: var(--sl-color-neutral-1000);
    background: var(--sl-color-neutral-0);
    opacity: 0.6;
    transition: var(--sl-transition-medium) opacity;
  }

  .custom-layout::part(navigation-button):focus,
  .custom-layout::part(navigation-button):hover {
    opacity: 1;
  }
</style>
```

```jsx react
import { SlCarousel, SlCarouselItem } from '@shoelace-style/shoelace/dist/react';

const css = `
  .custom-layout::part(base) {
    grid-template-areas:
      'slides slides slides'
      'slides slides slides';
  }

  .custom-layout::part(pagination) {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: var(--sl-spacing-large);
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.8) 5%, rgba(0, 0, 0, 0.2) 75%, rgba(0, 0, 0, 0) 100%);
  }

  .custom-layout::part(pagination-item) {
    height: 5px;
    width: var(--sl-spacing-large);
    border-radius: var(--sl-border-radius-pill);
    background-color: #fff;
  }

  .custom-layout::part(pagination-item--active) {
    background-color: var(--sl-color-primary-400);
    width: var(--sl-spacing-x-large);
  }

  .custom-layout::part(navigation-button) {
    margin: var(--sl-spacing-large);
    border-radius: var(--sl-border-radius-circle);
    font-weight: var(--sl-font-weight-bold);
    color: var(--sl-color-neutral-1000);
    background: var(--sl-color-neutral-0);
    opacity: 0.6;
    transition: var(--sl-transition-medium) opacity;
  }

  .custom-layout::part(navigation-button):focus,
  .custom-layout::part(navigation-button):hover {
    opacity: 1;
  }
`;

const App = () => (
  <>
    <SlCarousel className="custom-layout" pagination navigation>
      <SlCarouselItem>
        <img
          alt="The sun shines on the mountains and trees - Photo by Adam Kool on Unsplash"
          src="/assets/examples/carousel/adam-kool-ndN00KmbJ1c-unsplash.jpg"
        />
      </SlCarouselItem>
      <SlCarouselItem>
        <img
          alt="A waterfall in the middle of a forest - Photo by Thomas Kelly on Unsplash"
          src="/assets/examples/carousel/thomas-kelley-JoH60FhTp50-unsplash.jpg"
        />
      </SlCarouselItem>
      <SlCarouselItem>
        <img
          alt="The sun is setting over a lavender field - Photo by Leonard Cotte on Unsplash"
          src="/assets/examples/carousel/leonard-cotte-c1Jp-fo53U8-unsplash.jpg"
        />
      </SlCarouselItem>
      <SlCarouselItem>
        <img
          alt="A field of grass with the sun setting in the background - Photo by Sapan Patel on Unsplash"
          src="/assets/examples/carousel/sapan-patel-i9Q9bc-WgfE-unsplash.jpg"
        />
      </SlCarouselItem>
      <SlCarouselItem>
        <img
          alt="A scenic view of a mountain with clouds rolling in - Photo by V2osk on Unsplash"
          src="/assets/examples/carousel/v2osk-1Z2niiBPg5A-unsplash.jpg"
        />
      </SlCarouselItem>

      <SlIcon name="arrow-right" slot="next-icon"></SlIcon>
      <SlIcon name="arrow-left" slot="previous-icon"></SlIcon>
    </SlCarousel>
    <style>{css}</style>
  </>
);
```

### Gallery example

The carousel has a set of API with which is possible to interact programmatically, for example it is possible to
use `next()` or `previous()` to go respectively to the next or the previous slide.

When the active slide is changed, the `sl-slide-change` event is emitted providing the `index` of the slide.

Using the API is possible to extend the carousel, for exmaple by syncing the active slide with a set of thumbnails, like in the example below.

```html preview
<sl-carousel class="carousel-thumbnails" navigation loop>
  <sl-carousel-item>
    <img
      alt="The sun shines on the mountains and trees - Photo by Adam Kool on Unsplash"
      src="/assets/examples/carousel/adam-kool-ndN00KmbJ1c-unsplash.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A waterfall in the middle of a forest - Photo by Thomas Kelly on Unsplash"
      src="/assets/examples/carousel/thomas-kelley-JoH60FhTp50-unsplash.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="The sun is setting over a lavender field - Photo by Leonard Cotte on Unsplash"
      src="/assets/examples/carousel/leonard-cotte-c1Jp-fo53U8-unsplash.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A field of grass with the sun setting in the background - Photo by Sapan Patel on Unsplash"
      src="/assets/examples/carousel/sapan-patel-i9Q9bc-WgfE-unsplash.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A scenic view of a mountain with clouds rolling in - Photo by V2osk on Unsplash"
      src="/assets/examples/carousel/v2osk-1Z2niiBPg5A-unsplash.jpg"
    />
  </sl-carousel-item>
</sl-carousel>
<div class="thumbnails">
  <div class="thumbnails__scroller">
    <img
      alt="Thumbnail Photo by 1"
      class="thumbnails__image active"
      src="/assets/examples/carousel/adam-kool-ndN00KmbJ1c-unsplash.jpg"
    />
    <img
      alt="Thumbnail Photo by 2"
      class="thumbnails__image"
      src="/assets/examples/carousel/thomas-kelley-JoH60FhTp50-unsplash.jpg"
    />
    <img
      alt="Thumbnail Photo by 3"
      class="thumbnails__image"
      src="/assets/examples/carousel/leonard-cotte-c1Jp-fo53U8-unsplash.jpg"
    />
    <img
      alt="Thumbnail Photo by 4"
      class="thumbnails__image"
      src="/assets/examples/carousel/sapan-patel-i9Q9bc-WgfE-unsplash.jpg"
    />
    <img
      alt="Thumbnail Photo by 5"
      class="thumbnails__image"
      src="/assets/examples/carousel/v2osk-1Z2niiBPg5A-unsplash.jpg"
    />
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

```jsx react
import { useRef } from 'react';
import { SlCarousel, SlCarouselItem, SlDivider, SlRange } from '@shoelace-style/shoelace/dist/react';

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
    src: '/assets/examples/carousel/adam-kool-ndN00KmbJ1c-unsplash.jpg',
    alt: 'The sun shines on the mountains and trees - Photo by Adam Kool on Unsplash'
  },
  {
    src: '/assets/examples/carousel/thomas-kelley-JoH60FhTp50-unsplash.jpg',
    alt: 'A waterfall in the middle of a forest - Photo by Thomas Kelly on Unsplash'
  },
  {
    src: '/assets/examples/carousel/leonard-cotte-c1Jp-fo53U8-unsplash.jpg',
    alt: 'The sun is setting over a lavender field - Photo by Leonard Cotte on Unsplash'
  },
  {
    src: '/assets/examples/carousel/sapan-patel-i9Q9bc-WgfE-unsplash.jpg',
    alt: 'A field of grass with the sun setting in the background - Photo by Sapan Patel on Unsplash'
  },
  {
    src: '/assets/examples/carousel/v2osk-1Z2niiBPg5A-unsplash.jpg',
    alt: 'A scenic view of a mountain with clouds rolling in - Photo by V2osk on Unsplash'
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
              alt={`Thumbnail Photo by ${i + 1}`}
              className={`thumbnails__image ${i === currentSlide ? 'active' : ''}`}
              onCLick={() => handleThumbnailClick(i)}
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

[component-metadata:sl-carousel]
