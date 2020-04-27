import { Component, Element, Event, EventEmitter, Host, Method, Prop, State, Watch, h } from '@stencil/core';
import { KeyboardDetector } from '../../utilities/keyboard-detector';
import { showWithReflow } from '../../utilities/reflow';

/**
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
  alert: HTMLElement;
  keyboardDetector: KeyboardDetector;

  constructor() {
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
  }

  @Element() host: HTMLSlAlertElement;

  @State() isUsingKeyboard = false;

  /** Indicates whether or not the alert is open. */
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
    this.keyboardDetector = new KeyboardDetector({
      whenUsing: () => (this.isUsingKeyboard = true),
      whenNotUsing: () => (this.isUsingKeyboard = false)
    });

    this.keyboardDetector.observe(this.alert);

    // Show on init if open
    if (this.open) {
      this.show();
    }
  }

  componentDidUnload() {
    this.keyboardDetector.unobserve(this.alert);
  }

  /** Hides the alert. */
  @Method()
  async show() {
    const slShow = this.slShow.emit();

    if (slShow.defaultPrevented) {
      return false;
    }

    showWithReflow(this.host);
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
    this.open = false;
  }

  handleTransitionEnd(event: TransitionEvent) {
    const target = event.target as HTMLElement;

    // Ensure we only handle one transition event on the target element
    if (event.propertyName === 'opacity' && target.classList.contains('sl-alert')) {
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
            'sl-alert': true,
            'sl-alert--open': this.open,
            'sl-alert--closable': this.closable,
            'sl-alert--using-keyboard': this.isUsingKeyboard,

            // States
            'sl-alert--primary': this.type === 'primary',
            'sl-alert--success': this.type === 'success',
            'sl-alert--info': this.type === 'info',
            'sl-alert--warning': this.type === 'warning',
            'sl-alert--danger': this.type === 'danger'
          }}
          role="alert"
          aria-hidden={!this.open}
          onTransitionEnd={this.handleTransitionEnd}
        >
          <span class="sl-alert__icon">
            <slot name="icon" />
          </span>

          <span class="sl-alert__message">
            <slot />
          </span>

          {this.closable && (
            <button type="button" class="sl-alert__close" onClick={this.handleCloseClick}>
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
