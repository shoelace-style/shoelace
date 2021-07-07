import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit-html/directives/class-map';
import { animateTo, stopAnimations } from '../../internal/animate';
import { emit } from '../../internal/event';
import { watch } from '../../internal/watch';
import { waitForEvent } from '../../internal/event';
import { getAnimation, setDefaultAnimation } from '../../utilities/animation-registry';
import styles from 'sass:./alert.scss';

const toastStack = Object.assign(document.createElement('div'), { className: 'sl-toast-stack' });

/**
 * @since 2.0
 * @status stable
 *
 * @dependency sl-icon-button
 *
 * @slot - The alert's content.
 * @slot icon - An icon to show in the alert.
 *
 * @event sl-show - Emitted when the alert opens.
 * @event sl-after-show - Emitted after the alert opens and all transitions are complete.
 * @event sl-hide - Emitted when the alert closes.
 * @event sl-after-hide - Emitted after the alert closes and all transitions are complete.
 *
 * @csspart base - The component's base wrapper.
 * @csspart icon - The container that wraps the alert icon.
 * @csspart message - The alert message.
 * @csspart close-button - The close button.
 *
 * @cssproperty --box-shadow - The alert's box shadow.
 *
 * @animation alert.show - The animation to use when showing the alert.
 * @animation alert.hide - The animation to use when hiding the alert.
 */

@customElement('sl-alert')
export default class SlAlert extends LitElement {
  static styles = unsafeCSS(styles);

  private autoHideTimeout: any;

  @query('[part="base"]') base: HTMLElement;

  /** Indicates whether or not the alert is open. You can use this in lieu of the show/hide methods. */
  @property({ type: Boolean, reflect: true }) open = false;

  /** Makes the alert closable. */
  @property({ type: Boolean, reflect: true }) closable = false;

  /** The type of alert. */
  @property({ reflect: true }) type: 'primary' | 'success' | 'info' | 'warning' | 'danger' = 'primary';

  /**
   * The length of time, in milliseconds, the alert will show before closing itself. If the user interacts with
   * the alert before it closes (e.g. moves the mouse over it), the timer will restart. Defaults to `Infinity`.
   */
  @property({ type: Number }) duration: number = Infinity;

  firstUpdated() {
    this.base.hidden = !this.open;
  }

  /** Shows the alert. */
  async show() {
    if (this.open) {
      return;
    }

    this.open = true;
    return waitForEvent(this, 'sl-after-show');
  }

  /** Hides the alert */
  async hide() {
    if (!this.open) {
      return;
    }

    this.open = false;
    return waitForEvent(this, 'sl-after-hide');
  }

  /**
   * Displays the alert as a toast notification. This will move the alert out of its position in the DOM and, when
   * dismissed, it will be removed from the DOM completely. By storing a reference to the alert, you can reuse it by
   * calling this method again. The returned promise will resolve after the alert is hidden.
   */
  async toast() {
    return new Promise<void>(resolve => {
      if (!toastStack.parentElement) {
        document.body.append(toastStack);
      }

      toastStack.appendChild(this);

      // Wait for the toast stack to render
      requestAnimationFrame(() => {
        this.clientWidth; // force a reflow for the initial transition
        this.show();
      });

      this.addEventListener(
        'sl-after-hide',
        () => {
          toastStack.removeChild(this);
          resolve();

          // Remove the toast stack from the DOM when there are no more alerts
          if (!toastStack.querySelector('sl-alert')) {
            toastStack.remove();
          }
        },
        { once: true }
      );
    });
  }

  restartAutoHide() {
    clearTimeout(this.autoHideTimeout);
    if (this.open && this.duration < Infinity) {
      this.autoHideTimeout = setTimeout(() => this.hide(), this.duration);
    }
  }

  handleCloseClick() {
    this.hide();
  }

  handleMouseMove() {
    this.restartAutoHide();
  }

  @watch('open', { waitUntilFirstUpdate: true })
  async handleOpenChange() {
    if (this.open) {
      // Show
      emit(this, 'sl-show');

      if (this.duration < Infinity) {
        this.restartAutoHide();
      }

      await stopAnimations(this.base);
      this.base.hidden = false;
      const { keyframes, options } = getAnimation(this, 'alert.show');
      await animateTo(this.base, keyframes, options);

      emit(this, 'sl-after-show');
    } else {
      // Hide
      emit(this, 'sl-hide');

      clearTimeout(this.autoHideTimeout);

      await stopAnimations(this.base);
      const { keyframes, options } = getAnimation(this, 'alert.hide');
      await animateTo(this.base, keyframes, options);
      this.base.hidden = true;

      emit(this, 'sl-after-hide');
    }
  }

  @watch('duration')
  handleDurationChange() {
    this.restartAutoHide();
  }

  render() {
    return html`
      <div
        part="base"
        class=${classMap({
          alert: true,
          'alert--open': this.open,
          'alert--closable': this.closable,
          'alert--primary': this.type === 'primary',
          'alert--success': this.type === 'success',
          'alert--info': this.type === 'info',
          'alert--warning': this.type === 'warning',
          'alert--danger': this.type === 'danger'
        })}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        aria-hidden=${this.open ? 'false' : 'true'}
        @mousemove=${this.handleMouseMove}
      >
        <span part="icon" class="alert__icon">
          <slot name="icon"></slot>
        </span>

        <span part="message" class="alert__message">
          <slot></slot>
        </span>

        ${this.closable
          ? html`
              <span class="alert__close">
                <sl-icon-button
                  exportparts="base:close-button"
                  name="x"
                  library="system"
                  @click=${this.handleCloseClick}
                ></sl-icon-button>
              </span>
            `
          : ''}
      </div>
    `;
  }
}

setDefaultAnimation('alert.show', {
  keyframes: [
    { opacity: 0, transform: 'scale(0.8)' },
    { opacity: 1, transform: 'scale(1)' }
  ],
  options: { duration: 250, easing: 'ease' }
});

setDefaultAnimation('alert.hide', {
  keyframes: [
    { opacity: 1, transform: 'scale(1)' },
    { opacity: 0, transform: 'scale(0.8)' }
  ],
  options: { duration: 250, easing: 'ease' }
});

declare global {
  interface HTMLElementTagNameMap {
    'sl-alert': SlAlert;
  }
}
