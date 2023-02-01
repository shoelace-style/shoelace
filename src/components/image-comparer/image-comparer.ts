import '../icon/icon';
import { clamp } from '../../internal/math';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, query } from 'lit/decorators.js';
import { drag } from '../../internal/drag';
import { html } from 'lit';
import { LocalizeController } from '../../utilities/localize';
import { styleMap } from 'lit/directives/style-map.js';
import { watch } from '../../internal/watch';
import ShoelaceElement from '../../internal/shoelace-element';
import styles from './image-comparer.styles';
import type { CSSResultGroup } from 'lit';

/**
 * @summary Compare visual differences between similar photos with a sliding panel.
 * @documentation https://shoelace.style/components/image-comparer
 * @status stable
 * @since 2.0
 *
 * @dependency sl-icon
 *
 * @slot before - The before image, an `<img>` or `<svg>` element.
 * @slot after - The after image, an `<img>` or `<svg>` element.
 * @slot handle - The icon used inside the handle.
 *
 * @event sl-change - Emitted when the position changes.
 *
 * @csspart base - The component's base wrapper.
 * @csspart before - The container that wraps the before image.
 * @csspart after - The container that wraps the after image.
 * @csspart divider - The divider that separates the images.
 * @csspart handle - The handle that the user drags to expose the after image.
 *
 * @cssproperty --divider-width - The width of the dividing line.
 * @cssproperty --handle-size - The size of the compare handle.
 */
@customElement('sl-image-comparer')
export default class SlImageComparer extends ShoelaceElement {
  static styles: CSSResultGroup = styles;

  private readonly localize = new LocalizeController(this);

  @query('.image-comparer') base: HTMLElement;
  @query('.image-comparer__handle') handle: HTMLElement;

  /** The position of the divider as a percentage. */
  @property({ type: Number, reflect: true }) position = 50;

  private handleDrag(event: PointerEvent) {
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

  private handleKeyDown(event: KeyboardEvent) {
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
          <slot name="before" part="before" class="image-comparer__before"></slot>

          <slot
            name="after"
            part="after"
            class="image-comparer__after"
            style=${styleMap({
              clipPath: isRtl ? `inset(0 0 0 ${100 - this.position}%)` : `inset(0 ${100 - this.position}% 0 0)`
            })}
          ></slot>
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
          <slot
            name="handle"
            part="handle"
            class="image-comparer__handle"
            role="scrollbar"
            aria-valuenow=${this.position}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-controls="image-comparer"
            tabindex="0"
          >
            <sl-icon library="system" name="grip-vertical"></sl-icon>
          </slot>
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
