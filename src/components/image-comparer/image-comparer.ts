import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { drag } from '../../internal/drag';
import { clamp } from '../../internal/math';
import ShoelaceElement from '../../internal/shoelace-element';
import { watch } from '../../internal/watch';
import { LocalizeController } from '../../utilities/localize';
import '../icon/icon';
import styles from './image-comparer.styles';
import type { CSSResultGroup } from 'lit';

/**
 * @summary Compare visual differences between similar photos with a sliding panel.
 *
 * @since 2.0
 * @status stable
 *
 * @dependency sl-icon
 *
 * @slot before - The before image, an `<img>` or `<svg>` element.
 * @slot after - The after image, an `<img>` or `<svg>` element.
 * @slot handle-icon - The icon used inside the handle.
 *
 * @event sl-change - Emitted when the position changes.
 *
 * @csspart base - The component's internal wrapper.
 * @csspart before - The container that holds the "before" image.
 * @csspart after - The container that holds the "after" image.
 * @csspart divider - The divider that separates the images.
 * @csspart handle - The handle that the user drags to expose the after image.
 * @csspart handle-icon - The handle icon's `<slot>`.
 *
 * @cssproperty --divider-width - The width of the dividing line.
 * @cssproperty --handle-size - The size of the compare handle.
 */
@customElement('sl-image-comparer')
export default class SlImageComparer extends ShoelaceElement {
  static styles: CSSResultGroup = styles;

  @query('.image-comparer') base: HTMLElement;
  @query('.image-comparer__handle') handle: HTMLElement;

  private readonly localize = new LocalizeController(this);

  /** The position of the divider as a percentage. */
  @property({ type: Number, reflect: true }) position = 50;

  handleDrag(event: PointerEvent) {
    const { width } = this.base.getBoundingClientRect();
    const isRtl = this.localize.dir() === 'rtl';

    event.preventDefault();

    drag(this.base, {
      onMove: x => {
        this.position = parseFloat(clamp((x / width) * 100, 0, 100).toFixed(2));
        if (isRtl) this.position = 100 - this.position;
      },
      initialEvent: event
    });
  }

  handleKeyDown(event: KeyboardEvent) {
    const isLtr = this.localize.dir() === 'ltr';
    const isRtl = this.localize.dir() === 'rtl';

    if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
      const incr = event.shiftKey ? 10 : 1;
      let newPosition = this.position;

      event.preventDefault();

      if ((isLtr && event.key === 'ArrowLeft') || (isRtl && event.key === 'ArrowRight')) {
        newPosition -= incr;
      }
      if ((isLtr && event.key === 'ArrowRight') || (isRtl && event.key === 'ArrowLeft')) {
        newPosition += incr;
      }
      if (event.key === 'Home') {
        newPosition = 0;
      }
      if (event.key === 'End') {
        newPosition = 100;
      }
      newPosition = clamp(newPosition, 0, 100);

      this.position = newPosition;
    }
  }

  @watch('position', { waitUntilFirstUpdate: true })
  handlePositionChange() {
    this.emit('sl-change');
  }

  render() {
    const isRtl = this.localize.dir() === 'rtl';

    return html`
      <div
        part="base"
        id="image-comparer"
        class=${classMap({
          'image-comparer': true,
          'image-comparer--rtl': isRtl
        })}
        @keydown=${this.handleKeyDown}
      >
        <div class="image-comparer__image">
          <div part="before" class="image-comparer__before">
            <slot name="before"></slot>
          </div>

          <div
            part="after"
            class="image-comparer__after"
            style=${styleMap({
              clipPath: isRtl ? `inset(0 0 0 ${100 - this.position}%)` : `inset(0 ${100 - this.position}% 0 0)`
            })}
          >
            <slot name="after"></slot>
          </div>
        </div>

        <div
          part="divider"
          class="image-comparer__divider"
          style=${styleMap({
            left: isRtl ? `${100 - this.position}%` : `${this.position}%`
          })}
          @mousedown=${this.handleDrag}
          @touchstart=${this.handleDrag}
        >
          <div
            part="handle"
            class="image-comparer__handle"
            role="scrollbar"
            aria-valuenow=${this.position}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-controls="image-comparer"
            tabindex="0"
          >
            <slot part="handle-icon" name="handle-icon">
              <sl-icon library="system" name="grip-vertical"></sl-icon>
            </slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-image-comparer': SlImageComparer;
  }
}
