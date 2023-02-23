import '../icon/icon';
import { AutoplayController } from './autoplay-controller';
import { clamp } from 'src/internal/math';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, query, state } from 'lit/decorators.js';
import { html } from 'lit';
import { LocalizeController } from '@shoelace-style/localize';
import { map } from 'lit/directives/map.js';
import { prefersReducedMotion } from '../../internal/animate';
import { range } from 'lit/directives/range.js';
import { ScrollController } from './scroll-controller';
import { watch } from '../../internal/watch';
import { when } from 'lit/directives/when.js';
import ShoelaceElement from '../../internal/shoelace-element';
import SlCarouselItem from '../carousel-item/carousel-item';
import styles from './carousel.styles';
import type { CSSResultGroup } from 'lit';

/**
 * @summary Carousels display an arbitrary number of slides along a horizontal or vertical axis.
 *
 * @since 2.0
 * @status experimental
 *
 * @dependency sl-icon
 *
 * @event {{ index: number, slide: SlCarouselItem }} sl-slide-change - Emitted when the active slide changes.
 *
 * @slot - The carousel's main content, one or more `<sl-carousel-item>` elements.
 * @slot next-icon - Optional next icon to use instead of the default. Works best with `<sl-icon>`.
 * @slot previous-icon - Optional previous icon to use instead of the default. Works best with `<sl-icon>`.
 *
 * @csspart base - The carousel's internal wrapper.
 * @csspart scroll-container - The scroll container that wraps the slides.
 * @csspart pagination - The pagination indicators wrapper.
 * @csspart pagination-item - The pagination indicator.
 * @csspart pagination-item--active - Applied when the item is active.
 * @csspart navigation - The navigation wrapper.
 * @csspart navigation-button - The navigation button.
 * @csspart navigation-button--previous - Applied to the previous button.
 * @csspart navigation-button--next - Applied to the next button.
 *
 * @cssproperty --slide-gap - The space between each slide.
 * @cssproperty --aspect-ratio - The aspect ratio of each slide.
 * @cssproperty --scroll-padding - The amount of padding to apply to the scroll area. Useful to make adjacent slides
 *  visible.
 */
@customElement('sl-carousel')
export default class SlCarousel extends ShoelaceElement {
  static styles: CSSResultGroup = styles;

  /** When set, allows the user to navigate the carousel in the same direction indefinitely. */
  @property({ type: Boolean, reflect: true }) loop = false;

  /** When set, show the carousel's navigation. */
  @property({ type: Boolean, reflect: true }) navigation = false;

  /** When set, show the carousel's pagination indicators. */
  @property({ type: Boolean, reflect: true }) pagination = false;

  /** When set, the slides will scroll automatically when the user is not interacting with them.  */
  @property({ type: Boolean, reflect: true }) autoplay = false;

  /** Specifies the amount of time, in milliseconds, between each automatic scroll.  */
  @property({ type: Number, attribute: 'autoplay-interval' }) autoplayInterval = 3000;

  /** Specifies how many slides should be shown at a given time.  */
  @property({ type: Number, attribute: 'slides-per-page' }) slidesPerPage = 1;

  /**
   * Specifies the number of slides the carousel will advance when scrolling, useful when specifying a `slides-per-page`
   * greater than one.
   */
  @property({ type: Number, attribute: 'slides-per-move' }) slidesPerMove = 1;

  /** Specifies the orientation in which the carousel will lay out.  */
  @property() orientation: 'horizontal' | 'vertical' = 'horizontal';

  /** When set, it is possible to scroll through the slides by dragging them with the mouse. */
  @property({ type: Boolean, reflect: true, attribute: 'mouse-dragging' }) mouseDragging = false;

  @query('slot:not([name])') defaultSlot: HTMLSlotElement;
  @query('.carousel__slides') scrollContainer: HTMLElement;
  @query('.carousel__pagination') paginationContainer: HTMLElement;

  // The index of the active slide
  @state() activeSlide = 0;

  private autoplayController = new AutoplayController(this, () => this.next());
  private scrollController = new ScrollController(this);
  private readonly slides = this.getElementsByTagName('sl-carousel-item');
  private intersectionObserver: IntersectionObserver; // determines which slide is displayed
  // A map containing the state of all the slides
  private readonly intersectionObserverEntries = new Map<Element, IntersectionObserverEntry>();
  private readonly localize = new LocalizeController(this);
  private mutationObserver: MutationObserver;

  connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'region');
    this.setAttribute('aria-roledescription', 'carousel');

    const intersectionObserver = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
          // Store all the entries in a map to be processed when scrolling ends
          this.intersectionObserverEntries.set(entry.target, entry);

          const slide = entry.target;
          slide.toggleAttribute('inert', !entry.isIntersecting);
          slide.classList.toggle('--in-view', entry.isIntersecting);
          slide.setAttribute('aria-hidden', entry.isIntersecting ? 'false' : 'true');
        });
      },
      {
        root: this,
        threshold: 0.6
      }
    );
    this.intersectionObserver = intersectionObserver;

    // Store the initial state of each slide
    intersectionObserver.takeRecords().forEach(entry => {
      this.intersectionObserverEntries.set(entry.target, entry);
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.intersectionObserver.disconnect();
    this.mutationObserver.disconnect();
  }

  protected firstUpdated(): void {
    this.initializeSlides();
    this.mutationObserver = new MutationObserver(this.handleSlotChange.bind(this));
    this.mutationObserver.observe(this, { childList: true, subtree: false });
  }

  private getSlides({ excludeClones = true }: { excludeClones?: boolean } = {}) {
    return [...this.slides].filter(slide => !excludeClones || !slide.hasAttribute('data-clone'));
  }

  /**
   * Move the carousel backward by `slides-per-move` slides.
   *
   * @param behavior - The behavior used for scrolling.
   */
  previous(behavior: ScrollBehavior = 'smooth') {
    this.goToSlide(this.activeSlide - this.slidesPerMove, behavior);
  }

  /**
   * Move the carousel forward by `slides-per-move` slides.
   *
   * @param behavior - The behavior used for scrolling.
   */
  next(behavior: ScrollBehavior = 'smooth') {
    this.goToSlide(this.activeSlide + this.slidesPerMove, behavior);
  }

  /**
   * Scrolls the carousel to the slide specified by `index`.
   *
   * @param index - The slide index.
   * @param behavior - The behavior used for scrolling.
   */
  goToSlide(index: number, behavior: ScrollBehavior = 'smooth') {
    const { slidesPerPage, loop } = this;

    const slidesWithClones = this.getSlides({ excludeClones: false });
    const normalizedIndex = clamp(index + (loop ? slidesPerPage : 0), 0, slidesWithClones.length - 1);
    const slide = slidesWithClones[normalizedIndex];

    this.scrollContainer.scrollTo({
      left: slide.offsetLeft,
      top: slide.offsetTop,
      behavior: prefersReducedMotion() ? 'auto' : behavior
    });
  }

  handleSlotChange(mutations: MutationRecord[]) {
    const needsInitialization = mutations.some(mutation =>
      [...mutation.addedNodes, ...mutation.removedNodes].some(
        node => SlCarouselItem.isCarouselItem(node) && !(node as HTMLElement).hasAttribute('data-clone')
      )
    );

    // Reinitialize the carousel if a carousel item has been added or removed
    if (needsInitialization) {
      this.initializeSlides();
      this.requestUpdate();
    }
  }

  handleScrollEnd() {
    const slides = this.getSlides();
    const entries = [...this.intersectionObserverEntries.values()];

    const firstIntersecting: IntersectionObserverEntry | undefined = entries.find(entry => entry.isIntersecting);

    if (this.loop && firstIntersecting?.target.hasAttribute('data-clone')) {
      const clonePosition = Number(firstIntersecting.target.getAttribute('data-clone'));

      // Scrolls to the original slide without animating, so the user won't notice that the position has changed
      this.goToSlide(clonePosition, 'auto');

      return;
    }

    // Activate the first intersecting slide
    if (firstIntersecting) {
      this.activeSlide = slides.indexOf(firstIntersecting.target as SlCarouselItem);
    }
  }

  @watch('loop', { waitUntilFirstUpdate: true })
  @watch('slidesPerPage', { waitUntilFirstUpdate: true })
  initializeSlides() {
    const slides = this.getSlides();
    const intersectionObserver = this.intersectionObserver;

    this.intersectionObserverEntries.clear();

    // Removes all the cloned elements from the carousel
    this.getSlides({ excludeClones: false }).forEach(slide => {
      intersectionObserver.unobserve(slide);

      slide.classList.remove('--in-view');
      slide.classList.remove('--is-active');

      if (slide.hasAttribute('data-clone')) {
        slide.remove();
      }
    });

    if (this.loop) {
      // Creates clones to be placed before and after the original elements to simulate infinite scrolling
      const slidesPerPage = this.slidesPerPage;
      const lastSlides = slides.slice(-slidesPerPage);
      const firstSlides = slides.slice(0, slidesPerPage);

      lastSlides.reverse().forEach((slide, i) => {
        const clone = slide.cloneNode(true) as HTMLElement;
        clone.setAttribute('data-clone', String(slides.length - i - 1));
        this.prepend(clone);
      });

      firstSlides.forEach((slide, i) => {
        const clone = slide.cloneNode(true) as HTMLElement;
        clone.setAttribute('data-clone', String(i));
        this.append(clone);
      });
    }

    this.getSlides({ excludeClones: false }).forEach(slide => {
      intersectionObserver.observe(slide);
    });

    // Because the DOM may be changed, restore the scroll position to the active slide
    this.goToSlide(this.activeSlide, 'auto');
  }

  @watch('activeSlide')
  handelSlideChange() {
    const slides = this.getSlides();
    slides.forEach((slide, i) => {
      slide.classList.toggle('--is-active', i === this.activeSlide);
    });

    // Do not emit an event on first render
    if (this.hasUpdated) {
      this.emit('sl-slide-change', {
        detail: {
          index: this.activeSlide,
          slide: slides[this.activeSlide]
        }
      });
    }
  }

  @watch('slidesPerMove')
  handleSlidesPerMoveChange() {
    const slides = this.getSlides({ excludeClones: false });

    const slidesPerMove = this.slidesPerMove;
    slides.forEach((slide, i) => {
      const shouldSnap = Math.abs(i - slidesPerMove) % slidesPerMove === 0;
      if (shouldSnap) {
        slide.style.removeProperty('scroll-snap-align');
      } else {
        slide.style.setProperty('scroll-snap-align', 'none');
      }
    });
  }

  @watch('autoplay')
  handleAutoplayChange() {
    this.autoplayController.stop();
    if (this.autoplay) {
      this.autoplayController.start(this.autoplayInterval);
    }
  }

  @watch('mouseDragging')
  handleMouseDraggingChange() {
    this.scrollController.mouseDragging = this.mouseDragging;
  }

  private renderPagination = () => {
    const slides = this.getSlides();
    const slidesCount = slides.length;

    const { activeSlide, slidesPerPage } = this;
    const pagesCount = Math.ceil(slidesCount / slidesPerPage);
    const currentPage = Math.floor(activeSlide / slidesPerPage);

    return html`
      <nav part="pagination" role="tablist" class="carousel__pagination" aria-controls="scroll-container">
        ${map(range(pagesCount), index => {
          const isActive = index === currentPage;
          return html`
            <span role="presentation">
              <button
                @click="${() => this.goToSlide(index * slidesPerPage)}"
                aria-selected="${isActive ? 'true' : 'false'}"
                aria-label="${this.localize.term('goToCarouselSlide', index + 1, pagesCount)}"
                role="tab"
                part="
                    pagination-item
                    ${isActive ? 'pagination-item--active' : ''}
                  "
                class="${classMap({
                  'carousel__pagination-item': true,
                  'carousel__pagination-item--active': isActive
                })}"
              ></button>
            </span>
          `;
        })}
      </nav>
    `;
  };

  private renderNavigation = () => {
    const { loop, activeSlide } = this;
    const slides = this.getSlides();
    const slidesCount = slides.length;
    const prevEnabled = loop || activeSlide > 0;
    const nextEnabled = loop || activeSlide < slidesCount - 1;
    const isLtr = this.localize.dir() === 'ltr';

    return html`
      <nav part="navigation" class="carousel__navigation">
        <button
          @click="${prevEnabled ? () => this.previous() : null}"
          aria-disabled="${prevEnabled ? 'false' : 'true'}"
          aria-controls="scroll-container"
          class="${classMap({
            'carousel__navigation-button': true,
            'carousel__navigation-button--previous': true,
            'carousel__navigation-button--disabled': !prevEnabled
          })}"
          aria-label="${this.localize.term('goToCarouselPreviousSlide')}"
          part="navigation-button navigation-button--previous"
        >
          <slot name="previous-icon">
            <sl-icon library="system" name="${isLtr ? 'chevron-left' : 'chevron-right'}"></sl-icon>
          </slot>
        </button>

        <button
          @click="${nextEnabled ? () => this.next() : null}"
          aria-disabled="${nextEnabled ? 'false' : 'true'}"
          aria-controls="scroll-container"
          class="${classMap({
            'carousel__navigation-button': true,
            'carousel__navigation-button--next': true,
            'carousel__navigation-button--disabled': !nextEnabled
          })}"
          aria-label="${this.localize.term('goToCarouselNextSlide')}"
          part="navigation-button navigation-button--next"
        >
          <slot name="next-icon">
            <sl-icon library="system" name="${isLtr ? 'chevron-right' : 'chevron-left'}"></sl-icon>
          </slot>
        </button>
      </nav>
    `;
  };

  render() {
    const { autoplayController, scrollController } = this;

    return html`
      <div part="base" class="carousel">
        <div
          id="scroll-container"
          part="scroll-container"
          class="${classMap({
            carousel__slides: true,
            'carousel__slides--horizontal': this.orientation === 'horizontal',
            'carousel__slides--vertical': this.orientation === 'vertical'
          })}"
          @scrollend="${this.handleScrollEnd}"
          role="list"
          tabindex="0"
          style="--slides-per-page: ${this.slidesPerPage};"
          aria-live="${!autoplayController.stopped && !autoplayController.paused ? 'off' : 'polite'}"
          aria-busy="${scrollController.scrolling ? 'true' : 'false'}"
          aria-atomic="true"
        >
          <slot></slot>
        </div>

        ${when(this.navigation, this.renderNavigation)} ${when(this.pagination, this.renderPagination)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-carousel': SlCarousel;
  }
}
