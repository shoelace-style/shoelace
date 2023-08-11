---
meta:
  title: Carousel Item
  description: A carousel item represent a slide within a carousel.
layout: component
---

```html:preview
<sl-carousel pagination>
  <sl-carousel-item>
    <img
      alt="The sun shines on the mountains and trees - Photo by Adam Kool on Unsplash"
      src="/assets/examples/carousel/mountains.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A waterfall in the middle of a forest - Photo by Thomas Kelly on Unsplash"
      src="/assets/examples/carousel/waterfall.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="The sun is setting over a lavender field - Photo by Leonard Cotte on Unsplash"
      src="/assets/examples/carousel/sunset.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A field of grass with the sun setting in the background - Photo by Sapan Patel on Unsplash"
      src="/assets/examples/carousel/field.jpg"
    />
  </sl-carousel-item>
  <sl-carousel-item>
    <img
      alt="A scenic view of a mountain with clouds rolling in - Photo by V2osk on Unsplash"
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
        alt="The sun shines on the mountains and trees - Photo by Adam Kool on Unsplash"
        src="/assets/examples/carousel/mountains.jpg"
      />
    </SlCarouselItem>
    <SlCarouselItem>
      <img
        alt="A waterfall in the middle of a forest - Photo by Thomas Kelly on Unsplash"
        src="/assets/examples/carousel/waterfall.jpg"
      />
    </SlCarouselItem>
    <SlCarouselItem>
      <img
        alt="The sun is setting over a lavender field - Photo by Leonard Cotte on Unsplash"
        src="/assets/examples/carousel/sunset.jpg"
      />
    </SlCarouselItem>
    <SlCarouselItem>
      <img
        alt="A field of grass with the sun setting in the background - Photo by Sapan Patel on Unsplash"
        src="/assets/examples/carousel/field.jpg"
      />
    </SlCarouselItem>
    <SlCarouselItem>
      <img
        alt="A scenic view of a mountain with clouds rolling in - Photo by V2osk on Unsplash"
        src="/assets/examples/carousel/valley.jpg"
      />
    </SlCarouselItem>
  </SlCarousel>
);
```

:::tip
Additional demonstrations can be found in the [carousel examples](/components/carousel).
:::
