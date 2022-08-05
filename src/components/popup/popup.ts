import { arrow, autoUpdate, computePosition, flip, offset, shift, size } from '@floating-ui/dom';
import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { watch } from '../../internal/watch';
import styles from './popup.styles';
import type { CSSResultGroup } from 'lit';

/**
 * @since 2.0
 * @status experimental
 *
 * @slot - The popup's content.
 * @slot anchor - The element the popup will be anchored to.
 *
 * @csspart arrow - The arrow's container. Avoid setting `top|bottom|left|right` properties, as these values are
 *  assigned dynamically as the popup moves. This is most useful for applying a background color to match the popup, and
 *  maybe a border or box shadow.
 * @csspart popup - The popup's container. Useful for setting a background color, box shadow, etc.
 *
 * @cssproperty [--arrow-size=4px] - The size of the arrow.
 * @cssproperty [--arrow-color=4px] - The color of the arrow.
 */
@customElement('sl-popup')
export default class SlPopup extends LitElement {
  static styles: CSSResultGroup = styles;

  @query('.popup') popupEl: HTMLElement;
  @query('.popup__arrow') arrowEl: HTMLElement;

  private anchor: HTMLElement | null;
  private cleanup: ReturnType<typeof autoUpdate> | undefined;

  /** Activates popup logic and shows the popup. */
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
    | 'left-end' = 'bottom-start';

  /**
   * Determines how the popup is positioned. The `absolute` strategy works well in most cases, but if
   * overflow is clipped, using a `fixed` position strategy can often workaround it.
   */
  @property({ reflect: true }) strategy: 'absolute' | 'fixed' = 'absolute';

  /** The distance in pixels from which to offset the panel away from its anchor. */
  @property({ type: Number }) distance = 0;

  /** The distance in pixels from which to offset the panel along its anchor. */
  @property({ type: Number }) skidding = 0;

  /** Moves the popup along the axis to keep it in view when clipped. */
  @property({ type: Boolean }) shift = false;

  /** Attaches an arrow to the popup. */
  @property({ type: Boolean }) arrow = false;

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
  @property() flipFallbackPlacement: string;

  /**
   * When neither the preferred placement nor the fallback placements fit, this value will be used to determine whether
   * the popup should be positioned as it was initially preferred or using the best available fit based on available
   * space.
   */
  @property() flipFallbackStrategy: 'bestFit' | 'initialPlacement' = 'initialPlacement';

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

    this.cleanup = autoUpdate(this.anchor, this.popupEl, () => {
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

  @watch('active', { waitUntilFirstUpdate: true })
  handleActiveChange() {
    if (this.active) {
      this.reposition();
    } else {
      this.stop();
    }
  }

  @watch('arrow')
  @watch('distance')
  @watch('flip')
  @watch('flipFallbackPlacement')
  @watch('flipFallbackStrategy')
  @watch('placement')
  @watch('shift')
  @watch('skidding')
  @watch('strategy')
  async handlePositionChange() {
    if (this.hasUpdated && this.active) {
      await this.updateComplete;
      this.reposition();
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

    // Then we flip, as needed
    if (this.flip) {
      middleware.push(
        flip({
          // @ts-expect-error - We're converting a string attribute to an array here
          //
          // TODO - use a custom adapter for this property
          //
          fallbackPlacement: this.flipFallbackPlacement.split(' ').filter(p => p.trim()),
          fallbackStrategy: this.flipFallbackStrategy
        })
      );
    }

    // Then we shift, as needed
    if (this.shift) {
      middleware.push(shift());
    }

    // Finally, we add an arrow
    if (this.arrow) {
      middleware.push(
        arrow({
          element: this.arrowEl,
          padding: 10 // min distance from the edge, in pixels
        })
      );
    }

    computePosition(this.anchor, this.popupEl, {
      placement: this.placement,
      middleware,
      strategy: this.strategy
    }).then(({ x, y, middlewareData, placement }) => {
      const staticSide = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' }[placement.split('-')[0]]!;

      Object.assign(this.popupEl.style, {
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
