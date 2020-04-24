import { Component, Prop, State, h } from '@stencil/core';
import { KeyboardDetector } from '../../utilities/keyboard-detector';

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

  @State() isUsingKeyboard = false;

  /** Indicates whether or not the alert is open. */
  @Prop({ mutable: true, reflect: true }) open = false;

  /** The type of alert to draw. */
  @Prop() type = 'primary';

  /** Set to true to make the alert closable. */
  @Prop() closable = false;

  componentDidLoad() {
    this.keyboardDetector = new KeyboardDetector({
      whenUsing: () => (this.isUsingKeyboard = true),
      whenNotUsing: () => (this.isUsingKeyboard = false)
    });

    this.keyboardDetector.observe(this.alert);

    // Show the alert on init
    if (this.open) {
      // TODO:
    }
  }

  componentDidUnload() {
    this.keyboardDetector.unobserve(this.alert);
  }

  render() {
    return (
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
      >
        <span class="sl-alert__icon">
          <slot name="icon" />
        </span>

        <span class="sl-alert__message">
          <slot />
        </span>

        {this.closable && (
          <button type="button" class="sl-alert__close">
            <slot name="close-icon">
              <sl-icon name="x" />
            </slot>
          </button>
        )}
      </div>
    );
  }
}
