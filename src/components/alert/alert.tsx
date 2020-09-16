import { Component, Element, Event, EventEmitter, Host, Method, Prop, Watch, h } from '@stencil/core';

/**
 * @since 2.0
 * @status stable
 *
 * @slot - The alert's content.
 * @slot icon - An icon to show in the alert.
 *
 * @part base - The component's base wrapper.
 * @part icon - The container that wraps the alert icon.
 * @part message - The alert message.
 * @part close-button - The close button.
 */

const stack = Object.assign(document.createElement('div'), { className: 'sl-toast-stack' });

@Component({
  tag: 'sl-alert',
  styleUrl: 'alert.scss',
  shadow: true
})
export class Alert {
  alert: HTMLElement;
  autoHideTimeout: any;
  isShowing = false;

  @Element() host: HTMLSlAlertElement;

  /** Indicates whether or not the alert is open. You can use this in lieu of the show/hide methods. */
  @Prop({ mutable: true, reflect: true }) open = false;

  /** Set to true to make the alert closable. */
  @Prop() closable = false;

  /** The type of alert. */
  @Prop() type: 'primary' | 'success' | 'info' | 'warning' | 'danger' = 'primary';

  /**
   * When true, the alert will be shown as a "toast" notification. In this case, the alert will be hoisted to a stack
   * and removed from the DOM when closed. By storing a reference to the alert, you can reuse it by calling
   * `alert.show()` even after it has been removed from the DOM.
   */
  @Prop() toast = false;

  /**
   * The length of time, in milliseconds, the alert will show before closing itself. If the user interacts with the
   * alert before it closes (e.g. moves the mouse over it), the duration will restart.
   */
  @Prop() duration = Infinity;

  @Watch('open')
  handleOpenChange() {
    this.open ? this.show() : this.hide();
  }

  @Watch('duration')
  handleDurationChange() {
    this.restartAutoHide();
  }

  /** Emitted when the alert opens. Calling `event.preventDefault()` will prevent it from being opened. */
  @Event() slShow: EventEmitter;

  /** Emitted after the alert opens and all transitions are complete. */
  @Event() slAfterShow: EventEmitter;

  /** Emitted when the alert closes. Calling `event.preventDefault()` will prevent it from being closed. */
  @Event() slHide: EventEmitter;

  /** Emitted after the alert closes and all transitions are complete. */
  @Event() slAfterHide: EventEmitter;

  connectedCallback() {
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
  }

  componentDidLoad() {
    // Show on init if open
    if (this.open) {
      this.show();
    }
  }

  /** Shows the alert. */
  @Method()
  async show() {
    // Prevent subsequent calls to the method, whether manually or triggered by the `open` watcher
    if (this.isShowing) {
      return;
    }

    if (this.toast) {
      this.appendToStack();
    }

    const slShow = this.slShow.emit();
    if (slShow.defaultPrevented) {
      this.open = false;
      if (this.toast) {
        this.removeFromStack();
      }
      return;
    }

    this.host.hidden = false;
    this.host.clientWidth; // force a reflow
    this.isShowing = true;
    this.open = true;

    if (this.duration < Infinity) {
      this.autoHideTimeout = setTimeout(() => this.hide(), this.duration);
    }
  }

  /** Hides the alert */
  @Method()
  async hide() {
    // Prevent subsequent calls to the method, whether manually or triggered by the `open` watcher
    if (!this.isShowing) {
      return;
    }

    const slHide = this.slHide.emit();
    if (slHide.defaultPrevented) {
      this.open = true;
      return;
    }

    clearTimeout(this.autoHideTimeout);
    this.isShowing = false;
    this.open = false;
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
      this.host.hidden = !this.open;
      this.open ? this.slAfterShow.emit() : this.slAfterHide.emit();

      if (this.toast && !this.open) {
        this.removeFromStack();
      }
    }
  }

  appendToStack() {
    if (!stack.parentElement) {
      document.body.append(stack);
    }

    stack.clientWidth; // force a reflow
    stack.append(this.host);
  }

  removeFromStack() {
    this.host.remove();

    // Remove the stack from the DOM when there are no more alerts
    const openAlerts = [...stack.querySelectorAll('sl-alert')].filter((el: HTMLSlAlertElement) => el.open === true);
    if (openAlerts.length === 0) {
      stack.remove();
    }
  }

  restartAutoHide() {
    clearTimeout(this.autoHideTimeout);
    if (this.open && this.duration < Infinity) {
      this.autoHideTimeout = setTimeout(() => this.hide(), this.duration);
    }
  }

  render() {
    return (
      <Host hidden>
        <div
          ref={el => (this.alert = el)}
          part="base"
          class={{
            alert: true,
            'alert--open': this.open,
            'alert--closable': this.closable,
            'alert--toast': this.toast,

            // States
            'alert--primary': this.type === 'primary',
            'alert--success': this.type === 'success',
            'alert--info': this.type === 'info',
            'alert--warning': this.type === 'warning',
            'alert--danger': this.type === 'danger'
          }}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          aria-hidden={!this.open}
          onMouseMove={this.handleMouseMove}
          onTransitionEnd={this.handleTransitionEnd}
        >
          <span part="icon" class="alert__icon">
            <slot name="icon" />
          </span>

          <span part="message" class="alert__message">
            <slot />
          </span>

          {this.closable && (
            <span class="alert__close">
              <sl-icon-button part="close-button" name="x" onClick={this.handleCloseClick} />
            </span>
          )}
        </div>
      </Host>
    );
  }
}
