import { Component, Element, Event, EventEmitter, Host, Method, Prop, Watch, h } from '@stencil/core';
import { focusVisible } from '../../utilities/focus-visible';

/**
 * @since 1.0.0
 * @status ready
 *
 * @slot - The alert's content.
 * @slot icon - An icon to show in the alert.
 * @slot close-icon - An icon to use in lieu of the default close icon.
 */

@Component({
  tag: 'sl-alert',
  styleUrl: 'alert.scss',
  shadow: true
})
export class Tab {
  constructor() {
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
  }

  alert: HTMLElement;

  @Element() host: HTMLSlAlertElement;

  /** Indicates whether or not the alert is open. You can use this in lieu of the show/hide methods. */
  @Prop({ mutable: true, reflect: true }) open = false;

  /** Set to true to make the alert closable. */
  @Prop() closable = false;

  /** The type of alert. */
  @Prop() type: 'primary' | 'success' | 'info' | 'warning' | 'danger' = 'primary';

  @Watch('open')
  handleOpenChange() {
    this.open ? this.show() : this.hide();
  }

  /** Emitted when the alert opens. Calling `event.preventDefault()` will prevent it from being opened. */
  @Event() slShow: EventEmitter;

  /** Emitted after the alert opens and all transitions are complete. */
  @Event() slAfterShow: EventEmitter;

  /** Emitted when the alert closes. Calling `event.preventDefault()` will prevent it from being closed. */
  @Event() slHide: EventEmitter;

  /** Emitted after the alert closes and all transitions are complete. */
  @Event() slAfterHide: EventEmitter;

  componentDidLoad() {
    focusVisible.observe(this.alert);

    // Show on init if open
    if (this.open) {
      this.show();
    }
  }

  componentDidUnload() {
    focusVisible.unobserve(this.alert);
  }

  /** Shows the alert. */
  @Method()
  async show() {
    const slShow = this.slShow.emit();

    if (slShow.defaultPrevented) {
      return false;
    }

    this.host.hidden = false;
    this.host.clientWidth; // force a reflow
    this.open = true;
  }

  /** Hides the alert */
  @Method()
  async hide() {
    const slHide = this.slHide.emit();

    if (slHide.defaultPrevented) {
      return false;
    }

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
      this.open ? this.slAfterShow.emit() : this.slAfterHide.emit();
    }
  }

  render() {
    return (
      <Host hidden>
        <div
          ref={el => (this.alert = el)}
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
          <span class="alert__icon">
            <slot name="icon" />
          </span>

          <span class="alert__message">
            <slot />
          </span>

          {this.closable && (
            <button type="button" class="alert__close" onClick={this.handleCloseClick}>
              <slot name="close-icon">
                <sl-icon name="x" />
              </slot>
            </button>
          )}
        </div>
      </Host>
    );
  }
}
