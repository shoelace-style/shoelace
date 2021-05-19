import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators';
import { classMap } from 'lit-html/directives/class-map';
import { event, EventEmitter, watch } from '../../internal/decorators';
import { animateTo, stopAnimations } from '../../internal/animate';
import styles from 'sass:./alert.scss';

const toastStack = Object.assign(document.createElement('div'), { className: 'sl-toast-stack' });

//
// TODO - At the component level, expose `animationSettings` which will work like this:
//
//  alert.animationSettings = {
//    show: {
//      keyframes: [],
//      options: {}
//    },
//    hide: {
//      keyframes: [],
//      options: {}
//    }
//  };
//
// TODO - To allow users to change the default value for all alerts, export a `setAnimationDefaults()` function. When no
// animationSettings are provided, we'll use the defaults.
//
// TODO - In the changelog, describe why these changes are being made:
//
//  - CSS transitions are more easily customizable, but not reliable due to reflow hacks and now knowing which
//    transition to wait for via transitionend.
//  - Web Animations API is more reliable at the expense of being harder to customize. However, providing the
//    setAnimationDefaults() function gives you complete control over individual component animations with one call.
//

/**
 * @since 2.0
 * @status stable
 *
 * @dependency sl-icon-button
 *
 * @slot - The alert's content.
 * @slot icon - An icon to show in the alert.
 *
 * @part base - The component's base wrapper.
 * @part icon - The container that wraps the alert icon.
 * @part message - The alert message.
 * @part close-button - The close button.
 *
 * @customProperty --box-shadow - The alert's box shadow.
 */
@customElement('sl-alert')
export default class SlAlert extends LitElement {
  static styles = unsafeCSS(styles);

  private autoHideTimeout: any;
  private hasInitialized = false;

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
  @property({ type: Number }) duration = Infinity;

  /** Emitted when the alert opens. Calling `event.preventDefault()` will prevent it from being opened. */
  @event('sl-show') slShow: EventEmitter<void>;

  /** Emitted after the alert opens and all transitions are complete. */
  @event('sl-after-show') slAfterShow: EventEmitter<void>;

  /** Emitted when the alert closes. Calling `event.preventDefault()` will prevent it from being closed. */
  @event('sl-hide') slHide: EventEmitter<void>;

  /** Emitted after the alert closes and all transitions are complete. */
  @event('sl-after-hide') slAfterHide: EventEmitter<void>;

  async firstUpdated() {
    // Set initial visibility
    this.base.hidden = !this.open;

    // Set the initialized flag after the first update is complete
    await this.updateComplete;
    this.hasInitialized = true;
  }

  /** Shows the alert. */
  async show() {
    if (!this.hasInitialized) {
      return;
    }

    const slShow = this.slShow.emit();
    if (slShow.defaultPrevented) {
      this.open = false;
      return;
    }

    this.open = true;

    if (this.duration < Infinity) {
      this.restartAutoHide();
    }

    // Animate in
    await stopAnimations(this.base);
    this.base.hidden = false;
    await animateTo(
      this.base,
      [
        { opacity: 0, transform: 'scale(0.8)' },
        { opacity: 1, transform: 'scale(1)' }
      ],
      { duration: 250 }
    );

    this.slAfterShow.emit();
  }

  /** Hides the alert */
  async hide() {
    if (!this.hasInitialized) {
      return;
    }

    const slHide = this.slHide.emit();
    if (slHide.defaultPrevented) {
      this.open = true;
      return;
    }

    this.open = false;

    clearTimeout(this.autoHideTimeout);

    // Animate out
    await stopAnimations(this.base);
    await animateTo(
      this.base,
      [
        { opacity: 1, transform: 'scale(1)' },
        { opacity: 0, transform: 'scale(0.8)' }
      ],
      { duration: 250 }
    );
    this.base.hidden = true;

    this.slAfterHide.emit();
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

  @watch('open')
  handleOpenChange() {
    this.open ? this.show() : this.hide();
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
        @mousemove=${this.handleMouseMove.bind(this)}
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
                  @click=${this.handleCloseClick.bind(this)}
                ></sl-icon-button>
              </span>
            `
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-alert': SlAlert;
  }
}
