import { html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import '../../components/icon/icon';
import { animateTo, shimKeyframesHeightAuto, stopAnimations } from '../../internal/animate';
import { emit, waitForEvent } from '../../internal/event';
import { watch } from '../../internal/watch';
import { getAnimation, setDefaultAnimation } from '../../utilities/animation-registry';
import { LocalizeController } from '../../utilities/localize';
import styles from './details.styles';
import type { CSSResultGroup } from 'lit';

/**
 * @since 2.0
 * @status stable
 *
 * @dependency sl-icon
 *
 * @slot - The details' content.
 * @slot summary - The details' summary. Alternatively, you can use the summary prop.
 *
 * @event sl-show - Emitted when the details opens.
 * @event sl-after-show - Emitted after the details opens and all animations are complete.
 * @event sl-hide - Emitted when the details closes.
 * @event sl-after-hide - Emitted after the details closes and all animations are complete.
 *
 * @csspart base - The component's internal wrapper.
 * @csspart header - The summary header.
 * @csspart summary - The details summary.
 * @csspart summary-icon - The expand/collapse summary icon.
 * @csspart content - The details content.
 *
 * @animation details.show - The animation to use when showing details. You can use `height: auto` with this animation.
 * @animation details.hide - The animation to use when hiding details. You can use `height: auto` with this animation.
 */
@customElement('sl-details')
export default class SlDetails extends LitElement {
  static styles: CSSResultGroup = styles;

  @query('.details') details: HTMLElement;
  @query('.details__header') header: HTMLElement;
  @query('.details__body') body: HTMLElement;

  private readonly localize = new LocalizeController(this);

  /** Indicates whether or not the details is open. You can use this in lieu of the show/hide methods. */
  @property({ type: Boolean, reflect: true }) open = false;

  /** The summary to show in the details header. If you need to display HTML, use the `summary` slot instead. */
  @property() summary: string;

  /** Disables the details so it can't be toggled. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  firstUpdated() {
    this.body.hidden = !this.open;
    this.body.style.height = this.open ? 'auto' : '0';
  }

  /** Shows the details. */
  async show() {
    if (this.open || this.disabled) {
      return undefined;
    }

    this.open = true;
    return waitForEvent(this, 'sl-after-show');
  }

  /** Hides the details */
  async hide() {
    if (!this.open || this.disabled) {
      return undefined;
    }

    this.open = false;
    return waitForEvent(this, 'sl-after-hide');
  }

  handleSummaryClick() {
    if (!this.disabled) {
      if (this.open) {
        this.hide();
      } else {
        this.show();
      }

      this.header.focus();
    }
  }

  handleSummaryKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();

      if (this.open) {
        this.hide();
      } else {
        this.show();
      }
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      this.hide();
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      this.show();
    }
  }

  @watch('open', { waitUntilFirstUpdate: true })
  async handleOpenChange() {
    if (this.open) {
      // Show
      emit(this, 'sl-show');

      await stopAnimations(this.body);
      this.body.hidden = false;

      const { keyframes, options } = getAnimation(this, 'details.show', { dir: this.localize.dir() });
      await animateTo(this.body, shimKeyframesHeightAuto(keyframes, this.body.scrollHeight), options);
      this.body.style.height = 'auto';

      emit(this, 'sl-after-show');
    } else {
      // Hide
      emit(this, 'sl-hide');

      await stopAnimations(this.body);

      const { keyframes, options } = getAnimation(this, 'details.hide', { dir: this.localize.dir() });
      await animateTo(this.body, shimKeyframesHeightAuto(keyframes, this.body.scrollHeight), options);
      this.body.hidden = true;
      this.body.style.height = 'auto';

      emit(this, 'sl-after-hide');
    }
  }

  render() {
    return html`
      <div
        part="base"
        class=${classMap({
          details: true,
          'details--open': this.open,
          'details--disabled': this.disabled
        })}
      >
        <header
          part="header"
          id="header"
          class="details__header"
          role="button"
          aria-expanded=${this.open ? 'true' : 'false'}
          aria-controls="content"
          aria-disabled=${this.disabled ? 'true' : 'false'}
          tabindex=${this.disabled ? '-1' : '0'}
          @click=${this.handleSummaryClick}
          @keydown=${this.handleSummaryKeyDown}
        >
          <div part="summary" class="details__summary">
            <slot name="summary">${this.summary}</slot>
          </div>

          <span part="summary-icon" class="details__summary-icon">
            <sl-icon name="chevron-right" library="system"></sl-icon>
          </span>
        </header>

        <div class="details__body">
          <div part="content" id="content" class="details__content" role="region" aria-labelledby="header">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}

setDefaultAnimation('details.show', {
  keyframes: [
    { height: '0', opacity: '0' },
    { height: 'auto', opacity: '1' }
  ],
  options: { duration: 250, easing: 'linear' }
});

setDefaultAnimation('details.hide', {
  keyframes: [
    { height: 'auto', opacity: '1' },
    { height: '0', opacity: '0' }
  ],
  options: { duration: 250, easing: 'linear' }
});

declare global {
  interface HTMLElementTagNameMap {
    'sl-details': SlDetails;
  }
}
