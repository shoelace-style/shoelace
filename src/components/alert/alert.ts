import { LitElement, customElement, html, internalProperty, property, unsafeCSS } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { event, EventEmitter } from '../../internal/event';
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
 * @part base - The component's base wrapper.
 * @part icon - The container that wraps the alert icon.
 * @part message - The alert message.
 * @part close-button - The close button.
 */
@customElement('sl-alert')
export class SlAlert extends LitElement {
  static styles = unsafeCSS(styles);

  private autoHideTimeout: any;

  @internalProperty() private isVisible = false;

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

  connectedCallback() {
    super.connectedCallback();

    // Show on init if open
    if (this.open) {
      this.show();
    }
  }

  /** Shows the alert. */
  show() {
    // Prevent subsequent calls to the method, whether manually or triggered by the `open` watcher
    if (this.isVisible) {
      return;
    }

    const slShow = this.slShow.emit();
    if (slShow.defaultPrevented) {
      this.open = false;
      return;
    }

    this.isVisible = true;
    this.open = true;

    if (this.duration < Infinity) {
      this.autoHideTimeout = setTimeout(() => this.hide(), this.duration);
    }
  }

  /** Hides the alert */
  hide() {
    // Prevent subsequent calls to the method, whether manually or triggered by the `open` watcher
    if (!this.isVisible) {
      return;
    }

    const slHide = this.slHide.emit();
    if (slHide.defaultPrevented) {
      this.open = true;
      return;
    }

    clearTimeout(this.autoHideTimeout);
    this.isVisible = false;
    this.open = false;
  }

  /**
   * Displays the alert as a toast notification. This will move the alert out of its position in the DOM
   * and, when dismissed, it will be removed from the DOM completely. By storing a reference to the alert, you can reuse
   * it by calling this method again. The returned promise will resolve after the alert is hidden.
   */
  async toast() {
    return new Promise<void>(resolve => {
      if (!toastStack.parentElement) {
        document.body.append(toastStack);
      }

      toastStack.appendChild(this);
      requestAnimationFrame(() => this.show());

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

  handleTransitionEnd(event: TransitionEvent) {
    const target = event.target as HTMLElement;

    // Ensure we only emit one event when the target element is no longer visible
    if (event.propertyName === 'opacity' && target.classList.contains('alert')) {
      this.isVisible = this.open;
      this.open ? this.slAfterShow.emit() : this.slAfterHide.emit();
    }
  }

  openChanged() {
    this.open ? this.show() : this.hide();
  }

  durationChanged() {
    this.restartAutoHide();
  }

  render() {
    return html`
      <div
        part="base"
        class=${classMap({
          alert: true,
          'alert--open': this.open,
          'alert--visible': this.isVisible,
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
        @transitionend=${this.handleTransitionEnd.bind(this)}
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
                  @click=${this.handleCloseClick.bind(this)}
                ></sl-icon-button>
              </span>
            `
          : ''}
      </div>
    `;
  }
}
