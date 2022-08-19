import { arrow, autoUpdate, computePosition, flip, offset, shift, size } from '@floating-ui/dom';
import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { emit } from '../../internal/event';
import ShoelaceElement from '../../internal/shoelace-element';
import styles from './popup.styles';
import type { CSSResultGroup } from 'lit';

/**
 * @since 2.0
 * @status experimental
 *
 * @event sl-reposition - Emitted when the popup is repositioned. This event can fire a lot, so avoid putting expensive
 *  operations in your listener or consider debouncing it.
 *
 * @slot - The popup's content.
 * @slot anchor - The element the popup will be anchored to. If the anchor lives outside of the popup, you can use the
 *  `anchor` attribute or property instead.
 *
 * @csspart arrow - The arrow's container. Avoid setting `top|bottom|left|right` properties, as these values are
 *  assigned dynamically as the popup moves. This is most useful for applying a background color to match the popup, and
 *  maybe a border or box shadow.
 * @csspart popup - The popup's container. Useful for setting a background color, box shadow, etc.
 *
 * @cssproperty [--arrow-size=4px] - The size of the arrow. Note that an arrow won't be shown unless the `arrow`
 *  attribute is used.
 * @cssproperty [--arrow-color=var(--sl-color-neutral-0)] - The color of the arrow.
 * @cssproperty [--auto-size-available-width] - A read-only custom property that determines the amount of width the
 *  popup can be before overflowing. Useful for positioning child elements that need to overflow. This property is only
 *  available when using `auto-size`.
 * @cssproperty [--auto-size-available-height] - A read-only custom property that determines the amount of height the
 *  popup can be before overflowing. Useful for positioning child elements that need to overflow. This property is only
 *  available when using `auto-size`.
 */
@customElement('sl-popup')
export default class SlPopup extends ShoelaceElement {
  static styles: CSSResultGroup = styles;

  /** A reference to the internal popup container. Useful for animating and styling the popup with JavaScript. */
  @query('.popup') public popup: HTMLElement;
  @query('.popup__arrow') private arrowEl: HTMLElement;

  private anchorEl: HTMLElement | null;
  private cleanup: ReturnType<typeof autoUpdate> | undefined;

  /**
   * The element the popup will be anchored to. If the anchor lives outside of the popup, you can provide its `id` or a
   * reference to it here. If the anchor lives inside the popup, use the `anchor` slot instead.
   */
  @property() anchor: Element | string;

  /**
   * Activates the positioning logic and shows the popup. When this attribute is removed, the positioning logic is torn
   * down and the popup will be hidden.
   */
  @property({ type: Boolean, reflect: true }) active = false;

  /**
   * The preferred placement of the popup. Note that the actual placement will vary as configured to keep the
   * panel inside of the viewport.
   */
  @property({ reflect: true }) placement:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'left'
    | 'left-start'
    | 'left-end' = 'top';

  /**
   * Determines how the popup is positioned. The `absolute` strategy works well in most cases, but if
   * overflow is clipped, using a `fixed` position strategy can often workaround it.
   */
  @property({ reflect: true }) strategy: 'absolute' | 'fixed' = 'absolute';

  /** The distance in pixels from which to offset the panel away from its anchor. */
  @property({ type: Number }) distance = 0;

  /** The distance in pixels from which to offset the panel along its anchor. */
  @property({ type: Number }) skidding = 0;

  /**
   * Attaches an arrow to the popup. The arrow's size and color can be customized using the `--arrow-size` and
   * `--arrow-color` custom properties. For additional customizations, you can also target the arrow using
   * `::part(arrow)` in your stylesheet.
   */
  @property({ type: Boolean }) arrow = false;

  /**
   * The amount of padding between the arrow and the edges of the popup. If the popup has a border-radius, for example,
   * this will prevent it from overflowing the corners.
   */
  @property({ attribute: 'arrow-padding', type: Number }) arrowPadding = 10;

  /**
   * When set, placement of the popup will flip to the opposite site to keep it in view. You can use
   * `flipFallbackPlacement` to further configure how the fallback placement is determined.
   */
  @property({ type: Boolean }) flip = false;

  /**
   * If the preferred placement doesn't fit, popup will be tested in these fallback placements until one fits. Must be a
   * string of any number of placements separated by a space, e.g. "top bottom left". If no placement fits, the flip
   * fallback strategy will be used instead.
   * */
  @property({
    attribute: 'flip-fallback-placement',
    converter: {
      fromAttribute: (value: string) => {
        return value
          .split(' ')
          .map(p => p.trim())
          .filter(p => p !== '');
      },
      toAttribute: (value: []) => {
        return value.join(' ');
      }
    }
  })
  flipFallbackPlacement = '';

  /**
   * When neither the preferred placement nor the fallback placements fit, this value will be used to determine whether
   * the popup should be positioned as it was initially preferred or using the best available fit based on available
   * space.
   */
  @property({ attribute: 'flip-fallback-strategy' }) flipFallbackStrategy: 'bestFit' | 'initialPlacement' =
    'initialPlacement';

  /**
   * The flip boundary describes clipping element(s) that overflow will be checked relative to when flipping. By
   * default, the boundary includes overflow ancestors that will cause the element to be clipped. If needed, you can
   * change the boundary by passing a reference to one or more elements to this property.
   */
  @property({ type: Object }) flipBoundary: Element | Element[];

  /** The amount of padding, in pixels, to exceed before the flip behavior will occur. */
  @property({ attribute: 'flip-padding', type: Number }) flipPadding = 0;

  /** Moves the popup along the axis to keep it in view when clipped. */
  @property({ type: Boolean }) shift = false;

  /**
   * The shift boundary describes clipping element(s) that overflow will be checked relative to when shifting. By
   * default, the boundary includes overflow ancestors that will cause the element to be clipped. If needed, you can
   * change the boundary by passing a reference to one or more elements to this property.
   */
  @property({ type: Object }) shiftBoundary: Element | Element[];

  /** The amount of padding, in pixels, to exceed before the shift behavior will occur. */
  @property({ attribute: 'shift-padding', type: Number }) shiftPadding = 0;

  /** When set, this will cause the popup to automatically resize itself to prevent it from overflowing. */
  @property({ attribute: 'auto-size', type: Boolean }) autoSize = false;

  /** Syncs the popup's width or height to that of the anchor element. */
  @property() sync: 'width' | 'height' | 'both';

  /**
   * The auto-size boundary describes clipping element(s) that overflow will be checked relative to when resizing. By
   * default, the boundary includes overflow ancestors that will cause the element to be clipped. If needed, you can
   * change the boundary by passing a reference to one or more elements to this property.
   */
  @property({ type: Object }) autoSizeBoundary: Element | Element[];

  /** The amount of padding, in pixels, to exceed before the auto-size behavior will occur. */
  @property({ attribute: 'auto-size-padding', type: Number }) autoSizePadding = 0;

  async connectedCallback() {
    super.connectedCallback();

    // Start the positioner after the first update
    await this.updateComplete;
    this.start();
  }

  disconnectedCallback() {
    this.stop();
  }

  async handleAnchorChange() {
    await this.stop();

    if (this.anchor && typeof this.anchor === 'string') {
      // Locate the anchor by id
      const root = this.getRootNode() as Document | ShadowRoot;
      this.anchorEl = root.getElementById(this.anchor);
    } else if (this.anchor instanceof HTMLElement) {
      // Use the anchor's reference
      this.anchorEl = this.anchor;
    } else {
      // Look for a slotted anchor
      this.anchorEl = this.querySelector<HTMLElement>('[slot="anchor"]');
    }

    // If the anchor is a <slot>, we'll use the first assigned element as the target since slots use `display: contents`
    // and positioning can't be calculated on them
    if (this.anchorEl instanceof HTMLSlotElement) {
      this.anchorEl = this.anchorEl.assignedElements({ flatten: true })[0] as HTMLElement;
    }

    if (!this.anchorEl) {
      throw new Error(
        'Invalid anchor element: no anchor could be found using the anchor slot or the anchor attribute.'
      );
    }

    this.start();
  }

  private start() {
    // We can't start the positioner without an anchor
    if (!this.anchorEl) {
      return;
    }

    this.cleanup = autoUpdate(this.anchorEl, this.popup, () => {
      this.reposition();
    });
  }

  private async stop(): Promise<void> {
    return new Promise(resolve => {
      if (this.cleanup) {
        this.cleanup();
        this.cleanup = undefined;
        this.removeAttribute('data-current-placement');
        this.style.removeProperty('--auto-size-available-width');
        this.style.removeProperty('--auto-size-available-height');
        requestAnimationFrame(() => resolve());
      } else {
        resolve();
      }
    });
  }

  async updated(changedProps: Map<string, unknown>) {
    super.updated(changedProps);

    // Start or stop the positioner when active changes
    if (changedProps.has('active')) {
      if (this.active) {
        this.start();
      } else {
        this.stop();
      }
    }

    // Update the anchor when anchor changes
    if (changedProps.has('anchor')) {
      this.handleAnchorChange();
    }

    // All other properties will trigger a reposition when active
    if (this.active) {
      await this.updateComplete;
      this.reposition();
    }
  }

  /** Recalculate and repositions the popup. */
  reposition() {
    // Nothing to do if the popup is inactive or the anchor doesn't exist
    if (!this.active || !this.anchorEl) {
      return;
    }

    //
    // NOTE: Floating UI middlewares are order dependent: https://floating-ui.com/docs/middleware
    //
    const middleware = [
      // The offset middleware goes first
      offset({ mainAxis: this.distance, crossAxis: this.skidding })
    ];

    // First we sync width/height
    if (this.sync) {
      middleware.push(
        size({
          apply: ({ rects }) => {
            const syncWidth = this.sync === 'width' || this.sync === 'both';
            const syncHeight = this.sync === 'height' || this.sync === 'both';
            this.popup.style.width = syncWidth ? `${rects.reference.width}px` : '';
            this.popup.style.height = syncHeight ? `${rects.reference.height}px` : '';
          }
        })
      );
    } else {
      // Cleanup styles if we're not matching width/height
      this.popup.style.width = '';
      this.popup.style.height = '';
    }

    // Then we flip
    if (this.flip) {
      middleware.push(
        flip({
          boundary: this.flipBoundary,
          // @ts-expect-error - We're converting a string attribute to an array here
          fallbackPlacement: this.flipFallbackPlacement,
          fallbackStrategy: this.flipFallbackStrategy,
          padding: this.flipPadding
        })
      );
    }

    // Then we shift
    if (this.shift) {
      middleware.push(
        shift({
          boundary: this.shiftBoundary,
          padding: this.shiftPadding
        })
      );
    }

    // Now we adjust the size as needed
    if (this.autoSize) {
      middleware.push(
        size({
          boundary: this.autoSizeBoundary,
          padding: this.autoSizePadding,
          apply: ({ availableWidth, availableHeight }) => {
            this.style.setProperty('--auto-size-available-width', `${availableWidth}px`);
            this.style.setProperty('--auto-size-available-height', `${availableHeight}px`);
          }
        })
      );
    } else {
      // Cleanup styles if we're no longer using auto-size
      this.style.removeProperty('--auto-size-available-width');
      this.style.removeProperty('--auto-size-available-height');
    }

    // Finally, we add an arrow
    if (this.arrow) {
      middleware.push(
        arrow({
          element: this.arrowEl,
          padding: this.arrowPadding
        })
      );
    }

    computePosition(this.anchorEl, this.popup, {
      placement: this.placement,
      middleware,
      strategy: this.strategy
    }).then(({ x, y, middlewareData, placement }) => {
      const staticSide = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' }[placement.split('-')[0]]!;

      this.setAttribute('data-current-placement', placement);

      Object.assign(this.popup.style, {
        left: `${x}px`,
        top: `${y}px`
      });

      if (this.arrow) {
        const arrowX = middlewareData.arrow?.x;
        const arrowY = middlewareData.arrow?.y;

        Object.assign(this.arrowEl.style, {
          left: typeof arrowX === 'number' ? `${arrowX}px` : '',
          top: typeof arrowY === 'number' ? `${arrowY}px` : '',
          right: '',
          bottom: '',
          [staticSide]: 'calc(var(--arrow-size) * -1)'
        });
      }
    });

    emit(this, 'sl-reposition');
  }

  render() {
    return html`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <div
        part="popup"
        class=${classMap({
          popup: true,
          'popup--active': this.active,
          'popup--fixed': this.strategy === 'fixed',
          'popup--has-arrow': this.arrow
        })}
      >
        <slot></slot>
        ${this.arrow ? html`<div part="arrow" class="popup__arrow" role="presentation"></div>` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-popup': SlPopup;
  }
}
