import { arrow, autoUpdate, computePosition, flip, offset, shift, size } from '@floating-ui/dom';
import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { emit } from '../../internal/event';
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
 * @slot anchor - The element the popup will be anchored to.
 *
 * @csspart arrow - The arrow's container. Avoid setting `top|bottom|left|right` properties, as these values are
 *  assigned dynamically as the popup moves. This is most useful for applying a background color to match the popup, and
 *  maybe a border or box shadow.
 * @csspart popup - The popup's container. Useful for setting a background color, box shadow, etc.
 *
 * @cssproperty [--arrow-size=4px] - The size of the arrow. Note that an arrow won't be shown unless the `arrow` attribute is used.
 * @cssproperty [--arrow-color=var(--sl-color-neutral-0)] - The color of the arrow.
 */
@customElement('sl-popup')
export default class SlPopup extends LitElement {
  static styles: CSSResultGroup = styles;

  /** A reference to the internal popup container. Useful for animating and styling the popup with JavaScript. */
  @query('.popup') public popup: HTMLElement;
  @query('.popup__arrow') private arrowEl: HTMLElement;

  private anchor: HTMLElement | null;
  private cleanup: ReturnType<typeof autoUpdate> | undefined;

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
  @property({ type: Number }) arrowPadding = 10;

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
  @property({
    attribute: 'flip-padding',
    type: Number
  })
  flipPadding = 0;

  /** Moves the popup along the axis to keep it in view when clipped. */
  @property({ type: Boolean }) shift = false;

  /**
   * The shift boundary describes clipping element(s) that overflow will be checked relative to when shifting. By
   * default, the boundary includes overflow ancestors that will cause the element to be clipped. If needed, you can
   * change the boundary by passing a reference to one or more elements to this property.
   */
  @property({ type: Object }) shiftBoundary: Element | Element[];

  /** The amount of padding, in pixels, to exceed before the shift behavior will occur. */
  @property({
    attribute: 'shift-padding',
    type: Number
  })
  shiftPadding = 0;

  /** When set, this will cause the popup to automatically resize itself to prevent it from overflowing. */
  @property({ attribute: 'auto-size', type: Boolean }) autoSize = false;

  /**
   * The auto-size boundary describes clipping element(s) that overflow will be checked relative to when resizing. By
   * default, the boundary includes overflow ancestors that will cause the element to be clipped. If needed, you can
   * change the boundary by passing a reference to one or more elements to this property.
   */
  @property({ type: Object }) autoSizeBoundary: Element | Element[];

  /** The amount of padding, in pixels, to exceed before the auto-size behavior will occur. */
  @property({
    attribute: 'auto-size-padding',
    type: Number
  })
  autoSizePadding = 0;

  async connectedCallback() {
    super.connectedCallback();

    // Start the positioner after the first update
    await this.updateComplete;
    this.start();
  }

  disconnectedCallback() {
    this.stop();
  }

  async handleAnchorSlotChange() {
    await this.stop();

    this.anchor = this.querySelector<HTMLElement>('[slot="anchor"]');

    // If the anchor is a <slot>, we'll use the first assigned element as the target since slots use `display: contents`
    // and positioning can't be calculated on them
    if (this.anchor instanceof HTMLSlotElement) {
      this.anchor = this.anchor.assignedElements({ flatten: true })[0] as HTMLElement;
    }

    if (!this.anchor) {
      throw new Error('Invalid anchor element: no child with slot="anchor" was found.');
    }

    this.start();
  }

  private start() {
    // We can't start the positioner without an anchor
    if (!this.anchor) {
      return;
    }

    this.cleanup = autoUpdate(this.anchor, this.popup, () => {
      this.reposition();
    });
  }

  private async stop(): Promise<void> {
    return new Promise(resolve => {
      if (this.cleanup) {
        this.cleanup();
        this.cleanup = undefined;
        requestAnimationFrame(() => resolve());
      } else {
        resolve();
      }
    });
  }

  async updated(changedProps: Map<string, unknown>) {
    super.updated(changedProps);

    if (changedProps.has('active')) {
      // Start or stop the positioner when active changes
      if (this.active) {
        this.start();
      } else {
        this.stop();
      }
    } else {
      // All other properties will trigger a reposition when active
      if (this.active) {
        await this.updateComplete;
        this.reposition();
      }
    }
  }

  /** Recalculate and repositions the popup. */
  reposition() {
    if (!this.anchor) {
      throw new Error('Invalid anchor element: no child with slot="anchor" was found.');
    }

    // Nothing to do if the popup is inactive
    if (!this.active) {
      return;
    }

    //
    // NOTE: Floating UI middlewares are order dependent: https://floating-ui.com/docs/middleware
    //
    const middleware = [
      // The offset middleware goes first
      offset({ mainAxis: this.distance, crossAxis: this.skidding })
    ];

    // First, we adjust the size as needed
    if (this.autoSize) {
      middleware.push(
        size({
          boundary: this.autoSizeBoundary,
          padding: this.autoSizePadding,
          apply: ({ availableWidth, availableHeight }) => {
            // Ensure the panel stays within the viewport when we have lots of menu items
            Object.assign(this.popup.style, {
              maxWidth: `${availableWidth}px`,
              maxHeight: `${availableHeight}px`
            });
          }
        })
      );
    } else {
      // Unset max-width/max-height when we're no longer using this middleware
      Object.assign(this.popup.style, { maxWidth: '', maxHeight: '' });
    }

    // Then we flip, as needed
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

    // Then we shift, as needed
    if (this.shift) {
      middleware.push(
        shift({
          boundary: this.shiftBoundary,
          padding: this.shiftPadding
        })
      );
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

    computePosition(this.anchor, this.popup, {
      placement: this.placement,
      middleware,
      strategy: this.strategy
    }).then(({ x, y, middlewareData, placement }) => {
      const staticSide = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' }[placement.split('-')[0]]!;

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
      <slot name="anchor" @slotchange=${this.handleAnchorSlotChange}></slot>

      <div
        part="popup"
        class=${classMap({
          popup: true,
          'popup--active': this.active,
          'popup--fixed': this.strategy === 'fixed',
          'popup--has-arrow': this.arrow
        })}
        data-placement=${this.placement}
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
