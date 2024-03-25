import '../../internal/scrollend-polyfill.js';

import { AutoplayController } from './autoplay-controller.js';
import { clamp } from '../../internal/math.js';
import { classMap } from 'lit/directives/class-map.js';
import { eventOptions, property, query, state } from 'lit/decorators.js';
import { html } from 'lit';
import { LocalizeController } from '../../utilities/localize.js';
import { map } from 'lit/directives/map.js';
import { prefersReducedMotion } from '../../internal/animate.js';
import { range } from 'lit/directives/range.js';
import { waitForEvent } from '../../internal/event.js';
import { watch } from '../../internal/watch.js';
import componentStyles from '../../styles/component.styles.js';
import ShoelaceElement from '../../internal/shoelace-element.js';
import SlIcon from '../icon/icon.component.js';
import styles from './carousel.styles.js';
import type { CSSResultGroup, PropertyValueMap } from 'lit';
import type SlCarouselItem from '../carousel-item/carousel-item.component.js';

/**
 * @summary Carousels display an arbitrary number of content slides along a horizontal or vertical axis.
 *
 * @since 2.2
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
 * @cssproperty [--aspect-ratio=16/9] - The aspect ratio of each slide.
 * @cssproperty --scroll-hint - The amount of padding to apply to the scroll area, allowing adjacent slides to become
 *  partially visible as a scroll hint.
 */
export default class SlCarousel extends ShoelaceElement {
  static styles: CSSResultGroup = [componentStyles, styles];
  static dependencies = { 'sl-icon': SlIcon };

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
   * greater than one. It can't be higher than `slides-per-page`.
   */
  @property({ type: Number, attribute: 'slides-per-move' }) slidesPerMove = 1;

  /** Specifies the orientation in which the carousel will lay out.  */
  @property() orientation: 'horizontal' | 'vertical' = 'horizontal';

  /** When set, it is possible to scroll through the slides by dragging them with the mouse. */
  @property({ type: Boolean, reflect: true, attribute: 'mouse-dragging' }) mouseDragging = false;

  @query('.carousel__slides') scrollContainer: HTMLElement;
  @query('.carousel__pagination') paginationContainer: HTMLElement;

  // The index of the active slide
  @state() activeSlide = 0;

  @state() scrolling = false;

  @state() dragging = false;

  private autoplayController = new AutoplayController(this, () => this.next());
  private readonly localize = new LocalizeController(this);
  private mutationObserver: MutationObserver;

  connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'region');
    this.setAttribute('aria-label', this.localize.term('carousel'));
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.mutationObserver.disconnect();
  }

  protected firstUpdated(): void {
    this.initializeSlides();
    this.mutationObserver = new MutationObserver(this.handleSlotChange);
    this.mutationObserver.observe(this, {
      childList: true,
      subtree: true
    });
  }

  protected willUpdate(changedProperties: PropertyValueMap<SlCarousel> | Map<PropertyKey, unknown>): void {
    // Ensure the slidesPerMove is never higher than the slidesPerPage
    if (changedProperties.has('slidesPerMove') || changedProperties.has('slidesPerPage')) {
      this.slidesPerMove = Math.min(this.slidesPerMove, this.slidesPerPage);
    }
  }

  private getPageCount() {
    const slidesCount = this.getSlides().length;
    const { slidesPerPage, slidesPerMove, loop } = this;

    const pages = loop ? slidesCount / slidesPerMove : (slidesCount - slidesPerPage) / slidesPerMove + 1;

    return Math.ceil(pages);
  }

  private getCurrentPage() {
    return Math.ceil(this.activeSlide / this.slidesPerMove);
  }

  private canScrollNext(): boolean {
    return this.loop || this.getCurrentPage() < this.getPageCount() - 1;
  }

  private canScrollPrev(): boolean {
    return this.loop || this.getCurrentPage() > 0;
  }

  /** @internal Gets all carousel items. */
  private getSlides({ excludeClones = true }: { excludeClones?: boolean } = {}) {
    return [...this.children].filter(
      (el: HTMLElement) => this.isCarouselItem(el) && (!excludeClones || !el.hasAttribute('data-clone'))
    ) as SlCarouselItem[];
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
      const target = event.target as HTMLElement;
      const isRtl = this.localize.dir() === 'rtl';
      const isFocusInPagination = target.closest('[part~="pagination-item"]') !== null;
      const isNext =
        event.key === 'ArrowDown' || (!isRtl && event.key === 'ArrowRight') || (isRtl && event.key === 'ArrowLeft');
      const isPrevious =
        event.key === 'ArrowUp' || (!isRtl && event.key === 'ArrowLeft') || (isRtl && event.key === 'ArrowRight');

      event.preventDefault();

      if (isPrevious) {
        this.previous();
      }

      if (isNext) {
        this.next();
      }

      if (event.key === 'Home') {
        this.goToSlide(0);
      }

      if (event.key === 'End') {
        this.goToSlide(this.getSlides().length - 1);
      }

      if (isFocusInPagination) {
        this.updateComplete.then(() => {
          const activePaginationItem = this.shadowRoot?.querySelector<HTMLButtonElement>(
            '[part~="pagination-item--active"]'
          );

          if (activePaginationItem) {
            activePaginationItem.focus();
          }
        });
      }
    }
  }

  private handleMouseDragStart(event: PointerEvent) {
    const canDrag = this.mouseDragging && event.button === 0;
    if (canDrag) {
      event.preventDefault();

      document.addEventListener('pointermove', this.handleMouseDrag, { capture: true, passive: true });
      document.addEventListener('pointerup', this.handleMouseDragEnd, { capture: true, once: true });
    }
  }

  private handleMouseDrag = (event: PointerEvent) => {
    if (!this.dragging) {
      // Start dragging if it hasn't yet
      this.scrollContainer.style.setProperty('scroll-snap-type', 'none');
      this.dragging = true;
    }

    this.scrollContainer.scrollBy({
      left: -event.movementX,
      top: -event.movementY,
      behavior: 'instant'
    });
  };

  private handleMouseDragEnd = () => {
    const scrollContainer = this.scrollContainer;

    document.removeEventListener('pointermove', this.handleMouseDrag, { capture: true });

    // get the current scroll position
    const startLeft = scrollContainer.scrollLeft;
    const startTop = scrollContainer.scrollTop;

    // remove the scroll-snap-type property so that the browser will snap the slide to the correct position
    scrollContainer.style.removeProperty('scroll-snap-type');

    // fix(safari): forcing a style recalculation doesn't seem to immediately update the scroll
    // position in Safari. Setting "overflow" to "hidden" should force this behavior.
    scrollContainer.style.setProperty('overflow', 'hidden');

    // get the final scroll position to the slide snapped by the browser
    const finalLeft = scrollContainer.scrollLeft;
    const finalTop = scrollContainer.scrollTop;

    // restore the scroll position to the original one, so that it can be smoothly animated if needed
    scrollContainer.style.removeProperty('overflow');
    scrollContainer.style.setProperty('scroll-snap-type', 'none');
    scrollContainer.scrollTo({ left: startLeft, top: startTop, behavior: 'instant' });

    requestAnimationFrame(async () => {
      if (startLeft !== finalLeft || startTop !== finalTop) {
        scrollContainer.scrollTo({
          left: finalLeft,
          top: finalTop,
          behavior: prefersReducedMotion() ? 'auto' : 'smooth'
        });
        await waitForEvent(scrollContainer, 'scrollend');
      }

      scrollContainer.style.removeProperty('scroll-snap-type');

      this.dragging = false;
      this.handleScrollEnd();
    });
  };

  @eventOptions({ passive: true })
  private handleScroll() {
    this.scrolling = true;
  }

  /** @internal Synchronizes the slides with the IntersectionObserver API. */
  private synchronizeSlides() {
    const io = new IntersectionObserver(
      entries => {
        io.disconnect();

        for (const entry of entries) {
          const slide = entry.target;
          slide.toggleAttribute('inert', !entry.isIntersecting);
          slide.classList.toggle('--in-view', entry.isIntersecting);
          slide.setAttribute('aria-hidden', entry.isIntersecting ? 'false' : 'true');
        }

        const firstIntersecting = entries.find(entry => entry.isIntersecting);

        if (firstIntersecting) {
          if (this.loop && firstIntersecting.target.hasAttribute('data-clone')) {
            const clonePosition = Number(firstIntersecting.target.getAttribute('data-clone'));

            // Scrolls to the original slide without animating, so the user won't notice that the position has changed
            this.goToSlide(clonePosition, 'instant');
          } else {
            const slides = this.getSlides();

            // Update the current index based on the first visible slide
            const slideIndex = slides.indexOf(firstIntersecting.target as SlCarouselItem);
            // Set the index to the first "snappable" slide
            this.activeSlide = Math.ceil(slideIndex / this.slidesPerMove) * this.slidesPerMove;
          }
        }
      },
      {
        root: this.scrollContainer,
        threshold: 0.6
      }
    );

    this.getSlides({ excludeClones: false }).forEach(slide => {
      io.observe(slide);
    });
  }

  private handleScrollEnd() {
    if (!this.scrolling || this.dragging) return;

    this.synchronizeSlides();

    this.scrolling = false;
  }

  private isCarouselItem(node: Node): node is SlCarouselItem {
    return node instanceof Element && node.tagName.toLowerCase() === 'sl-carousel-item';
  }

  private handleSlotChange = (mutations: MutationRecord[]) => {
    const needsInitialization = mutations.some(mutation =>
      [...mutation.addedNodes, ...mutation.removedNodes].some(
        (el: HTMLElement) => this.isCarouselItem(el) && !el.hasAttribute('data-clone')
      )
    );

    // Reinitialize the carousel if a carousel item has been added or removed
    if (needsInitialization) {
      this.initializeSlides();
    }

    this.requestUpdate();
  };

  @watch('loop', { waitUntilFirstUpdate: true })
  @watch('slidesPerPage', { waitUntilFirstUpdate: true })
  initializeSlides() {
    // Removes all the cloned elements from the carousel
    this.getSlides({ excludeClones: false }).forEach((slide, index) => {
      slide.classList.remove('--in-view');
      slide.classList.remove('--is-active');
      slide.setAttribute('aria-label', this.localize.term('slideNum', index + 1));

      if (slide.hasAttribute('data-clone')) {
        slide.remove();
      }
    });

    this.updateSlidesSnap();

    if (this.loop) {
      // Creates clones to be placed before and after the original elements to simulate infinite scrolling
      this.createClones();
    }

    this.synchronizeSlides();

    // Because the DOM may be changed, restore the scroll position to the active slide
    this.goToSlide(this.activeSlide, 'auto');
  }

  private createClones() {
    const slides = this.getSlides();

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
  updateSlidesSnap() {
    const slides = this.getSlides();

    const slidesPerMove = this.slidesPerMove;
    slides.forEach((slide, i) => {
      const shouldSnap = (i + slidesPerMove) % slidesPerMove === 0;
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

    const slides = this.getSlides();
    const slidesWithClones = this.getSlides({ excludeClones: false });

    // No need to do anything in case there are no items in the carousel
    if (!slides.length) {
      return;
    }

    // Sets the next index without taking into account clones, if any.
    const newActiveSlide = loop ? (index + slides.length) % slides.length : clamp(index, 0, slides.length - 1);
    this.activeSlide = newActiveSlide;

    // Get the index of the next slide. For looping carousel it adds `slidesPerPage`
    // to normalize the starting index in order to ignore the first nth clones.
    const nextSlideIndex = clamp(index + (loop ? slidesPerPage : 0), 0, slidesWithClones.length - 1);
    const nextSlide = slidesWithClones[nextSlideIndex];

    this.scrollToSlide(nextSlide, prefersReducedMotion() ? 'auto' : behavior);
  }

  private scrollToSlide(slide: HTMLElement, behavior: ScrollBehavior = 'smooth') {
    const scrollContainer = this.scrollContainer;
    const scrollContainerRect = scrollContainer.getBoundingClientRect();
    const nextSlideRect = slide.getBoundingClientRect();

    const nextLeft = nextSlideRect.left - scrollContainerRect.left;
    const nextTop = nextSlideRect.top - scrollContainerRect.top;

    scrollContainer.scrollTo({
      left: nextLeft + scrollContainer.scrollLeft,
      top: nextTop + scrollContainer.scrollTop,
      behavior
    });
  }

  render() {
    const { slidesPerMove, scrolling } = this;
    const pagesCount = this.getPageCount();
    const currentPage = this.getCurrentPage();
    const prevEnabled = this.canScrollPrev();
    const nextEnabled = this.canScrollNext();
    const isLtr = this.localize.dir() === 'ltr';

    return html`
      <div part="base" class="carousel">
        <div
          id="scroll-container"
          part="scroll-container"
          class="${classMap({
            carousel__slides: true,
            'carousel__slides--horizontal': this.orientation === 'horizontal',
            'carousel__slides--vertical': this.orientation === 'vertical',
            'carousel__slides--dragging': this.dragging
          })}"
          style="--slides-per-page: ${this.slidesPerPage};"
          aria-busy="${scrolling ? 'true' : 'false'}"
          aria-atomic="true"
          tabindex="0"
          @keydown=${this.handleKeyDown}
          @mousedown="${this.handleMouseDragStart}"
          @scroll="${this.handleScroll}"
          @scrollend=${this.handleScrollEnd}
        >
          <slot></slot>
        </div>

        ${this.navigation
          ? html`
              <div part="navigation" class="carousel__navigation">
                <button
                  part="navigation-button navigation-button--previous"
                  class="${classMap({
                    'carousel__navigation-button': true,
                    'carousel__navigation-button--previous': true,
                    'carousel__navigation-button--disabled': !prevEnabled
                  })}"
                  aria-label="${this.localize.term('previousSlide')}"
                  aria-controls="scroll-container"
                  aria-disabled="${prevEnabled ? 'false' : 'true'}"
                  @click=${prevEnabled ? () => this.previous() : null}
                >
                  <slot name="previous-icon">
                    <sl-icon library="system" name="${isLtr ? 'chevron-left' : 'chevron-right'}"></sl-icon>
                  </slot>
                </button>

                <button
                  part="navigation-button navigation-button--next"
                  class=${classMap({
                    'carousel__navigation-button': true,
                    'carousel__navigation-button--next': true,
                    'carousel__navigation-button--disabled': !nextEnabled
                  })}
                  aria-label="${this.localize.term('nextSlide')}"
                  aria-controls="scroll-container"
                  aria-disabled="${nextEnabled ? 'false' : 'true'}"
                  @click=${nextEnabled ? () => this.next() : null}
                >
                  <slot name="next-icon">
                    <sl-icon library="system" name="${isLtr ? 'chevron-right' : 'chevron-left'}"></sl-icon>
                  </slot>
                </button>
              </div>
            `
          : ''}
        ${this.pagination
          ? html`
              <div part="pagination" role="tablist" class="carousel__pagination" aria-controls="scroll-container">
                ${map(range(pagesCount), index => {
                  const isActive = index === currentPage;
                  return html`
                    <button
                      part="pagination-item ${isActive ? 'pagination-item--active' : ''}"
                      class="${classMap({
                        'carousel__pagination-item': true,
                        'carousel__pagination-item--active': isActive
                      })}"
                      role="tab"
                      aria-selected="${isActive ? 'true' : 'false'}"
                      aria-label="${this.localize.term('goToSlide', index + 1, pagesCount)}"
                      tabindex=${isActive ? '0' : '-1'}
                      @click=${() => this.goToSlide(index * slidesPerMove)}
                      @keydown=${this.handleKeyDown}
                    ></button>
                  `;
                })}
              </div>
            `
          : ''}
      </div>
    `;
  }
}
