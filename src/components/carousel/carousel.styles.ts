import { css } from 'lit';
import componentStyles from '../../styles/component.styles';

export default css`
  ${componentStyles}

  :host {
    display: flex;

    --slide-gap: var(--sl-spacing-medium, 1rem);
    --aspect-ratio: unset;
    --scroll-padding: 0px;
  }

  .carousel {
    min-height: 100%;
    min-width: 100%;

    display: grid;

    gap: var(--sl-spacing-medium);

    grid-template-columns: min-content 1fr min-content;
    grid-template-rows: 1fr min-content;
    grid-template-areas:
      '. slides .'
      '. pagination .';

    align-items: center;

    position: relative;
  }

  .carousel__pagination {
    grid-area: pagination;

    display: flex;
    justify-content: center;
    gap: var(--sl-spacing-small);
  }

  .carousel__slides {
    height: 100%;
    width: 100%;

    grid-area: slides;

    display: grid;
    align-items: center;
    justify-items: center;

    overflow: auto;
    overscroll-behavior-x: contain;
    scrollbar-width: none;

    aspect-ratio: calc(var(--aspect-ratio) * var(--slides-per-page));

    --slide-size: calc((100% - (var(--slides-per-page) - 1) * var(--slide-gap)) / var(--slides-per-page));
  }

  @media (prefers-reduced-motion) {
    :where(.carousel__slides) {
      scroll-behavior: auto;
    }
  }

  .carousel__slides--horizontal {
    grid-auto-flow: column;
    grid-auto-columns: var(--slide-size);
    grid-auto-rows: 100%;
    column-gap: var(--slide-gap);

    scroll-snap-type: x mandatory;

    scroll-padding-inline: var(--scroll-padding);
    padding-inline: var(--scroll-padding);
  }

  .carousel__slides--vertical {
    grid-auto-flow: row;
    grid-auto-columns: 100%;
    grid-auto-rows: var(--slide-size);
    row-gap: var(--slide-gap);

    scroll-snap-type: y mandatory;

    scroll-padding-block: var(--scroll-padding);
    padding-block: var(--scroll-padding);
  }

  .carousel__slides--dragging,
  .carousel__slides--dropping {
    scroll-snap-type: unset;
  }

  :host([vertical]) ::slotted(sl-carousel-item) {
    height: 100%;
  }

  .carousel__slides::-webkit-scrollbar {
    display: none;
  }

  .carousel__navigation {
    grid-area: navigation;
    display: contents;

    font-size: var(--sl-font-size-x-large);
  }

  .carousel__navigation-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: var(--sl-color-neutral-600);
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-medium) color;
    appearance: none;
  }

  .carousel__navigation-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .carousel__navigation-button--disabled::part(base) {
    pointer-events: none;
  }

  .carousel__navigation-button--previous {
    grid-column: 1;
    grid-row: 1;
  }

  .carousel__navigation-button--next {
    grid-column: 3;
    grid-row: 1;
  }

  .carousel__pagination-item {
    display: block;
    cursor: pointer;
    background: none;
    border: 0;
    border-radius: var(--sl-border-radius-circle);
    width: var(--sl-spacing-small);
    height: var(--sl-spacing-small);
    background-color: var(--sl-color-neutral-300);
    will-change: transform;
    transition: var(--sl-transition-fast) ease-in;
  }

  .carousel__pagination-item--active {
    background-color: var(--sl-color-neutral-600);
    transform: scale(1.2);
  }
`;
