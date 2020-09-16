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

const stack = Object.assign(document.createElement('div'), { className: 'sl-alert-stack' });

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
   * Determines how the alert will be shown. If this is anything other than `inline`, the alert will be shown in a stack
   * as a "toast" notification. When the alert is shown as a notification, it will be hoisted to a stack and removed
   * from the DOM when hidden. (You can reuse alerts that have been removed by storing a reference to the element.)
   */
  @Prop() placement: 'inline' | 'top-start' | 'top' | 'top-end' | 'bottom-start' | 'bottom' | 'bottom-end' = 'inline';

  /** The length of time, in milliseconds, the alert will show before closing itself. */
  @Prop() duration = Infinity;

  @Watch('open')
  handleOpenChange() {
    this.open ? this.show() : this.hide();
  }

  @Watch('duration')
  handleDurationChange() {
    clearTimeout(this.autoHideTimeout);

    // Restart the timeout if the duration changes and the alert is open
    if (this.open && this.duration < Infinity) {
      this.autoHideTimeout = setTimeout(() => this.hide(), this.duration);
    }
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

    const slShow = this.slShow.emit();
    if (slShow.defaultPrevented) {
      this.open = false;
      return;
    }

    this.host.hidden = false;
    this.host.clientWidth; // force a reflow
    this.isShowing = true;
    this.open = true;

    if (this.placement !== 'inline') {
      this.appendToStack();
    }

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

  handleTransitionEnd(event: TransitionEvent) {
    const target = event.target as HTMLElement;

    // Ensure we only emit one event when the target element is no longer visible
    if (event.propertyName === 'opacity' && target.classList.contains('alert')) {
      this.host.hidden = !this.open;

      if (this.placement !== 'inline' && !this.open) {
        this.removeFromStack();
      }

      this.open ? this.slAfterShow.emit() : this.slAfterHide.emit();
    }
  }

  appendToStack() {
    if (!stack.parentElement) {
      document.body.append(stack);
    }

    stack.dataset.placement = this.placement;
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

            // States
            'alert--primary': this.type === 'primary',
            'alert--success': this.type === 'success',
            'alert--info': this.type === 'info',
            'alert--warning': this.type === 'warning',
            'alert--danger': this.type === 'danger'
          }}
          role="alert"
          aria-hidden={!this.open}
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
